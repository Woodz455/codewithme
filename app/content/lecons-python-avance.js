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

  /* ====================================================== Les modules ===== */

  'py-mod-1': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Utiliser les outils déjà livrés avec Python.',
      en: 'Use the tools that already ship with Python.',
    },
    explication: {
      fr: `
        <p>Python arrive avec des centaines d’outils tout faits, rangés dans des
        <strong>modules</strong>. On ne les charge pas tous au démarrage — ce serait du
        gaspillage. On demande ceux dont on a besoin :</p>
        <pre>import math
print(math.sqrt(16))     # 4.0</pre>
        <p>Une fois importé, on écrit le nom du module, un point, puis l’outil voulu. Ce point
        n’est pas décoratif : il dit d’où vient la fonction, et évite que deux modules qui ont
        chacun un <code>random</code> se marchent dessus.</p>
        <p>Trois modules que tu utiliseras tout le temps :</p>
        <ul>
          <li><code>math</code> — <code>sqrt</code> (racine carrée), <code>floor</code>,
          <code>ceil</code>, <code>pi</code> ;</li>
          <li><code>random</code> — <code>randint(1, 6)</code> pour un dé,
          <code>choice(liste)</code> pour tirer au sort, <code>shuffle</code> pour
          mélanger ;</li>
          <li><code>datetime</code> — les dates, que tu verras bientôt.</li>
        </ul>
        <p>Cette collection s’appelle la <strong>bibliothèque standard</strong>. C’est une des
        grandes forces de Python : beaucoup de choses sont déjà là, sans rien installer.</p>
      `,
      en: `
        <p>Python ships with hundreds of ready-made tools, stored in <strong>modules</strong>.
        They are not all loaded at start-up — that would be wasteful. You ask for the ones you
        need:</p>
        <pre>import math
print(math.sqrt(16))     # 4.0</pre>
        <p>Once imported, you write the module name, a dot, then the tool you want. That dot is
        not decorative: it says where the function comes from, and stops two modules that each
        have a <code>random</code> from clashing.</p>
        <p>Three modules you will use constantly:</p>
        <ul>
          <li><code>math</code> — <code>sqrt</code> (square root), <code>floor</code>,
          <code>ceil</code>, <code>pi</code>;</li>
          <li><code>random</code> — <code>randint(1, 6)</code> for a die,
          <code>choice(liste)</code> to draw at random, <code>shuffle</code> to shuffle;</li>
          <li><code>datetime</code> — dates, which you will see soon.</li>
        </ul>
        <p>This collection is called the <strong>standard library</strong>. It is one of
        Python's great strengths: a lot is already there, with nothing to install.</p>
      `,
    },
    exemple: {
      code:
        'import math\nimport random\n\nprint(math.sqrt(16))\nprint(math.floor(3.7), math.ceil(3.2))\nprint(round(math.pi, 4))\n\nrandom.seed(1)\nprint(random.randint(1, 6))\nprint(random.choice(["pierre", "feuille", "ciseaux"]))',
      note: {
        fr: '<code>random.seed(1)</code> fige le hasard : sans lui, l’exemple donnerait un résultat différent à chaque fois.',
        en: '<code>random.seed(1)</code> freezes randomness: without it the example would give a different result every time.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Une pièce carrée a une surface de <strong>36 m²</strong>. Utilise le module
             <code>math</code> pour trouver la longueur d’un côté, puis affiche :</p>
             <pre>Un côté mesure 6.0 m
Périmètre : 24.0 m</pre>
             <p>La racine carrée doit venir de <code>math</code>, pas d’un calcul deviné.</p>`,
        en: `<p>A square room has an area of <strong>36 m²</strong>. Use the <code>math</code>
             module to find the length of one side, then display:</p>
             <pre>Un côté mesure 6.0 m
Périmètre : 24.0 m</pre>
             <p>The square root must come from <code>math</code>, not from a guessed
             calculation.</p>`,
      },
      depart: 'surface = 36\n\n# Importe math, trouve le côté, puis le périmètre\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'import\\s+math',
          message: {
            fr: 'Il faut d’abord importer le module : <code>import math</code>.',
            en: 'You must import the module first: <code>import math</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'sqrt\\s*\\(',
          message: {
            fr: 'La racine carrée, c’est <code>math.sqrt()</code>.',
            en: 'The square root is <code>math.sqrt()</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Un côté mesure 6.0 m', en: 'Un côté mesure 6.0 m' } },
        { type: 'sortieContient', valeur: { fr: 'Périmètre : 24.0 m', en: 'Périmètre : 24.0 m' } },
      ],
      indices: [
        {
          fr: 'La première ligne du programme : <code>import math</code>.',
          en: 'The first line of the program: <code>import math</code>.',
        },
        {
          fr: 'Le côté : <code>cote = math.sqrt(surface)</code>.',
          en: 'The side: <code>cote = math.sqrt(surface)</code>.',
        },
        {
          fr: 'Le périmètre d’un carré, c’est <code>cote * 4</code>.',
          en: 'The perimeter of a square is <code>cote * 4</code>.',
        },
      ],
      solution:
        'import math\n\nsurface = 36\ncote = math.sqrt(surface)\n\nprint(f"Un côté mesure {cote} m")\nprint(f"Périmètre : {cote * 4} m")',
    },
  },

  'py-mod-2': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Choisir la bonne forme d’import, et savoir laquelle éviter.',
      en: 'Choose the right form of import, and know which one to avoid.',
    },
    explication: {
      fr: `
        <p>Il y a trois façons d’importer, et elles ne se valent pas.</p>
        <p><strong>1. Le module entier</strong> — la plus sûre :</p>
        <pre>import math
math.sqrt(16)</pre>
        <p><strong>2. Quelques noms précis</strong> — plus court à écrire :</p>
        <pre>from math import sqrt, pi
sqrt(16)</pre>
        <p><strong>3. Sous un autre nom</strong> — quand le nom est long :</p>
        <pre>import statistics as stat
stat.mean([1, 2, 3])</pre>
        <p>Il en existe une quatrième, <code>from math import *</code>, qui importe
        <strong>tout</strong> d’un coup. <strong>Ne l’utilise pas.</strong> Elle déverse des
        dizaines de noms dans ton programme sans que tu saches lesquels ; le jour où l’un
        d’eux écrase une de tes variables, l’erreur est presque introuvable.</p>
        <p>La bonne habitude : <code>import module</code> par défaut, et
        <code>from module import nom</code> quand tu n’as besoin que d’une ou deux choses et
        que tu les répètes souvent.</p>
      `,
      en: `
        <p>There are three ways to import, and they are not equal.</p>
        <p><strong>1. The whole module</strong> — the safest:</p>
        <pre>import math
math.sqrt(16)</pre>
        <p><strong>2. A few specific names</strong> — shorter to write:</p>
        <pre>from math import sqrt, pi
sqrt(16)</pre>
        <p><strong>3. Under another name</strong> — when the name is long:</p>
        <pre>import statistics as stat
stat.mean([1, 2, 3])</pre>
        <p>There is a fourth one, <code>from math import *</code>, which imports
        <strong>everything</strong> at once. <strong>Do not use it.</strong> It dumps dozens of
        names into your program without you knowing which; the day one of them overwrites one
        of your variables, the bug is nearly impossible to find.</p>
        <p>The good habit: <code>import module</code> by default, and
        <code>from module import name</code> when you only need one or two things and repeat
        them often.</p>
      `,
    },
    exemple: {
      code:
        'import math\nfrom math import sqrt, pi\nimport statistics as stat\n\nprint(math.sqrt(25))\nprint(sqrt(25))\nprint(round(pi, 2))\nprint(stat.mean([10, 20, 30]))\n\n# Le nom du module reste accessible dans les deux premiers cas :\nprint(math.floor(pi))',
    },
    defi: {
      consigne: {
        fr: `<p>Importe <strong>uniquement</strong> <code>sqrt</code> et <code>pi</code> depuis
             <code>math</code>, avec la forme <code>from … import …</code>, puis affiche l’aire
             d’un disque de rayon 3 et la racine de 81 :</p>
             <pre>Aire du disque : 28.27
Racine de 81 : 9.0</pre>
             <p>L’aire d’un disque, c’est <code>pi × rayon²</code>, arrondie à deux décimales.</p>`,
        en: `<p>Import <strong>only</strong> <code>sqrt</code> and <code>pi</code> from
             <code>math</code>, using the <code>from … import …</code> form, then display the
             area of a circle of radius 3 and the square root of 81:</p>
             <pre>Aire du disque : 28.27
Racine de 81 : 9.0</pre>
             <p>The area of a circle is <code>pi × radius²</code>, rounded to two decimals.</p>`,
      },
      depart: 'rayon = 3\n\n# Importe sqrt et pi, puis calcule\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'from\\s+math\\s+import',
          message: {
            fr: 'Utilise la deuxième forme : <code>from math import sqrt, pi</code>.',
            en: 'Use the second form: <code>from math import sqrt, pi</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'import\\s+\\*',
          message: {
            fr: 'Pas d’import global : nomme précisément ce dont tu as besoin.',
            en: 'No star import: name precisely what you need.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'math\\s*\\.',
          message: {
            fr: 'Avec <code>from … import …</code>, on écrit <code>sqrt(81)</code> sans <code>math.</code> devant.',
            en: 'With <code>from … import …</code>, you write <code>sqrt(81)</code> with no <code>math.</code> in front.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Aire du disque : 28.27', en: 'Aire du disque : 28.27' } },
        { type: 'sortieContient', valeur: { fr: 'Racine de 81 : 9.0', en: 'Racine de 81 : 9.0' } },
      ],
      indices: [
        {
          fr: 'La première ligne : <code>from math import sqrt, pi</code>.',
          en: 'The first line: <code>from math import sqrt, pi</code>.',
        },
        {
          fr: 'L’aire : <code>pi * rayon ** 2</code>, à passer dans <code>round(…, 2)</code>.',
          en: 'The area: <code>pi * rayon ** 2</code>, passed through <code>round(…, 2)</code>.',
        },
        {
          fr: 'Comme les noms sont importés directement, écris <code>sqrt(81)</code>, sans préfixe.',
          en: 'Since the names are imported directly, write <code>sqrt(81)</code>, with no prefix.',
        },
      ],
      solution:
        'from math import sqrt, pi\n\nrayon = 3\naire = pi * rayon ** 2\n\nprint(f"Aire du disque : {round(aire, 2)}")\nprint(f"Racine de 81 : {sqrt(81)}")',
    },
  },

  'py-mod-3': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Écrire son propre module et l’importer dans son programme.',
      en: 'Write your own module and import it into your program.',
    },
    explication: {
      fr: `
        <p>Un module n’a rien de magique : <strong>c’est un fichier <code>.py</code></strong>.
        Le tien en est un. Si tu écris tes fonctions dans <code>outils.py</code>, tu peux les
        importer ailleurs avec <code>import outils</code>.</p>
        <p>Le nom du module, c’est le nom du fichier <strong>sans le <code>.py</code></strong>.
        Voilà pourquoi on ne nomme jamais un fichier <code>math.py</code> : Python irait
        chercher le tien à la place du vrai.</p>
        <p>Ici, on va créer le fichier depuis le programme lui-même, avec <code>open()</code> —
        que tu reverras en détail plus loin :</p>
        <pre>with open("outils.py", "w") as f:
    f.write("def double(n):\\n    return n * 2\\n")

import outils
print(outils.double(21))</pre>
        <p>C’est exactement ce que fait un vrai projet : plusieurs fichiers, chacun avec son
        rôle, qui s’appellent entre eux. Découper son code en modules est ce qui permet de
        retrouver quelque chose dans un programme de dix mille lignes.</p>
        <p>Note le <code>\\n</code> dans le texte écrit : c’est un retour à la ligne. Sans lui,
        tout le code du module tiendrait sur une seule ligne et ne fonctionnerait pas.</p>
      `,
      en: `
        <p>A module is nothing magical: <strong>it is a <code>.py</code> file</strong>. Yours is
        one. If you write your functions in <code>outils.py</code>, you can import them
        elsewhere with <code>import outils</code>.</p>
        <p>The module name is the file name <strong>without the <code>.py</code></strong>. That
        is why you never name a file <code>math.py</code>: Python would pick yours instead of
        the real one.</p>
        <p>Here we will create the file from the program itself, using <code>open()</code> —
        which you will meet in detail later:</p>
        <pre>with open("outils.py", "w") as f:
    f.write("def double(n):\\n    return n * 2\\n")

import outils
print(outils.double(21))</pre>
        <p>This is exactly what a real project does: several files, each with its role, calling
        each other. Splitting code into modules is what lets you find anything in a
        ten-thousand-line program.</p>
        <p>Notice the <code>\\n</code> inside the written text: it is a line break. Without it,
        the whole module code would sit on one line and would not work.</p>
      `,
    },
    exemple: {
      code:
        'with open("mesoutils.py", "w") as fichier:\n    fichier.write("def double(n):\\n    return n * 2\\n")\n    fichier.write("\\n")\n    fichier.write("MESSAGE = \\"Salut depuis le module !\\"\\n")\n\nimport mesoutils\n\nprint(mesoutils.double(21))\nprint(mesoutils.MESSAGE)',
      note: {
        fr: 'Un module peut contenir des fonctions ET des valeurs, comme <code>math.pi</code>.',
        en: 'A module can hold functions AND values, just like <code>math.pi</code>.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Crée un module <code>geometrie.py</code> qui contient une fonction
             <code>perimetre(cote)</code> renvoyant <code>cote * 4</code>.</p>
             <p>Puis importe-le et affiche :</p>
             <pre>Périmètre : 20</pre>
             <p>La fonction doit vraiment vivre dans le module : c’est
             <code>geometrie.perimetre(5)</code> qui doit être appelé.</p>`,
        en: `<p>Create a module <code>geometrie.py</code> holding a function
             <code>perimetre(cote)</code> that returns <code>cote * 4</code>.</p>
             <p>Then import it and display:</p>
             <pre>Périmètre : 20</pre>
             <p>The function must really live in the module: it is
             <code>geometrie.perimetre(5)</code> that must be called.</p>`,
      },
      depart: '# Écris le fichier geometrie.py, importe-le, puis utilise-le\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'open\\s*\\(\\s*[\'"]geometrie\\.py',
          message: {
            fr: 'Crée le fichier : <code>open("geometrie.py", "w")</code>.',
            en: 'Create the file: <code>open("geometrie.py", "w")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'import\\s+geometrie',
          message: {
            fr: 'Importe ton module : <code>import geometrie</code>.',
            en: 'Import your module: <code>import geometrie</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'geometrie\\s*\\.\\s*perimetre',
          message: {
            fr: 'Appelle la fonction à travers le module : <code>geometrie.perimetre(5)</code>.',
            en: 'Call the function through the module: <code>geometrie.perimetre(5)</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Périmètre : 20', en: 'Périmètre : 20' } },
      ],
      indices: [
        {
          fr: 'Ouvre le fichier en écriture : <code>with open("geometrie.py", "w") as f:</code>.',
          en: 'Open the file for writing: <code>with open("geometrie.py", "w") as f:</code>.',
        },
        {
          fr: 'Écris le code du module en une chaîne : <code>f.write("def perimetre(cote):\\n    return cote * 4\\n")</code>.',
          en: 'Write the module code as one string: <code>f.write("def perimetre(cote):\\n    return cote * 4\\n")</code>.',
        },
        {
          fr: 'Ensuite <code>import geometrie</code>, puis <code>print(f"Périmètre : {geometrie.perimetre(5)}")</code>.',
          en: 'Then <code>import geometrie</code>, then <code>print(f"Périmètre : {geometrie.perimetre(5)}")</code>.',
        },
      ],
      solution:
        'with open("geometrie.py", "w") as fichier:\n    fichier.write("def perimetre(cote):\\n    return cote * 4\\n")\n\nimport geometrie\n\nprint(f"Périmètre : {geometrie.perimetre(5)}")',
    },
  },

  /* ================================================= Les comprehensions === */

  'py-comp-1': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Fabriquer une liste en une seule ligne, à partir d’une autre.',
      en: 'Build a list in a single line, from another one.',
    },
    explication: {
      fr: `
        <p>Voici un motif que tu écris déjà souvent : partir d’une liste, transformer chaque
        élément, ranger le résultat.</p>
        <pre>carres = []
for n in range(1, 6):
    carres.append(n * n)</pre>
        <p>Python offre une écriture directe pour ces trois lignes — la
        <strong>compréhension de liste</strong> :</p>
        <pre>carres = [n * n for n in range(1, 6)]</pre>
        <p>Ça se lit de droite à gauche pour comprendre, mais de gauche à droite pour l’écrire :
        <em>« ce que je veux garder </em><code>n * n</code><em>, pour chaque </em><code>n</code>
        <em> dans </em><code>range(1, 6)</code><em> »</em>.</p>
        <p>Les crochets ne sont pas décoratifs : ils annoncent qu’on fabrique une
        <strong>liste</strong>. Le résultat est une vraie liste, avec tout ce que tu sais déjà
        faire dessus.</p>
        <p><strong>Un conseil qui compte :</strong> la compréhension est faite pour les
        transformations <em>courtes</em>. Dès qu’elle ne tient plus confortablement sur une
        ligne, la boucle classique redevient plus lisible. Le but est de se comprendre, pas
        d’écrire court.</p>
      `,
      en: `
        <p>Here is a pattern you already write often: start from a list, transform every item,
        store the result.</p>
        <pre>carres = []
for n in range(1, 6):
    carres.append(n * n)</pre>
        <p>Python offers a direct way to write those three lines — the
        <strong>list comprehension</strong>:</p>
        <pre>carres = [n * n for n in range(1, 6)]</pre>
        <p>Read it right to left to understand it, left to right to write it:
        <em>"what I want to keep, </em><code>n * n</code><em>, for each </em><code>n</code>
        <em> in </em><code>range(1, 6)</code><em>"</em>.</p>
        <p>The square brackets are not decorative: they announce that you are building a
        <strong>list</strong>. The result is a real list, with everything you already know how
        to do to it.</p>
        <p><strong>Advice that matters:</strong> comprehensions are for <em>short</em>
        transformations. As soon as one no longer fits comfortably on a line, the classic loop
        becomes more readable again. The goal is to be understood, not to write short.</p>
      `,
    },
    exemple: {
      code:
        'carres = [n * n for n in range(1, 6)]\nprint(carres)\n\nmots = ["chat", "chien", "souris"]\nmajuscules = [m.upper() for m in mots]\nlongueurs = [len(m) for m in mots]\n\nprint(majuscules)\nprint(longueurs)\n\n# La version longue, pour comparer :\nautre = []\nfor m in mots:\n    autre.append(m.upper())\nprint(autre == majuscules)',
    },
    defi: {
      consigne: {
        fr: `<p>À partir de la liste de prix hors taxes, fabrique <strong>en une seule
             ligne</strong> la liste des prix doublés.</p>
             <pre>[10, 25, 8, 40]
[20, 50, 16, 80]</pre>
             <p>Une compréhension est obligatoire : pas de <code>append</code>.</p>`,
        en: `<p>From the list of prices, build <strong>in a single line</strong> the list of
             doubled prices.</p>
             <pre>[10, 25, 8, 40]
[20, 50, 16, 80]</pre>
             <p>A comprehension is required: no <code>append</code>.</p>`,
      },
      depart: 'prix = [10, 25, 8, 40]\nprint(prix)\n\n# Fabrique la liste doubles en une ligne\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\[[^\\]]*\\bfor\\b[^\\]]*\\]',
          message: {
            fr: 'Écris une compréhension : <code>[… for … in …]</code>, entre crochets.',
            en: 'Write a comprehension: <code>[… for … in …]</code>, inside square brackets.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\.append\\s*\\(',
          message: {
            fr: 'Ici, pas de <code>append</code> : c’est tout l’intérêt de la compréhension.',
            en: 'No <code>append</code> here: that is the whole point of a comprehension.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '[20, 50, 16, 80]', en: '[20, 50, 16, 80]' } },
      ],
      indices: [
        {
          fr: 'La forme est <code>[expression for element in liste]</code>.',
          en: 'The shape is <code>[expression for item in list]</code>.',
        },
        {
          fr: 'Ici l’expression est <code>p * 2</code> et l’élément <code>p</code>.',
          en: 'Here the expression is <code>p * 2</code> and the item is <code>p</code>.',
        },
        {
          fr: '<code>doubles = [p * 2 for p in prix]</code>, puis <code>print(doubles)</code>.',
          en: '<code>doubles = [p * 2 for p in prix]</code>, then <code>print(doubles)</code>.',
        },
      ],
      solution: 'prix = [10, 25, 8, 40]\nprint(prix)\n\ndoubles = [p * 2 for p in prix]\nprint(doubles)',
    },
  },

  'py-comp-2': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Filtrer pendant qu’on transforme, avec un if dans la compréhension.',
      en: 'Filter while transforming, with an if inside the comprehension.',
    },
    explication: {
      fr: `
        <p>Une compréhension peut aussi <strong>trier le grain de l’ivraie</strong>. Il suffit
        d’ajouter un <code>if</code> à la fin :</p>
        <pre>pairs = [n for n in range(10) if n % 2 == 0]
# [0, 2, 4, 6, 8]</pre>
        <p>Ce <code>if</code> décide de ce qui <strong>entre</strong> dans la liste. Ce qui ne
        passe pas le test est simplement ignoré — la liste résultante est donc souvent plus
        courte que celle de départ.</p>
        <p>On peut évidemment filtrer <em>et</em> transformer dans la même ligne :</p>
        <pre>[m.upper() for m in mots if len(m) > 3]</pre>
        <p>Là, il faut lire dans l’ordre d’exécution : pour chaque mot, <em>si</em> il est
        assez long, <em>alors</em> mets sa version en majuscules dans la liste.</p>
        <p>Attention à ne pas confondre avec l’autre <code>if</code>, celui qui choisit une
        valeur : <code>["pair" if n % 2 == 0 else "impair" for n in nombres]</code>. Celui-là
        se place <strong>avant</strong> le <code>for</code> et garde tous les éléments ; le
        filtre se place <strong>après</strong> et en supprime. La position change tout.</p>
      `,
      en: `
        <p>A comprehension can also <strong>separate the wheat from the chaff</strong>. Just add
        an <code>if</code> at the end:</p>
        <pre>pairs = [n for n in range(10) if n % 2 == 0]
# [0, 2, 4, 6, 8]</pre>
        <p>That <code>if</code> decides what <strong>gets into</strong> the list. Anything
        failing the test is simply skipped — so the resulting list is often shorter than the
        starting one.</p>
        <p>You can of course filter <em>and</em> transform on the same line:</p>
        <pre>[m.upper() for m in mots if len(m) > 3]</pre>
        <p>Read that in running order: for each word, <em>if</em> it is long enough,
        <em>then</em> put its uppercase version into the list.</p>
        <p>Do not confuse it with the other <code>if</code>, the one that picks a value:
        <code>["pair" if n % 2 == 0 else "impair" for n in nombres]</code>. That one goes
        <strong>before</strong> the <code>for</code> and keeps every item; the filter goes
        <strong>after</strong> and removes some. Position changes everything.</p>
      `,
    },
    exemple: {
      code:
        'nombres = list(range(1, 21))\n\nmultiples = [n for n in nombres if n % 3 == 0]\nprint(multiples)\n\nmots = ["chat", "chien", "souris", "rat"]\nprint([m.upper() for m in mots if len(m) > 3])\n\n# L\'autre if, celui qui choisit une valeur :\nprint(["pair" if n % 2 == 0 else "impair" for n in range(1, 6)])',
    },
    defi: {
      consigne: {
        fr: `<p>Sur les notes d’un contrôle, garde <strong>uniquement celles au-dessus de
             10</strong>, puis affiche-les et compte-les :</p>
             <pre>Reçus : [15, 12, 17, 11]
Nombre de reçus : 4</pre>
             <p>Une seule compréhension avec un <code>if</code>, et aucune boucle
             <code>for</code> écrite sur plusieurs lignes.</p>`,
        en: `<p>From the marks of a test, keep <strong>only those above 10</strong>, then
             display them and count them:</p>
             <pre>Reçus : [15, 12, 17, 11]
Nombre de reçus : 4</pre>
             <p>One single comprehension with an <code>if</code>, and no multi-line
             <code>for</code> loop.</p>`,
      },
      depart: 'notes = [15, 8, 12, 17, 9, 11, 4]\n\n# Garde les notes au-dessus de 10\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\[[^\\]]*\\bfor\\b[^\\]]*\\bif\\b[^\\]]*\\]',
          message: {
            fr: 'Le filtre se place à la fin de la compréhension : <code>[n for n in notes if …]</code>.',
            en: 'The filter goes at the end of the comprehension: <code>[n for n in notes if …]</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\.append\\s*\\(',
          message: {
            fr: 'Pas de <code>append</code> : tout tient dans la compréhension.',
            en: 'No <code>append</code>: everything fits inside the comprehension.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Reçus : [15, 12, 17, 11]', en: 'Reçus : [15, 12, 17, 11]' } },
        { type: 'sortieContient', valeur: { fr: 'Nombre de reçus : 4', en: 'Nombre de reçus : 4' } },
      ],
      indices: [
        {
          fr: 'La forme complète : <code>[n for n in notes if n > 10]</code>.',
          en: 'The full shape: <code>[n for n in notes if n > 10]</code>.',
        },
        {
          fr: 'Range le résultat dans une variable, tu en auras besoin deux fois.',
          en: 'Store the result in a variable, you will need it twice.',
        },
        {
          fr: 'Le compte est <code>len(recus)</code>, pas un nombre écrit à la main.',
          en: 'The count is <code>len(recus)</code>, not a hand-written number.',
        },
      ],
      solution:
        'notes = [15, 8, 12, 17, 9, 11, 4]\n\nrecus = [n for n in notes if n > 10]\n\nprint(f"Reçus : {recus}")\nprint(f"Nombre de reçus : {len(recus)}")',
    },
  },

  'py-comp-3': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Fabriquer un dictionnaire ou un ensemble de la même façon.',
      en: 'Build a dictionary or a set in the same way.',
    },
    explication: {
      fr: `
        <p>Le même mécanisme fabrique aussi des dictionnaires et des ensembles. Ce qui change,
        c’est uniquement <strong>ce qu’on met autour</strong> :</p>
        <ul>
          <li>des crochets <code>[ ]</code> → une <strong>liste</strong> ;</li>
          <li>des accolades avec <code>clé: valeur</code> → un
          <strong>dictionnaire</strong> ;</li>
          <li>des accolades avec une seule valeur → un <strong>ensemble</strong>.</li>
        </ul>
        <pre>{m: len(m) for m in mots}      # {'chat': 4, 'chien': 5}
{len(m) for m in mots}         # {4, 5}</pre>
        <p>La compréhension de dictionnaire est particulièrement utile pour
        <strong>indexer</strong> : partir d’une liste et fabriquer une fiche où l’on retrouve
        chaque chose par son nom.</p>
        <p>Celle d’ensemble, elle, dédoublonne au passage : la deuxième ligne ci-dessus ne rend
        que deux longueurs, même si les mots sont trois.</p>
        <p>Une fois ce mécanisme compris, tu l’as compris pour les trois : c’est le même
        <code>for</code>, le même <code>if</code> facultatif, et seule l’enveloppe change.</p>
      `,
      en: `
        <p>The same mechanism also builds dictionaries and sets. The only thing that changes is
        <strong>what you wrap around it</strong>:</p>
        <ul>
          <li>square brackets <code>[ ]</code> → a <strong>list</strong>;</li>
          <li>curly braces with <code>key: value</code> → a <strong>dictionary</strong>;</li>
          <li>curly braces with a single value → a <strong>set</strong>.</li>
        </ul>
        <pre>{m: len(m) for m in mots}      # {'chat': 4, 'chien': 5}
{len(m) for m in mots}         # {4, 5}</pre>
        <p>Dictionary comprehensions are especially useful to <strong>index</strong>: start from
        a list and build a record where you find each thing by its name.</p>
        <p>Set comprehensions remove duplicates along the way: the second line above gives back
        only two lengths, even though there are three words.</p>
        <p>Once you understand this mechanism you understand all three: the same
        <code>for</code>, the same optional <code>if</code>, and only the wrapper changes.</p>
      `,
    },
    exemple: {
      code:
        'mots = ["chat", "chien", "souris"]\n\nlongueurs = {m: len(m) for m in mots}\nprint(longueurs)\nprint(longueurs["chien"])\n\ntailles_uniques = {len(m) for m in mots}\nprint(sorted(tailles_uniques))\n\ncarres = {n: n * n for n in range(1, 5)}\nprint(carres)',
    },
    defi: {
      consigne: {
        fr: `<p>À partir de la liste de prénoms, fabrique <strong>en une ligne</strong> un
             dictionnaire qui associe chaque prénom à sa longueur, puis affiche-le et interroge-le :</p>
             <pre>{'Louis': 5, 'Léa': 3, 'Alexandre': 9}
Alexandre a 9 lettres</pre>`,
        en: `<p>From the list of first names, build <strong>in one line</strong> a dictionary
             mapping each name to its length, then display it and query it:</p>
             <pre>{'Louis': 5, 'Léa': 3, 'Alexandre': 9}
Alexandre a 9 lettres</pre>`,
      },
      depart: 'prenoms = ["Louis", "Léa", "Alexandre"]\n\n# Fabrique le dictionnaire longueurs en une ligne\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\{[^}]*:[^}]*\\bfor\\b[^}]*\\}',
          message: {
            fr: 'Une compréhension de dictionnaire : <code>{clé: valeur for … in …}</code>.',
            en: 'A dictionary comprehension: <code>{key: value for … in …}</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\.append\\s*\\(',
          message: {
            fr: 'Tout tient dans la compréhension : pas de construction ligne à ligne.',
            en: 'Everything fits in the comprehension: no line-by-line building.',
          },
        },
        {
          type: 'sortieContient',
          valeur: { fr: "{'Louis': 5, 'Léa': 3, 'Alexandre': 9}", en: "{'Louis': 5, 'Léa': 3, 'Alexandre': 9}" },
        },
        { type: 'sortieContient', valeur: { fr: 'Alexandre a 9 lettres', en: 'Alexandre a 9 lettres' } },
      ],
      indices: [
        {
          fr: 'La forme : <code>{p: len(p) for p in prenoms}</code>.',
          en: 'The shape: <code>{p: len(p) for p in prenoms}</code>.',
        },
        {
          fr: 'Avant les deux points va la clé, après va la valeur.',
          en: 'The key goes before the colon, the value after.',
        },
        {
          fr: 'Pour la seconde ligne, lis le dictionnaire : <code>longueurs["Alexandre"]</code>.',
          en: 'For the second line, read the dictionary: <code>longueurs["Alexandre"]</code>.',
        },
      ],
      solution:
        'prenoms = ["Louis", "Léa", "Alexandre"]\n\nlongueurs = {p: len(p) for p in prenoms}\n\nprint(longueurs)\nprint(f"Alexandre a {longueurs[\'Alexandre\']} lettres")',
    },
  },

  /* ======================================= Fonctions d'ordre superieur ==== */

  'py-hof-1': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Ranger une fonction dans une variable, et la passer à une autre fonction.',
      en: 'Store a function in a variable, and pass it to another function.',
    },
    explication: {
      fr: `
        <p>Voici une idée qui surprend, puis qui change tout : en Python, une fonction est
        <strong>une valeur comme une autre</strong>. On peut la ranger dans une variable, la
        mettre dans une liste, la donner à une autre fonction.</p>
        <pre>def double(n):
    return n * 2

operation = double        # sans parenthèses
print(operation(21))      # 42</pre>
        <p><strong>Tout est dans les parenthèses.</strong> <code>double</code> désigne la
        fonction elle-même ; <code>double(5)</code> l’<em>exécute</em> et désigne son résultat.
        Confondre les deux est l’erreur numéro un sur ce sujet.</p>
        <p>Ce qui devient possible : écrire une fonction qui <strong>reçoit une autre
        fonction</strong> en paramètre.</p>
        <pre>def applique(fonction, valeurs):
    return [fonction(v) for v in valeurs]

applique(double, [1, 2, 3])    # [2, 4, 6]</pre>
        <p>On appelle ça une <strong>fonction d’ordre supérieur</strong>. Tu en connais déjà
        une sans le savoir : <code>sorted(liste, key=…)</code> reçoit une fonction qui lui dit
        selon quoi trier.</p>
        <p>L’intérêt : <code>applique</code> ne sait rien de ce qu’elle applique. Elle marchera
        avec n’importe quelle fonction future — c’est du code qu’on n’aura plus à réécrire.</p>
      `,
      en: `
        <p>Here is an idea that surprises, then changes everything: in Python a function is
        <strong>a value like any other</strong>. You can store it in a variable, put it in a
        list, hand it to another function.</p>
        <pre>def double(n):
    return n * 2

operation = double        # no brackets
print(operation(21))      # 42</pre>
        <p><strong>It is all in the brackets.</strong> <code>double</code> names the function
        itself; <code>double(5)</code> <em>runs</em> it and names its result. Confusing the two
        is mistake number one on this topic.</p>
        <p>What becomes possible: writing a function that <strong>receives another
        function</strong> as a parameter.</p>
        <pre>def applique(fonction, valeurs):
    return [fonction(v) for v in valeurs]

applique(double, [1, 2, 3])    # [2, 4, 6]</pre>
        <p>This is called a <strong>higher order function</strong>. You already know one without
        realising: <code>sorted(liste, key=…)</code> takes a function telling it what to sort
        by.</p>
        <p>The point: <code>applique</code> knows nothing about what it applies. It will work
        with any future function — code you will never have to rewrite.</p>
      `,
    },
    exemple: {
      code:
        'def double(n):\n    return n * 2\n\ndef carre(n):\n    return n * n\n\ndef applique(fonction, valeurs):\n    return [fonction(v) for v in valeurs]\n\nprint(applique(double, [1, 2, 3]))\nprint(applique(carre, [1, 2, 3]))\n\n# Une fonction rangée dans une variable :\noperation = double\nprint(operation(21))\n\n# Et même dans une liste :\nfor f in [double, carre]:\n    print(f(5))',
      note: {
        fr: 'Remarque : jamais de parenthèses quand on <em>donne</em> la fonction, seulement quand on l’exécute.',
        en: 'Notice: never any brackets when you <em>hand over</em> the function, only when you run it.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Écris deux choses :</p>
             <ol>
               <li>une fonction <code>triple(n)</code> qui renvoie <code>n * 3</code> ;</li>
               <li>une fonction <code>applique_a_tous(fonction, liste)</code> qui renvoie la
               liste des résultats.</li>
             </ol>
             <p>Puis affiche :</p>
             <pre>[3, 6, 9]</pre>
             <p><code>applique_a_tous</code> ne doit <strong>pas</strong> contenir le mot
             <code>triple</code> : elle doit marcher avec n’importe quelle fonction.</p>`,
        en: `<p>Write two things:</p>
             <ol>
               <li>a function <code>triple(n)</code> returning <code>n * 3</code>;</li>
               <li>a function <code>applique_a_tous(fonction, liste)</code> returning the list
               of results.</li>
             </ol>
             <p>Then display:</p>
             <pre>[3, 6, 9]</pre>
             <p><code>applique_a_tous</code> must <strong>not</strong> contain the word
             <code>triple</code>: it has to work with any function.</p>`,
      },
      depart: '# Définis triple, puis applique_a_tous, puis utilise-les sur [1, 2, 3]\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+applique_a_tous\\s*\\(\\s*fonction\\s*,',
          message: {
            fr: 'La fonction doit recevoir une fonction en premier paramètre : <code>def applique_a_tous(fonction, liste):</code>.',
            en: 'The function must take a function as its first parameter: <code>def applique_a_tous(fonction, liste):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'applique_a_tous\\s*\\(\\s*triple\\s*,',
          message: {
            fr: 'Passe la fonction sans parenthèses : <code>applique_a_tous(triple, [1, 2, 3])</code>.',
            en: 'Pass the function with no brackets: <code>applique_a_tous(triple, [1, 2, 3])</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '[3, 6, 9]', en: '[3, 6, 9]' } },
      ],
      indices: [
        {
          fr: '<code>triple</code> tient en deux lignes, comme les fonctions que tu as déjà écrites.',
          en: '<code>triple</code> fits in two lines, like the functions you have already written.',
        },
        {
          fr: 'Dans <code>applique_a_tous</code>, une compréhension suffit : <code>return [fonction(v) for v in liste]</code>.',
          en: 'Inside <code>applique_a_tous</code>, a comprehension is enough: <code>return [fonction(v) for v in liste]</code>.',
        },
        {
          fr: 'À l’appel, écris <code>triple</code> tout court — avec des parenthèses, tu passerais son résultat.',
          en: 'When calling, write plain <code>triple</code> — with brackets you would pass its result instead.',
        },
      ],
      solution:
        'def triple(n):\n    return n * 3\n\ndef applique_a_tous(fonction, liste):\n    return [fonction(v) for v in liste]\n\nprint(applique_a_tous(triple, [1, 2, 3]))',
    },
  },

  'py-hof-2': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Écrire une fonction minuscule sans lui donner de nom : la lambda.',
      en: 'Write a tiny function without naming it: the lambda.',
    },
    explication: {
      fr: `
        <p>Quand une fonction tient en une expression et ne servira qu’une fois, lui trouver un
        nom est une corvée. Python propose une forme courte, la <strong>lambda</strong> :</p>
        <pre>lambda n: n * 2</pre>
        <p>Ça se lit : « une fonction qui prend <code>n</code> et rend <code>n * 2</code> ».
        Pas de <code>def</code>, pas de nom, pas de <code>return</code> — la valeur après les
        deux points <em>est</em> le résultat.</p>
        <p>Elles vont naturellement avec deux outils intégrés :</p>
        <ul>
          <li><code>map(fonction, liste)</code> — applique la fonction à
          <strong>chaque</strong> élément ;</li>
          <li><code>filter(fonction, liste)</code> — <strong>garde</strong> les éléments pour
          lesquels la fonction dit <code>True</code>.</li>
        </ul>
        <p>Attention : les deux rendent un objet paresseux, qui ne calcule qu’au moment où on
        le lit. Pour voir le résultat, il faut l’envelopper dans <code>list(…)</code>.</p>
        <p><strong>Deux limites à connaître :</strong> une lambda ne contient
        <strong>qu’une seule expression</strong> — ni <code>if</code> sur plusieurs lignes, ni
        boucle. Et en Python, une compréhension fait souvent la même chose plus lisiblement :
        <code>[n * 2 for n in liste]</code> se lit mieux que
        <code>list(map(lambda n: n * 2, liste))</code>. Les lambdas brillent surtout
        <strong>en paramètre</strong>, comme le <code>key=</code> d’un tri.</p>
      `,
      en: `
        <p>When a function fits in one expression and will be used once, finding a name for it
        is a chore. Python offers a short form, the <strong>lambda</strong>:</p>
        <pre>lambda n: n * 2</pre>
        <p>Read it as: "a function that takes <code>n</code> and gives back <code>n * 2</code>".
        No <code>def</code>, no name, no <code>return</code> — the value after the colon
        <em>is</em> the result.</p>
        <p>They pair naturally with two built-in tools:</p>
        <ul>
          <li><code>map(function, list)</code> — applies the function to <strong>every</strong>
          item;</li>
          <li><code>filter(function, list)</code> — <strong>keeps</strong> the items for which
          the function says <code>True</code>.</li>
        </ul>
        <p>Careful: both give back a lazy object that only computes when read. To see the
        result you must wrap it in <code>list(…)</code>.</p>
        <p><strong>Two limits to know:</strong> a lambda holds <strong>one single
        expression</strong> — no multi-line <code>if</code>, no loop. And in Python a
        comprehension often does the same thing more readably:
        <code>[n * 2 for n in liste]</code> reads better than
        <code>list(map(lambda n: n * 2, liste))</code>. Lambdas shine mostly
        <strong>as a parameter</strong>, like the <code>key=</code> of a sort.</p>
      `,
    },
    exemple: {
      code:
        'double = lambda n: n * 2\nprint(double(21))\n\nnombres = [1, 2, 3, 4, 5]\nprint(list(map(lambda n: n * 2, nombres)))\nprint(list(filter(lambda n: n > 2, nombres)))\n\n# Sans le list(), on ne voit pas le résultat :\nprint(map(lambda n: n * 2, nombres))\n\n# La version compréhension, souvent préférable :\nprint([n * 2 for n in nombres])',
      note: {
        fr: 'L’avant-dernière ligne affiche un objet, pas une liste : c’est le piège de <code>map</code>.',
        en: 'The second-to-last line shows an object, not a list: that is the <code>map</code> trap.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Des prix hors taxes doivent passer en TTC (× 1.2). Utilise
             <strong><code>map</code> avec une lambda</strong> pour obtenir :</p>
             <pre>[12.0, 30.0, 9.6, 48.0]</pre>
             <p>N’oublie pas le <code>list()</code> autour, sinon tu afficheras un objet.</p>`,
        en: `<p>Prices must be converted to include tax (× 1.2). Use <strong><code>map</code>
             with a lambda</strong> to get:</p>
             <pre>[12.0, 30.0, 9.6, 48.0]</pre>
             <p>Do not forget the <code>list()</code> around it, or you will display an
             object.</p>`,
      },
      depart: 'prix = [10, 25, 8, 40]\n\n# map + lambda, puis list() pour voir le résultat\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\blambda\\b',
          message: {
            fr: 'Écris la transformation sous forme de lambda : <code>lambda p: p * 1.2</code>.',
            en: 'Write the transformation as a lambda: <code>lambda p: p * 1.2</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bmap\\s*\\(',
          message: {
            fr: 'Applique-la à toute la liste avec <code>map</code>.',
            en: 'Apply it to the whole list with <code>map</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '[12.0, 30.0, 9.6, 48.0]', en: '[12.0, 30.0, 9.6, 48.0]' } },
      ],
      indices: [
        {
          fr: 'La lambda : <code>lambda p: p * 1.2</code>.',
          en: 'The lambda: <code>lambda p: p * 1.2</code>.',
        },
        {
          fr: '<code>map</code> prend la fonction en premier, la liste en second.',
          en: '<code>map</code> takes the function first, the list second.',
        },
        {
          fr: 'Le tout : <code>print(list(map(lambda p: p * 1.2, prix)))</code>.',
          en: 'All together: <code>print(list(map(lambda p: p * 1.2, prix)))</code>.',
        },
      ],
      solution: 'prix = [10, 25, 8, 40]\n\nprint(list(map(lambda p: p * 1.2, prix)))',
    },
  },

  'py-hof-3': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Trier selon le critère que l’on choisit.',
      en: 'Sort by whichever criterion you choose.',
    },
    explication: {
      fr: `
        <p><code>sorted()</code> tout seul trie « naturellement » : les nombres par valeur, les
        textes par ordre alphabétique. Mais que faire pour trier des mots
        <strong>par longueur</strong>, ou des élèves <strong>par note</strong> ?</p>
        <p>On lui donne une fonction, sous le nom <code>key</code>. Elle dit, pour chaque
        élément, <strong>quelle valeur sert à comparer</strong> :</p>
        <pre>sorted(["chien", "rat", "souris"], key=len)
# ['rat', 'chien', 'souris']</pre>
        <p><code>len</code> est passée sans parenthèses : c’est bien la fonction elle-même, et
        <code>sorted</code> l’appellera sur chaque mot.</p>
        <p>Quand le critère n’a pas de fonction toute prête, une lambda fait l’affaire :</p>
        <pre>eleves = [("Louis", 15), ("Léa", 17)]
sorted(eleves, key=lambda e: e[1], reverse=True)</pre>
        <p>Ici chaque élément est un tuple ; <code>e[1]</code> désigne la note.
        <code>reverse=True</code> trie du plus grand au plus petit.</p>
        <p>C’est la fonction d’ordre supérieur la plus utile de toutes : classer un
        tableau de scores, un carnet d’adresses, une liste de fichiers par date — c’est
        toujours <code>sorted</code> avec le bon <code>key</code>.</p>
      `,
      en: `
        <p><code>sorted()</code> on its own sorts "naturally": numbers by value, text
        alphabetically. But how do you sort words <strong>by length</strong>, or pupils
        <strong>by mark</strong>?</p>
        <p>You give it a function, under the name <code>key</code>. It says, for each item,
        <strong>which value to compare on</strong>:</p>
        <pre>sorted(["chien", "rat", "souris"], key=len)
# ['rat', 'chien', 'souris']</pre>
        <p><code>len</code> is passed with no brackets: it really is the function itself, and
        <code>sorted</code> will call it on each word.</p>
        <p>When the criterion has no ready-made function, a lambda does the job:</p>
        <pre>eleves = [("Louis", 15), ("Léa", 17)]
sorted(eleves, key=lambda e: e[1], reverse=True)</pre>
        <p>Here each item is a tuple; <code>e[1]</code> names the mark.
        <code>reverse=True</code> sorts from largest to smallest.</p>
        <p>This is the most useful higher order function of all: ranking a scoreboard, an
        address book, a list of files by date — it is always <code>sorted</code> with the right
        <code>key</code>.</p>
      `,
    },
    exemple: {
      code:
        'mots = ["chien", "rat", "souris"]\nprint(sorted(mots))\nprint(sorted(mots, key=len))\n\neleves = [("Louis", 15), ("Léa", 17), ("Théo", 12)]\nprint(sorted(eleves, key=lambda e: e[1]))\nprint(sorted(eleves, key=lambda e: e[1], reverse=True))\n\n# Trier par le premier élément du tuple, donc par prénom :\nprint(sorted(eleves, key=lambda e: e[0]))',
    },
    defi: {
      consigne: {
        fr: `<p>Voici un tableau de scores, chaque entrée étant un tuple
             <code>(prénom, note)</code>.</p>
             <p>Classe-le de la <strong>meilleure note à la moins bonne</strong>, puis affiche
             une ligne par élève :</p>
             <pre>Marie : 19
Léa : 17
Louis : 15
Théo : 12</pre>`,
        en: `<p>Here is a scoreboard, each entry being a <code>(name, mark)</code> tuple.</p>
             <p>Rank it from the <strong>best mark to the worst</strong>, then display one line
             per pupil:</p>
             <pre>Marie : 19
Léa : 17
Louis : 15
Théo : 12</pre>`,
      },
      depart:
        'eleves = [("Louis", 15), ("Léa", 17), ("Théo", 12), ("Marie", 19)]\n\n# Trie par note décroissante, puis affiche une ligne par élève\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'key\\s*=',
          message: {
            fr: 'Indique le critère de tri avec <code>key=</code>.',
            en: 'Give the sorting criterion with <code>key=</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'reverse\\s*=\\s*True',
          message: {
            fr: 'De la meilleure à la moins bonne : <code>reverse=True</code>.',
            en: 'From best to worst: <code>reverse=True</code>.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: 'Marie : 19\nLéa : 17\nLouis : 15\nThéo : 12', en: 'Marie : 19\nLéa : 17\nLouis : 15\nThéo : 12' } },
      ],
      indices: [
        {
          fr: 'Le critère est la note, c’est-à-dire le second élément : <code>key=lambda e: e[1]</code>.',
          en: 'The criterion is the mark, that is the second item: <code>key=lambda e: e[1]</code>.',
        },
        {
          fr: 'Range le résultat : <code>classement = sorted(eleves, key=lambda e: e[1], reverse=True)</code>.',
          en: 'Store the result: <code>classement = sorted(eleves, key=lambda e: e[1], reverse=True)</code>.',
        },
        {
          fr: 'Puis déballe dans la boucle : <code>for nom, note in classement:</code>.',
          en: 'Then unpack in the loop: <code>for nom, note in classement:</code>.',
        },
      ],
      solution:
        'eleves = [("Louis", 15), ("Léa", 17), ("Théo", 12), ("Marie", 19)]\n\nclassement = sorted(eleves, key=lambda e: e[1], reverse=True)\n\nfor nom, note in classement:\n    print(f"{nom} : {note}")',
    },
  },

  /* ================================================= Types et erreurs ===== */

  'py-err-1': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Connaître le type d’une valeur, et la convertir quand il le faut.',
      en: 'Know the type of a value, and convert it when needed.',
    },
    explication: {
      fr: `
        <p>Chaque valeur en Python a un <strong>type</strong>, et ce type décide de ce qu’on
        peut en faire. <code>type()</code> te le dit :</p>
        <ul>
          <li><code>int</code> — un nombre entier : <code>12</code></li>
          <li><code>float</code> — un nombre à virgule : <code>1.5</code></li>
          <li><code>str</code> — du texte : <code>"12"</code></li>
          <li><code>bool</code> — vrai ou faux : <code>True</code></li>
          <li><code>list</code>, <code>tuple</code>, <code>set</code>, <code>dict</code> — que
          tu connais déjà</li>
        </ul>
        <p><strong>Le point qui compte :</strong> <code>12</code> et <code>"12"</code> ne sont
        pas la même chose. Le premier est un nombre, le second est du texte qui
        <em>ressemble</em> à un nombre. <code>"12" + 1</code> ne marche pas, et
        <code>"12" + "1"</code> donne <code>"121"</code> — pas <code>13</code>.</p>
        <p>D’où les conversions, qu’on écrit comme des fonctions :</p>
        <pre>int("42")      # 42
str(42)        # "42"
float("1.5")   # 1.5
int(3.9)       # 3  — la partie décimale est jetée, pas arrondie</pre>
        <p>Ce dernier point surprend souvent : <code>int(3.9)</code> vaut <code>3</code>. Pour
        arrondir, c’est <code>round()</code>.</p>
        <p>C’est le sujet le plus utile de tous, parce que <code>input()</code> rend
        <strong>toujours</strong> du texte. Chaque fois que tu demandes un nombre, tu convertis.</p>
      `,
      en: `
        <p>Every value in Python has a <strong>type</strong>, and that type decides what you can
        do with it. <code>type()</code> tells you:</p>
        <ul>
          <li><code>int</code> — a whole number: <code>12</code></li>
          <li><code>float</code> — a decimal number: <code>1.5</code></li>
          <li><code>str</code> — text: <code>"12"</code></li>
          <li><code>bool</code> — true or false: <code>True</code></li>
          <li><code>list</code>, <code>tuple</code>, <code>set</code>, <code>dict</code> — which
          you already know</li>
        </ul>
        <p><strong>The point that matters:</strong> <code>12</code> and <code>"12"</code> are
        not the same thing. The first is a number, the second is text that <em>looks</em> like a
        number. <code>"12" + 1</code> does not work, and <code>"12" + "1"</code> gives
        <code>"121"</code> — not <code>13</code>.</p>
        <p>Hence conversions, written like functions:</p>
        <pre>int("42")      # 42
str(42)        # "42"
float("1.5")   # 1.5
int(3.9)       # 3  — the decimal part is dropped, not rounded</pre>
        <p>That last point often surprises: <code>int(3.9)</code> is <code>3</code>. To round,
        use <code>round()</code>.</p>
        <p>This is the most useful topic of all, because <code>input()</code>
        <strong>always</strong> gives back text. Every time you ask for a number, you convert.</p>
      `,
    },
    exemple: {
      code:
        'print(type(12))\nprint(type(1.5))\nprint(type("12"))\nprint(type(True))\nprint(type([1, 2]))\n\nprint("12" + "1")\nprint(int("12") + 1)\nprint(int(3.9), round(3.9))\nprint(str(42) + " ans")',
      note: {
        fr: 'Compare bien les deux premières lignes du second bloc : le même « + » ne fait pas du tout la même chose.',
        en: 'Compare the first two lines of the second block: the same "+" does something completely different.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>La variable <code>saisie</code> contient le texte <code>"42"</code>. Affiche
             exactement :</p>
             <pre>Type de saisie : &lt;class 'str'&gt;
42 + 1 = 43
Type après conversion : &lt;class 'int'&gt;</pre>
             <p>Les types doivent venir de <code>type()</code>, pas être recopiés.</p>`,
        en: `<p>The variable <code>saisie</code> holds the text <code>"42"</code>. Display
             exactly:</p>
             <pre>Type de saisie : &lt;class 'str'&gt;
42 + 1 = 43
Type après conversion : &lt;class 'int'&gt;</pre>
             <p>The types must come from <code>type()</code>, not be copied by hand.</p>`,
      },
      depart: 'saisie = "42"\n\n# Affiche le type, le calcul, puis le type converti\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'type\\s*\\(',
          message: {
            fr: 'Demande le type avec <code>type(saisie)</code>.',
            en: 'Ask for the type with <code>type(saisie)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bint\\s*\\(',
          message: {
            fr: 'Convertis le texte en nombre avec <code>int()</code>.',
            en: 'Convert the text to a number with <code>int()</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'class\\s+',
          message: {
            fr: 'Ne recopie pas « class » : laisse <code>type()</code> l’écrire.',
            en: 'Do not type "class" yourself: let <code>type()</code> write it.',
          },
        },
        { type: 'sortieContient', valeur: { fr: "Type de saisie : <class 'str'>", en: "Type de saisie : <class 'str'>" } },
        { type: 'sortieContient', valeur: { fr: '42 + 1 = 43', en: '42 + 1 = 43' } },
        {
          type: 'sortieContient',
          valeur: { fr: "Type après conversion : <class 'int'>", en: "Type après conversion : <class 'int'>" },
        },
      ],
      indices: [
        {
          fr: 'La première ligne : <code>print(f"Type de saisie : {type(saisie)}")</code>.',
          en: 'The first line: <code>print(f"Type de saisie : {type(saisie)}")</code>.',
        },
        {
          fr: 'Range le nombre : <code>nombre = int(saisie)</code>.',
          en: 'Store the number: <code>nombre = int(saisie)</code>.',
        },
        {
          fr: 'Puis <code>print(f"{nombre} + 1 = {nombre + 1}")</code> et le type de <code>nombre</code>.',
          en: 'Then <code>print(f"{nombre} + 1 = {nombre + 1}")</code> and the type of <code>nombre</code>.',
        },
      ],
      solution:
        'saisie = "42"\nnombre = int(saisie)\n\nprint(f"Type de saisie : {type(saisie)}")\nprint(f"{nombre} + 1 = {nombre + 1}")\nprint(f"Type après conversion : {type(nombre)}")',
    },
  },

  'py-err-2': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Lire un message d’erreur et réparer le programme.',
      en: 'Read an error message and repair the program.',
    },
    explication: {
      fr: `
        <p>Un message d’erreur n’est pas une punition : c’est le seul endroit où l’ordinateur
        t’explique précisément ce qui l’a bloqué. Encore faut-il le lire — et la
        <strong>dernière ligne</strong> est la plus importante.</p>
        <p>Les cinq erreurs que tu rencontreras le plus :</p>
        <ul>
          <li><code>TypeError</code> — deux types incompatibles.
          <em>« can only concatenate str to str »</em> : tu additionnes du texte et un
          nombre ;</li>
          <li><code>ValueError</code> — le bon type, mais une valeur impossible.
          <code>int("douze")</code> ;</li>
          <li><code>NameError</code> — un nom inconnu : faute de frappe, ou variable utilisée
          avant d’exister ;</li>
          <li><code>IndexError</code> — une position hors de la liste ;</li>
          <li><code>KeyError</code> — une clé absente du dictionnaire.</li>
        </ul>
        <p>La méthode qui marche, toujours la même : <strong>lire le nom</strong> de l’erreur
        (il dit la catégorie), <strong>lire le numéro de ligne</strong> (il dit où),
        <strong>lire la phrase</strong> (elle dit quoi). Trois informations, et le plus souvent
        la réparation devient évidente.</p>
        <p>Un programmeur expérimenté ne fait pas moins d’erreurs qu’un débutant. Il les lit
        plus vite.</p>
      `,
      en: `
        <p>An error message is not a punishment: it is the one place where the computer tells
        you exactly what stopped it. You just have to read it — and the <strong>last
        line</strong> is the most important one.</p>
        <p>The five errors you will meet most:</p>
        <ul>
          <li><code>TypeError</code> — two incompatible types.
          <em>"can only concatenate str to str"</em>: you are adding text and a number;</li>
          <li><code>ValueError</code> — right type, impossible value.
          <code>int("douze")</code>;</li>
          <li><code>NameError</code> — an unknown name: a typo, or a variable used before it
          exists;</li>
          <li><code>IndexError</code> — a position outside the list;</li>
          <li><code>KeyError</code> — a key missing from the dictionary.</li>
        </ul>
        <p>The method that works, always the same: <strong>read the name</strong> of the error
        (it gives the category), <strong>read the line number</strong> (it says where),
        <strong>read the sentence</strong> (it says what). Three pieces of information, and most
        of the time the fix becomes obvious.</p>
        <p>An experienced programmer does not make fewer mistakes than a beginner. They read
        them faster.</p>
      `,
    },
    exemple: {
      code: 'age = "12"\nprint("Dans 10 ans tu auras " + age + 10 + " ans")',
      erreurAttendue: true,
      note: {
        fr: 'Lis la dernière ligne : <code>TypeError</code>, et la phrase qui dit qu’on ne peut coller que du texte à du texte.',
        en: 'Read the last line: <code>TypeError</code>, and the sentence saying you can only concatenate text to text.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Le programme ci-contre <strong>plante</strong>. Lance-le, lis l’erreur, puis
             répare-le.</p>
             <p>Il doit demander un âge et afficher :</p>
             <pre>Dans 10 ans tu auras 22 ans</pre>
             <p>(La réponse fournie ici est <code>12</code>.)</p>`,
        en: `<p>The program opposite <strong>crashes</strong>. Run it, read the error, then
             repair it.</p>
             <p>It must ask for an age and display:</p>
             <pre>Dans 10 ans tu auras 22 ans</pre>
             <p>(The answer supplied here is <code>12</code>.)</p>`,
      },
      depart: 'age = input("Ton âge ? ")\nprint("Dans 10 ans tu auras " + age + 10 + " ans")\n',
      entree: '12',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\bint\\s*\\(',
          message: {
            fr: '<code>input()</code> rend du texte : convertis-le avec <code>int()</code>.',
            en: '<code>input()</code> gives back text: convert it with <code>int()</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Dans 10 ans tu auras 22 ans', en: 'Dans 10 ans tu auras 22 ans' } },
      ],
      indices: [
        {
          fr: 'L’erreur est un <code>TypeError</code> : on ne peut pas coller un nombre à du texte avec <code>+</code>.',
          en: 'The error is a <code>TypeError</code>: you cannot glue a number to text with <code>+</code>.',
        },
        {
          fr: 'Convertis dès la saisie : <code>age = int(input("Ton âge ? "))</code>.',
          en: 'Convert straight away: <code>age = int(input("Ton âge ? "))</code>.',
        },
        {
          fr: 'Puis un f-string évite tous les <code>+</code> : <code>print(f"Dans 10 ans tu auras {age + 10} ans")</code>.',
          en: 'Then an f-string avoids every <code>+</code>: <code>print(f"Dans 10 ans tu auras {age + 10} ans")</code>.',
        },
      ],
      solution: 'age = int(input("Ton âge ? "))\nprint(f"Dans 10 ans tu auras {age + 10} ans")',
    },
  },

  'py-err-3': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Attraper une erreur au lieu de laisser le programme s’arrêter.',
      en: 'Catch an error instead of letting the program stop.',
    },
    explication: {
      fr: `
        <p>Certaines erreurs ne sont pas des bugs : elles sont
        <strong>prévisibles</strong>. Si tu demandes un nombre à quelqu’un, il tapera un jour
        « douze ». Ton programme ne doit pas s’écrouler pour autant.</p>
        <pre>try:
    age = int(input("Ton âge ? "))
    print(age + 10)
except ValueError:
    print("Ce n'est pas un nombre.")</pre>
        <p>Le bloc <code>try</code> contient ce qui <em>pourrait</em> mal tourner. Si une erreur
        survient, Python arrête ce bloc et saute dans le <code>except</code> correspondant. Sans
        erreur, le <code>except</code> est simplement ignoré.</p>
        <p><strong>Précise toujours quelle erreur tu attrapes.</strong> Un <code>except:</code>
        tout nu attrape <em>tout</em>, y compris les vrais bugs que tu voulais voir — et tu
        passeras des heures à chercher pourquoi ton programme « ne fait rien ».</p>
        <p>On peut prévoir plusieurs cas :</p>
        <pre>except ValueError:
    …
except ZeroDivisionError:
    …</pre>
        <p>Et pour lire le message au passage : <code>except ValueError as erreur:</code>, puis
        <code>print(erreur)</code>.</p>
      `,
      en: `
        <p>Some errors are not bugs: they are <strong>predictable</strong>. If you ask someone
        for a number, one day they will type "twelve". Your program must not collapse for
        that.</p>
        <pre>try:
    age = int(input("Ton âge ? "))
    print(age + 10)
except ValueError:
    print("Ce n'est pas un nombre.")</pre>
        <p>The <code>try</code> block holds what <em>might</em> go wrong. If an error happens,
        Python stops that block and jumps into the matching <code>except</code>. With no error,
        the <code>except</code> is simply skipped.</p>
        <p><strong>Always say which error you are catching.</strong> A bare
        <code>except:</code> catches <em>everything</em>, including the real bugs you wanted to
        see — and you will spend hours wondering why your program "does nothing".</p>
        <p>You can plan for several cases:</p>
        <pre>except ValueError:
    …
except ZeroDivisionError:
    …</pre>
        <p>And to read the message along the way: <code>except ValueError as erreur:</code>,
        then <code>print(erreur)</code>.</p>
      `,
    },
    exemple: {
      code:
        'def diviser(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "impossible : division par zéro"\n\nprint(diviser(10, 2))\nprint(diviser(10, 0))\n\ntry:\n    nombre = int("douze")\nexcept ValueError as erreur:\n    print("ValueError :", erreur)\n\ntry:\n    print([1, 2][9])\nexcept IndexError:\n    print("Cette position n\'existe pas.")',
    },
    defi: {
      consigne: {
        fr: `<p>Demande un nombre à l’utilisateur et affiche son double.</p>
             <p>Mais si la réponse n’est <strong>pas</strong> un nombre, le programme ne doit
             pas planter : il doit afficher</p>
             <pre>Ce n'est pas un nombre.</pre>
             <p>La réponse fournie ici est justement <code>douze</code>, écrit en toutes
             lettres.</p>`,
        en: `<p>Ask the user for a number and display its double.</p>
             <p>But if the answer is <strong>not</strong> a number, the program must not crash:
             it must display</p>
             <pre>Ce n'est pas un nombre.</pre>
             <p>The answer supplied here is precisely <code>douze</code>, spelled out.</p>`,
      },
      depart: 'nombre = int(input("Un nombre ? "))\nprint(nombre * 2)\n',
      entree: 'douze',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\btry\\s*:',
          message: {
            fr: 'Entoure la partie risquée d’un bloc <code>try:</code>.',
            en: 'Wrap the risky part in a <code>try:</code> block.',
          },
        },
        {
          type: 'codeContient',
          motif: 'except\\s+ValueError',
          message: {
            fr: 'Attrape précisément la bonne erreur : <code>except ValueError:</code>.',
            en: 'Catch precisely the right error: <code>except ValueError:</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: "Ce n'est pas un nombre.", en: "Ce n'est pas un nombre." } },
      ],
      indices: [
        {
          fr: 'Les deux lignes existantes vont dans le <code>try:</code>, indentées.',
          en: 'The two existing lines go inside the <code>try:</code>, indented.',
        },
        {
          fr: 'En dessous, au même niveau que <code>try</code> : <code>except ValueError:</code>.',
          en: 'Below, at the same level as <code>try</code>: <code>except ValueError:</code>.',
        },
        {
          fr: 'Dans le <code>except</code>, un seul <code>print</code> avec le message demandé.',
          en: 'Inside the <code>except</code>, a single <code>print</code> with the requested message.',
        },
      ],
      solution:
        'try:\n    nombre = int(input("Un nombre ? "))\n    print(nombre * 2)\nexcept ValueError:\n    print("Ce n\'est pas un nombre.")',
    },
  },

  'py-err-4': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Signaler soi-même une erreur, et garantir qu’un nettoyage aura lieu.',
      en: 'Raise an error yourself, and guarantee that cleanup happens.',
    },
    explication: {
      fr: `
        <p>Tu sais attraper les erreurs. Tu peux aussi en <strong>lever</strong> toi-même, avec
        <code>raise</code> :</p>
        <pre>if age &lt; 0:
    raise ValueError("un âge ne peut pas être négatif")</pre>
        <p>Pourquoi provoquer une erreur exprès ? Parce qu’une fonction qui reçoit une valeur
        absurde ne doit <strong>pas</strong> faire semblant de travailler. Mieux vaut s’arrêter
        net, avec un message clair, que renvoyer un résultat faux qui se propagera dans tout le
        programme.</p>
        <p>Deux blocs complètent <code>try</code> / <code>except</code> :</p>
        <ul>
          <li><code>else</code> — exécuté <strong>seulement si rien n’a planté</strong> ;</li>
          <li><code>finally</code> — exécuté <strong>dans tous les cas</strong>, erreur ou
          non.</li>
        </ul>
        <p><code>finally</code> sert au nettoyage : fermer un fichier, couper une connexion,
        prévenir l’utilisateur que c’est terminé. Il s’exécute même si le <code>try</code> a
        planté, même s’il contenait un <code>return</code>. C’est sa raison d’être.</p>
        <p>Retiens l’ordre : <code>try</code>, <code>except</code>, <code>else</code>,
        <code>finally</code>. Du plus risqué au plus certain.</p>
      `,
      en: `
        <p>You know how to catch errors. You can also <strong>raise</strong> them yourself, with
        <code>raise</code>:</p>
        <pre>if age &lt; 0:
    raise ValueError("un âge ne peut pas être négatif")</pre>
        <p>Why cause an error on purpose? Because a function receiving an absurd value must
        <strong>not</strong> pretend to work. Better to stop dead, with a clear message, than to
        return a wrong result that will spread through the whole program.</p>
        <p>Two blocks complete <code>try</code> / <code>except</code>:</p>
        <ul>
          <li><code>else</code> — run <strong>only if nothing crashed</strong>;</li>
          <li><code>finally</code> — run <strong>in every case</strong>, error or not.</li>
        </ul>
        <p><code>finally</code> is for cleanup: closing a file, dropping a connection, telling
        the user it is over. It runs even if the <code>try</code> crashed, even if it held a
        <code>return</code>. That is its whole purpose.</p>
        <p>Remember the order: <code>try</code>, <code>except</code>, <code>else</code>,
        <code>finally</code>. From the riskiest to the most certain.</p>
      `,
    },
    exemple: {
      code:
        'def verifier_age(age):\n    if age < 0:\n        raise ValueError("un âge ne peut pas être négatif")\n    return age\n\ntry:\n    print(verifier_age(12))\n    print(verifier_age(-3))\nexcept ValueError as erreur:\n    print("Refusé :", erreur)\nelse:\n    print("Tout s\'est bien passé")\nfinally:\n    print("Vérification terminée.")',
      note: {
        fr: 'Le <code>else</code> ne s’affiche pas ici : une erreur a eu lieu. Le <code>finally</code>, lui, s’affiche toujours.',
        en: 'The <code>else</code> does not show here: an error happened. The <code>finally</code> always shows.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Écris une fonction <code>racine(n)</code> qui <strong>refuse</strong> les nombres
             négatifs en levant une <code>ValueError</code> avec le message
             <code>nombre négatif</code>.</p>
             <p>Appelle-la ensuite sur <code>-9</code> dans un <code>try</code>, attrape
             l’erreur, et termine par un <code>finally</code>. Tu dois obtenir :</p>
             <pre>Refusé : nombre négatif
Calcul terminé.</pre>`,
        en: `<p>Write a function <code>racine(n)</code> that <strong>refuses</strong> negative
             numbers by raising a <code>ValueError</code> with the message
             <code>nombre négatif</code>.</p>
             <p>Then call it on <code>-9</code> inside a <code>try</code>, catch the error, and
             finish with a <code>finally</code>. You must get:</p>
             <pre>Refusé : nombre négatif
Calcul terminé.</pre>`,
      },
      depart: 'import math\n\n# Définis racine(n) qui lève une ValueError si n est négatif\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'raise\\s+ValueError',
          message: {
            fr: 'Lève l’erreur toi-même : <code>raise ValueError("nombre négatif")</code>.',
            en: 'Raise the error yourself: <code>raise ValueError("nombre négatif")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bfinally\\s*:',
          message: {
            fr: 'Le message de fin doit être dans un bloc <code>finally:</code>.',
            en: 'The closing message must be in a <code>finally:</code> block.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Refusé : nombre négatif', en: 'Refusé : nombre négatif' } },
        { type: 'sortieContient', valeur: { fr: 'Calcul terminé.', en: 'Calcul terminé.' } },
      ],
      indices: [
        {
          fr: 'Dans la fonction : <code>if n < 0:</code> puis <code>raise ValueError("nombre négatif")</code>.',
          en: 'Inside the function: <code>if n < 0:</code> then <code>raise ValueError("nombre négatif")</code>.',
        },
        {
          fr: 'Attrape en récupérant le message : <code>except ValueError as erreur:</code>.',
          en: 'Catch it while keeping the message: <code>except ValueError as erreur:</code>.',
        },
        {
          fr: 'Puis <code>print("Refusé :", erreur)</code>, et le <code>finally:</code> pour la dernière ligne.',
          en: 'Then <code>print("Refusé :", erreur)</code>, and the <code>finally:</code> for the last line.',
        },
      ],
      solution:
        'import math\n\ndef racine(n):\n    if n < 0:\n        raise ValueError("nombre négatif")\n    return math.sqrt(n)\n\ntry:\n    print(racine(-9))\nexcept ValueError as erreur:\n    print("Refusé :", erreur)\nfinally:\n    print("Calcul terminé.")',
    },
  },

  /* ======================================================== Les dates ===== */

  'py-date-1': {
    langage: 'python',
    xp: 30,
    objectif: {
      fr: 'Manipuler une vraie date, et en extraire ce qu’on veut.',
      en: 'Handle a real date, and pull out what you need.',
    },
    explication: {
      fr: `
        <p>Une date n’est pas du texte. <code>"14/06/2013"</code> ne sait pas quel jour de la
        semaine c’était, ni combien de jours nous en séparent. Le module
        <code>datetime</code> apporte un vrai type :</p>
        <pre>from datetime import date

naissance = date(2013, 6, 14)</pre>
        <p>L’ordre est toujours <strong>année, mois, jour</strong> — le plus grand d’abord.
        C’est aussi l’ordre de la norme internationale, celle qui permet de trier des dates
        comme du texte sans se tromper.</p>
        <p>Une fois construite, la date répond à des questions :</p>
        <ul>
          <li><code>.year</code>, <code>.month</code>, <code>.day</code> — ses morceaux ;</li>
          <li><code>.weekday()</code> — le jour de la semaine, en nombre :
          <strong>0 pour lundi</strong>, 6 pour dimanche.</li>
        </ul>
        <p>Ce <code>0</code> pour lundi est la source d’erreur classique. Le réflexe qui marche :
        une liste des sept noms, et <code>JOURS[date.weekday()]</code>.</p>
        <p>Il existe aussi <code>date.today()</code>, qui donne la date du jour. On ne l’utilise
        pas ici : son résultat change chaque jour, et un exercice dont la réponse change n’est
        pas corrigeable.</p>
      `,
      en: `
        <p>A date is not text. <code>"14/06/2013"</code> does not know which day of the week it
        was, nor how many days separate us from it. The <code>datetime</code> module brings a
        real type:</p>
        <pre>from datetime import date

naissance = date(2013, 6, 14)</pre>
        <p>The order is always <strong>year, month, day</strong> — largest first. It is also the
        international standard order, the one that lets you sort dates as text without getting
        it wrong.</p>
        <p>Once built, the date answers questions:</p>
        <ul>
          <li><code>.year</code>, <code>.month</code>, <code>.day</code> — its pieces;</li>
          <li><code>.weekday()</code> — the day of the week, as a number:
          <strong>0 for Monday</strong>, 6 for Sunday.</li>
        </ul>
        <p>That <code>0</code> for Monday is the classic source of bugs. The reflex that works:
        a list of the seven names, and <code>JOURS[date.weekday()]</code>.</p>
        <p>There is also <code>date.today()</code>, giving today's date. We do not use it here:
        its result changes every day, and an exercise whose answer changes cannot be marked.</p>
      `,
    },
    exemple: {
      code:
        'from datetime import date\n\nJOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\n\nnoel = date(2026, 12, 25)\n\nprint(noel)\nprint(noel.year, noel.month, noel.day)\nprint(noel.weekday())\nprint(JOURS[noel.weekday()])',
    },
    defi: {
      consigne: {
        fr: `<p>Une date de naissance est déjà construite. Affiche ses morceaux et le jour de la
             semaine <strong>en toutes lettres</strong> :</p>
             <pre>Année : 2013
Mois : 6
Jour : 14
C'était un vendredi</pre>
             <p>Sers-toi de la liste <code>JOURS</code> déjà fournie.</p>`,
        en: `<p>A birth date is already built. Display its pieces and the day of the week
             <strong>spelled out</strong>:</p>
             <pre>Année : 2013
Mois : 6
Jour : 14
C'était un vendredi</pre>
             <p>Use the <code>JOURS</code> list already provided.</p>`,
      },
      depart:
        'from datetime import date\n\nJOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\nnaissance = date(2013, 6, 14)\n\n# Affiche les quatre lignes\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.weekday\\s*\\(',
          message: {
            fr: 'Le jour de la semaine se demande à la date : <code>naissance.weekday()</code>.',
            en: 'Ask the date for the weekday: <code>naissance.weekday()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'JOURS\\s*\\[',
          message: {
            fr: 'Traduis le numéro en nom avec la liste : <code>JOURS[…]</code>.',
            en: 'Turn the number into a name using the list: <code>JOURS[…]</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Année : 2013', en: 'Année : 2013' } },
        { type: 'sortieContient', valeur: { fr: 'Mois : 6', en: 'Mois : 6' } },
        { type: 'sortieContient', valeur: { fr: 'Jour : 14', en: 'Jour : 14' } },
        { type: 'sortieContient', valeur: { fr: "C'était un vendredi", en: "C'était un vendredi" } },
      ],
      indices: [
        {
          fr: 'Les trois premières lignes utilisent <code>naissance.year</code>, <code>.month</code> et <code>.day</code>.',
          en: 'The first three lines use <code>naissance.year</code>, <code>.month</code> and <code>.day</code>.',
        },
        {
          fr: '<code>naissance.weekday()</code> rend un nombre entre 0 et 6.',
          en: '<code>naissance.weekday()</code> gives a number between 0 and 6.',
        },
        {
          fr: 'Ce nombre est une position dans la liste : <code>JOURS[naissance.weekday()]</code>.',
          en: 'That number is a position in the list: <code>JOURS[naissance.weekday()]</code>.',
        },
      ],
      solution:
        'from datetime import date\n\nJOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]\nnaissance = date(2013, 6, 14)\n\nprint(f"Année : {naissance.year}")\nprint(f"Mois : {naissance.month}")\nprint(f"Jour : {naissance.day}")\nprint(f"C\'était un {JOURS[naissance.weekday()]}")',
    },
  },

  'py-date-2': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Calculer avec des dates : combien de jours, quelle date dans N jours.',
      en: 'Compute with dates: how many days, what date in N days.',
    },
    explication: {
      fr: `
        <p>Voilà pourquoi une date est un type à part et pas du texte : on peut
        <strong>calculer</strong> avec.</p>
        <p>Soustraire deux dates donne une <strong>durée</strong>, un objet
        <code>timedelta</code>. Sa propriété <code>.days</code> donne le nombre de jours :</p>
        <pre>(fin - debut).days      # 110</pre>
        <p>Et pour avancer dans le temps, on ajoute un <code>timedelta</code> :</p>
        <pre>from datetime import timedelta

debut + timedelta(days=100)</pre>
        <p>Ce sont les deux seules opérations à connaître, et elles couvrent presque tout :
        « dans combien de jours les vacances », « quelle date dans trois semaines », « quel âge
        a cette personne ».</p>
        <p>L’immense avantage : <strong>les mois de longueurs différentes et les années
        bissextiles sont gérés pour toi</strong>. Ajouter 100 jours au 1<sup>er</sup> septembre
        traverse septembre, octobre, novembre et tombe juste — ce qu’un calcul à la main rate
        une fois sur deux.</p>
        <p>On compare aussi les dates comme des nombres : <code>debut &lt; fin</code> vaut
        <code>True</code>.</p>
      `,
      en: `
        <p>This is why a date is its own type and not text: you can <strong>compute</strong>
        with it.</p>
        <p>Subtracting two dates gives a <strong>duration</strong>, a <code>timedelta</code>
        object. Its <code>.days</code> property gives the number of days:</p>
        <pre>(fin - debut).days      # 110</pre>
        <p>And to move forward in time, you add a <code>timedelta</code>:</p>
        <pre>from datetime import timedelta

debut + timedelta(days=100)</pre>
        <p>These are the only two operations to know, and they cover nearly everything: "how
        many days until the holidays", "what date in three weeks", "how old is this person".</p>
        <p>The huge advantage: <strong>months of different lengths and leap years are handled
        for you</strong>. Adding 100 days to 1 September crosses September, October and November
        and lands correctly — something a hand calculation gets wrong half the time.</p>
        <p>Dates also compare like numbers: <code>debut &lt; fin</code> is <code>True</code>.</p>
      `,
    },
    exemple: {
      code:
        'from datetime import date, timedelta\n\ndebut = date(2026, 9, 1)\nfin = date(2026, 12, 20)\n\ndureeue = fin - debut\nprint(dureeue)\nprint(dureeue.days)\n\nprint(debut + timedelta(days=100))\nprint(debut + timedelta(weeks=2))\nprint(debut < fin)',
    },
    defi: {
      consigne: {
        fr: `<p>La rentrée est le 1<sup>er</sup> septembre 2026, les vacances de Noël commencent
             le 20 décembre 2026.</p>
             <p>Affiche le nombre de jours qui les séparent, puis la date qu’il sera 100 jours
             après la rentrée :</p>
             <pre>110 jours avant les vacances
Dans 100 jours : 2026-12-10</pre>`,
        en: `<p>Term starts on 1 September 2026, the Christmas holidays begin on
             20 December 2026.</p>
             <p>Display the number of days between them, then the date it will be 100 days after
             the start of term:</p>
             <pre>110 jours avant les vacances
Dans 100 jours : 2026-12-10</pre>`,
      },
      depart:
        'from datetime import date, timedelta\n\nrentree = date(2026, 9, 1)\nvacances = date(2026, 12, 20)\n\n# Le nombre de jours, puis la date dans 100 jours\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.days\\b',
          message: {
            fr: 'La soustraction donne une durée : prends son <code>.days</code>.',
            en: 'The subtraction gives a duration: take its <code>.days</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'timedelta\\s*\\(',
          message: {
            fr: 'Pour avancer de 100 jours, ajoute un <code>timedelta(days=100)</code>.',
            en: 'To move 100 days forward, add a <code>timedelta(days=100)</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '110 jours avant les vacances', en: '110 jours avant les vacances' } },
        { type: 'sortieContient', valeur: { fr: 'Dans 100 jours : 2026-12-10', en: 'Dans 100 jours : 2026-12-10' } },
      ],
      indices: [
        {
          fr: 'La durée : <code>(vacances - rentree).days</code>.',
          en: 'The duration: <code>(vacances - rentree).days</code>.',
        },
        {
          fr: 'Les parenthèses comptent : on soustrait d’abord, on demande <code>.days</code> ensuite.',
          en: 'The brackets matter: subtract first, then ask for <code>.days</code>.',
        },
        {
          fr: 'La seconde ligne : <code>rentree + timedelta(days=100)</code>.',
          en: 'The second line: <code>rentree + timedelta(days=100)</code>.',
        },
      ],
      solution:
        'from datetime import date, timedelta\n\nrentree = date(2026, 9, 1)\nvacances = date(2026, 12, 20)\n\nprint(f"{(vacances - rentree).days} jours avant les vacances")\nprint(f"Dans 100 jours : {rentree + timedelta(days=100)}")',
    },
  },

  'py-date-3': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Afficher une date à la française, et lire une date écrite en texte.',
      en: 'Display a date the French way, and read a date written as text.',
    },
    explication: {
      fr: `
        <p>Affichée telle quelle, une date sort au format international :
        <code>2026-12-25</code>. Pratique pour trier, moins pour un bulletin.</p>
        <p>Deux méthodes font la traduction dans les deux sens, et leurs noms se retiennent
        bien :</p>
        <ul>
          <li><code>strftime</code> — <em>string <strong>from</strong> time</em> : d’une date
          vers du texte ;</li>
          <li><code>strptime</code> — <em>string <strong>parse</strong> time</em> : d’un texte
          vers une date.</li>
        </ul>
        <pre>maintenant.strftime("%d/%m/%Y à %H:%M")   # 01/01/2026 à 14:30
datetime.strptime("25/12/2026", "%d/%m/%Y")</pre>
        <p>Le format se décrit avec des codes commençant par <code>%</code> :</p>
        <ul>
          <li><code>%d</code> jour, <code>%m</code> mois, <code>%Y</code> année sur 4
          chiffres ;</li>
          <li><code>%H</code> heures, <code>%M</code> minutes.</li>
        </ul>
        <p>Tout le reste — les barres obliques, le mot « à », les espaces — est recopié tel
        quel.</p>
        <p><code>strptime</code> est le plus délicat : le format que tu donnes doit décrire
        <strong>exactement</strong> le texte reçu. Un texte en <code>25-12-2026</code> lu avec
        un format en <code>%d/%m/%Y</code> lève une <code>ValueError</code> — que tu sais
        maintenant attraper.</p>
      `,
      en: `
        <p>Displayed as is, a date comes out in international format: <code>2026-12-25</code>.
        Handy for sorting, less so for a report card.</p>
        <p>Two methods translate both ways, and their names are easy to remember:</p>
        <ul>
          <li><code>strftime</code> — <em>string <strong>from</strong> time</em>: from a date to
          text;</li>
          <li><code>strptime</code> — <em>string <strong>parse</strong> time</em>: from text to
          a date.</li>
        </ul>
        <pre>maintenant.strftime("%d/%m/%Y à %H:%M")   # 01/01/2026 à 14:30
datetime.strptime("25/12/2026", "%d/%m/%Y")</pre>
        <p>The format is described with codes starting with <code>%</code>:</p>
        <ul>
          <li><code>%d</code> day, <code>%m</code> month, <code>%Y</code> four-digit year;</li>
          <li><code>%H</code> hours, <code>%M</code> minutes.</li>
        </ul>
        <p>Everything else — slashes, the word "à", spaces — is copied as is.</p>
        <p><code>strptime</code> is the trickier one: the format you give must describe the text
        received <strong>exactly</strong>. Text like <code>25-12-2026</code> read with a
        <code>%d/%m/%Y</code> format raises a <code>ValueError</code> — which you now know how
        to catch.</p>
      `,
    },
    exemple: {
      code:
        'from datetime import datetime\n\nrendez_vous = datetime(2026, 1, 1, 14, 30)\n\nprint(rendez_vous)\nprint(rendez_vous.strftime("%d/%m/%Y"))\nprint(rendez_vous.strftime("%d/%m/%Y à %H:%M"))\n\nlue = datetime.strptime("25/12/2026", "%d/%m/%Y")\nprint(lue.date())\nprint(lue.year)',
    },
    defi: {
      consigne: {
        fr: `<p>Un rendez-vous est fixé au 1<sup>er</sup> janvier 2026 à 14 h 30, et une date
             d’examen arrive sous forme de texte : <code>"25/12/2026"</code>.</p>
             <p>Affiche :</p>
             <pre>Rendez-vous : 01/01/2026 à 14:30
Examen : 2026-12-25</pre>
             <p>La seconde ligne demande de <strong>lire</strong> le texte pour en faire une
             vraie date.</p>`,
        en: `<p>An appointment is set for 1 January 2026 at 14:30, and an exam date arrives as
             text: <code>"25/12/2026"</code>.</p>
             <p>Display:</p>
             <pre>Rendez-vous : 01/01/2026 à 14:30
Examen : 2026-12-25</pre>
             <p>The second line requires <strong>reading</strong> the text into a real date.</p>`,
      },
      depart:
        'from datetime import datetime\n\nrendez_vous = datetime(2026, 1, 1, 14, 30)\ntexte_examen = "25/12/2026"\n\n# Formate le premier, lis le second\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.strftime\\s*\\(',
          message: {
            fr: 'Pour écrire la date à la française : <code>.strftime("%d/%m/%Y à %H:%M")</code>.',
            en: 'To write the date the French way: <code>.strftime("%d/%m/%Y à %H:%M")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'strptime\\s*\\(',
          message: {
            fr: 'Pour transformer le texte en date : <code>datetime.strptime(texte, format)</code>.',
            en: 'To turn text into a date: <code>datetime.strptime(text, format)</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Rendez-vous : 01/01/2026 à 14:30', en: 'Rendez-vous : 01/01/2026 à 14:30' } },
        { type: 'sortieContient', valeur: { fr: 'Examen : 2026-12-25', en: 'Examen : 2026-12-25' } },
      ],
      indices: [
        {
          fr: 'Première ligne : <code>rendez_vous.strftime("%d/%m/%Y à %H:%M")</code>.',
          en: 'First line: <code>rendez_vous.strftime("%d/%m/%Y à %H:%M")</code>.',
        },
        {
          fr: 'Lecture : <code>examen = datetime.strptime(texte_examen, "%d/%m/%Y")</code>.',
          en: 'Reading: <code>examen = datetime.strptime(texte_examen, "%d/%m/%Y")</code>.',
        },
        {
          fr: 'Affiche seulement la date, sans l’heure : <code>examen.date()</code>.',
          en: 'Display only the date, without the time: <code>examen.date()</code>.',
        },
      ],
      solution:
        'from datetime import datetime\n\nrendez_vous = datetime(2026, 1, 1, 14, 30)\ntexte_examen = "25/12/2026"\n\nprint(f"Rendez-vous : {rendez_vous.strftime(\'%d/%m/%Y à %H:%M\')}")\n\nexamen = datetime.strptime(texte_examen, "%d/%m/%Y")\nprint(f"Examen : {examen.date()}")',
    },
  },

  /* ========================================= Les expressions regulieres === */

  'py-re-1': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Décrire une forme de texte, et trouver tout ce qui lui ressemble.',
      en: 'Describe a shape of text, and find everything that matches it.',
    },
    explication: {
      fr: `
        <p>Chercher <code>"chat"</code> dans un texte, tu sais faire. Mais chercher
        <strong>tous les nombres</strong>, ou <strong>tous les mots qui commencent par une
        majuscule</strong> ? Il n’y a pas de mot précis à chercher : il y a une
        <strong>forme</strong>.</p>
        <p>C’est le rôle des <strong>expressions régulières</strong>, du module <code>re</code>.
        On décrit la forme avec quelques symboles :</p>
        <ul>
          <li><code>\\d</code> — un chiffre &nbsp;·&nbsp; <code>\\w</code> — une lettre ou un
          chiffre &nbsp;·&nbsp; <code>\\s</code> — une espace</li>
          <li><code>+</code> — le précédent, <strong>une fois ou plus</strong></li>
          <li><code>[A-Z]</code> — un caractère parmi cet intervalle</li>
        </ul>
        <p>Ainsi <code>\\d+</code> signifie « un ou plusieurs chiffres à la suite », c’est-à-dire
        un nombre.</p>
        <pre>import re
re.findall(r"\\d+", "Commande 12 : 3 pizzas")   # ['12', '3']</pre>
        <p>Note le <code>r</code> devant les guillemets : il dit à Python de ne pas interpréter
        les <code>\\</code> lui-même. <strong>Mets-le toujours</strong> sur une expression
        régulière ; sans lui, certaines fonctionnent par chance et d’autres non.</p>
        <p><code>findall</code> rend une liste de tout ce qui correspond — vide si rien ne
        correspond, jamais d’erreur.</p>
      `,
      en: `
        <p>Searching for <code>"chat"</code> in a text you can already do. But searching for
        <strong>every number</strong>, or <strong>every word starting with a capital</strong>?
        There is no precise word to look for: there is a <strong>shape</strong>.</p>
        <p>That is the job of <strong>regular expressions</strong>, from the <code>re</code>
        module. You describe the shape with a few symbols:</p>
        <ul>
          <li><code>\\d</code> — a digit &nbsp;·&nbsp; <code>\\w</code> — a letter or digit
          &nbsp;·&nbsp; <code>\\s</code> — a space</li>
          <li><code>+</code> — the previous one, <strong>once or more</strong></li>
          <li><code>[A-Z]</code> — one character from that range</li>
        </ul>
        <p>So <code>\\d+</code> means "one or more digits in a row", that is, a number.</p>
        <pre>import re
re.findall(r"\\d+", "Commande 12 : 3 pizzas")   # ['12', '3']</pre>
        <p>Notice the <code>r</code> before the quotes: it tells Python not to interpret the
        <code>\\</code> itself. <strong>Always use it</strong> on a regular expression; without
        it, some work by luck and others do not.</p>
        <p><code>findall</code> gives back a list of everything matching — empty if nothing
        matches, never an error.</p>
      `,
    },
    exemple: {
      code:
        'import re\n\ntexte = "Commande 12 : 3 pizzas et 2 sodas"\n\nprint(re.findall(r"\\d+", texte))\nprint(re.findall(r"[A-Z][a-zé]+", "Louis et Léa vont à Lyon"))\nprint(re.findall(r"\\w+", "chat, chien; lapin"))\n\n# Rien ne correspond : une liste vide, pas une erreur\nprint(re.findall(r"\\d+", "aucun chiffre ici"))',
    },
    defi: {
      consigne: {
        fr: `<p>Extrais <strong>tous les nombres</strong> de la phrase, puis affiche leur somme :</p>
             <pre>Nombres trouvés : ['12', '3', '2']
Somme : 17</pre>
             <p>Attention : <code>findall</code> rend du <strong>texte</strong>. Il faudra
             convertir avant d’additionner.</p>`,
        en: `<p>Extract <strong>every number</strong> from the sentence, then display their
             sum:</p>
             <pre>Nombres trouvés : ['12', '3', '2']
Somme : 17</pre>
             <p>Careful: <code>findall</code> gives back <strong>text</strong>. You will need to
             convert before adding.</p>`,
      },
      depart: 'import re\n\ntexte = "Commande 12 : 3 pizzas et 2 sodas"\n\n# Trouve les nombres, puis fais-en la somme\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'findall\\s*\\(',
          message: {
            fr: 'Cherche toutes les correspondances avec <code>re.findall()</code>.',
            en: 'Find every match with <code>re.findall()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bint\\s*\\(',
          message: {
            fr: '<code>findall</code> rend du texte : convertis chaque élément avec <code>int()</code>.',
            en: '<code>findall</code> gives text back: convert each item with <code>int()</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: "Nombres trouvés : ['12', '3', '2']", en: "Nombres trouvés : ['12', '3', '2']" } },
        { type: 'sortieContient', valeur: { fr: 'Somme : 17', en: 'Somme : 17' } },
      ],
      indices: [
        {
          fr: 'Le motif d’un nombre : <code>r"\\d+"</code>, avec le <code>r</code> devant.',
          en: 'The pattern for a number: <code>r"\\d+"</code>, with the <code>r</code> in front.',
        },
        {
          fr: 'Range le résultat : <code>nombres = re.findall(r"\\d+", texte)</code>.',
          en: 'Store the result: <code>nombres = re.findall(r"\\d+", texte)</code>.',
        },
        {
          fr: 'Pour la somme, une compréhension : <code>sum([int(n) for n in nombres])</code>.',
          en: 'For the sum, a comprehension: <code>sum([int(n) for n in nombres])</code>.',
        },
      ],
      solution:
        'import re\n\ntexte = "Commande 12 : 3 pizzas et 2 sodas"\nnombres = re.findall(r"\\d+", texte)\n\nprint(f"Nombres trouvés : {nombres}")\nprint(f"Somme : {sum([int(n) for n in nombres])}")',
    },
  },

  'py-re-2': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Vérifier qu’une saisie a exactement la bonne forme.',
      en: 'Check that an input has exactly the right shape.',
    },
    explication: {
      fr: `
        <p>L’autre grand usage des expressions régulières : <strong>valider</strong>. Une date,
        un code postal, un mot de passe — ils doivent avoir une forme précise, et
        <code>fullmatch</code> vérifie que le texte y correspond <strong>en entier</strong> :</p>
        <pre>re.fullmatch(r"\\d{2}-\\d{2}-\\d{4}", "25-12-2026")   # correspond
re.fullmatch(r"\\d{2}-\\d{2}-\\d{4}", "5-12-2026")    # None</pre>
        <p>Un nouveau symbole : <code>{2}</code> veut dire « exactement deux fois ». On a
        aussi <code>{2,4}</code> pour « entre deux et quatre fois », et <code>{2,}</code> pour
        « au moins deux fois ».</p>
        <p><code>fullmatch</code> rend soit une correspondance, soit <code>None</code>. Comme
        <code>None</code> est considéré comme faux, on écrit simplement :</p>
        <pre>if re.fullmatch(motif, saisie):</pre>
        <p>ou <code>bool(re.fullmatch(...))</code> pour obtenir un vrai <code>True</code> /
        <code>False</code>.</p>
        <p><strong>Pourquoi <code>fullmatch</code> et pas <code>search</code> ?</strong> Parce
        que <code>search</code> se contente de trouver le motif <em>quelque part</em> :
        <code>"bonjour 25-12-2026 !"</code> passerait le test. Pour valider une saisie, on veut
        que <strong>tout</strong> corresponde, du premier au dernier caractère.</p>
      `,
      en: `
        <p>The other big use of regular expressions: <strong>validating</strong>. A date, a
        postcode, a password — they must have a precise shape, and <code>fullmatch</code> checks
        that the text matches it <strong>entirely</strong>:</p>
        <pre>re.fullmatch(r"\\d{2}-\\d{2}-\\d{4}", "25-12-2026")   # matches
re.fullmatch(r"\\d{2}-\\d{2}-\\d{4}", "5-12-2026")    # None</pre>
        <p>A new symbol: <code>{2}</code> means "exactly twice". There is also
        <code>{2,4}</code> for "between two and four times", and <code>{2,}</code> for "at least
        twice".</p>
        <p><code>fullmatch</code> gives back either a match or <code>None</code>. Since
        <code>None</code> counts as false, you simply write:</p>
        <pre>if re.fullmatch(motif, saisie):</pre>
        <p>or <code>bool(re.fullmatch(...))</code> to get a real <code>True</code> /
        <code>False</code>.</p>
        <p><strong>Why <code>fullmatch</code> and not <code>search</code>?</strong> Because
        <code>search</code> merely finds the pattern <em>somewhere</em>:
        <code>"bonjour 25-12-2026 !"</code> would pass the test. To validate an input you want
        <strong>everything</strong> to match, from the first character to the last.</p>
      `,
    },
    exemple: {
      code:
        'import re\n\nmotif = r"\\d{2}-\\d{2}-\\d{4}"\n\nprint(bool(re.fullmatch(motif, "25-12-2026")))\nprint(bool(re.fullmatch(motif, "5-12-2026")))\nprint(bool(re.fullmatch(motif, "bonjour 25-12-2026 !")))\n\n# search, lui, se contente de trouver quelque part :\nprint(bool(re.search(motif, "bonjour 25-12-2026 !")))',
      note: {
        fr: 'Les deux dernières lignes montrent toute la différence entre valider et chercher.',
        en: 'The last two lines show the whole difference between validating and searching.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Vérifie que chaque code postal de la liste a bien la forme
             <strong>cinq chiffres, rien d’autre</strong>. Affiche une ligne par code :</p>
             <pre>69001 : True
6900 : False
69001A : False
75116 : True</pre>`,
        en: `<p>Check that each postcode in the list has the shape <strong>five digits, nothing
             else</strong>. Display one line per code:</p>
             <pre>69001 : True
6900 : False
69001A : False
75116 : True</pre>`,
      },
      depart: 'import re\n\ncodes = ["69001", "6900", "69001A", "75116"]\n\n# Une boucle, et une validation par code\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'fullmatch\\s*\\(',
          message: {
            fr: 'Il faut que <strong>tout</strong> corresponde : utilise <code>re.fullmatch()</code>.',
            en: 'The <strong>whole</strong> thing must match: use <code>re.fullmatch()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\{\\s*5\\s*\\}',
          message: {
            fr: 'Exactement cinq chiffres s’écrit <code>\\d{5}</code>.',
            en: 'Exactly five digits is written <code>\\d{5}</code>.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '69001 : True\n6900 : False\n69001A : False\n75116 : True', en: '69001 : True\n6900 : False\n69001A : False\n75116 : True' } },
      ],
      indices: [
        {
          fr: 'Le motif : <code>r"\\d{5}"</code>.',
          en: 'The pattern: <code>r"\\d{5}"</code>.',
        },
        {
          fr: 'Dans la boucle : <code>valide = bool(re.fullmatch(r"\\d{5}", code))</code>.',
          en: 'Inside the loop: <code>valide = bool(re.fullmatch(r"\\d{5}", code))</code>.',
        },
        {
          fr: 'Puis <code>print(f"{code} : {valide}")</code>.',
          en: 'Then <code>print(f"{code} : {valide}")</code>.',
        },
      ],
      solution:
        'import re\n\ncodes = ["69001", "6900", "69001A", "75116"]\n\nfor code in codes:\n    valide = bool(re.fullmatch(r"\\d{5}", code))\n    print(f"{code} : {valide}")',
    },
  },

  'py-re-3': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Remplacer et découper selon une forme, pas selon un texte exact.',
      en: 'Replace and split by shape, not by exact text.',
    },
    explication: {
      fr: `
        <p>Tu connais <code>.replace()</code> et <code>.split()</code>. Ils sont limités : ils
        ne travaillent que sur un texte <strong>exact</strong>.</p>
        <p>Comment remplacer « une ou plusieurs espaces » par une seule ? <code>.replace</code>
        ne sait pas le dire. <code>re</code> si :</p>
        <pre>re.sub(r"\\s+", " ", "trop    d   espaces")
# "trop d espaces"</pre>
        <p><code>re.sub(motif, remplacement, texte)</code> remplace <strong>toutes</strong> les
        correspondances. C’est l’outil de nettoyage par excellence : normaliser des espaces,
        retirer la ponctuation, masquer des numéros.</p>
        <p>Et <code>re.split</code> découpe sur plusieurs séparateurs à la fois :</p>
        <pre>re.split(r"[,;]", "chat,chien;lapin")
# ['chat', 'chien', 'lapin']</pre>
        <p>Ici <code>[,;]</code> veut dire « une virgule <em>ou</em> un point-virgule ». Avec
        <code>.split()</code> ordinaire, il faudrait deux passages et un remplacement
        intermédiaire.</p>
        <p><strong>Un conseil de fin de sujet :</strong> les expressions régulières sont
        puissantes et vite illisibles. Si la tienne dépasse une ligne, elle sera incompréhensible
        dans un mois — y compris pour toi. Deux étapes simples valent mieux qu’une expression
        géniale.</p>
      `,
      en: `
        <p>You know <code>.replace()</code> and <code>.split()</code>. They are limited: they
        only work on <strong>exact</strong> text.</p>
        <p>How do you replace "one or more spaces" with a single one? <code>.replace</code>
        cannot express that. <code>re</code> can:</p>
        <pre>re.sub(r"\\s+", " ", "trop    d   espaces")
# "trop d espaces"</pre>
        <p><code>re.sub(pattern, replacement, text)</code> replaces <strong>every</strong>
        match. It is the cleanup tool par excellence: normalising spaces, stripping punctuation,
        masking numbers.</p>
        <p>And <code>re.split</code> cuts on several separators at once:</p>
        <pre>re.split(r"[,;]", "chat,chien;lapin")
# ['chat', 'chien', 'lapin']</pre>
        <p>Here <code>[,;]</code> means "a comma <em>or</em> a semicolon". With ordinary
        <code>.split()</code> you would need two passes and an intermediate replacement.</p>
        <p><strong>A closing piece of advice:</strong> regular expressions are powerful and
        quickly unreadable. If yours runs past one line, it will be incomprehensible in a month
        — including to you. Two simple steps beat one brilliant expression.</p>
      `,
    },
    exemple: {
      code:
        'import re\n\nprint(re.sub(r"\\s+", " ", "trop    d   espaces"))\nprint(re.sub(r"\\d", "*", "carte 1234 5678"))\nprint(re.split(r"[,;]", "chat,chien;lapin"))\nprint(re.split(r"\\s+", "un   deux  trois"))',
    },
    defi: {
      consigne: {
        fr: `<p>Une liste d’ingrédients a été saisie n’importe comment : séparateurs mélangés et
             espaces en trop.</p>
             <p>Nettoie-la et affiche :</p>
             <pre>3 ingrédients : farine, oeufs, lait</pre>
             <p>Découpe sur les virgules <em>et</em> les points-virgules, et débarrasse chaque
             ingrédient de ses espaces.</p>`,
        en: `<p>A list of ingredients was typed carelessly: mixed separators and extra
             spaces.</p>
             <p>Clean it up and display:</p>
             <pre>3 ingrédients : farine, oeufs, lait</pre>
             <p>Split on commas <em>and</em> semicolons, and strip each ingredient of its
             spaces.</p>`,
      },
      depart: 'import re\n\nsaisie = "farine ,  oeufs;lait"\n\n# Découpe sur , et ; puis nettoie chaque morceau\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 're\\.split\\s*\\(',
          message: {
            fr: 'Deux séparateurs à la fois : <code>re.split(r"[,;]", saisie)</code>.',
            en: 'Two separators at once: <code>re.split(r"[,;]", saisie)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.strip\\s*\\(',
          message: {
            fr: 'Chaque morceau garde des espaces : nettoie-le avec <code>.strip()</code>.',
            en: 'Each piece keeps spaces: clean it with <code>.strip()</code>.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '3 ingrédients : farine, oeufs, lait', en: '3 ingrédients : farine, oeufs, lait' } },
      ],
      indices: [
        {
          fr: 'Le découpage : <code>morceaux = re.split(r"[,;]", saisie)</code>.',
          en: 'The split: <code>morceaux = re.split(r"[,;]", saisie)</code>.',
        },
        {
          fr: 'Nettoie tout d’un coup avec une compréhension : <code>[m.strip() for m in morceaux]</code>.',
          en: 'Clean them all at once with a comprehension: <code>[m.strip() for m in morceaux]</code>.',
        },
        {
          fr: 'Puis recolle : <code>", ".join(ingredients)</code>, et compte avec <code>len()</code>.',
          en: 'Then glue back: <code>", ".join(ingredients)</code>, and count with <code>len()</code>.',
        },
      ],
      solution:
        'import re\n\nsaisie = "farine ,  oeufs;lait"\n\nmorceaux = re.split(r"[,;]", saisie)\ningredients = [m.strip() for m in morceaux]\n\nprint(f"{len(ingredients)} ingrédients : {\', \'.join(ingredients)}")',
    },
  },

  /* ===================================================== Les fichiers ===== */

  'py-fic-1': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Écrire dans un fichier, et le relire.',
      en: 'Write to a file, and read it back.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici, tout disparaissait à la fin du programme. Un fichier, lui,
        <strong>reste</strong>. C’est ce qui sépare un exercice d’un vrai logiciel.</p>
        <pre>with open("notes.txt", "w") as fichier:
    fichier.write("14\\n17\\n11\\n")

with open("notes.txt") as fichier:
    contenu = fichier.read()</pre>
        <p>Trois choses à comprendre :</p>
        <ul>
          <li><strong>le mode</strong> — <code>"w"</code> écrit (et
          <strong>efface tout</strong> ce qu’il y avait !), <code>"r"</code> lit, c’est le mode
          par défaut, <code>"a"</code> ajoute à la fin ;</li>
          <li><strong>le <code>with</code></strong> — il ferme le fichier tout seul à la sortie
          du bloc, même en cas d’erreur. Sans lui, il faut penser à <code>.close()</code>, et on
          l’oublie ;</li>
          <li><strong>le <code>\\n</code></strong> — <code>write</code> n’ajoute
          <em>aucun</em> retour à la ligne. Sans lui, tout se colle.</li>
        </ul>
        <p><strong>Attention au mode <code>"w"</code> :</strong> il vide le fichier avant même
        que tu écrives. Ouvrir en <code>"w"</code> un fichier qu’on voulait lire est la façon la
        plus rapide de perdre son travail.</p>
        <p>Ici, les fichiers vivent dans la mémoire de l’application et disparaissent quand tu
        quittes la leçon. Le principe, lui, est exactement celui d’un vrai disque dur.</p>
      `,
      en: `
        <p>So far everything vanished when the program ended. A file <strong>stays</strong>.
        That is what separates an exercise from real software.</p>
        <pre>with open("notes.txt", "w") as fichier:
    fichier.write("14\\n17\\n11\\n")

with open("notes.txt") as fichier:
    contenu = fichier.read()</pre>
        <p>Three things to understand:</p>
        <ul>
          <li><strong>the mode</strong> — <code>"w"</code> writes (and <strong>erases
          everything</strong> that was there!), <code>"r"</code> reads and is the default,
          <code>"a"</code> appends at the end;</li>
          <li><strong>the <code>with</code></strong> — it closes the file by itself when the
          block ends, even on error. Without it you must remember <code>.close()</code>, and you
          will forget;</li>
          <li><strong>the <code>\\n</code></strong> — <code>write</code> adds <em>no</em> line
          break of its own. Without it, everything runs together.</li>
        </ul>
        <p><strong>Beware of mode <code>"w"</code>:</strong> it empties the file before you even
        write. Opening in <code>"w"</code> a file you meant to read is the fastest way to lose
        your work.</p>
        <p>Here files live in the application's memory and disappear when you leave the lesson.
        The principle is exactly that of a real hard drive.</p>
      `,
    },
    exemple: {
      code:
        'with open("courses.txt", "w") as fichier:\n    fichier.write("pain\\n")\n    fichier.write("lait\\n")\n    fichier.write("pommes\\n")\n\nwith open("courses.txt") as fichier:\n    contenu = fichier.read()\n\nprint(contenu)\nprint("---")\nprint(contenu.split())',
    },
    defi: {
      consigne: {
        fr: `<p>Écris les trois notes <code>14</code>, <code>17</code> et <code>11</code> dans un
             fichier <code>notes.txt</code>, une par ligne. Puis relis-le et affiche :</p>
             <pre>Contenu : ['14', '17', '11']
3 notes enregistrées</pre>
             <p>Le compte doit venir du fichier relu, pas d’un nombre écrit à la main.</p>`,
        en: `<p>Write the three marks <code>14</code>, <code>17</code> and <code>11</code> into a
             file <code>notes.txt</code>, one per line. Then read it back and display:</p>
             <pre>Contenu : ['14', '17', '11']
3 notes enregistrées</pre>
             <p>The count must come from the file you read back, not from a hand-written
             number.</p>`,
      },
      depart: '# Écris le fichier, puis relis-le\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'open\\s*\\(\\s*[\'"]notes\\.txt[\'"]\\s*,\\s*[\'"]w[\'"]',
          message: {
            fr: 'Ouvre le fichier en écriture : <code>open("notes.txt", "w")</code>.',
            en: 'Open the file for writing: <code>open("notes.txt", "w")</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.read\\s*\\(',
          message: {
            fr: 'Relis le fichier avec <code>.read()</code>.',
            en: 'Read the file back with <code>.read()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'len\\s*\\(',
          message: {
            fr: 'Compte ce que tu as relu avec <code>len()</code>.',
            en: 'Count what you read back with <code>len()</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: "Contenu : ['14', '17', '11']", en: "Contenu : ['14', '17', '11']" } },
        { type: 'sortieContient', valeur: { fr: '3 notes enregistrées', en: '3 notes enregistrées' } },
      ],
      indices: [
        {
          fr: 'Écriture : <code>with open("notes.txt", "w") as f:</code> puis <code>f.write("14\\n17\\n11\\n")</code>.',
          en: 'Writing: <code>with open("notes.txt", "w") as f:</code> then <code>f.write("14\\n17\\n11\\n")</code>.',
        },
        {
          fr: 'Lecture : un second <code>with open("notes.txt") as f:</code>, sans mode.',
          en: 'Reading: a second <code>with open("notes.txt") as f:</code>, with no mode.',
        },
        {
          fr: '<code>f.read().split()</code> rend directement la liste des trois notes.',
          en: '<code>f.read().split()</code> gives you the list of the three marks directly.',
        },
      ],
      solution:
        'with open("notes.txt", "w") as fichier:\n    fichier.write("14\\n17\\n11\\n")\n\nwith open("notes.txt") as fichier:\n    notes = fichier.read().split()\n\nprint(f"Contenu : {notes}")\nprint(f"{len(notes)} notes enregistrées")',
    },
  },

  'py-fic-2': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Parcourir un fichier ligne par ligne, et lui ajouter du contenu.',
      en: 'Go through a file line by line, and add content to it.',
    },
    explication: {
      fr: `
        <p><code>.read()</code> charge <strong>tout</strong> le fichier d’un coup. Sur trois
        notes c’est parfait ; sur un fichier d’un giga-octet, la mémoire explose.</p>
        <p>La bonne habitude est de parcourir le fichier comme une liste de lignes :</p>
        <pre>with open("notes.txt") as fichier:
    for ligne in fichier:
        print(ligne.strip())</pre>
        <p>Python ne lit alors qu’une ligne à la fois, quelle que soit la taille du fichier.</p>
        <p><strong>Le <code>.strip()</code> n’est pas décoratif :</strong> chaque ligne lue
        garde son retour à la ligne final. Sans lui, tes affichages se retrouvent espacés d’une
        ligne vide, et une comparaison comme <code>ligne == "14"</code> échoue mystérieusement
        — parce que la ligne vaut en réalité <code>"14\\n"</code>.</p>
        <p>Pour ajouter sans effacer, le mode <code>"a"</code> (comme <em>append</em>) :</p>
        <pre>with open("notes.txt", "a") as fichier:
    fichier.write("20\\n")</pre>
        <p>C’est la différence qui compte entre <code>"w"</code> et <code>"a"</code> :
        le premier repart de zéro, le second continue.</p>
      `,
      en: `
        <p><code>.read()</code> loads the <strong>whole</strong> file at once. On three marks
        that is fine; on a one-gigabyte file, memory blows up.</p>
        <p>The good habit is to walk the file like a list of lines:</p>
        <pre>with open("notes.txt") as fichier:
    for ligne in fichier:
        print(ligne.strip())</pre>
        <p>Python then reads only one line at a time, whatever the file size.</p>
        <p><strong>The <code>.strip()</code> is not decorative:</strong> every line read keeps
        its trailing line break. Without it your output ends up double-spaced, and a comparison
        like <code>ligne == "14"</code> fails mysteriously — because the line is really
        <code>"14\\n"</code>.</p>
        <p>To add without erasing, mode <code>"a"</code> (for <em>append</em>):</p>
        <pre>with open("notes.txt", "a") as fichier:
    fichier.write("20\\n")</pre>
        <p>That is the difference that matters between <code>"w"</code> and <code>"a"</code>:
        the first starts from scratch, the second carries on.</p>
      `,
    },
    exemple: {
      code:
        'with open("journal.txt", "w") as fichier:\n    fichier.write("lundi : 2 h\\nmardi : 1 h\\n")\n\nwith open("journal.txt") as fichier:\n    for ligne in fichier:\n        print("→", ligne.strip())\n\nwith open("journal.txt", "a") as fichier:\n    fichier.write("mercredi : 3 h\\n")\n\nwith open("journal.txt") as fichier:\n    print(len(fichier.readlines()), "jours")',
      note: {
        fr: 'Enlève le <code>.strip()</code> et relance : tu verras apparaître les lignes vides.',
        en: 'Remove the <code>.strip()</code> and run again: the blank lines will appear.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Un fichier <code>notes.txt</code> contient déjà trois notes. Fais deux choses :</p>
             <ol>
               <li>affiche chaque note, une par ligne, préfixée par <code>Note : </code> ;</li>
               <li><strong>ajoute</strong> la note <code>20</code> sans effacer les autres, puis
               annonce le nouveau total.</li>
             </ol>
             <pre>Note : 14
Note : 17
Note : 11
Total : 4 notes</pre>`,
        en: `<p>A file <code>notes.txt</code> already holds three marks. Do two things:</p>
             <ol>
               <li>display each mark, one per line, prefixed with <code>Note : </code>;</li>
               <li><strong>append</strong> the mark <code>20</code> without erasing the others,
               then announce the new total.</li>
             </ol>
             <pre>Note : 14
Note : 17
Note : 11
Total : 4 notes</pre>`,
      },
      depart:
        'with open("notes.txt", "w") as fichier:\n    fichier.write("14\\n17\\n11\\n")\n\n# Parcours ligne par ligne, puis ajoute la note 20\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s+\\w+\\s+in\\s+\\w+\\s*:',
          message: {
            fr: 'Parcours le fichier avec une boucle <code>for ligne in fichier:</code>.',
            en: 'Walk the file with a <code>for ligne in fichier:</code> loop.',
          },
        },
        {
          type: 'codeContient',
          motif: '[\'"]a[\'"]\\s*\\)',
          message: {
            fr: 'Pour ajouter sans effacer, ouvre en mode <code>"a"</code>.',
            en: 'To append without erasing, open in mode <code>"a"</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.strip\\s*\\(',
          message: {
            fr: 'Chaque ligne lue garde son retour à la ligne : enlève-le avec <code>.strip()</code>.',
            en: 'Each line read keeps its line break: remove it with <code>.strip()</code>.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Note : 14', en: 'Note : 14' } },
        { type: 'sortieContient', valeur: { fr: 'Note : 11', en: 'Note : 11' } },
        { type: 'sortieContient', valeur: { fr: 'Total : 4 notes', en: 'Total : 4 notes' } },
      ],
      indices: [
        {
          fr: 'La boucle : <code>with open("notes.txt") as f:</code> puis <code>for ligne in f:</code>.',
          en: 'The loop: <code>with open("notes.txt") as f:</code> then <code>for ligne in f:</code>.',
        },
        {
          fr: 'L’ajout : <code>with open("notes.txt", "a") as f:</code> puis <code>f.write("20\\n")</code>.',
          en: 'The append: <code>with open("notes.txt", "a") as f:</code> then <code>f.write("20\\n")</code>.',
        },
        {
          fr: 'Pour compter à la fin, relis tout : <code>len(f.readlines())</code>.',
          en: 'To count at the end, read it all back: <code>len(f.readlines())</code>.',
        },
      ],
      solution:
        'with open("notes.txt", "w") as fichier:\n    fichier.write("14\\n17\\n11\\n")\n\nwith open("notes.txt") as fichier:\n    for ligne in fichier:\n        print(f"Note : {ligne.strip()}")\n\nwith open("notes.txt", "a") as fichier:\n    fichier.write("20\\n")\n\nwith open("notes.txt") as fichier:\n    print(f"Total : {len(fichier.readlines())} notes")',
    },
  },

  'py-fic-3': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Enregistrer des données structurées, et les relire telles quelles.',
      en: 'Save structured data, and read it back unchanged.',
    },
    explication: {
      fr: `
        <p>Un fichier texte range du texte. Mais comment enregistrer un
        <strong>dictionnaire</strong>, avec ses nombres, ses listes et ses clés ? En le
        transformant en texte selon une convention que tout le monde connaît : le
        <strong>JSON</strong>.</p>
        <pre>import json

with open("profil.json", "w") as f:
    json.dump(profil, f)

with open("profil.json") as f:
    profil = json.load(f)</pre>
        <p>Deux fonctions, faciles à retenir : <code>dump</code> vide les données dans un
        fichier, <code>load</code> les charge depuis un fichier.</p>
        <p>Et surtout : <strong>les types sont conservés</strong>. Un nombre relu est un nombre,
        une liste reste une liste. C’est toute la différence avec un fichier texte, où
        <code>320</code> revient sous la forme <code>"320"</code>.</p>
        <p>JSON n’est pas propre à Python : c’est le format d’échange de tout le web. Ton
        application CodeWithMe enregistre ta progression en JSON, exactement comme ça.</p>
        <p>Une limite à connaître : JSON ne sait stocker que des nombres, du texte, des
        booléens, des listes et des dictionnaires. Un tuple ressort en liste, et une date doit
        être convertie en texte avant.</p>
      `,
      en: `
        <p>A text file stores text. But how do you save a <strong>dictionary</strong>, with its
        numbers, lists and keys? By turning it into text using a convention everyone knows:
        <strong>JSON</strong>.</p>
        <pre>import json

with open("profil.json", "w") as f:
    json.dump(profil, f)

with open("profil.json") as f:
    profil = json.load(f)</pre>
        <p>Two functions, easy to remember: <code>dump</code> dumps the data into a file,
        <code>load</code> loads it back from a file.</p>
        <p>Above all: <strong>types are preserved</strong>. A number read back is a number, a
        list stays a list. That is the whole difference from a text file, where <code>320</code>
        comes back as <code>"320"</code>.</p>
        <p>JSON is not specific to Python: it is the exchange format of the entire web. Your
        CodeWithMe application saves your progress in JSON, exactly like this.</p>
        <p>One limit to know: JSON can only store numbers, text, booleans, lists and
        dictionaries. A tuple comes back as a list, and a date must be converted to text
        first.</p>
      `,
    },
    exemple: {
      code:
        'import json\n\nprofil = {"nom": "Louis", "xp": 320, "badges": ["premier-pas", "curieux"]}\n\nwith open("profil.json", "w") as fichier:\n    json.dump(profil, fichier)\n\n# On regarde à quoi ressemble le fichier :\nwith open("profil.json") as fichier:\n    print(fichier.read())\n\nwith open("profil.json") as fichier:\n    relu = json.load(fichier)\n\nprint(relu["nom"], relu["xp"] + 10)\nprint(type(relu["xp"]))',
      note: {
        fr: 'La dernière ligne le prouve : le XP relu est bien un <code>int</code>, pas du texte.',
        en: 'The last line proves it: the XP read back really is an <code>int</code>, not text.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Enregistre le profil d’un joueur en JSON, puis relis-le et
             <strong>calcule</strong> avec les valeurs relues :</p>
             <pre>Louis a 320 XP
Avec le bonus : 420
2 badges</pre>
             <p>Le bonus est de 100. S’il fallait convertir avec <code>int()</code>, c’est que
             JSON n’a pas été utilisé.</p>`,
        en: `<p>Save a player's profile as JSON, then read it back and <strong>compute</strong>
             with the values you read:</p>
             <pre>Louis a 320 XP
Avec le bonus : 420
2 badges</pre>
             <p>The bonus is 100. If you needed <code>int()</code> to convert, then JSON was not
             used.</p>`,
      },
      depart:
        'import json\n\nprofil = {"nom": "Louis", "xp": 320, "badges": ["premier-pas", "curieux"]}\n\n# Enregistre en JSON, relis, puis calcule\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'json\\.dump\\s*\\(',
          message: {
            fr: 'Enregistre avec <code>json.dump(profil, fichier)</code>.',
            en: 'Save with <code>json.dump(profil, fichier)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'json\\.load\\s*\\(',
          message: {
            fr: 'Relis avec <code>json.load(fichier)</code>.',
            en: 'Read back with <code>json.load(fichier)</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '\\bint\\s*\\(',
          message: {
            fr: 'Aucune conversion n’est nécessaire : JSON conserve les types.',
            en: 'No conversion is needed: JSON preserves types.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Louis a 320 XP', en: 'Louis a 320 XP' } },
        { type: 'sortieContient', valeur: { fr: 'Avec le bonus : 420', en: 'Avec le bonus : 420' } },
        { type: 'sortieContient', valeur: { fr: '2 badges', en: '2 badges' } },
      ],
      indices: [
        {
          fr: 'Écriture : <code>with open("profil.json", "w") as f:</code> puis <code>json.dump(profil, f)</code>.',
          en: 'Writing: <code>with open("profil.json", "w") as f:</code> then <code>json.dump(profil, f)</code>.',
        },
        {
          fr: 'Lecture : <code>relu = json.load(f)</code> dans un second <code>with</code>.',
          en: 'Reading: <code>relu = json.load(f)</code> inside a second <code>with</code>.',
        },
        {
          fr: 'Puis <code>relu["xp"] + 100</code> fonctionne directement, sans <code>int()</code>.',
          en: 'Then <code>relu["xp"] + 100</code> works directly, with no <code>int()</code>.',
        },
      ],
      solution:
        'import json\n\nprofil = {"nom": "Louis", "xp": 320, "badges": ["premier-pas", "curieux"]}\n\nwith open("profil.json", "w") as fichier:\n    json.dump(profil, fichier)\n\nwith open("profil.json") as fichier:\n    relu = json.load(fichier)\n\nprint(f"{relu[\'nom\']} a {relu[\'xp\']} XP")\nprint(f"Avec le bonus : {relu[\'xp\'] + 100}")\nprint(f"{len(relu[\'badges\'])} badges")',
    },
  },

  'py-fic-4': {
    langage: 'python',
    xp: 45,
    objectif: {
      fr: 'Assembler un vrai petit logiciel : enregistrer, relire, classer.',
      en: 'Assemble a real small piece of software: save, reload, rank.',
    },
    explication: {
      fr: `
        <p>Voici le moment où tout se rejoint. Un tableau des scores, c’est exactement ce que
        fait un jeu vidéo entre deux parties :</p>
        <ol>
          <li>des données dans un <strong>dictionnaire</strong> ;</li>
          <li>enregistrées en <strong>JSON</strong> dans un fichier ;</li>
          <li>relues au lancement suivant ;</li>
          <li>classées avec <strong><code>sorted</code> et un <code>key</code></strong> ;</li>
          <li>affichées avec une <strong>boucle</strong>.</li>
        </ol>
        <p>Cinq notions que tu as apprises séparément, et qui ne forment plus qu’un seul
        programme. C’est ça, savoir programmer : pas connaître des instructions, mais savoir
        les <strong>assembler</strong>.</p>
        <p>Un détail utile pour le classement : <code>dictionnaire.items()</code> rend des paires
        <code>(clé, valeur)</code>. On peut donc les trier comme des tuples, avec
        <code>key=lambda e: e[1]</code> pour trier sur le score.</p>
        <p>Et pour ne garder que les trois premiers, une découpe de liste :
        <code>classement[:3]</code>.</p>
      `,
      en: `
        <p>Here is where everything comes together. A scoreboard is exactly what a video game
        does between two sessions:</p>
        <ol>
          <li>data in a <strong>dictionary</strong>;</li>
          <li>saved as <strong>JSON</strong> in a file;</li>
          <li>read back on the next launch;</li>
          <li>ranked with <strong><code>sorted</code> and a <code>key</code></strong>;</li>
          <li>displayed with a <strong>loop</strong>.</li>
        </ol>
        <p>Five ideas you learned separately, now forming a single program. That is what
        programming is: not knowing instructions, but knowing how to <strong>assemble</strong>
        them.</p>
        <p>A useful detail for the ranking: <code>dictionary.items()</code> gives back
        <code>(key, value)</code> pairs. So you can sort them like tuples, with
        <code>key=lambda e: e[1]</code> to sort on the score.</p>
        <p>And to keep only the top three, a list slice: <code>classement[:3]</code>.</p>
      `,
    },
    exemple: {
      code:
        'import json\n\nscores = {"Louis": 320, "Léa": 480}\n\nwith open("scores.json", "w") as fichier:\n    json.dump(scores, fichier)\n\nwith open("scores.json") as fichier:\n    relus = json.load(fichier)\n\nclassement = sorted(relus.items(), key=lambda e: e[1], reverse=True)\nprint(classement)\n\nfor rang, (nom, score) in enumerate(classement, start=1):\n    print(f"{rang}. {nom} — {score}")',
      note: {
        fr: '<code>enumerate(liste, start=1)</code> donne le rang en même temps que l’élément : pratique pour numéroter.',
        en: '<code>enumerate(list, start=1)</code> gives the rank along with the item: handy for numbering.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Fabrique le tableau des scores de ton jeu. Enregistre-le en JSON, relis-le,
             classe-le du meilleur au moins bon et affiche <strong>le podium</strong> :</p>
             <pre>1. Léa — 480
2. Marie — 410
3. Louis — 320</pre>
             <p>Seuls les <strong>trois premiers</strong> apparaissent, même s’il y a quatre
             joueurs.</p>`,
        en: `<p>Build your game's scoreboard. Save it as JSON, read it back, rank it from best
             to worst and display <strong>the podium</strong>:</p>
             <pre>1. Léa — 480
2. Marie — 410
3. Louis — 320</pre>
             <p>Only the <strong>top three</strong> appear, even though there are four
             players.</p>`,
      },
      depart:
        'import json\n\nscores = {"Louis": 320, "Léa": 480, "Théo": 150, "Marie": 410}\n\n# Enregistre, relis, classe, affiche le podium\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'json\\.dump\\s*\\(',
          message: {
            fr: 'Enregistre d’abord les scores en JSON.',
            en: 'First save the scores as JSON.',
          },
        },
        {
          type: 'codeContient',
          motif: 'json\\.load\\s*\\(',
          message: {
            fr: 'Relis le fichier avant de classer : c’est ce que ferait un vrai jeu au lancement.',
            en: 'Read the file back before ranking: that is what a real game would do at launch.',
          },
        },
        {
          type: 'codeContient',
          motif: 'sorted\\s*\\(',
          message: {
            fr: 'Classe avec <code>sorted()</code> et un <code>key</code>.',
            en: 'Rank with <code>sorted()</code> and a <code>key</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\[\\s*:\\s*3\\s*\\]',
          message: {
            fr: 'Ne garde que les trois premiers en découpant la liste classée : <code>classement[:3]</code>.',
            en: 'Keep only the top three by slicing the ranked list: <code>classement[:3]</code>.',
          },
        },
        { type: 'sortieEgale', valeur: { fr: '1. Léa — 480\n2. Marie — 410\n3. Louis — 320', en: '1. Léa — 480\n2. Marie — 410\n3. Louis — 320' } },
      ],
      indices: [
        {
          fr: 'Reprends le motif de l’exemple : <code>sorted(relus.items(), key=lambda e: e[1], reverse=True)</code>.',
          en: 'Reuse the example pattern: <code>sorted(relus.items(), key=lambda e: e[1], reverse=True)</code>.',
        },
        {
          fr: 'Pour n’en garder que trois, découpe la liste : <code>classement[:3]</code>.',
          en: 'To keep only three, slice the list: <code>classement[:3]</code>.',
        },
        {
          fr: 'Pour numéroter : <code>for rang, (nom, score) in enumerate(classement[:3], start=1):</code>.',
          en: 'To number them: <code>for rang, (nom, score) in enumerate(classement[:3], start=1):</code>.',
        },
      ],
      solution:
        'import json\n\nscores = {"Louis": 320, "Léa": 480, "Théo": 150, "Marie": 410}\n\nwith open("scores.json", "w") as fichier:\n    json.dump(scores, fichier)\n\nwith open("scores.json") as fichier:\n    relus = json.load(fichier)\n\nclassement = sorted(relus.items(), key=lambda e: e[1], reverse=True)\n\nfor rang, (nom, score) in enumerate(classement[:3], start=1):\n    print(f"{rang}. {nom} — {score}")',
    },
    projet: { titre: { fr: 'Mon tableau des scores', en: 'My scoreboard' } },
  },

  /* ================================================ Classes et objets ===== */

  'py-obj-1': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Créer son propre type de données, avec une classe.',
      en: 'Create your own kind of data, with a class.',
    },
    explication: {
      fr: `
        <p>Un dictionnaire décrit bien un héros : <code>{"nom": "Zelda", "vie": 100}</code>.
        Mais il ne <em>fait</em> rien, et rien n’empêche d’en créer un sans vie, ou avec une
        clé mal orthographiée.</p>
        <p>Une <strong>classe</strong> est un moule : elle décrit ce que toute chose de ce type
        possède, et garantit qu’elle le possède.</p>
        <pre>class Heros:
    def __init__(self, nom, vie):
        self.nom = nom
        self.vie = vie

zelda = Heros("Zelda", 100)
print(zelda.nom)</pre>
        <p>Trois mots à décoder :</p>
        <ul>
          <li><code>class Heros:</code> — le moule. Par convention, son nom prend une
          <strong>majuscule</strong> ;</li>
          <li><code>__init__</code> — la recette de fabrication, appelée automatiquement à
          chaque <code>Heros(...)</code>. Les tirets bas doubles sont obligatoires ;</li>
          <li><code>self</code> — <strong>l’objet en cours de fabrication</strong>.
          <code>self.nom = nom</code> veut dire « range ce nom dans cet objet-ci ».</li>
        </ul>
        <p><code>self</code> déroute au début. Retiens ceci : il est
        <strong>toujours le premier paramètre</strong>, et Python le passe tout seul — tu écris
        <code>Heros("Zelda", 100)</code> avec deux valeurs, pas trois.</p>
        <p>Un <strong>objet</strong> est ce qui sort du moule. Un moule, mille objets.</p>
      `,
      en: `
        <p>A dictionary describes a hero fine: <code>{"nom": "Zelda", "vie": 100}</code>. But it
        <em>does</em> nothing, and nothing stops you creating one with no health, or with a
        misspelled key.</p>
        <p>A <strong>class</strong> is a mould: it describes what everything of that kind has,
        and guarantees it has it.</p>
        <pre>class Heros:
    def __init__(self, nom, vie):
        self.nom = nom
        self.vie = vie

zelda = Heros("Zelda", 100)
print(zelda.nom)</pre>
        <p>Three words to decode:</p>
        <ul>
          <li><code>class Heros:</code> — the mould. By convention its name takes a
          <strong>capital letter</strong>;</li>
          <li><code>__init__</code> — the build recipe, called automatically on every
          <code>Heros(...)</code>. The double underscores are compulsory;</li>
          <li><code>self</code> — <strong>the object being built</strong>.
          <code>self.nom = nom</code> means "store this name inside this particular
          object".</li>
        </ul>
        <p><code>self</code> is confusing at first. Remember this: it is
        <strong>always the first parameter</strong>, and Python passes it by itself — you write
        <code>Heros("Zelda", 100)</code> with two values, not three.</p>
        <p>An <strong>object</strong> is what comes out of the mould. One mould, a thousand
        objects.</p>
      `,
    },
    exemple: {
      code:
        'class Heros:\n    def __init__(self, nom, vie):\n        self.nom = nom\n        self.vie = vie\n\nzelda = Heros("Zelda", 100)\nlink = Heros("Link", 120)\n\nprint(zelda.nom, zelda.vie)\nprint(link.nom, link.vie)\n\n# Deux objets distincts, sortis du même moule :\nzelda.vie = 80\nprint(zelda.vie, link.vie)',
      note: {
        fr: 'Modifier <code>zelda</code> ne touche pas <code>link</code> : ce sont deux objets indépendants.',
        en: 'Changing <code>zelda</code> does not touch <code>link</code>: they are two independent objects.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Écris une classe <code>Livre</code> avec un <code>__init__</code> qui reçoit un
             <code>titre</code>, un <code>auteur</code> et un nombre de <code>pages</code>.</p>
             <p>Crée deux livres et affiche :</p>
             <pre>Le Petit Prince, de Saint-Exupéry, 96 pages
Harry Potter, de Rowling, 320 pages</pre>`,
        en: `<p>Write a class <code>Livre</code> with an <code>__init__</code> taking a
             <code>titre</code>, an <code>auteur</code> and a number of <code>pages</code>.</p>
             <p>Create two books and display:</p>
             <pre>Le Petit Prince, de Saint-Exupéry, 96 pages
Harry Potter, de Rowling, 320 pages</pre>`,
      },
      depart: '# Définis la classe Livre, crée deux livres, affiche-les\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'class\\s+Livre\\s*:',
          message: {
            fr: 'Le moule s’écrit <code>class Livre:</code>, avec une majuscule.',
            en: 'The mould is written <code>class Livre:</code>, with a capital letter.',
          },
        },
        {
          type: 'codeContient',
          motif: 'def\\s+__init__\\s*\\(\\s*self',
          message: {
            fr: 'La recette de fabrication : <code>def __init__(self, titre, auteur, pages):</code>.',
            en: 'The build recipe: <code>def __init__(self, titre, auteur, pages):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'self\\s*\\.\\s*titre\\s*=',
          message: {
            fr: 'Range le titre dans l’objet : <code>self.titre = titre</code>.',
            en: 'Store the title inside the object: <code>self.titre = titre</code>.',
          },
        },
        {
          type: 'sortieEgale',
          valeur: {
            fr: 'Le Petit Prince, de Saint-Exupéry, 96 pages\nHarry Potter, de Rowling, 320 pages',
            en: 'Le Petit Prince, de Saint-Exupéry, 96 pages\nHarry Potter, de Rowling, 320 pages',
          },
        },
      ],
      indices: [
        {
          fr: 'Dans <code>__init__</code>, trois lignes du même genre : <code>self.titre = titre</code>, etc.',
          en: 'Inside <code>__init__</code>, three lines of the same kind: <code>self.titre = titre</code>, etc.',
        },
        {
          fr: 'Création : <code>petit_prince = Livre("Le Petit Prince", "Saint-Exupéry", 96)</code>.',
          en: 'Creation: <code>petit_prince = Livre("Le Petit Prince", "Saint-Exupéry", 96)</code>.',
        },
        {
          fr: 'Affichage : <code>print(f"{petit_prince.titre}, de {petit_prince.auteur}, {petit_prince.pages} pages")</code>.',
          en: 'Display: <code>print(f"{petit_prince.titre}, de {petit_prince.auteur}, {petit_prince.pages} pages")</code>.',
        },
      ],
      solution:
        'class Livre:\n    def __init__(self, titre, auteur, pages):\n        self.titre = titre\n        self.auteur = auteur\n        self.pages = pages\n\npetit_prince = Livre("Le Petit Prince", "Saint-Exupéry", 96)\nharry = Livre("Harry Potter", "Rowling", 320)\n\nprint(f"{petit_prince.titre}, de {petit_prince.auteur}, {petit_prince.pages} pages")\nprint(f"{harry.titre}, de {harry.auteur}, {harry.pages} pages")',
    },
  },

  'py-obj-2': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Donner des actions à ses objets, avec des méthodes.',
      en: 'Give your objects actions, with methods.',
    },
    explication: {
      fr: `
        <p>Un objet qui ne fait que stocker n’est qu’un dictionnaire un peu habillé. Ce qui rend
        une classe vraiment utile, ce sont ses <strong>méthodes</strong> : des fonctions qui
        vivent dans le moule et agissent sur l’objet.</p>
        <pre>class Heros:
    def __init__(self, nom, vie):
        self.nom = nom
        self.vie = vie

    def blesser(self, degats):
        self.vie = self.vie - degats

    def est_vivant(self):
        return self.vie &gt; 0</pre>
        <p>Une méthode s’écrit comme une fonction, à deux détails près : elle est
        <strong>indentée dans la classe</strong>, et son premier paramètre est
        <code>self</code>.</p>
        <p>À l’usage, on écrit <code>zelda.blesser(30)</code> — un seul argument, parce que
        <code>self</code>, c’est <code>zelda</code>, et Python s’en charge.</p>
        <p><strong>Voilà tout l’intérêt :</strong> les données et ce qu’on peut en faire sont
        rangés au même endroit. Personne ne peut blesser un héros en oubliant de vérifier sa
        vie, parce que la règle est <em>dans</em> le héros. Avec un dictionnaire, cette règle
        traînerait quelque part dans le programme, et un jour quelqu’un l’oublierait.</p>
        <p>Erreur classique : oublier <code>self</code> devant l’attribut.
        <code>vie = vie - degats</code> crée une variable locale qui disparaît aussitôt ;
        l’objet, lui, n’a pas bougé.</p>
      `,
      en: `
        <p>An object that only stores is just a dressed-up dictionary. What makes a class truly
        useful are its <strong>methods</strong>: functions living inside the mould and acting on
        the object.</p>
        <pre>class Heros:
    def __init__(self, nom, vie):
        self.nom = nom
        self.vie = vie

    def blesser(self, degats):
        self.vie = self.vie - degats

    def est_vivant(self):
        return self.vie &gt; 0</pre>
        <p>A method is written like a function, with two details: it is
        <strong>indented inside the class</strong>, and its first parameter is
        <code>self</code>.</p>
        <p>In use you write <code>zelda.blesser(30)</code> — one argument, because
        <code>self</code> is <code>zelda</code>, and Python handles it.</p>
        <p><strong>That is the whole point:</strong> the data and what you can do with it live
        in the same place. Nobody can wound a hero while forgetting to check their health,
        because the rule is <em>inside</em> the hero. With a dictionary that rule would sit
        somewhere in the program, and one day someone would forget it.</p>
        <p>Classic mistake: forgetting <code>self</code> before the attribute.
        <code>vie = vie - degats</code> creates a local variable that vanishes at once; the
        object has not changed.</p>
      `,
    },
    exemple: {
      code:
        'class Heros:\n    def __init__(self, nom, vie):\n        self.nom = nom\n        self.vie = vie\n\n    def blesser(self, degats):\n        self.vie = self.vie - degats\n\n    def soigner(self, points):\n        self.vie = self.vie + points\n\n    def est_vivant(self):\n        return self.vie > 0\n\nzelda = Heros("Zelda", 100)\nprint(zelda.vie, zelda.est_vivant())\n\nzelda.blesser(70)\nprint(zelda.vie, zelda.est_vivant())\n\nzelda.blesser(40)\nprint(zelda.vie, zelda.est_vivant())',
    },
    defi: {
      consigne: {
        fr: `<p>Complète la classe <code>CompteEpargne</code> avec deux méthodes :</p>
             <ul>
               <li><code>deposer(montant)</code> — ajoute au solde ;</li>
               <li><code>retirer(montant)</code> — retire du solde, mais
               <strong>refuse</strong> si le solde deviendrait négatif (dans ce cas, elle ne
               change rien).</li>
             </ul>
             <p>Le programme doit afficher :</p>
             <pre>Solde : 150
Solde : 100
Retrait refusé
Solde : 100</pre>`,
        en: `<p>Complete the <code>CompteEpargne</code> class with two methods:</p>
             <ul>
               <li><code>deposer(montant)</code> — adds to the balance;</li>
               <li><code>retirer(montant)</code> — takes from the balance, but
               <strong>refuses</strong> if the balance would go negative (in that case it
               changes nothing).</li>
             </ul>
             <p>The program must display:</p>
             <pre>Solde : 150
Solde : 100
Retrait refusé
Solde : 100</pre>`,
      },
      depart:
        'class CompteEpargne:\n    def __init__(self, solde):\n        self.solde = solde\n\n    # Ajoute ici deposer() et retirer()\n\ncompte = CompteEpargne(100)\ncompte.deposer(50)\nprint(f"Solde : {compte.solde}")\ncompte.retirer(50)\nprint(f"Solde : {compte.solde}")\ncompte.retirer(500)\nprint(f"Solde : {compte.solde}")\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+deposer\\s*\\(\\s*self',
          message: {
            fr: 'Une méthode commence par <code>def deposer(self, montant):</code>.',
            en: 'A method starts with <code>def deposer(self, montant):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'def\\s+retirer\\s*\\(\\s*self',
          message: {
            fr: 'Il manque <code>def retirer(self, montant):</code>.',
            en: '<code>def retirer(self, montant):</code> is missing.',
          },
        },
        {
          type: 'codeContient',
          motif: 'self\\s*\\.\\s*solde\\s*=',
          message: {
            fr: 'Modifie bien l’attribut de l’objet : <code>self.solde = …</code>.',
            en: 'Change the object attribute: <code>self.solde = …</code>.',
          },
        },
        {
          type: 'sortieEgale',
          valeur: {
            fr: 'Solde : 150\nSolde : 100\nRetrait refusé\nSolde : 100',
            en: 'Solde : 150\nSolde : 100\nRetrait refusé\nSolde : 100',
          },
        },
      ],
      indices: [
        {
          fr: '<code>deposer</code> tient en une ligne : <code>self.solde = self.solde + montant</code>.',
          en: '<code>deposer</code> fits in one line: <code>self.solde = self.solde + montant</code>.',
        },
        {
          fr: 'Dans <code>retirer</code>, teste d’abord : <code>if montant > self.solde:</code>.',
          en: 'Inside <code>retirer</code>, test first: <code>if montant > self.solde:</code>.',
        },
        {
          fr: 'Si c’est trop, affiche « Retrait refusé » et sors avec <code>return</code> sans rien changer.',
          en: 'If it is too much, display "Retrait refusé" and leave with <code>return</code> without changing anything.',
        },
      ],
      solution:
        'class CompteEpargne:\n    def __init__(self, solde):\n        self.solde = solde\n\n    def deposer(self, montant):\n        self.solde = self.solde + montant\n\n    def retirer(self, montant):\n        if montant > self.solde:\n            print("Retrait refusé")\n            return\n        self.solde = self.solde - montant\n\ncompte = CompteEpargne(100)\ncompte.deposer(50)\nprint(f"Solde : {compte.solde}")\ncompte.retirer(50)\nprint(f"Solde : {compte.solde}")\ncompte.retirer(500)\nprint(f"Solde : {compte.solde}")',
    },
  },

  'py-obj-3': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Décider comment son objet s’affiche.',
      en: 'Decide how your object displays itself.',
    },
    explication: {
      fr: `
        <p>Affiche un objet, et tu obtiens quelque chose comme :</p>
        <pre>&lt;__main__.Livre object at 0x7f3a2c&gt;</pre>
        <p>Techniquement exact, humainement inutile. Python te laisse décider, avec une méthode
        au nom particulier :</p>
        <pre>def __str__(self):
    return f"{self.titre}, de {self.auteur}"</pre>
        <p>À partir de là, <code>print(mon_livre)</code> affiche ta phrase. Tu n’appelles jamais
        <code>__str__</code> toi-même : c’est <code>print()</code> et <code>str()</code> qui le
        font pour toi.</p>
        <p>Ces méthodes à double tiret bas s’appellent des <strong>méthodes spéciales</strong>.
        Elles branchent tes objets sur les mécanismes du langage. Tu en connais déjà une :
        <code>__init__</code>. Il en existe pour la longueur (<code>__len__</code>), pour
        l’égalité (<code>__eq__</code>), pour l’addition (<code>__add__</code>).</p>
        <p>C’est ce qui explique que <code>len("chat")</code> et <code>len([1, 2])</code>
        fonctionnent tous les deux : le texte et la liste ont chacun leur
        <code>__len__</code>. Rien n’est spécial dans les types de Python — tes classes peuvent
        faire pareil.</p>
        <p>Une bonne <code>__str__</code> tient en une ligne et donne l’essentiel. C’est
        elle qu’on lira dans mille messages de débogage.</p>
      `,
      en: `
        <p>Display an object and you get something like:</p>
        <pre>&lt;__main__.Livre object at 0x7f3a2c&gt;</pre>
        <p>Technically exact, humanly useless. Python lets you decide, with a method that has a
        particular name:</p>
        <pre>def __str__(self):
    return f"{self.titre}, de {self.auteur}"</pre>
        <p>From then on, <code>print(mon_livre)</code> shows your sentence. You never call
        <code>__str__</code> yourself: <code>print()</code> and <code>str()</code> do it for
        you.</p>
        <p>These double-underscore methods are called <strong>special methods</strong>. They
        plug your objects into the language's machinery. You already know one:
        <code>__init__</code>. There are others for length (<code>__len__</code>), equality
        (<code>__eq__</code>), addition (<code>__add__</code>).</p>
        <p>This is why <code>len("chat")</code> and <code>len([1, 2])</code> both work: text and
        lists each have their own <code>__len__</code>. Nothing is special about Python's own
        types — your classes can do the same.</p>
        <p>A good <code>__str__</code> fits on one line and gives the essentials. It is what you
        will read in a thousand debugging messages.</p>
      `,
    },
    exemple: {
      code:
        'class Livre:\n    def __init__(self, titre, auteur, pages):\n        self.titre = titre\n        self.auteur = auteur\n        self.pages = pages\n\n    def __str__(self):\n        return f"{self.titre} ({self.pages} p.)"\n\n    def __len__(self):\n        return self.pages\n\nlivre = Livre("Le Petit Prince", "Saint-Exupéry", 96)\n\nprint(livre)\nprint(str(livre).upper())\nprint(len(livre))\n\n# Dans une liste, chaque objet sait se décrire :\nfor l in [livre, Livre("Harry Potter", "Rowling", 320)]:\n    print("-", l)',
    },
    defi: {
      consigne: {
        fr: `<p>Ajoute à la classe <code>Chanson</code> une méthode <code>__str__</code> pour que
             <code>print</code> affiche le titre, l’artiste et la durée en minutes et
             secondes :</p>
             <pre>Imagine — Lennon (3:04)
Yesterday — McCartney (2:05)</pre>
             <p>La durée est stockée en secondes. <code>184</code> donne <code>3:04</code> — les
             secondes s’écrivent sur <strong>deux chiffres</strong>.</p>`,
        en: `<p>Add a <code>__str__</code> method to the <code>Chanson</code> class so that
             <code>print</code> shows the title, the artist and the duration in minutes and
             seconds:</p>
             <pre>Imagine — Lennon (3:04)
Yesterday — McCartney (2:05)</pre>
             <p>The duration is stored in seconds. <code>184</code> gives <code>3:04</code> —
             seconds are written with <strong>two digits</strong>.</p>`,
      },
      depart:
        'class Chanson:\n    def __init__(self, titre, artiste, secondes):\n        self.titre = titre\n        self.artiste = artiste\n        self.secondes = secondes\n\n    # Ajoute __str__ ici\n\nfor c in [Chanson("Imagine", "Lennon", 184), Chanson("Yesterday", "McCartney", 125)]:\n    print(c)\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'def\\s+__str__\\s*\\(\\s*self\\s*\\)',
          message: {
            fr: 'Ajoute la méthode spéciale <code>def __str__(self):</code>.',
            en: 'Add the special method <code>def __str__(self):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\breturn\\b',
          message: {
            fr: '<code>__str__</code> doit <strong>renvoyer</strong> le texte, pas l’afficher.',
            en: '<code>__str__</code> must <strong>return</strong> the text, not print it.',
          },
        },
        {
          type: 'sortieEgale',
          valeur: {
            fr: 'Imagine — Lennon (3:04)\nYesterday — McCartney (2:05)',
            en: 'Imagine — Lennon (3:04)\nYesterday — McCartney (2:05)',
          },
        },
      ],
      indices: [
        {
          fr: 'Les minutes : <code>self.secondes // 60</code>. Les secondes restantes : <code>self.secondes % 60</code>.',
          en: 'Minutes: <code>self.secondes // 60</code>. Remaining seconds: <code>self.secondes % 60</code>.',
        },
        {
          fr: 'Pour deux chiffres, un f-string sait le faire : <code>{reste:02d}</code>.',
          en: 'For two digits, an f-string can do it: <code>{reste:02d}</code>.',
        },
        {
          fr: '<code>return f"{self.titre} — {self.artiste} ({minutes}:{reste:02d})"</code>',
          en: '<code>return f"{self.titre} — {self.artiste} ({minutes}:{reste:02d})"</code>',
        },
      ],
      solution:
        'class Chanson:\n    def __init__(self, titre, artiste, secondes):\n        self.titre = titre\n        self.artiste = artiste\n        self.secondes = secondes\n\n    def __str__(self):\n        minutes = self.secondes // 60\n        reste = self.secondes % 60\n        return f"{self.titre} — {self.artiste} ({minutes}:{reste:02d})"\n\nfor c in [Chanson("Imagine", "Lennon", 184), Chanson("Yesterday", "McCartney", 125)]:\n    print(c)',
    },
  },

  'py-obj-4': {
    langage: 'python',
    xp: 45,
    objectif: {
      fr: 'Réutiliser une classe existante pour en écrire une plus précise.',
      en: 'Reuse an existing class to write a more specific one.',
    },
    explication: {
      fr: `
        <p>Un chien est un animal. Il a tout ce qu’a un animal — un nom, un âge — plus ce qui
        lui est propre. Recopier la classe <code>Animal</code> pour y ajouter deux lignes serait
        du gâchis : le jour où l’on corrige un bug, il faudrait le corriger partout.</p>
        <p>L’<strong>héritage</strong> évite ça :</p>
        <pre>class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        return f"{self.nom} fait un bruit"

class Chien(Animal):
    def parler(self):
        return f"{self.nom} aboie"</pre>
        <p>Les parenthèses de <code>class Chien(Animal)</code> disent : « un chien est un animal
        ». Il reçoit <strong>gratuitement</strong> tout ce qu’a <code>Animal</code>, y compris
        son <code>__init__</code>.</p>
        <p>Et il peut <strong>redéfinir</strong> ce qui doit changer : ici <code>parler</code>.
        C’est le mécanisme le plus utile de l’héritage — chacun garde le commun et ajuste le
        particulier.</p>
        <p>Le vrai bénéfice apparaît ensuite : une même boucle peut traiter des animaux et des
        chiens sans jamais demander qui est qui. Chacun répond à sa façon. On appelle ça le
        <strong>polymorphisme</strong> — un grand mot pour une idée simple : le même appel, une
        réponse adaptée.</p>
        <p><code>isinstance(rex, Animal)</code> vaut <code>True</code> pour un chien : il
        <em>est</em> bien un animal.</p>
      `,
      en: `
        <p>A dog is an animal. It has everything an animal has — a name, an age — plus what is
        its own. Copying the <code>Animal</code> class to add two lines would be waste: the day
        you fix a bug you would have to fix it everywhere.</p>
        <p><strong>Inheritance</strong> avoids that:</p>
        <pre>class Animal:
    def __init__(self, nom):
        self.nom = nom

    def parler(self):
        return f"{self.nom} fait un bruit"

class Chien(Animal):
    def parler(self):
        return f"{self.nom} aboie"</pre>
        <p>The brackets in <code>class Chien(Animal)</code> say: "a dog is an animal". It gets
        <strong>for free</strong> everything <code>Animal</code> has, including its
        <code>__init__</code>.</p>
        <p>And it can <strong>redefine</strong> what must change: here <code>parler</code>. This
        is inheritance's most useful mechanism — each keeps the common part and adjusts the
        specific one.</p>
        <p>The real benefit shows next: one single loop can handle animals and dogs without ever
        asking who is who. Each answers in its own way. This is called
        <strong>polymorphism</strong> — a big word for a simple idea: the same call, a fitting
        answer.</p>
        <p><code>isinstance(rex, Animal)</code> is <code>True</code> for a dog: it really
        <em>is</em> an animal.</p>
      `,
    },
    exemple: {
      code:
        'class Animal:\n    def __init__(self, nom, age):\n        self.nom = nom\n        self.age = age\n\n    def parler(self):\n        return f"{self.nom} fait un bruit"\n\nclass Chien(Animal):\n    def parler(self):\n        return f"{self.nom} aboie"\n\nclass Chat(Animal):\n    def parler(self):\n        return f"{self.nom} miaule"\n\n# Une seule boucle, trois comportements :\nfor a in [Animal("Bestiole", 1), Chien("Rex", 3), Chat("Félix", 5)]:\n    print(a.parler())\n\nrex = Chien("Rex", 3)\nprint(rex.age)\nprint(isinstance(rex, Animal))',
      note: {
        fr: '<code>rex.age</code> fonctionne alors que <code>Chien</code> n’a pas d’<code>__init__</code> : il a hérité de celui d’<code>Animal</code>.',
        en: '<code>rex.age</code> works although <code>Chien</code> has no <code>__init__</code>: it inherited the one from <code>Animal</code>.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>La classe <code>Vehicule</code> existe déjà. Écris une classe
             <code>Velo</code> qui en <strong>hérite</strong> et redéfinit
             <code>decrire()</code>.</p>
             <p>La boucle finale doit afficher :</p>
             <pre>Une voiture roule à 130 km/h
Un vélo roule à 25 km/h, sans faire de bruit</pre>
             <p><code>Velo</code> ne doit <strong>pas</strong> réécrire <code>__init__</code> :
             il l’hérite.</p>`,
        en: `<p>The <code>Vehicule</code> class already exists. Write a <code>Velo</code> class
             that <strong>inherits</strong> from it and redefines <code>decrire()</code>.</p>
             <p>The final loop must display:</p>
             <pre>Une voiture roule à 130 km/h
Un vélo roule à 25 km/h, sans faire de bruit</pre>
             <p><code>Velo</code> must <strong>not</strong> rewrite <code>__init__</code>: it
             inherits it.</p>`,
      },
      depart:
        'class Vehicule:\n    def __init__(self, nom, vitesse):\n        self.nom = nom\n        self.vitesse = vitesse\n\n    def decrire(self):\n        return f"Une {self.nom} roule à {self.vitesse} km/h"\n\n# Écris la classe Velo ici\n\nfor v in [Vehicule("voiture", 130), Velo("vélo", 25)]:\n    print(v.decrire())\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'class\\s+Velo\\s*\\(\\s*Vehicule\\s*\\)',
          message: {
            fr: 'L’héritage s’écrit dans les parenthèses : <code>class Velo(Vehicule):</code>.',
            en: 'Inheritance goes in the brackets: <code>class Velo(Vehicule):</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'def\\s+decrire\\s*\\(\\s*self\\s*\\)[\\s\\S]*def\\s+decrire\\s*\\(\\s*self\\s*\\)',
          message: {
            fr: '<code>Velo</code> doit redéfinir sa propre méthode <code>decrire()</code>.',
            en: '<code>Velo</code> must redefine its own <code>decrire()</code> method.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'class\\s+Velo[\\s\\S]*def\\s+__init__',
          message: {
            fr: '<code>Velo</code> hérite du <code>__init__</code> d’<code>Vehicule</code> : ne le réécris pas.',
            en: '<code>Velo</code> inherits <code>Vehicule</code>\'s <code>__init__</code>: do not rewrite it.',
          },
        },
        {
          type: 'sortieEgale',
          valeur: {
            fr: 'Une voiture roule à 130 km/h\nUn vélo roule à 25 km/h, sans faire de bruit',
            en: 'Une voiture roule à 130 km/h\nUn vélo roule à 25 km/h, sans faire de bruit',
          },
        },
      ],
      indices: [
        {
          fr: 'Commence par <code>class Velo(Vehicule):</code>, puis indente la méthode.',
          en: 'Start with <code>class Velo(Vehicule):</code>, then indent the method.',
        },
        {
          fr: 'La méthode porte le <strong>même nom</strong> que celle du parent : c’est ce qui la remplace.',
          en: 'The method has the <strong>same name</strong> as the parent one: that is what replaces it.',
        },
        {
          fr: '<code>return f"Un {self.nom} roule à {self.vitesse} km/h, sans faire de bruit"</code>',
          en: '<code>return f"Un {self.nom} roule à {self.vitesse} km/h, sans faire de bruit"</code>',
        },
      ],
      solution:
        'class Vehicule:\n    def __init__(self, nom, vitesse):\n        self.nom = nom\n        self.vitesse = vitesse\n\n    def decrire(self):\n        return f"Une {self.nom} roule à {self.vitesse} km/h"\n\nclass Velo(Vehicule):\n    def decrire(self):\n        return f"Un {self.nom} roule à {self.vitesse} km/h, sans faire de bruit"\n\nfor v in [Vehicule("voiture", 130), Velo("vélo", 25)]:\n    print(v.decrire())',
    },
  },

  /* ================================================= Les statistiques ===== */

  'py-stat-1': {
    langage: 'python',
    xp: 35,
    objectif: {
      fr: 'Résumer une série de nombres : moyenne, médiane, mode.',
      en: 'Summarise a series of numbers: mean, median, mode.',
    },
    explication: {
      fr: `
        <p>Le module <code>statistics</code> répond en une ligne à des questions qu’on se pose
        tout le temps sur une série de nombres :</p>
        <ul>
          <li><code>mean(notes)</code> — la <strong>moyenne</strong> : le total divisé par le
          nombre de valeurs ;</li>
          <li><code>median(notes)</code> — la <strong>médiane</strong> : la valeur du milieu une
          fois la série triée ;</li>
          <li><code>mode(notes)</code> — le <strong>mode</strong> : la valeur qui revient le
          plus souvent.</li>
        </ul>
        <p><strong>Pourquoi trois nombres et pas un ?</strong> Parce qu’ils ne disent pas la même
        chose, et que la moyenne ment facilement.</p>
        <p>Dans une classe où presque tout le monde a 10 mais où un élève a 20, la moyenne
        remonte pour tout le monde alors que personne n’a progressé. La médiane, elle, ne bouge
        pas : elle ignore l’ampleur des extrêmes et ne regarde que le milieu.</p>
        <p>C’est pour ça qu’on parle du <em>salaire médian</em> plutôt que du salaire moyen : une
        poignée de très hauts salaires suffirait à rendre la moyenne trompeuse.</p>
        <p>Le mode, lui, est le seul qui fonctionne sur des choses non numériques : la couleur la
        plus fréquente, la réponse la plus donnée.</p>
      `,
      en: `
        <p>The <code>statistics</code> module answers in one line questions you constantly ask
        about a series of numbers:</p>
        <ul>
          <li><code>mean(notes)</code> — the <strong>mean</strong>: the total divided by the
          number of values;</li>
          <li><code>median(notes)</code> — the <strong>median</strong>: the middle value once
          the series is sorted;</li>
          <li><code>mode(notes)</code> — the <strong>mode</strong>: the value appearing most
          often.</li>
        </ul>
        <p><strong>Why three numbers and not one?</strong> Because they do not say the same
        thing, and the mean lies easily.</p>
        <p>In a class where almost everyone has 10 but one pupil has 20, the mean goes up for
        everybody although nobody improved. The median does not move: it ignores how extreme the
        extremes are and only looks at the middle.</p>
        <p>That is why people speak of the <em>median salary</em> rather than the average one: a
        handful of very high salaries would be enough to make the mean misleading.</p>
        <p>The mode is the only one that works on non-numeric things: the most frequent colour,
        the most given answer.</p>
      `,
    },
    exemple: {
      code:
        'import statistics as stat\n\nnotes = [12, 15, 9, 18, 15, 11]\n\nprint(sorted(notes))\nprint("moyenne :", round(stat.mean(notes), 2))\nprint("médiane :", stat.median(notes))\nprint("mode    :", stat.mode(notes))\n\n# La moyenne se laisse tirer par un extrême, pas la médiane :\navec_extreme = [10, 10, 10, 10, 100]\nprint(stat.mean(avec_extreme), stat.median(avec_extreme))',
      note: {
        fr: 'Les deux derniers nombres résument tout : moyenne 28, médiane 10, sur la même série.',
        en: 'The last two numbers say it all: mean 28, median 10, on the very same series.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Résume les notes du contrôle en trois lignes :</p>
             <pre>Moyenne : 13.33
Médiane : 13.5
Mode : 15</pre>
             <p>La moyenne est arrondie à deux décimales. Utilise le module
             <code>statistics</code>, pas des calculs à la main.</p>`,
        en: `<p>Summarise the test marks in three lines:</p>
             <pre>Moyenne : 13.33
Médiane : 13.5
Mode : 15</pre>
             <p>The mean is rounded to two decimals. Use the <code>statistics</code> module, not
             hand calculations.</p>`,
      },
      depart: 'notes = [12, 15, 9, 18, 15, 11]\n\n# Importe statistics, puis affiche les trois résumés\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'import\\s+statistics',
          message: {
            fr: 'Importe le module : <code>import statistics</code>.',
            en: 'Import the module: <code>import statistics</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bmedian\\s*\\(',
          message: {
            fr: 'La médiane a sa fonction : <code>median()</code>.',
            en: 'The median has its own function: <code>median()</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'sum\\s*\\(',
          message: {
            fr: 'Pas de calcul à la main : <code>mean()</code> fait déjà la moyenne.',
            en: 'No hand calculation: <code>mean()</code> already does the average.',
          },
        },
        { type: 'sortieContient', valeur: { fr: 'Moyenne : 13.33', en: 'Moyenne : 13.33' } },
        { type: 'sortieContient', valeur: { fr: 'Médiane : 13.5', en: 'Médiane : 13.5' } },
        { type: 'sortieContient', valeur: { fr: 'Mode : 15', en: 'Mode : 15' } },
      ],
      indices: [
        {
          fr: 'Un nom plus court aide : <code>import statistics as stat</code>.',
          en: 'A shorter name helps: <code>import statistics as stat</code>.',
        },
        {
          fr: 'La moyenne arrondie : <code>round(stat.mean(notes), 2)</code>.',
          en: 'The rounded mean: <code>round(stat.mean(notes), 2)</code>.',
        },
        {
          fr: 'Les deux autres n’ont pas besoin d’arrondi : <code>stat.median(notes)</code> et <code>stat.mode(notes)</code>.',
          en: 'The other two need no rounding: <code>stat.median(notes)</code> and <code>stat.mode(notes)</code>.',
        },
      ],
      solution:
        'import statistics as stat\n\nnotes = [12, 15, 9, 18, 15, 11]\n\nprint(f"Moyenne : {round(stat.mean(notes), 2)}")\nprint(f"Médiane : {stat.median(notes)}")\nprint(f"Mode : {stat.mode(notes)}")',
    },
  },

  'py-stat-2': {
    langage: 'python',
    xp: 40,
    objectif: {
      fr: 'Mesurer si une série est resserrée ou dispersée.',
      en: 'Measure whether a series is tight or spread out.',
    },
    explication: {
      fr: `
        <p>Deux classes ont la même moyenne de 10,4. Dans l’une, tout le monde est entre 10 et
        11. Dans l’autre, les notes vont de 2 à 20.</p>
        <p>La moyenne ne fait aucune différence entre les deux. Elle est pourtant énorme : dans
        un cas le cours est passé pour tout le monde, dans l’autre la moitié de la classe est
        perdue.</p>
        <p>Ce que la moyenne ne dit pas, l’<strong>écart-type</strong> le dit : il mesure à quel
        point les valeurs s’écartent de la moyenne.</p>
        <pre>stat.pstdev(serree)   # 0.49  — tout le monde au même niveau
stat.pstdev(etalee)   # 7.23  — des écarts énormes</pre>
        <p>Petit écart-type : les valeurs sont groupées. Grand écart-type : elles sont
        éparpillées. Zéro : elles sont toutes identiques.</p>
        <p>Il s’exprime dans la <strong>même unité</strong> que les données — ici des points de
        note — ce qui le rend directement lisible : « en moyenne, on s’écarte de 7 points de la
        moyenne ».</p>
        <p><em>Une précision de vocabulaire :</em> <code>pstdev</code> s’utilise quand on a
        <strong>toutes</strong> les valeurs (toute la classe). Il existe aussi
        <code>stdev</code>, pour quand on n’a qu’un échantillon et qu’on veut deviner l’ensemble
        — un sondage, par exemple. Ici, on a toute la classe.</p>
      `,
      en: `
        <p>Two classes have the same average of 10.4. In one, everybody is between 10 and 11. In
        the other, marks run from 2 to 20.</p>
        <p>The mean makes no difference between them. Yet the difference is huge: in one case
        the lesson landed for everyone, in the other half the class is lost.</p>
        <p>What the mean does not say, the <strong>standard deviation</strong> does: it measures
        how far the values stray from the mean.</p>
        <pre>stat.pstdev(serree)   # 0.49  — everyone at the same level
stat.pstdev(etalee)   # 7.23  — enormous gaps</pre>
        <p>Small standard deviation: the values are grouped. Large one: they are scattered.
        Zero: they are all identical.</p>
        <p>It is expressed in the <strong>same unit</strong> as the data — here marks — which
        makes it directly readable: "on average, we are 7 points away from the mean".</p>
        <p><em>A note on vocabulary:</em> <code>pstdev</code> is used when you have
        <strong>all</strong> the values (the whole class). There is also <code>stdev</code>, for
        when you only have a sample and want to guess the whole — an opinion poll, say. Here we
        have the whole class.</p>
      `,
    },
    exemple: {
      code:
        'import statistics as stat\n\nserree = [10, 11, 10, 11, 10]\netalee = [2, 18, 5, 20, 7]\n\nprint("Classe A — moyenne", round(stat.mean(serree), 2), "écart-type", round(stat.pstdev(serree), 2))\nprint("Classe B — moyenne", round(stat.mean(etalee), 2), "écart-type", round(stat.pstdev(etalee), 2))\n\nprint(min(serree), max(serree))\nprint(min(etalee), max(etalee))',
      note: {
        fr: 'Même moyenne exactement, et deux réalités qui n’ont rien à voir. C’est tout le sujet de cette leçon.',
        en: 'Exactly the same mean, and two realities with nothing in common. That is the whole point of this lesson.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Compare les deux classes. Pour chacune, affiche la moyenne et l’écart-type
             arrondis à deux décimales, puis conclus :</p>
             <pre>Classe A : moyenne 10.4, écart-type 0.49
Classe B : moyenne 10.4, écart-type 7.23
Même moyenne, mais la classe B est plus dispersée.</pre>`,
        en: `<p>Compare the two classes. For each, display the mean and standard deviation
             rounded to two decimals, then conclude:</p>
             <pre>Classe A : moyenne 10.4, écart-type 0.49
Classe B : moyenne 10.4, écart-type 7.23
Même moyenne, mais la classe B est plus dispersée.</pre>`,
      },
      depart:
        'import statistics as stat\n\nclasse_a = [10, 11, 10, 11, 10]\nclasse_b = [2, 18, 5, 20, 7]\n\n# Une ligne par classe, puis la conclusion\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'pstdev\\s*\\(',
          message: {
            fr: 'L’écart-type d’une population complète : <code>stat.pstdev()</code>.',
            en: 'The standard deviation of a full population: <code>stat.pstdev()</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'round\\s*\\(',
          message: {
            fr: 'Arrondis à deux décimales avec <code>round(…, 2)</code>.',
            en: 'Round to two decimals with <code>round(…, 2)</code>.',
          },
        },
        {
          type: 'sortieContient',
          valeur: { fr: 'Classe A : moyenne 10.4, écart-type 0.49', en: 'Classe A : moyenne 10.4, écart-type 0.49' },
        },
        {
          type: 'sortieContient',
          valeur: { fr: 'Classe B : moyenne 10.4, écart-type 7.23', en: 'Classe B : moyenne 10.4, écart-type 7.23' },
        },
        {
          type: 'sortieContient',
          valeur: {
            fr: 'Même moyenne, mais la classe B est plus dispersée.',
            en: 'Même moyenne, mais la classe B est plus dispersée.',
          },
        },
      ],
      indices: [
        {
          fr: 'Une ligne type : <code>print(f"Classe A : moyenne {round(stat.mean(classe_a), 2)}, écart-type {round(stat.pstdev(classe_a), 2)}")</code>.',
          en: 'A typical line: <code>print(f"Classe A : moyenne {round(stat.mean(classe_a), 2)}, écart-type {round(stat.pstdev(classe_a), 2)}")</code>.',
        },
        {
          fr: 'La seconde ligne est la même, avec <code>classe_b</code>.',
          en: 'The second line is the same, with <code>classe_b</code>.',
        },
        {
          fr: 'La troisième est un simple <code>print</code> de la phrase de conclusion.',
          en: 'The third is a plain <code>print</code> of the closing sentence.',
        },
      ],
      solution:
        'import statistics as stat\n\nclasse_a = [10, 11, 10, 11, 10]\nclasse_b = [2, 18, 5, 20, 7]\n\nprint(f"Classe A : moyenne {round(stat.mean(classe_a), 2)}, écart-type {round(stat.pstdev(classe_a), 2)}")\nprint(f"Classe B : moyenne {round(stat.mean(classe_b), 2)}, écart-type {round(stat.pstdev(classe_b), 2)}")\nprint("Même moyenne, mais la classe B est plus dispersée.")',
    },
  },

  'py-stat-3': {
    langage: 'python',
    xp: 45,
    objectif: {
      fr: 'Produire un rapport statistique complet sur une série réelle.',
      en: 'Produce a full statistical report on a real series.',
    },
    explication: {
      fr: `
        <p>Un rapport statistique n’aligne pas des nombres au hasard : il répond, dans l’ordre, à
        des questions qu’un lecteur se pose.</p>
        <ol>
          <li><strong>Combien ?</strong> — <code>len()</code></li>
          <li><strong>Autour de quoi ?</strong> — moyenne et médiane</li>
          <li><strong>À quel point regroupé ?</strong> — écart-type</li>
          <li><strong>Jusqu’où ?</strong> — <code>min()</code> et <code>max()</code></li>
          <li><strong>Et concrètement ?</strong> — une lecture en français</li>
        </ol>
        <p>Le dernier point est celui qu’on oublie, et c’est le seul qui compte pour celui qui
        lit. « Écart-type 3.16 » ne dit rien à un parent ; « 5 élèves sur 10 sont au-dessus de la
        moyenne » se comprend immédiatement.</p>
        <p>Pour compter combien dépassent la moyenne, tu as déjà tout : une compréhension avec un
        filtre, et <code>len()</code>.</p>
        <pre>len([n for n in notes if n &gt; moyenne])</pre>
        <p>Un dernier réflexe : range la moyenne dans une variable avant de t’en servir dans le
        filtre. La recalculer à chaque tour de boucle fonctionne, mais c’est du travail refait
        dix fois pour rien.</p>
      `,
      en: `
        <p>A statistical report does not line up numbers at random: it answers, in order, the
        questions a reader has.</p>
        <ol>
          <li><strong>How many?</strong> — <code>len()</code></li>
          <li><strong>Around what?</strong> — mean and median</li>
          <li><strong>How grouped?</strong> — standard deviation</li>
          <li><strong>How far?</strong> — <code>min()</code> and <code>max()</code></li>
          <li><strong>And in practice?</strong> — a plain-language reading</li>
        </ol>
        <p>That last point is the one people forget, and it is the only one that matters to the
        reader. "Standard deviation 3.16" means nothing to a parent; "5 pupils out of 10 are
        above average" is understood at once.</p>
        <p>To count how many are above the mean you already have everything: a comprehension
        with a filter, and <code>len()</code>.</p>
        <pre>len([n for n in notes if n &gt; moyenne])</pre>
        <p>One last reflex: store the mean in a variable before using it in the filter.
        Recomputing it on every pass works, but it is the same work redone ten times for
        nothing.</p>
      `,
    },
    exemple: {
      code:
        'import statistics as stat\n\ntemperatures = [18, 21, 19, 25, 17, 22]\nmoyenne = stat.mean(temperatures)\n\nprint(f"{len(temperatures)} relevés")\nprint(f"Moyenne : {round(moyenne, 2)} °C")\nprint(f"Entre {min(temperatures)} et {max(temperatures)} °C")\nprint(f"Écart-type : {round(stat.pstdev(temperatures), 2)}")\nprint(f"{len([t for t in temperatures if t > moyenne])} jours au-dessus de la moyenne")',
    },
    defi: {
      consigne: {
        fr: `<p>Produis le rapport complet du contrôle. Il doit afficher, exactement :</p>
             <pre>10 notes
Moyenne : 13
Médiane : 13.5
Écart-type : 3.16
La plus basse : 7, la plus haute : 18
5 élèves au-dessus de la moyenne</pre>
             <p>Tout doit être calculé. Change une note dans la liste, et les six lignes doivent
             suivre.</p>`,
        en: `<p>Produce the full report of the test. It must display, exactly:</p>
             <pre>10 notes
Moyenne : 13
Médiane : 13.5
Écart-type : 3.16
La plus basse : 7, la plus haute : 18
5 élèves au-dessus de la moyenne</pre>
             <p>Everything must be computed. Change one mark in the list, and all six lines must
             follow.</p>`,
      },
      depart:
        'import statistics as stat\n\nnotes = [12, 15, 9, 18, 15, 11, 14, 7, 16, 13]\n\n# Les six lignes du rapport\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'pstdev\\s*\\(',
          message: {
            fr: 'L’écart-type manque : <code>stat.pstdev(notes)</code>.',
            en: 'The standard deviation is missing: <code>stat.pstdev(notes)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\bfor\\b[\\s\\S]*\\bif\\b',
          message: {
            fr: 'Compte les élèves au-dessus de la moyenne avec une compréhension filtrée.',
            en: 'Count the pupils above the mean with a filtered comprehension.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '10 notes', en: '10 notes' } },
        { type: 'sortieContient', valeur: { fr: 'Moyenne : 13', en: 'Moyenne : 13' } },
        { type: 'sortieContient', valeur: { fr: 'Médiane : 13.5', en: 'Médiane : 13.5' } },
        { type: 'sortieContient', valeur: { fr: 'Écart-type : 3.16', en: 'Écart-type : 3.16' } },
        {
          type: 'sortieContient',
          valeur: { fr: 'La plus basse : 7, la plus haute : 18', en: 'La plus basse : 7, la plus haute : 18' },
        },
        {
          type: 'sortieContient',
          valeur: { fr: '5 élèves au-dessus de la moyenne', en: '5 élèves au-dessus de la moyenne' },
        },
      ],
      indices: [
        {
          fr: 'Commence par ranger la moyenne : <code>moyenne = stat.mean(notes)</code>.',
          en: 'Start by storing the mean: <code>moyenne = stat.mean(notes)</code>.',
        },
        {
          fr: 'Les extrêmes sont simplement <code>min(notes)</code> et <code>max(notes)</code>.',
          en: 'The extremes are simply <code>min(notes)</code> and <code>max(notes)</code>.',
        },
        {
          fr: 'La dernière ligne : <code>len([n for n in notes if n > moyenne])</code>.',
          en: 'The last line: <code>len([n for n in notes if n > moyenne])</code>.',
        },
      ],
      solution:
        'import statistics as stat\n\nnotes = [12, 15, 9, 18, 15, 11, 14, 7, 16, 13]\nmoyenne = stat.mean(notes)\n\nprint(f"{len(notes)} notes")\nprint(f"Moyenne : {round(moyenne, 2)}")\nprint(f"Médiane : {stat.median(notes)}")\nprint(f"Écart-type : {round(stat.pstdev(notes), 2)}")\nprint(f"La plus basse : {min(notes)}, la plus haute : {max(notes)}")\nprint(f"{len([n for n in notes if n > moyenne])} élèves au-dessus de la moyenne")',
    },
    projet: { titre: { fr: 'Mon rapport de notes', en: 'My marks report' } },
  },

  /* ================================================== La suite du voyage == */

  'py-suite-1': {
    langage: 'python',
    xp: 45,
    objectif: {
      fr: 'Assembler seul un programme complet, sans qu’on te dise quoi utiliser.',
      en: 'Assemble a complete program on your own, with nobody telling you what to use.',
    },
    explication: {
      fr: `
        <p>Tu as vu, depuis le premier <code>print</code> : les variables, les opérateurs, le
        texte, les conditions, les boucles, la tortue, les listes, les tuples, les ensembles,
        les dictionnaires, les fonctions, les modules, les compréhensions, les fonctions
        d’ordre supérieur, les types, les erreurs, les dates, les expressions régulières, les
        fichiers, les classes et les statistiques.</p>
        <p>Vingt et un sujets. Mais savoir programmer, ce n’est pas les connaître un par un :
        c’est savoir <strong>lesquels choisir</strong> devant un problème qu’on ne t’a pas
        préparé.</p>
        <p>Ce défi ne te dit donc pas quoi utiliser. Il décrit un besoin, comme on te le
        décrirait au travail, et c’est à toi de découper.</p>
        <p>La méthode, quand on ne sait pas par où commencer, tient en trois questions :</p>
        <ol>
          <li><strong>Quelles données ?</strong> Une liste, un dictionnaire, des objets ?</li>
          <li><strong>Quelles étapes ?</strong> Écris-les en français d’abord, en commentaires.
          Le code viendra remplir les trous ;</li>
          <li><strong>Quel affichage ?</strong> Regarde le résultat attendu, et travaille à
          rebours.</li>
        </ol>
        <p>Cette habitude — décrire avant de coder — est ce qui sépare un programmeur qui
        avance d’un programmeur qui bloque.</p>
      `,
      en: `
        <p>Since that first <code>print</code> you have seen: variables, operators, text,
        conditions, loops, the turtle, lists, tuples, sets, dictionaries, functions, modules,
        comprehensions, higher order functions, types, errors, dates, regular expressions,
        files, classes and statistics.</p>
        <p>Twenty-one topics. But knowing how to program is not knowing them one by one: it is
        knowing <strong>which ones to pick</strong> in front of a problem nobody prepared for
        you.</p>
        <p>So this challenge does not tell you what to use. It describes a need, the way it
        would be described to you at work, and it is up to you to break it down.</p>
        <p>The method, when you do not know where to start, is three questions:</p>
        <ol>
          <li><strong>What data?</strong> A list, a dictionary, objects?</li>
          <li><strong>What steps?</strong> Write them in plain language first, as comments. The
          code will fill the gaps;</li>
          <li><strong>What output?</strong> Look at the expected result, and work backwards.</li>
        </ol>
        <p>This habit — describing before coding — is what separates a programmer who moves
        forward from one who gets stuck.</p>
      `,
    },
    exemple: {
      code:
        '# La méthode, sur un exemple : "trouver le mot le plus long d\'une phrase"\n\nphrase = "le petit chat dort tranquillement"\n\n# 1. Quelles données ? une liste de mots\nmots = phrase.split(" ")\n\n# 2. Quelles étapes ? trier par longueur, prendre le dernier\ntries = sorted(mots, key=len)\n\n# 3. Quel affichage ?\nprint(f"Le mot le plus long est « {tries[-1] } », {len(tries[-1])} lettres")',
      note: {
        fr: 'Les trois commentaires ont été écrits <strong>avant</strong> le code. C’est ça, la méthode.',
        en: 'The three comments were written <strong>before</strong> the code. That is the method.',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Une bibliothèque te donne sa liste de livres, chacun avec son titre et son nombre
             de pages. Elle veut un petit rapport.</p>
             <p>Affiche exactement :</p>
             <pre>4 livres, 916 pages en tout
Le plus long : Les Misérables (450 p.)
Moyenne : 229.0 pages
Titres courts : Germinal, Candide</pre>
             <p>Un titre est « court » s’il fait <strong>moins de 12 caractères</strong>. Ils
             apparaissent dans l’ordre de la liste, séparés par une virgule et une espace.</p>
             <p>À toi de choisir tes outils. Tout ce dont tu as besoin, tu l’as déjà vu.</p>`,
        en: `<p>A library gives you its list of books, each with a title and a page count. It
             wants a short report.</p>
             <p>Display exactly:</p>
             <pre>4 livres, 916 pages en tout
Le plus long : Les Misérables (450 p.)
Moyenne : 229.0 pages
Titres courts : Germinal, Candide</pre>
             <p>A title is "short" if it is <strong>under 12 characters</strong>. They appear in
             list order, separated by a comma and a space.</p>
             <p>Pick your own tools. Everything you need, you have already seen.</p>`,
      },
      depart:
        'livres = [\n    ("Les Misérables", 450),\n    ("Germinal", 210),\n    ("Candide", 96),\n    ("Le Rouge et le Noir", 160),\n]\n\n# 1. Quelles données ?\n# 2. Quelles étapes ?\n# 3. Quel affichage ?\n',
      verifications: [
        { type: 'sortieContient', valeur: { fr: '4 livres, 916 pages en tout', en: '4 livres, 916 pages en tout' } },
        {
          type: 'sortieContient',
          valeur: { fr: 'Le plus long : Les Misérables (450 p.)', en: 'Le plus long : Les Misérables (450 p.)' },
        },
        { type: 'sortieContient', valeur: { fr: 'Moyenne : 229.0 pages', en: 'Moyenne : 229.0 pages' } },
        { type: 'sortieContient', valeur: { fr: 'Titres courts : Germinal, Candide', en: 'Titres courts : Germinal, Candide' } },
        {
          type: 'codeNeContientPas',
          motif: '916',
          message: {
            fr: 'Le total doit être calculé à partir de la liste, pas écrit à la main.',
            en: 'The total must be computed from the list, not typed by hand.',
          },
        },
      ],
      indices: [
        {
          fr: 'Le total : <code>sum([p for _, p in livres])</code>. Le tiret bas sert à ignorer le titre.',
          en: 'The total: <code>sum([p for _, p in livres])</code>. The underscore ignores the title.',
        },
        {
          fr: 'Le plus long : <code>max(livres, key=lambda l: l[1])</code>, puis déballe-le.',
          en: 'The longest: <code>max(livres, key=lambda l: l[1])</code>, then unpack it.',
        },
        {
          fr: 'Les titres courts : <code>[t for t, p in livres if len(t) < 12]</code>, puis <code>", ".join(...)</code>.',
          en: 'The short titles: <code>[t for t, p in livres if len(t) < 12]</code>, then <code>", ".join(...)</code>.',
        },
      ],
      solution:
        'livres = [\n    ("Les Misérables", 450),\n    ("Germinal", 210),\n    ("Candide", 96),\n    ("Le Rouge et le Noir", 160),\n]\n\npages = [p for _, p in livres]\ntotal = sum(pages)\n\nprint(f"{len(livres)} livres, {total} pages en tout")\n\ntitre_long, pages_long = max(livres, key=lambda l: l[1])\nprint(f"Le plus long : {titre_long} ({pages_long} p.)")\n\nprint(f"Moyenne : {total / len(livres)} pages")\n\ncourts = [t for t, p in livres if len(t) < 12]\nprint(f"Titres courts : {\', \'.join(courts)}")',
    },
    projet: { titre: { fr: 'Mon rapport de bibliothèque', en: 'My library report' } },
  },

  'py-suite-2': {
    langage: 'python',
    xp: 50,
    objectif: {
      fr: 'Savoir ce qui t’attend au-delà de cette application, et comment y accéder.',
      en: 'Know what awaits you beyond this application, and how to get there.',
    },
    explication: {
      fr: `
        <p>Cette application embarque un vrai Python, mais il tourne
        <strong>dans une page</strong>, sans réseau ni disque dur. Quatre choses très utiles lui
        sont donc inaccessibles, et il vaut mieux le savoir que de se demander pourquoi ça ne
        marche pas :</p>
        <ul>
          <li><strong>installer des bibliothèques</strong> — <code>pip</code> a besoin
          d’Internet ;</li>
          <li><strong>parler au web</strong> — <code>requests</code>, la lecture de sites, les
          API : le navigateur interdit ces connexions à Python ;</li>
          <li><strong>les environnements virtuels</strong> — <code>venv</code> a été retiré de
          cette version de Python ;</li>
          <li><strong>les grosses bibliothèques</strong> — <code>pandas</code>, <code>flask</code>,
          <code>pymongo</code> : elles s’installent, et on ne peut pas installer ici.</li>
        </ul>
        <p>Rien de tout cela n’est perdu : ce sont exactement les prochaines étapes, et elles
        s’ouvrent le jour où tu installes Python sur un vrai ordinateur, depuis
        <strong>python.org</strong>. Trois commandes dans un terminal, et tu y es :</p>
        <pre>python -m venv monprojet      # crée un environnement isolé
pip install requests          # installe une bibliothèque
pip install -r requirements.txt   # installe TOUT ce qu'un projet demande</pre>
        <p>Ce dernier fichier, <code>requirements.txt</code>, est la carte d’identité d’un
        projet Python : une bibliothèque par ligne, avec sa version. C’est ce que tu trouveras
        dans presque tous les projets que tu croiseras, et c’est ce que tu vas écrire
        maintenant — parce que ça, tu sais déjà le faire.</p>
      `,
      en: `
        <p>This application ships a real Python, but it runs <strong>inside a page</strong>,
        with no network and no hard drive. Four very useful things are therefore out of reach,
        and it is better to know it than to wonder why things fail:</p>
        <ul>
          <li><strong>installing libraries</strong> — <code>pip</code> needs the internet;</li>
          <li><strong>talking to the web</strong> — <code>requests</code>, reading websites,
          APIs: the browser forbids those connections to Python;</li>
          <li><strong>virtual environments</strong> — <code>venv</code> was removed from this
          version of Python;</li>
          <li><strong>the big libraries</strong> — <code>pandas</code>, <code>flask</code>,
          <code>pymongo</code>: they are installed, and installing is not possible here.</li>
        </ul>
        <p>None of that is lost: these are exactly the next steps, and they open up the day you
        install Python on a real computer, from <strong>python.org</strong>. Three commands in a
        terminal and you are there:</p>
        <pre>python -m venv monprojet      # creates an isolated environment
pip install requests          # installs one library
pip install -r requirements.txt   # installs EVERYTHING a project needs</pre>
        <p>That last file, <code>requirements.txt</code>, is a Python project's identity card:
        one library per line, with its version. It is what you will find in nearly every project
        you meet, and it is what you are going to write now — because that, you already know how
        to do.</p>
      `,
    },
    exemple: {
      code:
        'bibliotheques = {\n    "requests": "2.32.3",\n    "flask": "3.0.3",\n}\n\nwith open("requirements.txt", "w") as fichier:\n    for nom, version in bibliotheques.items():\n        fichier.write(f"{nom}=={version}\\n")\n\nwith open("requirements.txt") as fichier:\n    print(fichier.read())\n\nprint("À installer avec : pip install -r requirements.txt")',
      note: {
        fr: 'Le double égal n’est pas une comparaison ici : c’est la façon dont pip note « exactement cette version ».',
        en: 'The double equals is not a comparison here: it is how pip writes "exactly this version".',
      },
    },
    defi: {
      consigne: {
        fr: `<p>Pour ton premier vrai projet Python, écris son <code>requirements.txt</code>.</p>
             <p>Le dictionnaire des bibliothèques est fourni. Écris le fichier — une ligne
             <code>nom==version</code> par bibliothèque, <strong>triée par nom</strong> — puis
             relis-le et affiche :</p>
             <pre>3 bibliothèques déclarées
flask==3.0.3
pandas==2.2.2
requests==2.32.3
Installe-les avec : pip install -r requirements.txt</pre>`,
        en: `<p>For your first real Python project, write its <code>requirements.txt</code>.</p>
             <p>The dictionary of libraries is provided. Write the file — one
             <code>name==version</code> line per library, <strong>sorted by name</strong> — then
             read it back and display:</p>
             <pre>3 bibliothèques déclarées
flask==3.0.3
pandas==2.2.2
requests==2.32.3
Installe-les avec : pip install -r requirements.txt</pre>`,
      },
      depart:
        'bibliotheques = {\n    "requests": "2.32.3",\n    "pandas": "2.2.2",\n    "flask": "3.0.3",\n}\n\n# Écris requirements.txt trié, relis-le, affiche le tout\n',
      verifications: [
        {
          type: 'codeContient',
          motif: 'open\\s*\\(\\s*[\'"]requirements\\.txt[\'"]',
          message: {
            fr: 'Le fichier porte un nom précis : <code>requirements.txt</code>.',
            en: 'The file has a precise name: <code>requirements.txt</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'sorted\\s*\\(',
          message: {
            fr: 'Les lignes doivent être triées par nom : <code>sorted(...)</code>.',
            en: 'The lines must be sorted by name: <code>sorted(...)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.read\\s*\\(|readlines\\s*\\(|for\\s+\\w+\\s+in\\s+fichier',
          message: {
            fr: 'Relis vraiment le fichier plutôt que d’afficher le dictionnaire.',
            en: 'Actually read the file back rather than displaying the dictionary.',
          },
        },
        { type: 'sortieContient', valeur: { fr: '3 bibliothèques déclarées', en: '3 bibliothèques déclarées' } },
        { type: 'sortieContient', valeur: { fr: 'flask==3.0.3', en: 'flask==3.0.3' } },
        { type: 'sortieContient', valeur: { fr: 'pandas==2.2.2', en: 'pandas==2.2.2' } },
        { type: 'sortieContient', valeur: { fr: 'requests==2.32.3', en: 'requests==2.32.3' } },
        {
          type: 'sortieContient',
          valeur: {
            fr: 'Installe-les avec : pip install -r requirements.txt',
            en: 'Installe-les avec : pip install -r requirements.txt',
          },
        },
      ],
      indices: [
        {
          fr: 'Trie les clés : <code>for nom in sorted(bibliotheques):</code>.',
          en: 'Sort the keys: <code>for nom in sorted(bibliotheques):</code>.',
        },
        {
          fr: 'Chaque ligne : <code>fichier.write(f"{nom}=={bibliotheques[nom]}\\n")</code>.',
          en: 'Each line: <code>fichier.write(f"{nom}=={bibliotheques[nom]}\\n")</code>.',
        },
        {
          fr: 'Puis relis avec un second <code>with</code>, et affiche le contenu avec <code>.read()</code>.',
          en: 'Then read back with a second <code>with</code>, and display the content with <code>.read()</code>.',
        },
      ],
      solution:
        'bibliotheques = {\n    "requests": "2.32.3",\n    "pandas": "2.2.2",\n    "flask": "3.0.3",\n}\n\nwith open("requirements.txt", "w") as fichier:\n    for nom in sorted(bibliotheques):\n        fichier.write(f"{nom}=={bibliotheques[nom]}\\n")\n\nprint(f"{len(bibliotheques)} bibliothèques déclarées")\n\nwith open("requirements.txt") as fichier:\n    print(fichier.read().strip())\n\nprint("Installe-les avec : pip install -r requirements.txt")',
    },
    projet: { titre: { fr: 'Mon premier requirements.txt', en: 'My first requirements.txt' } },
  },
};
