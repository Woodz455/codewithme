/**
 * Extraction des icones et des logos de langages.
 *
 * Deux sources, toutes deux libres et installees en dependances de
 * developpement :
 *   - lucide-static (ISC)  : icones d'interface au trait, 24x24, currentColor
 *   - devicon (MIT)        : logos officiels des langages, en couleurs d'origine
 *
 * On n'embarque PAS ces paquets (180 Mo a eux deux) : ce script extrait
 * uniquement les icones reellement utilisees et genere un seul fichier,
 * `app/js/icones-generees.js`, de quelques dizaines de Ko.
 *
 * Le resultat est un « sprite » : chaque dessin est declare une fois dans un
 * <symbol>, et chaque affichage n'est qu'un <use>. C'est indispensable ici :
 * les logos contiennent des degrades identifies par un `id`, et les dupliquer
 * dans la page creerait des identifiants en double.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/* ------------------------------------------------------------------ icones --
   Nom employe dans l'application  ->  fichier lucide.
   Les noms sont metier, pas graphiques : si l'icone du bac a sable change un
   jour, seule cette table bouge. */

export const ICONES = {
  // Navigation
  accueil: 'house',
  projets: 'images',
  bacASable: 'flask-conical',
  badges: 'award',
  tuteur: 'graduation-cap',
  reglages: 'settings',

  // Atelier
  executer: 'play',
  arreter: 'square',
  reinitialiser: 'rotate-ccw',
  indice: 'lightbulb',
  solution: 'key-round',
  verifier: 'check',
  console: 'terminal',
  apercu: 'monitor',
  dessin: 'turtle',
  defi: 'target',
  retour: 'arrow-left',
  suivant: 'arrow-right',

  // Progression et recompenses
  flamme: 'flame',
  trophee: 'trophy',
  etincelles: 'sparkles',
  reussi: 'circle-check',
  reflechir: 'brain',
  temps: 'clock',
  calendrier: 'calendar-days',
  statistiques: 'chart-column',

  // Modules — Python
  premiersPas: 'hand',
  calcul: 'calculator',
  decision: 'git-branch',
  tortue: 'turtle',
  boite: 'package',

  // Modules — HTML
  page: 'file-code',
  image: 'image',
  liste: 'list',
  formulaire: 'pen-line',

  // Modules — CSS
  palette: 'palette',
  regle: 'ruler',
  aimant: 'magnet',

  // Modules — JavaScript
  souris: 'mouse-pointer-click',
  boucle: 'repeat',
  manette: 'gamepad-2',

  // Modules — C++
  fusee: 'rocket',
  clavier: 'keyboard',

  // Badges
  livre: 'book-open',
  pinceau: 'brush',
  globe: 'globe',
  eclair: 'zap',
  engrenage: 'cog',
  bug: 'bug',
  terre: 'earth',
  couronne: 'crown',

  // Actions diverses
  dossier: 'folder-open',
  ouvrirDehors: 'external-link',
  supprimer: 'trash-2',
  enregistrer: 'save',
  telecharger: 'download',
  importer: 'upload',
  cadenas: 'lock',
  info: 'info',
  attention: 'circle-alert',
  fermer: 'x',
  code: 'code',
};

/* ------------------------------------------------------------------- logos --
   Les marques restent la propriete de leurs detenteurs ; elles servent ici a
   identifier le langage enseigne, comme dans tout editeur de code. */

export const LOGOS = {
  python: 'python/python-original',
  html: 'html5/html5-original',
  css: 'css3/css3-original',
  javascript: 'javascript/javascript-original',
  cpp: 'cplusplus/cplusplus-original',
};

/* --------------------------------------------------------------- extraction */

/** Recupere le contenu interne d'un SVG et son viewBox. */
function depouiller(source) {
  const sansCommentaires = source.replace(/<!--[\s\S]*?-->/g, '');
  const viewBox = sansCommentaires.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 24 24';
  const contenu = sansCommentaires
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return { viewBox, contenu };
}

function echapperPourJs(texte) {
  return texte.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

/**
 * Genere `app/js/icones-generees.js`.
 * @returns {{icones:number, logos:number, octets:number}}
 */
export function genererIcones(racineModules, fichierSortie) {
  const symboles = [];

  for (const [nom, fichier] of Object.entries(ICONES)) {
    const chemin = join(racineModules, 'lucide-static/icons', `${fichier}.svg`);
    const { viewBox, contenu } = depouiller(readFileSync(chemin, 'utf8'));
    symboles.push(`<symbol id="i-${nom}" viewBox="${viewBox}">${contenu}</symbol>`);
  }

  for (const [nom, fichier] of Object.entries(LOGOS)) {
    const chemin = join(racineModules, 'devicon/icons', `${fichier}.svg`);
    const { viewBox, contenu } = depouiller(readFileSync(chemin, 'utf8'));
    symboles.push(`<symbol id="logo-${nom}" viewBox="${viewBox}">${contenu}</symbol>`);
  }

  const sortie =
    `/**\n` +
    ` * Genere automatiquement par \`npm run vendor\` — ne pas modifier a la main.\n` +
    ` *\n` +
    ` * Icones d'interface : lucide-static (ISC).\n` +
    ` * Logos des langages : devicon (MIT). Les marques appartiennent a leurs\n` +
    ` * detenteurs respectifs et servent ici a identifier le langage enseigne.\n` +
    ` */\n\n` +
    `export const NOMS_ICONES = ${JSON.stringify(Object.keys(ICONES))};\n\n` +
    `export const NOMS_LOGOS = ${JSON.stringify(Object.keys(LOGOS))};\n\n` +
    `export const SPRITE = \`${echapperPourJs(symboles.join('\n'))}\`;\n`;

  writeFileSync(fichierSortie, sortie, 'utf8');

  return {
    icones: Object.keys(ICONES).length,
    logos: Object.keys(LOGOS).length,
    octets: Buffer.byteLength(sortie, 'utf8'),
  };
}
