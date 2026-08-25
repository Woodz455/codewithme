/**
 * Ecran d'accueil — le « cockpit ».
 *
 * Trois questions, dans cet ordre : ou j'en etais, qu'est-ce que je fais
 * aujourd'hui, et ou j'en suis globalement.
 */
import { h, anneau } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { naviguer } from '../core/routeur.js';
import { PARCOURS, ORDRE_RECOMMANDE, leconsDuParcours, nombreLecons } from '../../content/parcours.js';

/** Salutation adaptee au moment de la journee. */
function salutation() {
  const heure = new Date().getHours();
  if (heure < 12) return t('accueil.salutMatin');
  if (heure < 18) return t('accueil.salutApresMidi');
  return t('accueil.salutSoir');
}

/** Proportion de lecons terminees dans un parcours. */
export function progressionParcours(identifiant) {
  const lecons = leconsDuParcours(identifiant);
  if (!lecons.length) return 0;
  const faites = lecons.filter((lecon) => store.leconTerminee(lecon.id)).length;
  return faites / lecons.length;
}

/**
 * Prochaine lecon a faire : la premiere non terminee du parcours entame le plus
 * recemment, sinon la premiere lecon de l'ordre recommande.
 */
export function prochaineLecon() {
  const ordre = [...ORDRE_RECOMMANDE];

  // On privilegie un parcours deja commence mais pas fini.
  const entame = ordre.find((identifiant) => {
    const avancement = progressionParcours(identifiant);
    return avancement > 0 && avancement < 1;
  });

  for (const identifiant of entame ? [entame, ...ordre] : ordre) {
    const suivante = leconsDuParcours(identifiant).find((lecon) => !store.leconTerminee(lecon.id));
    if (suivante) return { parcours: identifiant, fiche: suivante };
  }
  return null;
}

/* --------------------------------------------------------------- morceaux -- */

function carteReprise() {
  const cible = prochaineLecon();

  if (!cible) {
    return h(
      'section.carte.reprise',
      { style: { '--teinte': 'var(--vert)' } },
      h('div.reprise__haut', h('span.reprise__icone', '🏆'), h('span.etiquette', 'Bravo')),
      h('h2.reprise__titre', texte({ fr: 'Tu as tout terminé !', en: 'You finished everything!' })),
      h('p.reprise__lecon', texte({
        fr: 'Retourne dans le bac à sable pour créer ce que tu veux.',
        en: 'Head to the sandbox and build whatever you want.',
      })),
      h(
        'div.reprise__bas',
        h('button.bouton.bouton--principal.bouton--grand', { onclick: () => naviguer('/bac-a-sable') },
          t('nav.bacASable'))
      )
    );
  }

  const parcours = PARCOURS.find((element) => element.id === cible.parcours);
  const dejaCommence = store.nombreLeconsTerminees() > 0;
  const avancement = progressionParcours(cible.parcours);
  const total = nombreLecons(cible.parcours);
  const faites = Math.round(avancement * total);

  return h(
    'section.carte.reprise',
    { style: { '--teinte': parcours.couleur } },
    h(
      'div.reprise__haut',
      h('span.reprise__icone', parcours.icone),
      h('span.etiquette', { style: { '--teinte': parcours.couleur } }, parcours.nom),
      cible.parcours === ORDRE_RECOMMANDE[0] && !dejaCommence
        ? h('span.etiquette.etiquette--neutre', t('accueil.recommande'))
        : null
    ),
    h('h2.reprise__titre', dejaCommence ? t('accueil.reprendre') : t('accueil.commencer')),
    h('p.reprise__lecon', texte(cible.fiche.titre)),
    h(
      'div.reprise__bas',
      h(
        'button.bouton.bouton--principal.bouton--grand',
        { onclick: () => naviguer(`/lecon/${cible.parcours}/${cible.fiche.id}`) },
        '▶ ',
        dejaCommence ? t('accueil.continuer') : t('accueil.demarrer')
      ),
      anneau({
        valeur: avancement,
        taille: 52,
        epaisseur: 5,
        couleur: parcours.couleurBrute,
        centre: h('span', { style: { fontSize: '0.72rem' } }, `${faites}/${total}`),
      })
    )
  );
}

/** Les 7 derniers jours, du plus ancien au plus recent. */
function septDerniersJours() {
  const jours = [];
  for (let recul = 6; recul >= 0; recul -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - recul);
    const cle = date.toISOString().slice(0, 10);
    jours.push({
      cle,
      initiale: date.toLocaleDateString(document.documentElement.lang, { weekday: 'narrow' }),
      actif: (store.etat().tempsParJour[cle] || 0) > 60000, // au moins une minute
      estAujourdHui: recul === 0,
    });
  }
  return jours;
}

function carteSerie() {
  const { jours, record } = store.serie();
  return h(
    'section.carte.carte-serie',
    h('div.carte-serie__flamme', jours > 0 ? '🔥' : '💤'),
    h('div.carte-serie__nombre', String(jours)),
    h(
      'div.carte-serie__label',
      jours > 0
        ? texte({ fr: jours > 1 ? 'jours d’affilée' : 'jour', en: jours > 1 ? 'days in a row' : 'day' })
        : t('accueil.aucuneSerie')
    ),
    h(
      'div.semaine',
      septDerniersJours().map(({ initiale, actif, estAujourdHui }) =>
        h(
          'div.semaine__jour',
          { dataset: { actif: String(actif), aujourdhui: String(estAujourdHui) } },
          h('span.semaine__point'),
          h('span.semaine__lettre', initiale)
        )
      )
    ),
    record > 1
      ? h('div.carte-serie__record', texte({ fr: `Record : ${record} jours`, en: `Best: ${record} days` }))
      : null
  );
}

function carteStats() {
  const projets = Number(document.body.dataset.nombreProjets || 0);
  return h(
    'div.stats',
    h(
      'div.carte.stat',
      h('div.stat__valeur', String(store.nombreLeconsTerminees())),
      h('div.stat__label', t('accueil.leconsTerminees'))
    ),
    h(
      'div.carte.stat',
      h('div.stat__valeur', String(projets)),
      h('div.stat__label', t('accueil.projetsCrees'))
    ),
    h(
      'div.carte.stat',
      h('div.stat__valeur', String(store.etat().badges.length)),
      h('div.stat__label', t('accueil.badgesGagnes'))
    )
  );
}

function carteLangage(parcours) {
  const avancement = progressionParcours(parcours.id);
  const total = nombreLecons(parcours.id);
  const faites = Math.round(avancement * total);

  return h(
    'article.carte.carte--cliquable.langage',
    {
      style: { '--teinte': parcours.couleur },
      onclick: () => naviguer(`/parcours/${parcours.id}`),
      role: 'button',
      tabindex: '0',
      onkeydown: (evenement) => {
        if (evenement.key === 'Enter' || evenement.key === ' ') {
          evenement.preventDefault();
          naviguer(`/parcours/${parcours.id}`);
        }
      },
    },
    h(
      'div.langage__haut',
      h(
        'div',
        h('div.langage__icone', parcours.icone),
        h('div.langage__nom', parcours.nom)
      ),
      anneau({
        valeur: avancement,
        taille: 54,
        epaisseur: 5,
        couleur: parcours.couleurBrute,
        centre: h('span', { style: { fontSize: '0.7rem' } }, `${Math.round(avancement * 100)}%`),
      })
    ),
    h('p.langage__resume', texte(parcours.resume)),
    h(
      'div.langage__pied',
      h('span', t('parcours.lecons', { n: total })),
      // A zero, le nombre de lecons dit deja tout : un « pas encore commencé »
      // passerait a la ligne et alourdirait la carte pour rien.
      avancement === 1
        ? h('span', { style: { color: 'var(--teinte)' } }, `✓ ${t('parcours.termine')}`)
        : avancement > 0
          ? h('span', { style: { color: 'var(--teinte)' } }, `${faites}/${total}`)
          : null
    )
  );
}

/* ----------------------------------------------------------------- ecran -- */

export function ecranAccueil() {
  const prenom = store.etat().prenom;

  const racine = h(
    'div.cockpit',
    h(
      'header',
      h(
        'h1.cockpit__salut',
        `${salutation()} `,
        h('em', prenom || (document.documentElement.lang === 'en' ? 'coder' : 'codeur')),
        ' 👋'
      ),
      h(
        'p.cockpit__sousTitre',
        texte({
          fr: 'Chaque leçon se termine par quelque chose qui marche vraiment.',
          en: 'Every lesson ends with something that actually works.',
        })
      )
    ),

    h(
      'div.bento',
      h('div.bento__colonne', carteReprise(), carteStats()),
      h('div.bento__colonne', carteSerie())
    ),

    h(
      'section',
      h('h2.surtitre', { style: { marginBottom: 'var(--e3)' } }, t('accueil.tesLangages')),
      h('div.langages', PARCOURS.map(carteLangage))
    )
  );

  return racine;
}
