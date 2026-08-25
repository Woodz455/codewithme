/**
 * Icones et logos.
 *
 * Tous les dessins sont declares une seule fois dans un « sprite » invisible
 * pose au demarrage ; chaque affichage n'est ensuite qu'une reference <use>.
 * C'est leger, et surtout cela evite de dupliquer les degrades des logos, qui
 * portent des identifiants et se marcheraient dessus.
 *
 * Deux familles, deux comportements :
 *   - `icone()` : trait fin qui prend la couleur du texte (currentColor), donc
 *     s'accorde automatiquement au parcours ou a l'etat courant ;
 *   - `logo()`  : logo officiel du langage, en couleurs d'origine.
 */
import { SPRITE, NOMS_ICONES, NOMS_LOGOS } from './icones-generees.js';

const ESPACE_SVG = 'http://www.w3.org/2000/svg';
const ESPACE_XLINK = 'http://www.w3.org/1999/xlink';

let installe = false;

/** Depose le sprite dans la page. Appele une fois, au demarrage. */
export function installerSprite() {
  if (installe) return;
  const hote = document.createElement('div');
  hote.setAttribute('aria-hidden', 'true');
  hote.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  hote.innerHTML = `<svg xmlns="${ESPACE_SVG}" xmlns:xlink="${ESPACE_XLINK}">${SPRITE}</svg>`;
  document.body.prepend(hote);
  installe = true;
}

function referencer(identifiant, classe, options) {
  const svg = document.createElementNS(ESPACE_SVG, 'svg');
  svg.setAttribute('class', options.classe ? `${classe} ${options.classe}` : classe);

  if (options.titre) {
    // Icone porteuse de sens : elle est annoncee aux lecteurs d'ecran.
    svg.setAttribute('role', 'img');
    const titre = document.createElementNS(ESPACE_SVG, 'title');
    titre.textContent = options.titre;
    svg.append(titre);
  } else {
    // Icone decorative : le texte a cote dit deja tout.
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
  }

  if (options.taille) {
    svg.style.width = options.taille;
    svg.style.height = options.taille;
  }

  const usage = document.createElementNS(ESPACE_SVG, 'use');
  usage.setAttribute('href', `#${identifiant}`);
  svg.append(usage);
  return svg;
}

/**
 * Icone d'interface.
 * @param {string} nom  cle de `tools/icones.mjs` (accueil, executer, flamme...)
 * @param {{taille?:string, classe?:string, titre?:string}} [options]
 */
export function icone(nom, options = {}) {
  if (!NOMS_ICONES.includes(nom)) {
    console.warn(`[icones] icone inconnue : ${nom}`);
    return referencer('i-info', 'icone', options);
  }
  return referencer(`i-${nom}`, 'icone', options);
}

/**
 * Logo officiel d'un langage, en couleurs d'origine.
 * @param {'python'|'html'|'css'|'javascript'|'cpp'} langage
 */
export function logo(langage, options = {}) {
  if (!NOMS_LOGOS.includes(langage)) {
    // Le grand projet final n'est pas un langage : il en combine trois, et
    // n'a donc pas de logo officiel. Une icone d'interface fait alors office
    // d'embleme, sans que ce soit une anomalie.
    if (NOMS_ICONES.includes(langage)) return referencer(`i-${langage}`, 'icone', options);
    console.warn(`[icones] logo inconnu : ${langage}`);
    return referencer('i-code', 'icone', options);
  }
  return referencer(`logo-${langage}`, 'logo', options);
}

/** Logo pose sur un medaillon sombre, qui le detache du fond neon. */
export function medaillonLogo(langage, options = {}) {
  const boite = document.createElement('span');
  boite.className = options.classe ? `medaillon ${options.classe}` : 'medaillon';
  if (options.taille) boite.style.setProperty('--taille-medaillon', options.taille);
  boite.append(logo(langage, { titre: options.titre }));
  return boite;
}

export { NOMS_ICONES, NOMS_LOGOS };
