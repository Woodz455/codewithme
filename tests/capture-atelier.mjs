#!/usr/bin/env node
/**
 * Captures de l'atelier en fonctionnement : console, dessin de la tortue,
 * defi reussi. Sert a montrer le rendu reel et a reperer les regressions
 * visuelles.
 */
import { _electron as electron } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const SORTIE = join(process.cwd(), 'captures');
mkdirSync(SORTIE, { recursive: true });

const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-cap-${Date.now()}`)}`],
});
const page = await application.firstWindow();
page.on('pageerror', (erreur) => console.log('[erreur page]', String(erreur).split('\n')[0]));

await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1800);

async function ouvrirLecon(identifiant) {
  await page.evaluate((cible) => {
    window.location.hash = `#/lecon/python/${cible}`;
  }, identifiant);
  await page.waitForSelector('.CodeMirror', { timeout: 15000 });
  await page.waitForTimeout(900);
}

async function ecrire(code) {
  await page.evaluate((valeur) => {
    document.querySelector('.CodeMirror').CodeMirror.setValue(valeur);
  }, code);
}

async function executerEtAttendre(delai = 2500) {
  await page.click('.atelier__centre .bouton--principal');
  await page.waitForFunction(() => document.querySelector('.console__fin') !== null, { timeout: 90000 });
  await page.waitForTimeout(delai);
}

/* --- 1. Console : le premier programme ------------------------------------ */

await ouvrirLecon('py-1-1');
await ecrire(`# Mon tout premier programme
print("Salut le monde !")
print("Je m'appelle Théo et j'apprends à coder.")

for i in range(1, 4):
    print("Ligne numéro", i)
`);
await executerEtAttendre(600);
await page.screenshot({ path: join(SORTIE, 'atelier-1-console.png') });
console.log('  atelier-1-console.png');

/* --- 2. Dessin de la tortue ----------------------------------------------- */

await ecrire(`import turtle

couleurs = ["#00E5FF", "#B14BFF", "#FF3D8B", "#3DFFA8", "#FFD93D"]

turtle.speed(0)
turtle.pensize(2)

for i in range(60):
    turtle.pencolor(couleurs[i % 5])
    turtle.forward(180)
    turtle.left(150)

turtle.hideturtle()
print("Rosace terminée !")
`);
await executerEtAttendre(3000);
await page.screenshot({ path: join(SORTIE, 'atelier-2-tortue.png') });
console.log('  atelier-2-tortue.png');

/* --- 3. Defi reussi -------------------------------------------------------- */

await ouvrirLecon('py-1-2');
await ecrire('print("Je m’appelle Théo")\nprint("J’ai 12 ans")\nprint("J’apprends à coder")');
await page.click('.atelier__resultat .bouton--succes');
await page.waitForSelector('#celebration:not([hidden])', { timeout: 40000 });
await page.waitForTimeout(1100);
await page.screenshot({ path: join(SORTIE, 'atelier-3-victoire.png') });
console.log('  atelier-3-victoire.png');

await page.click('.victoire .bouton--principal');
await page.waitForTimeout(500);
await page.screenshot({ path: join(SORTIE, 'atelier-4-verdict.png') });
console.log('  atelier-4-verdict.png');

await application.close();
