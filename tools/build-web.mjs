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
import { join, relative, extname } from 'node:path';
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

/* ------------------------------------------------------------- en-tetes -- */

// Format commun a Netlify et a Cloudflare Pages. La regle generale d'abord,
// la regle de l'apercu ensuite : c'est la plus specifique qui l'emporte.
const entetes = `# Isolation d'origine.
#
# Sans ces deux en-tetes, SharedArrayBuffer n'existe pas, et l'input() de la
# console Python cesse de bloquer : l'eleve verrait la question sans jamais
# pouvoir y repondre. Un hebergeur incapable de les poser (GitHub Pages) ne
# convient pas a ce site.
/*
  Cross-Origin-Opener-Policy: ${ISOLATION['Cross-Origin-Opener-Policy']}
  Cross-Origin-Embedder-Policy: ${ISOLATION['Cross-Origin-Embedder-Policy']}
  Cross-Origin-Resource-Policy: same-origin
  Content-Security-Policy: ${EN_TETES_STATIQUES.CSP}
  X-Content-Type-Options: nosniff

# L'apercu execute le code de l'eleve : il lui faut l'inline. Il est confine
# dans une iframe bac a sable, sans acces a l'origine de l'application.
#
# L'isolation est repetee ici plutot que d'etre heritee de la regle generale :
# les hebergeurs ne s'accordent pas sur la fusion de deux regles qui
# correspondent, et une iframe qui perdrait son en-tete d'isolation ferait
# perdre a la page entiere son SharedArrayBuffer — donc l'input() de Python.
/apercu/*
  Cross-Origin-Opener-Policy: ${ISOLATION['Cross-Origin-Opener-Policy']}
  Cross-Origin-Embedder-Policy: ${ISOLATION['Cross-Origin-Embedder-Policy']}
  Cross-Origin-Resource-Policy: same-origin
  X-Content-Type-Options: nosniff
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
    `  ${mega} Mo au total\n\n` +
    `  Essayer : npm run serveur:web\n` +
    `  Publier : deposer dist-web/ sur Netlify ou Cloudflare Pages\n\n`
);
