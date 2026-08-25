#!/usr/bin/env node
/**
 * Lance l'application et enregistre des captures d'ecran.
 *
 *   node tests/capture.mjs [dossier-de-sortie]
 *
 * Deux series sont produites : profil vierge (ce que voit un nouvel arrivant)
 * et profil avance (ce que voit l'eleve apres quelques semaines). La seconde
 * n'invente rien : elle ecrit un vrai fichier de profil, au format reel, que
 * l'application relit normalement.
 */
import { _electron as electron } from 'playwright';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const SORTIE = process.argv[2] || join(RACINE, 'captures');

/* --------------------------------------------------- profil de demonstration */

function profilAvance() {
  const lecons = {};
  const terminees = [
    'py-1-1', 'py-1-2', 'py-1-3', 'py-1-4',
    'py-2-1', 'py-2-2', 'py-2-3', 'py-2-4', 'py-2-5',
    'py-3-1', 'py-3-2', 'py-3-3',
    'html-1-1', 'html-1-2', 'html-1-3',
  ];
  for (const identifiant of terminees) {
    lecons[identifiant] = {
      terminee: true,
      reussieLe: new Date().toISOString(),
      tentatives: 1 + (identifiant.endsWith('3') ? 2 : 0),
      indices: identifiant.endsWith('3') ? 1 : 0,
      tempsMs: 240000,
      xp: 20,
    };
  }
  // Une lecon commencee mais pas terminee.
  lecons['py-3-4'] = { terminee: false, tentatives: 3, indices: 2, tempsMs: 180000, xp: 0 };

  const tempsParJour = {};
  for (let recul = 0; recul < 7; recul += 1) {
    if (recul === 3) continue; // un jour saute, pour que la bande soit realiste
    const date = new Date();
    date.setDate(date.getDate() - recul);
    tempsParJour[date.toISOString().slice(0, 10)] = 1500000 + recul * 120000;
  }

  return {
    version: 1,
    creeLe: new Date(Date.now() - 86400000 * 21).toISOString(),
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
    xp: 15 * 20 + 40,
    lecons,
    badges: ['premier-programme', 'serie-7', 'premier-site', 'chasseur-de-bugs'],
    serie: { jours: 6, dernierJour: new Date().toISOString().slice(0, 10), record: 9 },
    tempsParJour,
    brouillons: {},
    bacASable: {},
  };
}

/** Ecrans a photographier : [nom, route, attente]. */
const ECRANS = [
  ['accueil', '#/accueil', 1300],
  ['parcours-python', '#/parcours/python', 1700],
  ['parcours-css', '#/parcours/css', 1700],
];

async function serie({ nom, profil, langue, viewport }) {
  const dossierProfil = join(os.tmpdir(), `cwm-captures-${nom}-${Date.now()}`);

  const application = await electron.launch({
    args: [RACINE, '--no-sandbox', `--user-data-dir=${dossierProfil}`],
  });

  const erreurs = [];
  let page = await application.firstWindow();
  page.on('pageerror', (erreur) => erreurs.push(`${nom} : ${erreur}`));
  page.on('console', (message) => {
    if (message.type() === 'error') erreurs.push(`${nom} : ${message.text()}`);
  });

  // Le profil doit etre ecrit la ou l'application ira le chercher : on demande
  // le chemin exact plutot que de le deviner.
  if (profil) {
    const cheminUserData = await application.evaluate(({ app }) => app.getPath('userData'));
    mkdirSync(cheminUserData, { recursive: true });
    writeFileSync(join(cheminUserData, 'profil.json'), JSON.stringify(profil, null, 2), 'utf8');
    await page.reload();
  }

  await page.setViewportSize(viewport);
  await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
  await page.waitForTimeout(1900);

  if (langue === 'en') {
    await page.click('#boutonLangue');
    await page.waitForTimeout(700);
  }

  for (const [nomEcran, route, attente] of ECRANS) {
    await page.evaluate((cible) => {
      window.location.hash = cible;
    }, route);
    await page.waitForTimeout(attente);
    const fichier = `${nom}-${nomEcran}.png`;
    await page.screenshot({ path: join(SORTIE, fichier) });
    process.stdout.write(`  ${fichier}\n`);
  }

  await application.close();
  rmSync(dossierProfil, { recursive: true, force: true });
  return erreurs;
}

async function main() {
  rmSync(SORTIE, { recursive: true, force: true });
  mkdirSync(SORTIE, { recursive: true });

  const erreurs = [];
  erreurs.push(
    ...(await serie({ nom: '1-debut', profil: null, langue: 'fr', viewport: { width: 1440, height: 900 } }))
  );
  erreurs.push(
    ...(await serie({
      nom: '2-avance',
      profil: profilAvance(),
      langue: 'fr',
      viewport: { width: 1440, height: 900 },
    }))
  );
  erreurs.push(
    ...(await serie({
      nom: '3-anglais',
      profil: profilAvance(),
      langue: 'en',
      viewport: { width: 1440, height: 900 },
    }))
  );
  // Petit portable : verifie qu'aucun ecran ne casse en 1366x768.
  erreurs.push(
    ...(await serie({
      nom: '4-petit-ecran',
      profil: profilAvance(),
      langue: 'fr',
      viewport: { width: 1366, height: 768 },
    }))
  );

  if (erreurs.length) {
    process.stderr.write(`\nErreurs relevees :\n${erreurs.join('\n')}\n`);
    process.exit(1);
  }
  process.stdout.write(`\n  Captures dans ${SORTIE}\n\n`);
}

main().catch((erreur) => {
  process.stderr.write(`\nEchec des captures : ${erreur?.stack || erreur}\n`);
  process.exit(1);
});
