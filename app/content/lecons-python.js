/**
 * Parcours Python — contenu des lecons.
 * Voir `_schema.md` pour la description d'une lecon.
 */

export const LECONS_PYTHON = {
  /* ===================================================== Module 1 ========= */

  'py-1-1': {
    langage: 'python',
    xp: 20,
    objectif: {
      fr: 'Faire afficher un message par l’ordinateur.',
      en: 'Make the computer display a message.',
    },
    explication: {
      fr: `
        <p>Programmer, c’est <strong>donner des ordres</strong> à l’ordinateur. Il ne devine
        rien : il fait exactement ce que tu écris, ni plus, ni moins.</p>
        <p>Le tout premier ordre à connaître est <code>print</code>. Il veut dire
        « affiche ceci ». Ce qu’on veut afficher se met entre parenthèses, et le texte
        se met entre guillemets :</p>
        <p><code>print("Bonjour")</code></p>
        <p>Les guillemets servent à dire à Python : « ceci est du texte, ne cherche pas à
        le comprendre, contente-toi de l’afficher ».</p>
      `,
      en: `
        <p>Programming means <strong>giving orders</strong> to the computer. It guesses
        nothing: it does exactly what you write, no more, no less.</p>
        <p>The very first order to learn is <code>print</code>. It means "display this".
        What you want to display goes inside the brackets, and text goes inside quotes:</p>
        <p><code>print("Hello")</code></p>
        <p>The quotes tell Python: "this is text, do not try to understand it, just show
        it".</p>
      `,
    },
    exemple: {
      code: 'print("Bonjour !")',
      note: {
        fr: 'Clique sur « Essayer cet exemple » : le message apparaît dans la console à droite.',
        en: 'Click "Try this example": the message appears in the console on the right.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>À toi. Fais afficher exactement : <code>Salut le monde !</code></p><p>Attention aux majuscules et au point d’exclamation : l’ordinateur ne pardonne rien.</p>',
        en: '<p>Your turn. Display exactly: <code>Hello world!</code></p><p>Watch the capital letters and the exclamation mark: the computer forgives nothing.</p>',
      },
      depart: '# Écris ton programme ici\n',
      verifications: [{ type: 'sortieEgale', valeur: { fr: 'Salut le monde !', en: 'Hello world!' } }],
      indices: [
        {
          fr: 'Utilise <code>print</code>, suivi de parenthèses.',
          en: 'Use <code>print</code>, followed by brackets.',
        },
        {
          fr: 'Le texte doit être entre guillemets : <code>print("…")</code>',
          en: 'The text must be inside quotes: <code>print("…")</code>',
        },
        {
          fr: 'Recopie exactement le message demandé, espace et point d’exclamation compris.',
          en: 'Copy the requested message exactly, including the space and exclamation mark.',
        },
      ],
      solution: 'print("Salut le monde !")',
    },
  },

  'py-1-2': {
    langage: 'python',
    xp: 20,
    objectif: {
      fr: 'Enchaîner plusieurs instructions, dans l’ordre.',
      en: 'Chain several instructions, in order.',
    },
    explication: {
      fr: `
        <p>Un programme se lit <strong>de haut en bas</strong>, comme une recette de
        cuisine. Chaque ligne est exécutée l’une après l’autre, dans l’ordre où tu les as
        écrites.</p>
        <p>Si tu écris trois <code>print</code> l’un sous l’autre, tu obtiens trois lignes
        affichées, dans le même ordre.</p>
        <p>C’est une idée simple mais essentielle : <strong>l’ordre compte</strong>.
        Interverti deux lignes, et le résultat change.</p>
      `,
      en: `
        <p>A program is read <strong>from top to bottom</strong>, like a cooking recipe.
        Each line runs one after the other, in the order you wrote them.</p>
        <p>Write three <code>print</code> statements one under the other and you get three
        displayed lines, in the same order.</p>
        <p>Simple but essential: <strong>order matters</strong>. Swap two lines and the
        result changes.</p>
      `,
    },
    exemple: {
      code: 'print("Je prépare la pâte")\nprint("J’ajoute le chocolat")\nprint("J’enfourne")',
      note: {
        fr: 'Trois ordres, trois lignes, dans l’ordre exact où ils sont écrits.',
        en: 'Three orders, three lines, in the exact order they are written.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris un programme qui affiche ces trois lignes, dans cet ordre :</p><pre>Je m’appelle Théo\nJ’ai 12 ans\nJ’apprends à coder</pre>',
        en: '<p>Write a program that displays these three lines, in this order:</p><pre>My name is Theo\nI am 12\nI am learning to code</pre>',
      },
      depart: '',
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        {
          type: 'sortieEgale',
          valeur: {
            fr: 'Je m’appelle Théo\nJ’ai 12 ans\nJ’apprends à coder',
            en: 'My name is Theo\nI am 12\nI am learning to code',
          },
        },
      ],
      indices: [
        { fr: 'Il te faut trois lignes, donc trois <code>print</code>.', en: 'You need three lines, so three <code>print</code> statements.' },
        { fr: 'Écris-les l’un sous l’autre, sans rien entre.', en: 'Write them one under the other, with nothing in between.' },
        {
          fr: 'Vérifie l’ordre : le prénom, puis l’âge, puis la dernière phrase.',
          en: 'Check the order: the name, then the age, then the last sentence.',
        },
      ],
      solution: 'print("Je m’appelle Théo")\nprint("J’ai 12 ans")\nprint("J’apprends à coder")',
    },
  },

  'py-1-3': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Lire un message d’erreur et s’en servir pour corriger.',
      en: 'Read an error message and use it to fix your code.',
    },
    explication: {
      fr: `
        <p>Tu vas faire des erreurs. <strong>Tout le monde en fait</strong>, y compris les
        développeurs professionnels, toute la journée. Ce n’est pas grave : c’est même
        comme ça qu’on apprend.</p>
        <p>Quand Python ne comprend pas, il ne se moque pas : il t’explique. Il affiche
        le <strong>numéro de la ligne</strong> qui pose problème et le <strong>type
        d’erreur</strong>.</p>
        <ul>
          <li><code>SyntaxError</code> : la phrase est mal écrite (guillemet ou parenthèse oublié).</li>
          <li><code>NameError</code> : tu utilises un mot que Python ne connaît pas.</li>
        </ul>
        <p>Le réflexe à prendre : <strong>lis la dernière ligne de l’erreur</strong>. Elle
        dit presque toujours ce qui ne va pas.</p>
      `,
      en: `
        <p>You will make mistakes. <strong>Everyone does</strong>, including professional
        developers, all day long. That is fine: it is how you learn.</p>
        <p>When Python does not understand, it does not mock you: it explains. It shows the
        <strong>line number</strong> causing the problem and the <strong>type of
        error</strong>.</p>
        <ul>
          <li><code>SyntaxError</code>: the sentence is badly written (a missing quote or bracket).</li>
          <li><code>NameError</code>: you used a word Python does not know.</li>
        </ul>
        <p>The habit to build: <strong>read the last line of the error</strong>. It almost
        always says what is wrong.</p>
      `,
    },
    exemple: {
      code: 'print("Il manque un guillemet)',
      note: {
        fr: 'Essaie cet exemple : il est volontairement faux. Lis l’erreur, puis corrige-la.',
        en: 'Try this example: it is deliberately broken. Read the error, then fix it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le programme ci-contre contient <strong>trois erreurs</strong>. Répare-les pour qu’il affiche :</p><pre>Bonjour\nÇa marche !</pre>',
        en: '<p>The program contains <strong>three mistakes</strong>. Fix them so it displays:</p><pre>Hello\nIt works!</pre>',
      },
      depart: 'print("Bonjour"\nPrint("Ça marche !)\n',
      verifications: [
        {
          type: 'sortieEgale',
          valeur: { fr: 'Bonjour\nÇa marche !', en: 'Hello\nIt works!' },
        },
      ],
      indices: [
        {
          fr: 'Ligne 1 : compte les parenthèses. Une qui s’ouvre doit se refermer.',
          en: 'Line 1: count the brackets. One that opens must close.',
        },
        {
          fr: 'Ligne 2 : Python distingue les majuscules. <code>Print</code> et <code>print</code> ne sont pas la même chose.',
          en: 'Line 2: Python is case-sensitive. <code>Print</code> and <code>print</code> are not the same.',
        },
        {
          fr: 'Ligne 2 encore : le texte commence par un guillemet… et doit aussi se terminer par un guillemet.',
          en: 'Line 2 again: the text starts with a quote… and must also end with one.',
        },
      ],
      solution: 'print("Bonjour")\nprint("Ça marche !")',
    },
  },

  'py-1-4': {
    langage: 'python',
    xp: 20,
    objectif: {
      fr: 'Écrire des notes dans son code, pour soi et pour les autres.',
      en: 'Write notes in your code, for yourself and for others.',
    },
    explication: {
      fr: `
        <p>Un <strong>commentaire</strong> est une note que tu écris pour un humain, et que
        Python ignore complètement. Il commence par un dièse <code>#</code>.</p>
        <p><code># ceci n’est pas exécuté</code></p>
        <p>À quoi ça sert ? À expliquer <em>pourquoi</em> tu fais quelque chose. Dans deux
        mois, quand tu reliras ton code, tu seras content de l’avoir fait — le
        « toi du futur » ne se souviendra de rien.</p>
        <p>Astuce pratique : mettre un <code>#</code> devant une ligne permet aussi de la
        <strong>désactiver temporairement</strong> sans l’effacer.</p>
      `,
      en: `
        <p>A <strong>comment</strong> is a note you write for a human, and Python ignores it
        completely. It starts with a hash <code>#</code>.</p>
        <p><code># this is not executed</code></p>
        <p>What is it for? Explaining <em>why</em> you do something. In two months, when you
        read your code again, you will be glad you wrote them — future you remembers
        nothing.</p>
        <p>Handy trick: putting a <code>#</code> in front of a line also lets you
        <strong>disable it temporarily</strong> without deleting it.</p>
      `,
    },
    exemple: {
      code: '# Ce programme salue le joueur\nprint("Bienvenue dans le jeu")\n\n# print("Cette ligne est désactivée")',
      note: {
        fr: 'Seule la ligne sans dièse s’exécute.',
        en: 'Only the line without a hash runs.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris un programme qui :</p><ul><li>commence par un commentaire expliquant ce qu’il fait ;</li><li>affiche <code>Mon premier programme commenté</code>.</li></ul>',
        en: '<p>Write a program that:</p><ul><li>starts with a comment explaining what it does;</li><li>displays <code>My first commented program</code>.</li></ul>',
      },
      depart: '',
      verifications: [
        {
          type: 'codeContient',
          motif: '^\\s*#.+',
          options: 'm',
          message: {
            fr: 'Il manque un commentaire : une ligne qui commence par #.',
            en: 'A comment is missing: a line starting with #.',
          },
        },
        {
          type: 'sortieEgale',
          valeur: { fr: 'Mon premier programme commenté', en: 'My first commented program' },
        },
      ],
      indices: [
        { fr: 'Un commentaire commence par <code>#</code>.', en: 'A comment starts with <code>#</code>.' },
        {
          fr: 'Mets le commentaire sur la première ligne, et le <code>print</code> en dessous.',
          en: 'Put the comment on the first line, and the <code>print</code> below.',
        },
        {
          fr: 'Le commentaire ne doit rien afficher : seul le <code>print</code> produit du texte.',
          en: 'The comment displays nothing: only the <code>print</code> produces text.',
        },
      ],
      solution: '# Ce programme affiche un message\nprint("Mon premier programme commenté")',
    },
  },
};
