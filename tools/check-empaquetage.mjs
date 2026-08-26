#!/usr/bin/env node
/**
 * Controle de la configuration d'empaquetage.
 *
 * Pourquoi ce fichier existe : un `${target}` inexistant dans le nom des
 * fichiers produits a fait echouer deux constructions Windows d'affilee. Le
 * defaut etait invisible sous Linux — aucun controle ne touchait la
 * configuration Windows — et ne se revelait qu'apres cinq minutes de runner,
 * tout a la fin, une fois l'application deja empaquetee.
 *
 * On verifie donc ici, en une seconde et sans rien construire :
 *
 *   1. chaque motif de nom de fichier s'etend reellement, avec le meme code
 *      qu'electron-builder emploie — pas une liste de macros recopiee a la
 *      main, qui divergerait a la premiere mise a jour ;
 *   2. les noms obtenus correspondent a ce que le workflow cherche ensuite.
 *      Un nom valide mais introuvable ferait echouer la publication tout
 *      aussi surement.
 *
 * Lancer : npm run check:empaquetage
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const exiger = createRequire(import.meta.url);

// Le vrai expanseur d'electron-builder : c'est lui qui juge, pas nous.
const { expandMacro } = exiger('app-builder-lib/out/util/macroExpander.js');

const paquet = JSON.parse(readFileSync(join(RACINE, 'package.json'), 'utf8'));
const build = paquet.build ?? {};

/** Ce que `appInfo` fournit reellement a l'expansion, en representatif. */
const appInfo = {
  version: paquet.version,
  name: paquet.name,
  productName: build.productName ?? paquet.name,
  sanitizedProductName: build.productName ?? paquet.name,
  productFilename: build.productName ?? paquet.name,
  companyName: paquet.author ?? null,
  channel: 'latest',
};

/* Les motifs a controler, et ce que le workflow attend de chacun.
   Le glob est celui de `.github/workflows/build-windows.yml`. */
const MOTIFS = [
  { cle: 'nsis.artifactName', motif: build.nsis?.artifactName, ext: 'exe', attendu: /Setup/i },
  { cle: 'portable.artifactName', motif: build.portable?.artifactName, ext: 'exe', attendu: /portable/i },
  { cle: 'win.artifactName', motif: build.win?.artifactName, ext: 'exe', attendu: null },
  { cle: 'linux.artifactName', motif: build.linux?.artifactName, ext: 'AppImage', attendu: null },
];

const problemes = [];

process.stdout.write('\nControle de l empaquetage\n\n');

/* --- 1. Les cibles Windows sont bien declarees --------------------------- */

const cibles = (build.win?.target ?? []).map((c) => (typeof c === 'string' ? c : c.target));
for (const attendue of ['nsis', 'portable']) {
  const presente = cibles.includes(attendue);
  process.stdout.write(`  ${presente ? 'ok   ' : 'ECHEC'} cible ${attendue} declaree\n`);
  if (!presente) problemes.push(`la cible ${attendue} n'est pas declaree dans build.win.target`);
}

/* --- 2. Chaque motif s'etend vraiment ------------------------------------ */

for (const { cle, motif, ext, attendu } of MOTIFS) {
  if (!motif) continue;

  let nom;
  try {
    // Memes arguments qu'electron-builder : arch, appInfo, puis { os, ext }.
    nom = expandMacro(motif, 'x64', appInfo, { os: 'win', ext });
  } catch (erreur) {
    process.stdout.write(`  ECHEC ${cle} — ${erreur.message}\n`);
    problemes.push(`${cle} : ${erreur.message}`);
    continue;
  }

  process.stdout.write(`  ok    ${cle.padEnd(22)} → ${nom}\n`);

  // Un nom valide mais que le workflow ne sait pas retrouver est un piege
  // aussi couteux qu'un motif invalide.
  if (attendu && !attendu.test(nom)) {
    process.stdout.write(`  ECHEC ${cle} ne correspond pas au motif cherche par le workflow (${attendu})\n`);
    problemes.push(`${cle} produit « ${nom} », que le workflow ne trouvera pas (${attendu})`);
  }
}

/* --- 3. Ce que le paquet embarque ---------------------------------------- */

// L'application ne lit rien dans node_modules a l'execution : si des
// dependances de production reapparaissaient, elles seraient embarquees en
// double avec vendor/ et le paquet doublerait de taille.
const prod = Object.keys(paquet.dependencies ?? {});
process.stdout.write(
  `  ${prod.length ? 'ECHEC' : 'ok   '} aucune dependance de production a embarquer` +
    `${prod.length ? ` : ${prod.join(', ')}` : ''}\n`
);
if (prod.length) {
  problemes.push(
    `dependances de production declarees (${prod.join(', ')}) : elles seraient embarquees en double avec vendor/`
  );
}

for (const dossier of ['electron/**/*', 'app/**/*', 'python/**/*', 'vendor/**/*']) {
  const present = (build.files ?? []).includes(dossier);
  process.stdout.write(`  ${present ? 'ok   ' : 'ECHEC'} ${dossier} est embarque\n`);
  if (!present) problemes.push(`${dossier} manque dans build.files : il serait absent du paquet`);
}

/* --------------------------------------------------------------- bilan --- */

if (problemes.length) {
  process.stderr.write('\n  Problemes\n');
  for (const probleme of problemes) process.stderr.write(`    ${probleme}\n`);
  process.stderr.write(`\n  ${problemes.length} probleme(s) d empaquetage.\n\n`);
  process.exit(1);
}

process.stdout.write('\n  La configuration d empaquetage Windows est valide.\n\n');
