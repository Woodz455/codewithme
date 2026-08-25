#!/usr/bin/env node
/**
 * Verifie le moteur Python de bout en bout, dans l'application reelle :
 * print, calculs, bibliotheque standard, erreurs lisibles, input() bloquant,
 * dessin de la tortue, et arret d'une boucle infinie.
 */
import { _electron as electron } from 'playwright';
import os from 'node:os';
import { join } from 'node:path';

const cas = [];
const echecs = [];

function verifier(nom, condition, detail = '') {
  cas.push(nom);
  if (condition) {
    process.stdout.write(`  ok   ${nom}\n`);
  } else {
    echecs.push(`${nom}${detail ? ` — ${detail}` : ''}`);
    process.stdout.write(`  ECHEC ${nom}${detail ? ` — ${detail}` : ''}\n`);
  }
}

const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-py-${Date.now()}`)}`],
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });

// Installe un banc d'essai dans la page : le moteur y est pilote comme il le
// sera par l'atelier.
await page.evaluate(async () => {
  const { MoteurPython } = await import('app://app/js/runners/python.js');
  window.__banc = {
    async lancer(code, { reponses = [], arreterApresMs = 0 } = {}) {
      const moteur = new MoteurPython();
      const sortie = [];
      const erreurs = [];
      const dessin = [];
      let filesReponses = [...reponses];

      const fini = new Promise((resoudre) => {
        moteur.sur('sortie', (lignes) => lignes.forEach((l) => sortie.push(l)));
        moteur.sur('dessin', (commandes) => commandes.forEach((c) => dessin.push(c)));
        moteur.sur('entree', () => moteur.repondre(filesReponses.shift() ?? ''));
        moteur.sur('erreur', (message) => {
          erreurs.push(message);
          resoudre();
        });
        moteur.sur('termine', (details) => resoudre(details));
      });

      const debut = Date.now();
      await moteur.executer(code);
      if (arreterApresMs) setTimeout(() => moteur.arreter(), arreterApresMs);

      const details = await Promise.race([
        fini,
        new Promise((r) => setTimeout(() => r({ expire: true }), 30000)),
      ]);

      moteur.detruire();
      return {
        texte: sortie.filter((s) => s.flux === 'sortie').map((s) => s.texte).join(''),
        fluxErreur: sortie.filter((s) => s.flux === 'erreur').map((s) => s.texte).join(''),
        erreurs,
        dessin,
        details,
        dureeMs: Date.now() - debut,
      };
    },
  };
});

const lancer = (code, options) => page.evaluate(([c, o]) => window.__banc.lancer(c, o), [code, options || {}]);

/* ---------------------------------------------------------------- tests -- */

process.stdout.write('\nMoteur Python\n\n');

const base = await lancer('print("Bonjour le monde !")\nprint(2 + 3 * 4)');
verifier('print affiche du texte', base.texte.includes('Bonjour le monde !'), JSON.stringify(base.texte));
verifier('les calculs sont justes', base.texte.includes('14'), JSON.stringify(base.texte));

const stdlib = await lancer(`
import math, random, json
random.seed(1)
print(math.sqrt(144))
print(json.dumps({"a": 1}))
print(len([x*x for x in range(5)]))
`);
verifier('bibliotheque standard (math)', stdlib.texte.includes('12.0'), JSON.stringify(stdlib.texte));
verifier('bibliotheque standard (json)', stdlib.texte.includes('{"a": 1}'), JSON.stringify(stdlib.texte));
verifier('listes en comprehension', stdlib.texte.includes('5'), JSON.stringify(stdlib.texte));

const accents = await lancer('print("Rosace créée à l\'écran : ça marche !")');
verifier('les accents s affichent', accents.texte.includes('créée à l\'écran'), JSON.stringify(accents.texte));

const erreur = await lancer('print("avant")\nprint(1 / 0)');
verifier('l erreur est signalee', erreur.erreurs.length === 1, JSON.stringify(erreur.erreurs));
verifier(
  'le message d erreur est lisible',
  erreur.erreurs[0]?.includes('ZeroDivisionError') && !erreur.erreurs[0]?.includes('pyodide'),
  JSON.stringify(erreur.erreurs[0])
);

const saisie = await lancer(
  'nom = input("Ton prenom ? ")\nage = int(input("Ton age ? "))\nprint(f"Salut {nom}, tu auras {age + 1} ans.")',
  { reponses: ['Theo', '13'] }
);
verifier(
  'input() recoit la reponse et bloque le programme',
  saisie.texte.includes('Salut Theo, tu auras 14 ans.'),
  JSON.stringify(saisie.texte)
);

const tortue = await lancer(`
import turtle
turtle.speed(0)
turtle.color("red")
for i in range(4):
    turtle.forward(100)
    turtle.left(90)
print("carre fini")
`);
const lignes = tortue.dessin.filter((c) => c.c === 'ligne');
verifier('la tortue dessine', lignes.length === 4, `${lignes.length} traits`);
verifier('la couleur est transmise', lignes[0]?.couleur === 'red', JSON.stringify(lignes[0]));
verifier(
  'le carre se referme au point de depart',
  Math.abs(lignes[3]?.x2 ?? 99) < 0.001 && Math.abs(lignes[3]?.y2 ?? 99) < 0.001,
  JSON.stringify(lignes[3])
);
verifier('le programme continue apres le dessin', tortue.texte.includes('carre fini'));

const boucle = await lancer('i = 0\nwhile True:\n    i = i + 1', { arreterApresMs: 1200 });
verifier(
  'une boucle infinie peut etre arretee',
  boucle.details?.arrete === true && !boucle.details?.expire,
  JSON.stringify(boucle.details)
);
verifier('l arret est rapide', boucle.dureeMs < 8000, `${boucle.dureeMs} ms`);

await application.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
