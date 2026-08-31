/**
 * Ecran d'un parcours : la carte des lecons.
 *
 * Les lecons sont posees sur un chemin sinueux, facon carte de niveaux de jeu.
 * Les positions sont calculees (et non mesurees apres coup), ce qui permet de
 * tracer le chemin SVG exactement entre les centres des noeuds.
 */
import { h, svg, anneau } from '../core/ui.js';
import { icone, medaillonLogo } from '../icones.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { naviguer } from '../core/routeur.js';
import { parcoursParId, leconsDuParcours } from '../../content/parcours.js';
import { parcoursAcheve, enregistrerCertificat } from '../certificat.js';

/* Geometrie de la carte, en pixels. */
const LARGEUR = 880;
const PAS_VERTICAL = 94;
const AMPLITUDE = 380;
const TAILLE_NOEUD = 68;
const MARGE_HAUT = 54;
const HAUTEUR_ENTETE_MODULE = 68;

/**
 * Bouton de certificat, affiche uniquement quand le parcours est acheve.
 * Il dit ce qui se passe, et ou : un enregistrement silencieux laisserait
 * l'eleve chercher son fichier.
 */
function boutonCertificat(parcours) {
  const message = h('span.certificat__message', { hidden: true });

  const bouton = h(
    'button.bouton.bouton--petit.certificat__bouton',
    {
      onclick: async () => {
        bouton.disabled = true;
        try {
          const resultat = await enregistrerCertificat(parcours);
          if (!resultat.annule) {
            message.hidden = false;
            message.textContent = texte({
              fr: `Certificat enregistré : ${resultat.chemin}`,
              en: `Certificate saved: ${resultat.chemin}`,
            });
          }
        } catch (erreur) {
          message.hidden = false;
          message.textContent = String(erreur?.message || erreur);
        } finally {
          bouton.disabled = false;
        }
      },
    },
    icone('trophee'),
    t('certificat.obtenir')
  );

  return h('div.certificat', bouton, message);
}

/** Decalage horizontal d'un noeud : une sinusoide donne un chemin naturel. */
function decalage(index) {
  return Math.sin(index * 0.85) * (AMPLITUDE / 2);
}

/**
 * Calcule la position de chaque lecon et de chaque entete de module.
 * @returns {{noeuds: Array, hauteur: number, entetes: Array}}
 */
function disposer(parcours) {
  const noeuds = [];
  const entetes = [];
  let y = MARGE_HAUT;
  let index = 0;

  for (const module of parcours.modules) {
    entetes.push({ module, y: y - 34 });
    y += HAUTEUR_ENTETE_MODULE;

    for (const fiche of module.lecons) {
      const dx = decalage(index);
      noeuds.push({
        fiche,
        module,
        x: LARGEUR / 2 + dx,
        y,
        index,
        // Le titre se pose du cote ou il y a de la place, jamais par-dessus
        // le chemin : cela remplit l'espace lateral au lieu de le gaspiller.
        cote: dx >= 0 ? 'droite' : 'gauche',
      });
      y += PAS_VERTICAL;
      index += 1;
    }
    y += 26; // respiration entre deux modules
  }

  return { noeuds, entetes, hauteur: y + 40 };
}

/** Chemin SVG passant par tous les noeuds, adouci par des courbes. */
function tracerChemin(noeuds) {
  if (noeuds.length < 2) return '';
  const points = noeuds.map((noeud) => [noeud.x, noeud.y]);
  let chemin = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length; i += 1) {
    const [xPrecedent, yPrecedent] = points[i - 1];
    const [x, y] = points[i];
    const milieu = (yPrecedent + y) / 2;
    // Courbe de Bezier : les points de controle restent a la verticale des
    // noeuds, ce qui donne un serpentin regulier.
    chemin += ` C ${xPrecedent} ${milieu}, ${x} ${milieu}, ${x} ${y}`;
  }
  return chemin;
}

/* ----------------------------------------------------------------- noeuds -- */

function noeudLecon({ fiche, x, y, cote }, parcours, estProchaine) {
  const terminee = store.leconTerminee(fiche.id);
  const etatLecon = store.etatLecon(fiche.id);
  const commencee = Boolean(etatLecon && !terminee);

  const etat = terminee ? 'terminee' : estProchaine ? 'suivante' : commencee ? 'commencee' : 'a-faire';

  return h(
    'button.noeud',
    {
      dataset: { etat, cote },
      style: {
        left: `${x - TAILLE_NOEUD / 2}px`,
        top: `${y - TAILLE_NOEUD / 2}px`,
        '--teinte': parcours.couleur,
      },
      onclick: () => naviguer(`/lecon/${parcours.id}/${fiche.id}`),
      'aria-label': texte(fiche.titre),
    },
    h(
      'span.noeud__pastille',
      terminee ? icone('verifier') : estProchaine ? icone('executer') : String(fiche.id.split('-').pop())
    ),
    h('span.noeud__titre', texte(fiche.titre))
  );
}

/* ------------------------------------------------------------------ ecran -- */

export function ecranParcours(identifiant) {
  const parcours = parcoursParId(identifiant);
  if (!parcours) {
    return h('div', h('h1', 'Parcours inconnu'));
  }

  const toutes = leconsDuParcours(identifiant);
  const faites = toutes.filter((fiche) => store.leconTerminee(fiche.id)).length;
  const avancement = toutes.length ? faites / toutes.length : 0;
  const prochaine = toutes.find((fiche) => !store.leconTerminee(fiche.id));

  const { noeuds, entetes, hauteur } = disposer(parcours);

  const dessin = svg(
    'svg',
    {
      class: 'carte-chemin',
      width: LARGEUR,
      height: hauteur,
      viewBox: `0 0 ${LARGEUR} ${hauteur}`,
      'aria-hidden': 'true',
    },
    svg(
      'defs',
      {},
      svg(
        'linearGradient',
        { id: 'cheminDegrade', x1: '0', y1: '0', x2: '0', y2: '1' },
        svg('stop', { offset: '0%', 'stop-color': parcours.couleurBrute, 'stop-opacity': '0.85' }),
        svg('stop', { offset: '100%', 'stop-color': parcours.couleurBrute, 'stop-opacity': '0.15' })
      )
    ),
    // Trait de fond, puis trait de progression par-dessus.
    svg('path', {
      d: tracerChemin(noeuds),
      fill: 'none',
      stroke: 'rgba(255,255,255,0.09)',
      'stroke-width': 10,
      'stroke-linecap': 'round',
    }),
    // Le trait colore ne couvre que ce qui est reellement acquis : a zero
    // lecon terminee, il n'y a rien a montrer.
    faites > 0
      ? svg('path', {
          class: 'carte-chemin__avancement',
          d: tracerChemin(noeuds.slice(0, faites + 1)),
          fill: 'none',
          stroke: 'url(#cheminDegrade)',
          'stroke-width': 6,
          'stroke-linecap': 'round',
          style: `filter: drop-shadow(0 0 8px ${parcours.couleurBrute})`,
        })
      : null
  );

  const plan = h(
    'div.carte-plan',
    { style: { width: `${LARGEUR}px`, height: `${hauteur}px`, '--teinte': parcours.couleur } },
    dessin,
    entetes.map(({ module, y }) =>
      h(
        'div.carte-module',
        { style: { top: `${y}px` } },
        h('span.carte-module__icone', icone(module.icone)),
        h('span.carte-module__titre', texte(module.titre))
      )
    ),
    noeuds.map((noeud) => noeudLecon(noeud, parcours, prochaine && noeud.fiche.id === prochaine.id))
  );

  const racine = h(
    'div.ecran-parcours',
    h(
      'header.parcours-entete.carte',
      { style: { '--teinte': parcours.couleur } },
      medaillonLogo(parcours.logo, { classe: 'medaillon--grand', titre: parcours.nom }),
      h(
        'div.parcours-entete__texte',
        h('h1', parcours.nom),
        h('p.scene__sous', texte(parcours.resume)),
        h(
          'p.parcours-entete__but',
          h('span.surtitre', t('parcours.objectifFinal')),
          ' ',
          texte(parcours.aboutissement)
        )
      ),
      h(
        'div.parcours-entete__anneau',
        anneau({
          valeur: avancement,
          taille: 92,
          epaisseur: 8,
          couleur: parcours.couleurBrute,
          centre: h(
            'div',
            { style: { textAlign: 'center', lineHeight: '1.1' } },
            h('div', { style: { fontSize: '1.1rem' } }, `${faites}`),
            h('div', { style: { fontSize: '0.62rem', color: 'var(--texte-faible)' } }, `/ ${toutes.length}`)
          ),
        }),
        // Le certificat n'apparait qu'une fois le parcours reellement acheve :
        // un bouton grise en permanence n'est pas une recompense.
        parcoursAcheve(parcours.id) ? boutonCertificat(parcours) : null
      )
    ),
    h('div.carte-hote', plan)
  );

  amenerALaProchaine(racine, faites);
  return racine;
}

/**
 * Ouvre la carte a l'endroit ou l'eleve en est.
 *
 * Mesure : le parcours Python fait 9 123 px de haut, soit onze ecrans, contre
 * trois pour tous les autres. Ouvrir la page tout en haut obligerait un eleve
 * arrive a la lecon 40 a faire defiler la moitie du chemin pour se retrouver,
 * a chaque visite. On amene donc la prochaine lecon sous ses yeux.
 *
 * Deux cas ou l'on ne touche a rien, volontairement :
 *   - aucune lecon terminee : le debut EST la prochaine etape, et garder
 *     l'en-tete visible vaut mieux ;
 *   - parcours acheve : il n'y a plus de prochaine lecon.
 */
function amenerALaProchaine(racine, faites) {
  if (faites <= 0) return;

  // Le noeud n'est pas encore dans le document quand l'ecran est construit :
  // on attend l'image suivante, une seule fois.
  requestAnimationFrame(() => {
    const cible = racine.querySelector('.noeud[data-etat="suivante"]');
    const scene = racine.closest('.scene');
    if (!cible || !scene || !racine.isConnected) return;

    // On vise le premier tiers de l'ecran plutot que le centre : la lecon
    // suivante se lit mieux avec le chemin deja parcouru au-dessus d'elle.
    const decalage = cible.getBoundingClientRect().top - scene.getBoundingClientRect().top;
    scene.scrollTop += decalage - scene.clientHeight / 3;
  });
}
