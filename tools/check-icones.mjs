#!/usr/bin/env node
/**
 * Controle de l'iconographie.
 *
 * 1. Aucun emoji ne doit subsister dans l'interface. Les emoji sont dessines
 *    par le systeme d'exploitation, pas par l'application : leur apparence
 *    change d'une machine a l'autre, et Windows n'en dessine pas certains du
 *    tout (les drapeaux s'y affichent en deux lettres). La seule facon de
 *    garantir le meme rendu sur l'ordinateur de l'eleve est de n'en utiliser
 *    aucun.
 * 2. Toute icone demandee par le code doit exister dans le jeu genere, sinon
 *    elle s'afficherait comme un point d'interrogation a l'execution.
 *
 * Lancer : npm run check:icones
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ICONES, LOGOS } from './icones.mjs';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const DOSSIERS = ['app', 'electron'];
const IGNORES = new Set(['icones-generees.js']);

/* Plages Unicode des emoji et des symboles decoratifs. On laisse volontairement
   passer les fleches typographiques du texte pedagogique (→ dans une phrase),
   qui sont du texte, pas des icones d'interface. */
const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/gu;

const problemes = [];

function parcourir(dossier) {
  for (const entree of readdirSync(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) {
      if (!['node_modules', '.git', 'vendor', 'captures'].includes(entree.name)) parcourir(chemin);
      continue;
    }
    if (!/\.(js|html|css)$/.test(entree.name) || IGNORES.has(entree.name)) continue;
    verifierFichier(chemin);
  }
}

function verifierFichier(chemin) {
  const source = readFileSync(chemin, 'utf8');
  const relatif = relative(RACINE, chemin);

  // 1. Emoji restants
  source.split('\n').forEach((ligne, index) => {
    const trouves = ligne.match(EMOJI);
    if (trouves) {
      problemes.push(
        `${relatif}:${index + 1} — emoji ${[...new Set(trouves)].join(' ')} : ` +
          `a remplacer par icone('…'), le rendu differerait sous Windows`
      );
    }
  });

  // 2. Icones et logos demandes mais inexistants
  for (const correspondance of source.matchAll(/\bicone\(\s*'([a-zA-Z]+)'/g)) {
    if (!(correspondance[1] in ICONES)) {
      problemes.push(`${relatif} — icone inconnue : « ${correspondance[1] } »`);
    }
  }
  for (const correspondance of source.matchAll(/\b(?:medaillonL|l)ogo\(\s*'([a-zA-Z+]+)'/g)) {
    if (!(correspondance[1] in LOGOS)) {
      problemes.push(`${relatif} — logo inconnu : « ${correspondance[1]} »`);
    }
  }
}

/* --------------------------------------------------------------------------- */

process.stdout.write('\nControle de l iconographie\n\n');

if (!existsSync(join(RACINE, 'app/js/icones-generees.js'))) {
  process.stderr.write('  Le jeu d icones n a pas ete genere : lancer `npm run vendor`.\n\n');
  process.exit(1);
}

for (const dossier of DOSSIERS) parcourir(join(RACINE, dossier));

// Les logos declares dans les donnees de parcours doivent exister eux aussi.
// Un parcours peut porter une icone d'interface a la place d'un logo officiel :
// le grand projet final combine trois langages et n'a donc pas de logo propre.
const parcours = readFileSync(join(RACINE, 'app/content/parcours.js'), 'utf8');
for (const correspondance of parcours.matchAll(/logo:\s*'([a-zA-Z+]+)'/g)) {
  if (!(correspondance[1] in LOGOS) && !(correspondance[1] in ICONES)) {
    problemes.push(`app/content/parcours.js — logo inconnu : « ${correspondance[1]} »`);
  }
}
for (const correspondance of parcours.matchAll(/icone:\s*'([a-zA-Z]+)'/g)) {
  if (!(correspondance[1] in ICONES)) {
    problemes.push(`app/content/parcours.js — icone inconnue : « ${correspondance[1]} »`);
  }
}

if (problemes.length) {
  for (const probleme of problemes) process.stderr.write(`  ${probleme}\n`);
  process.stderr.write(`\n  ${problemes.length} probleme(s).\n\n`);
  process.exit(1);
}

process.stdout.write(
  `  Aucun emoji dans l interface.\n` +
    `  ${Object.keys(ICONES).length} icones et ${Object.keys(LOGOS).length} logos disponibles, toutes les references sont valides.\n\n`
);
