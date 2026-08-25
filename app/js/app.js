/**
 * Point d'entree de l'interface : construit la coquille (rail + bandeau),
 * branche les routes, monte la mascotte et lance l'application.
 */
import { h, remplir, compter } from './core/ui.js';
import { t, texte, langue, definirLangue, basculerLangue, surChangementLangue } from './core/i18n.js';
import * as store from './core/store.js';
import { route, demarrer, naviguer, cheminActuel, rafraichir } from './core/routeur.js';
import * as bit from './mascotte.js';
import { icone, medaillonLogo, installerSprite } from './icones.js';
import { PARCOURS } from '../content/parcours.js';
import { ecranAccueil } from './ecrans/accueil.js';
import { ecranParcours } from './ecrans/parcours.js';
import { ecranAtelier } from './ecrans/atelier.js';

/* ------------------------------------------------------------------- rail -- */

const ENTREES_RAIL = [
  { route: '/accueil', cle: 'nav.accueil', icone: 'accueil' },
  { route: '/galerie', cle: 'nav.galerie', icone: 'projets' },
  { route: '/bac-a-sable', cle: 'nav.bacASable', icone: 'bacASable' },
  { route: '/badges', cle: 'nav.badges', icone: 'badges' },
];

const ENTREES_RAIL_BAS = [
  { route: '/tuteur', cle: 'nav.tuteur', icone: 'tuteur' },
  { route: '/reglages', cle: 'nav.reglages', icone: 'reglages' },
];

function lienRail({ route: cible, cle, icone: nomIcone, teinte, pastille }) {
  const actif = cheminActuel().startsWith(cible);
  return h(
    'a.rail__lien',
    {
      href: `#${cible}`,
      'aria-current': actif ? 'page' : null,
      style: teinte ? { '--teinte': teinte } : null,
      onclick: () => bit.signalerActivite(),
    },
    h('span.rail__icone', icone(nomIcone)),
    h('span', t(cle)),
    pastille ? h('span.rail__pastille', pastille) : null
  );
}

function lienParcours(parcours) {
  const cible = `/parcours/${parcours.id}`;
  const actif = cheminActuel().startsWith(cible) || cheminActuel().startsWith(`/lecon/${parcours.id}/`);
  return h(
    'a.rail__lien',
    {
      href: `#${cible}`,
      'aria-current': actif ? 'page' : null,
      style: { '--teinte': parcours.couleur },
      onclick: () => bit.signalerActivite(),
    },
    h('span.rail__icone', medaillonLogo(parcours.logo, { classe: 'medaillon--petit', titre: parcours.nom })),
    h('span', parcours.nom)
  );
}

function construireRail() {
  const hote = document.getElementById('rail');
  // Marque et pied restent fixes ; seule la liste centrale defile. Sans cela,
  // sur un petit portable, l'espace tuteur et les reglages tombent sous la
  // fenetre et deviennent introuvables.
  remplir(
    hote,
    h(
      'div.rail__marque',
      h(
        'svg.rail__logo',
        { viewBox: '0 0 120 120', 'aria-hidden': 'true' },
      ),
      h('span.rail__nom', 'CodeWithMe')
    ),
    h(
      'div.rail__corps',
      ENTREES_RAIL.slice(0, 1).map(lienRail),
      h('div.rail__section.surtitre', t('nav.parcours')),
      PARCOURS.map(lienParcours),
      h('div.rail__section.surtitre', texte({ fr: 'Ton espace', en: 'Your space' })),
      ENTREES_RAIL.slice(1).map(lienRail)
    ),
    h('div.rail__pied', ENTREES_RAIL_BAS.map(lienRail))
  );

  // Le logo SVG est injecte apres coup (h() ne cree pas d'elements SVG).
  const logo = hote.querySelector('.rail__logo');
  logo.innerHTML = `
    <defs>
      <linearGradient id="degradeRail" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00E5FF"/><stop offset="100%" stop-color="#B14BFF"/>
      </linearGradient>
    </defs>
    <path d="M44 38 L22 60 L44 82" fill="none" stroke="url(#degradeRail)" stroke-width="9"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M76 38 L98 60 L76 82" fill="none" stroke="url(#degradeRail)" stroke-width="9"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M67 28 L53 92" fill="none" stroke="url(#degradeRail)" stroke-width="9" stroke-linecap="round"/>`;
}

/* ---------------------------------------------------------------- bandeau -- */

let xpAffiche = 0;

function construireBandeau({ anime = false } = {}) {
  const hote = document.getElementById('bandeau');
  const niveau = store.niveau();
  const dansNiveau = store.xpDansNiveau();
  const parNiveau = store.xpPourNiveauSuivant();
  const { jours } = store.serie();

  const valeurXp = h('span.bandeau__xpValeur', `${dansNiveau} / ${parNiveau} XP`);
  const remplissage = h('div.barre-xp__remplissage', {
    style: { width: `${Math.round((dansNiveau / parNiveau) * 100)}%` },
  });

  remplir(
    hote,
    h(
      'div.bandeau__niveau',
      h('div.bandeau__pastilleNiveau', String(niveau)),
      h(
        'div.bandeau__xp',
        h(
          'div.bandeau__xpLigne',
          h('span.bandeau__xpTitre', `${t('bandeau.niveau')} ${niveau}`),
          valeurXp
        ),
        h('div.barre-xp', remplissage)
      )
    ),
    h(
      'div.bandeau__droite',
      jours > 0
        ? h(
            'div.serie.infobulle',
            { 'data-infobulle': t('bandeau.serieTitre', { n: jours }) },
            h('span.serie__flamme', icone('flamme')),
            h('span', t('bandeau.serie', { n: jours }))
          )
        : null,
      selecteurLangue()
    )
  );

  if (anime && xpAffiche !== store.etat().xp) {
    compter(valeurXp, xpAffiche % parNiveau, dansNiveau, 900, (n) => `${Math.round(n)} / ${parNiveau} XP`);
  }
  xpAffiche = store.etat().xp;
}

/* ----------------------------------------------------------------- langue -- */

/**
 * Selecteur FR / EN.
 *
 * Surtout pas d'emoji drapeau : Windows ne les dessine pas et affiche a la
 * place les deux lettres du code pays, ce qui donnerait un bouton bancal sur
 * l'ordinateur ou l'application sera reellement utilisee.
 */
function selecteurLangue() {
  const courante = langue();
  const choix = (code, libelle) =>
    h(
      'button.langue__choix',
      {
        type: 'button',
        'aria-pressed': String(courante === code),
        id: code === 'fr' ? 'boutonLangueFr' : 'boutonLangue',
        onclick: () => {
          if (langue() !== code) changerLangue();
        },
      },
      libelle
    );

  return h(
    'div.langue',
    { role: 'group', 'aria-label': t('bandeau.langueTitre') },
    choix('fr', 'FR'),
    choix('en', 'EN')
  );
}

function changerLangue() {
  const nouvelle = basculerLangue();
  store.definirLangueProfil(nouvelle);
  bit.signalerActivite();
}

/* --------------------------------------------------------------- reglages -- */

function appliquerReglages() {
  const reglages = store.reglages();
  document.documentElement.dataset.animations = reglages.animations ? 'normales' : 'reduites';
  document.documentElement.dataset.police =
    reglages.taillePolice === 'grande' ? 'grande' : reglages.taillePolice === 'tres-grande' ? 'tres-grande' : 'normale';
  bit.definirVisibilite(reglages.mascotte !== false);
}

/* ------------------------------------------------------------------ routes -- */

function enregistrerRoutes() {
  route('/accueil', () => ecranAccueil());
  route('/parcours/:parcours', ({ parcours }) => ecranParcours(parcours));

  // Ecrans encore a construire : on affiche un jalon clair plutot qu'une page
  // blanche, pour que la navigation reste coherente pendant le developpement.
  const enChantier = (titre, note) => () =>
    h(
      'div',
      h('header.scene__entete', h('h1.scene__titre', titre), h('p.scene__sous', note))
    );

  route('/lecon/:parcours/:lecon', ({ parcours, lecon }) => ecranAtelier(parcours, lecon));
  route('/galerie', enChantier(t('galerie.titre'), texte({ fr: 'Bientôt.', en: 'Coming soon.' })));
  route('/bac-a-sable', enChantier(t('bac.titre'), texte(({ fr: 'Bientôt.', en: 'Coming soon.' }))));
  route('/badges', enChantier(t('badges.titre'), texte({ fr: 'Bientôt.', en: 'Coming soon.' })));
  route('/tuteur', enChantier(t('tuteur.titre'), t('tuteur.confidentialite')));
  route('/reglages', enChantier(t('reglages.titre'), texte({ fr: 'Bientôt.', en: 'Coming soon.' })));
}

/* --------------------------------------------------------------- demarrage -- */

async function demarrerApplication() {
  await store.charger();

  installerSprite();
  definirLangue(store.etat().langue || 'fr');
  appliquerReglages();

  bit.monter(document.getElementById('mascotte'));

  enregistrerRoutes();
  construireRail();
  construireBandeau();

  // Le rail et le bandeau se redessinent a chaque navigation et a chaque
  // changement d'etat, pour rester synchrones avec l'ecran affiche.
  document.addEventListener('route:changee', () => {
    construireRail();
    bit.signalerActivite();
  });
  store.surChangement(() => construireBandeau({ anime: true }));
  surChangementLangue(() => {
    construireRail();
    construireBandeau();
    rafraichir();
  });

  // Menus natifs de la fenetre.
  window.cwm.surNavigation((cible) => naviguer(cible));
  window.cwm.surBasculeLangue(() => changerLangue());

  // Nombre de projets : affiche sur l'accueil.
  try {
    const projets = await window.cwm.projets.lister();
    document.body.dataset.nombreProjets = String(projets.length);
  } catch {
    document.body.dataset.nombreProjets = '0';
  }

  await demarrer(document.getElementById('scene'));

  // On laisse le logo se dessiner avant de reveler l'interface.
  const demarrage = document.getElementById('demarrage');
  const application = document.getElementById('application');
  const delai = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1400;

  setTimeout(() => {
    application.hidden = false;
    demarrage.classList.add('demarrage--sortie');
    setTimeout(() => demarrage.remove(), 460);

    const prenom = store.etat().prenom;
    bit.parler(
      store.nombreLeconsTerminees() === 0
        ? { fr: `Salut ${prenom || ''} ! On commence ?`, en: `Hi ${prenom || ''}! Shall we start?` }
        : { fr: 'Content de te revoir !', en: 'Good to see you again!' },
      4200
    );
  }, delai);

  // Comptabilise le temps reellement passe dans l'application.
  let derniereMesure = Date.now();
  setInterval(() => {
    const maintenant = Date.now();
    if (document.visibilityState === 'visible') store.ajouterTemps(maintenant - derniereMesure);
    derniereMesure = maintenant;
  }, 30000);
}

demarrerApplication().catch((erreur) => {
  console.error(erreur);
  document.body.innerHTML = `<pre style="color:#FF5D6E;padding:2rem;font-family:monospace">
Le démarrage a échoué :

${erreur?.stack || erreur}
</pre>`;
});
