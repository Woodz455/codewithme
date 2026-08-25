/**
 * XP, badges et celebrations.
 *
 * La regle : recompenser l'effort reel, jamais le clic. Un badge s'obtient en
 * faisant quelque chose, pas en ouvrant un ecran.
 */
import { h, remplir, compter } from './core/ui.js';
import { t, texte } from './core/i18n.js';
import * as store from './core/store.js';
import * as bit from './mascotte.js';
import { PARCOURS, leconsDuParcours, nombreLeconsTotal } from '../content/parcours.js';

/* --------------------------------------------------------------- badges -- */

export const BADGES = [
  {
    id: 'premier-programme',
    icone: '🚀',
    couleur: 'var(--cyan)',
    nom: { fr: 'Premier programme', en: 'First program' },
    note: { fr: 'Tu as réussi ta toute première leçon.', en: 'You completed your very first lesson.' },
    obtenu: () => store.nombreLeconsTerminees() >= 1,
  },
  {
    id: 'dix-lecons',
    icone: '📚',
    couleur: 'var(--violet)',
    nom: { fr: 'Dix leçons', en: 'Ten lessons' },
    note: { fr: 'Dix leçons terminées. Ça devient une habitude.', en: 'Ten lessons done. It is becoming a habit.' },
    obtenu: () => store.nombreLeconsTerminees() >= 10,
  },
  {
    id: 'serie-7',
    icone: '🔥',
    couleur: 'var(--ambre)',
    nom: { fr: 'Sept jours d’affilée', en: 'Seven days in a row' },
    note: { fr: 'Une semaine complète sans t’arrêter.', en: 'A full week without stopping.' },
    obtenu: () => store.serie().jours >= 7 || store.serie().record >= 7,
  },
  {
    id: 'premier-dessin',
    icone: '🐢',
    couleur: 'var(--vert)',
    nom: { fr: 'Artiste', en: 'Artist' },
    note: { fr: 'Tu as fait dessiner la tortue.', en: 'You made the turtle draw.' },
    obtenu: () => leconsTermineesDuModule('py-4') >= 1,
  },
  {
    id: 'premier-site',
    icone: '🌐',
    couleur: 'var(--html)',
    nom: { fr: 'Ta première page', en: 'Your first page' },
    note: { fr: 'Tu as construit une page web complète.', en: 'You built a complete web page.' },
    obtenu: () => leconsTermineesDuModule('html-1') >= 4,
  },
  {
    id: 'styliste',
    icone: '🎨',
    couleur: 'var(--css)',
    nom: { fr: 'Styliste', en: 'Stylist' },
    note: { fr: 'Tu sais habiller une page en CSS.', en: 'You can style a page with CSS.' },
    obtenu: () => leconsTermineesDuParcours('css') >= 8,
  },
  {
    id: 'interactif',
    icone: '⚡',
    couleur: 'var(--javascript)',
    nom: { fr: 'Ça bouge !', en: 'It moves!' },
    note: { fr: 'Tu as rendu une page interactive.', en: 'You made a page interactive.' },
    obtenu: () => leconsTermineesDuParcours('javascript') >= 8,
  },
  {
    id: 'compilateur',
    icone: '⚙️',
    couleur: 'var(--cpp)',
    nom: { fr: 'Machiniste', en: 'Machinist' },
    note: { fr: 'Tu programmes en C++.', en: 'You are programming in C++.' },
    obtenu: () => leconsTermineesDuParcours('cpp') >= 8,
  },
  {
    id: 'chasseur-de-bugs',
    icone: '🐛',
    couleur: 'var(--rose)',
    nom: { fr: 'Chasseur de bugs', en: 'Bug hunter' },
    note: {
      fr: 'Tu as réussi une leçon après plusieurs essais. C’est ça, programmer.',
      en: 'You solved a lesson after several tries. That is what coding is.',
    },
    obtenu: () =>
      Object.values(store.etat().lecons).some((lecon) => lecon.terminee && lecon.tentatives >= 4),
  },
  {
    id: 'autonome',
    icone: '🧠',
    couleur: 'var(--vert)',
    nom: { fr: 'En autonomie', en: 'On your own' },
    note: {
      fr: 'Dix leçons réussies du premier coup, sans indice.',
      en: 'Ten lessons solved first try, with no hints.',
    },
    obtenu: () =>
      Object.values(store.etat().lecons).filter(
        (lecon) => lecon.terminee && lecon.tentatives <= 1 && lecon.indices === 0
      ).length >= 10,
  },
  {
    id: 'polyglotte',
    icone: '🌍',
    couleur: 'var(--violet)',
    nom: { fr: 'Polyglotte', en: 'Polyglot' },
    note: { fr: 'Tu as touché aux cinq langages.', en: 'You tried all five languages.' },
    obtenu: () => PARCOURS.every((parcours) => leconsTermineesDuParcours(parcours.id) >= 1),
  },
  {
    id: 'tout-termine',
    icone: '👑',
    couleur: 'var(--ambre)',
    nom: { fr: 'Tout terminé', en: 'All done' },
    note: { fr: 'Les 85 leçons. Chapeau.', en: 'All 85 lessons. Hats off.' },
    obtenu: () => store.nombreLeconsTerminees() >= nombreLeconsTotal(),
  },
];

function leconsTermineesDuParcours(identifiant) {
  return leconsDuParcours(identifiant).filter((fiche) => store.leconTerminee(fiche.id)).length;
}

function leconsTermineesDuModule(identifiantModule) {
  for (const parcours of PARCOURS) {
    const module = parcours.modules.find((element) => element.id === identifiantModule);
    if (module) return module.lecons.filter((fiche) => store.leconTerminee(fiche.id)).length;
  }
  return 0;
}

/** Accorde les badges nouvellement merites. @returns {Array} les nouveaux */
export function verifierBadges() {
  const nouveaux = [];
  for (const badge of BADGES) {
    if (store.possedeBadge(badge.id)) continue;
    let merite = false;
    try {
      merite = badge.obtenu();
    } catch {
      merite = false;
    }
    if (merite && store.accorderBadge(badge.id)) nouveaux.push(badge);
  }
  return nouveaux;
}

export function badgeParId(identifiant) {
  return BADGES.find((badge) => badge.id === identifiant) || null;
}

/* ---------------------------------------------------------- confettis --- */

/** Petites particules dessinees sur un canevas, puis jetees. */
function lancerConfettis(hote, duree = 2600) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canevas = h('canvas.victoire__confettis');
  hote.append(canevas);

  const contexte = canevas.getContext('2d');
  const densite = window.devicePixelRatio || 1;
  canevas.width = window.innerWidth * densite;
  canevas.height = window.innerHeight * densite;

  const couleurs = ['#00E5FF', '#B14BFF', '#FF3D8B', '#3DFFA8', '#FFD93D'];
  const particules = Array.from({ length: 130 }, () => ({
    x: Math.random() * canevas.width,
    y: -Math.random() * canevas.height * 0.4,
    largeur: (6 + Math.random() * 7) * densite,
    hauteur: (9 + Math.random() * 9) * densite,
    vitesseY: (2.2 + Math.random() * 3.4) * densite,
    derive: (Math.random() - 0.5) * 2.4 * densite,
    rotation: Math.random() * Math.PI * 2,
    vitesseRotation: (Math.random() - 0.5) * 0.24,
    couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
  }));

  const debut = performance.now();

  const image = (maintenant) => {
    const ecoule = maintenant - debut;
    contexte.clearRect(0, 0, canevas.width, canevas.height);

    for (const particule of particules) {
      particule.y += particule.vitesseY;
      particule.x += particule.derive;
      particule.rotation += particule.vitesseRotation;

      contexte.save();
      contexte.translate(particule.x, particule.y);
      contexte.rotate(particule.rotation);
      contexte.globalAlpha = Math.max(0, 1 - ecoule / duree);
      contexte.fillStyle = particule.couleur;
      contexte.fillRect(-particule.largeur / 2, -particule.hauteur / 2, particule.largeur, particule.hauteur);
      contexte.restore();
    }

    if (ecoule < duree) requestAnimationFrame(image);
    else canevas.remove();
  };

  requestAnimationFrame(image);
}

/* -------------------------------------------------------- celebration --- */

/**
 * Ecran de victoire apres une lecon reussie.
 * Ne s'affiche que s'il y a vraiment quelque chose a feter : refaire une lecon
 * pour reviser ne declenche pas de confettis.
 */
export function celebrer({ xpGagne = 0, nouveauNiveau = null, lecon = null } = {}) {
  const nouveauxBadges = verifierBadges();
  if (!xpGagne && !nouveauNiveau && !nouveauxBadges.length) return;

  const hote = document.getElementById('celebration');
  const fermer = () => {
    hote.hidden = true;
    hote.replaceChildren();
  };

  const valeurXp = h('div.victoire__xp', '+0');

  remplir(
    hote,
    h(
      'div.victoire',
      h('div.victoire__titre', nouveauNiveau ? t('victoire.nouveauNiveau', { n: nouveauNiveau }) : t('victoire.titre')),
      xpGagne ? valeurXp : null,
      lecon?.projet
        ? h(
            'p.victoire__note',
            texte({
              fr: 'Ton projet est enregistré dans « Mes projets », comme un vrai fichier.',
              en: 'Your project is saved in "My projects", as a real file.',
            })
          )
        : null,
      nouveauxBadges.length
        ? h(
            'div.victoire__badges',
            nouveauxBadges.map((badge) =>
              h(
                'div.victoire__badge',
                h('div.badge.badge--obtenu.badge--nouveau', { style: { '--teinte': badge.couleur } }, badge.icone),
                h('div.victoire__badgeNom', texte(badge.nom))
              )
            )
          )
        : null,
      h('button.bouton.bouton--principal.bouton--grand', { onclick: fermer }, t('victoire.continuer'))
    )
  );

  hote.hidden = false;
  if (xpGagne) compter(valeurXp, 0, xpGagne, 1000, (n) => `+${Math.round(n)} XP`);
  lancerConfettis(hote);

  if (nouveauxBadges.length) bit.reagirBadge(nouveauxBadges[0].nom);
  else bit.definirEtat('fete', 2600);

  // Echap ferme aussi : un ecran plein qu'on ne peut pas quitter au clavier
  // est vite penible.
  const surTouche = (evenement) => {
    if (evenement.key === 'Escape' || evenement.key === 'Enter') {
      fermer();
      document.removeEventListener('keydown', surTouche);
    }
  };
  document.addEventListener('keydown', surTouche);
}
