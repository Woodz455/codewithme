/**
 * Parcours Python — la suite du programme.
 *
 * Les cinq premiers modules (premiers pas, variables, decisions, tortue,
 * listes) sont dans `lecons-python.js`. Ce fichier contient les sujets qui
 * viennent apres, dans l'ordre demande : operateurs, texte, tuples et
 * ensembles, dictionnaires, fonctions, modules, comprehensions, fonctions
 * d'ordre superieur, types et erreurs, dates, expressions regulieres,
 * fichiers, classes, statistiques.
 *
 * Chaque sujet a ete execute dans le vrai moteur avant d'etre enseigne. Voir
 * `_schema.md` pour la description d'une lecon.
 */

export const LECONS_PYTHON_AVANCE = {
  /* ==================================================== Les operateurs ==== */

  'py-op-1': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Utiliser les sept opérateurs de calcul, y compris la division entière et le reste.',
      en: 'Use the seven arithmetic operators, including integer division and remainder.',
    },
    explication: {
      fr: `
        <p>Tu connais déjà <code>+</code>, <code>-</code>, <code>*</code> et <code>/</code>.
        Python en a trois autres, et ce sont souvent les plus utiles :</p>
        <ul>
          <li><code>//</code> — la <strong>division entière</strong> : combien de fois ça rentre,
          sans virgule. <code>17 // 5</code> vaut <code>3</code>.</li>
          <li><code>%</code> — le <strong>reste</strong> de cette division.
          <code>17 % 5</code> vaut <code>2</code>.</li>
          <li><code>**</code> — la <strong>puissance</strong>. <code>2 ** 10</code> vaut
          <code>1024</code>.</li>
        </ul>
        <p>Attention à un piège : <code>/</code> donne <strong>toujours</strong> un nombre à
        virgule, même quand ça tombe juste. <code>10 / 5</code> vaut <code>2.0</code>, et pas
        <code>2</code>.</p>
        <p><code>%</code> a l’air anecdotique, mais c’est l’opérateur le plus employé de tous :
        <code>n % 2</code> vaut <code>0</code> quand <code>n</code> est pair. C’est comme ça
        qu’on teste la parité, qu’on colore une ligne sur deux, qu’on fait tourner un compteur.</p>
      `,
      en: `
        <p>You already know <code>+</code>, <code>-</code>, <code>*</code> and <code>/</code>.
        Python has three more, and they are often the most useful ones:</p>
        <ul>
          <li><code>//</code> — <strong>integer division</strong>: how many times it fits, with
          no decimals. <code>17 // 5</code> is <code>3</code>.</li>
          <li><code>%</code> — the <strong>remainder</strong> of that division.
          <code>17 % 5</code> is <code>2</code>.</li>
          <li><code>**</code> — <strong>power</strong>. <code>2 ** 10</code> is
          <code>1024</code>.</li>
        </ul>
        <p>Careful with one trap: <code>/</code> <strong>always</strong> gives a decimal number,
        even when it divides evenly. <code>10 / 5</code> is <code>2.0</code>, not <code>2</code>.</p>
        <p><code>%</code> looks like a detail, but it is the most used operator of all:
        <code>n % 2</code> is <code>0</code> when <code>n</code> is even. That is how you test
        parity, colour every other row, or make a counter wrap around.</p>
      `,
    },
    exemple: {
      code: 'print(17 + 5)\nprint(17 - 5)\nprint(17 * 5)\nprint(17 / 5)\nprint(17 // 5)\nprint(17 % 5)\nprint(2 ** 10)',
      note: {
        fr: 'Compare bien les trois divisions : <code>/</code> garde la virgule, <code>//</code> la jette, <code>%</code> ne garde que ce qui dépasse.',
        en: 'Compare the three divisions: <code>/</code> keeps the decimals, <code>//</code> drops them, <code>%</code> keeps only what is left over.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Tu as <strong>17 bonbons</strong> à partager équitablement entre <strong>5 amis</strong>.</p>
             <p>Affiche combien chacun en reçoit, puis combien il en reste :</p>
             <pre>Chacun reçoit 3 bonbons.
Il en reste 2.</pre>
             <p>Calcule-le — ne recopie pas les nombres 3 et 2 à la main.</p>`,
        en: `<p>You have <strong>17 sweets</strong> to share equally between <strong>5 friends</strong>.</p>
             <p>Display how many each one gets, then how many are left over:</p>
             <pre>Chacun reçoit 3 bonbons.
Il en reste 2.</pre>
             <p>Calculate it — do not type the numbers 3 and 2 by hand.</p>`,
      },
      depart: 'bonbons = 17\namis = 5\n\n# Affiche les deux phrases en calculant\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '//',
          message: {
            fr: 'Utilise la division entière <code>//</code> pour la part de chacun.',
            en: 'Use integer division <code>//</code> for each share.',
          },
        },
        {
          type: 'codeContient',
          motif: '%',
          message: {
            fr: 'Utilise le reste <code>%</code> pour les bonbons qui restent.',
            en: 'Use the remainder <code>%</code> for the leftover sweets.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Chacun reçoit 3 bonbons.', en: 'Chacun reçoit 3 bonbons.' } },
        { type: 'sortieContient', valeur: { fr: 'Il en reste 2.', en: 'Il en reste 2.' } },
      ],
      indices: [
        {
          fr: 'La part de chacun, c’est <code>bonbons // amis</code>.',
          en: 'Each share is <code>bonbons // amis</code>.',
        },
        {
          fr: 'Ce qui reste, c’est <code>bonbons % amis</code>.',
          en: 'What is left is <code>bonbons % amis</code>.',
        },
        {
          fr: 'Place le calcul dans un f-string : <code>print(f"Chacun reçoit {bonbons // amis} bonbons.")</code>',
          en: 'Put the calculation inside an f-string: <code>print(f"Chacun reçoit {bonbons // amis} bonbons.")</code>',
        },
      ],
      solution:
        'bonbons = 17\namis = 5\n\nprint(f"Chacun reçoit {bonbons // amis} bonbons.")\nprint(f"Il en reste {bonbons % amis}.")',
    },
  },

  'py-op-2': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Comparer deux valeurs et obtenir une réponse vraie ou fausse.',
      en: 'Compare two values and get a true or false answer.',
    },
    explication: {
      fr: `
        <p>Un opérateur de comparaison ne calcule pas un nombre : il répond
        <strong>oui ou non</strong>. En Python, oui s’écrit <code>True</code> et non
        s’écrit <code>False</code> — avec une majuscule.</p>
        <ul>
          <li><code>&gt;</code> plus grand que, <code>&lt;</code> plus petit que</li>
          <li><code>&gt;=</code> plus grand ou égal, <code>&lt;=</code> plus petit ou égal</li>
          <li><code>==</code> <strong>égal à</strong></li>
          <li><code>!=</code> différent de</li>
        </ul>
        <p><strong>Le piège classique, et il fera mal une fois :</strong> <code>=</code> et
        <code>==</code> ne veulent pas dire la même chose. <code>age = 12</code>
        <em>range</em> 12 dans <code>age</code>. <code>age == 12</code> <em>demande</em> si
        <code>age</code> vaut 12. Le premier agit, le second interroge.</p>
        <p>C’est exactement ce qui alimente les <code>if</code> que tu écris déjà : une
        condition n’est rien d’autre qu’une comparaison qui vaut <code>True</code> ou
        <code>False</code>.</p>
      `,
      en: `
        <p>A comparison operator does not compute a number: it answers <strong>yes or
        no</strong>. In Python, yes is written <code>True</code> and no is written
        <code>False</code> — with a capital letter.</p>
        <ul>
          <li><code>&gt;</code> greater than, <code>&lt;</code> less than</li>
          <li><code>&gt;=</code> greater or equal, <code>&lt;=</code> less or equal</li>
          <li><code>==</code> <strong>equal to</strong></li>
          <li><code>!=</code> different from</li>
        </ul>
        <p><strong>The classic trap, and it will bite once:</strong> <code>=</code> and
        <code>==</code> do not mean the same thing. <code>age = 12</code> <em>stores</em> 12 in
        <code>age</code>. <code>age == 12</code> <em>asks</em> whether <code>age</code> is 12.
        The first one acts, the second one questions.</p>
        <p>This is exactly what feeds the <code>if</code> statements you already write: a
        condition is nothing more than a comparison worth <code>True</code> or
        <code>False</code>.</p>
      `,
    },
    exemple: {
      code: 'age = 12\n\nprint(age > 10)\nprint(age == 12)\nprint(age != 12)\nprint(age <= 11)\nprint(type(age > 10))',
      note: {
        fr: 'La dernière ligne montre le type du résultat : <code>bool</code>, un type à deux valeurs seulement.',
        en: 'The last line shows the type of the result: <code>bool</code>, a type with only two values.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Une note de <code>14</code> est rangée dans <code>note</code>. Affiche
             <strong>trois lignes</strong>, dans cet ordre :</p>
             <ol>
               <li>la note est-elle au-dessus de la moyenne (10) ?</li>
               <li>la note est-elle égale à 20 ?</li>
               <li>la note est-elle différente de 0 ?</li>
             </ol>
             <p>Tu dois obtenir <code>True</code>, <code>False</code>, <code>True</code>.
             Compare — n’écris pas les réponses à la main.</p>`,
        en: `<p>A mark of <code>14</code> is stored in <code>note</code>. Display
             <strong>three lines</strong>, in this order:</p>
             <ol>
               <li>is the mark above the pass mark (10)?</li>
               <li>is the mark equal to 20?</li>
               <li>is the mark different from 0?</li>
             </ol>
             <p>You should get <code>True</code>, <code>False</code>, <code>True</code>.
             Compare — do not type the answers by hand.</p>`,
      },
      depart: 'note = 14\n\n# Trois comparaisons, une par ligne\n',
      verifications: [
        {
          type: 'codeNeContientPas',
          motif: 'print\\s*\\(\\s*(True|False)\\s*\\)',
          message: {
            fr: 'Ne recopie pas True et False : fais-les calculer par une comparaison.',
            en: 'Do not type True and False: let a comparison produce them.',
          },
        },
        {
          type: 'codeContient',
          motif: '==',
          message: {
            fr: 'La deuxième question demande une égalité : <code>==</code>.',
            en: 'The second question asks for equality: <code>==</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '!=',
          message: {
            fr: 'La troisième question demande une différence : <code>!=</code>.',
            en: 'The third question asks for a difference: <code>!=</code>.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'True\nFalse\nTrue', en: 'True\nFalse\nTrue' } },
      ],
      indices: [
        {
          fr: 'La première ligne : <code>print(note > 10)</code>.',
          en: 'The first line: <code>print(note > 10)</code>.',
        },
        {
          fr: 'Pour l’égalité, deux signes égal : <code>note == 20</code>.',
          en: 'For equality, two equals signs: <code>note == 20</code>.',
        },
        {
          fr: 'Pour « différent de », un point d’exclamation puis un égal : <code>note != 0</code>.',
          en: 'For "different from", an exclamation mark then an equals sign: <code>note != 0</code>.',
        },
      ],
      solution: 'note = 14\n\nprint(note > 10)\nprint(note == 20)\nprint(note != 0)',
    },
  },

  'py-op-3': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Combiner plusieurs conditions avec and, or et not.',
      en: 'Combine several conditions with and, or and not.',
    },
    explication: {
      fr: `
        <p>Une seule comparaison suffit rarement. « Avoir au moins 10 ans » ne dit rien du
        reste ; il faut souvent poser <strong>deux conditions à la fois</strong>.</p>
        <ul>
          <li><code>and</code> — les <strong>deux</strong> doivent être vraies</li>
          <li><code>or</code> — <strong>au moins une</strong> doit être vraie</li>
          <li><code>not</code> — <strong>inverse</strong> la réponse</li>
        </ul>
        <p>Ça se lit comme du français : <code>age &gt;= 10 and taille &gt;= 130</code> se lit
        « âge au moins 10 <em>et</em> taille au moins 130 ».</p>
        <p>Il existe un quatrième mot très pratique, <code>in</code>, qui demande
        « est-ce que ça se trouve là-dedans ? » :</p>
        <p><code>"a" in "chat"</code> vaut <code>True</code>, et
        <code>7 in [1, 7, 9]</code> aussi.</p>
        <p>Astuce de lecture : mets des parenthèses quand tu mélanges <code>and</code> et
        <code>or</code>. Python sait dans quel ordre les lire, mais toi tu te tromperas.</p>
      `,
      en: `
        <p>A single comparison is rarely enough. "Being at least 10" says nothing about the
        rest; you often need <strong>two conditions at once</strong>.</p>
        <ul>
          <li><code>and</code> — <strong>both</strong> must be true</li>
          <li><code>or</code> — <strong>at least one</strong> must be true</li>
          <li><code>not</code> — <strong>flips</strong> the answer</li>
        </ul>
        <p>It reads like English: <code>age &gt;= 10 and taille &gt;= 130</code> reads
        "age at least 10 <em>and</em> height at least 130".</p>
        <p>There is a fourth very handy word, <code>in</code>, which asks "is this inside
        that?":</p>
        <p><code>"a" in "chat"</code> is <code>True</code>, and
        <code>7 in [1, 7, 9]</code> too.</p>
        <p>Reading tip: add brackets when you mix <code>and</code> and <code>or</code>. Python
        knows the order to read them in, but you will get it wrong.</p>
      `,
    },
    exemple: {
      code: 'age = 12\nargent = 5\n\nprint(age >= 10 and argent >= 3)\nprint(age >= 18 or argent >= 3)\nprint(not (age >= 18))\nprint("a" in "chat")\nprint(7 in [1, 7, 9])',
    },
    defi: {
      consigne: {
        fr: `<p>Un manège n’accepte quelqu’un que s’il a <strong>au moins 10 ans</strong>
             <em>et</em> mesure <strong>au moins 130 cm</strong>.</p>
             <p>Les deux mesures sont déjà rangées dans les variables. Affiche exactement :</p>
             <pre>Peut monter : False</pre>
             <p>Calcule la réponse à partir des variables : si tu changes <code>taille</code> en
             <code>140</code>, ton programme doit dire <code>True</code> tout seul.</p>`,
        en: `<p>A fairground ride only accepts someone who is <strong>at least 10</strong>
             <em>and</em> <strong>at least 130 cm</strong> tall.</p>
             <p>Both measurements are already in variables. Display exactly:</p>
             <pre>Peut monter : False</pre>
             <p>Compute the answer from the variables: if you change <code>taille</code> to
             <code>140</code>, your program must say <code>True</code> on its own.</p>`,
      },
      depart: 'age = 12\ntaille = 125\n\n# Une seule condition, avec and\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\band\\b',
          message: {
            fr: 'Les deux conditions doivent être vraies en même temps : utilise <code>and</code>.',
            en: 'Both conditions must be true at once: use <code>and</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'False',
          message: {
            fr: 'N’écris pas False à la main : c’est la comparaison qui doit le produire.',
            en: 'Do not type False by hand: the comparison must produce it.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Peut monter : False', en: 'Peut monter : False' } },
      ],
      indices: [
        {
          fr: 'Range d’abord la réponse : <code>ok = age >= 10 and taille >= 130</code>.',
          en: 'First store the answer: <code>ok = age >= 10 and taille >= 130</code>.',
        },
        {
          fr: 'Chaque côté du <code>and</code> est une comparaison complète, avec sa variable.',
          en: 'Each side of the <code>and</code> is a complete comparison, with its variable.',
        },
        {
          fr: 'Puis affiche : <code>print(f"Peut monter : {ok}")</code>.',
          en: 'Then display it: <code>print(f"Peut monter : {ok}")</code>.',
        },
      ],
      solution: 'age = 12\ntaille = 125\n\nok = age >= 10 and taille >= 130\nprint(f"Peut monter : {ok}")',
    },
  },

  /* ========================================================= Le texte ===== */

  'py-txt-1': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Mesurer un texte et en extraire une lettre ou un morceau.',
      en: 'Measure a piece of text and pull out a letter or a chunk.',
    },
    explication: {
      fr: `
        <p>Un texte n’est pas un bloc : c’est une <strong>suite de caractères numérotés</strong>.
        Et la numérotation commence à <strong>0</strong>, pas à 1.</p>
        <pre>P  y  t  h  o  n
0  1  2  3  4  5</pre>
        <ul>
          <li><code>len(mot)</code> — combien de caractères</li>
          <li><code>mot[0]</code> — le premier</li>
          <li><code>mot[-1]</code> — le dernier (les nombres négatifs comptent depuis la fin)</li>
          <li><code>mot[0:3]</code> — du caractère 0 <strong>jusqu’à</strong> 3, sans le 3 :
          <code>Pyt</code></li>
        </ul>
        <p>Cette exclusion de la borne de droite surprend tout le monde au début. Le bon
        réflexe : <code>mot[0:3]</code> donne <strong>3 caractères</strong>. Le chiffre de
        droite est une longueur autant qu’une position.</p>
        <p>On peut omettre une borne : <code>mot[3:]</code> va du 3 jusqu’au bout,
        <code>mot[:3]</code> part du début.</p>
      `,
      en: `
        <p>A piece of text is not one block: it is a <strong>sequence of numbered
        characters</strong>. And numbering starts at <strong>0</strong>, not 1.</p>
        <pre>P  y  t  h  o  n
0  1  2  3  4  5</pre>
        <ul>
          <li><code>len(mot)</code> — how many characters</li>
          <li><code>mot[0]</code> — the first one</li>
          <li><code>mot[-1]</code> — the last one (negative numbers count from the end)</li>
          <li><code>mot[0:3]</code> — from character 0 <strong>up to</strong> 3, excluding 3:
          <code>Pyt</code></li>
        </ul>
        <p>That excluded right bound surprises everyone at first. The trick to remember:
        <code>mot[0:3]</code> gives <strong>3 characters</strong>. The right-hand number is a
        length as much as a position.</p>
        <p>You can leave a bound out: <code>mot[3:]</code> goes from 3 to the end,
        <code>mot[:3]</code> starts at the beginning.</p>
      `,
    },
    exemple: {
      code: 'mot = "Python"\n\nprint(len(mot))\nprint(mot[0])\nprint(mot[-1])\nprint(mot[0:3])\nprint(mot[3:])',
    },
    defi: {
      consigne: {
        fr: `<p>Le prénom <code>Alexandre</code> est déjà rangé dans <code>prenom</code>.
             Affiche exactement :</p>
             <pre>Première lettre : A
Dernière lettre : e
Les 4 premières : Alex
Longueur : 9</pre>
             <p>Découpe la variable — ne recopie pas les morceaux à la main.</p>`,
        en: `<p>The first name <code>Alexandre</code> is already stored in <code>prenom</code>.
             Display exactly:</p>
             <pre>Première lettre : A
Dernière lettre : e
Les 4 premières : Alex
Longueur : 9</pre>
             <p>Slice the variable — do not retype the pieces by hand.</p>`,
      },
      depart: 'prenom = "Alexandre"\n\n# Quatre lignes, en découpant prenom\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'prenom\\s*\\[',
          message: {
            fr: 'Découpe la variable avec des crochets : <code>prenom[…]</code>.',
            en: 'Slice the variable with square brackets: <code>prenom[…]</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'len\\s*\\(',
          message: {
            fr: 'La longueur se mesure avec <code>len()</code>, elle ne se compte pas à la main.',
            en: 'Length is measured with <code>len()</code>, not counted by hand.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Première lettre : A', en: 'Première lettre : A' } },
        { type: 'sortieContient', valeur: { fr: 'Dernière lettre : e', en: 'Dernière lettre : e' } },
        { type: 'sortieContient', valeur: { fr: 'Les 4 premières : Alex', en: 'Les 4 premières : Alex' } },
        { type: 'sortieContient', valeur: { fr: 'Longueur : 9', en: 'Longueur : 9' } },
      ],
      indices: [
        {
          fr: 'La première lettre est <code>prenom[0]</code>, la dernière <code>prenom[-1]</code>.',
          en: 'The first letter is <code>prenom[0]</code>, the last one <code>prenom[-1]</code>.',
        },
        {
          fr: 'Les quatre premières : <code>prenom[0:4]</code>, ou plus court <code>prenom[:4]</code>.',
          en: 'The first four: <code>prenom[0:4]</code>, or shorter <code>prenom[:4]</code>.',
        },
        {
          fr: 'Chaque ligne est un f-string : <code>print(f"Première lettre : {prenom[0]}")</code>.',
          en: 'Each line is an f-string: <code>print(f"Première lettre : {prenom[0]}")</code>.',
        },
      ],
      solution:
        'prenom = "Alexandre"\n\nprint(f"Première lettre : {prenom[0]}")\nprint(f"Dernière lettre : {prenom[-1]}")\nprint(f"Les 4 premières : {prenom[:4]}")\nprint(f"Longueur : {len(prenom)}")',
    },
  },

  'py-txt-2': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Nettoyer et transformer un texte avec ses méthodes.',
      en: 'Clean up and transform text using its methods.',
    },
    explication: {
      fr: `
        <p>Un texte sait faire des choses tout seul. On les appelle ses
        <strong>méthodes</strong> : on écrit le texte, un point, puis le nom de la méthode
        suivi de parenthèses.</p>
        <ul>
          <li><code>.upper()</code> — tout en majuscules</li>
          <li><code>.lower()</code> — tout en minuscules</li>
          <li><code>.strip()</code> — enlève les espaces au début et à la fin</li>
          <li><code>.replace("a", "o")</code> — remplace toutes les occurrences</li>
          <li><code>.capitalize()</code> — une majuscule au premier caractère</li>
        </ul>
        <p><strong>Le point crucial :</strong> ces méthodes ne changent <em>pas</em> le texte
        d’origine. Elles en fabriquent un nouveau. En Python, un texte est
        <strong>immuable</strong> : une fois créé, il ne bouge plus.</p>
        <p><code>saisie.upper()</code> tout seul ne sert donc à rien — le résultat part à la
        poubelle. Il faut le ranger : <code>saisie = saisie.upper()</code>.</p>
        <p>C’est l’erreur la plus fréquente sur ce sujet, et elle ne provoque aucun message
        d’erreur : le programme tourne, et ne fait simplement rien.</p>
      `,
      en: `
        <p>Text can do things on its own. These are called its <strong>methods</strong>: you
        write the text, a dot, then the method name followed by brackets.</p>
        <ul>
          <li><code>.upper()</code> — all uppercase</li>
          <li><code>.lower()</code> — all lowercase</li>
          <li><code>.strip()</code> — removes spaces at the start and end</li>
          <li><code>.replace("a", "o")</code> — replaces every occurrence</li>
          <li><code>.capitalize()</code> — capitalises the first character</li>
        </ul>
        <p><strong>The crucial point:</strong> these methods do <em>not</em> change the
        original text. They build a new one. In Python, text is <strong>immutable</strong>:
        once created, it never moves.</p>
        <p>So <code>saisie.upper()</code> on its own is useless — the result goes straight to
        the bin. You must store it: <code>saisie = saisie.upper()</code>.</p>
        <p>This is the most common mistake on this topic, and it raises no error message at
        all: the program runs, and simply does nothing.</p>
      `,
    },
    exemple: {
      code:
        'saisie = "  bonjour Louis  "\n\nprint(saisie.upper())\nprint(saisie.strip())\nprint(saisie.replace("Louis", "Théo"))\n\n# La preuve que le texte d\'origine n\'a pas bougé :\nprint(f"[{saisie}]")',
      note: {
        fr: 'La dernière ligne encadre le texte de crochets : les espaces sont toujours là.',
        en: 'The last line wraps the text in brackets: the spaces are still there.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Un formulaire a été mal rempli : <code>"  jean-marc  "</code>, avec des espaces
             en trop et sans majuscules.</p>
             <p>Nettoie-le puis affiche-le entièrement en majuscules :</p>
             <pre>JEAN-MARC</pre>
             <p>Attention : aucun espace avant ou après.</p>`,
        en: `<p>A form was filled in badly: <code>"  jean-marc  "</code>, with extra spaces and
             no capitals.</p>
             <p>Clean it up then display it fully in uppercase:</p>
             <pre>JEAN-MARC</pre>
             <p>Careful: no space before or after.</p>`,
      },
      depart: 'saisie = "  jean-marc  "\n\n# Nettoie puis affiche en majuscules\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.strip\\s*\\(',
          message: {
            fr: 'Les espaces en trop s’enlèvent avec <code>.strip()</code>.',
            en: 'Extra spaces are removed with <code>.strip()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.upper\\s*\\(',
          message: {
            fr: 'Les majuscules se font avec <code>.upper()</code>.',
            en: 'Uppercase is done with <code>.upper()</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '"JEAN-MARC"|\'JEAN-MARC\'',
          message: {
            fr: 'Ne recopie pas le résultat : transforme la variable.',
            en: 'Do not retype the result: transform the variable.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'JEAN-MARC', en: 'JEAN-MARC' } },
      ],
      indices: [
        {
          fr: 'Les méthodes s’enchaînent : <code>saisie.strip().upper()</code>.',
          en: 'Methods chain together: <code>saisie.strip().upper()</code>.',
        },
        {
          fr: 'L’ordre n’a pas d’importance ici, mais chaque méthode a bien ses parenthèses.',
          en: 'Order does not matter here, but each method needs its brackets.',
        },
        {
          fr: 'Il ne reste qu’à afficher : <code>print(saisie.strip().upper())</code>.',
          en: 'All that is left is to display it: <code>print(saisie.strip().upper())</code>.',
        },
      ],
      solution: 'saisie = "  jean-marc  "\n\nprint(saisie.strip().upper())',
    },
  },

  'py-txt-3': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Découper un texte en morceaux, et rassembler des morceaux en texte.',
      en: 'Split text into pieces, and join pieces back into text.',
    },
    explication: {
      fr: `
        <p>Deux méthodes qui vont ensemble, et qui servent tout le temps :</p>
        <p><code>.split(" ")</code> <strong>découpe</strong> un texte à chaque espace et rend
        une <strong>liste</strong> :</p>
        <p><code>"chat chien lapin".split(" ")</code> donne
        <code>['chat', 'chien', 'lapin']</code></p>
        <p><code>", ".join(liste)</code> fait l’inverse : il <strong>recolle</strong> les
        éléments d’une liste en les séparant par ce qu’on a écrit devant :</p>
        <p><code>", ".join(['chat', 'chien'])</code> donne <code>chat, chien</code></p>
        <p>L’ordre de <code>join</code> déroute au début : c’est le
        <strong>séparateur</strong> qui porte la méthode, pas la liste. On lit ça
        « avec une virgule, assemble cette liste ».</p>
        <p>Une fois qu’on a une liste, <code>len()</code> compte ses éléments — ici, ses mots.</p>
      `,
      en: `
        <p>Two methods that go together, and are used constantly:</p>
        <p><code>.split(" ")</code> <strong>cuts</strong> text at every space and gives back a
        <strong>list</strong>:</p>
        <p><code>"chat chien lapin".split(" ")</code> gives
        <code>['chat', 'chien', 'lapin']</code></p>
        <p><code>", ".join(liste)</code> does the opposite: it <strong>glues</strong> the items
        of a list together, separated by whatever you wrote in front:</p>
        <p><code>", ".join(['chat', 'chien'])</code> gives <code>chat, chien</code></p>
        <p>The order of <code>join</code> is confusing at first: the <strong>separator</strong>
        carries the method, not the list. Read it as "with a comma, join this list".</p>
        <p>Once you have a list, <code>len()</code> counts its items — here, its words.</p>
      `,
    },
    exemple: {
      code:
        'phrase = "chat chien lapin"\nmots = phrase.split(" ")\n\nprint(mots)\nprint(len(mots))\nprint(", ".join(mots))\nprint(" et ".join(mots))',
    },
    defi: {
      consigne: {
        fr: `<p>Une phrase contient des animaux séparés par des espaces. Affiche exactement :</p>
             <pre>3 animaux : chat, chien, lapin</pre>
             <p>Le nombre doit être <strong>compté</strong>, et la liste
             <strong>recollée</strong> — ajouter un animal à la phrase de départ doit suffire à
             tout mettre à jour.</p>`,
        en: `<p>A sentence contains animals separated by spaces. Display exactly:</p>
             <pre>3 animaux : chat, chien, lapin</pre>
             <p>The number must be <strong>counted</strong>, and the list
             <strong>glued back</strong> — adding an animal to the starting sentence should be
             enough to update everything.</p>`,
      },
      depart: 'phrase = "chat chien lapin"\n\n# Découpe, compte, recolle\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.split\\s*\\(',
          message: {
            fr: 'Découpe la phrase avec <code>.split(" ")</code>.',
            en: 'Split the sentence with <code>.split(" ")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.join\\s*\\(',
          message: {
            fr: 'Recolle les mots avec <code>", ".join(…)</code>.',
            en: 'Glue the words back with <code>", ".join(…)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'len\\s*\\(',
          message: {
            fr: 'Compte les animaux avec <code>len()</code> plutôt qu’à la main.',
            en: 'Count the animals with <code>len()</code> rather than by hand.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '3 animaux : chat, chien, lapin', en: '3 animaux : chat, chien, lapin' } },
      ],
      indices: [
        {
          fr: 'Commence par <code>animaux = phrase.split(" ")</code>.',
          en: 'Start with <code>animaux = phrase.split(" ")</code>.',
        },
        {
          fr: 'Le nombre est <code>len(animaux)</code>, la liste recollée est <code>", ".join(animaux)</code>.',
          en: 'The number is <code>len(animaux)</code>, the glued list is <code>", ".join(animaux)</code>.',
        },
        {
          fr: 'Un seul f-string suffit : <code>print(f"{len(animaux)} animaux : {\', \'.join(animaux)}")</code>.',
          en: 'One f-string is enough: <code>print(f"{len(animaux)} animaux : {\', \'.join(animaux)}")</code>.',
        },
      ],
      solution:
        'phrase = "chat chien lapin"\nanimaux = phrase.split(" ")\n\nprint(f"{len(animaux)} animaux : {\', \'.join(animaux)}")',
    },
  },

  'py-txt-4': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Chercher dans un texte : présence, position, nombre d’occurrences.',
      en: 'Search inside text: presence, position, number of occurrences.',
    },
    explication: {
      fr: `
        <p>Chercher est le geste le plus courant sur du texte. Quatre outils suffisent :</p>
        <ul>
          <li><code>"py" in mot</code> — <strong>True ou False</strong> : est-ce que ça s’y
          trouve ?</li>
          <li><code>mot.count("a")</code> — combien de fois</li>
          <li><code>mot.find("th")</code> — à quelle position, ou <code>-1</code> si absent</li>
          <li><code>mot.startswith("Py")</code> et <code>mot.endswith("on")</code> — au début,
          à la fin</li>
        </ul>
        <p><code>find</code> rend <code>-1</code> plutôt que de planter quand il ne trouve
        rien. C’est volontaire, et c’est un piège : <code>-1</code> est un nombre comme un
        autre, et un test mal écrit le prendra pour une position valide.</p>
        <p>Quand tu veux seulement savoir <em>si</em> c’est là, préfère <code>in</code> : plus
        court, plus lisible, et sans <code>-1</code> qui traîne.</p>
        <p>Attention enfin : la recherche distingue majuscules et minuscules.
        <code>"p" in "Python"</code> vaut <code>False</code> — le P est majuscule.</p>
      `,
      en: `
        <p>Searching is the most common thing you do with text. Four tools are enough:</p>
        <ul>
          <li><code>"py" in mot</code> — <strong>True or False</strong>: is it in there?</li>
          <li><code>mot.count("a")</code> — how many times</li>
          <li><code>mot.find("th")</code> — at which position, or <code>-1</code> if absent</li>
          <li><code>mot.startswith("Py")</code> and <code>mot.endswith("on")</code> — at the
          start, at the end</li>
        </ul>
        <p><code>find</code> gives back <code>-1</code> rather than crashing when it finds
        nothing. That is deliberate, and it is a trap: <code>-1</code> is a number like any
        other, and a badly written test will take it for a valid position.</p>
        <p>When you only want to know <em>whether</em> it is there, prefer <code>in</code>:
        shorter, more readable, and with no stray <code>-1</code>.</p>
        <p>One last thing: searching is case-sensitive. <code>"p" in "Python"</code> is
        <code>False</code> — the P is a capital.</p>
      `,
    },
    exemple: {
      code:
        'phrase = "Python est un langage puissant"\n\nprint("langage" in phrase)\nprint("java" in phrase)\nprint(phrase.count("a"))\nprint(phrase.find("est"))\nprint(phrase.find("java"))\nprint(phrase.startswith("Python"))',
      note: {
        fr: 'Regarde bien l’avant-dernière ligne : <code>-1</code> veut dire « pas trouvé ».',
        en: 'Look at the second-to-last line: <code>-1</code> means "not found".',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Analyse la phrase rangée dans <code>phrase</code> et affiche exactement :</p>
             <pre>Contient « chat » : True
Nombre de « a » : 3
Commence par « Le » : True</pre>
             <p>Tout doit être trouvé par le programme, pas écrit à la main.</p>`,
        en: `<p>Analyse the sentence stored in <code>phrase</code> and display exactly:</p>
             <pre>Contient « chat » : True
Nombre de « a » : 3
Commence par « Le » : True</pre>
             <p>Everything must be found by the program, not typed by hand.</p>`,
      },
      depart: 'phrase = "Le chat dort sur le canapé"\n\n# Trois lignes d\'analyse\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\bin\\b',
          message: {
            fr: 'Pour savoir si « chat » s’y trouve, utilise <code>in</code>.',
            en: 'To find out whether "chat" is there, use <code>in</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.count\\s*\\(',
          message: {
            fr: 'Compte les « a » avec <code>.count("a")</code>.',
            en: 'Count the "a" letters with <code>.count("a")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.startswith\\s*\\(',
          message: {
            fr: 'Le début se teste avec <code>.startswith("Le")</code>.',
            en: 'The beginning is tested with <code>.startswith("Le")</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Contient « chat » : True', en: 'Contient « chat » : True' } },
        { type: 'sortieContient', valeur: { fr: 'Nombre de « a » : 3', en: 'Nombre de « a » : 3' } },
        { type: 'sortieContient', valeur: { fr: 'Commence par « Le » : True', en: 'Commence par « Le » : True' } },
      ],
      indices: [
        {
          fr: 'La première ligne : <code>print(f"Contient « chat » : {\'chat\' in phrase}")</code>.',
          en: 'The first line: <code>print(f"Contient « chat » : {\'chat\' in phrase}")</code>.',
        },
        {
          fr: 'Dans un f-string en guillemets doubles, utilise des apostrophes à l’intérieur des accolades.',
          en: 'Inside a double-quoted f-string, use single quotes within the braces.',
        },
        {
          fr: 'Les deux autres : <code>phrase.count("a")</code> et <code>phrase.startswith("Le")</code>.',
          en: 'The other two: <code>phrase.count("a")</code> and <code>phrase.startswith("Le")</code>.',
        },
      ],
      solution:
        'phrase = "Le chat dort sur le canapé"\n\nprint(f"Contient « chat » : {\'chat\' in phrase}")\nprint(f"Nombre de « a » : {phrase.count(\'a\')}")\nprint(f"Commence par « Le » : {phrase.startswith(\'Le\')}")',
    },
  },

  /* ============================================ Tuples et ensembles ======= */

  'py-tup-1': {
    langage: 'python',
    xp: 25,
    objectif: {
      fr: 'Utiliser un tuple : une suite de valeurs qui ne peut plus changer.',
      en: 'Use a tuple: a sequence of values that can never change.',
    },
    explication: {
      fr: `
        <p>Un <strong>tuple</strong> ressemble à une liste, mais il s’écrit avec des
        parenthèses et surtout : <strong>on ne peut plus le modifier</strong>.</p>
        <p><code>point = (3, 7)</code></p>
        <p>Tout ce que tu sais faire sur une liste marche pour lire :
        <code>point[0]</code>, <code>len(point)</code>, une boucle <code>for</code>,
        <code>in</code>. Ce qui ne marche pas, c’est écrire : <code>point[0] = 5</code>
        provoque une erreur.</p>
        <p><strong>Pourquoi vouloir quelque chose qu’on ne peut pas changer ?</strong> Parce
        que beaucoup de valeurs ne <em>doivent</em> pas changer : les coordonnées d’un point,
        une date, les trois composantes d’une couleur. Le tuple dit à qui lit ton code :
        « ceci forme un tout, n’y touche pas ».</p>
        <p>Et si tu veux quand même une version différente, tu en fabriques une nouvelle :
        <code>point + (9,)</code>. La virgule seule n’est pas une faute de frappe — sans elle,
        <code>(9)</code> serait juste le nombre 9 entre parenthèses.</p>
      `,
      en: `
        <p>A <strong>tuple</strong> looks like a list, but it is written with round brackets
        and above all: <strong>it can never be modified</strong>.</p>
        <p><code>point = (3, 7)</code></p>
        <p>Everything you know about reading a list works: <code>point[0]</code>,
        <code>len(point)</code>, a <code>for</code> loop, <code>in</code>. What does not work
        is writing: <code>point[0] = 5</code> raises an error.</p>
        <p><strong>Why want something you cannot change?</strong> Because many values
        <em>must</em> not change: the coordinates of a point, a date, the three components of a
        colour. A tuple tells whoever reads your code: "this is one whole, do not touch it".</p>
        <p>And if you do want a different version, you build a new one:
        <code>point + (9,)</code>. That lone comma is not a typo — without it,
        <code>(9)</code> would just be the number 9 in brackets.</p>
      `,
    },
    exemple: {
      code:
        'point = (3, 7)\n\nprint(point)\nprint(point[0], point[1])\nprint(len(point))\n\ncouleurs = ("rouge", "vert", "bleu")\nfor c in couleurs:\n    print(c)\n\n# On ne modifie pas un tuple, on en fabrique un autre :\nprint(couleurs + ("jaune",))',
      note: {
        fr: 'Essaie d’ajouter <code>point[0] = 5</code> à la fin : Python refuse, et te dit pourquoi.',
        en: 'Try adding <code>point[0] = 5</code> at the end: Python refuses, and tells you why.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Un trésor est caché aux coordonnées <strong>12</strong> et <strong>45</strong>.</p>
             <p>Range-les dans un tuple nommé <code>tresor</code>, puis affiche :</p>
             <pre>Le trésor est en (12, 45)
Abscisse : 12
Ordonnée : 45</pre>`,
        en: `<p>A treasure is hidden at coordinates <strong>12</strong> and <strong>45</strong>.</p>
             <p>Store them in a tuple called <code>tresor</code>, then display:</p>
             <pre>Le trésor est en (12, 45)
Abscisse : 12
Ordonnée : 45</pre>`,
      },
      depart: '# Crée le tuple tresor, puis affiche les trois lignes\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'tresor\\s*=\\s*\\(\\s*12\\s*,\\s*45\\s*\\)',
          message: {
            fr: 'Crée le tuple avec des parenthèses : <code>tresor = (12, 45)</code>.',
            en: 'Create the tuple with round brackets: <code>tresor = (12, 45)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'tresor\\s*\\[',
          message: {
            fr: 'Lis les valeurs dans le tuple avec <code>tresor[0]</code> et <code>tresor[1]</code>.',
            en: 'Read the values from the tuple with <code>tresor[0]</code> and <code>tresor[1]</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Le trésor est en (12, 45)', en: 'Le trésor est en (12, 45)' } },
        { type: 'sortieContient', valeur: { fr: 'Abscisse : 12', en: 'Abscisse : 12' } },
        { type: 'sortieContient', valeur: { fr: 'Ordonnée : 45', en: 'Ordonnée : 45' } },
      ],
      indices: [
        {
          fr: 'Un tuple s’écrit avec des parenthèses : <code>tresor = (12, 45)</code>.',
          en: 'A tuple is written with round brackets: <code>tresor = (12, 45)</code>.',
        },
        {
          fr: 'La première ligne affiche le tuple entier : <code>print(f"Le trésor est en {tresor}")</code>.',
          en: 'The first line displays the whole tuple: <code>print(f"Le trésor est en {tresor}")</code>.',
        },
        {
          fr: 'Puis chaque valeur séparément : <code>tresor[0]</code> et <code>tresor[1]</code>.',
          en: 'Then each value separately: <code>tresor[0]</code> and <code>tresor[1]</code>.',
        },
      ],
      solution:
        'tresor = (12, 45)\n\nprint(f"Le trésor est en {tresor}")\nprint(f"Abscisse : {tresor[0]}")\nprint(f"Ordonnée : {tresor[1]}")',
    },
  },

  'py-tup-2': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Déballer un tuple en plusieurs variables d’un seul coup.',
      en: 'Unpack a tuple into several variables at once.',
    },
    explication: {
      fr: `
        <p>Voici le geste qui rend les tuples vraiment agréables. Au lieu de lire les valeurs
        une par une avec des crochets, on les <strong>déballe</strong> :</p>
        <pre>point = (3, 7)
x, y = point</pre>
        <p>Python distribue les valeurs dans l’ordre : <code>x</code> reçoit 3,
        <code>y</code> reçoit 7. C’est plus court, et surtout ça donne un
        <strong>nom</strong> à chaque valeur — <code>x</code> se comprend mieux que
        <code>point[0]</code>.</p>
        <p>Le nombre de variables doit correspondre exactement. Deux variables pour un tuple de
        trois valeurs, et Python proteste.</p>
        <p>Un cadeau au passage : <strong>échanger deux variables</strong> tient sur une ligne,
        sans variable temporaire.</p>
        <pre>a, b = b, a</pre>
        <p>Dans la plupart des autres langages, il faut trois lignes et une variable de
        passage. Ici, la droite est calculée en entier avant d’être distribuée à gauche.</p>
      `,
      en: `
        <p>Here is what makes tuples really pleasant. Instead of reading the values one by one
        with square brackets, you <strong>unpack</strong> them:</p>
        <pre>point = (3, 7)
x, y = point</pre>
        <p>Python hands out the values in order: <code>x</code> gets 3, <code>y</code> gets 7.
        It is shorter, and above all it gives each value a <strong>name</strong> —
        <code>x</code> reads better than <code>point[0]</code>.</p>
        <p>The number of variables must match exactly. Two variables for a three-value tuple,
        and Python complains.</p>
        <p>A gift along the way: <strong>swapping two variables</strong> fits on one line, with
        no temporary variable.</p>
        <pre>a, b = b, a</pre>
        <p>In most other languages this takes three lines and a spare variable. Here the
        right-hand side is computed in full before being handed to the left.</p>
      `,
    },
    exemple: {
      code:
        'point = (3, 7)\nx, y = point\nprint(f"x = {x}, y = {y}")\n\na = 1\nb = 2\nprint(f"avant : a={a} b={b}")\na, b = b, a\nprint(f"après : a={a} b={b}")\n\njour, mois, annee = (29, 8, 2026)\nprint(f"{jour}/{mois}/{annee}")',
    },
    defi: {
      consigne: {
        fr: `<p>Une date est rangée dans un tuple : <code>(25, 12, 2026)</code>.</p>
             <p><strong>Déballe-la</strong> en trois variables <code>jour</code>,
             <code>mois</code> et <code>annee</code>, puis affiche :</p>
             <pre>25/12/2026</pre>
             <p>Le déballage est obligatoire : pas de <code>date[0]</code>.</p>`,
        en: `<p>A date is stored in a tuple: <code>(25, 12, 2026)</code>.</p>
             <p><strong>Unpack it</strong> into three variables <code>jour</code>,
             <code>mois</code> and <code>annee</code>, then display:</p>
             <pre>25/12/2026</pre>
             <p>Unpacking is required: no <code>date[0]</code>.</p>`,
      },
      depart: 'date = (25, 12, 2026)\n\n# Déballe la date, puis affiche-la\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'jour\\s*,\\s*mois\\s*,\\s*annee\\s*=',
          message: {
            fr: 'Déballe en une ligne : <code>jour, mois, annee = date</code>.',
            en: 'Unpack in one line: <code>jour, mois, annee = date</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'date\\s*\\[',
          message: {
            fr: 'Ici on déballe : pas de crochets sur <code>date</code>.',
            en: 'Here we unpack: no square brackets on <code>date</code>.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '25/12/2026', en: '25/12/2026' } },
      ],
      indices: [
        {
          fr: 'Trois noms à gauche, le tuple à droite : <code>jour, mois, annee = date</code>.',
          en: 'Three names on the left, the tuple on the right: <code>jour, mois, annee = date</code>.',
        },
        {
          fr: 'L’ordre compte : le premier nom reçoit la première valeur.',
          en: 'Order matters: the first name gets the first value.',
        },
        {
          fr: 'Puis un f-string : <code>print(f"{jour}/{mois}/{annee}")</code>.',
          en: 'Then an f-string: <code>print(f"{jour}/{mois}/{annee}")</code>.',
        },
      ],
      solution: 'date = (25, 12, 2026)\n\njour, mois, annee = date\nprint(f"{jour}/{mois}/{annee}")',
    },
  },

  'py-tup-3': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Utiliser un ensemble pour éliminer les doublons.',
      en: 'Use a set to get rid of duplicates.',
    },
    explication: {
      fr: `
        <p>Un <strong>ensemble</strong> s’écrit avec des accolades, et il a une règle unique :
        <strong>chaque valeur n’y figure qu’une fois</strong>.</p>
        <p><code>animaux = {"chat", "chien"}</code></p>
        <p>Ajoute deux fois la même chose, il n’en garde qu’une. Et ce n’est pas une erreur :
        c’est exactement ce qu’on lui demande.</p>
        <p>D’où le geste le plus utile de tous — <strong>dédoublonner une liste</strong> :</p>
        <pre>notes = [12, 15, 12, 9]
print(set(notes))    # {9, 12, 15}</pre>
        <p>Deux différences avec une liste, à connaître :</p>
        <ul>
          <li>un ensemble <strong>n’a pas d’ordre</strong> : pas de <code>ensemble[0]</code>.
          Pour l’afficher joliment, passe par <code>sorted()</code> ;</li>
          <li>chercher dedans avec <code>in</code> est <strong>très rapide</strong>, même sur
          des milliers de valeurs — bien plus qu’une liste.</li>
        </ul>
        <p>Attention à un piège : <code>{}</code> tout seul crée un dictionnaire, pas un
        ensemble vide. Pour celui-ci, il faut écrire <code>set()</code>.</p>
      `,
      en: `
        <p>A <strong>set</strong> is written with curly braces, and it has one single rule:
        <strong>each value appears only once</strong>.</p>
        <p><code>animaux = {"chat", "chien"}</code></p>
        <p>Add the same thing twice and it keeps only one. And that is not a bug: it is exactly
        what you asked for.</p>
        <p>Hence the most useful move of all — <strong>removing duplicates from a list</strong>:</p>
        <pre>notes = [12, 15, 12, 9]
print(set(notes))    # {9, 12, 15}</pre>
        <p>Two differences from a list, worth knowing:</p>
        <ul>
          <li>a set <strong>has no order</strong>: no <code>ensemble[0]</code>. To display it
          nicely, go through <code>sorted()</code>;</li>
          <li>searching it with <code>in</code> is <strong>very fast</strong>, even across
          thousands of values — far faster than a list.</li>
        </ul>
        <p>Watch out for one trap: <code>{}</code> on its own creates a dictionary, not an empty
        set. For that you must write <code>set()</code>.</p>
      `,
    },
    exemple: {
      code:
        'notes = [12, 15, 12, 9, 15, 15]\nuniques = set(notes)\n\nprint(sorted(uniques))\nprint(len(notes), "notes,", len(uniques), "valeurs différentes")\n\nlettres = set("bonjour")\nprint(sorted(lettres))\n\nanimaux = {"chat", "chien"}\nanimaux.add("lapin")\nanimaux.add("chat")\nprint(len(animaux))',
    },
    defi: {
      consigne: {
        fr: `<p>Une classe a rendu ces notes : <code>[12, 15, 12, 9, 15, 20, 9]</code>.</p>
             <p>Affiche combien de notes ont été rendues, et combien de
             <strong>valeurs différentes</strong> apparaissent :</p>
             <pre>7 notes rendues
4 valeurs différentes
Les valeurs : [9, 12, 15, 20]</pre>`,
        en: `<p>A class handed in these marks: <code>[12, 15, 12, 9, 15, 20, 9]</code>.</p>
             <p>Display how many marks were handed in, and how many
             <strong>different values</strong> appear:</p>
             <pre>7 notes rendues
4 valeurs différentes
Les valeurs : [9, 12, 15, 20]</pre>`,
      },
      depart: 'notes = [12, 15, 12, 9, 15, 20, 9]\n\n# Compte les notes, puis les valeurs différentes\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'set\\s*\\(',
          message: {
            fr: 'Élimine les doublons avec <code>set(notes)</code>.',
            en: 'Remove duplicates with <code>set(notes)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'sorted\\s*\\(',
          message: {
            fr: 'Un ensemble n’a pas d’ordre : range-le avec <code>sorted()</code> pour l’afficher.',
            en: 'A set has no order: sort it with <code>sorted()</code> before displaying it.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '7 notes rendues', en: '7 notes rendues' } },
        { type: 'sortieContient', valeur: { fr: '4 valeurs différentes', en: '4 valeurs différentes' } },
        { type: 'sortieContient', valeur: { fr: 'Les valeurs : [9, 12, 15, 20]', en: 'Les valeurs : [9, 12, 15, 20]' } },
      ],
      indices: [
        {
          fr: 'Commence par <code>valeurs = set(notes)</code>.',
          en: 'Start with <code>valeurs = set(notes)</code>.',
        },
        {
          fr: '<code>len(notes)</code> compte les notes, <code>len(valeurs)</code> les valeurs différentes.',
          en: '<code>len(notes)</code> counts the marks, <code>len(valeurs)</code> the different values.',
        },
        {
          fr: 'La dernière ligne : <code>print(f"Les valeurs : {sorted(valeurs)}")</code>.',
          en: 'The last line: <code>print(f"Les valeurs : {sorted(valeurs)}")</code>.',
        },
      ],
      solution:
        'notes = [12, 15, 12, 9, 15, 20, 9]\nvaleurs = set(notes)\n\nprint(f"{len(notes)} notes rendues")\nprint(f"{len(valeurs)} valeurs différentes")\nprint(f"Les valeurs : {sorted(valeurs)}")',
    },
  },

  'py-tup-4': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Comparer deux ensembles : ce qu’ils ont en commun, ce qui les distingue.',
      en: 'Compare two sets: what they share, what sets them apart.',
    },
    explication: {
      fr: `
        <p>C’est là que les ensembles deviennent vraiment forts. Trois opérateurs répondent en
        un caractère à des questions qui demanderaient une boucle et des <code>if</code> :</p>
        <ul>
          <li><code>a &amp; b</code> — l’<strong>intersection</strong> : ce qui est dans les
          deux ;</li>
          <li><code>a | b</code> — l’<strong>union</strong> : tout, sans doublon ;</li>
          <li><code>a - b</code> — la <strong>différence</strong> : ce qui est dans
          <code>a</code> mais pas dans <code>b</code>.</li>
        </ul>
        <p>Ce sont exactement les diagrammes que tu as peut-être déjà vus en maths : deux
        patates qui se chevauchent. <code>&amp;</code> est la zone commune, <code>|</code> les
        deux patates entières, <code>-</code> la partie gauche seule.</p>
        <p>Retiens que <code>a - b</code> et <code>b - a</code> ne donnent
        <strong>pas</strong> la même chose. L’intersection et l’union, elles, se moquent de
        l’ordre.</p>
      `,
      en: `
        <p>This is where sets get really powerful. Three operators answer in a single character
        questions that would otherwise need a loop and several <code>if</code>s:</p>
        <ul>
          <li><code>a &amp; b</code> — the <strong>intersection</strong>: what is in both;</li>
          <li><code>a | b</code> — the <strong>union</strong>: everything, with no
          duplicates;</li>
          <li><code>a - b</code> — the <strong>difference</strong>: what is in <code>a</code>
          but not in <code>b</code>.</li>
        </ul>
        <p>These are exactly the diagrams you may have seen in maths: two overlapping blobs.
        <code>&amp;</code> is the shared area, <code>|</code> both blobs entirely,
        <code>-</code> the left part alone.</p>
        <p>Remember that <code>a - b</code> and <code>b - a</code> do <strong>not</strong> give
        the same thing. Intersection and union, however, do not care about order.</p>
      `,
    },
    exemple: {
      code:
        'moi = {"foot", "dessin", "jeux vidéo"}\nami = {"foot", "lecture", "jeux vidéo"}\n\nprint("en commun :", sorted(moi & ami))\nprint("tout      :", sorted(moi | ami))\nprint("que moi   :", sorted(moi - ami))\nprint("que lui   :", sorted(ami - moi))\nprint("foot" in moi)',
    },
    defi: {
      consigne: {
        fr: `<p>Tes loisirs et ceux d’un ami sont déjà rangés dans deux ensembles.</p>
             <p>Affiche ce que vous avez en commun, puis ce que toi seul aimes :</p>
             <pre>En commun : foot, jeux vidéo
Rien qu'à moi : dessin</pre>
             <p>Les listes doivent être triées et séparées par une virgule et une espace.</p>`,
        en: `<p>Your hobbies and a friend's are already stored in two sets.</p>
             <p>Display what you have in common, then what only you enjoy:</p>
             <pre>En commun : foot, jeux vidéo
Rien qu'à moi : dessin</pre>
             <p>The lists must be sorted and separated by a comma and a space.</p>`,
      },
      depart:
        'moi = {"foot", "dessin", "jeux vidéo"}\nami = {"foot", "lecture", "jeux vidéo"}\n\n# En commun, puis rien qu\'à toi\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '&',
          message: {
            fr: 'Ce qui est dans les deux, c’est l’intersection : <code>moi &amp; ami</code>.',
            en: 'What is in both is the intersection: <code>moi &amp; ami</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.join\\s*\\(',
          message: {
            fr: 'Recolle les éléments avec <code>", ".join(...)</code>.',
            en: 'Glue the items together with <code>", ".join(...)</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'En commun : foot, jeux vidéo', en: 'En commun : foot, jeux vidéo' } },
        { type: 'sortieContient', valeur: { fr: "Rien qu'à moi : dessin", en: "Rien qu'à moi : dessin" } },
      ],
      indices: [
        {
          fr: 'L’intersection : <code>commun = moi & ami</code>. La différence : <code>moi - ami</code>.',
          en: 'The intersection: <code>commun = moi & ami</code>. The difference: <code>moi - ami</code>.',
        },
        {
          fr: 'Un ensemble n’a pas d’ordre : passe par <code>sorted(commun)</code> avant de recoller.',
          en: 'A set has no order: go through <code>sorted(commun)</code> before gluing.',
        },
        {
          fr: 'Puis : <code>print(f"En commun : {\', \'.join(sorted(commun))}")</code>.',
          en: 'Then: <code>print(f"En commun : {\', \'.join(sorted(commun))}")</code>.',
        },
      ],
      solution:
        'moi = {"foot", "dessin", "jeux vidéo"}\nami = {"foot", "lecture", "jeux vidéo"}\n\ncommun = moi & ami\nperso = moi - ami\n\nprint(f"En commun : {\', \'.join(sorted(commun))}")\nprint(f"Rien qu\'à moi : {\', \'.join(sorted(perso))}")',
    },
  },

  /* ================================================= Les dictionnaires ==== */

  'py-dic-1': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Ranger des valeurs derrière des étiquettes plutôt que des numéros.',
      en: 'Store values behind labels rather than numbers.',
    },
    explication: {
      fr: `
        <p>Dans une liste, on retrouve une valeur par sa <strong>position</strong> :
        <code>eleve[0]</code>. Mais qui se souvient que la case 2 contient la classe ?</p>
        <p>Un <strong>dictionnaire</strong> range les valeurs derrière des
        <strong>étiquettes</strong> — on les appelle des <em>clés</em> :</p>
        <pre>eleve = {"nom": "Louis", "age": 12, "classe": "6e"}
print(eleve["nom"])      # Louis</pre>
        <p>Accolades, et chaque entrée s’écrit <code>clé: valeur</code>, séparées par des
        virgules. Pour lire, on met la clé entre crochets — pas un numéro.</p>
        <p>C’est le type le plus utilisé de tout Python, parce qu’il colle à la façon dont on
        décrit les choses : un élève <em>a</em> un nom, un âge, une classe. Un dictionnaire, ce
        n’est pas une suite, c’est une <strong>fiche</strong>.</p>
        <p>Les clés sont presque toujours du texte, mais les valeurs sont ce que tu veux :
        nombres, textes, et même des listes.</p>
      `,
      en: `
        <p>In a list you find a value by its <strong>position</strong>:
        <code>eleve[0]</code>. But who remembers that slot 2 holds the class?</p>
        <p>A <strong>dictionary</strong> stores values behind <strong>labels</strong> — called
        <em>keys</em>:</p>
        <pre>eleve = {"nom": "Louis", "age": 12, "classe": "6e"}
print(eleve["nom"])      # Louis</pre>
        <p>Curly braces, and each entry is written <code>key: value</code>, separated by
        commas. To read, you put the key in square brackets — not a number.</p>
        <p>It is the most used type in all of Python, because it matches how we describe
        things: a pupil <em>has</em> a name, an age, a class. A dictionary is not a sequence,
        it is a <strong>record card</strong>.</p>
        <p>Keys are almost always text, but values can be anything you like: numbers, text,
        even lists.</p>
      `,
    },
    exemple: {
      code:
        'eleve = {"nom": "Louis", "age": 12, "classe": "6e"}\n\nprint(eleve["nom"])\nprint(eleve["age"])\nprint(eleve)\nprint(len(eleve))\n\n# Une valeur peut être une liste :\neleve["matieres"] = ["maths", "anglais"]\nprint(eleve["matieres"][0])',
    },
    defi: {
      consigne: {
        fr: `<p>Crée la fiche d’un personnage de jeu vidéo dans un dictionnaire nommé
             <code>heros</code>, avec trois clés : <code>nom</code> valant
             <code>"Zelda"</code>, <code>vie</code> valant <code>100</code> et
             <code>arme</code> valant <code>"arc"</code>.</p>
             <p>Puis affiche :</p>
             <pre>Nom : Zelda
Points de vie : 100
Arme : arc</pre>`,
        en: `<p>Create a video game character record in a dictionary called <code>heros</code>,
             with three keys: <code>nom</code> holding <code>"Zelda"</code>, <code>vie</code>
             holding <code>100</code> and <code>arme</code> holding <code>"arc"</code>.</p>
             <p>Then display:</p>
             <pre>Nom : Zelda
Points de vie : 100
Arme : arc</pre>`,
      },
      depart: '# Crée le dictionnaire heros, puis affiche ses trois valeurs\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'heros\\s*=\\s*\\{',
          message: {
            fr: 'Un dictionnaire s’écrit avec des accolades : <code>heros = {…}</code>.',
            en: 'A dictionary is written with curly braces: <code>heros = {…}</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'heros\\s*\\[',
          message: {
            fr: 'Lis les valeurs par leur clé : <code>heros["nom"]</code>.',
            en: 'Read the values by their key: <code>heros["nom"]</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Nom : Zelda', en: 'Nom : Zelda' } },
        { type: 'sortieContient', valeur: { fr: 'Points de vie : 100', en: 'Points de vie : 100' } },
        { type: 'sortieContient', valeur: { fr: 'Arme : arc', en: 'Arme : arc' } },
      ],
      indices: [
        {
          fr: 'Chaque entrée s’écrit <code>"clé": valeur</code>, séparées par des virgules.',
          en: 'Each entry is written <code>"key": value</code>, separated by commas.',
        },
        {
          fr: '<code>heros = {"nom": "Zelda", "vie": 100, "arme": "arc"}</code>',
          en: '<code>heros = {"nom": "Zelda", "vie": 100, "arme": "arc"}</code>',
        },
        {
          fr: 'Puis : <code>print(f"Nom : {heros[\'nom\']}")</code>, et ainsi de suite.',
          en: 'Then: <code>print(f"Nom : {heros[\'nom\']}")</code>, and so on.',
        },
      ],
      solution:
        'heros = {"nom": "Zelda", "vie": 100, "arme": "arc"}\n\nprint(f"Nom : {heros[\'nom\']}")\nprint(f"Points de vie : {heros[\'vie\']}")\nprint(f"Arme : {heros[\'arme\']}")',
    },
  },

  'py-dic-2': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Ajouter, modifier et interroger un dictionnaire sans le faire planter.',
      en: 'Add to, modify and query a dictionary without making it crash.',
    },
    explication: {
      fr: `
        <p>Un dictionnaire se remplit au fur et à mesure :</p>
        <pre>inventaire["bouclier"] = 1</pre>
        <p>Cette seule ligne fait <strong>deux choses selon le cas</strong> : elle ajoute la clé
        si elle n’existe pas, et elle remplace la valeur si elle existe déjà. Il n’y a pas
        d’instruction « ajouter » séparée.</p>
        <p><strong>Le piège :</strong> lire une clé absente ne rend pas <code>0</code> ni
        <code>None</code> — ça <strong>plante</strong>, avec une erreur
        <code>KeyError</code>. D’où deux garde-fous :</p>
        <ul>
          <li><code>"potion" in inventaire</code> — la clé existe-t-elle ? (le test porte sur
          les <strong>clés</strong>, jamais sur les valeurs) ;</li>
          <li><code>inventaire.get("potion", 0)</code> — lis-la, et si elle manque, donne-moi
          <code>0</code> à la place.</li>
        </ul>
        <p><code>.get()</code> est l’outil de tous les jours : il transforme un plantage
        possible en valeur par défaut raisonnable.</p>
        <p>Pour supprimer : <code>del inventaire["pomme"]</code>.</p>
      `,
      en: `
        <p>A dictionary fills up as you go:</p>
        <pre>inventaire["bouclier"] = 1</pre>
        <p>That single line does <strong>two different things depending on the case</strong>:
        it adds the key if it does not exist, and replaces the value if it does. There is no
        separate "add" instruction.</p>
        <p><strong>The trap:</strong> reading a missing key does not give <code>0</code> or
        <code>None</code> — it <strong>crashes</strong>, with a <code>KeyError</code>. Hence two
        safety nets:</p>
        <ul>
          <li><code>"potion" in inventaire</code> — does the key exist? (the test looks at
          <strong>keys</strong>, never at values);</li>
          <li><code>inventaire.get("potion", 0)</code> — read it, and if it is missing, give me
          <code>0</code> instead.</li>
        </ul>
        <p><code>.get()</code> is the everyday tool: it turns a possible crash into a sensible
        default value.</p>
        <p>To delete: <code>del inventaire["pomme"]</code>.</p>
      `,
    },
    exemple: {
      code:
        'inventaire = {"pomme": 3, "épée": 1}\n\ninventaire["bouclier"] = 1     # ajoute\ninventaire["pomme"] = 5        # remplace\nprint(inventaire)\n\nprint(inventaire.get("potion", 0))\nprint("potion" in inventaire)\n\ndel inventaire["épée"]\nprint(inventaire)',
      note: {
        fr: 'Remplace <code>.get("potion", 0)</code> par <code>["potion"]</code> pour voir le KeyError.',
        en: 'Replace <code>.get("potion", 0)</code> with <code>["potion"]</code> to see the KeyError.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Ton inventaire contient déjà des pommes et une épée. Fais trois choses :</p>
             <ol>
               <li>ajoute un <code>"bouclier"</code> en 1 exemplaire ;</li>
               <li>passe les pommes à <code>5</code> ;</li>
               <li>affiche le nombre de potions <strong>sans planter</strong> — tu n’en as
               aucune.</li>
             </ol>
             <pre>Pommes : 5
Potions : 0
Objets différents : 3</pre>`,
        en: `<p>Your inventory already holds apples and a sword. Do three things:</p>
             <ol>
               <li>add one <code>"bouclier"</code>;</li>
               <li>set the apples to <code>5</code>;</li>
               <li>display the number of potions <strong>without crashing</strong> — you have
               none.</li>
             </ol>
             <pre>Pommes : 5
Potions : 0
Objets différents : 3</pre>`,
      },
      depart: 'inventaire = {"pomme": 3, "épée": 1}\n\n# Ajoute, modifie, puis affiche les trois lignes\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.get\\s*\\(',
          message: {
            fr: 'Une clé absente fait planter : lis les potions avec <code>.get("potion", 0)</code>.',
            en: 'A missing key crashes: read the potions with <code>.get("potion", 0)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'inventaire\\s*\\[\\s*[\'"]bouclier',
          message: {
            fr: 'Ajoute le bouclier : <code>inventaire["bouclier"] = 1</code>.',
            en: 'Add the shield: <code>inventaire["bouclier"] = 1</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Pommes : 5', en: 'Pommes : 5' } },
        { type: 'sortieContient', valeur: { fr: 'Potions : 0', en: 'Potions : 0' } },
        { type: 'sortieContient', valeur: { fr: 'Objets différents : 3', en: 'Objets différents : 3' } },
      ],
      indices: [
        {
          fr: 'Ajouter et modifier s’écrivent pareil : <code>inventaire["bouclier"] = 1</code>.',
          en: 'Adding and modifying look the same: <code>inventaire["bouclier"] = 1</code>.',
        },
        {
          fr: 'Pour les potions, <code>inventaire.get("potion", 0)</code> rend 0 au lieu de planter.',
          en: 'For the potions, <code>inventaire.get("potion", 0)</code> gives 0 instead of crashing.',
        },
        {
          fr: 'Le nombre d’objets différents, c’est <code>len(inventaire)</code>.',
          en: 'The number of different items is <code>len(inventaire)</code>.',
        },
      ],
      solution:
        'inventaire = {"pomme": 3, "épée": 1}\n\ninventaire["bouclier"] = 1\ninventaire["pomme"] = 5\n\nprint(f"Pommes : {inventaire[\'pomme\']}")\nprint(f"Potions : {inventaire.get(\'potion\', 0)}")\nprint(f"Objets différents : {len(inventaire)}")',
    },
  },

  'py-dic-3': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Parcourir un dictionnaire, clé et valeur ensemble.',
      en: 'Loop through a dictionary, key and value together.',
    },
    explication: {
      fr: `
        <p>Une boucle <code>for</code> sur un dictionnaire ne donne que les
        <strong>clés</strong> — c’est souvent une surprise :</p>
        <pre>for matiere in notes:
    print(matiere)        # maths, français, anglais</pre>
        <p>Pour avoir les deux à la fois, il faut demander <code>.items()</code>, et récupérer
        les deux morceaux par un déballage — exactement celui des tuples :</p>
        <pre>for matiere, note in notes.items():
    print(f"{matiere} : {note}")</pre>
        <p>Trois méthodes à connaître, et elles se lisent toutes seules :</p>
        <ul>
          <li><code>.keys()</code> — les étiquettes</li>
          <li><code>.values()</code> — les valeurs</li>
          <li><code>.items()</code> — les paires</li>
        </ul>
        <p><code>.values()</code> ouvre la porte aux calculs :
        <code>sum(notes.values())</code> additionne toutes les notes, et
        <code>max(notes.values())</code> donne la meilleure.</p>
        <p>Bon à savoir : depuis Python 3.7, un dictionnaire garde
        <strong>l’ordre d’insertion</strong>. Ce que tu ranges en premier ressort en premier.</p>
      `,
      en: `
        <p>A <code>for</code> loop over a dictionary gives only the <strong>keys</strong> —
        often a surprise:</p>
        <pre>for matiere in notes:
    print(matiere)        # maths, français, anglais</pre>
        <p>To get both at once, ask for <code>.items()</code> and collect the two pieces by
        unpacking — exactly like tuples:</p>
        <pre>for matiere, note in notes.items():
    print(f"{matiere} : {note}")</pre>
        <p>Three methods to know, and they read themselves:</p>
        <ul>
          <li><code>.keys()</code> — the labels</li>
          <li><code>.values()</code> — the values</li>
          <li><code>.items()</code> — the pairs</li>
        </ul>
        <p><code>.values()</code> opens the door to calculations:
        <code>sum(notes.values())</code> adds up every mark, and
        <code>max(notes.values())</code> gives the best one.</p>
        <p>Worth knowing: since Python 3.7 a dictionary keeps its <strong>insertion
        order</strong>. What you put in first comes out first.</p>
      `,
    },
    exemple: {
      code:
        'notes = {"maths": 15, "français": 12, "anglais": 17}\n\nfor matiere in notes:\n    print(matiere)\n\nprint("---")\n\nfor matiere, note in notes.items():\n    print(f"{matiere} : {note}")\n\nprint(list(notes.values()))\nprint(sum(notes.values()), max(notes.values()))',
    },
    defi: {
      consigne: {
        fr: `<p>Affiche chaque matière avec sa note, une par ligne, puis la moyenne
             <strong>arrondie à deux décimales</strong> :</p>
             <pre>maths : 15
français : 12
anglais : 17
Moyenne : 14.67</pre>
             <p>Une boucle est obligatoire : trois <code>print</code> recopiés ne comptent pas.</p>`,
        en: `<p>Display each subject with its mark, one per line, then the average
             <strong>rounded to two decimals</strong>:</p>
             <pre>maths : 15
français : 12
anglais : 17
Moyenne : 14.67</pre>
             <p>A loop is required: three copied <code>print</code> lines do not count.</p>`,
      },
      depart: 'notes = {"maths": 15, "français": 12, "anglais": 17}\n\n# Une boucle, puis la moyenne\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.items\\s*\\(',
          message: {
            fr: 'Pour avoir la matière ET la note, parcours <code>notes.items()</code>.',
            en: 'To get the subject AND the mark, loop over <code>notes.items()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.values\\s*\\(',
          message: {
            fr: 'La moyenne se calcule sur <code>notes.values()</code>.',
            en: 'The average is computed over <code>notes.values()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'round\\s*\\(',
          message: {
            fr: 'Arrondis avec <code>round(moyenne, 2)</code>.',
            en: 'Round it with <code>round(moyenne, 2)</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'maths : 15', en: 'maths : 15' } },
        { type: 'sortieContient', valeur: { fr: 'français : 12', en: 'français : 12' } },
        { type: 'sortieContient', valeur: { fr: 'anglais : 17', en: 'anglais : 17' } },
        { type: 'sortieContient', valeur: { fr: 'Moyenne : 14.67', en: 'Moyenne : 14.67' } },
      ],
      indices: [
        {
          fr: 'La boucle : <code>for matiere, note in notes.items():</code>, puis un print indenté.',
          en: 'The loop: <code>for matiere, note in notes.items():</code>, then an indented print.',
        },
        {
          fr: 'La moyenne : <code>sum(notes.values()) / len(notes)</code>.',
          en: 'The average: <code>sum(notes.values()) / len(notes)</code>.',
        },
        {
          fr: 'Puis <code>print(f"Moyenne : {round(moyenne, 2)}")</code>.',
          en: 'Then <code>print(f"Moyenne : {round(moyenne, 2)}")</code>.',
        },
      ],
      solution:
        'notes = {"maths": 15, "français": 12, "anglais": 17}\n\nfor matiere, note in notes.items():\n    print(f"{matiere} : {note}")\n\nmoyenne = sum(notes.values()) / len(notes)\nprint(f"Moyenne : {round(moyenne, 2)}")',
    },
  },

  'py-dic-4': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Assembler un vrai bulletin scolaire : liste, moyenne et meilleure matière.',
      en: 'Build a real report card: listing, average and best subject.',
    },
    explication: {
      fr: `
        <p>Tu as maintenant tout ce qu’il faut pour un programme utile. Un bulletin, c’est trois
        gestes que tu sais faire séparément :</p>
        <ol>
          <li><strong>lister</strong> — une boucle sur <code>.items()</code> ;</li>
          <li><strong>calculer</strong> — <code>sum()</code> et <code>len()</code> ;</li>
          <li><strong>chercher le meilleur</strong> — c’est le seul geste neuf.</li>
        </ol>
        <p>Chercher un maximum suit toujours le même schéma, dans tous les langages :</p>
        <pre>record = -1
meilleure = ""
for matiere, note in notes.items():
    if note > record:
        record = note
        meilleure = matiere</pre>
        <p>On garde deux variables : le record atteint jusqu’ici, et à qui il appartient. À
        chaque tour on compare, et on met à jour <strong>les deux ensemble</strong>. Oublier
        d’en mettre une à jour est l’erreur classique — le nom ne suit plus la note.</p>
        <p>Ce motif — parcourir en retenant le meilleur — te resservira toute ta vie de
        programmeur.</p>
      `,
      en: `
        <p>You now have everything you need for a useful program. A report card is three moves
        you already know separately:</p>
        <ol>
          <li><strong>list</strong> — a loop over <code>.items()</code>;</li>
          <li><strong>compute</strong> — <code>sum()</code> and <code>len()</code>;</li>
          <li><strong>find the best</strong> — the only new move.</li>
        </ol>
        <p>Finding a maximum always follows the same shape, in every language:</p>
        <pre>record = -1
meilleure = ""
for matiere, note in notes.items():
    if note > record:
        record = note
        meilleure = matiere</pre>
        <p>You keep two variables: the best score so far, and who it belongs to. On each turn
        you compare, and you update <strong>both together</strong>. Forgetting to update one is
        the classic bug — the name no longer matches the mark.</p>
        <p>This pattern — walk through, remember the best — will serve you for your whole life
        as a programmer.</p>
      `,
    },
    exemple: {
      code:
        'tailles = {"Louis": 152, "Léa": 161, "Théo": 148}\n\nrecord = -1\nplus_grand = ""\nfor prenom, taille in tailles.items():\n    if taille > record:\n        record = taille\n        plus_grand = prenom\n\nprint(f"Le plus grand est {plus_grand} avec {record} cm")',
    },
    defi: {
      consigne: {
        fr: `<p>Fabrique le bulletin complet de Louis. Il doit afficher, dans cet ordre :</p>
             <pre>Bulletin de Louis
maths : 15
français : 12
anglais : 17
histoire : 14
Moyenne : 14.5
Meilleure matière : anglais</pre>
             <p>La moyenne et la meilleure matière doivent être <strong>trouvées</strong> :
             change une note, et tout doit suivre.</p>`,
        en: `<p>Build Louis's full report card. It must display, in this order:</p>
             <pre>Bulletin de Louis
maths : 15
français : 12
anglais : 17
histoire : 14
Moyenne : 14.5
Meilleure matière : anglais</pre>
             <p>The average and the best subject must be <strong>found</strong>: change a mark,
             and everything must follow.</p>`,
      },
      depart:
        'eleve = "Louis"\nnotes = {"maths": 15, "français": 12, "anglais": 17, "histoire": 14}\n\n# Le titre, la liste, la moyenne, la meilleure matière\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.items\\s*\\(',
          message: {
            fr: 'Parcours le dictionnaire avec <code>.items()</code>.',
            en: 'Loop over the dictionary with <code>.items()</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '[\'"]anglais[\'"]\\s*\\)',
          message: {
            fr: 'La meilleure matière doit être trouvée par une comparaison, pas écrite en dur.',
            en: 'The best subject must be found by a comparison, not hard-coded.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Bulletin de Louis', en: 'Bulletin de Louis' } },
        { type: 'sortieContient', valeur: { fr: 'maths : 15', en: 'maths : 15' } },
        { type: 'sortieContient', valeur: { fr: 'histoire : 14', en: 'histoire : 14' } },
        { type: 'sortieContient', valeur: { fr: 'Moyenne : 14.5', en: 'Moyenne : 14.5' } },
        { type: 'sortieContient', valeur: { fr: 'Meilleure matière : anglais', en: 'Meilleure matière : anglais' } },
      ],
      indices: [
        {
          fr: 'Commence par le titre, puis la boucle <code>for matiere, note in notes.items():</code>.',
          en: 'Start with the title, then the loop <code>for matiere, note in notes.items():</code>.',
        },
        {
          fr: 'La moyenne : <code>sum(notes.values()) / len(notes)</code>.',
          en: 'The average: <code>sum(notes.values()) / len(notes)</code>.',
        },
        {
          fr: 'Pour la meilleure, reprends le schéma de l’exemple : deux variables, une comparaison, deux mises à jour.',
          en: 'For the best one, reuse the example pattern: two variables, one comparison, two updates.',
        },
      ],
      solution:
        'eleve = "Louis"\nnotes = {"maths": 15, "français": 12, "anglais": 17, "histoire": 14}\n\nprint(f"Bulletin de {eleve}")\nfor matiere, note in notes.items():\n    print(f"{matiere} : {note}")\n\nmoyenne = sum(notes.values()) / len(notes)\nprint(f"Moyenne : {moyenne}")\n\nrecord = -1\nmeilleure = ""\nfor matiere, note in notes.items():\n    if note > record:\n        record = note\n        meilleure = matiere\n\nprint(f"Meilleure matière : {meilleure}")',
    },
    projet: { titre: { fr: 'Mon bulletin', en: 'My report card' } },
  },

  /* ==================================================== Les fonctions ===== */

  'py-fn-1': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Faire rendre un résultat à une fonction, au lieu de simplement l’afficher.',
      en: 'Make a function give back a result, instead of just displaying it.',
    },
    explication: {
      fr: `
        <p>Tes premières fonctions affichaient. C’est utile, mais très limité : ce qui est
        affiché est <strong>perdu</strong> — on ne peut pas le réutiliser dans un calcul.</p>
        <p><code>return</code> change tout. Il <strong>renvoie</strong> une valeur à celui qui a
        appelé la fonction :</p>
        <pre>def double(n):
    return n * 2

resultat = double(21)      # 42
print(double(double(5)))   # 20</pre>
        <p>La différence est nette : <code>print</code> parle à l’humain,
        <code>return</code> parle au programme.</p>
        <p>Deux choses à retenir :</p>
        <ul>
          <li><code>return</code> <strong>arrête</strong> la fonction sur-le-champ. Ce qui est
          écrit après ne s’exécute jamais ;</li>
          <li>une fonction sans <code>return</code> renvoie quand même quelque chose :
          <code>None</code>, qui veut dire « rien ». C’est pour ça qu’un
          <code>print(ma_fonction(5))</code> affiche parfois <code>None</code> — la fonction a
          oublié de rendre son résultat.</li>
        </ul>
      `,
      en: `
        <p>Your first functions displayed things. That is useful but very limited: what is
        displayed is <strong>lost</strong> — you cannot reuse it in a calculation.</p>
        <p><code>return</code> changes everything. It <strong>gives back</strong> a value to
        whoever called the function:</p>
        <pre>def double(n):
    return n * 2

resultat = double(21)      # 42
print(double(double(5)))   # 20</pre>
        <p>The difference is sharp: <code>print</code> talks to the human,
        <code>return</code> talks to the program.</p>
        <p>Two things to remember:</p>
        <ul>
          <li><code>return</code> <strong>stops</strong> the function immediately. Anything
          written after it never runs;</li>
          <li>a function with no <code>return</code> still gives something back:
          <code>None</code>, meaning "nothing". That is why
          <code>print(my_function(5))</code> sometimes shows <code>None</code> — the function
          forgot to hand back its result.</li>
        </ul>
      `,
    },
    exemple: {
      code:
        'def double(n):\n    return n * 2\n\ndef aire(largeur, hauteur):\n    return largeur * hauteur\n\nprint(double(21))\nprint(aire(4, 5))\nprint(double(double(5)))\n\n# Une fonction qui oublie return :\ndef sans_return(n):\n    n * 2\n\nprint(sans_return(5))',
      note: {
        fr: 'La dernière ligne affiche <code>None</code> : la fonction a bien calculé, mais n’a rien rendu.',
        en: 'The last line shows <code>None</code>: the function did compute, but handed nothing back.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Écris une fonction <code>aire(largeur, hauteur)</code> qui
             <strong>renvoie</strong> la surface d’une pièce.</p>
             <p>Utilise-la ensuite pour afficher la surface de deux pièces et leur total :</p>
             <pre>Salon : 24
Cuisine : 12
Total : 36</pre>
             <p>Le salon fait 6 sur 4, la cuisine 3 sur 4. Le total doit être
             <strong>calculé</strong> à partir des deux appels.</p>`,
        en: `<p>Write a function <code>aire(largeur, hauteur)</code> that
             <strong>returns</strong> the area of a room.</p>
             <p>Then use it to display the area of two rooms and their total:</p>
             <pre>Salon : 24
Cuisine : 12
Total : 36</pre>
             <p>The living room is 6 by 4, the kitchen 3 by 4. The total must be
             <strong>computed</strong> from the two calls.</p>`,
      },
      depart: '# Définis la fonction aire, puis utilise-la trois fois\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+aire\\s*\\(',
          message: {
            fr: 'Définis la fonction : <code>def aire(largeur, hauteur):</code>.',
            en: 'Define the function: <code>def aire(largeur, hauteur):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\breturn\\b',
          message: {
            fr: 'La fonction doit <strong>rendre</strong> le résultat avec <code>return</code>, pas l’afficher.',
            en: 'The function must <strong>return</strong> the result with <code>return</code>, not print it.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Salon : 24', en: 'Salon : 24' } },
        { type: 'sortieContient', valeur: { fr: 'Cuisine : 12', en: 'Cuisine : 12' } },
        { type: 'sortieContient', valeur: { fr: 'Total : 36', en: 'Total : 36' } },
      ],
      indices: [
        {
          fr: 'La fonction tient en deux lignes : <code>def aire(largeur, hauteur):</code> puis <code>return largeur * hauteur</code>.',
          en: 'The function fits in two lines: <code>def aire(largeur, hauteur):</code> then <code>return largeur * hauteur</code>.',
        },
        {
          fr: 'Range les résultats : <code>salon = aire(6, 4)</code> et <code>cuisine = aire(3, 4)</code>.',
          en: 'Store the results: <code>salon = aire(6, 4)</code> and <code>cuisine = aire(3, 4)</code>.',
        },
        {
          fr: 'Le total est alors <code>salon + cuisine</code>, sans le recalculer à la main.',
          en: 'The total is then <code>salon + cuisine</code>, with no manual recalculation.',
        },
      ],
      solution:
        'def aire(largeur, hauteur):\n    return largeur * hauteur\n\nsalon = aire(6, 4)\ncuisine = aire(3, 4)\n\nprint(f"Salon : {salon}")\nprint(f"Cuisine : {cuisine}")\nprint(f"Total : {salon + cuisine}")',
    },
  },

  'py-fn-2': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Donner une valeur par défaut à un paramètre, et nommer ses arguments.',
      en: 'Give a parameter a default value, and name your arguments.',
    },
    explication: {
      fr: `
        <p>Un paramètre peut avoir une <strong>valeur par défaut</strong>, utilisée quand on ne
        la précise pas :</p>
        <pre>def saluer(prenom, message="Bonjour"):
    return f"{message} {prenom} !"

saluer("Théo")            # Bonjour Théo !
saluer("Marie", "Salut")  # Salut Marie !</pre>
        <p>C’est ce qui permet à une fonction d’être à la fois <strong>simple dans le cas
        courant</strong> et réglable quand il le faut. Tu t’en sers déjà sans le savoir :
        <code>round(3.14159, 2)</code> — le second paramètre a une valeur par défaut.</p>
        <p><strong>Une règle à respecter :</strong> les paramètres avec valeur par défaut se
        mettent <strong>à la fin</strong>. Sinon Python ne saurait plus à quoi rattacher les
        valeurs qu’on lui donne, et refuse le programme.</p>
        <p>On peut aussi <strong>nommer</strong> les arguments à l’appel, dans n’importe quel
        ordre :</p>
        <pre>saluer(message="Coucou", prenom="Léa")</pre>
        <p>Sur une fonction à plusieurs paramètres, c’est bien plus lisible que
        <code>trace(5, 3, True, False)</code>, où plus personne ne sait ce que veut dire le
        troisième.</p>
      `,
      en: `
        <p>A parameter can have a <strong>default value</strong>, used when you do not supply
        it:</p>
        <pre>def saluer(prenom, message="Bonjour"):
    return f"{message} {prenom} !"

saluer("Théo")            # Bonjour Théo !
saluer("Marie", "Salut")  # Salut Marie !</pre>
        <p>This lets a function be both <strong>simple in the common case</strong> and
        adjustable when needed. You already use this without knowing:
        <code>round(3.14159, 2)</code> — the second parameter has a default.</p>
        <p><strong>One rule to respect:</strong> parameters with defaults go
        <strong>at the end</strong>. Otherwise Python could no longer tell which value goes
        where, and rejects the program.</p>
        <p>You can also <strong>name</strong> arguments when calling, in any order:</p>
        <pre>saluer(message="Coucou", prenom="Léa")</pre>
        <p>On a function with several parameters this is far more readable than
        <code>trace(5, 3, True, False)</code>, where nobody remembers what the third one
        means.</p>
      `,
    },
    exemple: {
      code:
        'def saluer(prenom, message="Bonjour"):\n    return f"{message} {prenom} !"\n\nprint(saluer("Théo"))\nprint(saluer("Marie", "Salut"))\nprint(saluer(message="Coucou", prenom="Léa"))\n\ndef prix(base, remise=0):\n    return base - base * remise / 100\n\nprint(prix(100))\nprint(prix(100, 20))',
    },
    defi: {
      consigne: {
        fr: `<p>Écris une fonction <code>fiche(nom, ville="Lyon")</code> qui
             <strong>renvoie</strong> une phrase de présentation.</p>
             <p>Appelle-la deux fois pour obtenir exactement :</p>
             <pre>Louis habite à Lyon.
Léa habite à Paris.</pre>
             <p>Le premier appel ne doit <strong>pas</strong> préciser la ville.</p>`,
        en: `<p>Write a function <code>fiche(nom, ville="Lyon")</code> that
             <strong>returns</strong> an introduction sentence.</p>
             <p>Call it twice to get exactly:</p>
             <pre>Louis habite à Lyon.
Léa habite à Paris.</pre>
             <p>The first call must <strong>not</strong> specify the city.</p>`,
      },
      depart: '# Définis fiche() avec une ville par défaut, puis appelle-la deux fois\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+fiche\\s*\\([^)]*ville\\s*=\\s*[\'"]Lyon[\'"]',
          message: {
            fr: 'La ville doit avoir une valeur par défaut : <code>def fiche(nom, ville="Lyon"):</code>.',
            en: 'The city needs a default value: <code>def fiche(nom, ville="Lyon"):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'fiche\\s*\\(\\s*[\'"]Louis[\'"]\\s*\\)',
          message: {
            fr: 'Le premier appel ne précise pas la ville : <code>fiche("Louis")</code>.',
            en: 'The first call does not give the city: <code>fiche("Louis")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\breturn\\b',
          message: {
            fr: 'La fonction doit renvoyer la phrase, pas l’afficher elle-même.',
            en: 'The function must return the sentence, not print it itself.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'Louis habite à Lyon.\nLéa habite à Paris.', en: 'Louis habite à Lyon.\nLéa habite à Paris.' } },
      ],
      indices: [
        {
          fr: 'La valeur par défaut s’écrit dans la définition : <code>def fiche(nom, ville="Lyon"):</code>.',
          en: 'The default value is written in the definition: <code>def fiche(nom, ville="Lyon"):</code>.',
        },
        {
          fr: 'Le corps renvoie un f-string : <code>return f"{nom} habite à {ville}."</code>.',
          en: 'The body returns an f-string: <code>return f"{nom} habite à {ville}."</code>.',
        },
        {
          fr: 'Puis <code>print(fiche("Louis"))</code> et <code>print(fiche("Léa", "Paris"))</code>.',
          en: 'Then <code>print(fiche("Louis"))</code> and <code>print(fiche("Léa", "Paris"))</code>.',
        },
      ],
      solution:
        'def fiche(nom, ville="Lyon"):\n    return f"{nom} habite à {ville}."\n\nprint(fiche("Louis"))\nprint(fiche("Léa", "Paris"))',
    },
  },
};
