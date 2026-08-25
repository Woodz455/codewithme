/**
 * Registre des lecons.
 *
 * Rassemble le contenu des cinq parcours. Chaque fichier `lecons-*.js` exporte
 * un objet dont les cles sont les identifiants declares dans `parcours.js`.
 */
import { LECONS_PYTHON } from './lecons-python.js';
import { LECONS_HTML } from './lecons-html.js';
import { LECONS_CSS } from './lecons-css.js';
import { LECONS_JAVASCRIPT } from './lecons-javascript.js';
import { LECONS_CPP } from './lecons-cpp.js';

export const LECONS = {
  ...LECONS_PYTHON,
  ...LECONS_HTML,
  ...LECONS_CSS,
  ...LECONS_JAVASCRIPT,
  ...LECONS_CPP,
};

/** @returns {object|null} le contenu d'une lecon, ou null si elle n'est pas encore ecrite. */
export function leconParId(identifiant) {
  const lecon = LECONS[identifiant];
  if (!lecon) return null;
  return { id: identifiant, ...lecon };
}

export function leconExiste(identifiant) {
  return Boolean(LECONS[identifiant]);
}

export function toutesLesLecons() {
  return Object.entries(LECONS).map(([identifiant, lecon]) => ({ id: identifiant, ...lecon }));
}
