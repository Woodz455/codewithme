#!/usr/bin/env node
/**
 * Construit la version web dans `dist-web/`.
 *
 * L'application de bureau reste exactement ce qu'elle est : ce script ne
 * modifie aucun fichier du depot, il en produit une copie traduite. C'est la
 * propriete qui compte — l'installateur Windows qui fonctionne aujourd'hui ne
 * peut pas etre casse par le web.
 *
 * Disposition produite :
 *
 *     dist-web/index.html          app/index.html, avec le pont injecte
 *     dist-web/js|styles|content|apercu   le reste de app/
 *     dist-web/vendor  dist-web/python    tels quels
 *     dist-web/pont-navigateur.js   window.cwm, version navigateur
 *     dist-web/_headers             l'isolation d'origine, indispensable
 *
 * Lancer : npm run build:web
 */
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, extname, sep } from 'node:path';
import {
  RACINE,
  traduire,
  injecterPont,
  EXTENSIONS_TRADUITES,
  EN_TETES_STATIQUES,
  ISOLATION,
} from './web-commun.mjs';

const SORTIE = join(RACINE, 'dist-web');

/* --------------------------------------------------------------- copie -- */

rmSync(SORTIE, { recursive: true, force: true });
mkdirSync(SORTIE, { recursive: true });

// `app/` va a la RACINE du site : c'est ce qui garde valides les adresses
// relatives de index.html et permet d'ouvrir le site sur `/`.
cpSync(join(RACINE, 'app'), SORTIE, { recursive: true });
cpSync(join(RACINE, 'vendor'), join(SORTIE, 'vendor'), { recursive: true });
cpSync(join(RACINE, 'python'), join(SORTIE, 'python'), { recursive: true });
cpSync(join(RACINE, 'web/pont-navigateur.js'), join(SORTIE, 'pont-navigateur.js'));

/* ---------------------------------------------------------- traduction -- */

function fichiers(dossier) {
  const trouves = [];
  for (const entree of readdirSync(dossier, { withFileTypes: true })) {
    const chemin = join(dossier, entree.name);
    if (entree.isDirectory()) trouves.push(...fichiers(chemin));
    else trouves.push(chemin);
  }
  return trouves;
}

let traduits = 0;
let adresses = 0;
const problemes = [];

for (const chemin of fichiers(SORTIE)) {
  if (!EXTENSIONS_TRADUITES.has(extname(chemin).toLowerCase())) continue;

  const avant = readFileSync(chemin, 'utf8');
  const { contenu, restes, modifie } = traduire(avant);

  if (modifie) {
    traduits += 1;
    adresses += (avant.match(/app:\/\//g) || []).length - (contenu.match(/app:\/\//g) || []).length;
  }
  for (const reste of restes) {
    problemes.push(`${relative(SORTIE, chemin)}:${reste.ligne} — ${reste.texte}`);
  }

  if (modifie) writeFileSync(chemin, contenu);
}

// Une adresse `app://` survivante hors commentaire ne se chargerait pas : la
// page s'ouvrirait puis resterait blanche. Mieux vaut echouer ici.
if (problemes.length) {
  process.stderr.write('\nAdresses app:// non traduites :\n');
  for (const probleme of problemes) process.stderr.write(`  ${probleme}\n`);
  process.stderr.write('\nAjouter la regle manquante dans tools/web-commun.mjs.\n\n');
  process.exit(1);
}

/* ------------------------------------------------------------ injection -- */

const index = join(SORTIE, 'index.html');
writeFileSync(index, injecterPont(readFileSync(index, 'utf8')));

/* ------------------------------------------------------- service worker -- */

// Ce qui est mis en cache des l'installation : tout, SAUF Pyodide.
//
// Pyodide pese 13 Mo des 15 du site. L'imposer a la premiere visite serait
// brutal sur un forfait telephone, alors que le reste — interface, 135 lecons,
// polices, editeur, moteur C++ — tient en 2,4 Mo. Pyodide est donc mis en
// cache au premier usage par la regle de repli du service worker : des que
// l'eleve a lance Python une fois, Python marche hors ligne aussi.
const SANS_PRECHARGE = ['vendor/pyodide/', '_headers', 'sw.js'];

const aPrecharger = fichiers(SORTIE)
  .map((chemin) => relative(SORTIE, chemin).split(sep).join('/'))
  .filter((chemin) => !SANS_PRECHARGE.some((exclu) => chemin.startsWith(exclu)))
  .sort();

// La version vient du CONTENU : une mise en ligne qui ne change rien garde le
// meme cache, et la moindre correction le renouvelle. Une date de
// construction, elle, jetterait le cache de tous les eleves a chaque
// publication, meme identique.
const empreinte = createHash('sha256');
for (const chemin of aPrecharger) {
  empreinte.update(chemin);
  empreinte.update(readFileSync(join(SORTIE, chemin)));
}
const version = empreinte.digest('hex').slice(0, 12);

// `/` en plus de `index.html` : c'est l'adresse que le navigateur demande
// vraiment quand on ouvre le site.
const listePrecharge = ['/', ...aPrecharger.map((chemin) => `/${chemin}`)];

writeFileSync(
  join(SORTIE, 'sw.js'),
  readFileSync(join(RACINE, 'web/sw.js'), 'utf8')
    .replace('__VERSION__', version)
    .replace('__PRECACHE__', JSON.stringify(listePrecharge, null, 2))
);

/* ------------------------------------------------------------- en-tetes -- */

// Format commun a Netlify et a Cloudflare Pages.
//
// REGLE ABSOLUE : aucune politique de securite sur `/*`.
//
// On a longtemps cru ici que « la regle la plus specifique l'emporte ». C'est
// faux, et la mesure a coute cher : sur Cloudflare, les regles S'ADDITIONNENT.
// L'apercu recevait donc DEUX `Content-Security-Policy`, et un navigateur qui
// en recoit deux applique leur INTERSECTION. La politique generale interdit
// l'inline ; le script interne de la page d'apercu etait donc refuse :
//
//   Refused to execute inline script because it violates the following
//   Content Security Policy directive: "script-src 'self' 'wasm-unsafe-eval'"
//
// Consequence sur le site publie : l'apercu ne demarrait plus du tout, donc
// aucune lecon HTML, CSS, JavaScript ni le grand projet — 79 des 165. Et rien
// ne le signalait : la page s'ouvrait, les lecons se chargeaient, Python
// tournait. Seul l'apercu restait blanc.
//
// L'indice qui a mis sur la piste : l'apercu repondait
// `Cross-Origin-Embedder-Policy: require-corp, require-corp` — deux fois la
// meme valeur, donc deux regles appliquees.
//
// L'INVARIANT, mesure deux fois plutot qu'une : aucun en-tete ne doit etre
// pose par deux regles qui correspondent au meme chemin. Une premiere version
// de ce correctif repetait l'isolation dans chaque regle « au cas ou » — la
// page principale recevait alors `Cross-Origin-Opener-Policy: same-origin,
// same-origin`, que le navigateur REFUSE : plus d'isolation, plus de
// SharedArrayBuffer, plus d'input() bloquant. Un defaut echange contre un
// autre.
//
// Le partage tient en une phrase : l'isolation partout, la politique nulle
// part sauf sur les trois documents.
//
// Une version intermediaire de ce correctif reservait COOP et COEP aux
// documents seuls, en croyant qu'ils ne concernaient qu'eux. Mesure : le
// moteur Python tombait. Le script d'un Worker doit LUI AUSSI porter COEP pour
// que le worker soit isole — sans quoi il n'a pas de SharedArrayBuffer, et
// c'est justement lui qui fait bloquer input(). Les en-tetes d'isolation
// restent donc sur `/*`, qui couvre tout.
//
// Aucune regle ne pose deux fois le meme en-tete : l'isolation vient
// uniquement de `/*`, la politique uniquement des regles precises.
// `tests/verifier-web.mjs` le verifie sur le fichier produit, chemin par
// chemin.
const entetes = `# Tout le site : l'isolation d'origine.
#
# Sans ces en-tetes, SharedArrayBuffer n'existe pas, et l'input() de la console
# Python cesse de bloquer : l'eleve verrait la question sans jamais pouvoir y
# repondre. Un hebergeur incapable de les poser (GitHub Pages) ne convient pas.
#
# Ils sont ici ET NULLE PART AILLEURS. Une regle plus precise qui les reposerait
# les enverrait deux fois, et « same-origin, same-origin » est une valeur
# invalide que le navigateur rejette — donc plus d'isolation du tout.
#
# Cross-Origin-Resource-Policy vaut pour les sous-ressources : c'est lui qui
# autorise une page isolee a charger ses scripts, ses polices et son wasm.
/*
  Cross-Origin-Opener-Policy: ${ISOLATION['Cross-Origin-Opener-Policy']}
  Cross-Origin-Embedder-Policy: ${ISOLATION['Cross-Origin-Embedder-Policy']}
  Cross-Origin-Resource-Policy: same-origin
  X-Content-Type-Options: nosniff

# La politique de securite, elle, ne concerne que les DOCUMENTS — et ce site
# n'en a que trois adresses. Elle n'est surtout PAS sur la regle generale :
# les regles
# s'additionnent chez l'hebergeur, et deux politiques sur un meme document
# s'intersectent. C'est ce qui tuait l'apercu.
/
  Content-Security-Policy: ${EN_TETES_STATIQUES.CSP}

/index.html
  Content-Security-Policy: ${EN_TETES_STATIQUES.CSP}

# L'apercu execute le code de l'eleve : il lui faut l'inline. Il est confine
# dans une iframe bac a sable, sans acces a l'origine de l'application — c'est
# cette iframe, et non la politique, qui protege la progression de l'eleve.
/apercu/*
  Content-Security-Policy: ${EN_TETES_STATIQUES.CSP_APERCU}
`;
writeFileSync(join(SORTIE, '_headers'), entetes);

/* -------------------------------------------------------------- rapport -- */

function taille(dossier) {
  let octets = 0;
  for (const chemin of fichiers(dossier)) octets += statSync(chemin).size;
  return octets;
}

const mega = (taille(SORTIE) / 1024 / 1024).toFixed(1);
process.stdout.write(
  `\nVersion web construite dans dist-web/\n` +
    `  ${adresses} adresses app:// traduites dans ${traduits} fichiers\n` +
    `  pont navigateur injecte dans index.html\n` +
    `  ${aPrecharger.length} fichiers mis en cache des l installation (version ${version})\n` +
    `  ${mega} Mo au total\n\n` +
    `  Essayer : npm run serveur:web\n` +
    `  Publier : deposer dist-web/ sur Netlify ou Cloudflare Pages\n\n`
);
