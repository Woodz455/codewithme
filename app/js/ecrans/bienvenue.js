/**
 * L'accueil du premier lancement.
 *
 * Avant lui, la toute premiere ouverture posait l'interface complete d'un seul
 * coup et Bit disait « Salut  ! On commence ? » — sans prenom, parce que le
 * champ ne se remplit que dans les Reglages, ou personne ne va le chercher.
 * Trois choses que l'application sait faire n'etaient donc jamais decouvertes :
 * le prenom (il figure sur les certificats), les sons (le defaut de la v1.1.2 :
 * l'eleve ignorait qu'il y en avait), et ce qu'on va reellement construire.
 *
 * Quatre etapes, une seule fois dans la vie du profil :
 *
 *   1. bienvenue     — le logo se dessine, la langue se choisit ;
 *   2. ton prenom    — un champ, et le droit de le passer ;
 *   3. ce que tu vas construire — les six parcours et leur aboutissement ;
 *   4. deux reglages — les sons (avec un vrai son a l'allumage) et la taille.
 *
 * Rien n'est un piege : Echap et « Passer la presentation » sortent a tout
 * moment, et posent le meme drapeau qu'une intro terminee — l'ecarter est une
 * reponse, pas un report.
 */
import { h, remplir } from '../core/ui.js';
import { t, texte, langue, basculerLangue } from '../core/i18n.js';
import * as store from '../core/store.js';
import { icone, medaillonLogo } from '../icones.js';
import { jouerSon } from '../core/sons.js';
import * as bit from '../mascotte.js';
import { PARCOURS } from '../../content/parcours.js';
import { prochaineLecon } from './accueil.js';

const NOMBRE_ETAPES = 4;

/* ------------------------------------------------------------------ logo -- */

/**
 * Le symbole </> qui se dessine, identique a celui de l'ecran de demarrage.
 * `h()` ne sait pas creer d'elements SVG : on passe par innerHTML, comme le
 * fait deja le logo du rail dans app.js. Le contenu est fixe, aucune donnee
 * de l'eleve n'y entre.
 */
function logo() {
  const hote = h('div.bienvenue__logo');
  hote.innerHTML = `
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="degradeBienvenue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00E5FF"/>
          <stop offset="55%" stop-color="#B14BFF"/>
          <stop offset="100%" stop-color="#FF3D8B"/>
        </linearGradient>
      </defs>
      <path class="bienvenue__trait" d="M44 38 L22 60 L44 82" fill="none" stroke="url(#degradeBienvenue)"
            stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="bienvenue__trait" d="M76 38 L98 60 L76 82" fill="none" stroke="url(#degradeBienvenue)"
            stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="bienvenue__trait" d="M67 28 L53 92" fill="none" stroke="url(#degradeBienvenue)"
            stroke-width="8" stroke-linecap="round"/>
    </svg>`;
  return hote;
}

/* -------------------------------------------------------------- morceaux -- */

/**
 * Selecteur FR / EN.
 *
 * Les identifiants different de ceux du bandeau (`boutonLangue`) : deux
 * elements portant le meme id sur la page rendraient les captures et les tests
 * dependants de l'ordre du DOM.
 */
function selecteurLangue(surChangement) {
  const courante = langue();
  const choix = (code, libelle) =>
    h(
      'button.langue__choix',
      {
        type: 'button',
        id: code === 'fr' ? 'bienvenueLangueFr' : 'bienvenueLangueEn',
        'aria-pressed': String(courante === code),
        onclick: () => {
          if (langue() === code) return;
          store.definirLangueProfil(basculerLangue());
          surChangement();
        },
      },
      libelle
    );

  return h('div.langue', { role: 'group', 'aria-label': t('bandeau.langueTitre') }, choix('fr', 'FR'), choix('en', 'EN'));
}

/** Le meme interrupteur que dans les Reglages, pour que l'eleve le reconnaisse. */
function interrupteur(actif, surChangement) {
  return h(
    'label.interrupteur',
    h('input', { type: 'checkbox', checked: actif, onchange: (e) => surChangement(e.target.checked) }),
    h('span.interrupteur__piste', h('span.interrupteur__pastille'))
  );
}

/* ---------------------------------------------------------------- etapes -- */

/**
 * Chaque etape renvoie son contenu, le libelle de son bouton principal, et ce
 * que Bit en dit. `avancer` est fourni pour les etapes qui peuvent se terminer
 * autrement que par le bouton (la touche Entree dans le champ prenom).
 */
const ETAPES = [
  /* --- 1. Bienvenue ----------------------------------------------------- */
  ({ redessiner }) => ({
    classe: 'bienvenue__etape--titre',
    contenu: [
      logo(),
      h('h1.bienvenue__nom', 'CodeWithMe'),
      h('p.bienvenue__accroche', t('bienvenue.accroche')),
      h('p.bienvenue__note', t('bienvenue.horsLigne')),
      h('div.bienvenue__langue', selecteurLangue(redessiner)),
    ],
    principal: t('bienvenue.commencer'),
    iconePrincipal: 'fusee',
    ditBit: { fr: 'Salut ! Moi c’est Bit.', en: 'Hi! I am Bit.' },
  }),

  /* --- 2. Ton prenom ---------------------------------------------------- */
  ({ avancer, annoncer }) => {
    const champ = h('input.champ.bienvenue__champ', {
      type: 'text',
      maxlength: '40',
      value: store.etat().prenom || '',
      autocomplete: 'off',
      placeholder: texte({ fr: 'Ton prénom', en: 'Your first name' }),
      oninput: (evenement) => store.definirPrenom(evenement.target.value.trim()),
      onkeydown: (evenement) => {
        if (evenement.key === 'Enter') {
          evenement.preventDefault();
          avancer();
        }
      },
    });

    // Le champ prend le focus tout seul : on demande un prenom, autant pouvoir
    // le taper sans avoir a viser.
    requestAnimationFrame(() => champ.focus());

    return {
      contenu: [
        h('h2.bienvenue__titre', t('bienvenue.prenomTitre')),
        h('p.bienvenue__note', t('bienvenue.prenomNote')),
        champ,
      ],
      principal: t('bienvenue.continuer'),
      secondaire: t('bienvenue.passer'),
      ditBit: { fr: 'Comment je dois t’appeler ?', en: 'What should I call you?' },
      // Bit salue par le prenom a l'etape SUIVANTE, pas ici : parler
      // maintenant serait aussitot recouvert par la phrase de cette etape-la.
      enSortant: () => {
        const prenom = store.etat().prenom;
        if (prenom) annoncer(t('bienvenue.enchante', { prenom }));
      },
    };
  },

  /* --- 3. Ce que tu vas construire -------------------------------------- */
  () => ({
    classe: 'bienvenue__etape--large',
    contenu: [
      h('h2.bienvenue__titre', t('bienvenue.construireTitre')),
      h('p.bienvenue__note', t('bienvenue.construireNote')),
      h(
        'div.bienvenue__parcours',
        PARCOURS.map((parcours, rang) =>
          h(
            'article.bienvenue__parcoursCarte',
            { style: { '--teinte': parcours.couleur, '--rang': String(rang) } },
            h(
              'div.bienvenue__parcoursHaut',
              medaillonLogo(parcours.logo, { titre: parcours.nom }),
              h('span.bienvenue__parcoursNom', parcours.nom)
            ),
            h('p.bienvenue__parcoursBut', texte(parcours.aboutissement))
          )
        )
      ),
    ],
    principal: t('bienvenue.continuer'),
    ditBit: { fr: 'Tout ça, tu vas le fabriquer toi-même.', en: 'You are going to build all of this yourself.' },
  }),

  /* --- 4. Deux reglages -------------------------------------------------- */
  () => {
    const reglages = store.reglages();
    const tailles = ['normale', 'grande', 'tres-grande'];
    const libelles = {
      normale: t('reglages.normale'),
      grande: t('reglages.grande'),
      'tres-grande': t('reglages.tresGrande'),
    };

    const segments = h(
      'div.segments',
      tailles.map((valeur) =>
        h(
          'button.segments__choix',
          {
            type: 'button',
            'aria-pressed': String(reglages.taillePolice === valeur),
            onclick: (evenement) => {
              store.definirReglage('taillePolice', valeur);
              document.documentElement.dataset.police = valeur;
              for (const frere of evenement.target.parentElement.children) {
                frere.setAttribute('aria-pressed', String(frere === evenement.target));
              }
            },
          },
          libelles[valeur]
        )
      )
    );

    const ligne = (titre, note, controle) =>
      h(
        'div.reglage',
        h('div.reglage__texte', h('div.reglage__titre', titre), note ? h('div.reglage__note', note) : null),
        h('div.reglage__controle', controle)
      );

    const cible = prochaineLecon();

    return {
      contenu: [
        h('h2.bienvenue__titre', t('bienvenue.pretTitre')),
        h('p.bienvenue__note', t('bienvenue.pretNote')),
        h(
          'div.bienvenue__reglages',
          ligne(
            t('reglages.sons'),
            t('bienvenue.sonsNote'),
            interrupteur(reglages.sons === true, (actif) => {
              store.definirReglage('sons', actif);
              // La question que l'eleve se pose a cet instant est « est-ce que
              // ca marche ? ». On y repond tout de suite, comme dans les
              // Reglages : c'est exactement le defaut corrige en v1.1.2.
              if (actif) jouerSon('reussite');
            })
          ),
          ligne(t('reglages.taillePolice'), null, segments)
        ),
        cible
          ? h(
              'div.bienvenue__premiere',
              h('span.surtitre', t('bienvenue.premiereLecon')),
              h('span.bienvenue__premiereTitre', texte(cible.fiche.titre))
            )
          : null,
      ],
      principal: t('bienvenue.cestParti'),
      iconePrincipal: 'executer',
      ditBit: { fr: 'Prêt ? On y va.', en: 'Ready? Off we go.' },
      // Les sons sont allumes par defaut : sans cela l'eleve arriverait sur un
      // interrupteur deja en position haute et repartirait sans avoir rien
      // entendu — precisement ce qui s'est passe en v1.1.2. On lui en fait
      // donc entendre un. Le contexte audio a le droit de demarrer : il a
      // clique trois fois pour arriver jusqu'ici.
      auMontage: () => {
        if (store.reglages().sons === true) setTimeout(() => jouerSon('reussite'), 420);
      },
    };
  },
];

/* ----------------------------------------------------------------- ecran -- */

/**
 * Ouvre l'accueil du premier lancement.
 *
 * @param {HTMLElement} hote  le panneau `#bienvenue`
 * @returns {Promise<string>} la route ou aller ensuite
 */
export function ouvrirBienvenue(hote) {
  return new Promise((resoudre) => {
    let index = 0;
    let terminee = false;

    const carte = h('div.bienvenue__carte');
    const points = h('div.bienvenue__points');
    const actions = h('div.bienvenue__actions');
    const hoteBit = h('div.bienvenue__mascotte');
    // Ce bouton vit hors de la carte, donc hors du redessin d'une etape : son
    // libelle doit etre remis a jour explicitement, sinon il resterait en
    // francais apres un passage en anglais.
    const passer = h('button.bienvenue__passer', { type: 'button', onclick: () => sortir('/accueil') });

    /** Sortie unique : le drapeau est pose une seule fois, quoi qu'il arrive. */
    const sortir = (route) => {
      if (terminee) return;
      terminee = true;
      document.removeEventListener('keydown', surTouche);
      store.marquerBienvenueVue();
      hote.classList.add('bienvenue--sortie');
      setTimeout(() => {
        hote.hidden = true;
        hote.replaceChildren();
        resoudre(route);
      }, 420);
    };

    const surTouche = (evenement) => {
      if (evenement.key === 'Escape') sortir('/accueil');
    };
    document.addEventListener('keydown', surTouche);

    const terminer = () => {
      const cible = prochaineLecon();
      sortir(cible ? `/lecon/${cible.parcours}/${cible.fiche.id}` : '/accueil');
    };

    let etapeCourante = null;
    // Ce qu'une etape veut faire dire a Bit une fois la suivante affichee.
    let phraseAnnoncee = null;
    const annoncer = (phrase) => {
      phraseAnnoncee = phrase;
    };

    const avancer = () => {
      etapeCourante?.enSortant?.();
      if (index >= NOMBRE_ETAPES - 1) terminer();
      else {
        index += 1;
        dessiner();
      }
    };

    const reculer = () => {
      if (index === 0) return;
      index -= 1;
      dessiner();
    };

    function dessiner() {
      etapeCourante = ETAPES[index]({ avancer, annoncer, redessiner: dessiner });

      carte.className = `bienvenue__carte ${etapeCourante.classe || ''}`.trim();
      carte.dataset.etape = String(index + 1);
      remplir(carte, etapeCourante.contenu);

      remplir(
        points,
        Array.from({ length: NOMBRE_ETAPES }, (unused, rang) =>
          h('span.bienvenue__point', { dataset: { etat: rang === index ? 'courant' : rang < index ? 'fait' : 'avenir' } })
        )
      );
      points.setAttribute('aria-label', t('bienvenue.etape', { n: index + 1, total: NOMBRE_ETAPES }));
      passer.textContent = t('bienvenue.passerIntro');

      remplir(
        actions,
        index > 0
          ? h('button.bouton.bouton--fantome', { type: 'button', onclick: reculer }, icone('retour'), t('bienvenue.retour'))
          : null,
        etapeCourante.secondaire
          ? h('button.bouton.bouton--fantome', { type: 'button', onclick: avancer }, etapeCourante.secondaire)
          : null,
        h(
          'button.bouton.bouton--principal.bouton--grand.bienvenue__principal',
          { type: 'button', onclick: avancer },
          etapeCourante.iconePrincipal ? icone(etapeCourante.iconePrincipal) : null,
          etapeCourante.principal
        )
      );

      const phrase = phraseAnnoncee || etapeCourante.ditBit;
      phraseAnnoncee = null;
      if (phrase) bit.parler(phrase, 4200);

      etapeCourante.auMontage?.();
    }

    remplir(
      hote,
      h('div.bienvenue__aurore', { 'aria-hidden': 'true' }, h('i'), h('i'), h('i')),
      h(
        'div.bienvenue__scene',
        { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'CodeWithMe' },
        carte,
        h('div.bienvenue__pied', points, actions),
        passer
      ),
      hoteBit
    );

    // Bit demenage le temps de la presentation, puis retourne dans son coin.
    // `monter()` se contente d'un `replaceChildren` : l'appeler deux fois est
    // sans consequence.
    bit.monter(hoteBit);
    bit.definirVisibilite(store.reglages().mascotte !== false);

    hote.hidden = false;
    dessiner();
  });
}
