#!/usr/bin/env node
/**
 * Les captures d'ecran du README.
 *
 * Elles sont prises dans l'application reelle, avec un profil de demonstration
 * ecrit au format que l'application relit normalement — rien n'est simule ni
 * retouche. Une capture qui ne correspondrait pas au logiciel livre serait
 * pire qu'une absence de capture.
 *
 * Lancer : npm run captures:readme
 */
import { _electron as electron } from 'playwright';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { ouvrirNavigateur } from './navigateur.mjs';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const SORTIE = join(RACINE, 'docs/images');
const VUE = { width: 1440, height: 900 };

/* --------------------------------------------- profil de demonstration ---- */

function profilDemo() {
  const lecons = {};
  const terminees = [
    'py-1-1', 'py-1-2', 'py-1-3', 'py-1-4',
    'py-2-1', 'py-2-2', 'py-2-3', 'py-2-4', 'py-2-5',
    'py-3-1', 'py-3-2', 'py-3-3', 'py-3-4', 'py-3-5',
    'py-4-1', 'py-4-2', 'py-4-3',
    'html-1-1', 'html-1-2', 'html-1-3', 'html-1-4',
    'html-2-1', 'html-2-2', 'html-2-3',
    'css-1-1', 'css-1-2', 'css-1-3',
  ];
  for (const identifiant of terminees) {
    lecons[identifiant] = {
      terminee: true,
      reussieLe: new Date().toISOString(),
      tentatives: identifiant.endsWith('3') ? 3 : 1,
      indices: identifiant.endsWith('3') ? 1 : 0,
      tempsMs: 260000,
      xp: 20,
    };
  }
  lecons['css-1-4'] = { terminee: false, tentatives: 2, indices: 1, tempsMs: 140000, xp: 0 };

  const tempsParJour = {};
  for (let recul = 0; recul < 24; recul += 1) {
    if (recul % 7 === 3) continue; // des jours sautes : une serie realiste
    const date = new Date();
    date.setDate(date.getDate() - recul);
    tempsParJour[date.toISOString().slice(0, 10)] = 900000 + (recul % 5) * 400000;
  }

  return {
    version: 1,
    creeLe: new Date(Date.now() - 86400000 * 26).toISOString(),
    prenom: 'Théo',
    langue: 'fr',
    reglages: {
      theme: 'sombre',
      animations: true,
      sons: false,
      mascotte: true,
      taillePolice: 'normale',
      codeTuteur: null,
    },
    xp: terminees.length * 22,
    lecons,
    badges: ['premier-programme', 'serie-7', 'premier-site', 'chasseur-de-bugs'],
    serie: { jours: 6, dernierJour: new Date().toISOString().slice(0, 10), record: 11 },
    tempsParJour,
    brouillons: {},
    bacASable: {},
  };
}

/* ------------------------------------------------------------- captures --- */

rmSync(SORTIE, { recursive: true, force: true });
mkdirSync(SORTIE, { recursive: true });

const dossierProfil = join(os.tmpdir(), `cwm-readme-${Date.now()}`);
const application = await electron.launch({
  args: [RACINE, '--no-sandbox', `--user-data-dir=${dossierProfil}`],
  env: { ...process.env, CWM_DOSSIER_PROJETS: join(os.tmpdir(), `cwm-readme-projets-${Date.now()}`) },
});

const page = await application.firstWindow();
const cheminUserData = await application.evaluate(({ app }) => app.getPath('userData'));
mkdirSync(cheminUserData, { recursive: true });
writeFileSync(join(cheminUserData, 'profil.json'), JSON.stringify(profilDemo(), null, 2), 'utf8');
await page.reload();

await page.setViewportSize(VUE);
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
// La mascotte salue pendant 3,6 s : on attend qu'elle se taise, sinon sa
// bulle recouvre le texte des cartes sur la capture.
await page.waitForTimeout(5200);

async function capturer(nom, route, attente = 1400) {
  await page.evaluate((cible) => {
    window.location.hash = cible;
  }, route);
  await page.waitForTimeout(attente);
  await page.screenshot({ path: join(SORTIE, `${nom}.png`) });
  process.stdout.write(`  docs/images/${nom}.png\n`);
}

process.stdout.write('\nCaptures du README\n\n');

await capturer('accueil', '#/accueil', 2200);
await capturer('parcours', '#/parcours/python', 1900);

/* --- L'atelier Python, avec un vrai dessin de tortue --------------------- */

await page.evaluate(() => {
  window.location.hash = '#/lecon/python/py-4-4';
});
await page.waitForSelector('.CodeMirror', { timeout: 30000 });
await page.waitForTimeout(1500);
await page.evaluate(() => {
  document.querySelector('.CodeMirror').CodeMirror.setValue(
    'import turtle\n\nturtle.speed(0)\ncouleurs = ["#00E5FF", "#B14BFF", "#FF3D8B", "#3DFFA8"]\n\n' +
      'for i in range(36):\n    turtle.pencolor(couleurs[i % 4])\n    turtle.width(2)\n' +
      '    turtle.forward(140)\n    turtle.left(170)\n'
  );
});
await page.locator('.atelier__centre button', { hasText: /Exécuter|Run/i }).first().click();
await page.waitForFunction(
  () => {
    const toile = document.querySelector('.toile-tortue');
    if (!toile) return false;
    const pixels = toile.getContext('2d').getImageData(0, 0, toile.width, toile.height).data;
    let dessines = 0;
    for (let i = 3; i < pixels.length; i += 4) if (pixels[i] !== 0 && ++dessines > 4000) return true;
    return false;
  },
  { timeout: 150000 }
);
await page.waitForTimeout(1200);
await page.screenshot({ path: join(SORTIE, 'atelier-python.png') });
process.stdout.write('  docs/images/atelier-python.png\n');

/* --- L'atelier CSS, en mode Objectif / Ton resultat ---------------------- */

await page.evaluate(() => {
  window.location.hash = '#/lecon/css/css-2-4';
});
await page.waitForSelector('.compare', { timeout: 20000 });
await page.waitForTimeout(2600);
await page.screenshot({ path: join(SORTIE, 'atelier-css.png') });
process.stdout.write('  docs/images/atelier-css.png\n');

await capturer('galerie', '#/galerie', 1600);
await capturer('tuteur', '#/tuteur', 1800);

/* --- Le certificat, rendu tel qu'il sera imprime ------------------------- */

const certificat = await page.evaluate(async () => {
  const { construireCertificatHtml } = await import('app://app/js/certificat.js');
  const { parcoursParId } = await import('app://app/content/parcours.js');
  return construireCertificatHtml(parcoursParId('python'));
});

await application.close();
rmSync(dossierProfil, { recursive: true, force: true });

const fichierCertificat = join(os.tmpdir(), `cwm-certificat-${Date.now()}.html`);
writeFileSync(fichierCertificat, certificat, 'utf8');

const navigateur = await ouvrirNavigateur();
const vueCertificat = await navigateur.newPage({ viewport: { width: 1123, height: 794 } });
await vueCertificat.goto(`file://${fichierCertificat}`);
await vueCertificat.waitForTimeout(500);
await vueCertificat.screenshot({ path: join(SORTIE, 'certificat.png') });
await navigateur.close();
rmSync(fichierCertificat, { force: true });
process.stdout.write('  docs/images/certificat.png\n\n');
