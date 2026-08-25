#!/usr/bin/env node
/**
 * Certificat de fin de parcours.
 *
 * Deux choses a prouver, et aucune ne se voit dans le code :
 *   1. le bouton n'apparait QUE lorsque le parcours est reellement acheve —
 *      une recompense affichee d'avance n'en est pas une ;
 *   2. le document produit est un PDF valide, en paysage, portant le prenom
 *      de l'eleve. Le PDF est rendu depuis une URL `data:`, sans acces au
 *      protocole app:// : c'est le genre de detail qui ne casse qu'a
 *      l'execution.
 */
import { _electron as electron } from 'playwright';
import { readFileSync } from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';

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

process.stdout.write('\nCertificat\n\n');

const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-certif-${Date.now()}`)}`],
  env: { ...process.env, CWM_DOSSIER_PROJETS: join(os.tmpdir(), `cwm-certif-projets-${Date.now()}`) },
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1200);

/* --- Avant : le parcours n'est pas fini, pas de bouton ------------------- */

await page.evaluate(() => {
  window.location.hash = '#/parcours/html';
});
await page.waitForSelector('.ecran-parcours', { timeout: 15000 });
await page.waitForTimeout(600);

verifier(
  'aucun certificat tant que le parcours n est pas acheve',
  (await page.$$eval('.certificat__bouton', (e) => e.length)) === 0
);

/* --- On termine le parcours HTML, comme l'aurait fait l'eleve ------------ */

await page.evaluate(async () => {
  const store = await import('app://app/js/core/store.js');
  const { leconsDuParcours } = await import('app://app/content/parcours.js');
  store.definirPrenom('Théo');
  for (const fiche of leconsDuParcours('html')) {
    store.terminerLecon(fiche.id, { xp: 20, tentatives: 1, indices: 0, tempsMs: 1000 });
  }
});

await page.evaluate(() => {
  window.location.hash = '#/accueil';
});
await page.waitForTimeout(400);
await page.evaluate(() => {
  window.location.hash = '#/parcours/html';
});
await page.waitForSelector('.ecran-parcours', { timeout: 15000 });
await page.waitForTimeout(600);

verifier(
  'le certificat apparait une fois le parcours acheve',
  (await page.$$eval('.certificat__bouton', (e) => e.length)) === 1
);

/* --- Le document lui-meme ------------------------------------------------ */

const document_ = await page.evaluate(async () => {
  const { construireCertificatHtml, parcoursAcheve, toutAcheve } = await import('app://app/js/certificat.js');
  const { parcoursParId, nombreLeconsTotal } = await import('app://app/content/parcours.js');
  return {
    html: construireCertificatHtml(parcoursParId('html')),
    complet: construireCertificatHtml(null),
    total: nombreLeconsTotal(),
    htmlAcheve: parcoursAcheve('html'),
    pythonAcheve: parcoursAcheve('python'),
    tout: toutAcheve(),
  };
});

verifier('le parcours HTML est reconnu comme acheve', document_.htmlAcheve === true);
verifier('un parcours non commence ne l est pas', document_.pythonAcheve === false);
verifier('le programme entier n est pas declare fini a tort', document_.tout === false);
verifier('le certificat porte le prenom de l eleve', document_.html.includes('Théo'), 'prenom absent');
verifier('il nomme le parcours acheve', document_.html.includes('Parcours HTML'), 'intitule absent');
verifier(
  'il annonce le nombre de lecons du parcours, pas la progression',
  document_.html.includes('14 leçons'),
  'compte de lecons absent ou faux'
);
// Un certificat enonce un fait acquis : le programme complet vaut son total,
// jamais le compteur de lecons deja faites (qui vaudrait 14 dans ce profil).
verifier(
  'le certificat du programme complet annonce le total du programme',
  document_.complet.includes(`soit ${document_.total} leçons`),
  document_.complet.match(/soit \d+ leçons/)?.[0] ?? 'introuvable'
);
verifier(
  'il n appelle aucune ressource app:// (indisponible a l impression)',
  !document_.html.includes('app://'),
  'une ressource app:// ne se chargerait pas dans la fenetre d impression'
);

/* --- Et le PDF est reellement produit ------------------------------------ */

const chemin = join(os.tmpdir(), `cwm-certificat-${Date.now()}.pdf`);

// On court-circuite la boite de dialogue de sauvegarde, qui ne peut pas etre
// pilotee : c'est le rendu PDF qu'on veut eprouver, pas l'explorateur Windows.
await application.evaluate(async ({ dialog }, cible) => {
  dialog.showSaveDialog = async () => ({ canceled: false, filePath: cible });
}, chemin);

const resultat = await page.evaluate(async () => {
  const { enregistrerCertificat } = await import('app://app/js/certificat.js');
  const { parcoursParId } = await import('app://app/content/parcours.js');
  return enregistrerCertificat(parcoursParId('html'));
});

verifier('l enregistrement aboutit', resultat.annule === false && Boolean(resultat.chemin), JSON.stringify(resultat));

let pdf = Buffer.alloc(0);
try {
  pdf = readFileSync(chemin);
} catch (erreur) {
  // signale par les verifications suivantes
}

verifier('le fichier produit est bien un PDF', pdf.subarray(0, 5).toString() === '%PDF-', pdf.subarray(0, 8).toString());
verifier('le PDF n est pas vide', pdf.length > 5000, `${pdf.length} octets`);

// A4 paysage : 842 × 595 points. Le certificat perd tout son air en portrait.
const boite = pdf.toString('latin1').match(/MediaBox\s*\[\s*0\s+0\s+([\d.]+)\s+([\d.]+)/);
verifier(
  'le PDF est en paysage',
  Boolean(boite) && Number(boite[1]) > Number(boite[2]),
  boite ? `${boite[1]} × ${boite[2]}` : 'MediaBox introuvable'
);

await application.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
