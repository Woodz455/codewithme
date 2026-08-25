/**
 * L'atelier : l'ecran ou l'eleve lit, ecrit, execute et fait corriger.
 *
 * Trois colonnes : la lecon, l'editeur, le resultat vivant. Le resultat change
 * de nature selon le parcours — console, page web, dessin — mais la mecanique
 * reste la meme partout, pour qu'il n'ait qu'une interface a apprendre.
 */
import { h, remplir, attendre } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { naviguer } from '../core/routeur.js';
import { situerLecon, leconSuivante } from '../../content/parcours.js';
import { leconParId } from '../../content/lecons.js';
import { Editeur, ligneDeLErreur } from '../editeur.js';
import { moteurPython } from '../runners/python.js';
import { ToileTortue } from '../runners/tortue-canvas.js';
import { MoteurWeb, pageAutonome } from '../runners/web.js';
import { executerCpp, attendUneSaisie, detecterCompilateur, compilerAvecSysteme } from '../runners/cpp.js';
import { corriger } from '../validateur.js';
import * as bit from '../mascotte.js';
import { celebrer } from '../gamification.js';

/** Parcours dont le resultat est une page web plutot qu'une console. */
const PARCOURS_WEB = new Set(['html', 'css', 'javascript']);

export function ecranAtelier(identifiantParcours, identifiantLecon) {
  const situation = situerLecon(identifiantLecon);
  const lecon = leconParId(identifiantLecon);

  if (!situation || !lecon) {
    return h(
      'div',
      h(
        'header.scene__entete',
        h('h1.scene__titre', texte({ fr: 'Leçon en préparation', en: 'Lesson in preparation' })),
        h(
          'p.scene__sous',
          texte({
            fr: 'Le contenu de cette leçon arrive bientôt. Les autres leçons du parcours sont déjà disponibles.',
            en: 'This lesson’s content is coming soon. The other lessons in the track are already available.',
          })
        ),
        h(
          'p',
          h(
            'button.bouton.bouton--fantome',
            { onclick: () => naviguer(`/parcours/${identifiantParcours}`) },
            `← ${t('parcours.retour')}`
          )
        )
      )
    );
  }

  return construireAtelier(situation, lecon);
}

/* ========================================================================== */

function construireAtelier(situation, lecon) {
  const { parcours, fiche } = situation;
  const estWeb = PARCOURS_WEB.has(lecon.langage) || lecon.langage === 'web';
  const cleBrouillon = `lecon:${lecon.id}`;

  /* --------------------------------------------------------------- etat -- */

  const etat = {
    editeurs: new Map(),
    moteurWeb: null,
    toile: null,
    sortie: '',
    dessin: [],
    indicesVus: 0,
    tentatives: 0,
    debut: Date.now(),
    enExecution: false,
    dejaReussie: store.leconTerminee(lecon.id),
    detacherPython: [],
  };

  /* ------------------------------------------------------ code de depart -- */

  /** Le brouillon sauvegarde a priorite sur le code de depart de la lecon. */
  function codeDeDepart() {
    const brouillon = store.lireBrouillon(cleBrouillon);
    if (brouillon) {
      try {
        return typeof brouillon === 'string' ? { principal: brouillon } : JSON.parse(brouillon);
      } catch {
        return { principal: brouillon };
      }
    }
    const depart = lecon.defi?.depart ?? '';
    return typeof depart === 'string' ? { principal: depart } : depart;
  }

  const enregistrerBrouillon = attendre(() => {
    store.ecrireBrouillon(cleBrouillon, JSON.stringify(codeActuel()));
  }, 600);

  function codeActuel() {
    const resultat = {};
    for (const [cle, editeur] of etat.editeurs) resultat[cle] = editeur.valeurImmediate();
    return resultat;
  }

  /** Le code envoye au correcteur : tout concatene pour les regles `codeContient`. */
  function codeConcatene() {
    return Object.values(codeActuel()).join('\n');
  }

  /* ------------------------------------------------------------- console -- */

  const console_ = h('div.console', { role: 'log', 'aria-live': 'polite' });

  function ecrireConsole(texteBrut, flux = 'sortie') {
    if (!texteBrut) return;
    etat.sortie += flux === 'sortie' ? texteBrut : '';
    console_.append(h(`span.console__${flux === 'erreur' ? 'erreur' : 'texte'}`, texteBrut));
    console_.scrollTop = console_.scrollHeight;
  }

  function viderConsole() {
    etat.sortie = '';
    console_.replaceChildren();
  }

  function messageConsole(contenu, classe = 'console__note') {
    console_.append(h(`div.${classe}`, contenu));
    console_.scrollTop = console_.scrollHeight;
  }

  /* ---------------------------------------------------- panneau resultat -- */

  const canevas = h('canvas.toile-tortue');
  const cadreApercu = h('iframe.apercu');

  const ongletsResultat = [];
  const panneaux = {};

  function definirOnglet(nom) {
    for (const [cle, element] of Object.entries(panneaux)) {
      element.hidden = cle !== nom;
    }
    for (const bouton of ongletsResultat) {
      bouton.classList.toggle('onglet--actif', bouton.dataset.onglet === nom);
    }
    if (nom === 'dessin') etat.toile?.redimensionner();
    if (nom === 'apercu') etat.moteurWeb?.attendrePret();
  }

  function construireOnglets() {
    const definitions = estWeb
      ? [
          ['apercu', t('atelier.apercu'), '🖥️'],
          ['console', t('atelier.console'), '📟'],
        ]
      : lecon.langage === 'python'
        ? [
            ['console', t('atelier.console'), '📟'],
            ['dessin', t('atelier.dessin'), '🐢'],
          ]
        : [['console', t('atelier.console'), '📟']];

    ongletsResultat.length = 0;
    const barre = h(
      'div.onglets',
      definitions.map(([cle, libelle, icone]) => {
        const bouton = h(
          'button.onglet',
          { dataset: { onglet: cle }, onclick: () => definirOnglet(cle) },
          h('span', icone),
          libelle
        );
        ongletsResultat.push(bouton);
        return bouton;
      })
    );

    panneaux.console = h('div.panneau', console_);
    if (estWeb) panneaux.apercu = h('div.panneau.panneau--apercu', cadreApercu);
    if (lecon.langage === 'python') panneaux.dessin = h('div.panneau.panneau--dessin', canevas);

    return { barre, corps: h('div.panneau-hote', Object.values(panneaux)) };
  }

  /* --------------------------------------------------- panneau de reponse -- */

  const zoneVerdict = h('div.verdict', { hidden: true });

  function afficherVerdict({ reussi, message, xpGagne = 0 }) {
    zoneVerdict.hidden = false;
    zoneVerdict.dataset.etat = reussi ? 'reussi' : 'echec';

    remplir(
      zoneVerdict,
      h('div.verdict__icone', reussi ? '✅' : '🤔'),
      h(
        'div.verdict__texte',
        h('strong', reussi ? t('verif.reussi') : t('verif.presqueLa')),
        message ? h('p', message) : null
      ),
      reussi
        ? h(
            'div.verdict__actions',
            xpGagne ? h('span.verdict__xp', t('verif.xpGagne', { n: xpGagne })) : null,
            boutonSuivant()
          )
        : h(
            'div.verdict__actions',
            etat.indicesVus < (lecon.defi?.indices?.length || 0)
              ? h('button.bouton.bouton--petit', { onclick: montrerIndice }, `💡 ${t('atelier.indice')}`)
              : null
          )
    );
  }

  function boutonSuivant() {
    const suivante = leconSuivante(lecon.id);
    if (!suivante) {
      return h(
        'button.bouton.bouton--succes',
        { onclick: () => naviguer(`/parcours/${parcours.id}`) },
        `${t('parcours.retour')} →`
      );
    }
    return h(
      'button.bouton.bouton--succes',
      { onclick: () => naviguer(`/lecon/${parcours.id}/${suivante.id}`) },
      `${t('atelier.suivant')} →`
    );
  }

  /* ---------------------------------------------------------- execution -- */

  function preparerExecution() {
    viderConsole();
    etat.dessin = [];
    etat.toile?.effacer();
    zoneVerdict.hidden = true;
    for (const editeur of etat.editeurs.values()) editeur.effacerMarques();
    bit.reagirExecution();
    bit.signalerActivite();
  }

  function finExecution({ arrete = false } = {}) {
    etat.enExecution = false;
    boutonExecuter.hidden = false;
    boutonArreter.hidden = true;
    etat.toile?.terminer();
    messageConsole(arrete ? `⏹ ${t('atelier.arrete')}` : `✓ ${t('atelier.termine')}`, 'console__fin');
  }

  async function executer() {
    if (etat.enExecution) return;
    etat.enExecution = true;
    boutonExecuter.hidden = true;
    boutonArreter.hidden = false;
    preparerExecution();

    try {
      if (lecon.langage === 'python') await executerPython();
      else if (lecon.langage === 'cpp') await executerCppIci();
      else await executerWeb();
    } catch (erreur) {
      ecrireConsole(`${erreur?.message || erreur}\n`, 'erreur');
      finExecution();
    }
  }

  /* --- Python ------------------------------------------------------------ */

  async function executerPython() {
    const moteur = moteurPython();
    definirOnglet('console');

    if (!moteur.pret) {
      messageConsole(
        h(
          'div.chargement',
          h('div.chargement__barre', h('div.chargement__jauge')),
          h('div', t('atelier.chargementPython')),
          h('div.chargement__note', t('atelier.chargementPythonNote'))
        ),
        'console__chargement'
      );
    }

    // Les ecouteurs sont poses a chaque execution puis retires : le moteur est
    // partage par tout l'application, il ne doit pas garder les rappels d'un
    // atelier deja quitte.
    const surSortie = (lignes) => {
      for (const { flux, texte: contenu } of lignes) ecrireConsole(contenu, flux);
    };
    const surDessin = (commandes) => {
      etat.dessin.push(...commandes);
      etat.toile?.ajouter(commandes);
      if (commandes.some((c) => c.c === 'ligne' || c.c === 'point' || c.c === 'remplir')) {
        activerOngletDessin();
      }
    };
    const surEntree = () => demanderSaisie((reponse) => moteur.repondre(reponse));
    const surErreur = (message) => {
      const chargement = console_.querySelector('.console__chargement');
      chargement?.remove();
      ecrireConsole(`${message}\n`, 'erreur');
      const ligne = ligneDeLErreur(message);
      if (ligne) etat.editeurs.get('principal')?.marquerErreur(ligne);
      bit.reagirErreur();
      finExecution();
      nettoyerEcouteurs();
    };
    const surTermine = ({ arrete }) => {
      const chargement = console_.querySelector('.console__chargement');
      chargement?.remove();
      finExecution({ arrete });
      nettoyerEcouteurs();
    };

    function nettoyerEcouteurs() {
      for (const detacher of etat.detacherPython) detacher();
      etat.detacherPython = [];
    }

    const poser = (evenement, rappel) => {
      moteur.sur(evenement, rappel);
      etat.detacherPython.push(() => {
        const liste = moteur.ecouteurs[evenement] || [];
        const index = liste.indexOf(rappel);
        if (index >= 0) liste.splice(index, 1);
      });
    };

    poser('sortie', surSortie);
    poser('dessin', surDessin);
    poser('entree', surEntree);
    poser('erreur', surErreur);
    poser('termine', surTermine);

    await moteur.executer(codeActuel().principal ?? '');
  }

  function activerOngletDessin() {
    const bouton = ongletsResultat.find((b) => b.dataset.onglet === 'dessin');
    if (bouton && !bouton.classList.contains('onglet--actif')) definirOnglet('dessin');
  }

  /** Champ de saisie affiche dans la console quand le programme attend input(). */
  function demanderSaisie(repondre) {
    const champ = h('input.saisie__champ', {
      type: 'text',
      'aria-label': t('atelier.entrerValeur'),
      autofocus: true,
    });

    const envoyer = () => {
      const valeur = champ.value;
      ligne.replaceWith(h('div.console__saisie', `▸ ${valeur}`));
      repondre(valeur);
    };

    const ligne = h(
      'div.saisie',
      champ,
      h('button.bouton.bouton--petit.bouton--principal', { onclick: envoyer }, t('atelier.envoyer'))
    );

    champ.addEventListener('keydown', (evenement) => {
      if (evenement.key === 'Enter') {
        evenement.preventDefault();
        envoyer();
      }
    });

    console_.append(ligne);
    console_.scrollTop = console_.scrollHeight;
    champ.focus();
  }

  /* --- C++ --------------------------------------------------------------- */

  async function executerCppIci() {
    definirOnglet('console');
    const source = codeActuel().principal ?? '';
    const entree = lecon.defi?.entree ?? zoneEntreeCpp?.value ?? '';

    const resultat = basculeSysteme?.checked
      ? await compilerAvecSysteme(source, entree)
      : await executerCpp(source, entree);

    if (resultat.sortie) ecrireConsole(resultat.sortie, 'sortie');

    if (!resultat.ok) {
      ecrireConsole(`\n${resultat.erreur}\n`, 'erreur');
      if (resultat.explication) messageConsole(`💡 ${resultat.explication}`, 'console__explication');
      bit.reagirErreur();
    }
    finExecution();
  }

  /* --- Web (HTML / CSS / JavaScript) -------------------------------------- */

  async function executerWeb() {
    definirOnglet('apercu');
    const code = codeActuel();
    await etat.moteurWeb.rendre({
      html: code.html ?? code.principal ?? '',
      css: code.css ?? '',
      js: code.js ?? (lecon.langage === 'javascript' ? code.principal : '') ?? '',
    });
    finExecution();
  }

  /* ------------------------------------------------------------ verifier -- */

  async function verifier() {
    bit.signalerActivite();
    etat.tentatives += 1;

    // On execute d'abord : la correction juge le resultat, pas le texte du code.
    if (!etat.enExecution) await executer();
    await new Promise((resoudre) => setTimeout(resoudre, estWeb ? 350 : 120));

    const resultat = await corriger(lecon.defi?.verifications, {
      code: codeConcatene(),
      sortie: etat.sortie,
      dessin: etat.dessin,
      moteurWeb: etat.moteurWeb,
    });

    if (!resultat.reussi) {
      store.noterTentative(lecon.id);
      afficherVerdict({ reussi: false, message: resultat.message });
      bit.reagirErreur();
      return;
    }

    const { xpGagne, nouveauNiveau } = store.terminerLecon(lecon.id, {
      xp: lecon.xp ?? 20,
      tentatives: etat.tentatives,
      indices: etat.indicesVus,
      tempsMs: Date.now() - etat.debut,
    });

    afficherVerdict({ reussi: true, message: null, xpGagne });
    bit.reagirReussite();
    await enregistrerProjet();
    celebrer({ xpGagne, nouveauNiveau, lecon });
  }

  /** Un projet termine devient un vrai fichier dans la galerie. */
  async function enregistrerProjet() {
    if (!lecon.projet) return;
    const code = codeActuel();

    let contenu;
    let langage;
    if (estWeb) {
      contenu = pageAutonome({
        html: code.html ?? code.principal ?? '',
        css: code.css ?? '',
        js: code.js ?? '',
        titre: texte(lecon.projet.titre),
      });
      langage = 'web';
    } else {
      contenu = code.principal ?? '';
      langage = lecon.langage;
    }

    try {
      await window.cwm.projets.enregistrer({
        titre: texte(lecon.projet.titre),
        langage,
        code: contenu,
        leconId: lecon.id,
        apercu: lecon.langage === 'python' && etat.toile?.aDuContenu() ? etat.toile.versImage() : null,
      });
    } catch (erreur) {
      console.error('Enregistrement du projet impossible :', erreur);
    }
  }

  /* -------------------------------------------------------------- indices -- */

  const zoneIndices = h('div.indices');

  function montrerIndice() {
    const indices = lecon.defi?.indices || [];
    if (etat.indicesVus >= indices.length) {
      montrerSolution();
      return;
    }

    const numero = etat.indicesVus;
    etat.indicesVus += 1;
    store.noterTentative(lecon.id, { indice: true });

    zoneIndices.append(
      h(
        'div.indice',
        h('div.indice__entete', `💡 ${t('verif.indiceDe', { n: numero + 1, total: indices.length })}`),
        h('p', texte(indices[numero]))
      )
    );
    majBoutonIndice();
    bit.parler({ fr: 'Regarde cet indice, ça devrait débloquer.', en: 'Check this hint, it should help.' }, 3200);
  }

  function montrerSolution() {
    if (zoneIndices.querySelector('.indice--solution')) return;
    const solution = lecon.defi?.solution;
    if (!solution) return;

    const codeSolution = typeof solution === 'string' ? solution : Object.values(solution).join('\n\n');

    zoneIndices.append(
      h(
        'div.indice.indice--solution',
        h('div.indice__entete', `🔑 ${t('atelier.solution')}`),
        h('pre.indice__code', h('code', codeSolution)),
        h(
          'button.bouton.bouton--petit.bouton--fantome',
          { onclick: () => appliquerSolution(solution) },
          texte({ fr: 'Recopier dans l’éditeur', en: 'Copy into the editor' })
        )
      )
    );
    majBoutonIndice();
  }

  async function appliquerSolution(solution) {
    if (typeof solution === 'string') {
      await etat.editeurs.get('principal')?.definirValeur(solution);
    } else {
      for (const [cle, valeur] of Object.entries(solution)) {
        await etat.editeurs.get(cle)?.definirValeur(valeur);
      }
    }
    enregistrerBrouillon();
  }

  const boutonIndice = h('button.bouton.bouton--fantome', { onclick: montrerIndice });

  function majBoutonIndice() {
    const total = lecon.defi?.indices?.length || 0;
    const reste = total - etat.indicesVus;
    remplir(boutonIndice, reste > 0 ? `💡 ${t('atelier.indice')} (${reste})` : `🔑 ${t('atelier.solution')}`);
    boutonIndice.hidden = total === 0 && !lecon.defi?.solution;
  }

  /* ------------------------------------------------------------- boutons -- */

  const boutonExecuter = h(
    'button.bouton.bouton--principal',
    { onclick: executer },
    `▶ ${t('atelier.executer')}`
  );
  const boutonArreter = h(
    'button.bouton',
    {
      hidden: true,
      onclick: () => {
        if (lecon.langage === 'python') moteurPython().arreter();
        else finExecution({ arrete: true });
      },
    },
    `⏹ ${t('atelier.arreter')}`
  );
  const boutonVerifier = h(
    'button.bouton.bouton--succes',
    { onclick: verifier },
    `✓ ${t('atelier.verifier')}`
  );
  const boutonReinitialiser = h(
    'button.bouton.bouton--fantome.bouton--petit.infobulle',
    {
      'data-infobulle': t('atelier.reinitialiser'),
      onclick: async () => {
        const depart = lecon.defi?.depart ?? '';
        if (typeof depart === 'string') await etat.editeurs.get('principal')?.definirValeur(depart);
        else for (const [cle, valeur] of Object.entries(depart)) await etat.editeurs.get(cle)?.definirValeur(valeur);
        enregistrerBrouillon();
      },
    },
    '↺'
  );

  /* -------------------------- entree standard pour les programmes C++ ----- */

  let zoneEntreeCpp = null;
  let basculeSysteme = null;

  /**
   * L'interpreteur C++ embarque lit toute l'entree standard d'un coup : il ne
   * peut pas poser une question puis attendre. On demande donc les reponses
   * avant de lancer — ce qui reste fidele a l'usage reel d'un programme en
   * ligne de commande (`programme.exe < reponses.txt`).
   */
  function blocEntreeCpp() {
    if (lecon.langage !== 'cpp') return null;
    if (lecon.defi?.entree !== undefined) return null;
    if (!attendUneSaisie(typeof lecon.defi?.depart === 'string' ? lecon.defi.depart : '')) return null;

    zoneEntreeCpp = h('textarea.entree-cpp__zone', {
      rows: 3,
      spellcheck: false,
      placeholder: texte({
        fr: 'Une réponse par ligne…',
        en: 'One answer per line…',
      }),
    });

    return h(
      'div.entree-cpp',
      h(
        'label.entree-cpp__titre',
        `⌨️ ${texte({
          fr: 'Ce que tu taperas au clavier',
          en: 'What you will type on the keyboard',
        })}`
      ),
      zoneEntreeCpp
    );
  }

  /** Case a cocher proposant la vraie compilation, si un compilateur existe. */
  async function proposerCompilateurSysteme(hote) {
    if (lecon.langage !== 'cpp') return;
    const compilateur = await detecterCompilateur();
    if (!compilateur.disponible) return;

    basculeSysteme = h('input', { type: 'checkbox' });
    hote.append(
      h(
        'label.compilateur.infobulle',
        { 'data-infobulle': compilateur.version || compilateur.commande },
        basculeSysteme,
        h(
          'span',
          texte({
            fr: `Compiler pour de vrai (${compilateur.commande})`,
            en: `Compile for real (${compilateur.commande})`,
          })
        )
      )
    );
  }

  /* ------------------------------------------------------------- montage -- */

  const colonneLecon = h(
    'aside.atelier__lecon',
    h(
      'div.atelier__fil',
      h(
        'button.lien-retour',
        { onclick: () => naviguer(`/parcours/${parcours.id}`) },
        `← ${texte(parcours.nom)}`
      ),
      h('span.surtitre', texte(situation.module.titre))
    ),
    h('h1.atelier__titre', texte(fiche.titre)),
    lecon.objectif ? h('p.atelier__objectif', texte(lecon.objectif)) : null,
    h('div.lecon-texte', { html: texte(lecon.explication) }),
    lecon.exemple
      ? h(
          'section.exemple',
          h('div.exemple__entete', h('span.surtitre', texte({ fr: 'Exemple', en: 'Example' }))),
          h('pre.exemple__code', h('code', typeof lecon.exemple.code === 'string' ? lecon.exemple.code : '')),
          lecon.exemple.note ? h('p.exemple__note', texte(lecon.exemple.note)) : null,
          h(
            'button.bouton.bouton--petit.bouton--fantome',
            {
              onclick: async () => {
                await appliquerSolution(lecon.exemple.code);
                executer();
              },
            },
            texte({ fr: '▶ Essayer cet exemple', en: '▶ Try this example' })
          )
        )
      : null,
    h(
      'section.defi',
      h('div.defi__entete', h('span.etiquette', `🎯 ${t('atelier.defi')}`), h('span.defi__xp', `+${lecon.xp ?? 20} XP`)),
      h('div.lecon-texte', { html: texte(lecon.defi?.consigne) })
    ),
    zoneIndices
  );

  const hoteEditeurs = h('div.atelier__editeurs');
  const { barre: barreOnglets, corps: corpsResultat } = construireOnglets();

  const racine = h(
    'div.atelier',
    { style: { '--teinte': parcours.couleur } },
    colonneLecon,
    h(
      'section.atelier__centre',
      h(
        'div.atelier__barre',
        h('span.surtitre.atelier__etiquette', t('atelier.tonCode')),
        h('div.atelier__actions', boutonReinitialiser, boutonIndice, boutonArreter, boutonExecuter)
      ),
      hoteEditeurs
    ),
    h(
      'section.atelier__resultat',
      // « Vérifier » vit du cote du resultat : c'est le resultat qu'on corrige,
      // pas le texte du code.
      h('div.atelier__barre', barreOnglets, h('div.atelier__actions', boutonVerifier)),
      corpsResultat,
      blocEntreeCpp(),
      zoneVerdict
    )
  );

  proposerCompilateurSysteme(racine.querySelector('.atelier__actions'));

  /* --------------------------------------------------- mise en route ----- */

  const depart = codeDeDepart();

  function creerEditeur(cle, langage, valeur) {
    const hote = h('div.editeur');
    const editeur = new Editeur(hote, {
      langage,
      valeur,
      surChangement: () => {
        enregistrerBrouillon();
        // En HTML/CSS pur, l'apercu suit la frappe : c'est le moment « waouh ».
        if (estWeb && !aDuJavaScript()) rendreApercuDirect();
      },
      surExecution: executer,
    });
    etat.editeurs.set(cle, editeur);
    return { hote, editeur };
  }

  const rendreApercuDirect = attendre(() => {
    const code = codeActuel();
    etat.moteurWeb?.rendre({
      html: code.html ?? code.principal ?? '',
      css: code.css ?? '',
      js: '',
    });
  }, 260);

  function aDuJavaScript() {
    const code = codeActuel();
    return Boolean((code.js ?? (lecon.langage === 'javascript' ? code.principal : '') ?? '').trim());
  }

  // Un ou plusieurs editeurs selon la lecon : le web en demande souvent deux
  // (structure et style), les autres langages un seul.
  const zones = typeof (lecon.defi?.depart ?? '') === 'string'
    ? [['principal', lecon.langage === 'web' ? 'html' : lecon.langage]]
    : Object.keys(lecon.defi.depart).map((cle) => [cle, cle]);

  if (zones.length === 1) {
    const { hote } = creerEditeur(zones[0][0], zones[0][1], depart[zones[0][0]] ?? '');
    hoteEditeurs.append(hote);
  } else {
    const ongletsCode = [];
    const hotes = {};
    for (const [cle, langage] of zones) {
      const { hote } = creerEditeur(cle, langage, depart[cle] ?? '');
      hote.hidden = cle !== zones[0][0];
      hotes[cle] = hote;
    }

    const barre = h(
      'div.onglets.onglets--code',
      zones.map(([cle]) => {
        const bouton = h(
          'button.onglet',
          {
            dataset: { onglet: cle },
            onclick: () => {
              for (const [autre, element] of Object.entries(hotes)) element.hidden = autre !== cle;
              for (const b of ongletsCode) b.classList.toggle('onglet--actif', b.dataset.onglet === cle);
              etat.editeurs.get(cle)?.rafraichir();
            },
          },
          cle.toUpperCase()
        );
        ongletsCode.push(bouton);
        return bouton;
      })
    );
    ongletsCode[0].classList.add('onglet--actif');
    hoteEditeurs.append(barre, ...Object.values(hotes));
  }

  majBoutonIndice();
  definirOnglet(estWeb ? 'apercu' : 'console');

  if (lecon.langage === 'python') {
    etat.toile = new ToileTortue(canevas);
    // Le moteur Python demarre en tache de fond des l'ouverture : quand
    // l'eleve clique sur Executer, il est deja pret.
    moteurPython().demarrer().catch(() => {});
  }

  if (estWeb) {
    etat.moteurWeb = new MoteurWeb(cadreApercu);
    etat.moteurWeb.sur('console', ({ niveau, texte: contenu }) =>
      ecrireConsole(`${contenu}\n`, niveau === 'erreur' ? 'erreur' : 'sortie')
    );
    etat.moteurWeb.sur('erreur', ({ message, ligne }) => {
      ecrireConsole(`${message}${ligne ? ` (ligne ${ligne})` : ''}\n`, 'erreur');
      definirOnglet('console');
    });
    etat.moteurWeb.charger().then(() => rendreApercuDirect());
  }

  const surRedimension = () => etat.toile?.redimensionner();
  window.addEventListener('resize', surRedimension);

  if (etat.dejaReussie) {
    zoneVerdict.hidden = false;
    zoneVerdict.dataset.etat = 'deja';
    remplir(
      zoneVerdict,
      h('div.verdict__icone', '⭐'),
      h(
        'div.verdict__texte',
        h('strong', texte({ fr: 'Leçon déjà réussie', en: 'Lesson already completed' })),
        h('p', texte({ fr: 'Tu peux la refaire pour réviser.', en: 'You can redo it to revise.' }))
      ),
      h('div.verdict__actions', boutonSuivant())
    );
  }

  racine.detruire = () => {
    window.removeEventListener('resize', surRedimension);
    for (const detacher of etat.detacherPython) detacher();
    if (etat.enExecution && lecon.langage === 'python') moteurPython().arreter();
    etat.moteurWeb?.detruire();
    for (const editeur of etat.editeurs.values()) editeur.detruire();
    store.ajouterTemps(Date.now() - etat.debut);
  };

  return racine;
}
