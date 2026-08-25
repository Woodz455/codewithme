/**
 * Bit — la mascotte.
 *
 * Un petit robot entierement dessine en SVG (donc net a toute taille, leger,
 * et original : aucune image tierce). Il reagit a ce qui se passe : reussite,
 * erreur, execution en cours, longue inactivite.
 *
 * Etats : repos · parle · reflechit · reussite · erreur · fete
 */
import { h } from './core/ui.js';
import { texte } from './core/i18n.js';

const ETATS = ['repos', 'parle', 'reflechit', 'reussite', 'erreur', 'fete'];

const PHRASES_INACTIVITE = [
  { fr: 'Toujours là ? Prends ton temps.', en: 'Still there? Take your time.' },
  { fr: 'Un petit essai, même raté, c’est déjà du code.', en: 'A failed attempt is still code.' },
  { fr: 'Astuce : lis le message d’erreur, il dit souvent tout.', en: 'Tip: read the error message, it usually says it all.' },
];

let hote = null;
let element = null;
let bulle = null;
let etatCourant = 'repos';
let minuteurBulle = null;
let minuteurInactivite = null;
let visible = true;

/* ------------------------------------------------------------- le dessin -- */

function dessiner() {
  const gabarit = `
    <svg class="bit__corps" viewBox="0 0 120 130" role="img" aria-label="Bit">
      <defs>
        <linearGradient id="bitCasque" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stop-color="#1E2748"/>
          <stop offset="100%" stop-color="#10152A"/>
        </linearGradient>
        <linearGradient id="bitVisiere" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00E5FF"/>
          <stop offset="100%" stop-color="#B14BFF"/>
        </linearGradient>
        <filter id="bitLueur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="flou"/>
          <feMerge><feMergeNode in="flou"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- antenne -->
      <line x1="60" y1="20" x2="60" y2="8" stroke="#3A4780" stroke-width="3" stroke-linecap="round"/>
      <circle class="bit__ampoule" cx="60" cy="7" r="5" fill="#FF3D8B" filter="url(#bitLueur)"/>

      <!-- corps -->
      <rect x="30" y="86" width="60" height="34" rx="14" fill="url(#bitCasque)" stroke="#3A4780" stroke-width="2"/>
      <rect x="46" y="96" width="28" height="4" rx="2" fill="#3A4780"/>
      <rect x="46" y="105" width="18" height="4" rx="2" fill="#3A4780"/>

      <!-- bras -->
      <g class="bit__bras bit__bras--gauche">
        <rect x="16" y="90" width="14" height="8" rx="4" fill="#2A345E" stroke="#3A4780" stroke-width="2"/>
      </g>
      <g class="bit__bras bit__bras--droit">
        <rect x="90" y="90" width="14" height="8" rx="4" fill="#2A345E" stroke="#3A4780" stroke-width="2"/>
      </g>

      <!-- tete -->
      <g class="bit__tete">
        <rect x="20" y="20" width="80" height="66" rx="24" fill="url(#bitCasque)" stroke="#3A4780" stroke-width="2"/>
        <!-- visiere -->
        <rect class="bit__visiere" x="30" y="34" width="60" height="38" rx="18" fill="url(#bitVisiere)" opacity="0.16"/>
        <rect x="30" y="34" width="60" height="38" rx="18" fill="none" stroke="url(#bitVisiere)" stroke-width="2" opacity="0.65"/>

        <!-- yeux -->
        <g class="bit__yeux" filter="url(#bitLueur)">
          <rect class="bit__oeil bit__oeil--gauche" x="42" y="46" width="9" height="14" rx="4.5" fill="#00E5FF"/>
          <rect class="bit__oeil bit__oeil--droit" x="69" y="46" width="9" height="14" rx="4.5" fill="#00E5FF"/>
        </g>

        <!-- bouche : un simple trait qui change de forme selon l'humeur -->
        <path class="bit__bouche" d="M50 66 Q60 71 70 66" fill="none" stroke="#00E5FF" stroke-width="2.5"
              stroke-linecap="round" opacity="0.9"/>

        <!-- oreilles -->
        <rect x="12" y="44" width="8" height="18" rx="4" fill="#2A345E" stroke="#3A4780" stroke-width="2"/>
        <rect x="100" y="44" width="8" height="18" rx="4" fill="#2A345E" stroke="#3A4780" stroke-width="2"/>
      </g>

      <!-- etincelles de celebration -->
      <g class="bit__etincelles">
        <path d="M18 30 l2.5 5.5 5.5 2.5 -5.5 2.5 -2.5 5.5 -2.5 -5.5 -5.5 -2.5 5.5 -2.5z" fill="#FFD93D"/>
        <path d="M104 26 l2 4.5 4.5 2 -4.5 2 -2 4.5 -2 -4.5 -4.5 -2 4.5 -2z" fill="#3DFFA8"/>
        <path d="M100 74 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8z" fill="#FF3D8B"/>
      </g>
    </svg>`;

  const conteneur = h('div.bit', { dataset: { etat: 'repos' } });
  conteneur.innerHTML = gabarit;
  return conteneur;
}

/* --------------------------------------------------------------- montage -- */

export function monter(hoteElement) {
  hote = hoteElement;
  element = dessiner();
  bulle = h('div.bit__bulle', { hidden: true });

  hote.replaceChildren(bulle, element);

  // Un clic sur Bit declenche une petite reaction : il doit se sentir vivant.
  element.addEventListener('click', () => {
    definirEtat('fete', 1200);
    parler({ fr: 'On code ?', en: 'Shall we code?' }, 2200);
  });

  reprogrammerInactivite();
  return element;
}

/* ----------------------------------------------------------------- etats -- */

/** @param {'repos'|'parle'|'reflechit'|'reussite'|'erreur'|'fete'} etat */
export function definirEtat(etat, dureeMs = 0) {
  if (!element || !ETATS.includes(etat)) return;
  etatCourant = etat;
  element.dataset.etat = etat;
  if (dureeMs > 0) {
    setTimeout(() => {
      if (etatCourant === etat) definirEtat('repos');
    }, dureeMs);
  }
}

/** Affiche une bulle de dialogue. `contenu` accepte { fr, en } ou une chaine. */
export function parler(contenu, dureeMs = 3600) {
  if (!bulle || !visible) return;
  clearTimeout(minuteurBulle);

  bulle.textContent = texte(contenu);
  bulle.hidden = false;
  bulle.classList.remove('bit__bulle--sortie');
  // Force le redemarrage de l'animation d'entree.
  void bulle.offsetWidth;
  bulle.classList.add('bit__bulle--entree');

  if (etatCourant === 'repos') definirEtat('parle', Math.min(dureeMs, 2000));

  minuteurBulle = setTimeout(() => {
    bulle.classList.remove('bit__bulle--entree');
    bulle.classList.add('bit__bulle--sortie');
    setTimeout(() => {
      bulle.hidden = true;
    }, 220);
  }, dureeMs);

  reprogrammerInactivite();
}

export function taire() {
  clearTimeout(minuteurBulle);
  if (bulle) bulle.hidden = true;
}

/* ------------------------------------------------------------- reactions -- */

export function reagirReussite(message = null) {
  definirEtat('reussite', 2600);
  parler(message || { fr: 'Impeccable !', en: 'Nailed it!' }, 2600);
}

export function reagirErreur(message = null) {
  definirEtat('erreur', 2400);
  parler(
    message || { fr: 'Pas grave, on regarde ensemble.', en: 'No worries, let us look together.' },
    3200
  );
}

export function reagirExecution() {
  definirEtat('reflechit', 1500);
}

export function reagirBadge(nomBadge) {
  definirEtat('fete', 3600);
  parler(
    {
      fr: `Nouveau badge : ${texte(nomBadge)} !`,
      en: `New badge: ${texte(nomBadge)}!`,
    },
    4000
  );
}

/* ---------------------------------------------------------- inactivite ---- */

function reprogrammerInactivite() {
  clearTimeout(minuteurInactivite);
  minuteurInactivite = setTimeout(() => {
    if (!visible) return;
    const phrase = PHRASES_INACTIVITE[Math.floor(Math.random() * PHRASES_INACTIVITE.length)];
    parler(phrase, 4200);
  }, 150000); // 2 min 30 sans rien : Bit relance doucement
}

export function signalerActivite() {
  reprogrammerInactivite();
}

/* ------------------------------------------------------------- visibilite - */

export function definirVisibilite(estVisible) {
  visible = Boolean(estVisible);
  if (hote) hote.hidden = !visible;
  if (!visible) {
    taire();
    clearTimeout(minuteurInactivite);
  } else {
    reprogrammerInactivite();
  }
}

export function estVisible() {
  return visible;
}
