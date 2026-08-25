/**
 * Bilingue francais / anglais.
 *
 * Toute chaine visible passe par `t()`. Le contenu pedagogique, lui, porte ses
 * deux versions directement dans ses donnees (objets {fr, en}) et se lit avec
 * `texte()`.
 */

const DICTIONNAIRE = {
  /* --- Navigation ---------------------------------------------------- */
  'nav.accueil': { fr: 'Accueil', en: 'Home' },
  'nav.parcours': { fr: 'Parcours', en: 'Tracks' },
  'nav.galerie': { fr: 'Mes projets', en: 'My projects' },
  'nav.bacASable': { fr: 'Bac à sable', en: 'Sandbox' },
  'nav.badges': { fr: 'Badges', en: 'Badges' },
  'nav.tuteur': { fr: 'Espace tuteur', en: 'Tutor area' },
  'nav.reglages': { fr: 'Réglages', en: 'Settings' },

  /* --- Bandeau -------------------------------------------------------- */
  'bandeau.niveau': { fr: 'Niveau', en: 'Level' },
  'bandeau.xpRestant': { fr: '{n} XP avant le niveau {niveau}', en: '{n} XP to level {niveau}' },
  'bandeau.serie': { fr: '{n} j', en: '{n} d' },
  'bandeau.serieTitre': { fr: 'Série : {n} jours d’affilée', en: 'Streak: {n} days in a row' },
  'bandeau.langue': { fr: 'English', en: 'Français' },
  'bandeau.langueTitre': { fr: 'Switch to English', en: 'Passer en français' },

  /* --- Accueil -------------------------------------------------------- */
  'accueil.salutMatin': { fr: 'Bonjour', en: 'Good morning' },
  'accueil.salutApresMidi': { fr: 'Salut', en: 'Hi' },
  'accueil.salutSoir': { fr: 'Bonsoir', en: 'Good evening' },
  'accueil.reprendre': { fr: 'Reprends où tu en étais', en: 'Pick up where you left off' },
  'accueil.commencer': { fr: 'Commence ton aventure', en: 'Start your adventure' },
  'accueil.continuer': { fr: 'Continuer', en: 'Continue' },
  'accueil.demarrer': { fr: 'Démarrer', en: 'Start' },
  'accueil.tesLangages': { fr: 'Tes langages', en: 'Your languages' },
  'accueil.defiDuJour': { fr: 'Défi du jour', en: 'Daily challenge' },
  'accueil.releverLeDefi': { fr: 'Relever le défi', en: 'Take the challenge' },
  'accueil.progression': { fr: 'Ta progression', en: 'Your progress' },
  'accueil.leconsTerminees': { fr: 'leçons terminées', en: 'lessons completed' },
  'accueil.projetsCrees': { fr: 'projets créés', en: 'projects created' },
  'accueil.badgesGagnes': { fr: 'badges gagnés', en: 'badges earned' },
  'accueil.recommande': { fr: 'Recommandé', en: 'Recommended' },
  'accueil.aucuneSerie': { fr: 'Lance-toi aujourd’hui !', en: 'Get started today!' },

  /* --- Parcours ------------------------------------------------------- */
  'parcours.lecons': { fr: '{n} leçons', en: '{n} lessons' },
  'parcours.termine': { fr: 'Terminé', en: 'Completed' },
  'parcours.enCours': { fr: 'En cours', en: 'In progress' },
  'parcours.pasCommence': { fr: 'Pas encore commencé', en: 'Not started yet' },
  'parcours.module': { fr: 'Module {n}', en: 'Module {n}' },
  'parcours.retour': { fr: 'Retour', en: 'Back' },
  'parcours.objectifFinal': { fr: 'Ce que tu sauras faire', en: 'What you will be able to build' },

  /* --- Atelier -------------------------------------------------------- */
  'atelier.executer': { fr: 'Exécuter', en: 'Run' },
  'atelier.arreter': { fr: 'Arrêter', en: 'Stop' },
  'atelier.verifier': { fr: 'Vérifier', en: 'Check' },
  'atelier.indice': { fr: 'Indice', en: 'Hint' },
  'atelier.solution': { fr: 'Voir la solution', en: 'Show solution' },
  'atelier.reinitialiser': { fr: 'Recommencer', en: 'Reset' },
  'atelier.tonCode': { fr: 'Ton code', en: 'Your code' },
  'atelier.resultat': { fr: 'Résultat', en: 'Result' },
  'atelier.console': { fr: 'Console', en: 'Console' },
  'atelier.dessin': { fr: 'Dessin', en: 'Drawing' },
  'atelier.apercu': { fr: 'Aperçu', en: 'Preview' },
  'atelier.objectif': { fr: 'Objectif', en: 'Goal' },
  'atelier.tonResultat': { fr: 'Ton résultat', en: 'Your result' },
  'atelier.defi': { fr: 'Défi', en: 'Challenge' },
  'atelier.suivant': { fr: 'Leçon suivante', en: 'Next lesson' },
  'atelier.chargementPython': {
    fr: 'Installation de Python dans l’application…',
    en: 'Installing Python inside the app…',
  },
  'atelier.chargementPythonNote': {
    fr: 'Une seule fois, ensuite c’est instantané.',
    en: 'Only once, then it is instant.',
  },
  'atelier.entrerValeur': { fr: 'Le programme attend ta réponse…', en: 'The program is waiting for you…' },
  'atelier.envoyer': { fr: 'Envoyer', en: 'Send' },
  'atelier.termine': { fr: 'Programme terminé', en: 'Program finished' },
  'atelier.arrete': { fr: 'Programme arrêté', en: 'Program stopped' },
  'atelier.enCours': { fr: 'Exécution…', en: 'Running…' },

  /* --- Verification --------------------------------------------------- */
  'verif.reussi': { fr: 'Bravo, c’est réussi !', en: 'Well done, you did it!' },
  'verif.presqueLa': { fr: 'Presque !', en: 'Almost there!' },
  'verif.reessayer': { fr: 'Réessayer', en: 'Try again' },
  'verif.indiceDe': { fr: 'Indice {n} sur {total}', en: 'Hint {n} of {total}' },
  'verif.plusDIndices': { fr: 'Plus d’indices — voir la solution ?', en: 'No more hints — show the solution?' },
  'verif.xpGagne': { fr: '+{n} XP', en: '+{n} XP' },

  /* --- Galerie -------------------------------------------------------- */
  'galerie.titre': { fr: 'Mes projets', en: 'My projects' },
  'galerie.vide': { fr: 'Tes créations apparaîtront ici', en: 'Your creations will appear here' },
  'galerie.videNote': {
    fr: 'Termine un projet dans un parcours pour le voir arriver ici, en vrai fichier sur ton ordinateur.',
    en: 'Finish a project in a track to see it land here, as a real file on your computer.',
  },
  'galerie.ouvrir': { fr: 'Ouvrir', en: 'Open' },
  'galerie.dossier': { fr: 'Voir le fichier', en: 'Show file' },
  'galerie.navigateur': { fr: 'Ouvrir dans le navigateur', en: 'Open in browser' },
  'galerie.supprimer': { fr: 'Supprimer', en: 'Delete' },

  /* --- Bac a sable ---------------------------------------------------- */
  'bac.titre': { fr: 'Bac à sable', en: 'Sandbox' },
  'bac.note': {
    fr: 'Ici, aucune consigne et aucune note : essaie, casse, recommence.',
    en: 'No instructions and no grades here: try things, break them, start over.',
  },

  /* --- Badges --------------------------------------------------------- */
  'badges.titre': { fr: 'Mes badges', en: 'My badges' },
  'badges.obtenus': { fr: '{n} sur {total} obtenus', en: '{n} of {total} earned' },
  'badges.verrouille': { fr: 'Pas encore obtenu', en: 'Not earned yet' },

  /* --- Victoire ------------------------------------------------------- */
  'victoire.titre': { fr: 'Leçon terminée !', en: 'Lesson complete!' },
  'victoire.nouveauNiveau': { fr: 'Niveau {n} atteint !', en: 'Level {n} reached!' },
  'victoire.nouveauBadge': { fr: 'Nouveau badge', en: 'New badge' },
  'victoire.continuer': { fr: 'Continuer', en: 'Continue' },

  /* --- Tuteur --------------------------------------------------------- */
  'tuteur.titre': { fr: 'Espace tuteur', en: 'Tutor area' },
  'tuteur.confidentialite': {
    fr: 'Toutes ces données restent sur cet ordinateur. Rien n’est envoyé sur internet.',
    en: 'All this data stays on this computer. Nothing is sent over the internet.',
  },
  'tuteur.tempsTotal': { fr: 'Temps passé', en: 'Time spent' },
  'tuteur.regularite': { fr: 'Régularité', en: 'Consistency' },
  'tuteur.blocages': { fr: 'Points de blocage', en: 'Sticking points' },
  'tuteur.blocagesNote': {
    fr: 'Notions où il a demandé des indices ou multiplié les essais.',
    en: 'Topics where hints were needed or many attempts were made.',
  },
  'tuteur.aucunBlocage': { fr: 'Rien à signaler pour l’instant.', en: 'Nothing to report yet.' },
  'tuteur.exporter': { fr: 'Exporter le bilan', en: 'Export the report' },
  'tuteur.parLangage': { fr: 'Progression par langage', en: 'Progress by language' },

  /* --- Reglages ------------------------------------------------------- */
  'reglages.titre': { fr: 'Réglages', en: 'Settings' },
  'reglages.prenom': { fr: 'Ton prénom', en: 'Your first name' },
  'reglages.animations': { fr: 'Animations', en: 'Animations' },
  'reglages.sons': { fr: 'Effets sonores', en: 'Sound effects' },
  'reglages.mascotte': { fr: 'Afficher Bit', en: 'Show Bit' },
  'reglages.taillePolice': { fr: 'Taille du texte', en: 'Text size' },
  'reglages.exporterProfil': { fr: 'Sauvegarder ma progression', en: 'Back up my progress' },
  'reglages.importerProfil': { fr: 'Restaurer une sauvegarde', en: 'Restore a backup' },
  'reglages.normale': { fr: 'Normale', en: 'Normal' },
  'reglages.grande': { fr: 'Grande', en: 'Large' },
  'reglages.tresGrande': { fr: 'Très grande', en: 'Very large' },

  /* --- Divers --------------------------------------------------------- */
  'commun.annuler': { fr: 'Annuler', en: 'Cancel' },
  'commun.fermer': { fr: 'Fermer', en: 'Close' },
  'commun.confirmer': { fr: 'Confirmer', en: 'Confirm' },
  'commun.oui': { fr: 'Oui', en: 'Yes' },
  'commun.non': { fr: 'Non', en: 'No' },
};

let langueCourante = 'fr';
const abonnes = new Set();

/** Traduit une cle, en remplaçant les {jetons} par les valeurs fournies. */
export function t(cle, valeurs = null) {
  const entree = DICTIONNAIRE[cle];
  if (!entree) {
    console.warn(`[i18n] cle manquante : ${cle}`);
    return cle;
  }
  let texte = entree[langueCourante] ?? entree.fr;
  if (valeurs) {
    for (const [nom, valeur] of Object.entries(valeurs)) {
      texte = texte.replaceAll(`{${nom}}`, String(valeur));
    }
  }
  return texte;
}

/** Lit un champ bilingue du contenu pedagogique : { fr: '...', en: '...' }. */
export function texte(champ) {
  if (champ === null || champ === undefined) return '';
  if (typeof champ === 'string') return champ;
  return champ[langueCourante] ?? champ.fr ?? champ.en ?? '';
}

export function langue() {
  return langueCourante;
}

export function definirLangue(nouvelle) {
  const valide = nouvelle === 'en' ? 'en' : 'fr';
  if (valide === langueCourante) return;
  langueCourante = valide;
  document.documentElement.lang = valide;
  for (const abonne of abonnes) abonne(valide);
}

export function basculerLangue() {
  definirLangue(langueCourante === 'fr' ? 'en' : 'fr');
  return langueCourante;
}

export function surChangementLangue(rappel) {
  abonnes.add(rappel);
  return () => abonnes.delete(rappel);
}

/** Utilise par les tests : verifie qu'aucune cle n'est traduite a moitie. */
export function clesIncompletes() {
  return Object.entries(DICTIONNAIRE)
    .filter(([, valeur]) => !valeur.fr?.trim() || !valeur.en?.trim())
    .map(([cle]) => cle);
}

export const TOUTES_LES_CLES = Object.keys(DICTIONNAIRE);
