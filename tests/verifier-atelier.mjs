#!/usr/bin/env node
/**
 * Verifie l'atelier dans l'application reelle : ouverture d'une lecon,
 * execution du code, correction d'un defi, gain d'XP, et persistance apres
 * redemarrage de l'application.
 */
import { _electron as electron } from 'playwright';
import os from 'node:os';
import { join } from 'node:path';
import { rmSync } from 'node:fs';

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

const dossierProfil = join(os.tmpdir(), `cwm-atelier-${Date.now()}`);
const lancer = () =>
  electron.launch({ args: [process.cwd(), '--no-sandbox', `--user-data-dir=${dossierProfil}`] });

process.stdout.write('\nAtelier\n\n');

let application = await lancer();
let page = await application.firstWindow();
const erreursPage = [];
page.on('pageerror', (e) => erreursPage.push(String(e)));

await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1800);

/* --- ouverture d'une lecon ------------------------------------------------ */

await page.evaluate(() => {
  window.location.hash = '#/lecon/python/py-1-1';
});
await page.waitForSelector('.atelier', { timeout: 10000 });
await page.waitForSelector('.CodeMirror', { timeout: 15000 });

verifier('la lecon s ouvre', await page.isVisible('.atelier__titre'));
verifier(
  'le titre est celui de la lecon',
  (await page.textContent('.atelier__titre')).includes('premier programme'),
  await page.textContent('.atelier__titre')
);
verifier('l explication est affichee', (await page.textContent('.lecon-texte')).includes('print'));
verifier('l editeur est pret', await page.isVisible('.CodeMirror'));

/* --- execution d'un code faux --------------------------------------------- */

async function ecrireDansEditeur(code) {
  await page.evaluate((valeur) => {
    document.querySelector('.CodeMirror').CodeMirror.setValue(valeur);
  }, code);
}

await ecrireDansEditeur('print("Mauvaise reponse")');
await page.click('.atelier__actions .bouton--principal');
await page.waitForFunction(() => document.querySelector('.console__fin') !== null, { timeout: 60000 });

verifier(
  'le code s execute et affiche',
  (await page.textContent('.console')).includes('Mauvaise reponse'),
  await page.textContent('.console')
);

/* --- correction refusee avec un message precis ---------------------------- */

await page.click('.bouton--succes');
await page.waitForSelector('.verdict[data-etat="echec"]', { timeout: 30000 });
const messageEchec = await page.textContent('.verdict__texte');
verifier('un defi rate est signale', messageEchec.length > 10);
verifier(
  'le message dit ce qui ne va pas',
  messageEchec.includes('Mauvaise reponse') && messageEchec.includes('Salut le monde'),
  messageEchec
);

/* --- indices -------------------------------------------------------------- */

await page.click('.atelier__actions .bouton--fantome:not(.bouton--petit)');
await page.waitForSelector('.indice', { timeout: 5000 });
verifier('un indice s affiche', (await page.textContent('.indice')).includes('print'));

/* --- correction reussie ---------------------------------------------------- */

await ecrireDansEditeur('print("Salut le monde !")');
await page.click('.bouton--succes');
await page.waitForSelector('.verdict[data-etat="reussi"]', { timeout: 30000 });

verifier('le defi reussi est reconnu', await page.isVisible('.verdict[data-etat="reussi"]'));
verifier('l XP est annoncee', (await page.textContent('.verdict__actions')).includes('XP'));

await page.waitForSelector('#celebration:not([hidden])', { timeout: 8000 });
verifier('l ecran de victoire apparait', await page.isVisible('.victoire'));
verifier(
  'un badge est decerne',
  (await page.textContent('.victoire')).includes('Premier programme'),
  await page.textContent('.victoire')
);

await page.click('.victoire .bouton--principal');
await page.waitForTimeout(400);

const xpApres = await page.evaluate(() => document.querySelector('.bandeau__xpValeur')?.textContent);
verifier('l XP est creditee dans le bandeau', /\b(20|2\d)\s*\//.test(xpApres || ''), xpApres);

/* --- persistance apres redemarrage ---------------------------------------- */

await page.waitForTimeout(900); // laisse la sauvegarde differee s ecrire
await application.close();

application = await lancer();
page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1800);

const etatRecharge = await page.evaluate(() => ({
  xp: document.querySelector('.bandeau__xpValeur')?.textContent,
  lecons: document.body.innerText.includes('1'),
}));
verifier(
  'la progression survit au redemarrage',
  /^\s*20\s*\//.test(etatRecharge.xp || ''),
  etatRecharge.xp
);

await page.evaluate(() => {
  window.location.hash = '#/parcours/python';
});
await page.waitForSelector('.noeud', { timeout: 10000 });
verifier(
  'la lecon apparait terminee sur la carte',
  (await page.getAttribute('.noeud', 'data-etat')) === 'terminee',
  await page.getAttribute('.noeud', 'data-etat')
);

verifier('aucune erreur JavaScript', erreursPage.length === 0, erreursPage.join(' | '));

await application.close();
rmSync(dossierProfil, { recursive: true, force: true });

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
