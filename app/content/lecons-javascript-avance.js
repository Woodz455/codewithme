/**
 * Parcours JavaScript — les modules avances.
 *
 * Suite de `lecons-javascript.js`, qui apprend a changer un texte, reagir a un
 * clic, faire une boucle et dessiner. Ici on ajoute ce qui transforme ce socle
 * en vraie application : ranger des donnees, les parcourir sans boucle a la
 * main, fabriquer la page depuis le code, lire un formulaire.
 *
 * Comme partout, l'eleve n'ecrit que le JavaScript : le HTML lui est donne,
 * identique dans `depart` et dans `solution`.
 *
 * Deux rappels qui ont deja coute cher dans ce depot :
 *
 *   - le correcteur photographie la page 700 ms apres l'execution, la meme
 *     valeur dans l'atelier et dans `check:content` ;
 *   - `app/content/_schema.md` liste ce que le moteur accepte reellement.
 *     `localStorage`, `fetch` et `import` n'y sont pas : l'apercu est une
 *     iframe sans `allow-same-origin`, et c'est voulu. La derniere lecon du
 *     parcours en fait un sujet plutot qu'un silence.
 */

export const LECONS_JAVASCRIPT_AVANCE = {
  /* ================================================ js-txt : le texte ==== */

  'js-txt-1': {
    langage: 'javascript',
    xp: 20,
    objectif: {
      fr: 'Assembler du texte et des variables proprement, avec un gabarit.',
      en: 'Join text and variables cleanly, using a template literal.',
    },
    explication: {
      fr: `
        <p>Tu sais déjà coller du texte avec <code>+</code> :</p>
        <pre>console.log("Bonjour " + prenom + ", tu as " + age + " ans.");</pre>
        <p>Ça marche, mais compte les guillemets, les espaces, les <code>+</code>… Une phrase un
        peu longue devient illisible, et il manque toujours une espace quelque part.</p>
        <p>JavaScript propose bien mieux : le <strong>gabarit</strong>. On remplace les
        guillemets par des <strong>accents graves</strong> — la touche à gauche du 1 sur un clavier
        français — et on glisse les variables dans <code>${'${…}'}</code> :</p>
        <pre>console.log(\`Bonjour \${prenom}, tu as \${age} ans.\`);</pre>
        <p>La phrase se lit d’un coup d’œil, exactement comme elle s’affichera.</p>
        <p>Entre les accolades on peut mettre un <strong>calcul</strong>, pas seulement une
        variable :</p>
        <pre>console.log(\`L’an prochain tu auras \${age + 1} ans.\`);</pre>
        <p><strong>Pourquoi ça compte :</strong> tu vas écrire des centaines de phrases qui
        mélangent du texte et des valeurs — un score, un nom, un résultat. Le gabarit est la
        forme que tu emploieras partout, et celle que tu liras dans le code des autres.</p>
      `,
      en: `
        <p>You already know how to glue text with <code>+</code>:</p>
        <pre>console.log("Hello " + prenom + ", you are " + age + ".");</pre>
        <p>It works, but count the quotes, the spaces, the <code>+</code> signs… A slightly long
        sentence becomes unreadable, and a space is always missing somewhere.</p>
        <p>JavaScript offers much better: the <strong>template literal</strong>. Replace the quotes
        with <strong>backticks</strong> and drop variables inside <code>${'${…}'}</code>:</p>
        <pre>console.log(\`Hello \${prenom}, you are \${age}.\`);</pre>
        <p>The sentence reads at a glance, exactly as it will be printed.</p>
        <p>Inside the braces you can put a <strong>calculation</strong>, not just a variable:</p>
        <pre>console.log(\`Next year you will be \${age + 1}.\`);</pre>
        <p><strong>Why it matters:</strong> you will write hundreds of sentences mixing text and
        values — a score, a name, a result. Template literals are the form you will use
        everywhere, and the one you will read in other people’s code.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const prenom = "Lina";\nconst age = 12;\n\nconsole.log("À l’ancienne : " + prenom + " a " + age + " ans.");\nconsole.log(`Avec un gabarit : ${prenom} a ${age} ans.`);\nconsole.log(`Et l’an prochain : ${age + 1} ans.`);',
      },
      note: {
        fr: 'Les deux premières lignes affichent la même chose. Regarde laquelle est la plus facile à lire dans l’éditeur.',
        en: 'The first two lines print the same thing. Look at which one is easier to read in the editor.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Les trois variables sont déjà là. Affiche <strong>une seule ligne</strong> :</p><pre>Théo a eu 17 en maths.</pre><p>Utilise un <strong>gabarit</strong> — les accents graves. Le <code>+</code> est interdit dans ce défi.</p>',
        en: '<p>The three variables are already there. Print <strong>one single line</strong>:</p><pre>Théo a eu 17 en maths.</pre><p>Use a <strong>template literal</strong> — backticks. The <code>+</code> sign is not allowed in this challenge.</p>',
      },
      depart: {
        html: '',
        js: 'const prenom = "Théo";\nconst note = 17;\nconst matiere = "maths";\n\n// Affiche la phrase avec un gabarit\n',
      },
      verifications: [
        { type: 'sortieEgale', valeur: 'Théo a eu 17 en maths.' },
        {
          type: 'codeContient',
          motif: '`',
          message: {
            fr: 'Il faut un gabarit : la phrase doit être entre accents graves, pas entre guillemets.',
            en: 'A template literal is required: the sentence goes between backticks, not quotes.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\+',
          message: {
            fr: 'Le <code>+</code> est interdit ici : tout doit tenir dans le gabarit, avec <code>${…}</code>.',
            en: 'No <code>+</code> here: everything belongs inside the template, using <code>${…}</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Commence par <code>console.log(`</code> — l’accent grave est à gauche du 1.',
          en: 'Start with <code>console.log(`</code> — the backtick key.',
        },
        {
          fr: 'Chaque variable se glisse dans <code>${…}</code>. Il y en a trois à placer.',
          en: 'Each variable goes into <code>${…}</code>. Three of them to place.',
        },
        {
          fr: 'N’oublie pas le point final <em>à l’intérieur</em> du gabarit : <code>… en ${matiere}.`);</code>',
          en: 'Do not forget the full stop <em>inside</em> the template: <code>… en ${matiere}.`);</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const prenom = "Théo";\nconst note = 17;\nconst matiere = "maths";\n\nconsole.log(`${prenom} a eu ${note} en ${matiere}.`);',
      },
    },
  },

  'js-txt-2': {
    langage: 'javascript',
    xp: 20,
    objectif: {
      fr: 'Mesurer, fouiller et découper une chaîne de caractères.',
      en: 'Measure, search and cut a string of characters.',
    },
    explication: {
      fr: `
        <p>Un texte n’est pas un bloc figé : JavaScript sait l’interroger. Voici les quatre
        outils que tu emploieras le plus.</p>
        <p><strong>Sa longueur</strong>, en nombre de caractères :</p>
        <pre>"Bonjour".length   // 7</pre>
        <p><strong>Contient-il ce morceau ?</strong> La réponse est <code>true</code> ou
        <code>false</code> :</p>
        <pre>"Bonjour le monde".includes("monde")   // true</pre>
        <p><strong>Une tranche</strong>, entre deux positions. Attention : on compte
        <strong>à partir de 0</strong>, et la seconde position n’est pas prise :</p>
        <pre>"Bonjour".slice(0, 3)   // "Bon"</pre>
        <p><strong>En majuscules ou en minuscules</strong> :</p>
        <pre>"bonjour".toUpperCase()   // "BONJOUR"
"BONJOUR".toLowerCase()   // "bonjour"</pre>
        <p><strong>Le point important :</strong> aucune de ces méthodes ne modifie le texte
        d’origine. Elles en <em>fabriquent un nouveau</em>. Si tu veux garder le résultat, il faut
        le ranger :</p>
        <pre>const cri = mot.toUpperCase();   // mot n’a pas changé</pre>
        <p>C’est une source d’erreur classique : écrire <code>mot.toUpperCase();</code> tout seul
        ne fait rien du tout.</p>
      `,
      en: `
        <p>Text is not a frozen block: JavaScript can question it. Here are the four tools you
        will use most.</p>
        <p><strong>Its length</strong>, in characters:</p>
        <pre>"Bonjour".length   // 7</pre>
        <p><strong>Does it contain this piece?</strong> The answer is <code>true</code> or
        <code>false</code>:</p>
        <pre>"Bonjour le monde".includes("monde")   // true</pre>
        <p><strong>A slice</strong>, between two positions. Careful: counting starts
        <strong>at 0</strong>, and the second position is not included:</p>
        <pre>"Bonjour".slice(0, 3)   // "Bon"</pre>
        <p><strong>Upper or lower case</strong>:</p>
        <pre>"bonjour".toUpperCase()   // "BONJOUR"
"BONJOUR".toLowerCase()   // "bonjour"</pre>
        <p><strong>The key point:</strong> none of these methods changes the original text. They
        <em>build a new one</em>. To keep the result you must store it:</p>
        <pre>const cri = mot.toUpperCase();   // mot is unchanged</pre>
        <p>This is a classic mistake: writing <code>mot.toUpperCase();</code> on its own does
        absolutely nothing.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const phrase = "Le chat dort sur le canapé";\n\nconsole.log(`Longueur : ${phrase.length}`);\nconsole.log(`Contient "chat" ? ${phrase.includes("chat")}`);\nconsole.log(`Contient "chien" ? ${phrase.includes("chien")}`);\nconsole.log(`Les 7 premiers : ${phrase.slice(0, 7)}`);\nconsole.log(phrase.toUpperCase());',
      },
      note: {
        fr: 'Compte les caractères de « Le chat » : 7, espace comprise. L’espace est un caractère comme un autre.',
        en: 'Count the characters of "Le chat": 7, space included. A space is a character like any other.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La variable <code>mdp</code> contient un mot de passe. Affiche <strong>exactement trois lignes</strong> :</p><pre>Longueur : 11\nContient un chiffre 4 ? true\nDébut : soleil</pre><p>Pour la troisième ligne, prends les <strong>6 premiers caractères</strong>.</p>',
        en: '<p>The <code>mdp</code> variable holds a password. Print <strong>exactly three lines</strong>:</p><pre>Longueur : 11\nContient un chiffre 4 ? true\nDébut : soleil</pre><p>For the third line, take the <strong>first 6 characters</strong>.</p>',
      },
      depart: {
        html: '',
        js: 'const mdp = "soleil2024!";\n\n// Trois console.log : la longueur, la présence du "4", les 6 premiers caractères\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: 'Longueur : 11' },
        { type: 'sortieContient', valeur: 'Contient un chiffre 4 ? true' },
        { type: 'sortieContient', valeur: 'Début : soleil' },
        {
          type: 'codeContient',
          motif: '\\.length',
          message: {
            fr: 'Calcule vraiment la longueur avec <code>mdp.length</code> plutôt que d’écrire 11 à la main.',
            en: 'Actually compute the length with <code>mdp.length</code> instead of typing 11.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.includes\\s*\\(',
          message: {
            fr: 'Utilise <code>mdp.includes("4")</code> pour répondre à la question.',
            en: 'Use <code>mdp.includes("4")</code> to answer the question.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.slice\\s*\\(',
          message: {
            fr: 'La troisième ligne demande <code>mdp.slice(0, 6)</code>.',
            en: 'The third line needs <code>mdp.slice(0, 6)</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Trois lignes, trois <code>console.log</code>. Emploie des gabarits pour mélanger texte et valeur.',
          en: 'Three lines, three <code>console.log</code>. Use template literals to mix text and value.',
        },
        {
          fr: '<code>mdp.includes("4")</code> renvoie déjà <code>true</code> : tu peux le glisser tel quel dans le gabarit.',
          en: '<code>mdp.includes("4")</code> already returns <code>true</code>: drop it straight into the template.',
        },
        {
          fr: '<code>slice(0, 6)</code> part du caractère 0 et s’arrête avant le 6 : ça fait bien six lettres.',
          en: '<code>slice(0, 6)</code> starts at character 0 and stops before 6: that is six letters.',
        },
      ],
      solution: {
        html: '',
        js: 'const mdp = "soleil2024!";\n\nconsole.log(`Longueur : ${mdp.length}`);\nconsole.log(`Contient un chiffre 4 ? ${mdp.includes("4")}`);\nconsole.log(`Début : ${mdp.slice(0, 6)}`);',
      },
    },
  },

  'js-txt-3': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Passer d’une phrase à une liste de mots, et revenir.',
      en: 'Turn a sentence into a list of words, and back again.',
    },
    explication: {
      fr: `
        <p>Deux méthodes se répondent, et elles sont parmi les plus utiles du langage.</p>
        <p><code>split</code> <strong>découpe</strong> un texte à chaque fois qu’il rencontre le
        séparateur, et rend un <strong>tableau</strong> :</p>
        <pre>const phrase = "chat chien lapin";
const animaux = phrase.split(" ");
// ["chat", "chien", "lapin"]</pre>
        <p><code>join</code> fait l’inverse : il <strong>recolle</strong> un tableau en un seul
        texte, avec le séparateur de ton choix :</p>
        <pre>animaux.join(", ")   // "chat, chien, lapin"
animaux.join(" et ")   // "chat et chien et lapin"</pre>
        <p>Une fois le texte découpé, <code>.length</code> compte les <strong>mots</strong> et non
        plus les caractères :</p>
        <pre>phrase.length          // 16 caractères
animaux.length         // 3 mots</pre>
        <p><strong>Pourquoi ça compte :</strong> c’est le passage entre les deux formes du monde
        informatique. Un fichier, un message, une ligne tapée par quelqu’un arrivent toujours sous
        forme de <em>texte</em>. Pour en faire quelque chose, on le découpe en
        <em>données</em>. Et pour le réafficher, on le recolle.</p>
      `,
      en: `
        <p>Two methods answer each other, and they are among the most useful in the language.</p>
        <p><code>split</code> <strong>cuts</strong> a text every time it meets the separator, and
        returns an <strong>array</strong>:</p>
        <pre>const phrase = "chat chien lapin";
const animaux = phrase.split(" ");
// ["chat", "chien", "lapin"]</pre>
        <p><code>join</code> does the opposite: it <strong>glues</strong> an array back into one
        text, with the separator of your choice:</p>
        <pre>animaux.join(", ")   // "chat, chien, lapin"
animaux.join(" et ")   // "chat et chien et lapin"</pre>
        <p>Once the text is cut, <code>.length</code> counts <strong>words</strong>, not
        characters any more:</p>
        <pre>phrase.length          // 16 characters
animaux.length         // 3 words</pre>
        <p><strong>Why it matters:</strong> this is the bridge between the two forms of the
        computing world. A file, a message, a line someone typed always arrive as <em>text</em>.
        To do anything with it, you cut it into <em>data</em>. To show it again, you glue it
        back.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const liste = "pain,beurre,confiture";\nconst courses = liste.split(",");\n\nconsole.log(courses.length);\nconsole.log(courses[0]);\nconsole.log(courses.join(" + "));\nconsole.log(courses.join(" et "));',
      },
      note: {
        fr: 'Le séparateur de découpe (la virgule) n’a rien à voir avec celui de recollage : tu choisis les deux.',
        en: 'The cutting separator (the comma) has nothing to do with the gluing one: you choose both.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La variable <code>phrase</code> contient une phrase. Affiche <strong>deux lignes</strong> :</p><pre>5 mots\nLe-chat-dort-sur-le-canapé</pre><p>C’est-à-dire : le <strong>nombre de mots</strong>, puis la phrase recollée avec des <strong>tirets</strong> à la place des espaces.</p><p>Attention au compte : « Le chat dort sur le canapé » fait <strong>6</strong> mots, pas 5 — c’est à toi de le calculer, pas de l’écrire.</p>',
        en: '<p>The <code>phrase</code> variable holds a sentence. Print <strong>two lines</strong>:</p><pre>5 mots\nLe-chat-dort-sur-le-canapé</pre><p>That is: the <strong>number of words</strong>, then the sentence glued back with <strong>hyphens</strong> instead of spaces.</p><p>Mind the count: "Le chat dort sur le canapé" has <strong>6</strong> words, not 5 — you must compute it, not type it.</p>',
      },
      depart: {
        html: '',
        js: 'const phrase = "Le chat dort sur le canapé";\n\n// Découpe la phrase, compte les mots, puis recolle avec des tirets\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: '6 mots' },
        { type: 'sortieContient', valeur: 'Le-chat-dort-sur-le-canapé' },
        {
          type: 'codeContient',
          motif: '\\.split\\s*\\(',
          message: {
            fr: 'Il faut d’abord découper la phrase avec <code>phrase.split(" ")</code>.',
            en: 'You must first cut the sentence with <code>phrase.split(" ")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.join\\s*\\(',
          message: {
            fr: 'La deuxième ligne se fabrique avec <code>.join("-")</code>, pas en réécrivant la phrase.',
            en: 'The second line is built with <code>.join("-")</code>, not by retyping the sentence.',
          },
        },
      ],
      indices: [
        {
          fr: 'Range le découpage dans une variable : <code>const mots = phrase.split(" ");</code>',
          en: 'Store the split in a variable: <code>const mots = phrase.split(" ");</code>',
        },
        {
          fr: 'Le nombre de mots, c’est <code>mots.length</code> — pas <code>phrase.length</code>.',
          en: 'The word count is <code>mots.length</code> — not <code>phrase.length</code>.',
        },
        {
          fr: 'Pour la seconde ligne : <code>console.log(mots.join("-"));</code>',
          en: 'For the second line: <code>console.log(mots.join("-"));</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const phrase = "Le chat dort sur le canapé";\nconst mots = phrase.split(" ");\n\nconsole.log(`${mots.length} mots`);\nconsole.log(mots.join("-"));',
      },
    },
  },

  'js-txt-4': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Comprendre pourquoi « 2 » + 2 fait 22, et savoir convertir.',
      en: 'Understand why "2" + 2 gives 22, and know how to convert.',
    },
    explication: {
      fr: `
        <p>Lis cette ligne, et devine le résultat :</p>
        <pre>console.log("2" + 2);</pre>
        <p>Ce n’est pas <code>4</code>. C’est <code>22</code>.</p>
        <p>Pourquoi ? Parce que <code>"2"</code> entre guillemets est un <strong>texte</strong>, pas
        un nombre. Et le <code>+</code> appliqué à un texte ne calcule pas : il
        <strong>colle</strong>. JavaScript a transformé le <code>2</code> en <code>"2"</code>, puis
        collé les deux.</p>
        <p>Ce n’est pas un cas rare. <strong>Tout ce que quelqu’un tape dans une page est du
        texte</strong>, même quand ça ressemble à un nombre. Un champ de formulaire qui contient
        <code>7</code> te donne <code>"7"</code>.</p>
        <p>La solution : <strong>convertir</strong> avant de calculer.</p>
        <pre>Number("2") + 2      // 4
parseInt("12ans")    // 12  — s’arrête au premier caractère non numérique
Number("bonjour")    // NaN — « Not a Number », ce n’est pas convertible</pre>
        <p><code>NaN</code> est la façon dont JavaScript dit « je n’ai pas pu ». Si un calcul
        affiche <code>NaN</code>, cherche d’où vient le texte qui n’était pas un nombre.</p>
        <p><strong>Le détail qui surprend :</strong> seul le <code>+</code> a ce double rôle. Avec
        <code>-</code>, <code>*</code> ou <code>/</code>, JavaScript convertit tout seul :
        <code>"10" - 2</code> fait bien <code>8</code>. Raison de plus pour convertir
        explicitement : au moins, ton code dit ce qu’il veut.</p>
      `,
      en: `
        <p>Read this line and guess the result:</p>
        <pre>console.log("2" + 2);</pre>
        <p>It is not <code>4</code>. It is <code>22</code>.</p>
        <p>Why? Because <code>"2"</code> in quotes is <strong>text</strong>, not a number. And
        <code>+</code> applied to text does not add: it <strong>glues</strong>. JavaScript turned
        the <code>2</code> into <code>"2"</code>, then glued the two together.</p>
        <p>This is not a rare case. <strong>Everything someone types into a page is text</strong>,
        even when it looks like a number. A form field holding <code>7</code> gives you
        <code>"7"</code>.</p>
        <p>The fix: <strong>convert</strong> before calculating.</p>
        <pre>Number("2") + 2      // 4
parseInt("12ans")    // 12  — stops at the first non-digit
Number("bonjour")    // NaN — "Not a Number", not convertible</pre>
        <p><code>NaN</code> is how JavaScript says "I could not". If a calculation shows
        <code>NaN</code>, look for the text that was not a number.</p>
        <p><strong>The surprising detail:</strong> only <code>+</code> has this double role. With
        <code>-</code>, <code>*</code> or <code>/</code>, JavaScript converts on its own:
        <code>"10" - 2</code> really is <code>8</code>. All the more reason to convert explicitly:
        at least your code says what it means.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'console.log("2" + 2);\nconsole.log(Number("2") + 2);\nconsole.log("10" - 2);\nconsole.log(parseInt("12ans"));\nconsole.log(Number("bonjour"));',
      },
      note: {
        fr: 'Cinq lignes, cinq surprises. La troisième montre que le moins, lui, convertit tout seul.',
        en: 'Five lines, five surprises. The third shows that minus does convert on its own.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Les deux notes arrivent sous forme de <strong>texte</strong>, comme si elles venaient d’un formulaire. Affiche <strong>une ligne</strong> :</p><pre>Total : 29</pre><p>Si tu additionnes sans convertir, tu obtiendras <code>1712</code>. C’est tout l’objet de la leçon.</p>',
        en: '<p>The two marks arrive as <strong>text</strong>, as if they came from a form. Print <strong>one line</strong>:</p><pre>Total : 29</pre><p>If you add without converting, you will get <code>1712</code>. That is the whole point of this lesson.</p>',
      },
      depart: {
        html: '',
        js: 'const note1 = "17";\nconst note2 = "12";\n\n// Additionne-les vraiment, puis affiche « Total : … »\n',
      },
      verifications: [
        { type: 'sortieEgale', valeur: 'Total : 29' },
        {
          type: 'codeContient',
          motif: 'Number\\s*\\(|parseInt\\s*\\(|parseFloat\\s*\\(',
          message: {
            fr: 'Convertis les textes en nombres avec <code>Number(…)</code> avant de les additionner.',
            en: 'Convert the texts into numbers with <code>Number(…)</code> before adding them.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\b29\\b',
          message: {
            fr: 'Le 29 doit être <em>calculé</em>, pas écrit à la main.',
            en: 'The 29 must be <em>computed</em>, not typed by hand.',
          },
        },
      ],
      indices: [
        {
          fr: '<code>Number(note1)</code> transforme <code>"17"</code> en <code>17</code>.',
          en: '<code>Number(note1)</code> turns <code>"17"</code> into <code>17</code>.',
        },
        {
          fr: 'Range le résultat : <code>const total = Number(note1) + Number(note2);</code>',
          en: 'Store the result: <code>const total = Number(note1) + Number(note2);</code>',
        },
        {
          fr: 'Puis affiche-le avec un gabarit : <code>console.log(`Total : ${total}`);</code>',
          en: 'Then print it with a template: <code>console.log(`Total : ${total}`);</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const note1 = "17";\nconst note2 = "12";\n\nconst total = Number(note1) + Number(note2);\nconsole.log(`Total : ${total}`);',
      },
    },
  },

  /* ============================================= js-tab : les tableaux ==== */

  'js-tab-1': {
    langage: 'javascript',
    xp: 20,
    objectif: {
      fr: 'Ajouter et retirer des éléments dans un tableau qui vit.',
      en: 'Add and remove items in an array that changes.',
    },
    explication: {
      fr: `
        <p>Tu sais créer un tableau et lire une case. Mais un tableau utile n’est pas figé : il
        <strong>grandit et rétrécit</strong> pendant que le programme tourne. Une liste de courses,
        des scores, les messages d’un chat.</p>
        <p><code>push</code> ajoute <strong>à la fin</strong> :</p>
        <pre>const courses = ["pain"];
courses.push("lait");
// ["pain", "lait"]</pre>
        <p><code>pop</code> retire <strong>le dernier</strong>, et te le rend :</p>
        <pre>const retire = courses.pop();
// retire vaut "lait", courses vaut ["pain"]</pre>
        <p>Et <code>length</code> dit combien il y en a <em>en ce moment</em> :</p>
        <pre>courses.length   // 1</pre>
        <p><strong>Une bizarrerie qui va te servir :</strong> on peut faire <code>push</code> sur un
        tableau déclaré avec <code>const</code>. Ce n’est pas une erreur. <code>const</code>
        interdit de <em>remplacer</em> le tableau par un autre, pas d’en <em>modifier le
        contenu</em>. C’est la boîte qui est fixée, pas ce qu’il y a dedans.</p>
        <p>C’est pour ça qu’en JavaScript on déclare presque toujours ses tableaux avec
        <code>const</code>.</p>
      `,
      en: `
        <p>You know how to create an array and read a slot. But a useful array is not frozen: it
        <strong>grows and shrinks</strong> while the program runs. A shopping list, scores, the
        messages in a chat.</p>
        <p><code>push</code> adds <strong>at the end</strong>:</p>
        <pre>const courses = ["pain"];
courses.push("lait");
// ["pain", "lait"]</pre>
        <p><code>pop</code> removes <strong>the last one</strong>, and hands it back:</p>
        <pre>const retire = courses.pop();
// retire is "lait", courses is ["pain"]</pre>
        <p>And <code>length</code> says how many there are <em>right now</em>:</p>
        <pre>courses.length   // 1</pre>
        <p><strong>An oddity that will serve you:</strong> you can <code>push</code> onto an array
        declared with <code>const</code>. That is not a mistake. <code>const</code> forbids
        <em>replacing</em> the array with another one, not <em>changing its contents</em>. The box
        is fixed, not what is inside.</p>
        <p>That is why in JavaScript arrays are almost always declared with <code>const</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const courses = ["pain", "beurre"];\nconsole.log(`Au départ : ${courses.length} articles`);\n\ncourses.push("confiture");\ncourses.push("jus d’orange");\nconsole.log(`Après les ajouts : ${courses.join(", ")}`);\n\nconst oublie = courses.pop();\nconsole.log(`On retire : ${oublie}`);\nconsole.log(`Il reste ${courses.length} articles`);',
      },
      note: {
        fr: '`pop` fait deux choses à la fois : il retire l’élément ET te le rend. Beaucoup de méthodes sont comme ça.',
        en: '`pop` does two things at once: it removes the item AND hands it to you. Many methods work like that.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La file d’attente contient deux personnes. Fais exactement ceci, dans cet ordre :</p><ul><li>ajoute <code>Nour</code> puis <code>Sami</code> à la fin ;</li><li>fais passer la première personne — retire <strong>le dernier</strong> avec <code>pop</code> ;</li><li>affiche une seule ligne : <code>Il reste 3 : Lina, Théo, Nour</code>.</li></ul>',
        en: '<p>The queue holds two people. Do exactly this, in order:</p><ul><li>add <code>Nour</code> then <code>Sami</code> at the end;</li><li>serve one — remove <strong>the last</strong> with <code>pop</code>;</li><li>print a single line: <code>Il reste 3 : Lina, Théo, Nour</code>.</li></ul>',
      },
      depart: {
        html: '',
        js: 'const file = ["Lina", "Théo"];\n\n// Ajoute Nour et Sami, retire le dernier, puis affiche la file\n',
      },
      verifications: [
        { type: 'sortieEgale', valeur: 'Il reste 3 : Lina, Théo, Nour' },
        {
          type: 'codeContient',
          motif: '\\.push\\s*\\(',
          message: {
            fr: 'Ajoute les deux prénoms avec <code>file.push(…)</code>.',
            en: 'Add the two names with <code>file.push(…)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.pop\\s*\\(',
          message: {
            fr: 'Retire le dernier avec <code>file.pop()</code>.',
            en: 'Remove the last one with <code>file.pop()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.length',
          message: {
            fr: 'Le 3 doit venir de <code>file.length</code>, pas d’un chiffre écrit à la main.',
            en: 'The 3 must come from <code>file.length</code>, not a hand-typed digit.',
          },
        },
      ],
      indices: [
        {
          fr: 'Deux <code>push</code> d’abord, un <code>pop</code> ensuite. L’ordre compte.',
          en: 'Two <code>push</code> first, one <code>pop</code> after. Order matters.',
        },
        {
          fr: 'Pour la liste des prénoms : <code>file.join(", ")</code>.',
          en: 'For the list of names: <code>file.join(", ")</code>.',
        },
        {
          fr: 'La ligne finale : <code>console.log(`Il reste ${file.length} : ${file.join(", ")}`);</code>',
          en: 'The final line: <code>console.log(`Il reste ${file.length} : ${file.join(", ")}`);</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const file = ["Lina", "Théo"];\n\nfile.push("Nour");\nfile.push("Sami");\nfile.pop();\n\nconsole.log(`Il reste ${file.length} : ${file.join(", ")}`);',
      },
    },
  },

  'js-tab-2': {
    langage: 'javascript',
    xp: 20,
    objectif: {
      fr: 'Chercher dans un tableau : y est-il, et à quelle place ?',
      en: 'Search an array: is it there, and at what position?',
    },
    explication: {
      fr: `
        <p>Deux questions différentes, deux méthodes.</p>
        <p><strong>« Est-il dedans ? »</strong> — <code>includes</code> répond <code>true</code> ou
        <code>false</code> :</p>
        <pre>const animaux = ["chat", "chien", "lapin"];
animaux.includes("chien")   // true
animaux.includes("poule")   // false</pre>
        <p><strong>« À quelle place ? »</strong> — <code>indexOf</code> rend le
        <strong>numéro de case</strong> :</p>
        <pre>animaux.indexOf("chien")   // 1
animaux.indexOf("poule")   // -1</pre>
        <p>Deux pièges, tous les deux classiques :</p>
        <ul>
          <li>la première case est la case <strong>0</strong>. <code>"chien"</code> est le deuxième
          animal, mais il est à la place 1 ;</li>
          <li>quand ce n’est pas trouvé, <code>indexOf</code> ne rend pas <code>0</code> mais
          <strong><code>-1</code></strong>. C’est exprès : 0 est une place valable, il fallait une
          valeur impossible pour dire « absent ».</li>
        </ul>
        <p><strong>Lequel choisir ?</strong> Si tu veux juste savoir si c’est là, prends
        <code>includes</code> : ton code se lit comme une phrase. Garde <code>indexOf</code> pour
        quand la <em>position</em> t’intéresse vraiment.</p>
      `,
      en: `
        <p>Two different questions, two methods.</p>
        <p><strong>"Is it in there?"</strong> — <code>includes</code> answers <code>true</code> or
        <code>false</code>:</p>
        <pre>const animaux = ["chat", "chien", "lapin"];
animaux.includes("chien")   // true
animaux.includes("poule")   // false</pre>
        <p><strong>"At what position?"</strong> — <code>indexOf</code> returns the
        <strong>slot number</strong>:</p>
        <pre>animaux.indexOf("chien")   // 1
animaux.indexOf("poule")   // -1</pre>
        <p>Two traps, both classics:</p>
        <ul>
          <li>the first slot is slot <strong>0</strong>. <code>"chien"</code> is the second animal,
          but it sits at position 1;</li>
          <li>when not found, <code>indexOf</code> does not return <code>0</code> but
          <strong><code>-1</code></strong>. That is deliberate: 0 is a valid position, so an
          impossible value was needed for "absent".</li>
        </ul>
        <p><strong>Which one?</strong> If you only need to know whether it is there, use
        <code>includes</code>: your code reads like a sentence. Keep <code>indexOf</code> for when
        the <em>position</em> really matters.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const equipe = ["Lina", "Théo", "Nour", "Sami"];\n\nconsole.log(`Nour est là ? ${equipe.includes("Nour")}`);\nconsole.log(`Zoé est là ? ${equipe.includes("Zoé")}`);\nconsole.log(`Nour est à la place ${equipe.indexOf("Nour")}`);\nconsole.log(`Et Zoé : ${equipe.indexOf("Zoé")}`);\nconsole.log(`Lina est premier, place ${equipe.indexOf("Lina")}`);',
      },
      note: {
        fr: 'Lina est le premier prénom et il est à la place 0. C’est le décalage qu’il faut avoir en tête toute sa vie de programmeur.',
        en: 'Lina is the first name and sits at position 0. That offset is one to keep in mind forever.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Voici les élèves inscrits au club informatique. Affiche <strong>deux lignes</strong> :</p><pre>Sami est inscrit : true\nIl est le numéro 3</pre><p>Le numéro affiché doit être la <strong>place dans la liste + 1</strong> — parce qu’on compte à partir de 1 quand on parle à un humain, mais à partir de 0 quand on parle à la machine.</p>',
        en: '<p>Here are the students in the computing club. Print <strong>two lines</strong>:</p><pre>Sami est inscrit : true\nIl est le numéro 3</pre><p>The printed number must be the <strong>position in the list + 1</strong> — because humans count from 1 while the machine counts from 0.</p>',
      },
      depart: {
        html: '',
        js: 'const club = ["Lina", "Théo", "Sami", "Nour"];\n\n// Est-il inscrit ? Et à quel numéro, vu par un humain ?\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Sami est inscrit : true' },
        { type: 'sortieContient', valeur: 'Il est le numéro 3' },
        {
          type: 'codeContient',
          motif: '\\.includes\\s*\\(',
          message: {
            fr: 'La première ligne se répond avec <code>club.includes("Sami")</code>.',
            en: 'The first line is answered with <code>club.includes("Sami")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.indexOf\\s*\\(',
          message: {
            fr: 'La place se trouve avec <code>club.indexOf("Sami")</code>.',
            en: 'The position comes from <code>club.indexOf("Sami")</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\bnuméro 3\\b',
          message: {
            fr: 'Le 3 doit être calculé à partir de <code>indexOf</code>, pas écrit dans le texte.',
            en: 'The 3 must be computed from <code>indexOf</code>, not typed into the text.',
          },
        },
      ],
      indices: [
        {
          fr: 'Sami est le troisième de la liste, donc <code>indexOf</code> rend <code>2</code>.',
          en: 'Sami is third in the list, so <code>indexOf</code> returns <code>2</code>.',
        },
        {
          fr: 'Dans un gabarit, tu peux calculer : <code>${club.indexOf("Sami") + 1}</code>.',
          en: 'Inside a template you can compute: <code>${club.indexOf("Sami") + 1}</code>.',
        },
        {
          fr: 'Deux lignes : <code>console.log(`Sami est inscrit : ${club.includes("Sami")}`);</code> puis la seconde.',
          en: 'Two lines: <code>console.log(`Sami est inscrit : ${club.includes("Sami")}`);</code> then the second.',
        },
      ],
      solution: {
        html: '',
        js: 'const club = ["Lina", "Théo", "Sami", "Nour"];\n\nconsole.log(`Sami est inscrit : ${club.includes("Sami")}`);\nconsole.log(`Il est le numéro ${club.indexOf("Sami") + 1}`);',
      },
    },
  },

  'js-tab-3': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Parcourir un tableau sans compteur, avec for…of.',
      en: 'Walk through an array without a counter, using for…of.',
    },
    explication: {
      fr: `
        <p>Tu connais la boucle <code>for</code> classique :</p>
        <pre>for (let i = 0; i &lt; animaux.length; i++) {
  console.log(animaux[i]);
}</pre>
        <p>Elle marche, mais regarde tout ce qu’il faut écrire juste pour lire une liste : un
        compteur, une condition, une incrémentation, des crochets. Quatre occasions de se
        tromper — et la plus fréquente, <code>&lt;=</code> au lieu de <code>&lt;</code>, te fait
        sortir du tableau.</p>
        <p><code>for…of</code> dit la même chose, en français presque :</p>
        <pre>for (const animal of animaux) {
  console.log(animal);
}</pre>
        <p>« Pour chaque <code>animal</code> parmi les <code>animaux</code>. » Plus de compteur,
        plus de crochets, plus de risque de sortir du tableau.</p>
        <p><strong>Quand garder l’ancienne forme ?</strong> Quand tu as besoin du
        <em>numéro</em> de la case — pour afficher « 1. », « 2. », « 3. » devant chaque ligne, par
        exemple. Le reste du temps, <code>for…of</code> est plus clair.</p>
        <p><strong>Le détail qui compte :</strong> <code>const animal</code> à l’intérieur ne pose
        aucun problème, alors qu’on change de valeur à chaque tour. C’est qu’une
        <strong>nouvelle</strong> variable <code>animal</code> est créée à chaque tour de boucle :
        elle n’est jamais modifiée, seulement recréée.</p>
      `,
      en: `
        <p>You know the classic <code>for</code> loop:</p>
        <pre>for (let i = 0; i &lt; animaux.length; i++) {
  console.log(animaux[i]);
}</pre>
        <p>It works, but look at everything you must write just to read a list: a counter, a
        condition, an increment, brackets. Four chances to get it wrong — and the most common,
        <code>&lt;=</code> instead of <code>&lt;</code>, walks you off the end of the array.</p>
        <p><code>for…of</code> says the same thing, almost in plain English:</p>
        <pre>for (const animal of animaux) {
  console.log(animal);
}</pre>
        <p>"For each <code>animal</code> of the <code>animaux</code>." No counter, no brackets, no
        way to run off the end.</p>
        <p><strong>When keep the old form?</strong> When you need the <em>slot number</em> — to
        print "1.", "2.", "3." in front of each line, for instance. The rest of the time,
        <code>for…of</code> is clearer.</p>
        <p><strong>The detail that matters:</strong> <code>const animal</code> inside causes no
        problem, even though the value changes each round. That is because a <strong>new</strong>
        <code>animal</code> variable is created on every pass: it is never modified, only
        recreated.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const notes = [12, 17, 9, 15];\n\nlet total = 0;\nfor (const note of notes) {\n  console.log(`Note : ${note}`);\n  total = total + note;\n}\n\nconsole.log(`Total : ${total}`);\nconsole.log(`Moyenne : ${total / notes.length}`);',
      },
      note: {
        fr: 'La variable `total` est déclarée AVANT la boucle : si elle était dedans, elle repartirait de zéro à chaque tour.',
        en: 'The `total` variable is declared BEFORE the loop: inside, it would reset to zero every round.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Parcours les températures avec <strong><code>for…of</code></strong> et affiche <strong>une ligne par jour</strong>, plus une dernière ligne :</p><pre>18 degrés\n21 degrés\n16 degrés\n24 degrés\nLa plus chaude : 24</pre><p>La plus chaude doit être <strong>trouvée par la boucle</strong>, pas lue à l’œil.</p>',
        en: '<p>Walk through the temperatures with <strong><code>for…of</code></strong> and print <strong>one line per day</strong>, plus a final line:</p><pre>18 degrés\n21 degrés\n16 degrés\n24 degrés\nLa plus chaude : 24</pre><p>The warmest must be <strong>found by the loop</strong>, not read by eye.</p>',
      },
      depart: {
        html: '',
        js: 'const temperatures = [18, 21, 16, 24];\nlet maximum = 0;\n\n// Parcours le tableau avec for…of\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 5 },
        { type: 'sortieContient', valeur: '18 degrés' },
        { type: 'sortieContient', valeur: '16 degrés' },
        { type: 'sortieContient', valeur: 'La plus chaude : 24' },
        {
          type: 'codeContient',
          motif: 'for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\s+',
          message: {
            fr: 'Ce défi demande une boucle <code>for…of</code>, pas une boucle à compteur.',
            en: 'This challenge asks for a <code>for…of</code> loop, not a counter loop.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'chaude\\s*:\\s*24',
          message: {
            fr: 'Le maximum doit être calculé par la boucle, pas écrit dans le texte.',
            en: 'The maximum must be computed by the loop, not typed into the text.',
          },
        },
      ],
      indices: [
        {
          fr: 'La boucle s’écrit <code>for (const t of temperatures) {</code>.',
          en: 'The loop reads <code>for (const t of temperatures) {</code>.',
        },
        {
          fr: 'À l’intérieur, affiche la ligne, puis compare : <code>if (t > maximum) { maximum = t; }</code>',
          en: 'Inside, print the line, then compare: <code>if (t > maximum) { maximum = t; }</code>',
        },
        {
          fr: 'La dernière ligne vient APRÈS la boucle, une fois toutes les valeurs vues.',
          en: 'The last line comes AFTER the loop, once every value has been seen.',
        },
      ],
      solution: {
        html: '',
        js: 'const temperatures = [18, 21, 16, 24];\nlet maximum = 0;\n\nfor (const t of temperatures) {\n  console.log(`${t} degrés`);\n  if (t > maximum) {\n    maximum = t;\n  }\n}\n\nconsole.log(`La plus chaude : ${maximum}`);',
      },
    },
  },

  'js-tab-4': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Trier un tableau — et découvrir pourquoi sort() se trompe sur les nombres.',
      en: 'Sort an array — and find out why sort() gets numbers wrong.',
    },
    explication: {
      fr: `
        <p>Trier des mots est simple :</p>
        <pre>["chat", "abeille", "zèbre"].sort()
// ["abeille", "chat", "zèbre"]</pre>
        <p>Maintenant, essaie avec des nombres. Prends le temps de deviner le résultat :</p>
        <pre>[10, 9, 100, 2].sort()</pre>
        <p>Tu attendais <code>[2, 9, 10, 100]</code>. Tu obtiens
        <strong><code>[10, 100, 2, 9]</code></strong>.</p>
        <p>Ce n’est pas un bug. <code>sort()</code> range par défaut <strong>comme un
        dictionnaire</strong> : il transforme chaque valeur en texte et compare caractère par
        caractère. Et dans un dictionnaire, <code>"10"</code> vient avant <code>"2"</code>, parce
        que le <code>1</code> vient avant le <code>2</code>. Exactement comme
        <em>« abricot »</em> vient avant <em>« banane »</em>.</p>
        <p>Pour trier des nombres, il faut <strong>expliquer à <code>sort</code> comment
        comparer</strong> :</p>
        <pre>[10, 9, 100, 2].sort((a, b) =&gt; a - b)
// [2, 9, 10, 100]   du plus petit au plus grand

[10, 9, 100, 2].sort((a, b) =&gt; b - a)
// [100, 10, 9, 2]   du plus grand au plus petit</pre>
        <p>La règle : si <code>a - b</code> est négatif, <code>a</code> passe devant. C’est tout.
        Tu rencontreras cette forme partout, retiens-la telle quelle.</p>
        <p><strong>Un piège de plus :</strong> <code>sort</code> <strong>modifie le tableau
        d’origine</strong>, contrairement aux méthodes de texte de tout à l’heure. Après un tri,
        l’ancien ordre est perdu.</p>
      `,
      en: `
        <p>Sorting words is simple:</p>
        <pre>["chat", "abeille", "zèbre"].sort()
// ["abeille", "chat", "zèbre"]</pre>
        <p>Now try with numbers. Take a moment to guess the result:</p>
        <pre>[10, 9, 100, 2].sort()</pre>
        <p>You expected <code>[2, 9, 10, 100]</code>. You get
        <strong><code>[10, 100, 2, 9]</code></strong>.</p>
        <p>This is not a bug. By default <code>sort()</code> orders things <strong>like a
        dictionary</strong>: it turns each value into text and compares character by character.
        And in a dictionary <code>"10"</code> comes before <code>"2"</code>, because
        <code>1</code> comes before <code>2</code>. Exactly as <em>"apricot"</em> comes before
        <em>"banana"</em>.</p>
        <p>To sort numbers you must <strong>tell <code>sort</code> how to compare</strong>:</p>
        <pre>[10, 9, 100, 2].sort((a, b) =&gt; a - b)
// [2, 9, 10, 100]   smallest to largest

[10, 9, 100, 2].sort((a, b) =&gt; b - a)
// [100, 10, 9, 2]   largest to smallest</pre>
        <p>The rule: if <code>a - b</code> is negative, <code>a</code> goes first. That is all. You
        will meet this form everywhere — remember it as it is.</p>
        <p><strong>One more trap:</strong> <code>sort</code> <strong>modifies the original
        array</strong>, unlike the text methods from earlier. After a sort, the old order is
        gone.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const scores = [10, 9, 100, 2];\n\nconsole.log(`Tri par défaut : ${[...scores].sort().join(", ")}`);\nconsole.log(`Croissant      : ${[...scores].sort((a, b) => a - b).join(", ")}`);\nconsole.log(`Décroissant    : ${[...scores].sort((a, b) => b - a).join(", ")}`);\n\nconst mots = ["chat", "abeille", "zèbre"];\nconsole.log(`Des mots       : ${mots.sort().join(", ")}`);',
      },
      note: {
        fr: 'Le `[...scores]` fabrique une copie : sans lui, le premier tri abîmerait le tableau et les suivants partiraient d’un ordre déjà changé.',
        en: 'The `[...scores]` makes a copy: without it the first sort would damage the array and the next ones would start from an already-changed order.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Voici les scores d’une partie. Affiche <strong>deux lignes</strong> :</p><pre>Podium : 120, 95, 40\nMeilleur score : 120</pre><p>La première ligne est le tableau trié <strong>du plus grand au plus petit</strong>. La seconde est simplement la première case du tableau trié.</p>',
        en: '<p>Here are the scores of a game. Print <strong>two lines</strong>:</p><pre>Podium : 120, 95, 40\nMeilleur score : 120</pre><p>The first line is the array sorted <strong>from largest to smallest</strong>. The second is simply the first slot of the sorted array.</p>',
      },
      depart: {
        html: '',
        js: 'const scores = [95, 40, 120];\n\n// Trie du plus grand au plus petit, puis affiche les deux lignes\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Podium : 120, 95, 40' },
        { type: 'sortieContient', valeur: 'Meilleur score : 120' },
        {
          type: 'codeContient',
          motif: '\\.sort\\s*\\(\\s*\\(',
          message: {
            fr: 'Un <code>sort()</code> nu trierait comme un dictionnaire. Donne-lui une comparaison : <code>sort((a, b) => b - a)</code>.',
            en: 'A bare <code>sort()</code> would sort like a dictionary. Give it a comparison: <code>sort((a, b) => b - a)</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '120\\s*,\\s*95',
          message: {
            fr: 'Le podium doit être trié par le code, pas écrit dans le bon ordre à la main.',
            en: 'The podium must be sorted by code, not typed in the right order by hand.',
          },
        },
      ],
      indices: [
        {
          fr: 'Du plus grand au plus petit, c’est <code>(a, b) => b - a</code>.',
          en: 'Largest to smallest is <code>(a, b) => b - a</code>.',
        },
        {
          fr: 'Range le résultat : <code>const classement = scores.sort((a, b) => b - a);</code>',
          en: 'Store the result: <code>const classement = scores.sort((a, b) => b - a);</code>',
        },
        {
          fr: 'Le meilleur est la première case du tableau trié : <code>classement[0]</code>.',
          en: 'The best is the first slot of the sorted array: <code>classement[0]</code>.',
        },
      ],
      solution: {
        html: '',
        js: 'const scores = [95, 40, 120];\n\nconst classement = scores.sort((a, b) => b - a);\n\nconsole.log(`Podium : ${classement.join(", ")}`);\nconsole.log(`Meilleur score : ${classement[0]}`);',
      },
    },
  },

  /* =============================================== js-obj : les objets ==== */

  'js-obj-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Ranger plusieurs informations qui vont ensemble dans un seul objet.',
      en: 'Store several pieces of information that belong together in one object.',
    },
    explication: {
      fr: `
        <p>Imagine décrire un élève avec ce que tu connais :</p>
        <pre>const nom = "Lina";
const age = 12;
const classe = "5e B";</pre>
        <p>Trois variables sans lien. Ajoute un deuxième élève et tu auras <code>nom2</code>,
        <code>age2</code>, <code>classe2</code>… Au dixième, c’est ingérable.</p>
        <p>Un <strong>objet</strong> regroupe ces informations sous un seul nom :</p>
        <pre>const eleve = {
  nom: "Lina",
  age: 12,
  classe: "5e B"
};</pre>
        <p>Chaque information est une <strong>propriété</strong> : un nom, deux points, une valeur,
        une virgule entre chacune. On les lit avec un <strong>point</strong> :</p>
        <pre>console.log(eleve.nom);     // "Lina"
console.log(eleve.age);     // 12</pre>
        <p><strong>Objet ou tableau ?</strong> La question se tranche en une phrase :</p>
        <ul>
          <li>un <strong>tableau</strong> range des choses <em>du même genre</em>, et l’ordre
          compte : des notes, des prénoms, des scores ;</li>
          <li>un <strong>objet</strong> range des choses <em>différentes</em> qui décrivent
          <em>une seule</em> chose, et l’ordre n’a aucune importance : un nom, un âge, une
          classe.</li>
        </ul>
        <p>Une note dans un tableau se trouve par sa place, <code>notes[2]</code>. Une propriété
        dans un objet se trouve par son nom, <code>eleve.age</code> — et un nom, ça se retient.</p>
      `,
      en: `
        <p>Imagine describing a student with what you know:</p>
        <pre>const nom = "Lina";
const age = 12;
const classe = "5e B";</pre>
        <p>Three unrelated variables. Add a second student and you get <code>nom2</code>,
        <code>age2</code>, <code>classe2</code>… By the tenth, it is unmanageable.</p>
        <p>An <strong>object</strong> gathers that information under a single name:</p>
        <pre>const eleve = {
  nom: "Lina",
  age: 12,
  classe: "5e B"
};</pre>
        <p>Each piece is a <strong>property</strong>: a name, a colon, a value, a comma between
        them. You read them with a <strong>dot</strong>:</p>
        <pre>console.log(eleve.nom);     // "Lina"
console.log(eleve.age);     // 12</pre>
        <p><strong>Object or array?</strong> One sentence settles it:</p>
        <ul>
          <li>an <strong>array</strong> holds things <em>of the same kind</em>, and order matters:
          marks, names, scores;</li>
          <li>an <strong>object</strong> holds <em>different</em> things describing <em>one
          single</em> thing, and order does not matter at all: a name, an age, a class.</li>
        </ul>
        <p>A mark in an array is found by its position, <code>notes[2]</code>. A property in an
        object is found by its name, <code>eleve.age</code> — and a name is something you can
        remember.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const jeu = {\n  titre: "Devine le nombre",\n  auteur: "Théo",\n  niveaux: 5,\n  termine: false\n};\n\nconsole.log(jeu);\nconsole.log(`${jeu.titre}, par ${jeu.auteur}`);\nconsole.log(`${jeu.niveaux} niveaux, terminé : ${jeu.termine}`);',
      },
      note: {
        fr: 'La première ligne affiche l’objet entier : la console te montre sa forme, propriété par propriété. C’est très pratique pour vérifier ce qu’il contient vraiment.',
        en: 'The first line prints the whole object: the console shows you its shape, property by property. Very handy to check what it really holds.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée un objet <code>livre</code> avec exactement ces trois propriétés :</p><ul><li><code>titre</code> → <code>Le Petit Prince</code></li><li><code>auteur</code> → <code>Saint-Exupéry</code></li><li><code>pages</code> → <code>96</code> (un nombre, pas du texte)</li></ul><p>Puis affiche une seule ligne :</p><pre>Le Petit Prince, de Saint-Exupéry, 96 pages</pre>',
        en: '<p>Create a <code>livre</code> object with exactly these three properties:</p><ul><li><code>titre</code> → <code>Le Petit Prince</code></li><li><code>auteur</code> → <code>Saint-Exupéry</code></li><li><code>pages</code> → <code>96</code> (a number, not text)</li></ul><p>Then print a single line:</p><pre>Le Petit Prince, de Saint-Exupéry, 96 pages</pre>',
      },
      depart: {
        html: '',
        js: '// Crée l’objet livre, puis affiche la phrase\nconst livre = {\n\n};\n',
      },
      verifications: [
        { type: 'sortieEgale', valeur: 'Le Petit Prince, de Saint-Exupéry, 96 pages' },
        {
          type: 'codeContient',
          motif: 'titre\\s*:',
          message: {
            fr: 'L’objet doit avoir une propriété <code>titre</code>.',
            en: 'The object needs a <code>titre</code> property.',
          },
        },
        {
          type: 'codeContient',
          motif: 'auteur\\s*:',
          message: {
            fr: 'L’objet doit avoir une propriété <code>auteur</code>.',
            en: 'The object needs an <code>auteur</code> property.',
          },
        },
        {
          type: 'codeContient',
          motif: 'pages\\s*:\\s*96',
          message: {
            fr: 'La propriété <code>pages</code> doit valoir le nombre <code>96</code>, sans guillemets.',
            en: 'The <code>pages</code> property must be the number <code>96</code>, without quotes.',
          },
        },
        {
          type: 'codeContient',
          motif: 'livre\\.titre',
          message: {
            fr: 'Affiche la phrase à partir de l’objet : <code>livre.titre</code>, et non le texte recopié.',
            en: 'Build the sentence from the object: <code>livre.titre</code>, not copied text.',
          },
        },
      ],
      indices: [
        {
          fr: 'Dans les accolades : <code>titre: "Le Petit Prince",</code> puis les deux autres, séparées par des virgules.',
          en: 'Inside the braces: <code>titre: "Le Petit Prince",</code> then the other two, comma-separated.',
        },
        {
          fr: 'Pas de guillemets autour de 96 : c’est un nombre, on veut pouvoir le calculer plus tard.',
          en: 'No quotes around 96: it is a number, we may want to compute with it later.',
        },
        {
          fr: 'La phrase : <code>console.log(`${livre.titre}, de ${livre.auteur}, ${livre.pages} pages`);</code>',
          en: 'The sentence: <code>console.log(`${livre.titre}, de ${livre.auteur}, ${livre.pages} pages`);</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const livre = {\n  titre: "Le Petit Prince",\n  auteur: "Saint-Exupéry",\n  pages: 96\n};\n\nconsole.log(`${livre.titre}, de ${livre.auteur}, ${livre.pages} pages`);',
      },
    },
  },

  'js-obj-2': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Modifier une propriété, en ajouter une, et savoir si elle existe.',
      en: 'Change a property, add one, and know whether it exists.',
    },
    explication: {
      fr: `
        <p>Un objet n’est pas figé non plus. On <strong>modifie</strong> une propriété comme une
        variable :</p>
        <pre>joueur.score = 120;
joueur.score = joueur.score + 10;   // 130</pre>
        <p>Et on en <strong>ajoute</strong> une qui n’existait pas, exactement de la même façon :</p>
        <pre>joueur.niveau = 3;   // elle n’était pas là, elle y est maintenant</pre>
        <p>C’est troublant au début : rien ne distingue « je modifie » de « je crée ». JavaScript
        ne te prévient pas. Une faute de frappe — <code>joueur.scrore = 120</code> — ne provoque
        aucune erreur : elle crée sagement une propriété <code>scrore</code> que personne ne lira
        jamais. C’est une source de bugs très courante, et le moyen de les trouver est
        <code>console.log(joueur)</code>, qui montre l’objet réel.</p>
        <p>Et si on lit une propriété qui n’existe pas ?</p>
        <pre>console.log(joueur.couleur);   // undefined</pre>
        <p><code>undefined</code> — « pas défini ». Ce n’est pas une erreur, c’est une réponse : la
        propriété n’existe pas.</p>
        <p>D’où la façon de poser la question :</p>
        <pre>if (joueur.niveau === undefined) {
  console.log("Ce joueur n’a pas encore de niveau.");
}</pre>
        <p><strong>Comme pour les tableaux</strong>, <code>const</code> n’empêche pas tout ça :
        il interdit de remplacer l’objet entier, pas d’en changer le contenu.</p>
      `,
      en: `
        <p>An object is not frozen either. You <strong>change</strong> a property like a
        variable:</p>
        <pre>joueur.score = 120;
joueur.score = joueur.score + 10;   // 130</pre>
        <p>And you <strong>add</strong> one that did not exist, in exactly the same way:</p>
        <pre>joueur.niveau = 3;   // it was not there, now it is</pre>
        <p>This is unsettling at first: nothing separates "I change" from "I create". JavaScript
        does not warn you. A typo — <code>joueur.scrore = 120</code> — raises no error: it quietly
        creates a <code>scrore</code> property that nobody will ever read. A very common source of
        bugs, and the way to find them is <code>console.log(joueur)</code>, which shows the real
        object.</p>
        <p>And if you read a property that does not exist?</p>
        <pre>console.log(joueur.couleur);   // undefined</pre>
        <p><code>undefined</code> — "not defined". Not an error, an answer: the property does not
        exist.</p>
        <p>Hence the way to ask:</p>
        <pre>if (joueur.niveau === undefined) {
  console.log("This player has no level yet.");
}</pre>
        <p><strong>As with arrays</strong>, <code>const</code> prevents none of this: it forbids
        replacing the whole object, not changing its contents.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const joueur = { nom: "Nour", score: 0 };\n\njoueur.score = 120;\njoueur.score = joueur.score + 30;\njoueur.niveau = 3;\n\nconsole.log(joueur);\nconsole.log(`Couleur : ${joueur.couleur}`);\nconsole.log(`A-t-il une couleur ? ${joueur.couleur !== undefined}`);',
      },
      note: {
        fr: 'La propriété `niveau` n’existait pas dans la déclaration : la ligne qui la « modifie » l’a en fait créée.',
        en: 'The `niveau` property was not in the declaration: the line that "changes" it actually created it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le compte de Théo existe déjà. Fais trois choses :</p><ul><li>ajoute <strong>15</strong> à son <code>score</code> ;</li><li>ajoute-lui une propriété <code>badge</code> valant <code>Chasseur de bugs</code> ;</li><li>affiche <strong>deux lignes</strong> :</li></ul><pre>Théo : 55 points\nBadge : Chasseur de bugs</pre>',
        en: '<p>Théo’s account already exists. Do three things:</p><ul><li>add <strong>15</strong> to his <code>score</code>;</li><li>give him a <code>badge</code> property holding <code>Chasseur de bugs</code>;</li><li>print <strong>two lines</strong>:</li></ul><pre>Théo : 55 points\nBadge : Chasseur de bugs</pre>',
      },
      depart: {
        html: '',
        js: 'const compte = { nom: "Théo", score: 40 };\n\n// Ajoute 15 au score, donne-lui un badge, puis affiche les deux lignes\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Théo : 55 points' },
        { type: 'sortieContient', valeur: 'Badge : Chasseur de bugs' },
        {
          type: 'codeContient',
          motif: 'compte\\.score\\s*=',
          message: {
            fr: 'Le score doit vraiment être modifié dans l’objet : <code>compte.score = …</code>.',
            en: 'The score must really change inside the object: <code>compte.score = …</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'compte\\.badge\\s*=',
          message: {
            fr: 'Ajoute la propriété avec <code>compte.badge = "Chasseur de bugs";</code>.',
            en: 'Add the property with <code>compte.badge = "Chasseur de bugs";</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\b55\\b',
          message: {
            fr: 'Le 55 doit être calculé (40 + 15), pas écrit à la main.',
            en: 'The 55 must be computed (40 + 15), not typed by hand.',
          },
        },
      ],
      indices: [
        {
          fr: 'Pour ajouter au score : <code>compte.score = compte.score + 15;</code>',
          en: 'To add to the score: <code>compte.score = compte.score + 15;</code>',
        },
        {
          fr: 'Le badge n’existe pas encore : l’écrire suffit à le créer.',
          en: 'The badge does not exist yet: writing it is enough to create it.',
        },
        {
          fr: 'Les deux lignes lisent l’objet : <code>${compte.nom}</code>, <code>${compte.score}</code>, <code>${compte.badge}</code>.',
          en: 'Both lines read the object: <code>${compte.nom}</code>, <code>${compte.score}</code>, <code>${compte.badge}</code>.',
        },
      ],
      solution: {
        html: '',
        js: 'const compte = { nom: "Théo", score: 40 };\n\ncompte.score = compte.score + 15;\ncompte.badge = "Chasseur de bugs";\n\nconsole.log(`${compte.nom} : ${compte.score} points`);\nconsole.log(`Badge : ${compte.badge}`);',
      },
    },
  },

  'js-obj-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Assembler objets et tableaux : la vraie forme d’une liste de données.',
      en: 'Combine objects and arrays: the real shape of a data list.',
    },
    explication: {
      fr: `
        <p>Voici la structure la plus courante de toute la programmation : un
        <strong>tableau d’objets</strong>.</p>
        <pre>const eleves = [
  { nom: "Lina", note: 17 },
  { nom: "Théo", note: 12 },
  { nom: "Nour", note: 15 }
];</pre>
        <p>Un tableau, parce qu’il y a plusieurs élèves et que l’ordre existe. Des objets dedans,
        parce que chaque élève a un nom <em>et</em> une note.</p>
        <p>Pour atteindre une valeur, on combine les deux notations — crochets pour la place,
        point pour la propriété :</p>
        <pre>eleves[0].nom      // "Lina"
eleves[2].note     // 15</pre>
        <p>Et pour tout parcourir, <code>for…of</code> fonctionne exactement pareil : chaque tour
        te donne un objet complet.</p>
        <pre>for (const eleve of eleves) {
  console.log(\`\${eleve.nom} : \${eleve.note}\`);
}</pre>
        <p><strong>Pourquoi ça compte :</strong> c’est la forme que prennent les données partout —
        une liste de contacts, de produits, de messages, de scores. Un fichier téléchargé depuis un
        site aura très exactement cette allure. Savoir la parcourir, c’est savoir traiter des
        données réelles.</p>
      `,
      en: `
        <p>Here is the most common structure in all of programming: an <strong>array of
        objects</strong>.</p>
        <pre>const eleves = [
  { nom: "Lina", note: 17 },
  { nom: "Théo", note: 12 },
  { nom: "Nour", note: 15 }
];</pre>
        <p>An array, because there are several students and order exists. Objects inside, because
        each student has a name <em>and</em> a mark.</p>
        <p>To reach a value you combine both notations — brackets for the position, dot for the
        property:</p>
        <pre>eleves[0].nom      // "Lina"
eleves[2].note     // 15</pre>
        <p>And to walk through it all, <code>for…of</code> works exactly the same: each round hands
        you a whole object.</p>
        <pre>for (const eleve of eleves) {
  console.log(\`\${eleve.nom} : \${eleve.note}\`);
}</pre>
        <p><strong>Why it matters:</strong> this is the shape data takes everywhere — a list of
        contacts, products, messages, scores. A file downloaded from a website will look exactly
        like this. Knowing how to walk it is knowing how to handle real data.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const equipe = [\n  { nom: "Lina", points: 17 },\n  { nom: "Théo", points: 12 },\n  { nom: "Nour", points: 15 }\n];\n\nconsole.log(`Premier de la liste : ${equipe[0].nom}`);\n\nlet total = 0;\nfor (const membre of equipe) {\n  console.log(`${membre.nom} marque ${membre.points}`);\n  total = total + membre.points;\n}\nconsole.log(`Total de l’équipe : ${total}`);',
      },
      note: {
        fr: 'Chaque tour de boucle range un objet entier dans `membre`. On lit ensuite ses propriétés avec un point, comme d’habitude.',
        en: 'Each round of the loop stores a whole object in `membre`. You then read its properties with a dot, as usual.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le catalogue contient trois articles. Parcours-le et affiche <strong>une ligne par article</strong>, puis une dernière ligne avec le total :</p><pre>Cahier : 3 euros\nStylo : 2 euros\nClasseur : 5 euros\nTotal : 10 euros</pre>',
        en: '<p>The catalogue holds three items. Walk through it and print <strong>one line per item</strong>, then a final line with the total:</p><pre>Cahier : 3 euros\nStylo : 2 euros\nClasseur : 5 euros\nTotal : 10 euros</pre>',
      },
      depart: {
        html: '',
        js: 'const catalogue = [\n  { nom: "Cahier", prix: 3 },\n  { nom: "Stylo", prix: 2 },\n  { nom: "Classeur", prix: 5 }\n];\nlet total = 0;\n\n// Parcours le catalogue\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 4 },
        { type: 'sortieContient', valeur: 'Cahier : 3 euros' },
        { type: 'sortieContient', valeur: 'Classeur : 5 euros' },
        { type: 'sortieContient', valeur: 'Total : 10 euros' },
        {
          type: 'codeContient',
          motif: 'for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\s+',
          message: {
            fr: 'Parcours le catalogue avec une boucle <code>for…of</code> plutôt que de recopier les trois lignes.',
            en: 'Walk the catalogue with a <code>for…of</code> loop rather than retyping the three lines.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'Total\\s*:\\s*10',
          message: {
            fr: 'Le total doit être calculé pendant la boucle, pas écrit dans le texte.',
            en: 'The total must be computed during the loop, not typed into the text.',
          },
        },
      ],
      indices: [
        {
          fr: '<code>for (const article of catalogue) {</code> — chaque tour te donne un objet.',
          en: '<code>for (const article of catalogue) {</code> — each round hands you an object.',
        },
        {
          fr: 'Dans la boucle : <code>article.nom</code> et <code>article.prix</code>.',
          en: 'Inside the loop: <code>article.nom</code> and <code>article.prix</code>.',
        },
        {
          fr: 'Cumule avec <code>total = total + article.prix;</code>, et affiche le total APRÈS la boucle.',
          en: 'Accumulate with <code>total = total + article.prix;</code>, and print the total AFTER the loop.',
        },
      ],
      solution: {
        html: '',
        js: 'const catalogue = [\n  { nom: "Cahier", prix: 3 },\n  { nom: "Stylo", prix: 2 },\n  { nom: "Classeur", prix: 5 }\n];\nlet total = 0;\n\nfor (const article of catalogue) {\n  console.log(`${article.nom} : ${article.prix} euros`);\n  total = total + article.prix;\n}\n\nconsole.log(`Total : ${total} euros`);',
      },
    },
  },

  'js-obj-4': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Transformer un objet en texte et revenir : JSON, le format universel.',
      en: 'Turn an object into text and back: JSON, the universal format.',
    },
    explication: {
      fr: `
        <p>Un objet vit dans la mémoire du programme. Mais pour l’<strong>enregistrer dans un
        fichier</strong> ou l’<strong>envoyer sur le réseau</strong>, il faut le transformer en
        texte — un fichier et un câble ne transportent que du texte.</p>
        <p>Ce texte a un format, et il porte un nom : <strong>JSON</strong>.</p>
        <pre>const perso = { nom: "Nour", vies: 3 };

const texte = JSON.stringify(perso);
// '{"nom":"Nour","vies":3}'   ← c’est du texte, maintenant</pre>
        <p>Et pour revenir à un vrai objet :</p>
        <pre>const retrouve = JSON.parse(texte);
console.log(retrouve.vies);   // 3</pre>
        <p>Deux méthodes, deux directions : <code>stringify</code> pour <em>sortir</em>,
        <code>parse</code> pour <em>rentrer</em>.</p>
        <p><strong>Pourquoi ce nom bizarre ?</strong> JSON veut dire <em>JavaScript Object
        Notation</em>. Le format est né ici, puis tout le reste du monde l’a adopté : Python, Java,
        les applications de téléphone, les jeux vidéo. Quand deux programmes écrits dans des
        langages différents s’échangent des données, c’est presque toujours en JSON.</p>
        <p><strong>Un détail qui compte :</strong> dans le texte JSON, les noms de propriétés sont
        entre guillemets — <code>"nom"</code> et non <code>nom</code>. C’est plus strict que
        JavaScript, parce que le format doit être lisible par des langages qui n’ont pas les mêmes
        règles.</p>
        <p>Pour lire du JSON plus confortablement, <code>JSON.stringify(perso, null, 2)</code> le
        présente sur plusieurs lignes.</p>
      `,
      en: `
        <p>An object lives in the program’s memory. But to <strong>save it to a file</strong> or
        <strong>send it over the network</strong>, it must become text — a file and a cable only
        carry text.</p>
        <p>That text has a format, and it has a name: <strong>JSON</strong>.</p>
        <pre>const perso = { nom: "Nour", vies: 3 };

const texte = JSON.stringify(perso);
// '{"nom":"Nour","vies":3}'   ← this is text now</pre>
        <p>And to get a real object back:</p>
        <pre>const retrouve = JSON.parse(texte);
console.log(retrouve.vies);   // 3</pre>
        <p>Two methods, two directions: <code>stringify</code> to go <em>out</em>,
        <code>parse</code> to come <em>in</em>.</p>
        <p><strong>Why the odd name?</strong> JSON stands for <em>JavaScript Object Notation</em>.
        The format was born here, then the rest of the world adopted it: Python, Java, phone apps,
        video games. When two programs written in different languages exchange data, it is almost
        always in JSON.</p>
        <p><strong>A detail that matters:</strong> in JSON text, property names are in quotes —
        <code>"nom"</code> and not <code>nom</code>. Stricter than JavaScript, because the format
        must be readable by languages with different rules.</p>
        <p>To read JSON more comfortably, <code>JSON.stringify(perso, null, 2)</code> lays it out
        over several lines.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const perso = { nom: "Nour", vies: 3, armes: ["arc", "bouclier"] };\n\nconst texte = JSON.stringify(perso);\nconsole.log(texte);\nconsole.log(`C’est du texte : ${typeof texte}`);\n\nconst retrouve = JSON.parse(texte);\nconsole.log(`Redevenu un objet : ${typeof retrouve}`);\nconsole.log(`Première arme : ${retrouve.armes[0]}`);',
      },
      note: {
        fr: '`typeof` dit de quel genre est une valeur. Avant : "string". Après : "object". Le tableau à l’intérieur a fait l’aller-retour lui aussi.',
        en: '`typeof` tells you what kind a value is. Before: "string". After: "object". The array inside made the round trip too.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La variable <code>sauvegarde</code> contient du <strong>texte JSON</strong>, comme s’il sortait d’un fichier. Transforme-le en objet et affiche <strong>deux lignes</strong> :</p><pre>Lina a 240 points\nElle a débloqué 3 badges</pre>',
        en: '<p>The <code>sauvegarde</code> variable holds <strong>JSON text</strong>, as if it came out of a file. Turn it into an object and print <strong>two lines</strong>:</p><pre>Lina a 240 points\nElle a débloqué 3 badges</pre>',
      },
      depart: {
        html: '',
        js: 'const sauvegarde = \'{"nom":"Lina","points":240,"badges":["fusée","livre","flamme"]}\';\n\n// Transforme ce texte en objet, puis affiche les deux lignes\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Lina a 240 points' },
        { type: 'sortieContient', valeur: 'Elle a débloqué 3 badges' },
        {
          type: 'codeContient',
          motif: 'JSON\\.parse\\s*\\(',
          message: {
            fr: 'Il faut <code>JSON.parse(sauvegarde)</code> pour retrouver un vrai objet.',
            en: 'You need <code>JSON.parse(sauvegarde)</code> to get a real object back.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.length',
          message: {
            fr: 'Le nombre de badges doit venir de <code>.badges.length</code>, pas d’un chiffre écrit à la main.',
            en: 'The badge count must come from <code>.badges.length</code>, not a hand-typed digit.',
          },
        },
      ],
      indices: [
        {
          fr: 'Commence par <code>const profil = JSON.parse(sauvegarde);</code>',
          en: 'Start with <code>const profil = JSON.parse(sauvegarde);</code>',
        },
        {
          fr: 'Ensuite <code>profil.nom</code> et <code>profil.points</code> se lisent comme n’importe quel objet.',
          en: 'Then <code>profil.nom</code> and <code>profil.points</code> read like any object.',
        },
        {
          fr: '<code>profil.badges</code> est un tableau : son nombre d’éléments est <code>profil.badges.length</code>.',
          en: '<code>profil.badges</code> is an array: its item count is <code>profil.badges.length</code>.',
        },
      ],
      solution: {
        html: '',
        js: 'const sauvegarde = \'{"nom":"Lina","points":240,"badges":["fusée","livre","flamme"]}\';\n\nconst profil = JSON.parse(sauvegarde);\n\nconsole.log(`${profil.nom} a ${profil.points} points`);\nconsole.log(`Elle a débloqué ${profil.badges.length} badges`);',
      },
    },
  },

  /* ====================================== js-hof : parcourir autrement ==== */

  'js-hof-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Écrire une fonction en deux fois moins de signes, avec une flèche.',
      en: 'Write a function in half the characters, with an arrow.',
    },
    explication: {
      fr: `
        <p>Tu connais cette forme :</p>
        <pre>function double(n) {
  return n * 2;
}</pre>
        <p>Il en existe une plus courte, qui dit exactement la même chose :</p>
        <pre>const double = (n) =&gt; n * 2;</pre>
        <p>C’est la <strong>fonction fléchée</strong>. Trois choses ont disparu, et ce n’est pas un
        hasard :</p>
        <ul>
          <li><code>function</code> — remplacé par la flèche <code>=&gt;</code> ;</li>
          <li>les accolades — inutiles quand il n’y a qu’une seule expression ;</li>
          <li><code>return</code> — <strong>sous-entendu</strong> quand il n’y a pas d’accolades.
          C’est le point qui surprend le plus.</li>
        </ul>
        <p>S’il faut plusieurs lignes, on remet les accolades — et alors <code>return</code>
        redevient obligatoire :</p>
        <pre>const noter = (n) =&gt; {
  const bonus = n &gt; 15 ? 2 : 0;
  return n + bonus;
};</pre>
        <p>Deux ou plusieurs paramètres se séparent par une virgule, comme toujours :</p>
        <pre>const ajouter = (a, b) =&gt; a + b;</pre>
        <p><strong>Pourquoi l’apprendre maintenant ?</strong> Parce que dans les trois leçons qui
        suivent, on va passer des fonctions <em>à d’autres fonctions</em>. Écrites en entier, elles
        noieraient la ligne. Avec une flèche, elles tiennent à l’intérieur et le code reste
        lisible. Tu en as d’ailleurs déjà vu une, au tri :
        <code>sort((a, b) =&gt; b - a)</code>.</p>
      `,
      en: `
        <p>You know this form:</p>
        <pre>function double(n) {
  return n * 2;
}</pre>
        <p>There is a shorter one that says exactly the same thing:</p>
        <pre>const double = (n) =&gt; n * 2;</pre>
        <p>This is the <strong>arrow function</strong>. Three things vanished, and not by
        accident:</p>
        <ul>
          <li><code>function</code> — replaced by the arrow <code>=&gt;</code>;</li>
          <li>the braces — needless when there is only one expression;</li>
          <li><code>return</code> — <strong>implied</strong> when there are no braces. This is the
          part that surprises people most.</li>
        </ul>
        <p>If several lines are needed, put the braces back — and then <code>return</code> becomes
        compulsory again:</p>
        <pre>const noter = (n) =&gt; {
  const bonus = n &gt; 15 ? 2 : 0;
  return n + bonus;
};</pre>
        <p>Two or more parameters are comma-separated, as always:</p>
        <pre>const ajouter = (a, b) =&gt; a + b;</pre>
        <p><strong>Why learn it now?</strong> Because in the next three lessons we will pass
        functions <em>to other functions</em>. Written out in full they would drown the line. With
        an arrow they fit inside and the code stays readable. You have already seen one, at
        sorting: <code>sort((a, b) =&gt; b - a)</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'function doubleLong(n) {\n  return n * 2;\n}\nconst doubleCourt = (n) => n * 2;\n\nconsole.log(doubleLong(21));\nconsole.log(doubleCourt(21));\n\nconst ajouter = (a, b) => a + b;\nconsole.log(ajouter(3, 4));\n\nconst apprecier = (note) => {\n  if (note >= 16) return "très bien";\n  if (note >= 12) return "bien";\n  return "à revoir";\n};\nconsole.log(apprecier(17));\nconsole.log(apprecier(9));',
      },
      note: {
        fr: 'Les deux premières fonctions sont identiques pour la machine. La dernière a des accolades : son `return` redevient obligatoire.',
        en: 'The first two functions are identical to the machine. The last one has braces: its `return` is compulsory again.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris <strong>deux fonctions fléchées</strong> :</p><ul><li><code>tva</code> — reçoit un prix, renvoie ce prix multiplié par <code>1.2</code> ;</li><li><code>moyenne</code> — reçoit deux notes, renvoie leur moyenne.</li></ul><p>Puis affiche <strong>deux lignes</strong> :</p><pre>Prix TTC : 60\nMoyenne : 14</pre><p>Les deux fonctions doivent être écrites avec une <strong>flèche</strong>, pas avec <code>function</code>.</p>',
        en: '<p>Write <strong>two arrow functions</strong>:</p><ul><li><code>tva</code> — takes a price, returns that price times <code>1.2</code>;</li><li><code>moyenne</code> — takes two marks, returns their average.</li></ul><p>Then print <strong>two lines</strong>:</p><pre>Prix TTC : 60\nMoyenne : 14</pre><p>Both functions must use an <strong>arrow</strong>, not <code>function</code>.</p>',
      },
      depart: {
        html: '',
        js: '// Écris les deux fonctions fléchées ici\n\nconsole.log(`Prix TTC : ${tva(50)}`);\nconsole.log(`Moyenne : ${moyenne(12, 16)}`);',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Prix TTC : 60' },
        { type: 'sortieContient', valeur: 'Moyenne : 14' },
        {
          type: 'codeContient',
          motif: 'const\\s+tva\\s*=\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>',
          message: {
            fr: '<code>tva</code> doit être une fonction fléchée : <code>const tva = (prix) => …</code>.',
            en: '<code>tva</code> must be an arrow function: <code>const tva = (prix) => …</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'const\\s+moyenne\\s*=\\s*\\([^)]*,[^)]*\\)\\s*=>',
          message: {
            fr: '<code>moyenne</code> doit être une fonction fléchée à deux paramètres.',
            en: '<code>moyenne</code> must be an arrow function with two parameters.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\bfunction\\b',
          message: {
            fr: 'Ce défi demande des fonctions fléchées : le mot <code>function</code> ne doit pas apparaître.',
            en: 'This challenge asks for arrow functions: the word <code>function</code> must not appear.',
          },
        },
      ],
      indices: [
        {
          fr: 'La première : <code>const tva = (prix) => prix * 1.2;</code>',
          en: 'The first one: <code>const tva = (prix) => prix * 1.2;</code>',
        },
        {
          fr: 'La seconde prend deux paramètres : <code>const moyenne = (a, b) => …</code>',
          en: 'The second takes two parameters: <code>const moyenne = (a, b) => …</code>',
        },
        {
          fr: 'Une moyenne, c’est la somme divisée par deux : <code>(a + b) / 2</code>. Les parenthèses comptent.',
          en: 'An average is the sum divided by two: <code>(a + b) / 2</code>. The parentheses matter.',
        },
      ],
      solution: {
        html: '',
        js: 'const tva = (prix) => prix * 1.2;\nconst moyenne = (a, b) => (a + b) / 2;\n\nconsole.log(`Prix TTC : ${tva(50)}`);\nconsole.log(`Moyenne : ${moyenne(12, 16)}`);',
      },
    },
  },

  'js-hof-2': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Faire quelque chose pour chaque élément, sans écrire de boucle.',
      en: 'Do something for each item, without writing a loop.',
    },
    explication: {
      fr: `
        <p>Voici l’idée la plus surprenante du JavaScript, et elle tient en une phrase : <strong>on
        peut donner une fonction à une autre fonction</strong>.</p>
        <p>Jusqu’ici tu écrivais la boucle toi-même :</p>
        <pre>for (const prenom of eleves) {
  console.log(prenom);
}</pre>
        <p>Avec <code>forEach</code>, tu ne dis plus <em>comment</em> parcourir. Tu dis seulement
        <strong>ce qu’il faut faire à chacun</strong>, et le tableau se charge du reste :</p>
        <pre>eleves.forEach((prenom) =&gt; {
  console.log(prenom);
});</pre>
        <p>Lis-le à voix haute : « pour chacun des élèves, affiche son prénom ». La boucle a
        disparu de ton code — elle existe toujours, mais c’est <code>forEach</code> qui la tient.</p>
        <p><code>forEach</code> peut aussi te donner la <strong>place</strong> de l’élément, en
        deuxième paramètre :</p>
        <pre>eleves.forEach((prenom, i) =&gt; {
  console.log(\`\${i + 1}. \${prenom}\`);
});</pre>
        <p><strong>Le point à retenir :</strong> <code>forEach</code> ne renvoie rien. Il sert à
        <em>agir</em> — afficher, ajouter à la page, cumuler. Si tu veux <em>fabriquer une nouvelle
        liste</em>, ce sera <code>map</code>, la leçon suivante. Confondre les deux est l’erreur la
        plus fréquente à ce stade.</p>
      `,
      en: `
        <p>Here is the most surprising idea in JavaScript, and it fits in one sentence: <strong>you
        can give a function to another function</strong>.</p>
        <p>So far you wrote the loop yourself:</p>
        <pre>for (const prenom of eleves) {
  console.log(prenom);
}</pre>
        <p>With <code>forEach</code> you no longer say <em>how</em> to walk. You only say
        <strong>what to do to each one</strong>, and the array handles the rest:</p>
        <pre>eleves.forEach((prenom) =&gt; {
  console.log(prenom);
});</pre>
        <p>Read it out loud: "for each of the students, print their name". The loop has vanished
        from your code — it still exists, but <code>forEach</code> holds it.</p>
        <p><code>forEach</code> can also hand you the item’s <strong>position</strong>, as a second
        parameter:</p>
        <pre>eleves.forEach((prenom, i) =&gt; {
  console.log(\`\${i + 1}. \${prenom}\`);
});</pre>
        <p><strong>The key point:</strong> <code>forEach</code> returns nothing. It is there to
        <em>act</em> — print, add to the page, accumulate. If you want to <em>build a new
        list</em>, that will be <code>map</code>, the next lesson. Confusing the two is the most
        common mistake at this stage.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const courses = ["pain", "lait", "pommes"];\n\ncourses.forEach((article) => {\n  console.log(`À acheter : ${article}`);\n});\n\ncourses.forEach((article, i) => {\n  console.log(`${i + 1}. ${article}`);\n});\n\nlet lettres = 0;\ncourses.forEach((article) => {\n  lettres = lettres + article.length;\n});\nconsole.log(`${lettres} lettres en tout`);',
      },
      note: {
        fr: 'Le deuxième paramètre `i` est la place dans le tableau. Comme toujours, elle part de 0 — d’où le `i + 1` pour numéroter une liste lisible par un humain.',
        en: 'The second parameter `i` is the position in the array. As always it starts at 0 — hence the `i + 1` to number a human-readable list.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Affiche le menu de la cantine avec <strong><code>forEach</code></strong>, numéroté à partir de 1 :</p><pre>1. Carottes râpées\n2. Poulet rôti\n3. Yaourt</pre><p>Ni boucle <code>for</code>, ni trois <code>console.log</code> recopiés.</p>',
        en: '<p>Print the canteen menu with <strong><code>forEach</code></strong>, numbered from 1:</p><pre>1. Carottes râpées\n2. Poulet rôti\n3. Yaourt</pre><p>No <code>for</code> loop, and no three copy-pasted <code>console.log</code>.</p>',
      },
      depart: {
        html: '',
        js: 'const menu = ["Carottes râpées", "Poulet rôti", "Yaourt"];\n\n// Affiche le menu numéroté, avec forEach\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: '1. Carottes râpées' },
        { type: 'sortieContient', valeur: '2. Poulet rôti' },
        { type: 'sortieContient', valeur: '3. Yaourt' },
        {
          type: 'codeContient',
          motif: '\\.forEach\\s*\\(',
          message: {
            fr: 'Ce défi demande <code>menu.forEach(…)</code>.',
            en: 'This challenge asks for <code>menu.forEach(…)</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\bfor\\s*\\(',
          message: {
            fr: 'Pas de boucle <code>for</code> ici : c’est <code>forEach</code> qui parcourt.',
            en: 'No <code>for</code> loop here: <code>forEach</code> does the walking.',
          },
        },
        // Pas de regle interdisant les noms des plats : ils figurent dans le
        // tableau de depart, donc dans le code de l'eleve. Une telle regle
        // rendrait le defi infaisable — le meme piege que dans py-fic-4.
        // Trois `console.log` recopies sont deja exclus autrement : forEach est
        // exige, et il produirait alors six lignes au lieu de trois.
      ],
      indices: [
        {
          fr: 'La forme : <code>menu.forEach((plat, i) => {</code> … <code>});</code>',
          en: 'The shape: <code>menu.forEach((plat, i) => {</code> … <code>});</code>',
        },
        {
          fr: 'Le deuxième paramètre te donne la place, qui commence à 0.',
          en: 'The second parameter gives you the position, which starts at 0.',
        },
        {
          fr: 'À l’intérieur : <code>console.log(`${i + 1}. ${plat}`);</code>',
          en: 'Inside: <code>console.log(`${i + 1}. ${plat}`);</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const menu = ["Carottes râpées", "Poulet rôti", "Yaourt"];\n\nmenu.forEach((plat, i) => {\n  console.log(`${i + 1}. ${plat}`);\n});',
      },
    },
  },

  'js-hof-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Fabriquer une nouvelle liste à partir d’une autre, avec map.',
      en: 'Build a new list from another one, with map.',
    },
    explication: {
      fr: `
        <p><code>forEach</code> agit. <code>map</code>, lui, <strong>fabrique</strong>.</p>
        <p>Il parcourt le tableau, applique ta fonction à chaque élément, et rend un
        <strong>nouveau tableau</strong> de la même longueur, rempli des résultats :</p>
        <pre>const prix = [10, 20, 30];
const ttc = prix.map((p) =&gt; p * 1.2);
// ttc vaut [12, 24, 36]
// prix n’a pas bougé</pre>
        <p>Deux choses à remarquer :</p>
        <ul>
          <li>le tableau d’origine est <strong>intact</strong> — <code>map</code> ne modifie
          rien ;</li>
          <li>le nouveau a <strong>exactement autant d’éléments</strong>. Toujours. Si tu veux en
          avoir moins, c’est <code>filter</code>, la leçon suivante.</li>
        </ul>
        <p><code>map</code> sait aussi <strong>changer la nature</strong> de ce qu’il traite. Sur un
        tableau d’objets, il peut n’en tirer qu’une propriété :</p>
        <pre>const eleves = [{ nom: "Lina" }, { nom: "Théo" }];
const noms = eleves.map((e) =&gt; e.nom);
// ["Lina", "Théo"]   ← des objets sont entrés, du texte est sorti</pre>
        <p>Et comme <code>map</code> rend un tableau, on peut enchaîner directement :</p>
        <pre>eleves.map((e) =&gt; e.nom).join(", ")   // "Lina, Théo"</pre>
        <p><strong>La question à se poser :</strong> « est-ce que je veux <em>faire quelque chose</em>
        (<code>forEach</code>) ou <em>obtenir quelque chose</em> (<code>map</code>) ? » Un
        <code>map</code> dont on jette le résultat est un <code>forEach</code> mal écrit.</p>
      `,
      en: `
        <p><code>forEach</code> acts. <code>map</code> <strong>builds</strong>.</p>
        <p>It walks the array, applies your function to each item, and returns a <strong>new
        array</strong> of the same length, filled with the results:</p>
        <pre>const prix = [10, 20, 30];
const ttc = prix.map((p) =&gt; p * 1.2);
// ttc is [12, 24, 36]
// prix is unchanged</pre>
        <p>Two things to notice:</p>
        <ul>
          <li>the original array is <strong>untouched</strong> — <code>map</code> changes
          nothing;</li>
          <li>the new one has <strong>exactly as many items</strong>. Always. If you want fewer,
          that is <code>filter</code>, the next lesson.</li>
        </ul>
        <p><code>map</code> can also <strong>change the nature</strong> of what it handles. On an
        array of objects it can pull out a single property:</p>
        <pre>const eleves = [{ nom: "Lina" }, { nom: "Théo" }];
const noms = eleves.map((e) =&gt; e.nom);
// ["Lina", "Théo"]   ← objects went in, text came out</pre>
        <p>And since <code>map</code> returns an array, you can chain straight away:</p>
        <pre>eleves.map((e) =&gt; e.nom).join(", ")   // "Lina, Théo"</pre>
        <p><strong>The question to ask:</strong> "do I want to <em>do something</em>
        (<code>forEach</code>) or <em>get something</em> (<code>map</code>)?" A <code>map</code>
        whose result is thrown away is a badly written <code>forEach</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const prix = [10, 20, 30];\nconst ttc = prix.map((p) => p * 1.2);\n\nconsole.log(`HT  : ${prix.join(", ")}`);\nconsole.log(`TTC : ${ttc.join(", ")}`);\n\nconst eleves = [\n  { nom: "Lina", note: 17 },\n  { nom: "Théo", note: 12 }\n];\n\nconsole.log(eleves.map((e) => e.nom).join(" et "));\nconsole.log(eleves.map((e) => `${e.nom} (${e.note})`).join(", "));',
      },
      note: {
        fr: 'Regarde la première paire de lignes : `prix` est resté identique. `map` n’abîme jamais le tableau de départ.',
        en: 'Look at the first pair of lines: `prix` is unchanged. `map` never damages the original array.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Les notes sont sur 10. Avec <strong><code>map</code></strong>, fabrique un nouveau tableau où elles sont sur 20 — c’est-à-dire multipliées par 2 — puis affiche <strong>deux lignes</strong> :</p><pre>Sur 10 : 7, 9, 5, 8\nSur 20 : 14, 18, 10, 16</pre><p>Le tableau d’origine doit rester intact : c’est la première ligne qui le prouve.</p>',
        en: '<p>The marks are out of 10. With <strong><code>map</code></strong>, build a new array where they are out of 20 — that is, doubled — then print <strong>two lines</strong>:</p><pre>Sur 10 : 7, 9, 5, 8\nSur 20 : 14, 18, 10, 16</pre><p>The original array must stay intact: the first line proves it.</p>',
      },
      depart: {
        html: '',
        js: 'const sur10 = [7, 9, 5, 8];\n\n// Fabrique le tableau sur 20 avec map, puis affiche les deux lignes\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Sur 10 : 7, 9, 5, 8' },
        { type: 'sortieContient', valeur: 'Sur 20 : 14, 18, 10, 16' },
        {
          type: 'codeContient',
          motif: '\\.map\\s*\\(',
          message: {
            fr: 'Ce défi demande <code>sur10.map(…)</code>.',
            en: 'This challenge asks for <code>sur10.map(…)</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '14\\s*,\\s*18',
          message: {
            fr: 'Les notes sur 20 doivent être calculées par <code>map</code>, pas écrites à la main.',
            en: 'The out-of-20 marks must be computed by <code>map</code>, not typed by hand.',
          },
        },
      ],
      indices: [
        {
          fr: '<code>const sur20 = sur10.map((n) => n * 2);</code>',
          en: '<code>const sur20 = sur10.map((n) => n * 2);</code>',
        },
        {
          fr: 'Les deux tableaux existent en même temps : <code>map</code> n’a pas touché au premier.',
          en: 'Both arrays exist at the same time: <code>map</code> did not touch the first.',
        },
        {
          fr: 'Pour les afficher : <code>sur10.join(", ")</code> et <code>sur20.join(", ")</code>.',
          en: 'To print them: <code>sur10.join(", ")</code> and <code>sur20.join(", ")</code>.',
        },
      ],
      solution: {
        html: '',
        js: 'const sur10 = [7, 9, 5, 8];\n\nconst sur20 = sur10.map((n) => n * 2);\n\nconsole.log(`Sur 10 : ${sur10.join(", ")}`);\nconsole.log(`Sur 20 : ${sur20.join(", ")}`);',
      },
    },
  },

  'js-hof-4': {
    langage: 'javascript',
    xp: 40,
    objectif: {
      fr: 'Garder ce qui t’intéresse avec filter, trouver le premier avec find — et bâtir un vrai classement.',
      en: 'Keep what you need with filter, find the first with find — and build a real ranking.',
    },
    explication: {
      fr: `
        <p>Deux dernières méthodes, et tu auras la boîte à outils complète.</p>
        <p><code>filter</code> garde les éléments pour lesquels ta fonction répond
        <code>true</code>, et rend un <strong>nouveau tableau plus court</strong> :</p>
        <pre>const notes = [17, 8, 15, 6];
const reussies = notes.filter((n) =&gt; n &gt;= 10);
// [17, 15]</pre>
        <p><code>find</code> rend <strong>le premier</strong> élément qui convient — pas un tableau,
        l’élément lui-même :</p>
        <pre>const eleves = [{ nom: "Lina", note: 17 }, { nom: "Théo", note: 8 }];
const premier = eleves.find((e) =&gt; e.note &lt; 10);
// { nom: "Théo", note: 8 }</pre>
        <p>Et s’il n’y en a aucun ? <code>filter</code> rend un tableau vide, <code>find</code> rend
        <code>undefined</code>. C’est logique : un tableau peut être vide, un élément unique ne
        peut pas être « à moitié là ».</p>
        <p><strong>Les quatre méthodes, en une phrase chacune :</strong></p>
        <ul>
          <li><code>forEach</code> — fais quelque chose à chacun, ne rends rien ;</li>
          <li><code>map</code> — transforme chacun, rends autant d’éléments ;</li>
          <li><code>filter</code> — garde certains, rends moins d’éléments ;</li>
          <li><code>find</code> — rends le premier qui convient, ou <code>undefined</code>.</li>
        </ul>
        <p>Elles s’enchaînent, et c’est là que ça devient puissant :</p>
        <pre>eleves
  .filter((e) =&gt; e.note &gt;= 10)
  .map((e) =&gt; e.nom)
  .join(", ");</pre>
        <p>Trois lignes qui se lisent comme une phrase : garde ceux qui ont la moyenne, prends leur
        nom, colle-les. Écris ça avec des boucles et il t’en faudra quinze.</p>
      `,
      en: `
        <p>Two last methods, and your toolbox is complete.</p>
        <p><code>filter</code> keeps the items for which your function answers <code>true</code>,
        and returns a <strong>new, shorter array</strong>:</p>
        <pre>const notes = [17, 8, 15, 6];
const reussies = notes.filter((n) =&gt; n &gt;= 10);
// [17, 15]</pre>
        <p><code>find</code> returns <strong>the first</strong> matching item — not an array, the
        item itself:</p>
        <pre>const eleves = [{ nom: "Lina", note: 17 }, { nom: "Théo", note: 8 }];
const premier = eleves.find((e) =&gt; e.note &lt; 10);
// { nom: "Théo", note: 8 }</pre>
        <p>And if there is none? <code>filter</code> returns an empty array, <code>find</code>
        returns <code>undefined</code>. That makes sense: an array can be empty, a single item
        cannot be "half there".</p>
        <p><strong>The four methods, one sentence each:</strong></p>
        <ul>
          <li><code>forEach</code> — do something to each, return nothing;</li>
          <li><code>map</code> — transform each, return as many items;</li>
          <li><code>filter</code> — keep some, return fewer items;</li>
          <li><code>find</code> — return the first match, or <code>undefined</code>.</li>
        </ul>
        <p>They chain, and that is where it gets powerful:</p>
        <pre>eleves
  .filter((e) =&gt; e.note &gt;= 10)
  .map((e) =&gt; e.nom)
  .join(", ");</pre>
        <p>Three lines that read like a sentence: keep those who passed, take their name, glue
        them. Write that with loops and you will need fifteen.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const classe = [\n  { nom: "Lina", note: 17 },\n  { nom: "Théo", note: 8 },\n  { nom: "Nour", note: 15 },\n  { nom: "Sami", note: 6 }\n];\n\nconst recus = classe.filter((e) => e.note >= 10);\nconsole.log(`${recus.length} élèves ont la moyenne`);\nconsole.log(recus.map((e) => e.nom).join(", "));\n\nconst premierEnDifficulte = classe.find((e) => e.note < 10);\nconsole.log(`À aider en priorité : ${premierEnDifficulte.nom}`);\n\nconst absent = classe.find((e) => e.nom === "Zoé");\nconsole.log(`Zoé est dans la classe ? ${absent !== undefined}`);',
      },
      note: {
        fr: 'La dernière ligne montre la bonne façon de tester un `find` : comparer à `undefined`, parce que c’est ce qu’il rend quand il ne trouve rien.',
        en: 'The last line shows the right way to test a `find`: compare to `undefined`, because that is what it returns when nothing matches.',
      },
    },
    defi: {
      consigne: {
        fr: '<p><strong>Projet : le classement de la classe.</strong> À partir du tableau <code>classe</code>, affiche <strong>exactement quatre lignes</strong> :</p><pre>3 élèves ont la moyenne\nAu-dessus de 15 : Lina, Nour\nMeilleure note : Lina (18)\nMoyenne de la classe : 12.5</pre><p>Tout doit être <strong>calculé</strong> : la première ligne avec <code>filter</code>, la deuxième avec <code>filter</code> puis <code>map</code>, la troisième avec un tri, la quatrième avec une somme.</p>',
        en: '<p><strong>Project: the class ranking.</strong> From the <code>classe</code> array, print <strong>exactly four lines</strong>:</p><pre>3 élèves ont la moyenne\nAu-dessus de 15 : Lina, Nour\nMeilleure note : Lina (18)\nMoyenne de la classe : 12.5</pre><p>Everything must be <strong>computed</strong>: the first line with <code>filter</code>, the second with <code>filter</code> then <code>map</code>, the third with a sort, the fourth with a sum.</p>',
      },
      depart: {
        html: '',
        js: 'const classe = [\n  { nom: "Lina", note: 18 },\n  { nom: "Théo", note: 6 },\n  { nom: "Nour", note: 16 },\n  { nom: "Sami", note: 10 }\n];\n\n// 1. Combien ont la moyenne ?\n\n// 2. Qui est au-dessus de 15 ?\n\n// 3. Quelle est la meilleure note ?\n\n// 4. Quelle est la moyenne de la classe ?\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 4 },
        { type: 'sortieContient', valeur: '3 élèves ont la moyenne' },
        { type: 'sortieContient', valeur: 'Au-dessus de 15 : Lina, Nour' },
        { type: 'sortieContient', valeur: 'Meilleure note : Lina (18)' },
        { type: 'sortieContient', valeur: 'Moyenne de la classe : 12.5' },
        {
          type: 'codeContient',
          motif: '\\.filter\\s*\\(',
          message: {
            fr: 'Les deux premières lignes se calculent avec <code>filter</code>.',
            en: 'The first two lines are computed with <code>filter</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.map\\s*\\(',
          message: {
            fr: 'La liste des prénoms se fabrique avec <code>map</code>.',
            en: 'The list of names is built with <code>map</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'Lina,\\s*Nour',
          message: {
            fr: 'Les prénoms doivent sortir du tableau, pas être écrits à la main.',
            en: 'The names must come from the array, not be typed by hand.',
          },
        },
      ],
      indices: [
        {
          fr: '1 et 2 : <code>classe.filter((e) => e.note >= 10)</code> et <code>classe.filter((e) => e.note > 15)</code>.',
          en: '1 and 2: <code>classe.filter((e) => e.note >= 10)</code> and <code>classe.filter((e) => e.note > 15)</code>.',
        },
        {
          fr: '3 : trie une copie par note décroissante — <code>[...classe].sort((a, b) => b.note - a.note)[0]</code>.',
          en: '3: sort a copy by descending mark — <code>[...classe].sort((a, b) => b.note - a.note)[0]</code>.',
        },
        {
          fr: '4 : cumule les notes dans une variable, puis divise par <code>classe.length</code>. 18 + 6 + 16 + 10 font 50, et 50 / 4 fait bien 12.5.',
          en: '4: accumulate the marks in a variable, then divide by <code>classe.length</code>. 18 + 6 + 16 + 10 make 50, and 50 / 4 really is 12.5.',
        },
      ],
      solution: {
        html: '',
        js: 'const classe = [\n  { nom: "Lina", note: 18 },\n  { nom: "Théo", note: 6 },\n  { nom: "Nour", note: 16 },\n  { nom: "Sami", note: 10 }\n];\n\nconst recus = classe.filter((e) => e.note >= 10);\nconsole.log(`${recus.length} élèves ont la moyenne`);\n\nconst brillants = classe.filter((e) => e.note > 15).map((e) => e.nom);\nconsole.log(`Au-dessus de 15 : ${brillants.join(", ")}`);\n\nconst meilleur = [...classe].sort((a, b) => b.note - a.note)[0];\nconsole.log(`Meilleure note : ${meilleur.nom} (${meilleur.note})`);\n\nlet somme = 0;\nclasse.forEach((e) => {\n  somme = somme + e.note;\n});\nconsole.log(`Moyenne de la classe : ${somme / classe.length}`);',
      },
    },
    projet: { titre: { fr: 'Mon classement de classe', en: 'My class ranking' } },
  },

  /* ================================= js-dom : fabriquer la page ========== */

  'js-dom-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Attraper tout un groupe d’éléments d’un coup, et agir sur chacun.',
      en: 'Grab a whole group of elements at once, and act on each.',
    },
    explication: {
      fr: `
        <p><code>querySelector</code> rend <strong>le premier</strong> élément qui correspond. Un
        seul, même s’il y en a dix.</p>
        <p>Son grand frère <code>querySelectorAll</code> les rend <strong>tous</strong> :</p>
        <pre>const titres = document.querySelectorAll("h2");
console.log(titres.length);   // combien il y en a</pre>
        <p>Ce qu’il rend ressemble à un tableau : on peut le parcourir avec <code>for…of</code> ou
        <code>forEach</code>, et il a un <code>length</code>.</p>
        <pre>titres.forEach((titre) =&gt; {
  titre.style.color = "crimson";
});</pre>
        <p>Quatre titres deviennent rouges en trois lignes. Sans lui, il faudrait un
        <code>querySelector</code> par titre — et il faudrait connaître leur nombre à
        l’avance.</p>
        <p><strong>Le sélecteur est celui du CSS</strong>, exactement. Tout ce que tu sais écrire
        dans une feuille de style marche ici :</p>
        <pre>document.querySelectorAll(".produit")        // par classe
document.querySelectorAll("li")              // par balise
document.querySelectorAll("#liste li")       // les li DANS #liste
document.querySelectorAll("button.danger")   // les boutons de classe danger</pre>
        <p><strong>Le piège classique :</strong> <code>querySelectorAll</code> rend toujours une
        liste, même s’il n’y a qu’un seul élément — ou zéro. Écrire
        <code>document.querySelectorAll("#titre").textContent</code> donne <code>undefined</code> :
        une liste n’a pas de texte, ses éléments en ont un. Pour un élément unique, reste sur
        <code>querySelector</code>.</p>
      `,
      en: `
        <p><code>querySelector</code> returns <strong>the first</strong> matching element. Just
        one, even if there are ten.</p>
        <p>Its big brother <code>querySelectorAll</code> returns <strong>all of them</strong>:</p>
        <pre>const titres = document.querySelectorAll("h2");
console.log(titres.length);   // how many there are</pre>
        <p>What it returns looks like an array: you can walk it with <code>for…of</code> or
        <code>forEach</code>, and it has a <code>length</code>.</p>
        <pre>titres.forEach((titre) =&gt; {
  titre.style.color = "crimson";
});</pre>
        <p>Four headings turn red in three lines. Without it you would need one
        <code>querySelector</code> per heading — and you would have to know their number in
        advance.</p>
        <p><strong>The selector is the CSS one</strong>, exactly. Everything you can write in a
        stylesheet works here:</p>
        <pre>document.querySelectorAll(".produit")        // by class
document.querySelectorAll("li")              // by tag
document.querySelectorAll("#liste li")       // the li INSIDE #liste
document.querySelectorAll("button.danger")   // buttons with class danger</pre>
        <p><strong>The classic trap:</strong> <code>querySelectorAll</code> always returns a list,
        even for a single element — or none. Writing
        <code>document.querySelectorAll("#titre").textContent</code> gives <code>undefined</code>:
        a list has no text, its elements do. For a single element, stay with
        <code>querySelector</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h2>Python</h2>\n<h2>JavaScript</h2>\n<h2>C++</h2>\n<p class="note">Trois langages</p>',
        js: 'const titres = document.querySelectorAll("h2");\nconsole.log(`${titres.length} titres trouvés`);\n\ntitres.forEach((titre, i) => {\n  titre.textContent = `${i + 1}. ${titre.textContent}`;\n  titre.style.color = "#00E5FF";\n});\n\nconsole.log(document.querySelectorAll(".note").length);\nconsole.log(document.querySelectorAll(".inexistant").length);',
      },
      note: {
        fr: 'La dernière ligne affiche 0 : un sélecteur qui ne trouve rien ne provoque aucune erreur, il rend simplement une liste vide.',
        en: 'The last line prints 0: a selector that finds nothing raises no error, it simply returns an empty list.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La page contient quatre cartes de classe <code>carte</code>. Sans en citer une seule individuellement :</p><ul><li>donne à <strong>chacune</strong> un fond <code>gold</code> (<code>style.backgroundColor</code>) ;</li><li>affiche une ligne dans la console : <code>4 cartes</code>.</li></ul>',
        en: '<p>The page holds four elements with class <code>carte</code>. Without naming a single one individually:</p><ul><li>give <strong>each</strong> a <code>gold</code> background (<code>style.backgroundColor</code>);</li><li>print one console line: <code>4 cartes</code>.</li></ul>',
      },
      depart: {
        html: '<div class="carte">Python</div>\n<div class="carte">HTML</div>\n<div class="carte">CSS</div>\n<div class="carte">JavaScript</div>',
        js: '// Attrape toutes les cartes d’un coup, colore-les, puis compte-les\n',
      },
      verifications: [
        { type: 'sortieEgale', valeur: '4 cartes' },
        { type: 'style', selecteur: '.carte', propriete: 'background-color', attendu: 'rgb(255, 215, 0)' },
        {
          type: 'codeContient',
          motif: 'querySelectorAll\\s*\\(',
          message: {
            fr: 'Ce défi demande <code>document.querySelectorAll(".carte")</code>.',
            en: 'This challenge asks for <code>document.querySelectorAll(".carte")</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\b4 cartes\\b',
          message: {
            fr: 'Le 4 doit venir de <code>.length</code>, pas être écrit dans le texte.',
            en: 'The 4 must come from <code>.length</code>, not be typed into the text.',
          },
        },
      ],
      indices: [
        {
          fr: 'Range-les : <code>const cartes = document.querySelectorAll(".carte");</code>',
          en: 'Store them: <code>const cartes = document.querySelectorAll(".carte");</code>',
        },
        {
          fr: 'Puis colore chacune avec <code>cartes.forEach((carte) => { … });</code>',
          en: 'Then colour each with <code>cartes.forEach((carte) => { … });</code>',
        },
        {
          fr: 'La ligne de console : <code>console.log(`${cartes.length} cartes`);</code>',
          en: 'The console line: <code>console.log(`${cartes.length} cartes`);</code>',
        },
      ],
      solution: {
        html: '<div class="carte">Python</div>\n<div class="carte">HTML</div>\n<div class="carte">CSS</div>\n<div class="carte">JavaScript</div>',
        js: 'const cartes = document.querySelectorAll(".carte");\n\ncartes.forEach((carte) => {\n  carte.style.backgroundColor = "gold";\n});\n\nconsole.log(`${cartes.length} cartes`);',
      },
    },
  },

  'js-dom-2': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Allumer et éteindre un style en ajoutant une classe, au lieu de bricoler le style à la main.',
      en: 'Switch a style on and off by adding a class, instead of hand-tweaking styles.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici tu changeais l’allure ligne par ligne :</p>
        <pre>carte.style.backgroundColor = "gold";
carte.style.borderColor = "orange";
carte.style.transform = "scale(1.05)";</pre>
        <p>Trois lignes de JavaScript pour un seul effet visuel — et le CSS, dont c’est pourtant le
        métier, ne sert à rien.</p>
        <p>La bonne façon : écrire l’allure <strong>une fois en CSS</strong>, sous un nom de
        classe, et laisser JavaScript se contenter de <strong>poser ou retirer ce nom</strong>.</p>
        <pre>/* dans le CSS */
.selectionnee { background: gold; transform: scale(1.05); }</pre>
        <pre>// dans le JavaScript
carte.classList.add("selectionnee");      // je la mets
carte.classList.remove("selectionnee");   // je l’enlève
carte.classList.toggle("selectionnee");   // je l’inverse
carte.classList.contains("selectionnee"); // true ou false</pre>
        <p><code>toggle</code> est le plus employé : il met la classe si elle est absente, l’enlève
        si elle est là. Un bouton « mode sombre », un menu qui s’ouvre et se ferme, une carte qu’on
        sélectionne — tout ça, c’est un <code>toggle</code>.</p>
        <p><strong>Pourquoi c’est mieux, vraiment :</strong></p>
        <ul>
          <li>l’apparence reste en CSS, là où on la cherche quand on veut la changer ;</li>
          <li>tu peux ajouter une transition dans le CSS, et l’effet s’anime tout seul ;</li>
          <li>une classe peut changer dix propriétés — ton JavaScript n’en voit qu’une.</li>
        </ul>
        <p>C’est la frontière entre les deux langages : <strong>le CSS décide de quoi ça a l’air,
        le JavaScript décide quand</strong>.</p>
      `,
      en: `
        <p>So far you changed looks line by line:</p>
        <pre>carte.style.backgroundColor = "gold";
carte.style.borderColor = "orange";
carte.style.transform = "scale(1.05)";</pre>
        <p>Three lines of JavaScript for one visual effect — and CSS, whose job this is, sits
        idle.</p>
        <p>The right way: write the look <strong>once in CSS</strong>, under a class name, and let
        JavaScript merely <strong>put that name on or take it off</strong>.</p>
        <pre>/* in the CSS */
.selectionnee { background: gold; transform: scale(1.05); }</pre>
        <pre>// in the JavaScript
carte.classList.add("selectionnee");      // put it on
carte.classList.remove("selectionnee");   // take it off
carte.classList.toggle("selectionnee");   // flip it
carte.classList.contains("selectionnee"); // true or false</pre>
        <p><code>toggle</code> is the most used: it adds the class if absent, removes it if there.
        A "dark mode" button, a menu that opens and closes, a card being selected — all of that is
        a <code>toggle</code>.</p>
        <p><strong>Why it is genuinely better:</strong></p>
        <ul>
          <li>appearance stays in CSS, where you look for it when you want to change it;</li>
          <li>you can add a transition in the CSS and the effect animates by itself;</li>
          <li>one class can change ten properties — your JavaScript only sees one.</li>
        </ul>
        <p>This is the border between the two languages: <strong>CSS decides what it looks like,
        JavaScript decides when</strong>.</p>
      `,
    },
    exemple: {
      code: {
        html: '<style>\n  .boite { padding: 12px; border: 2px solid #ccc; margin-bottom: 8px; transition: 200ms; }\n  .active { background: gold; border-color: orange; transform: scale(1.03); }\n</style>\n<div class="boite" id="a">Clique-moi</div>\n<div class="boite" id="b">Moi aussi</div>',
        js: 'const a = document.querySelector("#a");\nconst b = document.querySelector("#b");\n\na.classList.add("active");\nconsole.log(`a est active ? ${a.classList.contains("active")}`);\nconsole.log(`b est active ? ${b.classList.contains("active")}`);\n\ndocument.querySelectorAll(".boite").forEach((boite) => {\n  boite.addEventListener("click", () => {\n    boite.classList.toggle("active");\n  });\n});',
      },
      note: {
        fr: 'Clique sur les deux boîtes dans l’aperçu : chacune s’allume et s’éteint. La transition de 200 ms est écrite en CSS — le JavaScript ne s’en occupe pas.',
        en: 'Click both boxes in the preview: each turns on and off. The 200 ms transition is written in CSS — JavaScript does not care about it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La classe <code>.terminee</code> est déjà écrite dans le CSS : elle barre le texte et le grise. Fais en sorte qu’un clic sur <strong>n’importe quelle</strong> tâche la barre — et qu’un second clic la débarre.</p><p>Rien ne doit être barré avant le premier clic.</p><p>Utilise <code>classList</code>. Ne touche pas au CSS.</p>',
        en: '<p>The <code>.terminee</code> class is already in the CSS: it strikes the text through and greys it. Make a click on <strong>any</strong> task strike it — and a second click un-strike it.</p><p>Nothing must be struck before the first click.</p><p>Use <code>classList</code>. Do not touch the CSS.</p>',
      },
      depart: {
        html: '<style>\n  li { cursor: pointer; padding: 4px; }\n  .terminee { text-decoration: line-through; color: gray; }\n</style>\n<ul>\n  <li class="tache">Ranger sa chambre</li>\n  <li class="tache">Faire les maths</li>\n  <li class="tache">Sortir le chien</li>\n</ul>',
        js: '// Un clic sur une tâche la barre. Un second la débarre.\n',
      },
      verifications: [
        { type: 'dom', selecteur: '.terminee', quoi: 'nombre', attendu: 0 },
        // `clic` clique TOUS les elements correspondants : les trois taches
        // sont donc cliquees d'un coup. C'est tant mieux — cela verifie que
        // les trois sont branchees, et pas seulement la premiere.
        {
          type: 'dom',
          clic: '.tache',
          selecteur: '.terminee',
          quoi: 'nombre',
          attendu: 3,
          message: {
            fr: 'Après un clic, chaque tâche doit porter la classe <code>terminee</code>. Si une seule est barrée, tu n’as branché que la première.',
            en: 'After a click, each task must carry the <code>terminee</code> class. If only one is struck, you wired only the first.',
          },
        },
        {
          type: 'codeContient',
          motif: 'classList',
          message: {
            fr: 'Emploie <code>classList</code> plutôt que de modifier le style à la main.',
            en: 'Use <code>classList</code> rather than hand-editing the style.',
          },
        },
        {
          type: 'codeContient',
          motif: 'querySelectorAll\\s*\\(',
          message: {
            fr: 'Les trois tâches doivent être traitées d’un coup, avec <code>querySelectorAll</code>.',
            en: 'The three tasks must be handled at once, with <code>querySelectorAll</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\.style\\.',
          message: {
            fr: 'Pas de <code>.style.</code> ici : l’apparence est déjà écrite en CSS, tu ne poses que la classe.',
            en: 'No <code>.style.</code> here: the look is already in the CSS, you only put the class on.',
          },
        },
      ],
      indices: [
        {
          fr: 'Commence par <code>document.querySelectorAll(".tache").forEach((tache) => {</code>',
          en: 'Start with <code>document.querySelectorAll(".tache").forEach((tache) => {</code>',
        },
        {
          fr: 'À l’intérieur, pose un écouteur : <code>tache.addEventListener("click", () => {</code>',
          en: 'Inside, attach a listener: <code>tache.addEventListener("click", () => {</code>',
        },
        {
          fr: 'Et dans l’écouteur, une seule ligne : <code>tache.classList.toggle("terminee");</code>',
          en: 'And in the listener, a single line: <code>tache.classList.toggle("terminee");</code>',
        },
      ],
      solution: {
        html: '<style>\n  li { cursor: pointer; padding: 4px; }\n  .terminee { text-decoration: line-through; color: gray; }\n</style>\n<ul>\n  <li class="tache">Ranger sa chambre</li>\n  <li class="tache">Faire les maths</li>\n  <li class="tache">Sortir le chien</li>\n</ul>',
        js: 'document.querySelectorAll(".tache").forEach((tache) => {\n  tache.addEventListener("click", () => {\n    tache.classList.toggle("terminee");\n  });\n});',
      },
    },
  },

  'js-dom-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Fabriquer un élément de page depuis le code, et l’accrocher à la page.',
      en: 'Build a page element from code, and attach it to the page.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici, tout ce que tu modifiais <strong>existait déjà</strong> dans le HTML. Mais
        comment afficher une liste de dix produits si tu ne sais pas à l’avance combien il y en
        aura ?</p>
        <p>Tu ne l’écris pas dans le HTML. Tu la <strong>fabriques</strong>.</p>
        <p>En trois temps :</p>
        <pre>const li = document.createElement("li");   // 1. je le crée
li.textContent = "Du pain";                // 2. je le remplis
liste.append(li);                          // 3. je l’accroche</pre>
        <p>Les trois étapes comptent. Après <code>createElement</code>, l’élément existe en
        mémoire mais <strong>n’est nulle part sur la page</strong> : personne ne le voit. C’est
        <code>append</code> qui le pose à l’intérieur d’un autre élément.</p>
        <p>Oublier la troisième ligne est l’erreur numéro un de tout débutant : le code tourne sans
        la moindre erreur, et rien n’apparaît.</p>
        <p>Combiné à une boucle, ça devient une liste entière :</p>
        <pre>const courses = ["pain", "lait", "pommes"];
const liste = document.querySelector("#liste");

courses.forEach((article) =&gt; {
  const li = document.createElement("li");
  li.textContent = article;
  liste.append(li);
});</pre>
        <p>Trois articles, trente ou trois mille : le code ne change pas. <strong>C’est le coeur de
        toute application web</strong> — un message qui arrive, une ligne qui apparaît.</p>
        <p>On peut aussi <strong>retirer</strong> un élément : <code>li.remove()</code>, sans même
        savoir où il se trouve.</p>
      `,
      en: `
        <p>So far everything you changed <strong>already existed</strong> in the HTML. But how do
        you show a list of ten products when you do not know in advance how many there will be?</p>
        <p>You do not write it in the HTML. You <strong>build</strong> it.</p>
        <p>In three steps:</p>
        <pre>const li = document.createElement("li");   // 1. create it
li.textContent = "Du pain";                // 2. fill it
liste.append(li);                          // 3. attach it</pre>
        <p>All three matter. After <code>createElement</code> the element exists in memory but is
        <strong>nowhere on the page</strong>: nobody sees it. <code>append</code> is what places it
        inside another element.</p>
        <p>Forgetting the third line is every beginner’s number one mistake: the code runs without
        a single error, and nothing appears.</p>
        <p>Combined with a loop, it becomes a whole list:</p>
        <pre>const courses = ["pain", "lait", "pommes"];
const liste = document.querySelector("#liste");

courses.forEach((article) =&gt; {
  const li = document.createElement("li");
  li.textContent = article;
  liste.append(li);
});</pre>
        <p>Three items, thirty or three thousand: the code does not change. <strong>This is the
        heart of every web application</strong> — a message arrives, a line appears.</p>
        <p>You can also <strong>remove</strong> an element: <code>li.remove()</code>, without even
        knowing where it sits.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h3>Ma liste de courses</h3>\n<ul id="liste"></ul>\n<p id="compte"></p>',
        js: 'const courses = ["pain", "lait", "pommes", "confiture"];\nconst liste = document.querySelector("#liste");\n\ncourses.forEach((article) => {\n  const li = document.createElement("li");\n  li.textContent = article;\n  liste.append(li);\n});\n\ndocument.querySelector("#compte").textContent = `${courses.length} articles`;\n\nconst oublie = document.createElement("li");\noublie.textContent = "Celui-ci n’est jamais accroché";\nconsole.log("Il existe, mais il est invisible :", oublie.textContent);',
      },
      note: {
        fr: 'Le dernier élément est créé et rempli, mais jamais accroché : regarde l’aperçu, il n’y est pas. C’est exactement l’erreur à reconnaître.',
        en: 'The last element is created and filled, but never attached: look at the preview, it is not there. That is precisely the mistake to recognise.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le <code>&lt;ul id="podium"&gt;</code> est <strong>vide</strong>. Remplis-le depuis le tableau <code>joueurs</code> : un <code>&lt;li&gt;</code> par joueur, contenant par exemple <code>Lina — 120 points</code>.</p><p>Tu dois obtenir <strong>trois</strong> <code>&lt;li&gt;</code>, fabriqués par ton code.</p>',
        en: '<p>The <code>&lt;ul id="podium"&gt;</code> is <strong>empty</strong>. Fill it from the <code>joueurs</code> array: one <code>&lt;li&gt;</code> per player, holding for example <code>Lina — 120 points</code>.</p><p>You must end up with <strong>three</strong> <code>&lt;li&gt;</code>, built by your code.</p>',
      },
      depart: {
        html: '<h3>Podium</h3>\n<ul id="podium"></ul>',
        js: 'const joueurs = [\n  { nom: "Lina", points: 120 },\n  { nom: "Nour", points: 95 },\n  { nom: "Théo", points: 40 }\n];\n\n// Fabrique un li par joueur et accroche-le au podium\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#podium li', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: '#podium li', quoi: 'texte', attendu: 'Lina' },
        { type: 'dom', selecteur: '#podium li', quoi: 'texte', attendu: '120' },
        {
          type: 'codeContient',
          motif: 'createElement\\s*\\(',
          message: {
            fr: 'Les éléments doivent être fabriqués avec <code>document.createElement("li")</code>.',
            en: 'The elements must be built with <code>document.createElement("li")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.append\\s*\\(|\\.appendChild\\s*\\(',
          message: {
            fr: 'Un élément créé n’apparaît que si on l’accroche : <code>podium.append(li);</code>.',
            en: 'A created element only appears once attached: <code>podium.append(li);</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Attrape d’abord la liste : <code>const podium = document.querySelector("#podium");</code>',
          en: 'First grab the list: <code>const podium = document.querySelector("#podium");</code>',
        },
        {
          fr: 'Puis <code>joueurs.forEach((joueur) => {</code> — et à l’intérieur, les trois étapes.',
          en: 'Then <code>joueurs.forEach((joueur) => {</code> — and inside, the three steps.',
        },
        {
          fr: 'Créer, remplir, accrocher : <code>const li = document.createElement("li");</code>, <code>li.textContent = …</code>, <code>podium.append(li);</code>',
          en: 'Create, fill, attach: <code>const li = document.createElement("li");</code>, <code>li.textContent = …</code>, <code>podium.append(li);</code>',
        },
      ],
      solution: {
        html: '<h3>Podium</h3>\n<ul id="podium"></ul>',
        js: 'const joueurs = [\n  { nom: "Lina", points: 120 },\n  { nom: "Nour", points: 95 },\n  { nom: "Théo", points: 40 }\n];\n\nconst podium = document.querySelector("#podium");\n\njoueurs.forEach((joueur) => {\n  const li = document.createElement("li");\n  li.textContent = `${joueur.nom} — ${joueur.points} points`;\n  podium.append(li);\n});',
      },
    },
  },

  'js-dom-4': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Choisir entre textContent et innerHTML — et comprendre pourquoi ce choix protège les gens.',
      en: 'Choose between textContent and innerHTML — and understand why that choice protects people.',
    },
    explication: {
      fr: `
        <p>Deux façons de mettre du contenu dans un élément. Elles se ressemblent, et elles ne font
        pas du tout la même chose.</p>
        <pre>boite.textContent = "&lt;b&gt;Bonjour&lt;/b&gt;";
// affiche littéralement :  &lt;b&gt;Bonjour&lt;/b&gt;

boite.innerHTML = "&lt;b&gt;Bonjour&lt;/b&gt;";
// affiche :  Bonjour   ← en gras</pre>
        <p><code>textContent</code> traite ce que tu donnes comme du <strong>texte</strong> :
        les chevrons restent des chevrons. <code>innerHTML</code> le traite comme du
        <strong>code HTML</strong> : le navigateur le lit et construit des éléments.</p>
        <p>Alors <code>innerHTML</code> est plus puissant. Pourquoi ne pas l’employer partout ?</p>
        <p><strong>Parce que ça devient dangereux dès que le texte vient de quelqu’un d’autre.</strong></p>
        <p>Imagine un mur de messages. Tu affiches ce que les visiteurs écrivent :</p>
        <pre>message.innerHTML = ceQuUnVisiteurATape;</pre>
        <p>Un visiteur malin n’écrit pas « bonjour ». Il écrit
        <code>&lt;img src="x" onerror="..."&gt;</code>, et le navigateur <strong>exécute</strong> ce
        qu’il a mis — sur la page, chez tous les autres visiteurs. Cette attaque a un nom, elle est
        parmi les plus répandues du web, et elle tient en une ligne de code mal choisie.</p>
        <p>Avec <code>textContent</code>, la même chaîne s’affiche telle quelle, comme du texte
        inoffensif. Rien ne s’exécute.</p>
        <p><strong>La règle, simple et sans exception :</strong></p>
        <ul>
          <li>du texte à afficher — surtout s’il vient d’un utilisateur → <code>textContent</code> ;</li>
          <li>de la structure HTML que <em>tu</em> as écrite toi-même → <code>innerHTML</code>,
          ou mieux : <code>createElement</code>, qui ne peut rien exécuter du tout.</li>
        </ul>
        <p>Ce n’est pas un détail de style. C’est ta première décision de sécurité en tant que
        programmeur.</p>
      `,
      en: `
        <p>Two ways to put content into an element. They look alike, and they do completely
        different things.</p>
        <pre>boite.textContent = "&lt;b&gt;Bonjour&lt;/b&gt;";
// literally shows:  &lt;b&gt;Bonjour&lt;/b&gt;

boite.innerHTML = "&lt;b&gt;Bonjour&lt;/b&gt;";
// shows:  Bonjour   ← in bold</pre>
        <p><code>textContent</code> treats what you give as <strong>text</strong>: angle brackets
        stay angle brackets. <code>innerHTML</code> treats it as <strong>HTML code</strong>: the
        browser reads it and builds elements.</p>
        <p>So <code>innerHTML</code> is more powerful. Why not use it everywhere?</p>
        <p><strong>Because it becomes dangerous as soon as the text comes from someone else.</strong></p>
        <p>Imagine a message wall. You display what visitors write:</p>
        <pre>message.innerHTML = ceQuUnVisiteurATape;</pre>
        <p>A clever visitor does not write "hello". They write
        <code>&lt;img src="x" onerror="..."&gt;</code>, and the browser <strong>runs</strong> what
        they put — on the page, for every other visitor. This attack has a name, it is among the
        most widespread on the web, and it fits in one badly chosen line of code.</p>
        <p>With <code>textContent</code>, the same string shows up as it is, as harmless text.
        Nothing runs.</p>
        <p><strong>The rule, simple and without exception:</strong></p>
        <ul>
          <li>text to display — especially from a user → <code>textContent</code>;</li>
          <li>HTML structure <em>you</em> wrote yourself → <code>innerHTML</code>, or better:
          <code>createElement</code>, which cannot execute anything at all.</li>
        </ul>
        <p>This is not a style detail. It is your first security decision as a programmer.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h4>Avec textContent</h4>\n<div id="sur" style="border:1px solid #ccc;padding:8px"></div>\n<h4>Avec innerHTML</h4>\n<div id="risque" style="border:1px solid #ccc;padding:8px"></div>',
        js: 'const messageDuVisiteur = "<b>Salut</b> tout le monde";\n\ndocument.querySelector("#sur").textContent = messageDuVisiteur;\ndocument.querySelector("#risque").innerHTML = messageDuVisiteur;\n\nconsole.log(`Enfants créés par textContent : ${document.querySelector("#sur").children.length}`);\nconsole.log(`Enfants créés par innerHTML  : ${document.querySelector("#risque").children.length}`);',
      },
      note: {
        fr: 'Regarde l’aperçu : la même chaîne, deux résultats. Et la console compte les éléments réellement fabriqués — zéro d’un côté, un de l’autre.',
        en: 'Look at the preview: the same string, two results. And the console counts the elements actually built — zero on one side, one on the other.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Trois messages arrivent de visiteurs. L’un d’eux contient du HTML. Affiche-les dans <code>#mur</code>, un <code>&lt;p&gt;</code> par message, <strong>sans jamais exécuter leur contenu</strong>.</p><p>Si tu t’y prends bien, le troisième message s’affichera avec ses chevrons visibles, comme du texte ordinaire — et le <code>#mur</code> contiendra exactement <strong>3</strong> paragraphes, pas un de plus.</p>',
        en: '<p>Three messages arrive from visitors. One contains HTML. Show them in <code>#mur</code>, one <code>&lt;p&gt;</code> per message, <strong>without ever running their content</strong>.</p><p>Done right, the third message shows with its angle brackets visible, as ordinary text — and <code>#mur</code> will hold exactly <strong>3</strong> paragraphs, not one more.</p>',
      },
      depart: {
        html: '<h3>Mur de messages</h3>\n<div id="mur"></div>',
        js: 'const messages = [\n  "Bonjour tout le monde",\n  "J’adore ce site",\n  "<b>REGARDEZ-MOI</b><img src=x>"\n];\n\n// Affiche chaque message dans un p, sans exécuter son contenu\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#mur p', quoi: 'nombre', attendu: 3 },
        {
          type: 'dom',
          selecteur: '#mur b',
          quoi: 'nombre',
          attendu: 0,
          message: {
            fr: 'Le HTML du visiteur a été exécuté : un <code>&lt;b&gt;</code> est apparu dans ta page. C’est exactement ce qu’il fallait empêcher.',
            en: 'The visitor’s HTML ran: a <code>&lt;b&gt;</code> appeared in your page. That is precisely what had to be prevented.',
          },
        },
        {
          type: 'dom',
          selecteur: '#mur img',
          quoi: 'nombre',
          attendu: 0,
          message: {
            fr: 'Une image du visiteur s’est glissée dans la page : tu as employé <code>innerHTML</code> là où il fallait <code>textContent</code>.',
            en: 'A visitor image slipped into the page: you used <code>innerHTML</code> where <code>textContent</code> was needed.',
          },
        },
        { type: 'dom', selecteur: '#mur p', quoi: 'texte', attendu: 'Bonjour tout le monde' },
        {
          type: 'codeContient',
          motif: 'textContent',
          message: {
            fr: 'Le contenu d’un visiteur se pose avec <code>textContent</code>.',
            en: 'Visitor content is placed with <code>textContent</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'innerHTML',
          message: {
            fr: 'Pas de <code>innerHTML</code> dans ce défi : c’est précisément ce qu’il ne faut pas faire avec du texte reçu.',
            en: 'No <code>innerHTML</code> in this challenge: that is exactly what must not be done with received text.',
          },
        },
      ],
      indices: [
        {
          fr: 'Le squelette est le même qu’à la leçon précédente : <code>messages.forEach((message) => {</code>',
          en: 'The skeleton is the same as the previous lesson: <code>messages.forEach((message) => {</code>',
        },
        {
          fr: 'Crée un <code>p</code> : <code>const p = document.createElement("p");</code>',
          en: 'Create a <code>p</code>: <code>const p = document.createElement("p");</code>',
        },
        {
          fr: 'Et remplis-le par <code>p.textContent = message;</code> — jamais <code>p.innerHTML</code>.',
          en: 'And fill it with <code>p.textContent = message;</code> — never <code>p.innerHTML</code>.',
        },
      ],
      solution: {
        html: '<h3>Mur de messages</h3>\n<div id="mur"></div>',
        js: 'const messages = [\n  "Bonjour tout le monde",\n  "J’adore ce site",\n  "<b>REGARDEZ-MOI</b><img src=x>"\n];\n\nconst mur = document.querySelector("#mur");\n\nmessages.forEach((message) => {\n  const p = document.createElement("p");\n  p.textContent = message;\n  mur.append(p);\n});',
      },
    },
  },

  'js-dom-5': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Faire arriver quelque chose plus tard, avec setTimeout.',
      en: 'Make something happen later, with setTimeout.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici ton code s’exécutait d’un bloc, de haut en bas. <code>setTimeout</code> permet
        de dire : <em>« ceci, mais dans deux secondes »</em>.</p>
        <pre>setTimeout(() =&gt; {
  message.textContent = "Enregistré !";
}, 2000);</pre>
        <p>Deux arguments : <strong>ce qu’il faut faire</strong> (une fonction), et
        <strong>dans combien de temps</strong>, en millisecondes. 1000 millisecondes font une
        seconde.</p>
        <p><strong>Le point qui surprend :</strong> le programme <em>ne s’arrête pas</em> pendant ce
        temps. Il continue immédiatement la ligne suivante.</p>
        <pre>console.log("un");
setTimeout(() =&gt; console.log("deux"), 1000);
console.log("trois");

// affiche : un, trois, puis deux une seconde plus tard</pre>
        <p><code>trois</code> passe avant <code>deux</code>. Ce n’est pas un bug : JavaScript a mis
        la fonction de côté et a continué. C’est ce qu’on appelle du code
        <strong>asynchrone</strong>, et c’est une des idées les plus importantes du langage — celle
        qui permet à une page de rester réactive pendant qu’elle attend quelque chose.</p>
        <p><strong>Ne confonds pas avec <code>setInterval</code></strong>, que tu as vu au module
        animation : <code>setInterval</code> répète indéfiniment, <code>setTimeout</code> agit
        <em>une seule fois</em>.</p>
        <p>Usages courants : un message de confirmation qui disparaît tout seul, une infobulle qui
        attend un instant avant de s’afficher, un indice qui apparaît après quelques secondes de
        réflexion.</p>
      `,
      en: `
        <p>So far your code ran in one block, top to bottom. <code>setTimeout</code> lets you say:
        <em>"this, but in two seconds"</em>.</p>
        <pre>setTimeout(() =&gt; {
  message.textContent = "Saved!";
}, 2000);</pre>
        <p>Two arguments: <strong>what to do</strong> (a function), and <strong>how long
        from now</strong>, in milliseconds. 1000 milliseconds make one second.</p>
        <p><strong>The surprising part:</strong> the program <em>does not stop</em> during that
        time. It moves to the next line immediately.</p>
        <pre>console.log("un");
setTimeout(() =&gt; console.log("deux"), 1000);
console.log("trois");

// prints: un, trois, then deux one second later</pre>
        <p><code>trois</code> comes before <code>deux</code>. Not a bug: JavaScript set the function
        aside and carried on. This is called <strong>asynchronous</strong> code, and it is one of
        the most important ideas in the language — the one that lets a page stay responsive while
        it waits for something.</p>
        <p><strong>Do not confuse it with <code>setInterval</code></strong>, seen in the animation
        module: <code>setInterval</code> repeats forever, <code>setTimeout</code> acts <em>once</em>.</p>
        <p>Common uses: a confirmation message that fades by itself, a tooltip that waits a moment
        before showing, a hint that appears after a few seconds of thinking.</p>
      `,
    },
    exemple: {
      code: {
        html: '<p id="etat">Prêt</p>',
        js: 'const etat = document.querySelector("#etat");\n\nconsole.log("un");\nsetTimeout(() => console.log("deux"), 300);\nconsole.log("trois");\n\netat.textContent = "Enregistrement…";\n\nsetTimeout(() => {\n  etat.textContent = "Enregistré !";\n}, 200);\n\nsetTimeout(() => {\n  etat.textContent = "Prêt";\n}, 500);',
      },
      note: {
        fr: 'Regarde l’ordre dans la console : un, trois, deux. Et l’aperçu passe par trois états successifs, sans que le programme n’ait jamais attendu.',
        en: 'Look at the order in the console: un, trois, deux. And the preview goes through three successive states, without the program ever waiting.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Quand on clique sur le bouton, le message <code>#info</code> doit afficher <code>Copié !</code>, puis redevenir <code>Rien</code> <strong>après 300 millisecondes</strong>.</p><p>Avant tout clic, il doit afficher <code>Rien</code>.</p>',
        en: '<p>When the button is clicked, the <code>#info</code> message must show <code>Copié !</code>, then go back to <code>Rien</code> <strong>after 300 milliseconds</strong>.</p><p>Before any click, it must show <code>Rien</code>.</p>',
      },
      depart: {
        html: '<button id="copier">Copier</button>\n<p id="info">Rien</p>',
        js: 'const copier = document.querySelector("#copier");\nconst info = document.querySelector("#info");\n\n// Au clic : « Copié ! », puis « Rien » 300 ms plus tard\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#info', quoi: 'texte', attendu: 'Rien' },
        {
          type: 'dom',
          clic: '#copier',
          selecteur: '#info',
          quoi: 'texte',
          attendu: 'Copié !',
          message: {
            fr: 'Juste après le clic, le message doit afficher <code>Copié !</code>.',
            en: 'Right after the click, the message must show <code>Copié !</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'setTimeout\\s*\\(',
          message: {
            fr: 'Le retour au texte d’origine se programme avec <code>setTimeout</code>.',
            en: 'Going back to the original text is scheduled with <code>setTimeout</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: ',\\s*300\\s*\\)',
          message: {
            fr: 'Le délai demandé est de 300 millisecondes.',
            en: 'The requested delay is 300 milliseconds.',
          },
        },
      ],
      indices: [
        {
          fr: 'Pose l’écouteur : <code>copier.addEventListener("click", () => {</code>',
          en: 'Attach the listener: <code>copier.addEventListener("click", () => {</code>',
        },
        {
          fr: 'Dedans, change d’abord le texte : <code>info.textContent = "Copié !";</code>',
          en: 'Inside, first change the text: <code>info.textContent = "Copié !";</code>',
        },
        {
          fr: 'Puis, toujours dedans : <code>setTimeout(() => { info.textContent = "Rien"; }, 300);</code>',
          en: 'Then, still inside: <code>setTimeout(() => { info.textContent = "Rien"; }, 300);</code>',
        },
      ],
      solution: {
        html: '<button id="copier">Copier</button>\n<p id="info">Rien</p>',
        js: 'const copier = document.querySelector("#copier");\nconst info = document.querySelector("#info");\n\ncopier.addEventListener("click", () => {\n  info.textContent = "Copié !";\n  setTimeout(() => {\n    info.textContent = "Rien";\n  }, 300);\n});',
      },
    },
  },

  /* ============================== js-form : lire ce qu on te donne ======= */

  'js-form-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Lire ce que quelqu’un a tapé dans un champ.',
      en: 'Read what someone typed into a field.',
    },
    explication: {
      fr: `
        <p>Un <code>&lt;input&gt;</code> n’est pas comme les autres éléments. Son contenu n’est pas
        entre les balises — il n’y a rien entre les balises. Ce que l’utilisateur a tapé vit dans
        une propriété à part : <strong><code>value</code></strong>.</p>
        <pre>const champ = document.querySelector("#prenom");
console.log(champ.value);   // ce qui est écrit dedans</pre>
        <p><code>textContent</code> sur un champ rendrait une chaîne vide. C’est
        <code>value</code>, toujours.</p>
        <p>Et <code>value</code> s’écrit aussi, pour remplir ou vider le champ :</p>
        <pre>champ.value = "";           // on le vide
champ.value = "Lina";       // on le pré-remplit</pre>
        <p><strong>Le piège numéro un, et il est de taille :</strong></p>
        <pre>const age = document.querySelector("#age").value;
console.log(age + 1);   // "121" si on a tapé 12 !</pre>
        <p><code>value</code> est <strong>toujours du texte</strong>. Même dans un
        <code>&lt;input type="number"&gt;</code>. C’est exactement le <code>"2" + 2</code> de la
        leçon sur le texte, et c’est là qu’il frappe pour de vrai. Il faut convertir :</p>
        <pre>const age = Number(document.querySelector("#age").value);</pre>
        <p><strong>Second piège :</strong> les gens tapent des espaces avant et après sans le
        vouloir. <code>.trim()</code> les enlève, et évite de comparer <code>" Lina"</code> à
        <code>"Lina"</code>.</p>
        <p>Enfin, il faut lire <code>value</code> <strong>au moment du clic</strong>, pas au
        chargement de la page : au chargement, le champ est encore vide.</p>
      `,
      en: `
        <p>An <code>&lt;input&gt;</code> is unlike other elements. Its content is not between the
        tags — there is nothing between the tags. What the user typed lives in a separate property:
        <strong><code>value</code></strong>.</p>
        <pre>const champ = document.querySelector("#prenom");
console.log(champ.value);   // what is written inside</pre>
        <p><code>textContent</code> on a field would return an empty string. It is
        <code>value</code>, always.</p>
        <p>And <code>value</code> can be written too, to fill or clear the field:</p>
        <pre>champ.value = "";           // clear it
champ.value = "Lina";       // pre-fill it</pre>
        <p><strong>Trap number one, and it is a big one:</strong></p>
        <pre>const age = document.querySelector("#age").value;
console.log(age + 1);   // "121" if 12 was typed!</pre>
        <p><code>value</code> is <strong>always text</strong>. Even in an
        <code>&lt;input type="number"&gt;</code>. This is exactly the <code>"2" + 2</code> from the
        text lesson, and here is where it really bites. You must convert:</p>
        <pre>const age = Number(document.querySelector("#age").value);</pre>
        <p><strong>Second trap:</strong> people type spaces before and after without meaning to.
        <code>.trim()</code> removes them, and avoids comparing <code>" Lina"</code> with
        <code>"Lina"</code>.</p>
        <p>Finally, read <code>value</code> <strong>at the moment of the click</strong>, not at page
        load: at load time the field is still empty.</p>
      `,
    },
    exemple: {
      code: {
        html: '<input id="prenom" value="Lina">\n<input id="age" type="number" value="12">\n<button id="ok">Valider</button>\n<p id="resultat"></p>',
        js: 'const ok = document.querySelector("#ok");\nconst resultat = document.querySelector("#resultat");\n\nok.addEventListener("click", () => {\n  const prenom = document.querySelector("#prenom").value.trim();\n  const ageTexte = document.querySelector("#age").value;\n\n  console.log(`Sans conversion : ${ageTexte + 1}`);\n  console.log(`Avec conversion : ${Number(ageTexte) + 1}`);\n\n  resultat.textContent = `${prenom}, tu auras ${Number(ageTexte) + 1} ans l’an prochain.`;\n});\n\nok.click();',
      },
      note: {
        fr: 'La dernière ligne clique toute seule, pour que tu voies le résultat sans rien faire. Change les valeurs dans l’aperçu et reclique : les deux lignes de console montrent le piège.',
        en: 'The last line clicks by itself, so you see the result without doing anything. Change the values in the preview and click again: the two console lines show the trap.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Au clic sur <code>#calculer</code>, additionne les deux nombres saisis et écris le résultat dans <code>#total</code>, sous la forme :</p><pre>Total : 12</pre><p>Les champs contiennent <code>7</code> et <code>5</code>. Si tu obtiens <code>Total : 75</code>, tu sais pourquoi.</p><p>Avant le clic, <code>#total</code> doit rester vide.</p>',
        en: '<p>On clicking <code>#calculer</code>, add the two entered numbers and write the result into <code>#total</code>, in the form:</p><pre>Total : 12</pre><p>The fields hold <code>7</code> and <code>5</code>. If you get <code>Total : 75</code>, you know why.</p><p>Before the click, <code>#total</code> must stay empty.</p>',
      },
      depart: {
        html: '<input id="a" type="number" value="7">\n<input id="b" type="number" value="5">\n<button id="calculer">Calculer</button>\n<p id="total"></p>',
        js: 'const calculer = document.querySelector("#calculer");\nconst total = document.querySelector("#total");\n\n// Au clic : lis les deux champs, convertis, additionne, affiche\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#total', quoi: 'texte', attendu: '', exact: true },
        {
          type: 'dom',
          clic: '#calculer',
          selecteur: '#total',
          quoi: 'texte',
          attendu: 'Total : 12',
          exact: true,
          message: {
            fr: 'Après le clic, <code>#total</code> doit afficher exactement <code>Total : 12</code>. Un <code>Total : 75</code> signifie que tu as collé deux textes au lieu d’additionner deux nombres.',
            en: 'After the click, <code>#total</code> must show exactly <code>Total : 12</code>. A <code>Total : 75</code> means you glued two texts instead of adding two numbers.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.value',
          message: {
            fr: 'Le contenu d’un champ se lit avec <code>.value</code>.',
            en: 'A field’s content is read with <code>.value</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'Number\\s*\\(|parseInt\\s*\\(|parseFloat\\s*\\(',
          message: {
            fr: 'Convertis les deux valeurs en nombres avant de les additionner.',
            en: 'Convert both values into numbers before adding them.',
          },
        },
      ],
      indices: [
        {
          fr: 'Tout se passe dans <code>calculer.addEventListener("click", () => {</code> — pas avant.',
          en: 'Everything happens inside <code>calculer.addEventListener("click", () => {</code> — not before.',
        },
        {
          fr: 'Lis et convertis d’un coup : <code>const a = Number(document.querySelector("#a").value);</code>',
          en: 'Read and convert at once: <code>const a = Number(document.querySelector("#a").value);</code>',
        },
        {
          fr: 'Puis : <code>total.textContent = `Total : ${a + b}`;</code>',
          en: 'Then: <code>total.textContent = `Total : ${a + b}`;</code>',
        },
      ],
      solution: {
        html: '<input id="a" type="number" value="7">\n<input id="b" type="number" value="5">\n<button id="calculer">Calculer</button>\n<p id="total"></p>',
        js: 'const calculer = document.querySelector("#calculer");\nconst total = document.querySelector("#total");\n\ncalculer.addEventListener("click", () => {\n  const a = Number(document.querySelector("#a").value);\n  const b = Number(document.querySelector("#b").value);\n  total.textContent = `Total : ${a + b}`;\n});',
      },
    },
  },

  'js-form-2': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Intercepter l’envoi d’un formulaire — et voir ce qui se passe quand on oublie.',
      en: 'Intercept a form submission — and see what happens when you forget.',
    },
    explication: {
      fr: `
        <p>Un <code>&lt;form&gt;</code> n’est pas qu’un groupe de champs. Il a un
        <strong>comportement par défaut</strong>, et il est violent : quand on l’envoie — par le
        bouton, ou simplement en appuyant sur Entrée dans un champ — le navigateur
        <strong>recharge la page</strong>.</p>
        <p>C’est un héritage du web d’avant JavaScript : le formulaire partait vers un serveur, qui
        renvoyait une nouvelle page. Aujourd’hui on veut traiter la saisie <em>sur place</em>.</p>
        <p>D’où cette ligne, que tu vas écrire des centaines de fois :</p>
        <pre>formulaire.addEventListener("submit", (evenement) =&gt; {
  evenement.preventDefault();
  // ici, le vrai travail
});</pre>
        <p><code>evenement</code> est l’objet que le navigateur te passe pour décrire ce qui vient
        d’arriver. <code>preventDefault()</code> lui dit : <em>« n’applique pas ton comportement
        habituel, je m’en occupe »</em>.</p>
        <p><strong>Ce qui se passe si tu oublies</strong> — et c’est mesurable, pas théorique : la
        page repart de zéro. Ton message disparaît aussitôt qu’il s’affiche, les variables sont
        réinitialisées, et même un <code>setTimeout</code> en attente est détruit. Le symptôme
        classique : « ça marche une demi-seconde puis tout s’efface ». Neuf fois sur dix, c’est un
        <code>preventDefault</code> manquant.</p>
        <p><strong>Pourquoi écouter <code>submit</code> plutôt que le clic du bouton ?</strong>
        Parce que <code>submit</code> attrape aussi la touche <strong>Entrée</strong>, que beaucoup
        de gens utilisent sans jamais toucher au bouton. Écouter le clic laisserait ces gens-là de
        côté.</p>
      `,
      en: `
        <p>A <code>&lt;form&gt;</code> is not just a group of fields. It has a <strong>default
        behaviour</strong>, and it is brutal: when submitted — by the button, or simply by pressing
        Enter in a field — the browser <strong>reloads the page</strong>.</p>
        <p>This is a legacy of the web before JavaScript: the form went off to a server, which sent
        back a new page. Today we want to handle the input <em>on the spot</em>.</p>
        <p>Hence this line, which you will write hundreds of times:</p>
        <pre>formulaire.addEventListener("submit", (evenement) =&gt; {
  evenement.preventDefault();
  // here, the real work
});</pre>
        <p><code>evenement</code> is the object the browser hands you describing what just happened.
        <code>preventDefault()</code> tells it: <em>"do not apply your usual behaviour, I will
        handle it"</em>.</p>
        <p><strong>What happens if you forget</strong> — and this is measurable, not theoretical:
        the page starts over. Your message vanishes the instant it appears, variables are reset,
        and even a pending <code>setTimeout</code> is destroyed. The classic symptom: "it works for
        half a second then everything clears". Nine times out of ten, that is a missing
        <code>preventDefault</code>.</p>
        <p><strong>Why listen to <code>submit</code> rather than the button click?</strong> Because
        <code>submit</code> also catches the <strong>Enter</strong> key, which many people use
        without ever touching the button. Listening to the click would leave those people out.</p>
      `,
    },
    exemple: {
      code: {
        html: '<form id="formulaire">\n  <input id="prenom" value="Lina">\n  <button type="submit">Envoyer</button>\n</form>\n<p id="salut"></p>',
        js: 'const formulaire = document.querySelector("#formulaire");\nconst salut = document.querySelector("#salut");\n\nformulaire.addEventListener("submit", (evenement) => {\n  evenement.preventDefault();\n  const prenom = document.querySelector("#prenom").value.trim();\n  salut.textContent = `Bonjour ${prenom} !`;\n  console.log("Envoi intercepté, la page n’a pas bougé.");\n});\n\nformulaire.requestSubmit();',
      },
      note: {
        fr: 'Essaie de commenter la ligne `preventDefault` puis relance : le message apparaît et disparaît aussitôt, parce que la page se recharge. C’est le défaut à reconnaître.',
        en: 'Try commenting out the `preventDefault` line and run again: the message appears and vanishes at once, because the page reloads. That is the fault to recognise.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Au moment de l’envoi du formulaire, écris dans <code>#accueil</code> :</p><pre>Bienvenue Nour !</pre><p>Trois conditions :</p><ul><li>écoute l’événement <strong><code>submit</code></strong> du formulaire, pas le clic du bouton ;</li><li>appelle <strong><code>preventDefault()</code></strong>, sinon le message disparaîtra aussitôt ;</li><li>avant l’envoi, <code>#accueil</code> doit être vide.</li></ul>',
        en: '<p>When the form is submitted, write into <code>#accueil</code>:</p><pre>Bienvenue Nour !</pre><p>Three conditions:</p><ul><li>listen to the form’s <strong><code>submit</code></strong> event, not the button click;</li><li>call <strong><code>preventDefault()</code></strong>, otherwise the message vanishes at once;</li><li>before submission, <code>#accueil</code> must be empty.</li></ul>',
      },
      depart: {
        html: '<form id="inscription">\n  <input id="pseudo" value="Nour">\n  <button id="envoyer" type="submit">S’inscrire</button>\n</form>\n<p id="accueil"></p>',
        js: 'const inscription = document.querySelector("#inscription");\nconst accueil = document.querySelector("#accueil");\n\n// Intercepte l’envoi et souhaite la bienvenue\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#accueil', quoi: 'texte', attendu: '', exact: true },
        {
          type: 'dom',
          clic: '#envoyer',
          selecteur: '#accueil',
          quoi: 'texte',
          attendu: 'Bienvenue Nour !',
          exact: true,
          message: {
            fr: 'Après l’envoi, <code>#accueil</code> doit afficher <code>Bienvenue Nour !</code>. S’il est vide, la page s’est rechargée : il manque <code>preventDefault()</code>.',
            en: 'After submission, <code>#accueil</code> must show <code>Bienvenue Nour !</code>. If it is empty, the page reloaded: <code>preventDefault()</code> is missing.',
          },
        },
        {
          type: 'codeContient',
          motif: 'addEventListener\\s*\\(\\s*["\']submit["\']',
          message: {
            fr: 'Écoute l’événement <code>submit</code> du formulaire : il attrape aussi la touche Entrée.',
            en: 'Listen to the form’s <code>submit</code> event: it also catches the Enter key.',
          },
        },
        {
          type: 'codeContient',
          motif: 'preventDefault\\s*\\(\\s*\\)',
          message: {
            fr: 'Sans <code>evenement.preventDefault()</code>, le navigateur recharge la page et ton message disparaît.',
            en: 'Without <code>evenement.preventDefault()</code>, the browser reloads the page and your message vanishes.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.value',
          message: {
            fr: 'Le pseudo doit être lu dans le champ avec <code>.value</code>, pas recopié.',
            en: 'The nickname must be read from the field with <code>.value</code>, not retyped.',
          },
        },
      ],
      indices: [
        {
          fr: 'La forme : <code>inscription.addEventListener("submit", (evenement) => {</code>',
          en: 'The shape: <code>inscription.addEventListener("submit", (evenement) => {</code>',
        },
        {
          fr: 'Première ligne à l’intérieur, toujours : <code>evenement.preventDefault();</code>',
          en: 'First line inside, always: <code>evenement.preventDefault();</code>',
        },
        {
          fr: 'Puis lis le pseudo et écris : <code>accueil.textContent = `Bienvenue ${pseudo} !`;</code>',
          en: 'Then read the nickname and write: <code>accueil.textContent = `Bienvenue ${pseudo} !`;</code>',
        },
      ],
      solution: {
        html: '<form id="inscription">\n  <input id="pseudo" value="Nour">\n  <button id="envoyer" type="submit">S’inscrire</button>\n</form>\n<p id="accueil"></p>',
        js: 'const inscription = document.querySelector("#inscription");\nconst accueil = document.querySelector("#accueil");\n\ninscription.addEventListener("submit", (evenement) => {\n  evenement.preventDefault();\n  const pseudo = document.querySelector("#pseudo").value.trim();\n  accueil.textContent = `Bienvenue ${pseudo} !`;\n});',
      },
    },
  },

  'js-form-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Vérifier une saisie avant de l’accepter, et le dire clairement.',
      en: 'Check an entry before accepting it, and say so clearly.',
    },
    explication: {
      fr: `
        <p>Un formulaire qui accepte n’importe quoi produit n’importe quoi. Avant de traiter une
        saisie, on la <strong>valide</strong>.</p>
        <p>Les trois questions qui reviennent toujours :</p>
        <pre>const valeur = champ.value.trim();

if (valeur === "") { … }                 // vide ?
if (valeur.length &lt; 3) { … }             // trop court ?
if (Number(valeur) &gt; 20) { … }           // hors limites ?</pre>
        <p>Le <code>.trim()</code> est indispensable : sans lui, un champ contenant trois espaces
        passerait le test du vide.</p>
        <p><strong>Le motif à retenir — refuser tôt :</strong></p>
        <pre>formulaire.addEventListener("submit", (e) =&gt; {
  e.preventDefault();
  const pseudo = champ.value.trim();

  if (pseudo === "") {
    message.textContent = "Il faut un pseudo.";
    return;                    // ← on s’arrête là
  }

  message.textContent = \`Bienvenue \${pseudo} !\`;
});</pre>
        <p>Le <code>return</code> quitte la fonction immédiatement. Sans lui, le code continuerait
        et écraserait le message d’erreur par le message de bienvenue — un bug déroutant : « mon
        message d’erreur s’affiche une fraction de seconde puis disparaît ».</p>
        <p><strong>Un message d’erreur utile dit quoi faire.</strong> « Erreur » n’aide personne.
        « Le pseudo doit faire au moins 3 caractères » se corrige tout seul. C’est le même principe
        que les messages de ce logiciel quand tu rates un défi.</p>
      `,
      en: `
        <p>A form that accepts anything produces anything. Before handling an entry, you
        <strong>validate</strong> it.</p>
        <p>The three questions that always come back:</p>
        <pre>const valeur = champ.value.trim();

if (valeur === "") { … }                 // empty?
if (valeur.length &lt; 3) { … }             // too short?
if (Number(valeur) &gt; 20) { … }           // out of range?</pre>
        <p>The <code>.trim()</code> is essential: without it, a field holding three spaces would
        pass the empty test.</p>
        <p><strong>The pattern to remember — refuse early:</strong></p>
        <pre>formulaire.addEventListener("submit", (e) =&gt; {
  e.preventDefault();
  const pseudo = champ.value.trim();

  if (pseudo === "") {
    message.textContent = "A nickname is required.";
    return;                    // ← stop here
  }

  message.textContent = \`Welcome \${pseudo}!\`;
});</pre>
        <p>The <code>return</code> leaves the function immediately. Without it the code would carry
        on and overwrite the error message with the welcome message — a baffling bug: "my error
        message shows for a split second then disappears".</p>
        <p><strong>A useful error message says what to do.</strong> "Error" helps nobody. "The
        nickname must be at least 3 characters" fixes itself. Same principle as the messages this
        software gives you when you miss a challenge.</p>
      `,
    },
    exemple: {
      code: {
        html: '<form id="f">\n  <input id="pseudo" value="ab">\n  <button type="submit">Valider</button>\n</form>\n<p id="message"></p>',
        js: 'const f = document.querySelector("#f");\nconst champ = document.querySelector("#pseudo");\nconst message = document.querySelector("#message");\n\nf.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const pseudo = champ.value.trim();\n\n  if (pseudo === "") {\n    message.textContent = "Il faut un pseudo.";\n    return;\n  }\n  if (pseudo.length < 3) {\n    message.textContent = `« ${pseudo} » est trop court : 3 caractères minimum.`;\n    return;\n  }\n\n  message.textContent = `Bienvenue ${pseudo} !`;\n});\n\nf.requestSubmit();',
      },
      note: {
        fr: 'Le champ contient « ab » : le deuxième contrôle se déclenche. Change-le en « abc » dans l’aperçu et revalide pour voir passer le message de bienvenue.',
        en: 'The field holds "ab": the second check fires. Change it to "abc" in the preview and submit again to see the welcome message.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le champ attend une note sur 20. À l’envoi, écris dans <code>#verdict</code> :</p><ul><li>si la note est <strong>supérieure à 20</strong> → <code>Impossible : 20 maximum</code> ;</li><li>sinon → <code>Note enregistrée : 25</code>… enfin, la vraie note.</li></ul><p>Le champ contient <strong>25</strong> : c’est donc le message de refus qui doit apparaître.</p><p>N’oublie ni <code>preventDefault()</code>, ni le <code>return</code> après le refus.</p>',
        en: '<p>The field expects a mark out of 20. On submit, write into <code>#verdict</code>:</p><ul><li>if the mark is <strong>above 20</strong> → <code>Impossible : 20 maximum</code>;</li><li>otherwise → <code>Note enregistrée : …</code> with the real mark.</li></ul><p>The field holds <strong>25</strong>: so the refusal message must appear.</p><p>Do not forget <code>preventDefault()</code>, nor the <code>return</code> after the refusal.</p>',
      },
      depart: {
        html: '<form id="f">\n  <input id="note" type="number" value="25">\n  <button id="valider" type="submit">Valider</button>\n</form>\n<p id="verdict"></p>',
        js: 'const f = document.querySelector("#f");\nconst verdict = document.querySelector("#verdict");\n\n// Refuse une note au-dessus de 20, accepte les autres\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#verdict', quoi: 'texte', attendu: '', exact: true },
        {
          type: 'dom',
          clic: '#valider',
          selecteur: '#verdict',
          quoi: 'texte',
          attendu: 'Impossible : 20 maximum',
          exact: true,
          message: {
            fr: 'La note vaut 25 : <code>#verdict</code> doit afficher exactement <code>Impossible : 20 maximum</code>. Si tu lis « Note enregistrée », il manque le <code>return</code> après le refus.',
            en: 'The mark is 25: <code>#verdict</code> must show exactly <code>Impossible : 20 maximum</code>. If you read "Note enregistrée", the <code>return</code> after the refusal is missing.',
          },
        },
        {
          type: 'codeContient',
          motif: 'preventDefault\\s*\\(\\s*\\)',
          message: {
            fr: 'Il faut toujours <code>evenement.preventDefault()</code> sur un <code>submit</code>.',
            en: 'A <code>submit</code> always needs <code>evenement.preventDefault()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\breturn\\b',
          message: {
            fr: 'Après avoir affiché le refus, il faut <code>return;</code> pour ne pas continuer.',
            en: 'After showing the refusal you need <code>return;</code> so the code does not carry on.',
          },
        },
        {
          type: 'codeContient',
          motif: 'Number\\s*\\(|parseInt\\s*\\(|parseFloat\\s*\\(',
          message: {
            fr: 'Compare un <em>nombre</em>, pas du texte : convertis la valeur du champ.',
            en: 'Compare a <em>number</em>, not text: convert the field value.',
          },
        },
      ],
      indices: [
        {
          fr: 'Le squelette est celui de la leçon précédente : <code>submit</code> puis <code>preventDefault()</code>.',
          en: 'The skeleton is the previous lesson’s: <code>submit</code> then <code>preventDefault()</code>.',
        },
        {
          fr: 'Lis et convertis : <code>const note = Number(document.querySelector("#note").value);</code>',
          en: 'Read and convert: <code>const note = Number(document.querySelector("#note").value);</code>',
        },
        {
          fr: 'Puis <code>if (note > 20) { verdict.textContent = "Impossible : 20 maximum"; return; }</code>, et la ligne d’acceptation en dessous.',
          en: 'Then <code>if (note > 20) { verdict.textContent = "Impossible : 20 maximum"; return; }</code>, with the acceptance line below.',
        },
      ],
      solution: {
        html: '<form id="f">\n  <input id="note" type="number" value="25">\n  <button id="valider" type="submit">Valider</button>\n</form>\n<p id="verdict"></p>',
        js: 'const f = document.querySelector("#f");\nconst verdict = document.querySelector("#verdict");\n\nf.addEventListener("submit", (evenement) => {\n  evenement.preventDefault();\n  const note = Number(document.querySelector("#note").value);\n\n  if (note > 20) {\n    verdict.textContent = "Impossible : 20 maximum";\n    return;\n  }\n\n  verdict.textContent = `Note enregistrée : ${note}`;\n});',
      },
    },
  },

  'js-form-4': {
    langage: 'javascript',
    xp: 45,
    objectif: {
      fr: 'Réunir tout le module en une vraie petite application : la liste de tâches.',
      en: 'Bring the whole module together into a real little application: the to-do list.',
    },
    explication: {
      fr: `
        <p>Tu as maintenant toutes les pièces. Cette leçon ne t’apprend rien de neuf : elle les
        assemble.</p>
        <p>Une liste de tâches, c’est quatre choses que tu sais déjà faire :</p>
        <ol>
          <li><strong>intercepter</strong> l’envoi du formulaire — <code>submit</code> +
          <code>preventDefault</code> ;</li>
          <li><strong>lire</strong> ce qui a été tapé — <code>.value.trim()</code> ;</li>
          <li><strong>refuser</strong> si c’est vide — <code>if</code> + <code>return</code> ;</li>
          <li><strong>fabriquer</strong> la ligne et l’accrocher — <code>createElement</code>,
          <code>textContent</code>, <code>append</code>.</li>
        </ol>
        <p>Et un cinquième geste, tout petit, qui change tout pour celui qui s’en sert :</p>
        <pre>champ.value = "";   // on vide le champ après l’ajout</pre>
        <p>Sans cette ligne, il faut effacer à la main avant chaque tâche. Avec elle, on enchaîne.
        C’est le genre de détail qui sépare un exercice d’un outil qu’on utilise vraiment.</p>
        <p><strong>Un mot sur ce qui ne marche pas ici :</strong> une vraie liste de tâches
        retiendrait tes ajouts après fermeture. Cela demande <code>localStorage</code>, qui est
        indisponible dans cet aperçu — la dernière leçon du parcours explique précisément
        pourquoi. Pour l’instant, la liste vit le temps de la page. C’est déjà une application.</p>
      `,
      en: `
        <p>You now have all the pieces. This lesson teaches nothing new: it assembles them.</p>
        <p>A to-do list is four things you already know how to do:</p>
        <ol>
          <li><strong>intercept</strong> the form submission — <code>submit</code> +
          <code>preventDefault</code>;</li>
          <li><strong>read</strong> what was typed — <code>.value.trim()</code>;</li>
          <li><strong>refuse</strong> if empty — <code>if</code> + <code>return</code>;</li>
          <li><strong>build</strong> the line and attach it — <code>createElement</code>,
          <code>textContent</code>, <code>append</code>.</li>
        </ol>
        <p>And a fifth, tiny gesture that changes everything for whoever uses it:</p>
        <pre>champ.value = "";   // clear the field after adding</pre>
        <p>Without that line you must erase by hand before every task. With it, you keep going.
        That kind of detail separates an exercise from a tool people actually use.</p>
        <p><strong>A word on what does not work here:</strong> a real to-do list would remember
        your entries after closing. That needs <code>localStorage</code>, unavailable in this
        preview — the last lesson of the track explains exactly why. For now the list lives as long
        as the page does. That is already an application.</p>
      `,
    },
    exemple: {
      code: {
        html: '<form id="f">\n  <input id="entree" placeholder="Une idée ?">\n  <button type="submit">Ajouter</button>\n</form>\n<ul id="idees"></ul>',
        js: 'const f = document.querySelector("#f");\nconst entree = document.querySelector("#entree");\nconst idees = document.querySelector("#idees");\n\nfunction ajouter(texte) {\n  const li = document.createElement("li");\n  li.textContent = texte;\n  idees.append(li);\n}\n\nf.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const texte = entree.value.trim();\n  if (texte === "") return;\n  ajouter(texte);\n  entree.value = "";\n});\n\najouter("Un jeu de plateforme");\najouter("Un site pour le club");',
      },
      note: {
        fr: 'Tape quelque chose dans l’aperçu et appuie sur Entrée : la ligne s’ajoute et le champ se vide. La fonction `ajouter` évite d’écrire deux fois les mêmes trois lignes.',
        en: 'Type something in the preview and press Enter: the line is added and the field clears. The `ajouter` function avoids writing the same three lines twice.',
      },
    },
    defi: {
      consigne: {
        fr: '<p><strong>Projet : ta liste de tâches.</strong> À chaque envoi du formulaire :</p><ul><li>ajoute un <code>&lt;li&gt;</code> dans <code>#liste</code> avec le texte saisi ;</li><li>vide ensuite le champ ;</li><li>si le champ est vide (ou ne contient que des espaces), <strong>n’ajoute rien</strong>.</li></ul><p>Le champ contient <code>Réviser les maths</code> au chargement. La liste doit être <strong>vide avant</strong> l’envoi, et contenir <strong>une</strong> tâche après.</p>',
        en: '<p><strong>Project: your to-do list.</strong> On each form submission:</p><ul><li>add a <code>&lt;li&gt;</code> into <code>#liste</code> with the typed text;</li><li>then clear the field;</li><li>if the field is empty (or only spaces), <strong>add nothing</strong>.</li></ul><p>The field holds <code>Réviser les maths</code> at load. The list must be <strong>empty before</strong> submission, and hold <strong>one</strong> task after.</p>',
      },
      depart: {
        html: '<h3>Mes tâches</h3>\n<form id="f">\n  <input id="entree" value="Réviser les maths">\n  <button id="ajouter" type="submit">Ajouter</button>\n</form>\n<ul id="liste"></ul>',
        js: 'const f = document.querySelector("#f");\nconst entree = document.querySelector("#entree");\nconst liste = document.querySelector("#liste");\n\n// À l’envoi : ajoute la tâche, puis vide le champ\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#liste li', quoi: 'nombre', attendu: 0 },
        {
          type: 'dom',
          clic: '#ajouter',
          selecteur: '#liste li',
          quoi: 'nombre',
          attendu: 1,
          message: {
            fr: 'Après l’envoi, la liste doit contenir exactement une tâche. Si elle est vide, il manque <code>preventDefault()</code> ou l’<code>append</code>.',
            en: 'After submission the list must hold exactly one task. If empty, <code>preventDefault()</code> or the <code>append</code> is missing.',
          },
        },
        { type: 'dom', clic: '#ajouter', selecteur: '#liste li', quoi: 'texte', attendu: 'Réviser les maths' },
        {
          type: 'codeContient',
          motif: 'createElement\\s*\\(',
          message: {
            fr: 'La ligne doit être fabriquée avec <code>document.createElement("li")</code>.',
            en: 'The line must be built with <code>document.createElement("li")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'entree\\.value\\s*=\\s*["\']["\']',
          message: {
            fr: 'Vide le champ après l’ajout : <code>entree.value = "";</code>',
            en: 'Clear the field after adding: <code>entree.value = "";</code>',
          },
        },
        {
          type: 'codeContient',
          motif: '\\breturn\\b',
          message: {
            fr: 'Une saisie vide doit sortir de la fonction avec <code>return;</code> avant d’ajouter quoi que ce soit.',
            en: 'An empty entry must leave the function with <code>return;</code> before adding anything.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'innerHTML',
          message: {
            fr: 'Le texte vient de quelqu’un qui tape : c’est <code>textContent</code>, comme appris deux leçons plus tôt.',
            en: 'The text comes from someone typing: use <code>textContent</code>, as learnt two lessons ago.',
          },
        },
      ],
      indices: [
        {
          fr: 'Commence par <code>f.addEventListener("submit", (evenement) => {</code> et <code>evenement.preventDefault();</code>',
          en: 'Start with <code>f.addEventListener("submit", (evenement) => {</code> and <code>evenement.preventDefault();</code>',
        },
        {
          fr: 'Lis puis refuse le vide : <code>const texte = entree.value.trim();</code> et <code>if (texte === "") return;</code>',
          en: 'Read then refuse empty: <code>const texte = entree.value.trim();</code> and <code>if (texte === "") return;</code>',
        },
        {
          fr: 'Les trois étapes de fabrication, puis la petite ligne qui change tout : <code>entree.value = "";</code>',
          en: 'The three building steps, then the little line that changes everything: <code>entree.value = "";</code>',
        },
      ],
      solution: {
        html: '<h3>Mes tâches</h3>\n<form id="f">\n  <input id="entree" value="Réviser les maths">\n  <button id="ajouter" type="submit">Ajouter</button>\n</form>\n<ul id="liste"></ul>',
        js: 'const f = document.querySelector("#f");\nconst entree = document.querySelector("#entree");\nconst liste = document.querySelector("#liste");\n\nf.addEventListener("submit", (evenement) => {\n  evenement.preventDefault();\n\n  const texte = entree.value.trim();\n  if (texte === "") return;\n\n  const li = document.createElement("li");\n  li.textContent = texte;\n  liste.append(li);\n\n  entree.value = "";\n});',
      },
    },
    projet: { titre: { fr: 'Ma liste de tâches', en: 'My to-do list' } },
  },

  /* ================================== js-err : quand ca casse ============ */

  'js-err-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Lire un message d’erreur au lieu de le fuir — il dit presque toujours tout.',
      en: 'Read an error message instead of fleeing it — it almost always tells you everything.',
    },
    explication: {
      fr: `
        <p>Un message d’erreur n’est pas une punition. C’est le programme qui t’explique où il a
        buté. Encore faut-il le lire, et il est écrit en anglais.</p>
        <p>Voici les trois que tu rencontreras le plus, et ce qu’ils veulent dire :</p>
        <p><strong><code>x is not defined</code></strong> — tu emploies un nom que rien n’a créé.
        Presque toujours une faute de frappe, ou une variable déclarée plus bas que l’endroit où
        tu l’utilises.</p>
        <pre>console.log(prenom);   // ReferenceError: prenom is not defined</pre>
        <p><strong><code>Cannot read properties of null</code></strong> — le plus fréquent de tous
        en JavaScript de page. Tu as demandé un élément, <code>querySelector</code> ne l’a pas
        trouvé et a rendu <code>null</code>, et tu essaies de lire quelque chose dessus :</p>
        <pre>document.querySelector("#titr").textContent = "Bonjour";
// Cannot read properties of null (reading 'textContent')</pre>
        <p>Le coupable est le sélecteur, pas la ligne : <code>#titr</code> au lieu de
        <code>#titre</code>. <strong>Quand tu vois « of null », relis ton sélecteur.</strong></p>
        <p><strong><code>x is not a function</code></strong> — le nom existe, mais ce n’est pas une
        fonction. Souvent une méthode mal orthographiée : <code>.pusch()</code>,
        <code>.lenght()</code>.</p>
        <p><strong>La méthode, en trois temps :</strong></p>
        <ol>
          <li>lis le <strong>type</strong> d’erreur — il classe le problème ;</li>
          <li>lis le <strong>nom</strong> cité — il pointe le coupable ;</li>
          <li>ajoute un <code>console.log</code> juste avant, pour voir ce que contenait
          vraiment la variable.</li>
        </ol>
        <p>Ce troisième geste est celui des programmeurs professionnels. Ils ne devinent pas : ils
        regardent.</p>
      `,
      en: `
        <p>An error message is not a punishment. It is the program explaining where it tripped.
        You just have to read it, and it is written in English.</p>
        <p>Here are the three you will meet most, and what they mean:</p>
        <p><strong><code>x is not defined</code></strong> — you are using a name nothing created.
        Almost always a typo, or a variable declared below where you use it.</p>
        <pre>console.log(prenom);   // ReferenceError: prenom is not defined</pre>
        <p><strong><code>Cannot read properties of null</code></strong> — the most frequent of all
        in page JavaScript. You asked for an element, <code>querySelector</code> did not find it
        and returned <code>null</code>, and you are trying to read something off it:</p>
        <pre>document.querySelector("#titr").textContent = "Bonjour";
// Cannot read properties of null (reading 'textContent')</pre>
        <p>The culprit is the selector, not the line: <code>#titr</code> instead of
        <code>#titre</code>. <strong>When you see "of null", re-read your selector.</strong></p>
        <p><strong><code>x is not a function</code></strong> — the name exists, but it is not a
        function. Often a misspelled method: <code>.pusch()</code>, <code>.lenght()</code>.</p>
        <p><strong>The method, in three steps:</strong></p>
        <ol>
          <li>read the error <strong>type</strong> — it classifies the problem;</li>
          <li>read the <strong>name</strong> quoted — it points at the culprit;</li>
          <li>add a <code>console.log</code> just before, to see what the variable really held.</li>
        </ol>
        <p>That third move is what professional programmers do. They do not guess: they look.</p>
      `,
    },
    exemple: {
      code: {
        html: '<p id="titre">Un titre</p>',
        js: 'const bon = document.querySelector("#titre");\nconsole.log("Trouvé :", bon.textContent);\n\nconst mauvais = document.querySelector("#titr");\nconsole.log("Et celui-ci vaut :", mauvais);\n\nif (mauvais === null) {\n  console.log("null veut dire : introuvable. Lire mauvais.textContent planterait ici.");\n}',
      },
      note: {
        fr: 'Au lieu de laisser le programme planter, on affiche ce que `querySelector` a vraiment rendu. C’est exactement le troisième geste de la méthode.',
        en: 'Instead of letting the program crash, we print what `querySelector` really returned. That is exactly the third step of the method.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Ce code plante. La console de l’aperçu te dit précisément pourquoi — <strong>lis-la avant de toucher au code</strong>.</p><p>Corrige-le pour qu’il affiche dans la page :</p><pre>Bonjour Lina</pre><p>Il y a <strong>deux</strong> fautes, et l’erreur affichée ne parle que de la première. Corrige, relance, lis la suivante.</p>',
        en: '<p>This code crashes. The preview console tells you precisely why — <strong>read it before touching the code</strong>.</p><p>Fix it so it shows in the page:</p><pre>Bonjour Lina</pre><p>There are <strong>two</strong> mistakes, and the shown error only mentions the first. Fix, run again, read the next one.</p>',
      },
      depart: {
        html: '<p id="message">…</p>',
        js: 'const prenom = "Lina";\n\nconst cible = document.querySelector("#mesage");\ncible.textContent = "Bonjour " + prnom;',
      },
      verifications: [
        { type: 'dom', selecteur: '#message', quoi: 'texte', attendu: 'Bonjour Lina', exact: true },
        {
          type: 'codeContient',
          motif: '#message',
          message: {
            fr: 'Première faute : le sélecteur <code>#mesage</code> ne correspond à rien — d’où le « of null ».',
            en: 'First mistake: the <code>#mesage</code> selector matches nothing — hence the "of null".',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'prnom',
          message: {
            fr: 'Seconde faute : <code>prnom</code> n’existe pas. C’est le « is not defined ».',
            en: 'Second mistake: <code>prnom</code> does not exist. That is the "is not defined".',
          },
        },
      ],
      indices: [
        {
          fr: 'La première erreur dit « of null » : ton <code>querySelector</code> n’a rien trouvé. Compare le sélecteur avec l’id du HTML.',
          en: 'The first error says "of null": your <code>querySelector</code> found nothing. Compare the selector with the id in the HTML.',
        },
        {
          fr: 'Une fois corrigé, relance. Le message change : il cite maintenant un nom qui n’existe pas.',
          en: 'Once fixed, run again. The message changes: it now quotes a name that does not exist.',
        },
        {
          fr: 'Deux lettres manquantes en tout : un <code>s</code> dans le sélecteur, un <code>e</code> dans la variable.',
          en: 'Two missing letters in total: an <code>s</code> in the selector, an <code>e</code> in the variable.',
        },
      ],
      solution: {
        html: '<p id="message">…</p>',
        js: 'const prenom = "Lina";\n\nconst cible = document.querySelector("#message");\ncible.textContent = "Bonjour " + prenom;',
      },
    },
  },

  'js-err-2': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Distinguer les deux façons dont JavaScript dit « rien ».',
      en: 'Tell apart the two ways JavaScript says "nothing".',
    },
    explication: {
      fr: `
        <p>JavaScript a deux mots pour dire « il n’y a rien ici ». Ce n’est pas un caprice : ils ne
        disent pas la même chose.</p>
        <p><strong><code>undefined</code> — personne n’a rien mis.</strong> C’est l’état par défaut,
        celui que la machine produit toute seule :</p>
        <pre>let x;                       // déclarée, jamais remplie
console.log(x);              // undefined

const o = { nom: "Lina" };
console.log(o.age);          // undefined — la propriété n’existe pas

[1, 2, 3].find((n) =&gt; n &gt; 99);   // undefined — aucun ne convient</pre>
        <p><strong><code>null</code> — quelqu’un a mis « rien » exprès.</strong> C’est une décision,
        pas un oubli :</p>
        <pre>let choisi = null;           // je déclare qu’il n’y a pas encore de choix
document.querySelector("#absent");   // null — le navigateur a cherché, il n’a rien</pre>
        <p>La différence tient en une phrase : <strong><code>undefined</code> est un trou,
        <code>null</code> est un zéro posé volontairement.</strong> Un <code>querySelector</code>
        rend <code>null</code> parce qu’il a vraiment cherché ; une propriété absente rend
        <code>undefined</code> parce que personne n’a jamais rien dit à son sujet.</p>
        <p><strong>Le piège de la comparaison :</strong></p>
        <pre>null == undefined    // true  — comparaison indulgente
null === undefined   // false — comparaison stricte</pre>
        <p>C’est pour ça qu’on utilise toujours <code>===</code> en JavaScript. Le
        <code>==</code> convertit dans ton dos et produit des surprises. <strong>Trois signes
        égal, toujours.</strong></p>
        <p>Enfin, les deux sont <em>falsy</em> : dans un <code>if</code>, ils comptent pour
        <code>false</code>. Ça permet le raccourci <code>if (element) { … }</code>, qui se lit
        « si on l’a trouvé ».</p>
      `,
      en: `
        <p>JavaScript has two words for "there is nothing here". Not a whim: they do not say the
        same thing.</p>
        <p><strong><code>undefined</code> — nobody put anything.</strong> The default state, the one
        the machine produces by itself:</p>
        <pre>let x;                       // declared, never filled
console.log(x);              // undefined

const o = { nom: "Lina" };
console.log(o.age);          // undefined — the property does not exist

[1, 2, 3].find((n) =&gt; n &gt; 99);   // undefined — none matches</pre>
        <p><strong><code>null</code> — someone put "nothing" on purpose.</strong> A decision, not an
        oversight:</p>
        <pre>let choisi = null;           // I state there is no choice yet
document.querySelector("#absent");   // null — the browser looked, found nothing</pre>
        <p>The difference in one sentence: <strong><code>undefined</code> is a hole,
        <code>null</code> is a deliberately placed zero.</strong> A <code>querySelector</code>
        returns <code>null</code> because it really looked; a missing property returns
        <code>undefined</code> because nobody ever said anything about it.</p>
        <p><strong>The comparison trap:</strong></p>
        <pre>null == undefined    // true  — loose comparison
null === undefined   // false — strict comparison</pre>
        <p>This is why <code>===</code> is always used in JavaScript. <code>==</code> converts
        behind your back and produces surprises. <strong>Three equals signs, always.</strong></p>
        <p>Finally, both are <em>falsy</em>: inside an <code>if</code> they count as
        <code>false</code>. That allows the shortcut <code>if (element) { … }</code>, which reads
        "if we found it".</p>
      `,
    },
    exemple: {
      code: {
        html: '<p id="present">Je suis là</p>',
        js: 'let jamaisRemplie;\nconst objet = { nom: "Lina" };\nconst trouve = document.querySelector("#present");\nconst introuvable = document.querySelector("#absent");\n\nconsole.log(`Variable vide     : ${jamaisRemplie}`);\nconsole.log(`Propriété absente : ${objet.age}`);\nconsole.log(`Élément trouvé    : ${trouve !== null}`);\nconsole.log(`Élément introuvable : ${introuvable}`);\nconsole.log(`null == undefined  : ${null == undefined}`);\nconsole.log(`null === undefined : ${null === undefined}`);',
      },
      note: {
        fr: 'Les deux dernières lignes montrent pourquoi on écrit toujours trois signes égal : la comparaison indulgente dit « pareil » là où la stricte dit « non ».',
        en: 'The last two lines show why three equals signs are always used: the loose comparison says "same" where the strict one says "no".',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une fonction <code>decrire(valeur)</code> qui renvoie :</p><ul><li><code>vide</code> si la valeur est <strong>exactement</strong> <code>undefined</code> ;</li><li><code>rien choisi</code> si elle est <strong>exactement</strong> <code>null</code> ;</li><li>sinon, la valeur elle-même.</li></ul><p>Les appels sont déjà écrits. Tu dois obtenir <strong>trois lignes</strong> :</p><pre>vide\nrien choisi\nLina</pre><p>Emploie <code>===</code> : avec <code>==</code>, les deux premiers cas se confondraient.</p>',
        en: '<p>Write a <code>decrire(valeur)</code> function returning:</p><ul><li><code>vide</code> if the value is <strong>exactly</strong> <code>undefined</code>;</li><li><code>rien choisi</code> if it is <strong>exactly</strong> <code>null</code>;</li><li>otherwise, the value itself.</li></ul><p>The calls are already written. You must get <strong>three lines</strong>:</p><pre>vide\nrien choisi\nLina</pre><p>Use <code>===</code>: with <code>==</code>, the first two cases would blur together.</p>',
      },
      depart: {
        html: '',
        js: '// Écris la fonction decrire ici\n\nlet nonRemplie;\nconsole.log(decrire(nonRemplie));\nconsole.log(decrire(null));\nconsole.log(decrire("Lina"));',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieEgale', valeur: 'vide\nrien choisi\nLina' },
        {
          type: 'codeContient',
          motif: '===\\s*undefined|undefined\\s*===',
          message: {
            fr: 'Teste <code>undefined</code> avec une comparaison stricte : <code>valeur === undefined</code>.',
            en: 'Test <code>undefined</code> with a strict comparison: <code>valeur === undefined</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '===\\s*null|null\\s*===',
          message: {
            fr: 'Teste <code>null</code> avec une comparaison stricte : <code>valeur === null</code>.',
            en: 'Test <code>null</code> with a strict comparison: <code>valeur === null</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Une fonction fléchée avec accolades convient : <code>const decrire = (valeur) => {</code>',
          en: 'An arrow function with braces works: <code>const decrire = (valeur) => {</code>',
        },
        {
          fr: 'Deux <code>if</code> qui renvoient tout de suite, puis un <code>return valeur;</code> à la fin.',
          en: 'Two <code>if</code> returning straight away, then a final <code>return valeur;</code>.',
        },
        {
          fr: 'L’ordre importe peu ici, mais chaque <code>if</code> doit employer <code>===</code>, jamais <code>==</code>.',
          en: 'Order hardly matters here, but every <code>if</code> must use <code>===</code>, never <code>==</code>.',
        },
      ],
      solution: {
        html: '',
        js: 'const decrire = (valeur) => {\n  if (valeur === undefined) return "vide";\n  if (valeur === null) return "rien choisi";\n  return valeur;\n};\n\nlet nonRemplie;\nconsole.log(decrire(nonRemplie));\nconsole.log(decrire(null));\nconsole.log(decrire("Lina"));',
      },
    },
  },

  'js-err-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Attraper une erreur au lieu de laisser le programme s’arrêter.',
      en: 'Catch an error instead of letting the program stop.',
    },
    explication: {
      fr: `
        <p>Quand une erreur survient, le programme <strong>s’arrête net</strong>. Tout ce qui
        suivait n’est jamais exécuté. Pour une page web, ça veut dire une interface figée.</p>
        <p>Parfois c’est très bien : une erreur signale un bug, et tu veux le savoir. Mais parfois
        tu <em>sais d’avance</em> que ça peut échouer — un texte JSON reçu de l’extérieur, par
        exemple — et tu veux répondre proprement au lieu de tout arrêter.</p>
        <pre>try {
  const donnees = JSON.parse(texteRecu);
  console.log(donnees.nom);
} catch (erreur) {
  console.log("Fichier illisible : " + erreur.message);
}</pre>
        <ul>
          <li><code>try</code> — « essaie ce bloc » ;</li>
          <li><code>catch</code> — « s’il casse, fais plutôt ça » ;</li>
          <li><code>erreur.message</code> — l’explication, que tu peux afficher ou enregistrer.</li>
        </ul>
        <p>Dès qu’une ligne du <code>try</code> échoue, le reste du bloc est abandonné et on saute
        dans le <code>catch</code>. Puis le programme <strong>continue normalement</strong> après.
        C’est tout l’intérêt : l’échec est contenu.</p>
        <p><strong>La règle qui compte, et qui est souvent mal comprise :</strong>
        <code>try/catch</code> ne sert pas à faire taire les erreurs. Un <code>catch</code> vide —
        <code>catch (e) {}</code> — est pire que pas de <code>try</code> du tout : le bug existe
        toujours, mais plus personne n’en est informé. On appelle ça « avaler l’erreur », et ça
        coûte des heures de recherche à celui qui débogue ensuite.</p>
        <p>Un bon <code>catch</code> fait toujours quelque chose d’utile : afficher un message
        clair, reprendre une valeur de secours, ou au minimum écrire l’erreur dans la console.</p>
      `,
      en: `
        <p>When an error happens, the program <strong>stops dead</strong>. Everything after it never
        runs. For a web page, that means a frozen interface.</p>
        <p>Sometimes that is fine: an error signals a bug, and you want to know. But sometimes you
        <em>know in advance</em> it can fail — JSON text received from outside, for instance — and
        you want to respond cleanly instead of stopping everything.</p>
        <pre>try {
  const donnees = JSON.parse(texteRecu);
  console.log(donnees.nom);
} catch (erreur) {
  console.log("Unreadable file: " + erreur.message);
}</pre>
        <ul>
          <li><code>try</code> — "attempt this block";</li>
          <li><code>catch</code> — "if it breaks, do this instead";</li>
          <li><code>erreur.message</code> — the explanation, which you can show or log.</li>
        </ul>
        <p>As soon as a line in the <code>try</code> fails, the rest of the block is abandoned and
        we jump into the <code>catch</code>. Then the program <strong>carries on normally</strong>
        afterwards. That is the whole point: the failure is contained.</p>
        <p><strong>The rule that matters, and is often misunderstood:</strong>
        <code>try/catch</code> is not for silencing errors. An empty <code>catch</code> —
        <code>catch (e) {}</code> — is worse than no <code>try</code> at all: the bug is still
        there, but nobody is told any more. This is called "swallowing the error", and it costs
        hours to whoever debugs later.</p>
        <p>A good <code>catch</code> always does something useful: show a clear message, fall back
        to a safe value, or at the very least write the error to the console.</p>
      `,
    },
    exemple: {
      code: {
        html: '',
        js: 'const bon = \'{"nom":"Lina","points":240}\';\nconst casse = \'{"nom":"Lina", points\';\n\nfunction lire(texte) {\n  try {\n    const profil = JSON.parse(texte);\n    return `${profil.nom} a ${profil.points} points`;\n  } catch (erreur) {\n    return `Sauvegarde illisible (${erreur.name})`;\n  }\n}\n\nconsole.log(lire(bon));\nconsole.log(lire(casse));\nconsole.log("Le programme continue, il ne s’est pas arrêté.");',
      },
      note: {
        fr: 'La troisième ligne s’affiche : c’est la preuve que l’erreur a été contenue. Sans le try/catch, le programme se serait arrêté à la deuxième.',
        en: 'The third line prints: proof that the error was contained. Without the try/catch, the program would have stopped at the second.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Les trois sauvegardes arrivent d’un fichier. <strong>La deuxième est abîmée.</strong> Parcours-les et affiche, pour chacune, une ligne :</p><pre>Lina : 240 points\nSauvegarde 2 illisible\nNour : 95 points</pre><p>Le programme doit aller <strong>jusqu’au bout</strong> : sans <code>try/catch</code>, il s’arrêterait à la deuxième et la troisième ne s’afficherait jamais.</p><p>Le numéro affiché est la place + 1.</p>',
        en: '<p>The three save files come from disk. <strong>The second is damaged.</strong> Walk through them and print one line for each:</p><pre>Lina : 240 points\nSauvegarde 2 illisible\nNour : 95 points</pre><p>The program must reach <strong>the end</strong>: without <code>try/catch</code> it would stop at the second and the third would never print.</p><p>The printed number is the position + 1.</p>',
      },
      depart: {
        html: '',
        js: 'const sauvegardes = [\n  \'{"nom":"Lina","points":240}\',\n  \'{"nom":"Théo", points\',\n  \'{"nom":"Nour","points":95}\'\n];\n\n// Parcours les sauvegardes sans jamais t’arrêter\n',
      },
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: 'Lina : 240 points' },
        { type: 'sortieContient', valeur: 'Sauvegarde 2 illisible' },
        {
          type: 'sortieContient',
          valeur: 'Nour : 95 points',
          message: {
            fr: 'La troisième ligne manque : ton programme s’est arrêté sur la sauvegarde abîmée. C’est exactement ce que <code>try/catch</code> évite.',
            en: 'The third line is missing: your program stopped on the damaged save. That is exactly what <code>try/catch</code> prevents.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\btry\\s*\\{',
          message: {
            fr: 'Entoure la lecture par <code>try { … }</code>.',
            en: 'Wrap the reading in <code>try { … }</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bcatch\\s*\\(',
          message: {
            fr: 'Et rattrape l’échec avec <code>catch (erreur) { … }</code>.',
            en: 'And catch the failure with <code>catch (erreur) { … }</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'JSON\\.parse\\s*\\(',
          message: {
            fr: 'Chaque sauvegarde est du texte JSON : elle se lit avec <code>JSON.parse</code>.',
            en: 'Each save is JSON text: read it with <code>JSON.parse</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Parcours avec <code>sauvegardes.forEach((texte, i) => {</code> — <code>i</code> te donnera le numéro.',
          en: 'Walk with <code>sauvegardes.forEach((texte, i) => {</code> — <code>i</code> gives you the number.',
        },
        {
          fr: 'Dans le <code>try</code> : <code>const p = JSON.parse(texte);</code> puis la ligne réussie.',
          en: 'In the <code>try</code>: <code>const p = JSON.parse(texte);</code> then the success line.',
        },
        {
          fr: 'Dans le <code>catch</code> : <code>console.log(`Sauvegarde ${i + 1} illisible`);</code>',
          en: 'In the <code>catch</code>: <code>console.log(`Sauvegarde ${i + 1} illisible`);</code>',
        },
      ],
      solution: {
        html: '',
        js: 'const sauvegardes = [\n  \'{"nom":"Lina","points":240}\',\n  \'{"nom":"Théo", points\',\n  \'{"nom":"Nour","points":95}\'\n];\n\nsauvegardes.forEach((texte, i) => {\n  try {\n    const profil = JSON.parse(texte);\n    console.log(`${profil.nom} : ${profil.points} points`);\n  } catch (erreur) {\n    console.log(`Sauvegarde ${i + 1} illisible`);\n  }\n});',
      },
    },
  },

  /* ============================ js-suite : la suite du voyage ============ */

  'js-suite-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Savoir ce qui ne marche pas dans cet atelier, et pourquoi — sans qu’on te le cache.',
      en: 'Know what does not work in this workshop, and why — with nothing hidden from you.',
    },
    explication: {
      fr: `
        <p>Trois choses très courantes en JavaScript <strong>ne fonctionnent pas ici</strong>. Ce
        n’est ni un oubli ni une panne : chacune a une raison précise, et les connaître t’évitera
        de chercher un bug qui n’existe pas.</p>
        <p><strong>1. <code>localStorage</code> — la mémoire du navigateur.</strong></p>
        <pre>localStorage.setItem("score", "42");
// SecurityError: The document is sandboxed and lacks
// the 'allow-same-origin' flag.</pre>
        <p>Ton code tourne dans un <strong>bac à sable</strong> : une page isolée, sans accès à
        l’application qui l’héberge. C’est ce qui te permet d’écrire n’importe quoi sans jamais
        risquer d’abîmer ta progression, tes projets ou tes badges. Le prix de cette sécurité est
        que le stockage du navigateur reste hors de portée. <strong>Sur un vrai site que tu
        hébergeras, <code>localStorage</code> fonctionnera parfaitement</strong> — la syntaxe
        ci-dessus est la bonne, c’est ici qu’elle est bloquée.</p>
        <p><strong>2. <code>fetch</code> — aller chercher des données sur internet.</strong></p>
        <pre>fetch("https://api.exemple.fr/meteo")
// TypeError: Failed to fetch</pre>
        <p>CodeWithMe fonctionne <strong>entièrement hors ligne</strong>, c’est une de ses
        promesses. Pas de réseau, donc pas d’API. Là encore le code est juste, c’est
        l’environnement qui ne peut pas répondre.</p>
        <p><strong>3. <code>import</code> et <code>export</code> — découper son code en
        fichiers.</strong></p>
        <pre>import { calculer } from "./outils.js";
// SyntaxError: Cannot use import statement outside a module</pre>
        <p>Ici, ton JavaScript est un fichier unique, chargé comme un script classique. Les modules
        demandent plusieurs fichiers et une page qui les déclare comme tels — ce que l’atelier, qui
        te donne un seul éditeur, ne fait pas.</p>
        <p><strong>Pourquoi te dire tout ça plutôt que de faire comme si de rien n’était ?</strong>
        Parce qu’un jour tu écriras une de ces trois lignes, elle échouera, et tu passeras une
        heure à chercher ce que tu as mal écrit. Réponse : rien. Un bon programmeur connaît les
        limites de son environnement, et sait faire la différence entre « mon code est faux » et
        « cet endroit ne peut pas le faire ».</p>
      `,
      en: `
        <p>Three very common JavaScript things <strong>do not work here</strong>. Neither an
        oversight nor a fault: each has a precise reason, and knowing them will save you hunting a
        bug that does not exist.</p>
        <p><strong>1. <code>localStorage</code> — the browser’s memory.</strong></p>
        <pre>localStorage.setItem("score", "42");
// SecurityError: The document is sandboxed and lacks
// the 'allow-same-origin' flag.</pre>
        <p>Your code runs in a <strong>sandbox</strong>: an isolated page, with no access to the
        application hosting it. That is what lets you write anything at all without ever risking
        your progress, your projects or your badges. The price of that safety is that browser
        storage stays out of reach. <strong>On a real site you host yourself,
        <code>localStorage</code> will work perfectly</strong> — the syntax above is correct, it is
        only blocked here.</p>
        <p><strong>2. <code>fetch</code> — getting data from the internet.</strong></p>
        <pre>fetch("https://api.example.com/weather")
// TypeError: Failed to fetch</pre>
        <p>CodeWithMe works <strong>entirely offline</strong>, one of its promises. No network, so
        no API. Again the code is right, the environment simply cannot answer.</p>
        <p><strong>3. <code>import</code> and <code>export</code> — splitting code across
        files.</strong></p>
        <pre>import { calculer } from "./outils.js";
// SyntaxError: Cannot use import statement outside a module</pre>
        <p>Here your JavaScript is a single file, loaded as a classic script. Modules need several
        files and a page that declares them as such — which the workshop, giving you one editor,
        does not do.</p>
        <p><strong>Why tell you all this instead of pretending?</strong> Because one day you will
        write one of those three lines, it will fail, and you will spend an hour looking for your
        mistake. Answer: there is none. A good programmer knows the limits of their environment,
        and can tell "my code is wrong" from "this place cannot do it".</p>
      `,
    },
    exemple: {
      code: {
        html: '<p id="rapport"></p>',
        js: 'const lignes = [];\n\ntry {\n  localStorage.setItem("essai", "1");\n  lignes.push("localStorage : disponible");\n} catch (erreur) {\n  lignes.push(`localStorage : indisponible (${erreur.name})`);\n}\n\ntry {\n  new Function("import(\'x\')");\n  lignes.push("import dynamique : la syntaxe est acceptée");\n} catch (erreur) {\n  lignes.push(`import : ${erreur.name}`);\n}\n\nlignes.forEach((ligne) => console.log(ligne));\ndocument.querySelector("#rapport").textContent = lignes.join(" — ");',
      },
      note: {
        fr: 'On ne te raconte pas la limite : on la mesure, dans ton propre aperçu, avec un try/catch — exactement l’outil de la leçon précédente.',
        en: 'The limit is not described to you: it is measured, in your own preview, with a try/catch — exactly the tool from the previous lesson.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris un petit <strong>rapport d’environnement</strong> : teste <code>localStorage</code> avec un <code>try/catch</code>, et écris dans <code>#etat</code> :</p><ul><li><code>Stockage indisponible</code> si l’accès échoue (c’est ce qui va se passer ici) ;</li><li><code>Stockage disponible</code> s’il réussit.</li></ul><p>Ton code doit fonctionner dans les <strong>deux</strong> cas : le jour où tu le mettras sur un vrai site, il devra afficher l’autre message sans une ligne de changement.</p>',
        en: '<p>Write a small <strong>environment report</strong>: test <code>localStorage</code> with a <code>try/catch</code>, and write into <code>#etat</code>:</p><ul><li><code>Stockage indisponible</code> if access fails (which is what will happen here);</li><li><code>Stockage disponible</code> if it succeeds.</li></ul><p>Your code must work in <strong>both</strong> cases: the day you put it on a real site, it must show the other message without a single line changed.</p>',
      },
      depart: {
        html: '<p id="etat">…</p>',
        js: 'const etat = document.querySelector("#etat");\n\n// Teste localStorage sans laisser le programme s’arrêter\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#etat', quoi: 'texte', attendu: 'Stockage indisponible', exact: true },
        {
          type: 'codeContient',
          motif: '\\btry\\s*\\{',
          message: {
            fr: 'Sans <code>try</code>, l’accès refusé arrêterait ton programme avant l’affichage.',
            en: 'Without <code>try</code>, the refused access would stop your program before it could display anything.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bcatch\\s*\\(',
          message: {
            fr: 'C’est le <code>catch</code> qui écrit le message « indisponible ».',
            en: 'The <code>catch</code> is what writes the "unavailable" message.',
          },
        },
        {
          type: 'codeContient',
          motif: 'localStorage',
          message: {
            fr: 'Le rapport doit vraiment tenter d’accéder à <code>localStorage</code>, pas deviner.',
            en: 'The report must really attempt to reach <code>localStorage</code>, not guess.',
          },
        },
        {
          type: 'codeContient',
          motif: 'Stockage disponible',
          message: {
            fr: 'Le cas qui réussit doit être écrit lui aussi : ton code doit marcher ailleurs qu’ici.',
            en: 'The successful case must be written too: your code must work elsewhere than here.',
          },
        },
      ],
      indices: [
        {
          fr: 'Dans le <code>try</code>, touche vraiment au stockage : <code>localStorage.setItem("essai", "1");</code>',
          en: 'Inside the <code>try</code>, really touch the storage: <code>localStorage.setItem("essai", "1");</code>',
        },
        {
          fr: 'Juste après, toujours dans le <code>try</code> : <code>etat.textContent = "Stockage disponible";</code>',
          en: 'Right after, still in the <code>try</code>: <code>etat.textContent = "Stockage disponible";</code>',
        },
        {
          fr: 'Et dans le <code>catch</code> : <code>etat.textContent = "Stockage indisponible";</code>',
          en: 'And in the <code>catch</code>: <code>etat.textContent = "Stockage indisponible";</code>',
        },
      ],
      solution: {
        html: '<p id="etat">…</p>',
        js: 'const etat = document.querySelector("#etat");\n\ntry {\n  localStorage.setItem("essai", "1");\n  etat.textContent = "Stockage disponible";\n} catch (erreur) {\n  etat.textContent = "Stockage indisponible";\n}',
      },
    },
  },

  'js-suite-2': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Voir le chemin qui reste, et ce que tu sais déjà en faire.',
      en: 'See the road ahead, and what you can already do with it.',
    },
    explication: {
      fr: `
        <p>Regarde ce que tu sais faire, maintenant : lire et écrire dans une page, réagir à un
        clic et à une touche, ranger des données dans des objets et des tableaux, les trier, les
        filtrer, les transformer, fabriquer des éléments, lire un formulaire, valider une saisie,
        attraper une erreur, animer un canevas. <strong>Ce n’est pas un début : c’est de quoi
        construire des choses que les gens utilisent.</strong></p>
        <p>Voici où mène la suite.</p>
        <p><strong>Sortir de l’atelier.</strong> Un fichier <code>.html</code>, un
        <code>.css</code>, un <code>.js</code> dans un dossier, ouverts dans ton navigateur : tu as
        un site. Là, <code>localStorage</code> marchera, et <code>import</code> aussi si tu écris
        <code>&lt;script type="module"&gt;</code>. Les projets que tu as enregistrés dans « Mes
        projets » sont déjà de vrais fichiers : ouvre-les, modifie-les.</p>
        <p><strong>Aller chercher des données.</strong> <code>fetch</code> permet de demander des
        informations à un serveur — la météo, des images, un dictionnaire. C’est la porte d’entrée
        vers le code <em>asynchrone</em>, dont tu as vu le premier aperçu avec
        <code>setTimeout</code> : <code>fetch</code>, <code>await</code>, les promesses.</p>
        <p><strong>Les bibliothèques et les cadres.</strong> React, Vue, Svelte… Ce sont des outils
        qui organisent de très grandes applications. Ils ne remplacent pas ce que tu viens
        d’apprendre : <strong>ils sont écrits par-dessus</strong>. Quelqu’un qui les emploie sans
        connaître le JavaScript en dessous reste bloqué au premier imprévu.</p>
        <p><strong>Le JavaScript hors du navigateur.</strong> Avec Node.js, le même langage fait
        tourner des serveurs, lit des fichiers, pilote des outils. Ce que tu sais s’applique
        tel quel.</p>
        <p><strong>Un dernier conseil, le plus utile de tous :</strong> choisis quelque chose que
        <em>toi</em> tu aimerais avoir. Un compteur pour un jeu de société, une page pour ton club,
        un générateur de sujets de rédaction. Un projet qui te sert vraiment t’apprendra plus que
        vingt exercices — parce que tu voudras qu’il marche.</p>
      `,
      en: `
        <p>Look at what you can do now: read and write in a page, react to a click and a key, store
        data in objects and arrays, sort it, filter it, transform it, build elements, read a form,
        validate an entry, catch an error, animate a canvas. <strong>This is not a beginning: it is
        enough to build things people use.</strong></p>
        <p>Here is where the road leads.</p>
        <p><strong>Leaving the workshop.</strong> An <code>.html</code>, a <code>.css</code> and a
        <code>.js</code> file in a folder, opened in your browser: you have a site. There,
        <code>localStorage</code> will work, and so will <code>import</code> if you write
        <code>&lt;script type="module"&gt;</code>. The projects you saved in "My projects" are
        already real files: open them, change them.</p>
        <p><strong>Fetching data.</strong> <code>fetch</code> asks a server for information — the
        weather, images, a dictionary. It is the doorway to <em>asynchronous</em> code, whose first
        glimpse you got with <code>setTimeout</code>: <code>fetch</code>, <code>await</code>,
        promises.</p>
        <p><strong>Libraries and frameworks.</strong> React, Vue, Svelte… Tools that organise very
        large applications. They do not replace what you just learnt: <strong>they are written on
        top of it</strong>. Someone using them without knowing the JavaScript underneath gets stuck
        at the first surprise.</p>
        <p><strong>JavaScript outside the browser.</strong> With Node.js the same language runs
        servers, reads files, drives tools. What you know applies as it is.</p>
        <p><strong>One last piece of advice, the most useful of all:</strong> pick something
        <em>you</em> would like to have. A counter for a board game, a page for your club, a
        writing-prompt generator. A project that genuinely serves you will teach you more than
        twenty exercises — because you will want it to work.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h3>Ce que tu sais faire</h3>\n<ul id="acquis"></ul>',
        js: 'const acquis = [\n  { sujet: "Le texte et les gabarits", module: "js-txt" },\n  { sujet: "Les tableaux et le tri", module: "js-tab" },\n  { sujet: "Les objets et JSON", module: "js-obj" },\n  { sujet: "map, filter, forEach", module: "js-hof" },\n  { sujet: "Fabriquer la page", module: "js-dom" },\n  { sujet: "Les formulaires", module: "js-form" },\n  { sujet: "Lire et attraper les erreurs", module: "js-err" }\n];\n\nconst liste = document.querySelector("#acquis");\n\nacquis.forEach((element, i) => {\n  const li = document.createElement("li");\n  li.textContent = `${i + 1}. ${element.sujet}`;\n  liste.append(li);\n});\n\nconsole.log(`${acquis.length} modules, et tout ce code emploie ce qu’ils enseignent.`);',
      },
      note: {
        fr: 'Relis cet exemple : un tableau d’objets, un forEach, createElement, un gabarit, append. Il y a six semaines, chacune de ces lignes t’aurait arrêté.',
        en: 'Read this example again: an array of objects, a forEach, createElement, a template, append. Six weeks ago each of these lines would have stopped you.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Dernier défi du parcours, et il n’y a rien de neuf : <strong>tout ce qu’il demande, tu sais déjà le faire.</strong></p><p>Le tableau <code>idees</code> contient des projets, chacun avec un <code>niveau</code>. Affiche dans <code>#mesIdees</code> <strong>uniquement</strong> ceux de niveau <code>facile</code>, un <code>&lt;li&gt;</code> par idée, avec son titre.</p><p>Il doit y en avoir exactement <strong>trois</strong>. Filtre, puis fabrique.</p>',
        en: '<p>Last challenge of the track, and there is nothing new: <strong>everything it asks, you already know how to do.</strong></p><p>The <code>idees</code> array holds projects, each with a <code>niveau</code>. Display in <code>#mesIdees</code> <strong>only</strong> those of level <code>facile</code>, one <code>&lt;li&gt;</code> per idea, with its title.</p><p>There must be exactly <strong>three</strong>. Filter, then build.</p>',
      },
      depart: {
        html: '<h3>Mes prochaines idées</h3>\n<ul id="mesIdees"></ul>',
        js: 'const idees = [\n  { titre: "Un compteur de points", niveau: "facile" },\n  { titre: "Un site pour le club", niveau: "moyen" },\n  { titre: "Une liste de courses", niveau: "facile" },\n  { titre: "Un jeu de plateforme", niveau: "difficile" },\n  { titre: "Un minuteur de révisions", niveau: "facile" }\n];\n\n// Garde les idées faciles, et fabrique la liste\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#mesIdees li', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: '#mesIdees li', quoi: 'texte', attendu: 'Un compteur de points' },
        { type: 'dom', selecteur: '#mesIdees li', quoi: 'texte', attendu: 'Un minuteur de révisions' },
        {
          type: 'codeContient',
          motif: '\\.filter\\s*\\(',
          message: {
            fr: 'Sélectionne les idées faciles avec <code>filter</code>.',
            en: 'Select the easy ideas with <code>filter</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'createElement\\s*\\(',
          message: {
            fr: 'Chaque ligne se fabrique avec <code>createElement</code>.',
            en: 'Each line is built with <code>createElement</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'innerHTML',
          message: {
            fr: 'Comme appris au module DOM : <code>textContent</code> pour du texte.',
            en: 'As learnt in the DOM module: <code>textContent</code> for text.',
          },
        },
      ],
      indices: [
        {
          fr: 'D’abord filtrer : <code>const faciles = idees.filter((idee) => idee.niveau === "facile");</code>',
          en: 'First filter: <code>const faciles = idees.filter((idee) => idee.niveau === "facile");</code>',
        },
        {
          fr: 'Puis parcourir le résultat avec <code>forEach</code>, comme au module DOM.',
          en: 'Then walk the result with <code>forEach</code>, as in the DOM module.',
        },
        {
          fr: 'Les trois étapes, une dernière fois : créer, remplir avec <code>textContent</code>, accrocher avec <code>append</code>.',
          en: 'The three steps, one last time: create, fill with <code>textContent</code>, attach with <code>append</code>.',
        },
      ],
      solution: {
        html: '<h3>Mes prochaines idées</h3>\n<ul id="mesIdees"></ul>',
        js: 'const idees = [\n  { titre: "Un compteur de points", niveau: "facile" },\n  { titre: "Un site pour le club", niveau: "moyen" },\n  { titre: "Une liste de courses", niveau: "facile" },\n  { titre: "Un jeu de plateforme", niveau: "difficile" },\n  { titre: "Un minuteur de révisions", niveau: "facile" }\n];\n\nconst liste = document.querySelector("#mesIdees");\nconst faciles = idees.filter((idee) => idee.niveau === "facile");\n\nfaciles.forEach((idee) => {\n  const li = document.createElement("li");\n  li.textContent = idee.titre;\n  liste.append(li);\n});',
      },
    },
  },
};
