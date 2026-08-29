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
};
