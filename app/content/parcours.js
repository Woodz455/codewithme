/**
 * Structure des 5 parcours : identite visuelle, modules, titres des lecons.
 *
 * Ce fichier decrit l'ossature. Le detail pedagogique de chaque lecon
 * (explication, exemple, defi, verifications, indices, solution) vit dans les
 * fichiers `lecons-*.js`, un par langage, et se rattache ici par l'identifiant.
 */

const L = (id, fr, en) => ({ id, titre: { fr, en } });

export const PARCOURS = [
  /* ====================================================== PYTHON ========== */
  {
    id: 'python',
    nom: 'Python',
    couleur: 'var(--python)',
    couleurBrute: '#00E5FF',
    logo: 'python',
    ordre: 1,
    resume: {
      fr: 'Le langage le plus simple pour commencer. Tu donnes des ordres, l’ordinateur obéit.',
      en: 'The easiest language to start with. You give orders, the computer obeys.',
    },
    aboutissement: {
      fr: 'Une rosace colorée dessinée par ton code, et un jeu « devine le nombre ».',
      en: 'A colourful rosette drawn by your code, and a "guess the number" game.',
    },
    modules: [
      {
        id: 'py-1',
        titre: { fr: 'Premiers pas', en: 'First steps' },
        icone: 'premiersPas',
        lecons: [
          L('py-1-1', 'Ton tout premier programme', 'Your very first program'),
          L('py-1-2', 'Afficher plusieurs lignes', 'Printing several lines'),
          L('py-1-3', 'Les erreurs, ces amies', 'Errors are your friends'),
          L('py-1-4', 'Écrire des commentaires', 'Writing comments'),
        ],
      },
      {
        id: 'py-2',
        titre: { fr: 'Variables et calculs', en: 'Variables and maths' },
        icone: 'calcul',
        lecons: [
          L('py-2-1', 'Ranger une valeur dans une variable', 'Storing a value in a variable'),
          L('py-2-2', 'Les nombres et les calculs', 'Numbers and calculations'),
          L('py-2-3', 'Assembler du texte', 'Joining text together'),
          L('py-2-4', 'Poser une question à l’utilisateur', 'Asking the user a question'),
          L('py-2-5', 'Projet : la calculatrice de poche', 'Project: pocket calculator'),
        ],
      },
      {
        id: 'py-3',
        titre: { fr: 'Décisions et boucles', en: 'Decisions and loops' },
        icone: 'decision',
        lecons: [
          L('py-3-1', 'Si… alors : la condition', 'If… then: conditions'),
          L('py-3-2', 'Sinon, et sinon si', 'Else, and else if'),
          L('py-3-3', 'Répéter avec une boucle for', 'Repeating with a for loop'),
          L('py-3-4', 'Répéter tant que : while', 'Repeating while: while'),
          L('py-3-5', 'Projet : devine le nombre', 'Project: guess the number'),
        ],
      },
      {
        id: 'py-4',
        titre: { fr: 'Dessiner avec la tortue', en: 'Drawing with the turtle' },
        icone: 'tortue',
        lecons: [
          L('py-4-1', 'La tortue avance et tourne', 'The turtle moves and turns'),
          L('py-4-2', 'Dessiner un carré, puis un polygone', 'Drawing a square, then a polygon'),
          L('py-4-3', 'Couleurs et épaisseur du trait', 'Colours and line width'),
          L('py-4-4', 'Projet : la rosace', 'Project: the rosette'),
        ],
      },
      {
        id: 'py-5',
        titre: { fr: 'Listes et fonctions', en: 'Lists and functions' },
        icone: 'boite',
        lecons: [
          L('py-5-1', 'Ranger plusieurs valeurs : la liste', 'Storing several values: the list'),
          L('py-5-2', 'Parcourir une liste', 'Going through a list'),
          L('py-5-3', 'Créer ta propre fonction', 'Creating your own function'),
          L('py-5-4', 'Projet : le générateur de mots de passe', 'Project: password generator'),
        ],
      },
    ],
  },

  /* ======================================================== HTML =========== */
  {
    id: 'html',
    nom: 'HTML',
    couleur: 'var(--html)',
    couleurBrute: '#FF8A4C',
    logo: 'html',
    ordre: 2,
    resume: {
      fr: 'Le squelette de toutes les pages web. C’est ici que ton site prend forme.',
      en: 'The skeleton of every web page. This is where your site takes shape.',
    },
    aboutissement: {
      fr: 'Ta page de présentation personnelle, avec tes images et tes liens.',
      en: 'Your own personal page, with your pictures and links.',
    },
    modules: [
      {
        id: 'html-1',
        titre: { fr: 'La structure d’une page', en: 'Page structure' },
        icone: 'page',
        lecons: [
          L('html-1-1', 'Une balise, c’est quoi ?', 'What is a tag?'),
          L('html-1-2', 'Les titres et les paragraphes', 'Headings and paragraphs'),
          L('html-1-3', 'Le squelette complet d’une page', 'The full page skeleton'),
          L('html-1-4', 'Ranger avec div et section', 'Organising with div and section'),
        ],
      },
      {
        id: 'html-2',
        titre: { fr: 'Textes, images et liens', en: 'Text, images and links' },
        icone: 'image',
        lecons: [
          L('html-2-1', 'Mettre en valeur du texte', 'Emphasising text'),
          L('html-2-2', 'Insérer une image', 'Adding an image'),
          L('html-2-3', 'Créer un lien', 'Creating a link'),
          L('html-2-4', 'Projet : ta carte de visite', 'Project: your business card'),
        ],
      },
      {
        id: 'html-3',
        titre: { fr: 'Listes et tableaux', en: 'Lists and tables' },
        icone: 'liste',
        lecons: [
          L('html-3-1', 'Les listes à puces et numérotées', 'Bulleted and numbered lists'),
          L('html-3-2', 'Construire un tableau', 'Building a table'),
          L('html-3-3', 'Projet : ton emploi du temps', 'Project: your timetable'),
        ],
      },
      {
        id: 'html-4',
        titre: { fr: 'Formulaires', en: 'Forms' },
        icone: 'formulaire',
        lecons: [
          L('html-4-1', 'Champs de saisie et boutons', 'Input fields and buttons'),
          L('html-4-2', 'Cases, choix et menus', 'Checkboxes, choices and menus'),
          L('html-4-3', 'Projet : un formulaire d’inscription', 'Project: a sign-up form'),
        ],
      },
    ],
  },

  /* ========================================================= CSS =========== */
  {
    id: 'css',
    nom: 'CSS',
    couleur: 'var(--css)',
    couleurBrute: '#5AA9FF',
    logo: 'css',
    ordre: 3,
    resume: {
      fr: 'L’habillage. Couleurs, polices, animations : c’est ce qui rend un site beau.',
      en: 'The styling. Colours, fonts, animations: this is what makes a site look good.',
    },
    aboutissement: {
      fr: 'Ta page transformée en vrai site, avec animations et affichage mobile.',
      en: 'Your page turned into a real site, with animations and mobile layout.',
    },
    modules: [
      {
        id: 'css-1',
        titre: { fr: 'Couleurs et polices', en: 'Colours and fonts' },
        icone: 'palette',
        lecons: [
          L('css-1-1', 'Brancher du CSS sur ta page', 'Plugging CSS into your page'),
          L('css-1-2', 'Choisir des couleurs', 'Choosing colours'),
          L('css-1-3', 'Changer la police et la taille', 'Changing font and size'),
          L('css-1-4', 'Cibler avec les classes', 'Targeting with classes'),
        ],
      },
      {
        id: 'css-2',
        titre: { fr: 'Boîtes et espacements', en: 'Boxes and spacing' },
        icone: 'regle',
        lecons: [
          L('css-2-1', 'Tout est une boîte', 'Everything is a box'),
          L('css-2-2', 'Marges intérieures et extérieures', 'Padding and margin'),
          L('css-2-3', 'Bordures et coins arrondis', 'Borders and rounded corners'),
          L('css-2-4', 'Ombres et dégradés', 'Shadows and gradients'),
        ],
      },
      {
        id: 'css-3',
        titre: { fr: 'Placer avec Flexbox', en: 'Layout with Flexbox' },
        icone: 'aimant',
        lecons: [
          L('css-3-1', 'Aligner en ligne ou en colonne', 'Aligning in a row or column'),
          L('css-3-2', 'Centrer, enfin !', 'Centring, at last!'),
          L('css-3-3', 'Répartir l’espace', 'Distributing space'),
          L('css-3-4', 'Projet : une barre de navigation', 'Project: a navigation bar'),
        ],
      },
      {
        id: 'css-4',
        titre: { fr: 'Animations et mobile', en: 'Animations and mobile' },
        icone: 'etincelles',
        lecons: [
          L('css-4-1', 'Réagir au survol', 'Reacting to hover'),
          L('css-4-2', 'Transitions douces', 'Smooth transitions'),
          L('css-4-3', 'Animations avec keyframes', 'Animations with keyframes'),
          L('css-4-4', 'S’adapter au téléphone', 'Adapting to phones'),
        ],
      },
    ],
  },

  /* ==================================================== JAVASCRIPT ======== */
  {
    id: 'javascript',
    nom: 'JavaScript',
    couleur: 'var(--javascript)',
    couleurBrute: '#FFD93D',
    logo: 'javascript',
    ordre: 4,
    resume: {
      fr: 'Ce qui rend une page vivante : boutons qui répondent, jeux, animations.',
      en: 'What makes a page come alive: responsive buttons, games, animations.',
    },
    aboutissement: {
      fr: 'Un quiz interactif, puis un petit jeu qui bouge à l’écran.',
      en: 'An interactive quiz, then a small game moving on screen.',
    },
    modules: [
      {
        id: 'js-1',
        titre: { fr: 'Agir sur la page', en: 'Acting on the page' },
        icone: 'souris',
        lecons: [
          L('js-1-1', 'Écrire dans la console', 'Writing to the console'),
          L('js-1-2', 'Attraper un élément de la page', 'Grabbing an element'),
          L('js-1-3', 'Changer le texte et le style', 'Changing text and style'),
          L('js-1-4', 'Réagir à un clic', 'Reacting to a click'),
        ],
      },
      {
        id: 'js-2',
        titre: { fr: 'Variables et conditions', en: 'Variables and conditions' },
        icone: 'reflechir',
        lecons: [
          L('js-2-1', 'let, const et les types', 'let, const and types'),
          L('js-2-2', 'Comparer et décider', 'Comparing and deciding'),
          L('js-2-3', 'Combiner des conditions', 'Combining conditions'),
          L('js-2-4', 'Projet : le testeur de mot de passe', 'Project: password checker'),
        ],
      },
      {
        id: 'js-3',
        titre: { fr: 'Boucles et fonctions', en: 'Loops and functions' },
        icone: 'boucle',
        lecons: [
          L('js-3-1', 'Répéter avec for', 'Repeating with for'),
          L('js-3-2', 'Les tableaux', 'Arrays'),
          L('js-3-3', 'Créer une fonction', 'Creating a function'),
          L('js-3-4', 'Projet : le quiz interactif', 'Project: interactive quiz'),
        ],
      },
      {
        id: 'js-4',
        titre: { fr: 'Événements et animation', en: 'Events and animation' },
        icone: 'manette',
        lecons: [
          L('js-4-1', 'Le clavier et la souris', 'Keyboard and mouse'),
          L('js-4-2', 'Le temps qui passe : setInterval', 'Time passing: setInterval'),
          L('js-4-3', 'Dessiner sur un canvas', 'Drawing on a canvas'),
          L('js-4-4', 'Faire bouger une balle', 'Making a ball move'),
          L('js-4-5', 'Détecter les collisions', 'Detecting collisions'),
          L('js-4-6', 'Projet : ton premier jeu', 'Project: your first game'),
        ],
      },
    ],
  },

  /* ========================================================= C++ =========== */
  {
    id: 'cpp',
    nom: 'C++',
    couleur: 'var(--cpp)',
    couleurBrute: '#B14BFF',
    logo: 'cpp',
    ordre: 5,
    resume: {
      fr: 'Le langage des jeux vidéo et des programmes rapides. Plus exigeant, plus puissant.',
      en: 'The language of video games and fast programs. More demanding, more powerful.',
    },
    aboutissement: {
      fr: 'Un jeu de devinette en console, avec compteur de coups et score.',
      en: 'A console guessing game, with attempt counter and score.',
    },
    modules: [
      {
        id: 'cpp-1',
        titre: { fr: 'Premier programme', en: 'First program' },
        icone: 'fusee',
        lecons: [
          L('cpp-1-1', 'La structure d’un programme C++', 'The structure of a C++ program'),
          L('cpp-1-2', 'Afficher avec cout', 'Printing with cout'),
          L('cpp-1-3', 'Aller à la ligne', 'Going to a new line'),
          L('cpp-1-4', 'Le point-virgule et les erreurs', 'Semicolons and errors'),
        ],
      },
      {
        id: 'cpp-2',
        titre: { fr: 'Variables, saisie, conditions', en: 'Variables, input, conditions' },
        icone: 'clavier',
        lecons: [
          L('cpp-2-1', 'Déclarer une variable typée', 'Declaring a typed variable'),
          L('cpp-2-2', 'Calculs et priorités', 'Maths and precedence'),
          L('cpp-2-3', 'Lire une saisie avec cin', 'Reading input with cin'),
          L('cpp-2-4', 'La condition if', 'The if condition'),
          L('cpp-2-5', 'else et else if', 'else and else if'),
        ],
      },
      {
        id: 'cpp-3',
        titre: { fr: 'Boucles, tableaux, fonctions', en: 'Loops, arrays, functions' },
        icone: 'calcul',
        lecons: [
          L('cpp-3-1', 'La boucle for', 'The for loop'),
          L('cpp-3-2', 'La boucle while', 'The while loop'),
          L('cpp-3-3', 'Les tableaux', 'Arrays'),
          L('cpp-3-4', 'Écrire une fonction', 'Writing a function'),
          L('cpp-3-5', 'Passer des paramètres', 'Passing parameters'),
          L('cpp-3-6', 'Projet : devine le nombre', 'Project: guess the number'),
        ],
      },
    ],
  },

  /* ================================================ GRAND PROJET ========== */
  {
    id: 'projet',
    nom: 'Grand projet',
    couleur: 'var(--vert)',
    couleurBrute: '#3DFFA8',
    // Ce parcours ne porte pas de logo de langage : il en combine trois.
    logo: 'globe',
    ordre: 6,
    // Il n'est pas un langage : le bac a sable, qui propose un editeur libre
    // par langage, ne doit donc pas le proposer.
    transversal: true,
    resume: {
      fr: 'Le final : ton site personnel, où HTML, CSS et JavaScript tiennent ensemble.',
      en: 'The finale: your personal site, where HTML, CSS and JavaScript come together.',
    },
    aboutissement: {
      fr: 'Un vrai fichier que tu peux envoyer, montrer, ou rendre en classe.',
      en: 'A real file you can send, show, or hand in at school.',
    },
    modules: [
      {
        id: 'projet-1',
        titre: { fr: 'Ton site personnel', en: 'Your personal site' },
        icone: 'trophee',
        lecons: [L('projet-1-1', 'Ton site personnel', 'Your personal site')],
      },
    ],
  },
];

/** Ordre recommande, mis en avant sans jamais rien verrouiller. */
export const ORDRE_RECOMMANDE = ['python', 'html', 'css', 'javascript', 'cpp', 'projet'];

export function parcoursParId(identifiant) {
  return PARCOURS.find((parcours) => parcours.id === identifiant) || null;
}

/** Les parcours qui enseignent un langage — le grand projet final n'en est pas un. */
export function parcoursDeLangage() {
  return PARCOURS.filter((parcours) => !parcours.transversal);
}

export function moduleParId(identifiant) {
  for (const parcours of PARCOURS) {
    const trouve = parcours.modules.find((module) => module.id === identifiant);
    if (trouve) return { parcours, module: trouve };
  }
  return null;
}

/** Toutes les fiches de lecons d'un parcours, dans l'ordre. */
export function leconsDuParcours(identifiant) {
  const parcours = parcoursParId(identifiant);
  if (!parcours) return [];
  return parcours.modules.flatMap((module) => module.lecons);
}

/** Retrouve une fiche de lecon et son contexte, ou null. */
export function situerLecon(identifiantLecon) {
  for (const parcours of PARCOURS) {
    for (const module of parcours.modules) {
      const index = module.lecons.findIndex((lecon) => lecon.id === identifiantLecon);
      if (index >= 0) return { parcours, module, fiche: module.lecons[index], index };
    }
  }
  return null;
}

/** Fiche de la lecon suivante dans le meme parcours, ou null si c'est la derniere. */
export function leconSuivante(identifiantLecon) {
  const situation = situerLecon(identifiantLecon);
  if (!situation) return null;
  const toutes = leconsDuParcours(situation.parcours.id);
  const position = toutes.findIndex((lecon) => lecon.id === identifiantLecon);
  return toutes[position + 1] || null;
}

export function nombreLecons(identifiant) {
  return leconsDuParcours(identifiant).length;
}

export function nombreLeconsTotal() {
  return PARCOURS.reduce((somme, parcours) => somme + nombreLecons(parcours.id), 0);
}
