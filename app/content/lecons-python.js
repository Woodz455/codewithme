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

  /* ===================================================== Module 4 ========= */

  'py-4-1': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Piloter la tortue : avancer, tourner, et voir le trait apparaître.',
      en: 'Drive the turtle: move, turn, and watch the line appear.',
    },
    explication: {
      fr: `
        <p>Python sait dessiner. On appelle ça la <strong>tortue</strong> : imagine un petit
        animal posé au centre de la feuille, avec un stylo attaché sous le ventre. Quand elle
        avance, elle trace.</p>
        <p>On commence toujours par la faire venir :</p>
        <p><code>import turtle</code></p>
        <p>Ensuite, deux ordres suffisent pour tout dessiner :</p>
        <ul>
          <li><code>turtle.forward(100)</code> — avance de 100 pas, en traçant ;</li>
          <li><code>turtle.left(90)</code> — pivote de 90° vers la gauche, sur place.</li>
        </ul>
        <p>Il y a aussi <code>backward()</code> et <code>right()</code>. La tortue démarre au
        centre, tournée vers la droite.</p>
        <p>Le truc à comprendre : <strong>tourner ne déplace pas</strong>. La tortue pivote sur
        elle-même, comme toi quand tu fais demi-tour sans bouger les pieds.</p>
        <p>C’est le vrai module <code>turtle</code> de Python : ce code marchera aussi sur un
        ordinateur avec Python installé.</p>
      `,
      en: `
        <p>Python can draw. It is called the <strong>turtle</strong>: picture a small animal in
        the middle of the page, with a pen strapped underneath. When it moves, it draws.</p>
        <p>You always start by fetching it:</p>
        <p><code>import turtle</code></p>
        <p>Then two orders are enough to draw anything:</p>
        <ul>
          <li><code>turtle.forward(100)</code> — move 100 steps, drawing;</li>
          <li><code>turtle.left(90)</code> — turn 90° left, on the spot.</li>
        </ul>
        <p>There is also <code>backward()</code> and <code>right()</code>. The turtle starts in
        the centre, facing right.</p>
        <p>The thing to grasp: <strong>turning does not move it</strong>. The turtle pivots on
        itself, like you turning around without moving your feet.</p>
        <p>This is Python's real <code>turtle</code> module: this code will also work on a
        computer with Python installed.</p>
      `,
    },
    exemple: {
      code: 'import turtle\n\nturtle.forward(120)\nturtle.left(90)\nturtle.forward(120)',
      note: {
        fr: 'Un angle droit. Regarde l’onglet Dessin : le tracé se construit sous tes yeux.',
        en: 'A right angle. Look at the Drawing tab: the line builds before your eyes.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Dessine un <strong>triangle équilatéral</strong> de 150 pas de côté.</p><p>Indice de géométrie : pour refermer un triangle, la tortue doit tourner de <strong>120°</strong> à chaque coin (360 ÷ 3).</p>',
        en: '<p>Draw an <strong>equilateral triangle</strong> with sides of 150 steps.</p><p>Geometry hint: to close a triangle, the turtle must turn <strong>120°</strong> at each corner (360 ÷ 3).</p>',
      },
      depart: 'import turtle\n\n# Trois côtés, trois virages\n',
      verifications: [
        { type: 'tortueTraits', min: 3, max: 3 },
        { type: 'tortueFermee', tolerance: 2 },
      ],
      indices: [
        { fr: 'Un triangle a trois côtés : il te faut trois <code>forward(150)</code>.', en: 'A triangle has three sides: you need three <code>forward(150)</code>.' },
        { fr: 'Entre chaque côté, un virage : <code>turtle.left(120)</code>.', en: 'Between each side, a turn: <code>turtle.left(120)</code>.' },
        {
          fr: 'Il faut aussi tourner après le <strong>troisième</strong> côté pour refermer la figure : avance, tourne, avance, tourne, avance, tourne.',
          en: 'You must also turn after the <strong>third</strong> side to close the shape: move, turn, move, turn, move, turn.',
        },
      ],
      solution:
        'import turtle\n\nturtle.forward(150)\nturtle.left(120)\nturtle.forward(150)\nturtle.left(120)\nturtle.forward(150)\nturtle.left(120)',
    },
  },

  'py-4-2': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Confier la répétition à une boucle plutôt que de recopier les lignes.',
      en: 'Let a loop do the repeating instead of copying lines.',
    },
    explication: {
      fr: `
        <p>Ton triangle t’a demandé six lignes presque identiques. Pour un octogone, il en
        faudrait seize. Personne n’écrit ça à la main.</p>
        <p>Un polygone, c’est <strong>toujours</strong> la même chose répétée :</p>
        <pre>for i in range(4):
    turtle.forward(100)
    turtle.left(90)</pre>
        <p>Quatre côtés, quatre virages de 90° : un carré, en trois lignes.</p>
        <p>La règle qui marche pour toutes les figures régulières :</p>
        <p><strong>angle = 360 ÷ nombre de côtés</strong></p>
        <p>Triangle : 120°. Carré : 90°. Pentagone : 72°. Octogone : 45°. Et si tu montes à
        <code>range(36)</code> avec un angle de 10°, tu obtiens presque un cercle.</p>
      `,
      en: `
        <p>Your triangle took six almost identical lines. An octagon would take sixteen. Nobody
        writes that by hand.</p>
        <p>A polygon is <strong>always</strong> the same thing repeated:</p>
        <pre>for i in range(4):
    turtle.forward(100)
    turtle.left(90)</pre>
        <p>Four sides, four 90° turns: a square, in three lines.</p>
        <p>The rule that works for every regular shape:</p>
        <p><strong>angle = 360 ÷ number of sides</strong></p>
        <p>Triangle: 120°. Square: 90°. Pentagon: 72°. Octagon: 45°. And with
        <code>range(36)</code> and a 10° angle, you get something very close to a circle.</p>
      `,
    },
    exemple: {
      code: 'import turtle\n\nturtle.speed(0)\n\nfor i in range(4):\n    turtle.forward(120)\n    turtle.left(90)',
      note: {
        fr: 'Change le 4 et l’angle pour voir d’autres formes. speed(0) dessine instantanément.',
        en: 'Change the 4 and the angle to see other shapes. speed(0) draws instantly.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Dessine un <strong>hexagone</strong> (6 côtés) de 100 pas de côté, avec une boucle.</p><p>À toi de calculer l’angle : 360 divisé par le nombre de côtés.</p>',
        en: '<p>Draw a <strong>hexagon</strong> (6 sides) with sides of 100 steps, using a loop.</p><p>Work out the angle yourself: 360 divided by the number of sides.</p>',
      },
      depart: 'import turtle\n\n# Six côtés, avec une boucle\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s+\\w+\\s+in\\s+range',
          message: {
            fr: 'Utilise une boucle for : c’est tout l’intérêt de la leçon.',
            en: 'Use a for loop: that is the whole point of this lesson.',
          },
        },
        { type: 'tortueTraits', min: 6, max: 6 },
        { type: 'tortueFermee', tolerance: 2 },
      ],
      indices: [
        { fr: 'Six côtés, donc <code>for i in range(6):</code>.', en: 'Six sides, so <code>for i in range(6):</code>.' },
        { fr: '360 ÷ 6 = 60. L’angle est donc de 60°.', en: '360 ÷ 6 = 60. So the angle is 60°.' },
        { fr: 'Dans la boucle, deux lignes indentées : <code>turtle.forward(100)</code> puis <code>turtle.left(60)</code>.', en: 'Inside the loop, two indented lines: <code>turtle.forward(100)</code> then <code>turtle.left(60)</code>.' },
      ],
      solution: 'import turtle\n\nturtle.speed(0)\n\nfor i in range(6):\n    turtle.forward(100)\n    turtle.left(60)',
    },
  },

  'py-4-3': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Donner de la couleur et de l’épaisseur, et lever le stylo pour se déplacer.',
      en: 'Add colour and thickness, and lift the pen to move without drawing.',
    },
    explication: {
      fr: `
        <p>Un dessin en trait noir fin, c’est un peu triste. Quatre ordres changent tout :</p>
        <ul>
          <li><code>turtle.pencolor("red")</code> — la couleur du trait ;</li>
          <li><code>turtle.pensize(5)</code> — son épaisseur ;</li>
          <li><code>turtle.penup()</code> — lève le stylo : la tortue se déplace sans tracer ;</li>
          <li><code>turtle.pendown()</code> — repose le stylo.</li>
        </ul>
        <p>Les couleurs s’écrivent en anglais (<code>"red"</code>, <code>"blue"</code>,
        <code>"green"</code>, <code>"orange"</code>, <code>"purple"</code>) ou en code
        hexadécimal, comme sur le web : <code>"#00E5FF"</code>.</p>
        <p><code>penup()</code> est indispensable dès qu’on veut dessiner deux figures séparées :
        sans lui, la tortue laisse une vilaine ligne entre les deux.</p>
      `,
      en: `
        <p>A thin black line is a bit sad. Four orders change everything:</p>
        <ul>
          <li><code>turtle.pencolor("red")</code> — the line colour;</li>
          <li><code>turtle.pensize(5)</code> — its thickness;</li>
          <li><code>turtle.penup()</code> — lift the pen: the turtle moves without drawing;</li>
          <li><code>turtle.pendown()</code> — put the pen back down.</li>
        </ul>
        <p>Colours are written in English (<code>"red"</code>, <code>"blue"</code>,
        <code>"green"</code>, <code>"orange"</code>, <code>"purple"</code>) or as a hex code,
        like on the web: <code>"#00E5FF"</code>.</p>
        <p><code>penup()</code> is essential as soon as you want two separate shapes: without it
        the turtle leaves an ugly line between them.</p>
      `,
    },
    exemple: {
      code: 'import turtle\n\nturtle.speed(0)\nturtle.pensize(6)\n\nturtle.pencolor("#00E5FF")\nturtle.forward(100)\n\nturtle.penup()\nturtle.forward(40)\nturtle.pendown()\n\nturtle.pencolor("#FF3D8B")\nturtle.forward(100)',
      note: {
        fr: 'Deux traits de couleurs différentes, séparés par un espace : c’est penup() qui crée le trou.',
        en: 'Two lines of different colours, separated by a gap: penup() creates the gap.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Dessine un carré de 120 pas dont <strong>chaque côté est d’une couleur différente</strong>, avec un trait épais (au moins 4).</p><p>Quatre couleurs, quatre côtés.</p>',
        en: '<p>Draw a 120-step square where <strong>each side is a different colour</strong>, with a thick line (at least 4).</p><p>Four colours, four sides.</p>',
      },
      depart: 'import turtle\n\nturtle.speed(0)\nturtle.pensize(6)\n\n# Quatre côtés, quatre couleurs\n',
      verifications: [
        { type: 'tortueTraits', min: 4, max: 4 },
        { type: 'tortueCouleurs', min: 4 },
        { type: 'tortueFermee', tolerance: 2 },
      ],
      indices: [
        {
          fr: 'Une boucle ne suffit pas ici : chaque côté a sa propre couleur, écris-les l’un après l’autre.',
          en: 'A loop is not enough here: each side has its own colour, so write them one after another.',
        },
        {
          fr: 'Pour chaque côté : <code>turtle.pencolor("red")</code>, puis <code>forward(120)</code>, puis <code>left(90)</code>.',
          en: 'For each side: <code>turtle.pencolor("red")</code>, then <code>forward(120)</code>, then <code>left(90)</code>.',
        },
        {
          fr: 'Répète ce trio quatre fois en changeant la couleur à chaque fois : red, blue, green, orange.',
          en: 'Repeat that trio four times, changing the colour each time: red, blue, green, orange.',
        },
      ],
      solution:
        'import turtle\n\nturtle.speed(0)\nturtle.pensize(6)\n\nturtle.pencolor("red")\nturtle.forward(120)\nturtle.left(90)\n\nturtle.pencolor("blue")\nturtle.forward(120)\nturtle.left(90)\n\nturtle.pencolor("green")\nturtle.forward(120)\nturtle.left(90)\n\nturtle.pencolor("orange")\nturtle.forward(120)\nturtle.left(90)',
    },
  },

  'py-4-4': {
    langage: 'python',
    xp: 45,
    objectif: {
      fr: 'Produire une figure impressionnante avec très peu de code.',
      en: 'Produce a striking picture with very little code.',
    },
    explication: {
      fr: `
        <p>Une <strong>rosace</strong>, c’est une figure simple répétée en tournant un peu à
        chaque fois. Le résultat paraît compliqué ; le code ne l’est pas.</p>
        <p>Le principe : dessine un carré, tourne de quelques degrés, redessine un carré, et
        recommence. Après un tour complet, les carrés forment une fleur.</p>
        <pre>for i in range(36):
    # dessiner un carré ici
    turtle.left(10)</pre>
        <p>36 carrés × 10° = 360° : un tour complet.</p>
        <p>C’est ce qu’on appelle une <strong>boucle dans une boucle</strong> : la boucle
        extérieure répète la figure, la boucle intérieure dessine chaque carré. Attention à
        l’indentation — les lignes du carré sont décalées <em>deux fois</em>.</p>
        <p>Ajoute <code>turtle.speed(0)</code> au début : sans lui, 144 traits mettraient une
        éternité à s’afficher.</p>
      `,
      en: `
        <p>A <strong>rosette</strong> is a simple shape repeated with a small turn each time. The
        result looks complicated; the code is not.</p>
        <p>The idea: draw a square, turn a few degrees, draw another square, and so on. After a
        full turn, the squares form a flower.</p>
        <pre>for i in range(36):
    # draw a square here
    turtle.left(10)</pre>
        <p>36 squares × 10° = 360°: one full turn.</p>
        <p>This is called a <strong>loop inside a loop</strong>: the outer loop repeats the
        shape, the inner loop draws each square. Watch the indentation — the square's lines are
        shifted <em>twice</em>.</p>
        <p>Add <code>turtle.speed(0)</code> at the start: without it, 144 lines would take
        forever to appear.</p>
      `,
    },
    exemple: {
      code: 'import turtle\n\nturtle.speed(0)\n\nfor tour in range(12):\n    for cote in range(4):\n        turtle.forward(80)\n        turtle.left(90)\n    turtle.left(30)',
      note: {
        fr: '12 carrés tournés de 30°. Change les nombres pour obtenir d’autres fleurs.',
        en: '12 squares turned by 30°. Change the numbers to get other flowers.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée ta rosace :</p><ul><li><strong>36 figures</strong>, tournées de <strong>10°</strong> à chaque fois ;</li><li>chaque figure est un <strong>carré</strong> de 100 pas ;</li><li>utilise au moins <strong>3 couleurs différentes</strong>.</li></ul><p>Astuce pour les couleurs : range-les dans une liste et pioche avec <code>couleurs[tour % 3]</code>.</p>',
        en: '<p>Create your rosette:</p><ul><li><strong>36 shapes</strong>, turned by <strong>10°</strong> each time;</li><li>each shape is a <strong>square</strong> of 100 steps;</li><li>use at least <strong>3 different colours</strong>.</li></ul><p>Colour tip: put them in a list and pick with <code>couleurs[tour % 3]</code>.</p>',
      },
      depart:
        'import turtle\n\nturtle.speed(0)\nturtle.pensize(2)\n\ncouleurs = ["#00E5FF", "#B14BFF", "#FF3D8B"]\n\n# 36 carrés, tournés de 10° à chaque fois\n',
      verifications: [
        { type: 'tortueTraits', min: 140, max: 150 },
        { type: 'tortueCouleurs', min: 3 },
      ],
      indices: [
        { fr: 'La boucle extérieure : <code>for tour in range(36):</code>.', en: 'The outer loop: <code>for tour in range(36):</code>.' },
        {
          fr: 'À l’intérieur, la boucle du carré : <code>for cote in range(4):</code> avec <code>forward(100)</code> et <code>left(90)</code>.',
          en: 'Inside, the square loop: <code>for cote in range(4):</code> with <code>forward(100)</code> and <code>left(90)</code>.',
        },
        {
          fr: 'Toujours dans la boucle extérieure mais après le carré : <code>turtle.left(10)</code>. Et avant le carré : <code>turtle.pencolor(couleurs[tour % 3])</code>.',
          en: 'Still in the outer loop but after the square: <code>turtle.left(10)</code>. And before the square: <code>turtle.pencolor(couleurs[tour % 3])</code>.',
        },
      ],
      solution:
        'import turtle\n\nturtle.speed(0)\nturtle.pensize(2)\n\ncouleurs = ["#00E5FF", "#B14BFF", "#FF3D8B"]\n\nfor tour in range(36):\n    turtle.pencolor(couleurs[tour % 3])\n    for cote in range(4):\n        turtle.forward(100)\n        turtle.left(90)\n    turtle.left(10)\n\nturtle.hideturtle()',
    },
    projet: { titre: { fr: 'Ma rosace', en: 'My rosette' } },
  },

  /* ===================================================== Module 5 ========= */

  'py-5-1': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Ranger plusieurs valeurs dans une seule variable.',
      en: 'Store several values in a single variable.',
    },
    explication: {
      fr: `
        <p>Pour ranger les notes d’un trimestre, tu ne vas pas créer <code>note1</code>,
        <code>note2</code>, <code>note3</code>… Une <strong>liste</strong> les tient toutes :</p>
        <p><code>notes = [12, 15, 8, 17]</code></p>
        <p>Des crochets, des valeurs séparées par des virgules. On accède à un élément par sa
        <strong>position</strong>, entre crochets :</p>
        <p><code>print(notes[0])</code> affiche <code>12</code></p>
        <p><strong>La position commence à 0</strong>, pas à 1. C’est la même logique que
        <code>range()</code>. Le premier élément est le numéro 0, le deuxième le numéro 1, et
        ainsi de suite. Ça surprend au début, puis ça devient naturel.</p>
        <p>Deux outils très utiles :</p>
        <ul>
          <li><code>len(notes)</code> — combien d’éléments (ici 4) ;</li>
          <li><code>notes.append(19)</code> — ajouter une valeur à la fin.</li>
        </ul>
        <p>Une liste peut contenir du texte aussi : <code>["Lundi", "Mardi"]</code>.</p>
      `,
      en: `
        <p>To store a term's marks you will not create <code>note1</code>, <code>note2</code>,
        <code>note3</code>… A <strong>list</strong> holds them all:</p>
        <p><code>notes = [12, 15, 8, 17]</code></p>
        <p>Square brackets, values separated by commas. You reach an element by its
        <strong>position</strong>, in brackets:</p>
        <p><code>print(notes[0])</code> shows <code>12</code></p>
        <p><strong>Positions start at 0</strong>, not 1. Same logic as <code>range()</code>. The
        first element is number 0, the second is number 1, and so on. Surprising at first, then
        natural.</p>
        <p>Two very useful tools:</p>
        <ul>
          <li><code>len(notes)</code> — how many elements (4 here);</li>
          <li><code>notes.append(19)</code> — add a value at the end.</li>
        </ul>
        <p>A list can hold text too: <code>["Monday", "Tuesday"]</code>.</p>
      `,
    },
    exemple: {
      code: 'fruits = ["pomme", "banane", "kiwi"]\n\nprint(fruits[0])\nprint(fruits[2])\nprint(len(fruits))\n\nfruits.append("orange")\nprint(len(fruits))',
      note: {
        fr: 'Essaie fruits[3] avant le append : Python proteste, la case n’existe pas encore.',
        en: 'Try fruits[3] before the append: Python complains, that slot does not exist yet.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La liste <code>animaux</code> est déjà là. Sans la réécrire :</p><ul><li>ajoute <code>"tortue"</code> à la fin ;</li><li>affiche le <strong>premier</strong> animal ;</li><li>affiche le <strong>nombre total</strong> d’animaux.</li></ul><p>Le programme doit afficher :</p><pre>chat\n4</pre>',
        en: '<p>The list <code>animaux</code> is already there. Without rewriting it:</p><ul><li>add <code>"tortue"</code> at the end;</li><li>display the <strong>first</strong> animal;</li><li>display the <strong>total number</strong> of animals.</li></ul><p>The program must display:</p><pre>chat\n4</pre>',
      },
      depart: 'animaux = ["chat", "chien", "lapin"]\n\n# Ajoute la tortue, puis affiche le premier animal et le total\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.append\\s*\\(',
          message: { fr: 'Ajoute la tortue avec .append(), sans réécrire la liste.', en: 'Add the turtle with .append(), without rewriting the list.' },
        },
        {
          type: 'codeContient',
          motif: 'len\\s*\\(',
          message: { fr: 'Utilise len() pour compter, plutôt que d’écrire 4 à la main.', en: 'Use len() to count, rather than typing 4 by hand.' },
        },
        { type: 'sortieEgale', valeur: { fr: 'chat\n4', en: 'chat\n4' } },
      ],
      indices: [
        { fr: 'Pour ajouter : <code>animaux.append("tortue")</code>.', en: 'To add: <code>animaux.append("tortue")</code>.' },
        { fr: 'Le premier animal est à la position 0 : <code>animaux[0]</code>.', en: 'The first animal is at position 0: <code>animaux[0]</code>.' },
        { fr: 'Le total : <code>print(len(animaux))</code>, après l’ajout.', en: 'The total: <code>print(len(animaux))</code>, after the addition.' },
      ],
      solution: 'animaux = ["chat", "chien", "lapin"]\n\nanimaux.append("tortue")\nprint(animaux[0])\nprint(len(animaux))',
    },
  },

  'py-5-2': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Traiter tous les éléments d’une liste, quel que soit leur nombre.',
      en: 'Handle every element of a list, however many there are.',
    },
    explication: {
      fr: `
        <p>Tu sais déjà répéter avec <code>for</code>. La même boucle sait
        <strong>parcourir une liste</strong>, et c’est encore plus simple :</p>
        <pre>fruits = ["pomme", "banane", "kiwi"]

for fruit in fruits:
    print(fruit)</pre>
        <p>Pas de <code>range()</code>, pas de position à gérer. Python prend les éléments un par
        un et les met dans <code>fruit</code>.</p>
        <p>Le nom de la variable est libre. Par convention, on met le singulier du nom de la
        liste : <code>for note in notes</code>, <code>for animal in animaux</code>. Ça rend le
        code lisible comme une phrase.</p>
        <p>Un cas fréquent : additionner tout le contenu. On part de zéro et on accumule :</p>
        <pre>total = 0
for note in notes:
    total = total + note</pre>
        <p>La variable <code>total</code> doit être créée <strong>avant</strong> la boucle, sinon
        elle repartirait de zéro à chaque tour.</p>
      `,
      en: `
        <p>You already know how to repeat with <code>for</code>. The same loop can
        <strong>walk through a list</strong>, and it is even simpler:</p>
        <pre>fruits = ["apple", "banana", "kiwi"]

for fruit in fruits:
    print(fruit)</pre>
        <p>No <code>range()</code>, no positions to manage. Python takes the elements one by one
        and puts them in <code>fruit</code>.</p>
        <p>The variable name is up to you. By convention, use the singular of the list name:
        <code>for note in notes</code>, <code>for animal in animaux</code>. It makes the code
        read like a sentence.</p>
        <p>A common case: adding everything up. Start from zero and accumulate:</p>
        <pre>total = 0
for note in notes:
    total = total + note</pre>
        <p>The <code>total</code> variable must be created <strong>before</strong> the loop,
        otherwise it would restart from zero on every pass.</p>
      `,
    },
    exemple: {
      code: 'notes = [12, 15, 8, 17]\n\ntotal = 0\nfor note in notes:\n    total = total + note\n\nprint(f"Total : {total}")\nprint(f"Moyenne : {total / len(notes)}")',
      note: {
        fr: 'Ajoute une note dans la liste et relance : la moyenne se recalcule toute seule.',
        en: 'Add a mark to the list and run again: the average recalculates by itself.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>À partir de la liste <code>temperatures</code>, affiche une ligne par ville sous la forme <code>Ville : 18°C</code>, puis la température la plus élevée.</p><p>Le programme doit afficher :</p><pre>Paris : 18°C\nLyon : 22°C\nNice : 27°C\nLille : 15°C\nLa plus chaude : 27</pre><p>Pour le maximum, Python a une fonction toute faite : <code>max(liste)</code>.</p>',
        en: '<p>From the <code>temperatures</code> list, display one line per city in the form <code>City : 18°C</code>, then the highest temperature.</p><p>The program must display:</p><pre>Paris : 18°C\nLyon : 22°C\nNice : 27°C\nLille : 15°C\nLa plus chaude : 27</pre><p>For the maximum, Python has a ready-made function: <code>max(liste)</code>.</p>',
      },
      depart:
        'villes = ["Paris", "Lyon", "Nice", "Lille"]\ntemperatures = [18, 22, 27, 15]\n\n# Une ligne par ville, puis la température la plus élevée\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s+\\w+\\s+in\\s+',
          message: { fr: 'Parcours la liste avec une boucle for.', en: 'Walk through the list with a for loop.' },
        },
        { type: 'sortieContient', valeur: { fr: 'Paris : 18°C', en: 'Paris : 18°C' } },
        { type: 'sortieContient', valeur: { fr: 'Nice : 27°C', en: 'Nice : 27°C' } },
        { type: 'sortieContient', valeur: { fr: 'La plus chaude : 27', en: 'La plus chaude : 27' } },
        { type: 'sortieLignes', nombre: 5 },
      ],
      indices: [
        {
          fr: 'Ici tu as besoin de la <strong>position</strong> pour associer ville et température : <code>for i in range(len(villes)):</code>.',
          en: 'Here you need the <strong>position</strong> to pair city and temperature: <code>for i in range(len(villes)):</code>.',
        },
        {
          fr: 'Dans la boucle : <code>print(f"{villes[i]} : {temperatures[i]}°C")</code>.',
          en: 'Inside the loop: <code>print(f"{villes[i]} : {temperatures[i]}°C")</code>.',
        },
        {
          fr: 'Après la boucle, sans indentation : <code>print(f"La plus chaude : {max(temperatures)}")</code>.',
          en: 'After the loop, not indented: <code>print(f"La plus chaude : {max(temperatures)}")</code>.',
        },
      ],
      solution:
        'villes = ["Paris", "Lyon", "Nice", "Lille"]\ntemperatures = [18, 22, 27, 15]\n\nfor i in range(len(villes)):\n    print(f"{villes[i]} : {temperatures[i]}°C")\n\nprint(f"La plus chaude : {max(temperatures)}")',
    },
  },

  'py-5-3': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Donner un nom à un bout de code pour le réutiliser partout.',
      en: 'Give a name to a piece of code so you can reuse it anywhere.',
    },
    explication: {
      fr: `
        <p>Tu utilises des fonctions depuis le début : <code>print()</code>, <code>len()</code>,
        <code>max()</code>. Tu peux créer les tiennes.</p>
        <pre>def dire_bonjour(prenom):
    print(f"Bonjour {prenom} !")

dire_bonjour("Théo")
dire_bonjour("Marie")</pre>
        <ul>
          <li><code>def</code> annonce une définition ;</li>
          <li><code>dire_bonjour</code> est le nom que tu choisis ;</li>
          <li><code>prenom</code> est le <strong>paramètre</strong> : l’information qu’on lui
          donne à chaque appel ;</li>
          <li>le corps est indenté, comme pour <code>if</code> et <code>for</code>.</li>
        </ul>
        <p>Définir une fonction ne l’exécute pas. Il faut ensuite l’<strong>appeler</strong>, en
        écrivant son nom suivi de parenthèses.</p>
        <p>Souvent, on veut récupérer un résultat plutôt que l’afficher. C’est le rôle de
        <code>return</code> :</p>
        <pre>def double(n):
    return n * 2

resultat = double(21)</pre>
        <p><code>return</code> renvoie la valeur à celui qui a appelé, et termine la fonction.</p>
        <p>Pourquoi s’embêter ? Parce qu’un code écrit une fois se corrige une fois. Copié cinq
        fois, il se corrige cinq fois — et tu en oublieras une.</p>
      `,
      en: `
        <p>You have been using functions from the start: <code>print()</code>, <code>len()</code>,
        <code>max()</code>. You can create your own.</p>
        <pre>def dire_bonjour(prenom):
    print(f"Hello {prenom}!")

dire_bonjour("Theo")
dire_bonjour("Marie")</pre>
        <ul>
          <li><code>def</code> announces a definition;</li>
          <li><code>dire_bonjour</code> is the name you choose;</li>
          <li><code>prenom</code> is the <strong>parameter</strong>: the information given at
          each call;</li>
          <li>the body is indented, like for <code>if</code> and <code>for</code>.</li>
        </ul>
        <p>Defining a function does not run it. You then have to <strong>call</strong> it, by
        writing its name followed by brackets.</p>
        <p>Often you want to get a result back rather than display it. That is what
        <code>return</code> is for:</p>
        <pre>def double(n):
    return n * 2

resultat = double(21)</pre>
        <p><code>return</code> hands the value back to the caller, and ends the function.</p>
        <p>Why bother? Because code written once is fixed once. Copied five times, it must be
        fixed five times — and you will miss one.</p>
      `,
    },
    exemple: {
      code: 'def aire_rectangle(largeur, hauteur):\n    return largeur * hauteur\n\nprint(aire_rectangle(4, 5))\nprint(aire_rectangle(10, 3))',
      note: {
        fr: 'Une fonction, deux paramètres, réutilisable autant de fois que tu veux.',
        en: 'One function, two parameters, reusable as often as you like.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une fonction <code>est_majeur(age)</code> qui <strong>renvoie</strong> <code>True</code> si l’âge est de 18 ou plus, et <code>False</code> sinon.</p><p>Utilise-la ensuite pour afficher le résultat pour chaque âge de la liste :</p><pre>12 : False\n18 : True\n25 : True\n7 : False</pre>',
        en: '<p>Write a function <code>est_majeur(age)</code> that <strong>returns</strong> <code>True</code> if the age is 18 or more, and <code>False</code> otherwise.</p><p>Then use it to display the result for each age in the list:</p><pre>12 : False\n18 : True\n25 : True\n7 : False</pre>',
      },
      depart: 'ages = [12, 18, 25, 7]\n\n# Écris ta fonction ici\n\n# Puis parcours la liste et affiche le résultat\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+est_majeur\\s*\\(',
          message: { fr: 'La fonction doit s’appeler exactement est_majeur.', en: 'The function must be named exactly est_majeur.' },
        },
        {
          type: 'codeContient',
          motif: 'return',
          message: {
            fr: 'La fonction doit renvoyer une valeur avec return, pas l’afficher elle-même.',
            en: 'The function must return a value with return, not display it itself.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '12 : False\n18 : True\n25 : True\n7 : False', en: '12 : False\n18 : True\n25 : True\n7 : False' } },
      ],
      indices: [
        { fr: 'Le squelette : <code>def est_majeur(age):</code> puis une ligne indentée.', en: 'The skeleton: <code>def est_majeur(age):</code> then an indented line.' },
        {
          fr: 'Une seule ligne suffit : <code>return age >= 18</code>. La comparaison vaut déjà True ou False.',
          en: 'One line is enough: <code>return age >= 18</code>. The comparison is already True or False.',
        },
        {
          fr: 'Puis : <code>for age in ages:</code> et dedans <code>print(f"{age} : {est_majeur(age)}")</code>.',
          en: 'Then: <code>for age in ages:</code> and inside <code>print(f"{age} : {est_majeur(age)}")</code>.',
        },
      ],
      solution:
        'ages = [12, 18, 25, 7]\n\ndef est_majeur(age):\n    return age >= 18\n\nfor age in ages:\n    print(f"{age} : {est_majeur(age)}")',
    },
  },

  'py-5-4': {
    langage: 'python',
    xp: 45,
    objectif: {
      fr: 'Écrire un outil utile, avec du hasard et une fonction.',
      en: 'Write a genuinely useful tool, with randomness and a function.',
    },
    explication: {
      fr: `
        <p>Dernier projet Python : un <strong>générateur de mots de passe</strong>. Un vrai
        outil, que tu pourras réutiliser.</p>
        <p>Il te faut le hasard. Python le fournit avec le module <code>random</code> :</p>
        <pre>import random

random.choice("abcdef")   # une lettre au hasard
random.randint(1, 6)      # un entier entre 1 et 6</pre>
        <p><code>random.choice()</code> pioche un élément au hasard dans un texte ou une liste.
        Répété douze fois dans une boucle, cela fabrique un mot de passe.</p>
        <p>Pour assembler des caractères, on part d’un texte vide et on ajoute :</p>
        <pre>mot = ""
mot = mot + "a"   # mot vaut "a"</pre>
        <p>Le <code>+</code> sur du texte ne fait pas une addition : il <strong>colle</strong>.
        C’est exactement ce qu’il nous faut.</p>
      `,
      en: `
        <p>Last Python project: a <strong>password generator</strong>. A real tool you can
        actually reuse.</p>
        <p>You need randomness. Python provides it with the <code>random</code> module:</p>
        <pre>import random

random.choice("abcdef")   # a random letter
random.randint(1, 6)      # a whole number between 1 and 6</pre>
        <p><code>random.choice()</code> picks a random element from a text or a list. Repeated
        twelve times in a loop, it builds a password.</p>
        <p>To assemble characters, start from an empty text and add:</p>
        <pre>mot = ""
mot = mot + "a"   # mot is now "a"</pre>
        <p>The <code>+</code> on text is not an addition: it <strong>glues</strong>. Which is
        exactly what we need here.</p>
      `,
    },
    exemple: {
      code: 'import random\n\ncaracteres = "abcdefghijklmnopqrstuvwxyz"\n\nmot = ""\nfor i in range(6):\n    mot = mot + random.choice(caracteres)\n\nprint(mot)',
      note: {
        fr: 'Relance plusieurs fois : le mot change à chaque exécution.',
        en: 'Run it several times: the word changes every time.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une fonction <code>generer(longueur)</code> qui <strong>renvoie</strong> un mot de passe de la longueur demandée, pioché dans <code>caracteres</code>.</p><p>Affiche ensuite un mot de passe de <strong>12</strong> caractères, et rien d’autre.</p><p>Comme il est aléatoire, tu obtiendras un résultat différent à chaque essai — c’est normal.</p>',
        en: '<p>Write a function <code>generer(longueur)</code> that <strong>returns</strong> a password of the requested length, picked from <code>caracteres</code>.</p><p>Then display a <strong>12</strong>-character password, and nothing else.</p><p>Since it is random, you will get a different result each time — that is expected.</p>',
      },
      depart:
        'import random\n\ncaracteres = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!?@#"\n\n# Écris la fonction generer(longueur), puis affiche un mot de passe de 12 caractères\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+generer\\s*\\(',
          message: { fr: 'La fonction doit s’appeler exactement generer.', en: 'The function must be named exactly generer.' },
        },
        {
          type: 'codeContient',
          motif: 'return',
          message: { fr: 'La fonction doit renvoyer le mot de passe avec return.', en: 'The function must return the password with return.' },
        },
        {
          type: 'codeContient',
          motif: 'random\\.choice',
          message: { fr: 'Pioche les caractères avec random.choice().', en: 'Pick the characters with random.choice().' },
        },
        {
          type: 'sortieMotif',
          motif: '^[a-zA-Z0-9!?@#]{12}$',
          message: {
            fr: 'Le programme doit afficher exactement un mot de passe de 12 caractères, sans autre texte.',
            en: 'The program must display exactly one 12-character password, with no other text.',
          },
        },
      ],
      indices: [
        { fr: 'Le squelette : <code>def generer(longueur):</code>, puis le corps indenté.', en: 'The skeleton: <code>def generer(longueur):</code>, then the indented body.' },
        {
          fr: 'Dans la fonction : <code>mot = ""</code>, puis <code>for i in range(longueur):</code> qui ajoute un caractère au hasard.',
          en: 'Inside the function: <code>mot = ""</code>, then <code>for i in range(longueur):</code> adding a random character.',
        },
        {
          fr: 'Termine la fonction par <code>return mot</code>, puis appelle-la : <code>print(generer(12))</code>.',
          en: 'End the function with <code>return mot</code>, then call it: <code>print(generer(12))</code>.',
        },
      ],
      solution:
        'import random\n\ncaracteres = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!?@#"\n\ndef generer(longueur):\n    mot = ""\n    for i in range(longueur):\n        mot = mot + random.choice(caracteres)\n    return mot\n\nprint(generer(12))',
    },
    projet: { titre: { fr: 'Mon générateur de mots de passe', en: 'My password generator' } },
  },
};
