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
      // Cet exemple doit planter : c'est tout l'objet de la lecon.
      erreurAttendue: true,
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

  /* ===================================================== Module 2 ========= */

  'py-2-1': {
    langage: 'python',
    xp: 20,
    objectif: {
      fr: 'Ranger une information dans une variable pour la réutiliser.',
      en: 'Store a piece of information in a variable to reuse it.',
    },
    explication: {
      fr: `
        <p>Une <strong>variable</strong>, c’est une boîte avec une étiquette. Tu ranges quelque
        chose dedans, tu écris un nom sur l’étiquette, et ensuite tu peux redemander le contenu
        rien qu’en donnant ce nom.</p>
        <p>En Python, on range avec le signe <code>=</code> :</p>
        <p><code>age = 12</code></p>
        <p>Cela se lit « age reçoit 12 ». Ce n’est pas l’égalité des mathématiques : c’est un
        rangement. Ensuite, écrire <code>age</code> revient à écrire <code>12</code>.</p>
        <p>Le nom de la boîte est libre, mais il doit être <strong>parlant</strong> :
        <code>age</code> plutôt que <code>a</code>. Ton « toi du futur » te remerciera.</p>
      `,
      en: `
        <p>A <strong>variable</strong> is a labelled box. You put something inside, you write a
        name on the label, and later you ask for the contents just by giving that name.</p>
        <p>In Python you store with the <code>=</code> sign:</p>
        <p><code>age = 12</code></p>
        <p>Read it as "age receives 12". This is not the equals sign of maths: it is a storage
        operation. Afterwards, writing <code>age</code> is the same as writing <code>12</code>.</p>
        <p>The name is up to you, but make it <strong>meaningful</strong>: <code>age</code>
        rather than <code>a</code>. Future you will be grateful.</p>
      `,
    },
    exemple: {
      code: 'prenom = "Théo"\nage = 12\n\nprint(prenom)\nprint(age)',
      note: {
        fr: 'Le texte prend des guillemets, les nombres n’en prennent pas.',
        en: 'Text needs quotes, numbers do not.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée une variable <code>ville</code> qui contient <code>Paris</code>, puis affiche-la.</p><p>Le programme doit afficher exactement : <code>Paris</code></p>',
        en: '<p>Create a variable <code>ville</code> holding <code>Paris</code>, then display it.</p><p>The program must display exactly: <code>Paris</code></p>',
      },
      depart: '# Range Paris dans une variable appelée ville\n\n# Puis affiche cette variable\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\bville\\s*=',
          message: {
            fr: 'Il faut créer une variable qui s’appelle exactement « ville ».',
            en: 'You need a variable named exactly "ville".',
          },
        },
        {
          type: 'codeContient',
          motif: 'print\\s*\\(\\s*ville\\s*\\)',
          message: {
            fr: 'Affiche la variable et non le texte : écris print(ville), sans guillemets.',
            en: 'Display the variable, not the text: write print(ville), without quotes.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'Paris', en: 'Paris' } },
      ],
      indices: [
        { fr: 'Écris <code>ville = "Paris"</code> sur une ligne.', en: 'Write <code>ville = "Paris"</code> on one line.' },
        { fr: 'N’oublie pas les guillemets autour de Paris : c’est du texte.', en: 'Do not forget the quotes around Paris: it is text.' },
        {
          fr: 'Puis, en dessous, <code>print(ville)</code> — sans guillemets cette fois, sinon tu affiches le mot « ville ».',
          en: 'Then, below, <code>print(ville)</code> — no quotes this time, otherwise you display the word "ville".',
        },
      ],
      solution: 'ville = "Paris"\nprint(ville)',
    },
  },

  'py-2-2': {
    langage: 'python',
    xp: 20,
    objectif: {
      fr: 'Faire calculer l’ordinateur, et ranger le résultat.',
      en: 'Make the computer calculate, and store the result.',
    },
    explication: {
      fr: `
        <p>Python est une excellente calculatrice. Les opérations s’écrivent presque comme en
        maths :</p>
        <ul>
          <li><code>+</code> addition, <code>-</code> soustraction</li>
          <li><code>*</code> multiplication (l’étoile, pas le ×)</li>
          <li><code>/</code> division</li>
          <li><code>**</code> puissance : <code>2 ** 3</code> vaut 8</li>
        </ul>
        <p>Le résultat d’un calcul peut se ranger dans une variable :</p>
        <p><code>total = 4 * 25</code></p>
        <p>Python calcule d’abord la partie à droite du <code>=</code>, puis range le résultat.
        Donc <code>total</code> contient 100, pas le texte « 4 * 25 ».</p>
        <p>Et on peut calculer <em>avec</em> des variables : <code>prix * quantite</code>.</p>
      `,
      en: `
        <p>Python is an excellent calculator. Operations are written almost as in maths:</p>
        <ul>
          <li><code>+</code> addition, <code>-</code> subtraction</li>
          <li><code>*</code> multiplication (the star, not ×)</li>
          <li><code>/</code> division</li>
          <li><code>**</code> power: <code>2 ** 3</code> is 8</li>
        </ul>
        <p>The result of a calculation can go into a variable:</p>
        <p><code>total = 4 * 25</code></p>
        <p>Python first works out the right-hand side, then stores the result. So
        <code>total</code> holds 100, not the text "4 * 25".</p>
        <p>You can also calculate <em>with</em> variables: <code>prix * quantite</code>.</p>
      `,
    },
    exemple: {
      code: 'prix = 3\nquantite = 7\ntotal = prix * quantite\n\nprint(total)',
      note: {
        fr: 'Change les nombres et relance : le total suit tout seul.',
        en: 'Change the numbers and run again: the total follows automatically.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Un cinéma vend des places à 9 € et il en a vendu 14.</p><ul><li>Crée <code>prix</code> qui vaut 9, et <code>places</code> qui vaut 14.</li><li>Calcule la recette dans une variable <code>recette</code>.</li><li>Affiche <code>recette</code>.</li></ul>',
        en: '<p>A cinema sells tickets at 9 € and sold 14 of them.</p><ul><li>Create <code>prix</code> = 9 and <code>places</code> = 14.</li><li>Work out the takings into a variable <code>recette</code>.</li><li>Display <code>recette</code>.</li></ul>',
      },
      depart: 'prix = 9\nplaces = 14\n\n# Calcule la recette, puis affiche-la\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'recette\\s*=\\s*[^\\n]*(prix|places)',
          message: {
            fr: 'Calcule la recette à partir des variables prix et places, pas en écrivant 126 directement.',
            en: 'Work out the takings from the variables prix and places, not by writing 126 directly.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '126', en: '126' } },
      ],
      indices: [
        { fr: 'La recette, c’est le prix multiplié par le nombre de places.', en: 'The takings are the price multiplied by the number of tickets.' },
        { fr: 'En Python, multiplier s’écrit avec une étoile : <code>prix * places</code>.', en: 'In Python, multiply is written with a star: <code>prix * places</code>.' },
        { fr: 'Range le calcul : <code>recette = prix * places</code>, puis <code>print(recette)</code>.', en: 'Store the calculation: <code>recette = prix * places</code>, then <code>print(recette)</code>.' },
      ],
      solution: 'prix = 9\nplaces = 14\nrecette = prix * places\nprint(recette)',
    },
  },

  'py-2-3': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Assembler du texte et des valeurs dans une même phrase.',
      en: 'Combine text and values into a single sentence.',
    },
    explication: {
      fr: `
        <p>Afficher <code>126</code> tout seul, ce n’est pas très parlant. On aimerait écrire
        « La recette est de 126 euros ».</p>
        <p>La façon la plus simple en Python s’appelle le <strong>f-string</strong>. On met un
        <code>f</code> juste avant le guillemet ouvrant, et on glisse les variables entre
        accolades :</p>
        <p><code>print(f"La recette est de {recette} euros")</code></p>
        <p>Python remplace <code>{recette}</code> par le contenu de la boîte. Tout le reste
        s’affiche tel quel.</p>
        <p>On peut même faire un calcul dans les accolades :
        <code>f"Dans 5 ans tu auras {age + 5} ans"</code>.</p>
        <p><strong>Le piège classique :</strong> oublier le <code>f</code>. Sans lui, Python
        affiche les accolades telles quelles.</p>
      `,
      en: `
        <p>Displaying <code>126</code> on its own is not very clear. We would rather write
        "The takings are 126 euros".</p>
        <p>The simplest way in Python is called an <strong>f-string</strong>. Put an
        <code>f</code> just before the opening quote, and drop variables inside braces:</p>
        <p><code>print(f"The takings are {recette} euros")</code></p>
        <p>Python replaces <code>{recette}</code> with the contents of the box. Everything else
        is displayed as is.</p>
        <p>You can even calculate inside the braces:
        <code>f"In 5 years you will be {age + 5}"</code>.</p>
        <p><strong>The classic trap:</strong> forgetting the <code>f</code>. Without it, Python
        prints the braces literally.</p>
      `,
    },
    exemple: {
      code: 'prenom = "Théo"\nage = 12\n\nprint(f"Salut {prenom} !")\nprint(f"Dans 5 ans, tu auras {age + 5} ans.")',
      note: {
        fr: 'Enlève le f de la première ligne et relance : tu verras le piège.',
        en: 'Remove the f on the first line and run again: you will see the trap.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>À partir des variables données, affiche exactement cette phrase :</p><pre>Marie a 14 ans et habite à Lyon.</pre><p>Utilise un f-string : la phrase doit se construire à partir des variables.</p>',
        en: '<p>Using the given variables, display exactly this sentence:</p><pre>Marie a 14 ans et habite à Lyon.</pre><p>Use an f-string: the sentence must be built from the variables.</p>',
      },
      depart: 'prenom = "Marie"\nage = 14\nville = "Lyon"\n\n# Construis la phrase avec un f-string\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'f["\']',
          message: {
            fr: 'Utilise un f-string : un f collé juste avant le guillemet ouvrant.',
            en: 'Use an f-string: an f right before the opening quote.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\{\\s*prenom\\s*\\}',
          message: {
            fr: 'La phrase doit utiliser la variable prenom entre accolades, pas le mot écrit en dur.',
            en: 'The sentence must use the variable prenom in braces, not the word typed directly.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'Marie a 14 ans et habite à Lyon.', en: 'Marie a 14 ans et habite à Lyon.' } },
      ],
      indices: [
        { fr: 'Commence par <code>print(f"</code> — le f est juste avant le guillemet.', en: 'Start with <code>print(f"</code> — the f goes right before the quote.' },
        { fr: 'Mets chaque variable entre accolades : <code>{prenom}</code>, <code>{age}</code>, <code>{ville}</code>.', en: 'Put each variable in braces: <code>{prenom}</code>, <code>{age}</code>, <code>{ville}</code>.' },
        { fr: 'N’oublie pas le point final, et l’espace après « habite à ».', en: 'Do not forget the full stop, and the space after "habite à".' },
      ],
      solution: 'prenom = "Marie"\nage = 14\nville = "Lyon"\nprint(f"{prenom} a {age} ans et habite à {ville}.")',
    },
  },

  'py-2-4': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Demander une information à celui qui utilise le programme.',
      en: 'Ask the person using the program for information.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici ton programme parlait tout seul. <code>input()</code> lui permet de
        <strong>poser une question et d’attendre la réponse</strong> :</p>
        <p><code>prenom = input("Comment tu t’appelles ? ")</code></p>
        <p>Le programme s’arrête, affiche la question, et attend que tu tapes quelque chose puis
        que tu valides. Ta réponse est rangée dans <code>prenom</code>.</p>
        <p><strong>Point important :</strong> <code>input()</code> rend toujours du
        <strong>texte</strong>, même si tu tapes un nombre. Pour calculer avec, il faut le
        convertir avec <code>int()</code> :</p>
        <p><code>age = int(input("Ton âge ? "))</code></p>
        <p>Sans <code>int()</code>, <code>age + 1</code> provoquerait une erreur : Python ne sait
        pas additionner du texte et un nombre.</p>
      `,
      en: `
        <p>So far your program talked on its own. <code>input()</code> lets it
        <strong>ask a question and wait for the answer</strong>:</p>
        <p><code>prenom = input("What is your name? ")</code></p>
        <p>The program pauses, shows the question, and waits for you to type something and press
        enter. Your answer is stored in <code>prenom</code>.</p>
        <p><strong>Important:</strong> <code>input()</code> always gives back
        <strong>text</strong>, even when you type a number. To calculate with it, convert it
        using <code>int()</code>:</p>
        <p><code>age = int(input("Your age? "))</code></p>
        <p>Without <code>int()</code>, <code>age + 1</code> would raise an error: Python cannot
        add text and a number.</p>
      `,
    },
    exemple: {
      code: 'prenom = input("Comment tu t\'appelles ? ")\nprint(f"Enchanté {prenom} !")',
      note: {
        fr: 'Un champ apparaît dans la console : tape ton prénom puis valide.',
        en: 'A field appears in the console: type your name and press enter.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Demande son âge à l’utilisateur, puis annonce l’âge qu’il aura dans 10 ans.</p><p>Si l’on répond <code>12</code>, le programme doit afficher :</p><pre>Dans 10 ans, tu auras 22 ans.</pre>',
        en: '<p>Ask the user for their age, then announce how old they will be in 10 years.</p><p>If the answer is <code>12</code>, the program must display:</p><pre>Dans 10 ans, tu auras 22 ans.</pre>',
      },
      depart: '# Demande l\'âge, convertis-le en nombre, puis affiche la phrase\n',
      entree: '12',
      verifications: [
        {
          type: 'codeContient',
          motif: 'input\\s*\\(',
          message: { fr: 'Il faut utiliser input() pour poser la question.', en: 'You must use input() to ask the question.' },
        },
        {
          type: 'codeContient',
          motif: 'int\\s*\\(',
          message: {
            fr: 'input() rend du texte : convertis-le en nombre avec int() pour pouvoir ajouter 10.',
            en: 'input() gives back text: convert it with int() so you can add 10.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Dans 10 ans, tu auras 22 ans.', en: 'Dans 10 ans, tu auras 22 ans.' } },
      ],
      indices: [
        { fr: 'Range la réponse : <code>age = int(input("Ton âge ? "))</code>.', en: 'Store the answer: <code>age = int(input("Your age? "))</code>.' },
        { fr: 'Le int() entoure tout le input(), avec deux parenthèses fermantes à la fin.', en: 'The int() wraps the whole input(), with two closing brackets at the end.' },
        { fr: 'Puis un f-string : <code>print(f"Dans 10 ans, tu auras {age + 10} ans.")</code>', en: 'Then an f-string: <code>print(f"Dans 10 ans, tu auras {age + 10} ans.")</code>' },
      ],
      solution: 'age = int(input("Ton âge ? "))\nprint(f"Dans 10 ans, tu auras {age + 10} ans.")',
    },
  },

  'py-2-5': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Réunir variables, calculs et saisie dans un vrai petit programme.',
      en: 'Bring variables, maths and input together in a real little program.',
    },
    explication: {
      fr: `
        <p>Tu sais maintenant tout ce qu’il faut pour écrire une <strong>calculatrice</strong>
        qui demande deux nombres et affiche leur somme.</p>
        <p>La recette est toujours la même, et c’est celle de presque tous les programmes :</p>
        <ol>
          <li><strong>Demander</strong> les informations (<code>input</code>) ;</li>
          <li><strong>Calculer</strong> ;</li>
          <li><strong>Afficher</strong> le résultat (<code>print</code>).</li>
        </ol>
        <p>N’oublie pas <code>int()</code> autour de chaque <code>input()</code> : sans lui,
        <code>"3" + "4"</code> donnerait <code>"34"</code> — Python collerait les deux textes au
        lieu d’additionner.</p>
      `,
      en: `
        <p>You now know everything needed to write a <strong>calculator</strong> that asks for
        two numbers and shows their sum.</p>
        <p>The recipe is always the same, and it is the recipe of almost every program:</p>
        <ol>
          <li><strong>Ask</strong> for the information (<code>input</code>);</li>
          <li><strong>Calculate</strong>;</li>
          <li><strong>Display</strong> the result (<code>print</code>).</li>
        </ol>
        <p>Do not forget <code>int()</code> around each <code>input()</code>: without it,
        <code>"3" + "4"</code> would give <code>"34"</code> — Python would glue the two texts
        together instead of adding.</p>
      `,
    },
    exemple: {
      code: 'a = int(input("Premier nombre : "))\nb = int(input("Deuxième nombre : "))\nprint(f"{a} + {b} = {a + b}")',
      note: {
        fr: 'Une addition. À toi de faire les quatre opérations.',
        en: 'One addition. Your turn to do all four operations.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une calculatrice qui demande deux nombres et affiche les <strong>quatre</strong> opérations, une par ligne.</p><p>Avec <code>8</code> puis <code>2</code>, elle doit afficher :</p><pre>8 + 2 = 10\n8 - 2 = 6\n8 * 2 = 16\n8 / 2 = 4.0</pre><p>Le <code>4.0</code> est normal : une division donne toujours un nombre à virgule en Python.</p>',
        en: '<p>Write a calculator that asks for two numbers and shows all <strong>four</strong> operations, one per line.</p><p>With <code>8</code> then <code>2</code>, it must display:</p><pre>8 + 2 = 10\n8 - 2 = 6\n8 * 2 = 16\n8 / 2 = 4.0</pre><p>The <code>4.0</code> is expected: a division always gives a decimal number in Python.</p>',
      },
      depart: 'a = int(input("Premier nombre : "))\nb = int(input("Deuxième nombre : "))\n\n# Affiche les quatre opérations, une par ligne\n',
      entree: '8\n2',
      verifications: [
        { type: 'sortieContient', valeur: { fr: '8 + 2 = 10', en: '8 + 2 = 10' } },
        { type: 'sortieContient', valeur: { fr: '8 - 2 = 6', en: '8 - 2 = 6' } },
        { type: 'sortieContient', valeur: { fr: '8 * 2 = 16', en: '8 * 2 = 16' } },
        { type: 'sortieContient', valeur: { fr: '8 / 2 = 4.0', en: '8 / 2 = 4.0' } },
        {
          type: 'codeContient',
          motif: '\\{\\s*a\\s*[-+*/]\\s*b\\s*\\}',
          message: {
            fr: 'Fais calculer Python à partir de a et b, plutôt que d’écrire les résultats à la main.',
            en: 'Let Python calculate from a and b, rather than typing the results by hand.',
          },
        },
      ],
      indices: [
        { fr: 'Quatre lignes <code>print</code>, une par opération.', en: 'Four <code>print</code> lines, one per operation.' },
        { fr: 'La première : <code>print(f"{a} + {b} = {a + b}")</code>.', en: 'The first one: <code>print(f"{a} + {b} = {a + b}")</code>.' },
        { fr: 'Les trois autres sont identiques, en changeant le signe : <code>-</code>, <code>*</code>, <code>/</code>.', en: 'The other three are identical, just change the sign: <code>-</code>, <code>*</code>, <code>/</code>.' },
      ],
      solution:
        'a = int(input("Premier nombre : "))\nb = int(input("Deuxième nombre : "))\n\nprint(f"{a} + {b} = {a + b}")\nprint(f"{a} - {b} = {a - b}")\nprint(f"{a} * {b} = {a * b}")\nprint(f"{a} / {b} = {a / b}")',
    },
    projet: { titre: { fr: 'Ma calculatrice', en: 'My calculator' } },
  },

  /* ===================================================== Module 3 ========= */

  'py-3-1': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Faire réagir le programme différemment selon la situation.',
      en: 'Make the program react differently depending on the situation.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici, ton programme faisait toujours la même chose. Avec <code>if</code>
        (« si » en anglais), il peut <strong>choisir</strong>.</p>
        <p><code>if age >= 18:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Tu es majeur")</code></p>
        <p>Deux détails <strong>obligatoires</strong> en Python :</p>
        <ul>
          <li>les <strong>deux points</strong> <code>:</code> à la fin de la ligne du if ;</li>
          <li>l’<strong>indentation</strong> : la ligne suivante est décalée de 4 espaces. C’est
          ce décalage qui dit à Python « ceci est à l’intérieur du si ».</li>
        </ul>
        <p>Pour comparer, on utilise : <code>==</code> (égal à), <code>!=</code> (différent de),
        <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</p>
        <p><strong>Attention :</strong> <code>=</code> range une valeur, <code>==</code> compare.
        C’est l’erreur numéro un des débutants.</p>
      `,
      en: `
        <p>Until now your program always did the same thing. With <code>if</code>, it can
        <strong>choose</strong>.</p>
        <p><code>if age >= 18:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("You are an adult")</code></p>
        <p>Two <strong>compulsory</strong> details in Python:</p>
        <ul>
          <li>the <strong>colon</strong> <code>:</code> at the end of the if line;</li>
          <li>the <strong>indentation</strong>: the next line is shifted by 4 spaces. That shift
          is what tells Python "this is inside the if".</li>
        </ul>
        <p>To compare, use: <code>==</code> (equal to), <code>!=</code> (different from),
        <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</p>
        <p><strong>Careful:</strong> <code>=</code> stores a value, <code>==</code> compares.
        This is beginners' mistake number one.</p>
      `,
    },
    exemple: {
      code: 'note = 15\n\nif note >= 10:\n    print("Reçu !")\n\nprint("Fin du programme")',
      note: {
        fr: 'Change la note pour 7 et relance : la première ligne disparaît, la seconde reste — elle n’est pas indentée.',
        en: 'Change the mark to 7 and run again: the first line disappears, the second stays — it is not indented.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Un manège est interdit en dessous de 1,40 m.</p><p>La taille est déjà dans la variable <code>taille</code>. Si elle vaut au moins <code>140</code>, affiche <code>Tu peux monter !</code></p><p>Ne change pas la valeur de <code>taille</code>.</p>',
        en: '<p>A fairground ride is forbidden below 1.40 m.</p><p>The height is already in the variable <code>taille</code>. If it is at least <code>140</code>, display <code>Tu peux monter !</code></p><p>Do not change the value of <code>taille</code>.</p>',
      },
      depart: 'taille = 152\n\n# Écris ta condition ici\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'if\\s+taille\\s*>=?\\s*1[34]\\d',
          message: {
            fr: 'Il faut un if qui compare taille à 140.',
            en: 'You need an if comparing taille with 140.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'Tu peux monter !', en: 'Tu peux monter !' } },
      ],
      indices: [
        { fr: 'Commence par <code>if taille >= 140:</code> — n’oublie pas les deux points.', en: 'Start with <code>if taille >= 140:</code> — do not forget the colon.' },
        { fr: 'La ligne suivante doit être décalée de 4 espaces vers la droite.', en: 'The next line must be shifted 4 spaces to the right.' },
        { fr: 'Cette ligne décalée contient <code>print("Tu peux monter !")</code>.', en: 'That indented line contains <code>print("Tu peux monter !")</code>.' },
      ],
      solution: 'taille = 152\n\nif taille >= 140:\n    print("Tu peux monter !")',
    },
  },

  'py-3-2': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Prévoir tous les cas, y compris ceux qui ne remplissent pas la condition.',
      en: 'Cover every case, including those that fail the condition.',
    },
    explication: {
      fr: `
        <p>Un <code>if</code> tout seul ne dit rien quand la condition est fausse. Pour traiter
        l’autre cas, on ajoute <code>else</code> (« sinon ») :</p>
        <pre>if note >= 10:
    print("Reçu")
else:
    print("À retravailler")</pre>
        <p>Et quand il y a plus de deux cas, on intercale des <code>elif</code>
        (contraction de « else if », donc « sinon si ») :</p>
        <pre>if note >= 16:
    print("Très bien")
elif note >= 12:
    print("Bien")
else:
    print("Continue tes efforts")</pre>
        <p>Python descend dans l’ordre et <strong>s’arrête au premier cas vrai</strong>. C’est
        pour cela qu’on écrit les conditions de la plus exigeante à la plus large : si
        <code>note >= 12</code> était en premier, un 18 tomberait dedans et n’atteindrait jamais
        « Très bien ».</p>
      `,
      en: `
        <p>An <code>if</code> on its own says nothing when the condition is false. To handle the
        other case, add <code>else</code>:</p>
        <pre>if note >= 10:
    print("Pass")
else:
    print("Needs more work")</pre>
        <p>When there are more than two cases, insert <code>elif</code> (short for "else if"):</p>
        <pre>if note >= 16:
    print("Excellent")
elif note >= 12:
    print("Good")
else:
    print("Keep going")</pre>
        <p>Python goes down in order and <strong>stops at the first true case</strong>. That is
        why conditions go from the strictest to the widest: if <code>note >= 12</code> came
        first, an 18 would fall into it and never reach "Excellent".</p>
      `,
    },
    exemple: {
      code: 'age = 12\n\nif age >= 18:\n    print("Majeur")\nelse:\n    print("Mineur")',
      note: {
        fr: 'Un seul des deux messages s’affiche, jamais les deux.',
        en: 'Only one of the two messages appears, never both.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris un programme qui, à partir de la variable <code>note</code>, affiche :</p><ul><li><code>Très bien</code> si la note est de 16 ou plus ;</li><li><code>Bien</code> si elle est de 12 à 15 ;</li><li><code>Passable</code> si elle est de 10 à 11 ;</li><li><code>Insuffisant</code> en dessous de 10.</li></ul><p>Avec la note donnée (<code>13</code>), il doit afficher <code>Bien</code>.</p>',
        en: '<p>Write a program that, from the variable <code>note</code>, displays:</p><ul><li><code>Très bien</code> for 16 or more;</li><li><code>Bien</code> for 12 to 15;</li><li><code>Passable</code> for 10 to 11;</li><li><code>Insuffisant</code> below 10.</li></ul><p>With the given mark (<code>13</code>), it must display <code>Bien</code>.</p>',
      },
      depart: 'note = 13\n\n# Quatre cas à traiter\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'elif',
          message: {
            fr: 'Utilise elif pour enchaîner les cas intermédiaires.',
            en: 'Use elif to chain the middle cases.',
          },
        },
        {
          type: 'codeContient',
          motif: 'else\\s*:',
          message: {
            fr: 'Il manque le else pour le dernier cas, en dessous de 10.',
            en: 'The else for the last case, below 10, is missing.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'Bien', en: 'Bien' } },
      ],
      indices: [
        { fr: 'Commence par le cas le plus exigeant : <code>if note >= 16:</code>.', en: 'Start with the strictest case: <code>if note >= 16:</code>.' },
        { fr: 'Puis <code>elif note >= 12:</code>, puis <code>elif note >= 10:</code>.', en: 'Then <code>elif note >= 12:</code>, then <code>elif note >= 10:</code>.' },
        { fr: 'Termine par <code>else:</code> — pas de condition à écrire, c’est « tous les autres cas ».', en: 'Finish with <code>else:</code> — no condition to write, it means "all other cases".' },
      ],
      solution:
        'note = 13\n\nif note >= 16:\n    print("Très bien")\nelif note >= 12:\n    print("Bien")\nelif note >= 10:\n    print("Passable")\nelse:\n    print("Insuffisant")',
    },
  },

  'py-3-3': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Répéter une action un nombre de fois connu, sans se répéter soi-même.',
      en: 'Repeat an action a known number of times, without repeating yourself.',
    },
    explication: {
      fr: `
        <p>Pour afficher dix lignes, tu ne vas pas écrire dix <code>print</code>. La
        <strong>boucle</strong> <code>for</code> le fait pour toi :</p>
        <pre>for i in range(5):
    print("Bonjour")</pre>
        <p>Cela affiche « Bonjour » cinq fois. Comme pour le <code>if</code> : deux points à la
        fin, et la ligne répétée est indentée.</p>
        <p><code>range(5)</code> produit les nombres <strong>0, 1, 2, 3, 4</strong> — cinq
        nombres, mais <strong>en partant de 0</strong>, donc sans le 5. C’est déroutant au début,
        et c’est ainsi dans presque tous les langages.</p>
        <p>La variable <code>i</code> prend chaque valeur à tour de rôle, et tu peux t’en
        servir :</p>
        <pre>for i in range(3):
    print(i)</pre>
        <p>affiche 0, puis 1, puis 2.</p>
        <p>Si tu préfères compter de 1 à 5 : <code>range(1, 6)</code> — le premier nombre est
        inclus, le dernier ne l’est pas.</p>
      `,
      en: `
        <p>To display ten lines you will not write ten <code>print</code> statements. The
        <code>for</code> <strong>loop</strong> does it for you:</p>
        <pre>for i in range(5):
    print("Hello")</pre>
        <p>This shows "Hello" five times. Same as the <code>if</code>: colon at the end, and the
        repeated line is indented.</p>
        <p><code>range(5)</code> produces the numbers <strong>0, 1, 2, 3, 4</strong> — five
        numbers, but <strong>starting from 0</strong>, so no 5. Confusing at first, and it works
        that way in almost every language.</p>
        <p>The variable <code>i</code> takes each value in turn, and you can use it:</p>
        <pre>for i in range(3):
    print(i)</pre>
        <p>shows 0, then 1, then 2.</p>
        <p>To count from 1 to 5: <code>range(1, 6)</code> — the first number is included, the
        last one is not.</p>
      `,
    },
    exemple: {
      code: 'for i in range(1, 6):\n    print(f"{i} x 7 = {i * 7}")',
      note: {
        fr: 'Cinq lignes écrites par deux lignes de code.',
        en: 'Five lines produced by two lines of code.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Affiche la table de multiplication de 9, de 1 à 10, sous cette forme :</p><pre>9 x 1 = 9\n9 x 2 = 18\n…\n9 x 10 = 90</pre><p>Dix lignes, mais tu n’as le droit qu’à <strong>un seul</strong> <code>print</code>.</p>',
        en: '<p>Display the 9 times table, from 1 to 10, in this form:</p><pre>9 x 1 = 9\n9 x 2 = 18\n…\n9 x 10 = 90</pre><p>Ten lines, but you may only use <strong>one</strong> <code>print</code>.</p>',
      },
      depart: '# Une boucle, un seul print\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s+\\w+\\s+in\\s+range',
          message: { fr: 'Il faut une boucle for avec range().', en: 'You need a for loop with range().' },
        },
        { type: 'sortieLignes', nombre: 10 },
        { type: 'sortieContient', valeur: { fr: '9 x 1 = 9', en: '9 x 1 = 9' } },
        { type: 'sortieContient', valeur: { fr: '9 x 7 = 63', en: '9 x 7 = 63' } },
        { type: 'sortieContient', valeur: { fr: '9 x 10 = 90', en: '9 x 10 = 90' } },
      ],
      indices: [
        { fr: 'Tu veux les nombres de 1 à 10 : <code>range(1, 11)</code>.', en: 'You want the numbers 1 to 10: <code>range(1, 11)</code>.' },
        { fr: 'Le squelette : <code>for i in range(1, 11):</code> puis une ligne indentée.', en: 'The skeleton: <code>for i in range(1, 11):</code> then an indented line.' },
        { fr: 'La ligne indentée : <code>print(f"9 x {i} = {9 * i}")</code>.', en: 'The indented line: <code>print(f"9 x {i} = {9 * i}")</code>.' },
      ],
      solution: 'for i in range(1, 11):\n    print(f"9 x {i} = {9 * i}")',
    },
  },

  'py-3-4': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Répéter tant qu’une condition reste vraie, sans savoir combien de fois.',
      en: 'Repeat while a condition stays true, without knowing how many times.',
    },
    explication: {
      fr: `
        <p>La boucle <code>for</code> sert quand on sait <em>combien de fois</em> répéter. Mais
        parfois on ne le sait pas : « continue tant que le joueur n’a pas trouvé ».</p>
        <p>C’est le rôle de <code>while</code> (« tant que ») :</p>
        <pre>compteur = 5
while compteur > 0:
    print(compteur)
    compteur = compteur - 1
print("Décollage !")</pre>
        <p>Python vérifie la condition, exécute le bloc, revérifie, et ainsi de suite jusqu’à ce
        qu’elle devienne fausse.</p>
        <p><strong>Le danger :</strong> si rien ne fait avancer la condition vers le faux, la
        boucle ne s’arrête jamais. Ici, c’est la ligne <code>compteur = compteur - 1</code> qui
        évite la catastrophe. Oublie-la, et le programme tourne à l’infini.</p>
        <p>Rassure-toi : le bouton <strong>Arrêter</strong> est là pour ça. Ça arrive à tout le
        monde.</p>
      `,
      en: `
        <p>The <code>for</code> loop is for when you know <em>how many times</em> to repeat. But
        sometimes you do not: "keep going until the player guesses right".</p>
        <p>That is what <code>while</code> is for:</p>
        <pre>compteur = 5
while compteur > 0:
    print(compteur)
    compteur = compteur - 1
print("Lift off!")</pre>
        <p>Python checks the condition, runs the block, checks again, and so on until it becomes
        false.</p>
        <p><strong>The danger:</strong> if nothing moves the condition towards false, the loop
        never stops. Here it is the line <code>compteur = compteur - 1</code> that avoids
        disaster. Forget it and the program runs forever.</p>
        <p>Do not worry: the <strong>Stop</strong> button exists for that. It happens to
        everyone.</p>
      `,
    },
    exemple: {
      code: 'compteur = 3\n\nwhile compteur > 0:\n    print(compteur)\n    compteur = compteur - 1\n\nprint("Décollage !")',
      note: {
        fr: 'Enlève la ligne qui diminue le compteur pour voir la boucle infinie — puis clique sur Arrêter.',
        en: 'Remove the line that decreases the counter to see an infinite loop — then click Stop.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Un sac contient <code>20</code> billes. À chaque tour on en retire 3, et on annonce combien il en reste.</p><p>On s’arrête quand il n’y en a plus assez pour en retirer 3. Le programme doit afficher :</p><pre>17\n14\n11\n8\n5\n2\nSac vide ou presque !</pre><p>Réfléchis bien à la condition : <code>billes > 0</code> ferait descendre le compte en dessous de zéro.</p>',
        en: '<p>A bag holds <code>20</code> marbles. Each round you take out 3 and announce how many are left.</p><p>Stop when there are not enough left to take 3. The program must display:</p><pre>17\n14\n11\n8\n5\n2\nSac vide ou presque !</pre><p>Think carefully about the condition: <code>billes > 0</code> would take the count below zero.</p>',
      },
      depart: 'billes = 20\n\n# Tant qu\'on peut encore retirer 3 billes, les retirer et afficher le reste\n\nprint("Sac vide ou presque !")\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'while',
          message: { fr: 'Il faut une boucle while.', en: 'You need a while loop.' },
        },
        { type: 'sortieLignes', nombre: 7 },
        { type: 'sortieContient', valeur: { fr: '17', en: '17' } },
        { type: 'sortieContient', valeur: { fr: '2', en: '2' } },
        { type: 'sortieContient', valeur: { fr: 'Sac vide ou presque !', en: 'Sac vide ou presque !' } },
      ],
      indices: [
        {
          fr: 'On continue tant qu’il reste au moins 3 billes : <code>while billes >= 3:</code>.',
          en: 'Keep going while at least 3 marbles remain: <code>while billes >= 3:</code>.',
        },
        { fr: 'Dans la boucle, commence par retirer : <code>billes = billes - 3</code>.', en: 'Inside the loop, take some out first: <code>billes = billes - 3</code>.' },
        { fr: 'Puis affiche : <code>print(billes)</code>. Les deux lignes sont indentées.', en: 'Then display: <code>print(billes)</code>. Both lines are indented.' },
      ],
      solution:
        'billes = 20\n\nwhile billes >= 3:\n    billes = billes - 3\n    print(billes)\n\nprint("Sac vide ou presque !")',
    },
  },

  'py-3-5': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Écrire un vrai jeu : boucle, condition et saisie ensemble.',
      en: 'Write a real game: loop, condition and input working together.',
    },
    explication: {
      fr: `
        <p>Voilà ton premier <strong>jeu</strong>. L’ordinateur pense à un nombre, le joueur
        propose, et le programme répond « trop grand » ou « trop petit » jusqu’à ce qu’il
        trouve.</p>
        <p>Tout ce dont tu as besoin, tu le connais déjà :</p>
        <ul>
          <li>un <code>while</code> pour recommencer tant que ce n’est pas trouvé ;</li>
          <li>un <code>input()</code> pour lire la proposition ;</li>
          <li>un <code>if / elif / else</code> pour comparer.</li>
        </ul>
        <p>Le secret est écrit en clair dans le code pour l’instant. Dans le bac à sable, tu
        pourras le rendre aléatoire avec :</p>
        <pre>import random
secret = random.randint(1, 20)</pre>
      `,
      en: `
        <p>Here is your first <strong>game</strong>. The computer thinks of a number, the player
        guesses, and the program answers "too big" or "too small" until they get it.</p>
        <p>You already know everything you need:</p>
        <ul>
          <li>a <code>while</code> to keep going until it is found;</li>
          <li>an <code>input()</code> to read the guess;</li>
          <li>an <code>if / elif / else</code> to compare.</li>
        </ul>
        <p>The secret is written in plain sight for now. In the sandbox you can make it random
        with:</p>
        <pre>import random
secret = random.randint(1, 20)</pre>
      `,
    },
    exemple: {
      code: 'secret = 7\nproposition = 10\n\nif proposition > secret:\n    print("Trop grand")\nelif proposition < secret:\n    print("Trop petit")\nelse:\n    print("Bravo !")',
      note: {
        fr: 'La comparaison, sans la boucle. À toi d’ajouter le while pour rejouer.',
        en: 'The comparison, without the loop. Your turn to add the while so the player can retry.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Complète le jeu. Tant que le joueur n’a pas trouvé le nombre secret :</p><ul><li>demande une proposition avec <code>int(input("Ton nombre ? "))</code> ;</li><li>affiche <code>Trop grand</code> ou <code>Trop petit</code> ;</li><li>quand c’est trouvé, affiche <code>Bravo, c\'était 7 !</code> et arrête la boucle.</li></ul><p>Avec les propositions 15, 3 puis 7, le programme doit afficher :</p><pre>Trop grand\nTrop petit\nBravo, c\'était 7 !</pre>',
        en: '<p>Complete the game. While the player has not found the secret number:</p><ul><li>ask for a guess with <code>int(input("Ton nombre ? "))</code>;</li><li>display <code>Trop grand</code> or <code>Trop petit</code>;</li><li>when found, display <code>Bravo, c\'était 7 !</code> and stop the loop.</li></ul><p>With guesses 15, 3 then 7, the program must display:</p><pre>Trop grand\nTrop petit\nBravo, c\'était 7 !</pre>',
      },
      depart: 'secret = 7\ntrouve = False\n\n# Tant que ce n\'est pas trouvé, demander et comparer\n',
      entree: '15\n3\n7',
      verifications: [
        {
          type: 'codeContient',
          motif: 'while',
          message: { fr: 'Il faut une boucle while pour rejouer tant que ce n’est pas trouvé.', en: 'You need a while loop to keep playing until it is found.' },
        },
        {
          type: 'codeContient',
          motif: 'input\\s*\\(',
          message: { fr: 'Le joueur doit pouvoir proposer un nombre : utilise input().', en: 'The player must be able to guess: use input().' },
        },
        { type: 'sortieContient', valeur: { fr: 'Trop grand', en: 'Trop grand' } },
        { type: 'sortieContient', valeur: { fr: 'Trop petit', en: 'Trop petit' } },
        { type: 'sortieContient', valeur: { fr: "Bravo, c'était 7 !", en: "Bravo, c'était 7 !" } },
      ],
      indices: [
        { fr: 'La boucle tourne tant que ce n’est pas trouvé : <code>while trouve == False:</code>.', en: 'The loop runs while it is not found: <code>while trouve == False:</code>.' },
        { fr: 'Dans la boucle : lis la proposition, puis compare avec <code>if</code>, <code>elif</code>, <code>else</code>.', en: 'Inside the loop: read the guess, then compare with <code>if</code>, <code>elif</code>, <code>else</code>.' },
        { fr: 'Dans le <code>else</code> (c’est gagné), affiche le message et écris <code>trouve = True</code> pour sortir.', en: 'In the <code>else</code> (they won), display the message and write <code>trouve = True</code> to exit.' },
      ],
      solution:
        'secret = 7\ntrouve = False\n\nwhile trouve == False:\n    proposition = int(input("Ton nombre ? "))\n    if proposition > secret:\n        print("Trop grand")\n    elif proposition < secret:\n        print("Trop petit")\n    else:\n        print("Bravo, c\'était 7 !")\n        trouve = True',
    },
    projet: { titre: { fr: 'Devine le nombre', en: 'Guess the number' } },
  },
};
