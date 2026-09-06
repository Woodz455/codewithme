#!/usr/bin/env node
/**
 * Une etiquette ne peut plus mentir sur la version.
 *
 * Defaut reellement survenu : l'etiquette v1.1.2 a ete posee sur le commit
 * PRECEDENT la montee de version, qui declarait encore 1.1.1. La construction
 * a publie `CodeWithMe-1.1.1-Setup.exe` sous une Release nommee v1.1.2. Deux
 * binaires differents portent depuis le meme nom, et rien ne les distingue —
 * ni a l'oeil, ni pour l'application.
 *
 * Le controle vit dans tools/check-empaquetage.mjs, qui tourne en PREMIERE
 * position dans build-windows.yml, donc avant les cinq minutes de
 * construction. Ce test l'eprouve sur les trois cas qui comptent.
 *
 * Il capture le VRAI code de sortie du controleur. Mesurer `$?` apres un pipe
 * donnerait le code du dernier maillon du tuyau — piege deja rencontre deux
 * fois dans ce depot.
 *
 * Lancer : npm run test:etiquette
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTROLEUR = join(RACINE, 'tools/check-empaquetage.mjs');
const VERSION = JSON.parse(readFileSync(join(RACINE, 'package.json'), 'utf8')).version;

const cas = [];
const echecs = [];

function verifier(nom, condition, detail = '') {
  cas.push(nom);
  if (condition) process.stdout.write(`  ok   ${nom}\n`);
  else {
    echecs.push(nom);
    process.stdout.write(`  ECHEC ${nom}${detail ? ` — ${detail}` : ''}\n`);
  }
}

/** Lance le vrai controleur et rend son code de sortie ET sa sortie. */
function lancer(environnement) {
  const resultat = spawnSync(process.execPath, [CONTROLEUR], {
    env: { ...process.env, ...environnement },
    encoding: 'utf8',
  });
  return { code: resultat.status, texte: `${resultat.stdout}${resultat.stderr}` };
}

process.stdout.write('\nEtiquette et version\n\n');

/* --- Le cas nominal ------------------------------------------------------ */

const concorde = lancer({ GITHUB_REF_TYPE: 'tag', GITHUB_REF_NAME: `v${VERSION}` });
verifier(
  'une etiquette qui correspond a la version passe',
  concorde.code === 0,
  `code ${concorde.code}`
);

// Le prefixe « v » est la convention du depot : il doit etre tolere.
verifier(
  'le prefixe v est accepte',
  concorde.texte.includes(`l etiquette v${VERSION} correspond`),
  concorde.texte.slice(0, 200)
);

/* --- L erreur reelle ----------------------------------------------------- */

const [majeur, mineur, correctif] = VERSION.split('.').map(Number);
const suivante = `v${majeur}.${mineur}.${correctif + 1}`;

const divergent = lancer({ GITHUB_REF_TYPE: 'tag', GITHUB_REF_NAME: suivante });
verifier(
  'une etiquette en avance sur la version est REFUSEE',
  divergent.code === 1,
  `code ${divergent.code} — c est le defaut qui a produit CodeWithMe-1.1.1-Setup.exe sous v1.1.2`
);
verifier(
  'le refus nomme les deux valeurs',
  divergent.texte.includes(suivante) && divergent.texte.includes(VERSION),
  divergent.texte.slice(0, 240)
);
verifier(
  'le refus dit quel nom de fichier serait produit',
  divergent.texte.includes(`CodeWithMe-${VERSION}-Setup.exe`),
  divergent.texte.slice(0, 240)
);

/* --- Ce qui ne doit PAS declencher la garde ------------------------------ */

// check:empaquetage tourne aussi dans ci.yml sur chaque poussee de branche, ou
// GITHUB_REF_NAME est un nom de branche et ne veut rien dire ici.
const branche = lancer({ GITHUB_REF_TYPE: 'branch', GITHUB_REF_NAME: 'master' });
verifier('une poussee de branche passe', branche.code === 0, `code ${branche.code}`);
verifier(
  'et la garde ne s y applique meme pas',
  !branche.texte.includes('l etiquette'),
  branche.texte.slice(0, 200)
);

const horsCi = lancer({ GITHUB_REF_TYPE: '', GITHUB_REF_NAME: '' });
verifier('hors integration continue, rien ne change', horsCi.code === 0, `code ${horsCi.code}`);

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
