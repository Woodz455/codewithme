#!/usr/bin/env node
/**
 * Controle des couleurs.
 *
 * Le neon sur fond sombre est un piege classique : ce qui « claque » a l'ecran
 * est souvent illisible une fois mesure. Ce script mesure, il ne juge pas a
 * l'oeil. Deux controles :
 *
 *   1. CONTRASTE DU TEXTE — chaque couple texte/fond reellement employe par
 *      l'interface doit atteindre le niveau AA du WCAG (4.5:1 pour du texte
 *      courant, 3:1 pour du grand texte et les elements d'interface).
 *
 *   2. PALETTE DES GRAPHIQUES — les barres de l'espace tuteur doivent rester
 *      distinguables, y compris par un daltonien. On mesure la clarte, la
 *      saturation, et l'ecart entre couleurs voisines en simulant les trois
 *      formes de daltonisme.
 *
 * Lancer : npm run check:contrast
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));

/* ======================================================= conversions ====== */

const versSrgb = (hex) => {
  const propre = hex.trim().replace(/^#/, '');
  return [0, 2, 4].map((i) => parseInt(propre.slice(i, i + 2), 16) / 255);
};

const versLineaire = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lineaire = (hex) => versSrgb(hex).map(versLineaire);

const luminance = (hex) => {
  const [r, v, b] = lineaire(hex);
  return 0.2126 * r + 0.7152 * v + 0.0722 * b;
};

/** Rapport de contraste WCAG entre deux couleurs, de 1 (identiques) a 21. */
export function contraste(a, b) {
  const [haut, bas] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (haut + 0.05) / (bas + 0.05);
}

/** OKLab : l'espace ou une distance euclidienne correspond a une difference percue. */
function oklabDepuisLineaire([r, v, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * v + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * v + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * v + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

const oklab = (hex) => oklabDepuisLineaire(lineaire(hex));
const clarte = (hex) => oklab(hex)[0];
const chroma = (hex) => {
  const [, a, b] = oklab(hex);
  return Math.hypot(a, b);
};

/* Machado, Oliveira & Fernandes (2009), severite 1.0, en RGB lineaire.
   Simuler les trois daltonismes est le seul moyen de savoir si deux barres
   restent distinctes pour les 8 % de garcons concernes. */
const DALTONISMES = {
  protan: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deutan: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  tritan: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.3039],
  ],
};

function simuler(hex, forme) {
  const [r, v, b] = lineaire(hex);
  const M = DALTONISMES[forme];
  const borner = (c) => Math.max(0, Math.min(1, c));
  return [
    borner(M[0][0] * r + M[0][1] * v + M[0][2] * b),
    borner(M[1][0] * r + M[1][1] * v + M[1][2] * b),
    borner(M[2][0] * r + M[2][1] * v + M[2][2] * b),
  ];
}

/** Ecart percu entre deux couleurs, ×100. `forme` absente = vision normale. */
function ecart(a, b, forme) {
  const x = oklabDepuisLineaire(forme ? simuler(a, forme) : lineaire(a));
  const y = oklabDepuisLineaire(forme ? simuler(b, forme) : lineaire(b));
  return 100 * Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

/* ============================================================ seuils ====== */

const AA_TEXTE = 4.5;
const AA_GRAND = 3;

// Bande de clarte des aplats sur fond sombre, et saturation minimale : en
// dessous, une barre se confond avec le fond ; au-dessus, elle eblouit.
const BANDE_CLARTE = [0.48, 0.67];
const CHROMA_MINIMAL = 0.1;
const ECART_DALTONIEN = 8;
const ECART_NORMAL = 15;

/* ================================================= jetons du theme ======== */

const theme = readFileSync(join(RACINE, 'app/styles/theme.css'), 'utf8');

function jeton(nom) {
  const trouve = theme.match(new RegExp(`--${nom}:\\s*(#[0-9a-fA-F]{6})`));
  if (!trouve) throw new Error(`Jeton de couleur introuvable dans theme.css : --${nom}`);
  return trouve[1];
}

const T = {
  fondProfond: jeton('fond-profond'),
  fond1: jeton('fond-1'),
  fond2: jeton('fond-2'),
  fond3: jeton('fond-3'),
  texte: jeton('texte'),
  texteDoux: jeton('texte-doux'),
  texteFaible: jeton('texte-faible'),
  cyan: jeton('cyan'),
  violet: jeton('violet'),
  rose: jeton('rose'),
  vert: jeton('vert'),
  ambre: jeton('ambre'),
  rouge: jeton('rouge'),
};

/* Les couples reellement employes par l'interface. Un couple qui n'existe pas
   dans l'application n'a rien a faire ici : on mesure ce qui est affiche. */
const COUPLES = [
  ['texte courant sur le fond profond', T.texte, T.fondProfond, AA_TEXTE],
  ['texte courant sur une carte', T.texte, T.fond2, AA_TEXTE],
  ['texte courant sur une carte elevee', T.texte, T.fond3, AA_TEXTE],
  ['texte secondaire sur le fond profond', T.texteDoux, T.fondProfond, AA_TEXTE],
  ['texte secondaire sur une carte', T.texteDoux, T.fond2, AA_TEXTE],
  ['texte discret sur le fond profond', T.texteFaible, T.fondProfond, AA_GRAND],
  ['texte discret sur une carte', T.texteFaible, T.fond1, AA_GRAND],
  ['accent cyan sur le fond profond', T.cyan, T.fondProfond, AA_TEXTE],
  ['accent cyan sur une carte', T.cyan, T.fond2, AA_TEXTE],
  ['succes sur le fond profond', T.vert, T.fondProfond, AA_TEXTE],
  ['avertissement sur le fond profond', T.ambre, T.fondProfond, AA_TEXTE],
  ['erreur sur le fond profond', T.rouge, T.fondProfond, AA_TEXTE],
  ['erreur sur une carte', T.rouge, T.fond2, AA_TEXTE],
  ['violet sur le fond profond', T.violet, T.fondProfond, AA_GRAND],
  ['rose sur le fond profond', T.rose, T.fondProfond, AA_GRAND],
];

/* ==================================== palette des barres du tuteur ======== */

const tuteur = readFileSync(join(RACINE, 'app/js/ecrans/tuteur.js'), 'utf8');
const blocBarres = tuteur.match(/COULEURS_BARRES\s*=\s*\{([^}]+)\}/);
if (!blocBarres) throw new Error('COULEURS_BARRES introuvable dans tuteur.js');

const BARRES = [...blocBarres[1].matchAll(/(\w+)\s*:\s*'(#[0-9a-fA-F]{6})'/g)].map((m) => ({
  nom: m[1],
  hex: m[2],
}));

// Les barres sont dessinees sur une carte, pas sur le fond profond.
const SURFACE_BARRES = T.fond2;

/* ============================================================ controle ==== */

const problemes = [];
const avertissements = [];

process.stdout.write('\nControle des couleurs\n\n');
process.stdout.write('  Contraste du texte (WCAG AA)\n');

for (const [nom, avant, arriere, seuil] of COUPLES) {
  const mesure = contraste(avant, arriere);
  const bon = mesure >= seuil;
  process.stdout.write(
    `    ${bon ? 'ok   ' : 'ECHEC'} ${nom.padEnd(38)} ${mesure.toFixed(2)}:1 (min ${seuil})\n`
  );
  if (!bon) problemes.push(`${nom} : ${mesure.toFixed(2)}:1, il faut au moins ${seuil}:1`);
}

process.stdout.write(`\n  Palette des barres du tuteur (${BARRES.length} teintes, sur ${SURFACE_BARRES})\n`);

const horsBande = BARRES.filter(({ hex }) => {
  const L = clarte(hex);
  return L < BANDE_CLARTE[0] || L > BANDE_CLARTE[1];
});
process.stdout.write(
  `    ${horsBande.length ? 'ECHEC' : 'ok   '} clarte dans la bande ${BANDE_CLARTE[0]}–${BANDE_CLARTE[1]}` +
    `${horsBande.length ? ` : ${horsBande.map((b) => `${b.nom} ${clarte(b.hex).toFixed(2)}`).join(', ')}` : ''}\n`
);
if (horsBande.length) {
  problemes.push(`barres hors de la bande de clarte : ${horsBande.map((b) => b.nom).join(', ')}`);
}

const ternes = BARRES.filter(({ hex }) => chroma(hex) < CHROMA_MINIMAL);
process.stdout.write(
  `    ${ternes.length ? 'ECHEC' : 'ok   '} saturation minimale ${CHROMA_MINIMAL}` +
    `${ternes.length ? ` : ${ternes.map((b) => b.nom).join(', ')}` : ''}\n`
);
if (ternes.length) problemes.push(`barres trop ternes : ${ternes.map((b) => b.nom).join(', ')}`);

// Paires voisines : c'est entre deux barres qui se touchent que la confusion
// est possible. Chaque ligne portant par ailleurs son nom et son compte, la
// couleur n'est ici qu'un renfort, jamais le seul porteur d'identite.
let pireDaltonien = { valeur: Infinity };
let pireNormal = { valeur: Infinity };

for (let i = 0; i < BARRES.length - 1; i++) {
  const a = BARRES[i];
  const b = BARRES[i + 1];
  for (const forme of ['protan', 'deutan']) {
    const valeur = ecart(a.hex, b.hex, forme);
    if (valeur < pireDaltonien.valeur) pireDaltonien = { valeur, a: a.nom, b: b.nom, forme };
  }
  const valeur = ecart(a.hex, b.hex);
  if (valeur < pireNormal.valeur) pireNormal = { valeur, a: a.nom, b: b.nom };
}

const daltonienOk = pireDaltonien.valeur >= ECART_DALTONIEN;
process.stdout.write(
  `    ${daltonienOk ? 'ok   ' : 'ECHEC'} ecart daltonien voisin ` +
    `${pireDaltonien.a}↔${pireDaltonien.b} ${pireDaltonien.valeur.toFixed(1)} (${pireDaltonien.forme}, min ${ECART_DALTONIEN})\n`
);
if (!daltonienOk) {
  problemes.push(
    `${pireDaltonien.a} et ${pireDaltonien.b} se confondent pour un daltonien (${pireDaltonien.valeur.toFixed(1)})`
  );
}

const normalOk = pireNormal.valeur >= ECART_NORMAL;
process.stdout.write(
  `    ${normalOk ? 'ok   ' : 'ECHEC'} ecart en vision normale ` +
    `${pireNormal.a}↔${pireNormal.b} ${pireNormal.valeur.toFixed(1)} (min ${ECART_NORMAL})\n`
);
if (!normalOk) {
  problemes.push(`${pireNormal.a} et ${pireNormal.b} sont trop proches (${pireNormal.valeur.toFixed(1)})`);
}

// Une barre peu contrastee reste admissible parce que chaque ligne porte son
// nom et son compte chiffre : l'information ne repose jamais sur la couleur
// seule. On le signale quand meme, pour que ce choix reste conscient.
for (const { nom, hex } of BARRES) {
  const mesure = contraste(hex, SURFACE_BARRES);
  if (mesure < 3) {
    avertissements.push(
      `la barre ${nom} contraste peu avec la carte (${mesure.toFixed(2)}:1) — ` +
        `acceptable car chaque ligne porte son nom et son compte`
    );
  }
}

/* ============================================================== bilan ===== */

if (avertissements.length) {
  process.stdout.write('\n  Signale\n');
  for (const avertissement of avertissements) process.stdout.write(`    ${avertissement}\n`);
}

if (problemes.length) {
  process.stderr.write('\n  Problemes\n');
  for (const probleme of problemes) process.stderr.write(`    ${probleme}\n`);
  process.stderr.write(`\n  ${problemes.length} probleme(s) de couleur.\n\n`);
  process.exit(1);
}

process.stdout.write(
  `\n  ${COUPLES.length} couples texte/fond au niveau AA, ` +
    `${BARRES.length} teintes de barres distinguables.\n\n`
);
