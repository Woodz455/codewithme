/**
 * Ce que la version web et l'application de bureau ont en commun.
 *
 * L'application est chargee par un protocole maison `app://`. Un navigateur ne
 * connait pas ce protocole : il faut donc traduire ces adresses en chemins
 * ordinaires. C'est la SEULE transformation appliquee au code de l'interface,
 * et elle a lieu a la construction — les fichiers du depot ne sont pas
 * modifies, donc ajouter le web ne peut pas casser l'installateur Windows.
 *
 * La traduction reproduit exactement `resoudreChemin()` de electron/main.js :
 *
 *     app://vendor/x  → /vendor/x     (VENDOR_ROOT)
 *     app://python/x  → /python/x     (APP_ROOT/python)
 *     app://app/x     → /x            (RENDERER_ROOT, mis a la racine du site)
 *
 * Mettre le contenu de `app/` a la racine du site n'est pas cosmetique : c'est
 * ce qui permet aux adresses relatives de index.html (`./styles/theme.css`) de
 * continuer a fonctionner sans etre reecrites, et au site de s'ouvrir sur `/`.
 *
 * Ce module est partage par la construction et par le serveur de
 * developpement, pour qu'ils ne puissent pas diverger.
 */
import { dirname, join, extname, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, statSync } from 'node:fs';

export const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));

/* ------------------------------------------------------------- traduction -- */

const REECRITURES = [
  [/app:\/\/vendor\//g, '/vendor/'],
  [/app:\/\/python\//g, '/python/'],
  [/app:\/\/app\//g, '/'],
];

/** Vrai si l'occurrence restante est dans un commentaire, donc inoffensive. */
function dansUnCommentaire(ligne, position) {
  const avant = ligne.slice(0, position);
  return /(^\s*\*)|(\/\/)|(<!--)|(\/\*)/.test(avant);
}

/**
 * Traduit les adresses `app://` d'un fichier texte.
 *
 * Renvoie aussi les occurrences qui ont survecu ailleurs que dans un
 * commentaire : ce sont des adresses que le navigateur ne saurait pas charger,
 * et il vaut mieux faire echouer la construction que livrer une page qui
 * s'ouvre puis reste blanche.
 */
export function traduire(contenu) {
  let resultat = contenu;
  for (const [motif, remplacement] of REECRITURES) resultat = resultat.replace(motif, remplacement);

  const restes = [];
  resultat.split('\n').forEach((ligne, index) => {
    let position = ligne.indexOf('app://');
    while (position !== -1) {
      if (!dansUnCommentaire(ligne, position)) restes.push({ ligne: index + 1, texte: ligne.trim() });
      position = ligne.indexOf('app://', position + 1);
    }
  });

  return { contenu: resultat, restes, modifie: resultat !== contenu };
}

export const EXTENSIONS_TRADUITES = new Set(['.js', '.mjs', '.css', '.html']);

/* ------------------------------------------------------------- injection -- */

/**
 * Le pont `window.cwm` doit exister AVANT que l'interface demarre.
 *
 * En script classique, et non en module : un module est differe, et l'interface
 * — elle-meme un module — pourrait alors demarrer la premiere et trouver
 * `window.cwm` absent. Un script classique s'execute immediatement, dans
 * l'ordre du document, donc avant tout module.
 */
const BALISE_PONT = '<script src="/pont-navigateur.js"></script>';

export function injecterPont(html) {
  if (html.includes(BALISE_PONT)) return html;
  const ancre = '<script type="module"';
  const position = html.indexOf(ancre);
  if (position === -1) throw new Error("index.html n'a pas de script de demarrage ou l'injecter.");
  return `${html.slice(0, position)}${BALISE_PONT}\n    ${html.slice(position)}`;
}

/* ------------------------------------------------ correspondance des URL -- */

/**
 * De l'adresse demandee au fichier reel du depot.
 *
 * C'est l'exacte inverse de la disposition produite par la construction : le
 * serveur de developpement sert donc les memes adresses que le site publie,
 * sans qu'aucune construction ne soit necessaire pour travailler.
 */
export function fichierPour(cheminUrl) {
  let chemin = decodeURIComponent(cheminUrl.split('?')[0].split('#')[0]);
  if (chemin === '/' || chemin === '') chemin = '/index.html';

  let racine = join(RACINE, 'app');
  if (chemin === '/pont-navigateur.js') return join(RACINE, 'web/pont-navigateur.js');
  if (chemin.startsWith('/vendor/')) {
    racine = join(RACINE, 'vendor');
    chemin = chemin.slice('/vendor'.length);
  } else if (chemin.startsWith('/python/')) {
    racine = join(RACINE, 'python');
    chemin = chemin.slice('/python'.length);
  }

  // Meme garde-fou que le protocole app:// : rien hors du dossier vise.
  const cible = normalize(join(racine, chemin));
  if (cible !== racine && !cible.startsWith(racine + sep)) return null;
  if (!existsSync(cible) || !statSync(cible).isFile()) return null;
  return cible;
}

/* ----------------------------------------------------------- en-tetes web -- */

export const TYPES_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip',
  '.map': 'application/json; charset=utf-8',
  '.py': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

// Sans ces deux en-tetes, `crossOriginIsolated` est faux, SharedArrayBuffer
// n'existe pas, et `input()` cesse de bloquer : la console Python demanderait
// une reponse sans jamais l'attendre. C'est la contrainte qui decide de
// l'hebergement — GitHub Pages ne sait pas les poser, Netlify et Cloudflare
// Pages oui.
export const ISOLATION = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  "connect-src 'self' blob: data:",
  "worker-src 'self' blob:",
  "frame-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

// L'apercu execute le code HTML/CSS/JS de l'eleve : il lui faut l'inline. Il
// tourne dans une iframe bac a sable, sans acces a l'origine de l'application.
const CSP_APERCU = [
  "default-src 'self' 'unsafe-inline' data: blob:",
  "script-src 'self' 'unsafe-inline' data: blob:",
  "style-src 'self' 'unsafe-inline' data: blob:",
  "img-src * data: blob:",
  "font-src 'self' data:",
  "connect-src 'none'",
  "object-src 'none'",
].join('; ');

export function enTetes(cheminUrl, fichier) {
  const ext = extname(fichier).toLowerCase();
  const entetes = {
    'Content-Type': TYPES_MIME[ext] || 'application/octet-stream',
    'Cross-Origin-Resource-Policy': 'same-origin',
    ...ISOLATION,
  };
  if (ext === '.html') {
    entetes['Content-Security-Policy'] = cheminUrl.startsWith('/apercu/') ? CSP_APERCU : CSP;
  }
  return entetes;
}

export const EN_TETES_STATIQUES = { CSP, CSP_APERCU };
