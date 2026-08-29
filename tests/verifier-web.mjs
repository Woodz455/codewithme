#!/usr/bin/env node
/**
 * La version web, dans un vrai navigateur, sur ce qui sera vraiment publie.
 *
 * Ce test construit `dist-web/`, le sert avec les en-tetes du fichier
 * `_headers`, et ouvre un Chromium ordinaire — pas Electron. C'est la seule
 * facon de prouver que le site tient debout tout seul : une traduction `app://`
 * oubliee, un fichier absent de la copie, ou une isolation d'origine mal posee
 * ne se voient nulle part ailleurs.
 *
 * Le point le plus important est l'isolation d'origine. Sans elle,
 * `SharedArrayBuffer` n'existe pas et l'`input()` de Python cesse de bloquer :
 * l'eleve verrait la question sans jamais pouvoir y repondre. Ce test le
 * mesure sur le vrai moteur, pas sur la presence de l'en-tete.
 *
 * Lancer : npm run test:web
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ouvrirNavigateur } from '../tools/navigateur.mjs';
import { demarrer } from '../tools/serveur-web.mjs';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(RACINE, 'dist-web');

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

/* ------------------------------------------------------- 1. construction -- */

process.stdout.write('\nVersion web\n\nConstruction\n\n');

execFileSync('node', [join(RACINE, 'tools/build-web.mjs')], { stdio: 'inherit' });

verifier('index.html est a la racine du site', existsSync(join(DIST, 'index.html')));
verifier('le pont navigateur est copie', existsSync(join(DIST, 'pont-navigateur.js')));
verifier('vendor/ est copie', existsSync(join(DIST, 'vendor/pyodide/pyodide.mjs')));
verifier('python/turtle.py est copie', existsSync(join(DIST, 'python/turtle.py')));
verifier('le fichier _headers est ecrit', existsSync(join(DIST, '_headers')));

const entetes = readFileSync(join(DIST, '_headers'), 'utf8');
verifier(
  'les en-tetes declarent l isolation d origine',
  /Cross-Origin-Opener-Policy: same-origin/.test(entetes) &&
    /Cross-Origin-Embedder-Policy: require-corp/.test(entetes),
  'sans elle, input() cesserait de bloquer'
);

const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf8');
verifier(
  'le pont est charge avant l interface',
  indexHtml.indexOf('pont-navigateur.js') < indexHtml.indexOf('type="module"'),
  'window.cwm doit exister avant que app.js demarre'
);
verifier('index.html ne contient plus d adresse app://', !indexHtml.includes('app://'));

/* ---------------------------------------------------------- 2. le site --- */

verifier('le service worker est ecrit', existsSync(join(DIST, 'sw.js')));
const serviceWorker = readFileSync(join(DIST, 'sw.js'), 'utf8');
verifier(
  'sa liste de prechargement a ete remplie',
  !serviceWorker.includes('__PRECACHE__') && !serviceWorker.includes('__VERSION__'),
  'les marqueurs du modele sont restes en place'
);
verifier(
  'Pyodide est exclu du prechargement',
  !serviceWorker.includes('/vendor/pyodide/pyodide.asm.wasm'),
  '13 Mo imposes des la premiere visite'
);

const { adresse, fermer } = await demarrer({ dossier: DIST, silencieux: true });
const navigateur = await ouvrirNavigateur();
const contexte = await navigateur.newContext();
const page = await contexte.newPage();

// Tout ce que le navigateur n'a pas reussi a charger, et tout ce qui a explose.
const manquants = [];
const erreursPage = [];
page.on('response', (r) => {
  if (r.status() >= 400) manquants.push(`${r.status()} ${new URL(r.url()).pathname}`);
});
page.on('pageerror', (e) => erreursPage.push(String(e?.message || e)));

process.stdout.write('\nDemarrage dans un navigateur ordinaire\n\n');

let demarre = true;
await page.goto(adresse, { waitUntil: 'domcontentloaded' });
try {
  await page.waitForSelector('#application:not([hidden])', { timeout: 30000 });
} catch {
  demarre = false;
}
verifier("l application demarre a l adresse racine", demarre, erreursPage.join(' | '));

const isolation = await page.evaluate(() => ({
  isole: window.crossOriginIsolated,
  memoirePartagee: typeof SharedArrayBuffer === 'function',
  pont: typeof window.cwm === 'object' && window.cwm !== null,
}));

verifier('la page est isolee (crossOriginIsolated)', isolation.isole === true);
verifier(
  'SharedArrayBuffer est disponible',
  isolation.memoirePartagee,
  "sans lui, l'input() de Python ne bloquerait plus"
);
verifier('le pont window.cwm est en place', isolation.pont);

const infos = await page.evaluate(() => window.cwm.infos());
verifier('le pont s annonce comme navigateur', infos.plateforme === 'web', JSON.stringify(infos));

/* ------------------------------------------------------------ 3. Python -- */

process.stdout.write('\nPython dans le navigateur\n\n');

const resultatPython = await page.evaluate(async () => {
  const { MoteurPython } = await import('/js/runners/python.js');
  const moteur = new MoteurPython();
  const sortie = [];
  const erreurs = [];
  let demandes = 0;

  const fini = new Promise((resoudre) => {
    moteur.sur('sortie', (lignes) => lignes.forEach((l) => sortie.push(l.texte)));
    moteur.sur('entree', () => {
      demandes += 1;
      // Le delai est deliberé : si input() ne bloquait pas, le programme
      // serait deja fini quand la reponse arrive, et le test le verrait.
      setTimeout(() => moteur.repondre('Louis'), 300);
    });
    moteur.sur('erreur', (message) => {
      erreurs.push(message);
      resoudre();
    });
    moteur.sur('termine', () => resoudre());
  });

  await moteur.executer('nom = input("Ton prenom ? ")\nprint("Bonjour", nom, "!")\nprint(2 ** 10)');
  await Promise.race([fini, new Promise((r) => setTimeout(r, 60000))]);
  moteur.detruire();
  return { texte: sortie.join(''), erreurs, demandes };
});

verifier(
  'un programme Python s execute',
  resultatPython.texte.includes('1024'),
  `${resultatPython.texte} ${resultatPython.erreurs.join(' ')}`
);
verifier('input() a bien ete demande', resultatPython.demandes === 1, String(resultatPython.demandes));
verifier(
  'input() a VRAIMENT bloque et recu la reponse',
  resultatPython.texte.includes('Bonjour Louis'),
  resultatPython.texte || resultatPython.erreurs.join(' ')
);

// La tortue est le principal levier de motivation, et le seul endroit qui
// telecharge `/python/turtle.py` : si la copie l'avait oublie, rien d'autre ne
// le dirait.
const dessin = await page.evaluate(async () => {
  const { MoteurPython } = await import('/js/runners/python.js');
  const moteur = new MoteurPython();
  const commandes = [];
  const erreurs = [];
  const fini = new Promise((resoudre) => {
    moteur.sur('dessin', (lot) => lot.forEach((c) => commandes.push(c)));
    moteur.sur('erreur', (m) => { erreurs.push(m); resoudre(); });
    moteur.sur('termine', () => resoudre());
  });
  await moteur.executer('import turtle\nt = turtle.Turtle()\nfor _ in range(4):\n    t.forward(80)\n    t.left(90)');
  await Promise.race([fini, new Promise((r) => setTimeout(r, 60000))]);
  moteur.detruire();
  return { commandes: commandes.length, erreurs };
});

verifier(
  'la tortue dessine (module turtle.py servi)',
  dessin.commandes > 0 && dessin.erreurs.length === 0,
  `${dessin.commandes} commandes ${dessin.erreurs.join(' ')}`
);

/* ------------------------------------------------------------- 4. apercu -- */

process.stdout.write('\nApercu HTML / CSS / JS\n\n');

const resultatApercu = await page.evaluate(async () => {
  const { MoteurWeb } = await import('/js/runners/web.js');
  const cadre = document.createElement('iframe');
  cadre.style.cssText = 'position:fixed;left:-9999px;width:600px;height:400px';
  document.body.appendChild(cadre);
  const moteur = new MoteurWeb(cadre);
  await moteur.charger();
  await moteur.rendre({
    html: '<h1 id="titre">Salut</h1>',
    css: '#titre { color: rgb(255, 0, 0); }',
    js: 'document.getElementById("titre").textContent = "Change par JS";',
  });
  await new Promise((r) => setTimeout(r, 600));
  // `texte` et `style` repondent par un tableau, une entree par element trouve.
  return moteur.interroger([
    { selecteur: '#titre', quoi: 'texte' },
    { selecteur: '#titre', quoi: 'style', nom: 'color' },
  ]);
});

verifier(
  'le JavaScript de l eleve s execute dans l apercu',
  resultatApercu[0]?.[0] === 'Change par JS',
  JSON.stringify(resultatApercu[0])
);
verifier(
  'le CSS de l eleve s applique',
  /255,\s*0,\s*0/.test(String(resultatApercu[1]?.[0])),
  JSON.stringify(resultatApercu[1])
);

/* -------------------------------------------------------------- 5. C++ ---- */

process.stdout.write('\nC++\n\n');

const resultatCpp = await page.evaluate(async () => {
  const { executerCpp } = await import('/js/runners/cpp.js');
  return executerCpp(
    `
#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    cout << "Resultat : " << n * 3 << endl;
    return 0;
}
`,
    '14\n'
  );
});
verifier(
  'un programme C++ compile et tourne, cin compris',
  resultatCpp?.ok && String(resultatCpp.sortie).includes('Resultat : 42'),
  JSON.stringify(resultatCpp).slice(0, 240)
);

/* ------------------------------------------- 6. profil et projets gardes -- */

process.stdout.write('\nProfil et projets\n\n');

const persistance = await page.evaluate(async () => {
  const fiche = await window.cwm.projets.enregistrer({
    titre: 'Ma première page',
    langage: 'web',
    code: '<h1>Bonjour</h1>',
  });
  const liste = await window.cwm.projets.lister();

  const profil = await window.cwm.profil.lire();
  profil.prenom = 'Louis';
  profil.xp = 120;
  await window.cwm.profil.ecrire(profil);

  return { fiche, nombre: liste.length, present: liste.some((p) => p.id === fiche.id) };
});

verifier('un projet est enregistre', persistance.present, JSON.stringify(persistance));

// « Ses creations deviennent de vrais fichiers » est la promesse du logiciel.
// Sur le web, le fichier passe par un telechargement : ce sont ces octets-la
// qu'il faut verifier, pas ce que le stockage contient. Un code range en JSON
// se telechargerait entre guillemets, sur une seule ligne, et ne s'executerait
// plus — un defaut invisible tant qu'on ne regarde que la galerie.
const CODE_PYTHON = 'import turtle\nt = turtle.Turtle()\nt.forward(100)\n';

const telechargement = await page.evaluate(async (code) => {
  const fiche = await window.cwm.projets.enregistrer({
    titre: 'Ma rosace',
    langage: 'python',
    code,
  });

  // On intercepte le lien que le pont fabrique, et on lit le Blob qu'il vise.
  let recu = null;
  const clicOrigine = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function intercepte() {
    if (this.download) recu = { nom: this.download, url: this.href };
    else clicOrigine.call(this);
  };
  await window.cwm.projets.ouvrirDossier(fiche.id);
  HTMLAnchorElement.prototype.click = clicOrigine;

  if (!recu) return { erreur: 'aucun telechargement declenche' };
  const texte = await (await fetch(recu.url)).text();
  return { nom: recu.nom, texte };
}, CODE_PYTHON);

verifier(
  'le fichier telecharge est le code exact de l eleve',
  telechargement.texte === CODE_PYTHON,
  JSON.stringify(telechargement).slice(0, 200)
);
verifier(
  'il porte le nom du projet et la bonne extension',
  /^ma-rosace-[a-z0-9]{6}\.py$/.test(String(telechargement.nom)),
  String(telechargement.nom)
);
verifier(
  'le nom de fichier est correct malgre les accents',
  /^ma-premiere-page-[a-z0-9]{6}\.html$/.test(persistance.fiche.fichier),
  persistance.fiche.fichier
);

// Le vrai test de persistance : rechargement complet de la page.
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForSelector('#application:not([hidden])', { timeout: 30000 });

const apresRechargement = await page.evaluate(async () => ({
  projets: (await window.cwm.projets.lister()).length,
  prenom: (await window.cwm.profil.lire()).prenom,
  xp: (await window.cwm.profil.lire()).xp,
}));

verifier('le projet survit au rechargement', apresRechargement.projets === 2, String(apresRechargement.projets));
verifier(
  'le profil survit au rechargement',
  apresRechargement.prenom === 'Louis' && apresRechargement.xp === 120,
  JSON.stringify(apresRechargement)
);

/* -------------------------------------------- 7. quand le stockage est plein */

process.stdout.write('\nStockage sature\n\n');

// Un navigateur donne environ 5 Mo. Ce test le remplit vraiment, avec des
// vignettes de la taille reellement mesuree sur un dessin de tortue (58 ko en
// PNG pleine taille). Il repond a la seule question qui compte : quand ca
// casse, est-ce que ca casse HONNETEMENT ?
//
// Avant correction, la reponse etait non : sur 128 enregistrements, 89
// restaient visibles, 39 disparaissaient de la galerie tout en occupant la
// place, et l'appel renvoyait quand meme une fiche — l'eleve lisait
// « Enregistré ! » sur un projet deja perdu.
const sature = await page.evaluate(async () => {
  localStorage.clear();

  // Une image reelle, pour que la reduction du pont ait quelque chose a faire.
  const canevas = document.createElement('canvas');
  canevas.width = 800;
  canevas.height = 600;
  const contexte = canevas.getContext('2d');
  for (let i = 0; i < 400; i++) {
    contexte.strokeStyle = `hsl(${i % 360}, 90%, 55%)`;
    contexte.beginPath();
    contexte.moveTo(Math.random() * 800, Math.random() * 600);
    contexte.lineTo(Math.random() * 800, Math.random() * 600);
    contexte.stroke();
  }
  const image = canevas.toDataURL('image/png');

  let reussis = 0;
  let erreur = null;
  try {
    for (let i = 0; i < 300; i++) {
      await window.cwm.projets.enregistrer({
        titre: `Rosace ${i}`,
        langage: 'python',
        code: `# projet ${i}\n` + 'x = 1\n'.repeat(400),
        apercu: image,
      });
      reussis += 1;
    }
  } catch (e) {
    erreur = String(e?.message || e);
  }

  const liste = await window.cwm.projets.lister();
  const connus = new Set(liste.map((p) => p.id));
  let orphelins = 0;
  for (const cle of Object.keys(localStorage)) {
    if (cle.startsWith('cwm:projet:') && !connus.has(cle.slice('cwm:projet:'.length))) orphelins += 1;
  }

  // Le profil doit survivre a un stockage sature : c'est la progression de
  // l'eleve, la chose la moins remplacable de toutes.
  const profil = await window.cwm.profil.lire();
  profil.xp = 4242;
  const profilEcrit = await window.cwm.profil.ecrire(profil);

  const vignette = liste.find((p) => p.apercu)?.apercu ?? '';
  // La largeur reelle de ce qui a ete range : c'est l'enonce direct de
  // « l'image a bien ete reduite », quel que soit son contenu.
  const largeur = vignette
    ? await new Promise((r) => {
        const i = new Image();
        i.onload = () => r(i.width);
        i.onerror = () => r(0);
        i.src = vignette;
      })
    : 0;

  localStorage.clear();
  return {
    reussis,
    visibles: liste.length,
    orphelins,
    erreur,
    profilEcrit,
    tailleVignette: vignette.length,
    tailleOrigine: image.length,
    largeur,
  };
});

verifier(
  'tout enregistrement annonce reussi est visible dans la galerie',
  sature.visibles === sature.reussis,
  `${sature.reussis} annonces, ${sature.visibles} visibles`
);
verifier(
  'aucun projet fantome n occupe la place',
  sature.orphelins === 0,
  `${sature.orphelins} contenus sans fiche`
);
verifier(
  'le refus est explicite quand la place manque',
  sature.erreur === null || /plus de place/.test(sature.erreur),
  String(sature.erreur)
);
verifier(
  'le profil reste enregistrable malgre le stockage sature',
  sature.profilEcrit === true,
  String(sature.profilEcrit)
);
verifier(
  'les vignettes sont ramenees a 320 px avant d etre rangees',
  sature.largeur === 320,
  `${sature.largeur} px`
);
verifier(
  'la vignette rangee est bien plus legere que celle recue',
  sature.tailleVignette > 0 && sature.tailleVignette < sature.tailleOrigine / 4,
  `${sature.tailleVignette} contre ${sature.tailleOrigine} caracteres`
);
// Ce chiffre est un plancher, pas une promesse : l'image de ce test est le
// pire cas possible pour un JPEG (400 traits aleatoires). Un vrai dessin de
// tortue se reduit a 3,5 ko, soit dix fois moins que celle-ci.
verifier(
  'la reduction permet de garder bien plus de projets',
  sature.visibles >= 100,
  `${sature.visibles} projets tiennent (90 environ avant reduction)`
);

/* ------------------------------------------------------------ 8. hors ligne */

process.stdout.write('\nHors ligne\n\n');

// Le vrai scenario : le wifi du college lache. Avant le service worker, cette
// verification echouait — la page ne s'ouvrait tout simplement pas.
// `ready` ne se resout qu'apres l'activation, donc apres que la mise en cache
// d'installation a reellement abouti.
await page.evaluate(async () => {
  await navigator.serviceWorker.ready;
  return true;
});
await contexte.setOffline(true);

let horsLigne = false;
try {
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#application:not([hidden])', { timeout: 20000 });
  horsLigne = true;
} catch { /* reste faux */ }

verifier("l application s ouvre sans reseau", horsLigne);

// Python a tourne plus haut, donc Pyodide est passe en cache au premier
// usage : il doit marcher sans reseau lui aussi.
const pythonHorsLigne = horsLigne
  ? await page.evaluate(async () => {
      const { MoteurPython } = await import('/js/runners/python.js');
      const moteur = new MoteurPython();
      const sortie = [];
      const fini = new Promise((r) => {
        moteur.sur('sortie', (lignes) => lignes.forEach((l) => sortie.push(l.texte)));
        moteur.sur('termine', () => r());
        moteur.sur('erreur', () => r());
      });
      await moteur.executer('print(6 * 7)');
      await Promise.race([fini, new Promise((r) => setTimeout(r, 60000))]);
      moteur.detruire();
      return sortie.join('');
    })
  : '';

verifier('Python tourne encore sans reseau', pythonHorsLigne.includes('42'), pythonHorsLigne);

await contexte.setOffline(false);

/* ------------------------------------------------- 9. rien n a manque ----- */

process.stdout.write('\nChargement complet\n\n');

// Une seule ressource absente suffit a casser une lecon sans qu'on le voie.
verifier('aucune ressource manquante', manquants.length === 0, manquants.slice(0, 8).join(', '));
verifier('aucune erreur JavaScript', erreursPage.length === 0, erreursPage.slice(0, 4).join(' | '));

await navigateur.close();
await fermer();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
