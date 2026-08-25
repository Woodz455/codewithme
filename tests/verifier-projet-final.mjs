#!/usr/bin/env node
/**
 * Le grand projet final, mene de bout en bout comme le ferait l'eleve.
 *
 * Ce test ne se contente pas de verifier que le defi passe : il ouvre ensuite
 * le fichier .html produit **hors de l'application**, dans un navigateur nu.
 * C'est toute la promesse faite a l'eleve — « tu peux l'envoyer a quelqu'un,
 * il s'ouvrira chez lui » — et elle ne vaut que si elle est verifiee dehors.
 */
import { _electron as electron, chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
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

const dossierProjets = join(os.tmpdir(), `cwm-final-projets-${Date.now()}`);

process.stdout.write('\nGrand projet final\n\n');

const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-final-${Date.now()}`)}`],
  env: { ...process.env, CWM_DOSSIER_PROJETS: dossierProjets },
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1200);

/* --- L'eleve ouvre la lecon, va jusqu'a la solution, et la recopie -------- */

await page.evaluate(() => {
  window.location.hash = '#/lecon/projet/projet-1-1';
});
await page.waitForSelector('.atelier', { timeout: 20000 });
await page.waitForTimeout(2000);

const zones = await page.evaluate(() =>
  [...document.querySelectorAll('.onglets--code .onglet')].map((b) => b.dataset.onglet)
);
verifier('les trois langages ont chacun leur onglet', zones.join(',') === 'html,css,js', zones.join(','));

// Trois indices, puis la solution : le chemin que suit un eleve bloque.
const boutonIndice = page.locator('.atelier__centre button', { hasText: /Indice|Hint|solution/i }).first();
for (let i = 0; i < 4; i++) {
  await boutonIndice.click();
  await page.waitForTimeout(300);
}
await page.waitForSelector('.indice--solution', { timeout: 8000 });
await page.click('.indice--solution button');
await page.waitForTimeout(1000);

await page.locator('.atelier__resultat button', { hasText: /Vérifier|Check/i }).first().click();
await page.waitForTimeout(3500);

const verdict = await page.evaluate(() => {
  const zone = document.querySelector('.verdict');
  return { etat: zone?.dataset.etat, texte: zone?.textContent?.trim().slice(0, 160) };
});
verifier('le projet final est reconnu comme reussi', verdict.etat === 'reussi', JSON.stringify(verdict));

/* --- Le projet est devenu un vrai fichier -------------------------------- */

await page.waitForTimeout(1500);
await application.close();

let fichiers = [];
try {
  fichiers = readdirSync(dossierProjets).filter((nom) => nom.endsWith('.html'));
} catch {
  fichiers = [];
}
verifier('un fichier .html est ecrit sur le disque', fichiers.length === 1, JSON.stringify(fichiers));

if (!fichiers.length) {
  process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
  process.exit(1);
}

const chemin = join(dossierProjets, fichiers[0]);
const contenu = readFileSync(chemin, 'utf8');

verifier('le fichier est un document HTML complet', /^<!doctype html>/i.test(contenu.trim()), contenu.slice(0, 40));
verifier('il embarque le style de l eleve', contenu.includes('body.clair'), 'body.clair absent');
verifier('il embarque son JavaScript', contenu.includes('classList.toggle'), 'classList.toggle absent');

/* --- Et surtout : il vit tout seul, hors de l'application ---------------- */

// Un navigateur ordinaire, sans rien de l'application : c'est le seul moyen
// de prouver que le fichier vit tout seul.
const navigateur = await chromium.launch({
  args: ['--no-sandbox'],
  executablePath: process.env.CWM_CHROMIUM || '/opt/pw-browsers/chromium',
});
const dehors = await navigateur.newPage();
const erreurs = [];
dehors.on('pageerror', (erreur) => erreurs.push(String(erreur)));

await dehors.goto(pathToFileURL(chemin).href);
await dehors.waitForTimeout(600);

const structure = await dehors.evaluate(() => ({
  titre: document.querySelector('h1')?.textContent?.trim(),
  cartes: document.querySelectorAll('.carte').length,
  navFlex: getComputedStyle(document.querySelector('nav')).display,
  fond: getComputedStyle(document.body).backgroundColor,
}));

verifier('le titre s affiche hors de l application', Boolean(structure.titre), JSON.stringify(structure.titre));
verifier('les trois cartes sont la', structure.cartes === 3, String(structure.cartes));
verifier('le CSS s applique vraiment', structure.navFlex === 'flex', structure.navFlex);
verifier('le theme sombre est actif au chargement', structure.fond === 'rgb(11, 14, 26)', structure.fond);

await dehors.click('#bascule');
await dehors.waitForTimeout(300);
const apresClic = await dehors.evaluate(() => getComputedStyle(document.body).backgroundColor);
verifier('le bouton de theme fonctionne dans un navigateur nu', apresClic === 'rgb(244, 246, 255)', apresClic);

verifier('aucune erreur JavaScript hors de l application', erreurs.length === 0, erreurs.join(' | '));

await navigateur.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
