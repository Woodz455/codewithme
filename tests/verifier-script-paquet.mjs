#!/usr/bin/env node
/**
 * Le script qui controle les .exe produits pour Windows.
 *
 * Il merite son propre test parce qu'il a deja fait echouer une construction
 * pourtant reussie : les deux .exe etaient bien la, mais le script sortait en
 * code 2 sur un motif de fichier sans correspondance.
 *
 * Ce defaut avait echappe a une simulation faite a la main — parce qu'elle
 * rejouait les commandes sans les options de shell que GitHub applique
 * (`-e -o pipefail`). On les applique donc ici, sinon ce test ne prouverait
 * rien de plus que la precedente simulation.
 *
 * Lancer : npm run test:script-paquet
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync, openSync, ftruncateSync, closeSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const SCRIPT = join(RACINE, 'tools/verifier-paquet-windows.sh');

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

const base = join(os.tmpdir(), `cwm-script-paquet-${Date.now()}`);

/** Cree un fichier de la taille voulue sans l'ecrire octet par octet. */
function fichierDeTaille(chemin, octets) {
  writeFileSync(chemin, '');
  const descripteur = openSync(chemin, 'r+');
  ftruncateSync(descripteur, octets);
  closeSync(descripteur);
}

/** Lance le script avec EXACTEMENT les options de shell de GitHub Actions. */
function lancer(dossier) {
  try {
    const sortie = execFileSync(
      'bash',
      ['--noprofile', '--norc', '-e', '-o', 'pipefail', SCRIPT, dossier],
      { encoding: 'utf8', stdio: 'pipe' }
    );
    return { code: 0, sortie };
  } catch (erreur) {
    return { code: erreur.status ?? -1, sortie: `${erreur.stdout ?? ''}${erreur.stderr ?? ''}` };
  }
}

/* Les tailles reellement observees sur le runner Windows. */
const TAILLE_INSTALLATEUR = 117201041;
const TAILLE_PORTABLE = 116972736;
const TAILLE_STUB = 313052; // ce qu'a produit une construction interrompue

function preparer(nom, fichiers) {
  const dossier = join(base, nom);
  mkdirSync(dossier, { recursive: true });
  for (const [fichier, taille] of Object.entries(fichiers)) {
    fichierDeTaille(join(dossier, fichier), taille);
  }
  return dossier;
}

process.stdout.write('\nScript de verification du paquet Windows\n\n');

/* --- Le cas nominal ------------------------------------------------------ */

const nominal = lancer(
  preparer('nominal', {
    'CodeWithMe-1.0.0-Setup.exe': TAILLE_INSTALLATEUR,
    'CodeWithMe-1.0.0-portable.exe': TAILLE_PORTABLE,
    'CodeWithMe-1.0.0-Setup.exe.blockmap': 122356,
    'builder-debug.yml': 6250,
    'latest.yml': 349,
  })
);

verifier('une construction reussie passe', nominal.code === 0, `code ${nominal.code} — ${nominal.sortie}`);
verifier('elle nomme l installateur', nominal.sortie.includes('CodeWithMe-1.0.0-Setup.exe'), nominal.sortie);
verifier('elle nomme la version portable', nominal.sortie.includes('CodeWithMe-1.0.0-portable.exe'), nominal.sortie);

/* --- Les quatre facons d'echouer ----------------------------------------- */

const sansPortable = lancer(preparer('sans-portable', { 'CodeWithMe-1.0.0-Setup.exe': TAILLE_INSTALLATEUR }));
verifier('une version portable manquante echoue', sansPortable.code === 1, `code ${sansPortable.code}`);
verifier('elle est nommee dans le message', /portable introuvable/.test(sansPortable.sortie), sansPortable.sortie);

const sansInstallateur = lancer(preparer('sans-installateur', { 'CodeWithMe-1.0.0-portable.exe': TAILLE_PORTABLE }));
verifier('un installateur manquant echoue', sansInstallateur.code === 1, `code ${sansInstallateur.code}`);

// Le piege le plus couteux : un fichier present, telechargeable, et inerte.
const tronque = lancer(
  preparer('tronque', {
    'CodeWithMe-1.0.0-Setup.exe': TAILLE_STUB,
    'CodeWithMe-1.0.0-portable.exe': TAILLE_PORTABLE,
  })
);
verifier('un installateur tronque echoue', tronque.code === 1, `code ${tronque.code}`);
verifier(
  'le message dit que la construction est incomplete',
  /incomplete/.test(tronque.sortie),
  tronque.sortie
);

const vide = lancer(preparer('vide', {}));
verifier('un dossier dist vide echoue', vide.code === 1, `code ${vide.code}`);

const absent = lancer(join(base, 'nexiste-pas'));
verifier('un dossier dist absent echoue', absent.code === 1, `code ${absent.code}`);

// Le defaut d'origine : un motif sans correspondance ne doit plus tuer le
// script avant meme qu'il ait pu juger quoi que ce soit.
verifier(
  'aucun cas ne sort en code 2 (le defaut d origine)',
  [nominal, sansPortable, sansInstallateur, tronque, vide, absent].every((r) => r.code !== 2),
  'un motif sans correspondance fait de nouveau sortir bash en code 2'
);

rmSync(base, { recursive: true, force: true });

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
