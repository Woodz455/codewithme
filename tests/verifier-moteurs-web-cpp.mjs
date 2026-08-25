#!/usr/bin/env node
/**
 * Verifie les moteurs web (HTML / CSS / JavaScript) et C++ dans l'application
 * reelle : rendu, console, interrogation du resultat pour la correction,
 * isolation du bac a sable, execution et saisie en C++.
 */
import { _electron as electron } from 'playwright';
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

const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-mw-${Date.now()}`)}`],
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1200);

/* ============================================================== MOTEUR WEB */

process.stdout.write('\nMoteur web (HTML / CSS / JavaScript)\n\n');

await page.evaluate(async () => {
  const { MoteurWeb } = await import('app://app/js/runners/web.js');
  const cadre = document.createElement('iframe');
  cadre.style.cssText = 'position:fixed;left:-9999px;width:600px;height:400px';
  document.body.appendChild(cadre);

  const moteur = new MoteurWeb(cadre);
  window.__web = { moteur, journal: [] };
  moteur.sur('console', (m) => window.__web.journal.push(m));
  moteur.sur('erreur', (m) => window.__web.journal.push({ niveau: 'erreur', texte: m.message }));
  await moteur.charger();
});

const rendre = (donnees) =>
  page.evaluate(async (d) => {
    window.__web.journal.length = 0;
    await window.__web.moteur.rendre(d);
    await new Promise((r) => setTimeout(r, 450));
  }, donnees);

const interroger = (questions) =>
  page.evaluate((q) => window.__web.moteur.interroger(q), questions);

/* --- HTML --------------------------------------------------------------- */

await rendre({
  html: '<h1 id="titre">Ma page</h1><ul><li>un</li><li>deux</li><li>trois</li></ul>',
  css: '',
  js: '',
});

const [nombreLi, texteTitre, balises] = await interroger([
  { selecteur: 'li', quoi: 'nombre' },
  { selecteur: '#titre', quoi: 'texte' },
  { selecteur: 'ul > *', quoi: 'balises' },
]);

verifier('le HTML est rendu et interrogeable', nombreLi === 3, String(nombreLi));
verifier('le texte d un element est lisible', texteTitre?.[0] === 'Ma page', JSON.stringify(texteTitre));
verifier('les balises sont identifiees', balises?.join(',') === 'li,li,li', JSON.stringify(balises));

/* --- CSS ---------------------------------------------------------------- */

await rendre({
  html: '<p class="intro">Bonjour</p>',
  css: '.intro { color: rgb(255, 0, 0); font-size: 32px; text-align: center; }',
  js: '',
});

const [couleur, taille, alignement] = await interroger([
  { selecteur: '.intro', quoi: 'style', nom: 'color' },
  { selecteur: '.intro', quoi: 'style', nom: 'font-size' },
  { selecteur: '.intro', quoi: 'style', nom: 'text-align' },
]);

verifier('le CSS est applique (couleur)', couleur?.[0] === 'rgb(255, 0, 0)', JSON.stringify(couleur));
verifier('le CSS est applique (taille)', taille?.[0] === '32px', JSON.stringify(taille));
verifier('le CSS est applique (alignement)', alignement?.[0] === 'center', JSON.stringify(alignement));

/* --- JavaScript --------------------------------------------------------- */

await rendre({
  html: '<div id="cible">avant</div><button id="bouton">Clic</button>',
  css: '',
  js: `
    console.log("Bonjour depuis JavaScript", 40 + 2);
    document.getElementById("cible").textContent = "après";
    document.getElementById("bouton").addEventListener("click", () => {
      document.getElementById("cible").textContent = "cliqué";
    });
  `,
});

const journal = await page.evaluate(() => window.__web.journal);
verifier(
  'console.log remonte a l atelier',
  journal.some((m) => m.texte?.includes('Bonjour depuis JavaScript 42')),
  JSON.stringify(journal)
);

const [apresModification] = await interroger([{ selecteur: '#cible', quoi: 'texte' }]);
verifier('le JavaScript modifie la page', apresModification?.[0] === 'après', JSON.stringify(apresModification));

/* --- erreurs ------------------------------------------------------------- */

await rendre({ html: '<p>test</p>', css: '', js: 'variableInconnue.methode();' });
const journalErreur = await page.evaluate(() => window.__web.journal);
verifier(
  'une erreur JavaScript est signalee',
  journalErreur.some((m) => m.niveau === 'erreur'),
  JSON.stringify(journalErreur)
);

/* --- isolation ----------------------------------------------------------- */

await rendre({
  html: '<p>isolation</p>',
  css: '',
  js: `
    try {
      const acces = window.parent.document.title;
      console.log("FUITE:" + acces);
    } catch (e) {
      console.log("isolation OK");
    }
    console.log("origine:" + (window.origin || location.origin));
  `,
});
const journalIsolation = await page.evaluate(() => window.__web.journal);
verifier(
  'le code de l eleve ne peut pas atteindre l application',
  journalIsolation.some((m) => m.texte?.includes('isolation OK')) &&
    !journalIsolation.some((m) => m.texte?.includes('FUITE:')),
  JSON.stringify(journalIsolation)
);

/* ============================================================== MOTEUR C++ */

process.stdout.write('\nMoteur C++\n\n');

const cpp = async (source, entree = '') =>
  page.evaluate(
    async ([s, e]) => {
      const { executerCpp } = await import('app://app/js/runners/cpp.js');
      return executerCpp(s, e);
    },
    [source, entree]
  );

const bonjour = await cpp(`
#include <iostream>
using namespace std;
int main() {
    cout << "Bonjour le monde !" << endl;
    return 0;
}
`);
verifier('un programme C++ s execute', bonjour.ok && bonjour.sortie.includes('Bonjour le monde !'), JSON.stringify(bonjour));

const calculs = await cpp(`
#include <iostream>
using namespace std;
int main() {
    int a = 7, b = 3;
    cout << a + b << " " << a * b << " " << a / b << endl;
    for (int i = 1; i <= 3; i++) cout << i << " ";
    cout << endl;
    return 0;
}
`);
verifier('calculs et boucles', calculs.sortie.includes('10 21 2') && calculs.sortie.includes('1 2 3'), JSON.stringify(calculs.sortie));

const saisie = await cpp(
  `
#include <iostream>
using namespace std;
int main() {
    int age;
    cin >> age;
    cout << "Dans 10 ans tu auras " << age + 10 << " ans." << endl;
    return 0;
}
`,
  '12\n'
);
verifier('cin lit l entree fournie', saisie.sortie.includes('Dans 10 ans tu auras 22 ans.'), JSON.stringify(saisie.sortie));

const tableaux = await cpp(`
#include <iostream>
using namespace std;
int main() {
    int notes[4] = {12, 15, 8, 17};
    int total = 0;
    for (int i = 0; i < 4; i++) total += notes[i];
    cout << "Moyenne : " << total / 4 << endl;
    return 0;
}
`);
verifier('tableaux et accumulation', tableaux.sortie.includes('Moyenne : 13'), JSON.stringify(tableaux.sortie));

const fonctions = await cpp(`
#include <iostream>
using namespace std;

int carre(int n) { return n * n; }

int main() {
    cout << carre(6) << endl;
    return 0;
}
`);
verifier('fonctions avec parametres', fonctions.sortie.includes('36'), JSON.stringify(fonctions.sortie));

const erreurSyntaxe = await cpp(`
#include <iostream>
using namespace std;
int main() {
    cout << "il manque le point-virgule"
    return 0;
}
`);
verifier('une erreur C++ est detectee', !erreurSyntaxe.ok, JSON.stringify(erreurSyntaxe));
verifier(
  'l erreur C++ est expliquee en francais',
  Boolean(erreurSyntaxe.explication),
  JSON.stringify({ erreur: erreurSyntaxe.erreur, explication: erreurSyntaxe.explication })
);

const boucleInfinie = await cpp(`
#include <iostream>
int main() {
    while (true) { }
    return 0;
}
`);
verifier('une boucle infinie C++ est stoppee', !boucleInfinie.ok, JSON.stringify(boucleInfinie.erreur));

await application.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
