#!/usr/bin/env node
/**
 * L'application EMPAQUETEE, pas les sources.
 *
 * Une liste de fichiers qui a l'air complete ne prouve rien : c'est en
 * lancant le binaire produit qu'on decouvre qu'il manque `python/turtle.py`
 * ou la moitie de `vendor/`. Ce test construit le paquet, le lance, et lui
 * fait faire ce que fera l'eleve.
 *
 * Il construit ici la cible Linux : le code applicatif est identique sur
 * Windows, seul l'empaquetage differe. Le `.exe` est bati par GitHub Actions.
 *
 * Lancer : npm run test:paquet
 */
import { _electron as electron } from 'playwright';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
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

process.stdout.write('\nApplication empaquetee\n\n');

const binaire = join(process.cwd(), 'dist/linux-unpacked/codewithme');

if (!existsSync(binaire) || process.argv.includes('--rebuild')) {
  process.stdout.write('  construction du paquet…\n');
  execFileSync('npx', ['electron-builder', '--linux', 'dir', '--publish', 'never'], { stdio: 'pipe' });
}
verifier('le paquet est produit', existsSync(binaire), binaire);

const application = await electron.launch({
  executablePath: binaire,
  args: ['--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-paquet-${Date.now()}`)}`],
  env: { ...process.env, CWM_DOSSIER_PROJETS: join(os.tmpdir(), `cwm-paquet-projets-${Date.now()}`) },
});
const page = await application.firstWindow();
const erreurs = [];
page.on('pageerror', (evenement) => erreurs.push(String(evenement)));

await page.waitForSelector('#application:not([hidden])', { timeout: 45000 });
await page.waitForTimeout(2000);

const parcours = await page.$$eval('[href*="parcours"]', (e) => e.length);
verifier('les six parcours sont la', parcours === 6, String(parcours));

/* --- Python : c'est lui qui charge Pyodide depuis vendor/ ---------------- */

await page.evaluate(() => {
  window.location.hash = '#/lecon/python/py-1-1';
});
await page.waitForSelector('.CodeMirror', { timeout: 30000 });
await page.evaluate(() => {
  document.querySelector('.CodeMirror').CodeMirror.setValue('print("depuis le paquet")');
});
await page.locator('.atelier__centre button', { hasText: /Exécuter|Run/i }).first().click();

let pythonOk = true;
try {
  await page.waitForFunction(
    () => document.querySelector('.console')?.textContent?.includes('depuis le paquet'),
    { timeout: 150000 }
  );
} catch {
  pythonOk = false;
}
verifier('Python s execute depuis le paquet', pythonOk, await page.textContent('.console').catch(() => ''));

/* --- La tortue : elle depend de python/turtle.py, hors de vendor/ -------- */

await page.evaluate(() => {
  document.querySelector('.CodeMirror').CodeMirror.setValue(
    'import turtle\nturtle.speed(0)\nfor i in range(4):\n    turtle.forward(80)\n    turtle.left(90)'
  );
});
await page.locator('.atelier__centre button', { hasText: /Exécuter|Run/i }).first().click();

let tortueOk = true;
try {
  await page.waitForFunction(
    () => {
      const toile = document.querySelector('.toile-tortue');
      if (!toile) return false;
      const pixels = toile.getContext('2d').getImageData(0, 0, toile.width, toile.height).data;
      for (let i = 3; i < pixels.length; i += 4) if (pixels[i] !== 0) return true;
      return false;
    },
    { timeout: 90000 }
  );
} catch {
  tortueOk = false;
}
verifier('la tortue dessine depuis le paquet', tortueOk, 'python/turtle.py absent du paquet ?');

/* --- Le web : le protocole app:// et l apercu ---------------------------- */

await page.evaluate(() => {
  window.location.hash = '#/lecon/css/css-1-1';
});
await page.waitForSelector('.panneau--apercu', { timeout: 20000 });
await page.waitForTimeout(2500);

const apercu = await page.evaluate(() => {
  const cadre = document.querySelector('.apercu');
  return { source: cadre?.getAttribute('src'), largeur: cadre?.getBoundingClientRect().width };
});
verifier('l apercu est servi par app://', apercu.source === 'app://app/apercu/apercu.html', apercu.source);
verifier('l apercu occupe sa place', apercu.largeur > 100, String(apercu.largeur));

/* --- C++ : JSCPP, compile depuis vendor/ -------------------------------- */

const cpp = await page.evaluate(async () => {
  const { executerCpp } = await import('app://app/js/runners/cpp.js');
  return executerCpp('#include <iostream>\nusing namespace std;\nint main() { cout << "cpp ok" << endl; return 0; }', '');
});
verifier('le C++ s execute depuis le paquet', cpp.ok && cpp.sortie.includes('cpp ok'), JSON.stringify(cpp));

verifier('aucune erreur JavaScript', erreurs.length === 0, erreurs.join(' | '));

await application.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
