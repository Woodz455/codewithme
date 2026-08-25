/**
 * Parcours C++ — contenu des lecons.
 * Voir `_schema.md` pour la description d'une lecon.
 *
 * Ces lecons n'emploient QUE ce qui fonctionne reellement dans l'interpreteur
 * embarque, mesure et consigne dans `_schema.md` : pas de `std::string`, pas
 * de `getline`, pas de `struct`, pas de `vector`, pas de parametre par
 * reference — et aucune saisie accentuee, qui fait planter `cin >> nom`.
 */

export const LECONS_CPP = {
  /* ===================================================== Module 1 ========= */

  'cpp-1-1': {
    langage: 'cpp',
    xp: 25,
    objectif: {
      fr: 'Comprendre le squelette obligatoire d’un programme C++.',
      en: 'Understand the compulsory skeleton of a C++ program.',
    },
    explication: {
      fr: `
        <p>Le C++ est le langage des jeux vidéo, des moteurs 3D et des programmes qui doivent
        aller vite. Il est plus exigeant que Python : il ne devine rien, il faut tout lui dire.</p>
        <p>Tout programme commence par le même squelette :</p>
        <pre>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Bonjour !" &lt;&lt; endl;
    return 0;
}</pre>
        <p>Ligne par ligne :</p>
        <ul>
          <li><code>#include &lt;iostream&gt;</code> — « ajoute les outils d’entrée/sortie ». Sans
          ça, <code>cout</code> n’existe pas ;</li>
          <li><code>using namespace std;</code> — évite d’écrire <code>std::cout</code> partout ;</li>
          <li><code>int main() { … }</code> — <strong>le point d’entrée</strong>. C’est ici que le
          programme commence, toujours. Sans <code>main</code>, rien ne se lance ;</li>
          <li><code>return 0;</code> — « tout s’est bien passé ».</li>
        </ul>
        <p><strong>Ce que ça change par rapport à Python :</strong> en Python, une ligne seule
        s’exécute. En C++, le code doit vivre <em>à l’intérieur</em> d’une fonction, et le
        programme démarre par <code>main</code>. C’est plus lourd à écrire — c’est aussi ce qui
        rend le C++ rapide.</p>
      `,
      en: `
        <p>C++ is the language of video games, 3D engines and programs that must be fast. It is
        more demanding than Python: it guesses nothing, you have to tell it everything.</p>
        <p>Every program starts with the same skeleton:</p>
        <pre>#include &lt;iostream&gt;
using namespace std;

int main() {
    cout &lt;&lt; "Hello!" &lt;&lt; endl;
    return 0;
}</pre>
        <p>Line by line:</p>
        <ul>
          <li><code>#include &lt;iostream&gt;</code> — "add the input/output tools". Without it
          <code>cout</code> does not exist;</li>
          <li><code>using namespace std;</code> — saves writing <code>std::cout</code> everywhere;</li>
          <li><code>int main() { … }</code> — <strong>the entry point</strong>. This is where the
          program begins, always. Without <code>main</code>, nothing runs;</li>
          <li><code>return 0;</code> — "everything went fine".</li>
        </ul>
        <p><strong>What changes from Python:</strong> in Python a lone line runs. In C++ code must
        live <em>inside</em> a function, and the program starts at <code>main</code>. It is heavier
        to write — and it is also what makes C++ fast.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Mon premier programme C++" << endl;\n    return 0;\n}',
      note: {
        fr: 'Ces sept lignes sont le point de départ de tous tes programmes C++.',
        en: 'These seven lines are the starting point of every C++ program you will write.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris le squelette complet d’un programme C++ qui affiche exactement :</p><p><code>Je code en C++ !</code></p><p>Il te faut les quatre éléments : l’<code>#include</code>, le <code>using namespace</code>, le <code>int main()</code> et le <code>return 0;</code>.</p>',
        en: '<p>Write the complete skeleton of a C++ program printing exactly:</p><p><code>Je code en C++ !</code></p><p>You need all four elements: the <code>#include</code>, the <code>using namespace</code>, the <code>int main()</code> and the <code>return 0;</code>.</p>',
      },
      depart: '// Écris ton programme complet ici\n',
      verifications: [
        {
          type: 'codeContient',
          motif: '#include\\s*<iostream>',
          message: {
            fr: 'Sans <code>#include &lt;iostream&gt;</code>, <code>cout</code> n’existe pas.',
            en: 'Without <code>#include &lt;iostream&gt;</code>, <code>cout</code> does not exist.',
          },
        },
        {
          type: 'codeContient',
          motif: 'int\\s+main\\s*\\(',
          message: {
            fr: 'Il manque le point d’entrée : <code>int main() { … }</code>.',
            en: 'The entry point is missing: <code>int main() { … }</code>.',
          },
        },
        { type: 'sortieEgale', valeur: 'Je code en C++ !' },
      ],
      indices: [
        {
          fr: 'Commence par les deux lignes du haut : <code>#include &lt;iostream&gt;</code> puis <code>using namespace std;</code>.',
          en: 'Start with the two top lines: <code>#include &lt;iostream&gt;</code> then <code>using namespace std;</code>.',
        },
        {
          fr: 'Puis ouvre <code>int main() {</code> et ferme avec <code>}</code>.',
          en: 'Then open <code>int main() {</code> and close with <code>}</code>.',
        },
        {
          fr: 'À l’intérieur : <code>cout &lt;&lt; "Je code en C++ !" &lt;&lt; endl;</code> puis <code>return 0;</code>',
          en: 'Inside: <code>cout &lt;&lt; "Je code en C++ !" &lt;&lt; endl;</code> then <code>return 0;</code>',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Je code en C++ !" << endl;\n    return 0;\n}',
    },
  },

  'cpp-1-2': {
    langage: 'cpp',
    xp: 20,
    objectif: {
      fr: 'Afficher du texte et des nombres avec cout.',
      en: 'Print text and numbers with cout.',
    },
    explication: {
      fr: `
        <p><code>cout</code> se lit « c-out », pour <em>character output</em> : la sortie de
        caractères. Les deux chevrons <code>&lt;&lt;</code> sont un <strong>tapis roulant</strong>
        qui pousse les choses vers l’écran.</p>
        <pre>cout &lt;&lt; "Score : " &lt;&lt; 42 &lt;&lt; " points" &lt;&lt; endl;</pre>
        <p>On peut enchaîner autant de morceaux qu’on veut, en alternant texte et nombres. Et,
        contrairement au JavaScript, <strong>pas besoin de convertir</strong> : <code>cout</code>
        sait afficher un nombre aussi bien qu’un texte.</p>
        <ul>
          <li>le <strong>texte</strong> va entre guillemets doubles : <code>"Bonjour"</code> ;</li>
          <li>les <strong>nombres</strong> s’écrivent nus : <code>42</code> ;</li>
          <li>les espaces doivent être <em>dans</em> les guillemets, sinon tout se colle.</li>
        </ul>
        <p>Les accents fonctionnent : <code>cout &lt;&lt; "Félicitations !"</code> s’affiche
        correctement.</p>
        <p><strong>Le sens des chevrons compte :</strong> <code>&lt;&lt;</code> pousse
        <em>vers</em> l’écran. Tu verras bientôt <code>&gt;&gt;</code> avec <code>cin</code>, qui
        va dans l’autre sens — du clavier vers une variable. Les flèches montrent le trajet.</p>
      `,
      en: `
        <p><code>cout</code> reads as "c-out", for <em>character output</em>. The two angle
        brackets <code>&lt;&lt;</code> are a <strong>conveyor belt</strong> pushing things towards
        the screen.</p>
        <pre>cout &lt;&lt; "Score: " &lt;&lt; 42 &lt;&lt; " points" &lt;&lt; endl;</pre>
        <p>You can chain as many pieces as you like, alternating text and numbers. And, unlike
        JavaScript, <strong>no conversion needed</strong>: <code>cout</code> knows how to print a
        number as well as text.</p>
        <ul>
          <li><strong>text</strong> goes in double quotes: <code>"Bonjour"</code>;</li>
          <li><strong>numbers</strong> are written bare: <code>42</code>;</li>
          <li>spaces must be <em>inside</em> the quotes, or everything runs together.</li>
        </ul>
        <p>Accents work: <code>cout &lt;&lt; "Félicitations !"</code> prints correctly.</p>
        <p><strong>The direction of the brackets matters:</strong> <code>&lt;&lt;</code> pushes
        <em>towards</em> the screen. You will soon meet <code>&gt;&gt;</code> with
        <code>cin</code>, going the other way — from keyboard into a variable. The arrows show the
        journey.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Joueur : Nova" << endl;\n    cout << "Score : " << 1240 << " points" << endl;\n    cout << "Niveau " << 7 << " sur " << 10 << endl;\n    return 0;\n}',
      note: {
        fr: 'Texte et nombres s’enchaînent sur la même ligne, séparés par des <code>&lt;&lt;</code>.',
        en: 'Text and numbers chain on the same line, separated by <code>&lt;&lt;</code>.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Affiche exactement cette ligne, en mélangeant texte et nombres :</p><p><code>J’ai 12 ans et 3 frères</code></p><p>Les deux nombres doivent être écrits <strong>sans guillemets</strong>.</p>',
        en: '<p>Print exactly this line, mixing text and numbers:</p><p><code>J’ai 12 ans et 3 frères</code></p><p>Both numbers must be written <strong>without quotes</strong>.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Un seul cout, avec du texte et deux nombres\n    return 0;\n}',
      verifications: [
        { type: 'sortieEgale', valeur: 'J’ai 12 ans et 3 frères' },
        {
          type: 'codeNeContientPas',
          motif: '"12"|"3"',
          message: {
            fr: 'Les nombres s’écrivent sans guillemets : <code>12</code>, et non <code>"12"</code>.',
            en: 'Numbers are written without quotes: <code>12</code>, not <code>"12"</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Alterne : un morceau de texte, un nombre, un morceau de texte, un nombre.',
          en: 'Alternate: a piece of text, a number, a piece of text, a number.',
        },
        {
          fr: 'Attention aux espaces : ils sont <em>dans</em> les guillemets, comme dans <code>" ans et "</code>.',
          en: 'Mind the spaces: they live <em>inside</em> the quotes, as in <code>" ans et "</code>.',
        },
        {
          fr: '<code>cout &lt;&lt; "J’ai " &lt;&lt; 12 &lt;&lt; " ans et " &lt;&lt; 3 &lt;&lt; " frères" &lt;&lt; endl;</code>',
          en: '<code>cout &lt;&lt; "J’ai " &lt;&lt; 12 &lt;&lt; " ans et " &lt;&lt; 3 &lt;&lt; " frères" &lt;&lt; endl;</code>',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "J’ai " << 12 << " ans et " << 3 << " frères" << endl;\n    return 0;\n}',
    },
  },

  'cpp-1-3': {
    langage: 'cpp',
    xp: 20,
    objectif: {
      fr: 'Maîtriser le passage à la ligne, et savoir quand il manque.',
      en: 'Master line breaks, and notice when one is missing.',
    },
    explication: {
      fr: `
        <p><code>cout</code> ne va <strong>jamais</strong> à la ligne tout seul. Trois
        <code>cout</code> à la suite écrivent tout sur une seule ligne, collés :</p>
        <pre>cout &lt;&lt; "un";
cout &lt;&lt; "deux";
cout &lt;&lt; "trois";      // affiche : undeuxtrois</pre>
        <p>Pour aller à la ligne, deux moyens équivalents :</p>
        <ul>
          <li><code>endl</code> — « end line », à pousser dans le tapis roulant ;</li>
          <li><code>"\\n"</code> — un caractère spécial, à l’intérieur du texte.</li>
        </ul>
        <pre>cout &lt;&lt; "un" &lt;&lt; endl;
cout &lt;&lt; "deux\\ntrois" &lt;&lt; endl;</pre>
        <p>Les deux donnent le même résultat. <code>endl</code> est plus lisible pour un débutant ;
        <code>\\n</code> est plus court et permet plusieurs sauts dans un même texte.</p>
        <p><strong>Le symptôme à reconnaître :</strong> quand ton programme affiche
        <code>BonjourAu revoir</code> au lieu de deux lignes, ce n’est jamais une panne — c’est un
        <code>endl</code> oublié.</p>
      `,
      en: `
        <p><code>cout</code> <strong>never</strong> breaks the line by itself. Three
        <code>cout</code> lines in a row write everything on one line, stuck together:</p>
        <pre>cout &lt;&lt; "un";
cout &lt;&lt; "deux";
cout &lt;&lt; "trois";      // prints: undeuxtrois</pre>
        <p>Two equivalent ways to break the line:</p>
        <ul>
          <li><code>endl</code> — "end line", pushed onto the conveyor belt;</li>
          <li><code>"\\n"</code> — a special character, inside the text.</li>
        </ul>
        <pre>cout &lt;&lt; "un" &lt;&lt; endl;
cout &lt;&lt; "deux\\ntrois" &lt;&lt; endl;</pre>
        <p>Both give the same result. <code>endl</code> reads better for a beginner;
        <code>\\n</code> is shorter and allows several breaks inside one string.</p>
        <p><strong>The symptom to recognise:</strong> when your program prints
        <code>BonjourAu revoir</code> instead of two lines, it is never a fault — it is a
        forgotten <code>endl</code>.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Sans retour : ";\n    cout << "un";\n    cout << "deux" << endl;\n\n    cout << "Avec retour :" << endl;\n    cout << "un" << endl;\n    cout << "deux\\ntrois" << endl;\n    return 0;\n}',
      note: {
        fr: 'La première partie se colle, la seconde s’étale. Le <code>\\n</code> de la fin fait un saut de plus.',
        en: 'The first part runs together, the second spreads out. The final <code>\\n</code> adds one more break.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Affiche ta carte d’identité de joueur, sur <strong>exactement trois lignes</strong> :</p><pre>Pseudo : Nova\nNiveau : 7\nScore : 1240</pre>',
        en: '<p>Print your player card, on <strong>exactly three lines</strong>:</p><pre>Pseudo : Nova\nNiveau : 7\nScore : 1240</pre>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Pseudo : Nova";\n    cout << "Niveau : 7";\n    cout << "Score : 1240";\n    return 0;\n}',
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: 'Pseudo : Nova' },
        { type: 'sortieContient', valeur: 'Score : 1240' },
      ],
      indices: [
        {
          fr: 'Le code de départ affiche tout collé : il lui manque quelque chose à la fin de chaque ligne.',
          en: 'The starting code prints everything stuck together: something is missing at the end of each line.',
        },
        {
          fr: 'Ajoute <code>&lt;&lt; endl</code> avant le point-virgule de chaque <code>cout</code>.',
          en: 'Add <code>&lt;&lt; endl</code> before the semicolon of each <code>cout</code>.',
        },
        {
          fr: '<code>cout &lt;&lt; "Pseudo : Nova" &lt;&lt; endl;</code> — et pareil pour les deux autres.',
          en: '<code>cout &lt;&lt; "Pseudo : Nova" &lt;&lt; endl;</code> — and the same for the other two.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Pseudo : Nova" << endl;\n    cout << "Niveau : 7" << endl;\n    cout << "Score : 1240" << endl;\n    return 0;\n}',
    },
  },

  'cpp-1-4': {
    langage: 'cpp',
    xp: 25,
    objectif: {
      fr: 'Lire un message d’erreur et réparer un programme cassé.',
      en: 'Read an error message and repair a broken program.',
    },
    explication: {
      fr: `
        <p>En C++, <strong>chaque instruction se termine par un point-virgule</strong>. Ce n’est
        pas une décoration : c’est ce qui dit au compilateur « j’ai fini ma phrase ».</p>
        <p>Quand il en manque un, le compilateur continue à lire la ligne suivante comme si elle
        faisait partie de la même phrase — et se plaint souvent <strong>une ligne trop tard</strong>.</p>
        <pre>cout &lt;&lt; "Bonjour"      &lt;-- point-virgule oublié
return 0;                 &lt;-- l'erreur est signalée ICI</pre>
        <p><strong>Le réflexe qui te fera gagner des heures :</strong> quand une erreur pointe une
        ligne qui te semble parfaite, regarde la ligne <em>au-dessus</em>. Neuf fois sur dix, le
        coupable est là.</p>
        <p>Les trois oublis les plus fréquents chez un débutant :</p>
        <ul>
          <li>le point-virgule en fin d’instruction ;</li>
          <li>une accolade <code>}</code> non refermée ;</li>
          <li>un guillemet fermant manquant.</li>
        </ul>
        <p>Et surtout : <strong>une erreur de compilation n’est pas un échec.</strong> C’est le
        compilateur qui t’évite un programme cassé. Tous les développeurs du monde en voient
        chaque jour.</p>
      `,
      en: `
        <p>In C++, <strong>every instruction ends with a semicolon</strong>. It is not decoration:
        it is what tells the compiler "I have finished my sentence".</p>
        <p>When one is missing, the compiler keeps reading the next line as if it were part of the
        same sentence — and often complains <strong>one line too late</strong>.</p>
        <pre>cout &lt;&lt; "Bonjour"      &lt;-- forgotten semicolon
return 0;                 &lt;-- the error is reported HERE</pre>
        <p><strong>The reflex that will save you hours:</strong> when an error points at a line
        that looks perfect, look at the line <em>above</em>. Nine times out of ten, that is the
        culprit.</p>
        <p>The three most frequent beginner slips:</p>
        <ul>
          <li>the semicolon at the end of an instruction;</li>
          <li>an unclosed <code>}</code> brace;</li>
          <li>a missing closing quote.</li>
        </ul>
        <p>And above all: <strong>a compile error is not a failure.</strong> It is the compiler
        saving you from a broken program. Every developer in the world sees them daily.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Il manque un point-virgule ici"\n    return 0;\n}',
      erreurAttendue: true,
      note: {
        fr: 'Exécute-le pour voir : l’erreur pointe la ligne du <code>return</code>, alors que le coupable est au-dessus.',
        en: 'Run it and see: the error points at the <code>return</code> line, while the culprit is above.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Ce programme ne compile pas : <strong>trois</strong> points-virgules ont disparu.</p><p>Répare-le pour qu’il affiche ses trois lignes. Exécute-le d’abord pour lire l’erreur — c’est elle qui t’oriente.</p>',
        en: '<p>This program does not compile: <strong>three</strong> semicolons have vanished.</p><p>Repair it so it prints its three lines. Run it first to read the error — it is what points you in the right direction.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int vies = 3\n    cout << "Vies restantes : " << vies << endl;\n    cout << "Bonne chance !" << endl\n    cout << "Que le meilleur gagne" << endl;\n    return 0\n}',
      verifications: [
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: 'Vies restantes : 3' },
        { type: 'sortieContient', valeur: 'Que le meilleur gagne' },
      ],
      indices: [
        {
          fr: 'Exécute le programme : le message te donne un numéro de ligne. Regarde celle-là, puis celle du dessus.',
          en: 'Run the program: the message gives you a line number. Look at it, then at the one above.',
        },
        {
          fr: 'La première ligne fautive est <code>int vies = 3</code> — une déclaration est une instruction comme une autre.',
          en: 'The first faulty line is <code>int vies = 3</code> — a declaration is an instruction like any other.',
        },
        {
          fr: 'Les deux autres sont le <code>cout &lt;&lt; "Bonne chance !" &lt;&lt; endl</code> et le <code>return 0</code>.',
          en: 'The other two are <code>cout &lt;&lt; "Bonne chance !" &lt;&lt; endl</code> and <code>return 0</code>.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int vies = 3;\n    cout << "Vies restantes : " << vies << endl;\n    cout << "Bonne chance !" << endl;\n    cout << "Que le meilleur gagne" << endl;\n    return 0;\n}',
    },
  },

  /* ===================================================== Module 2 ========= */

  'cpp-2-1': {
    langage: 'cpp',
    xp: 25,
    objectif: {
      fr: 'Déclarer une variable en annonçant son type.',
      en: 'Declare a variable by announcing its type.',
    },
    explication: {
      fr: `
        <p>Voici la grande différence avec Python et JavaScript : en C++, il faut
        <strong>annoncer le type</strong> de chaque variable avant de l’utiliser.</p>
        <pre>int vies = 3;
double moyenne = 14.5;
bool gagne = true;
char initiale = 'T';</pre>
        <ul>
          <li><code>int</code> — un nombre entier ;</li>
          <li><code>double</code> — un nombre à virgule (avec un <strong>point</strong> :
          <code>14.5</code>) ;</li>
          <li><code>bool</code> — vrai ou faux ;</li>
          <li><code>char</code> — <strong>un seul</strong> caractère, entre apostrophes simples.</li>
        </ul>
        <p>Remarque bien : <code>'T'</code> avec des apostrophes simples pour un caractère,
        <code>"Théo"</code> avec des guillemets doubles pour du texte. En C++ ce ne sont pas du
        tout les mêmes choses.</p>
        <p>Et <code>const</code> devant une variable la rend définitive :
        <code>const int MAX_VIES = 3;</code> — toute tentative de la modifier sera refusée par le
        compilateur.</p>
        <p><strong>Pourquoi cette lourdeur ?</strong> Parce que connaître le type à l’avance permet
        au C++ de réserver exactement la bonne place en mémoire, et d’aller beaucoup plus vite.
        C’est le marché du C++ : tu écris plus, la machine travaille moins.</p>
        <p>Attention : un <code>bool</code> affiché par <code>cout</code> apparaît comme
        <code>1</code> ou <code>0</code>, pas comme <code>true</code> ou <code>false</code>.</p>
      `,
      en: `
        <p>Here is the big difference from Python and JavaScript: in C++ you must
        <strong>announce the type</strong> of every variable before using it.</p>
        <pre>int vies = 3;
double moyenne = 14.5;
bool gagne = true;
char initiale = 'T';</pre>
        <ul>
          <li><code>int</code> — a whole number;</li>
          <li><code>double</code> — a decimal number (with a <strong>dot</strong>:
          <code>14.5</code>);</li>
          <li><code>bool</code> — true or false;</li>
          <li><code>char</code> — <strong>one single</strong> character, in single quotes.</li>
        </ul>
        <p>Notice: <code>'T'</code> with single quotes for a character, <code>"Théo"</code> with
        double quotes for text. In C++ these are not the same thing at all.</p>
        <p>And <code>const</code> in front makes a variable final:
        <code>const int MAX_VIES = 3;</code> — any attempt to change it is refused by the
        compiler.</p>
        <p><strong>Why the extra weight?</strong> Because knowing the type in advance lets C++
        reserve exactly the right amount of memory, and run much faster. That is the C++ bargain:
        you write more, the machine works less.</p>
        <p>Careful: a <code>bool</code> printed by <code>cout</code> shows as <code>1</code> or
        <code>0</code>, not as <code>true</code> or <code>false</code>.</p>
      `,
    },
    exemple: {
      code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int vies = 3;\n    double moyenne = 14.5;\n    bool gagne = true;\n    char initiale = 'N';\n\n    cout << \"Vies : \" << vies << endl;\n    cout << \"Moyenne : \" << moyenne << endl;\n    cout << \"Gagné : \" << gagne << endl;\n    cout << \"Initiale : \" << initiale << endl;\n    return 0;\n}",
      note: {
        fr: 'Le <code>bool</code> s’affiche <code>1</code> : c’est normal, c’est comme ça que le C++ le représente.',
        en: 'The <code>bool</code> prints as <code>1</code>: that is normal, it is how C++ represents it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Déclare trois variables avec le bon type :</p><ul><li><code>age</code>, un entier valant <code>12</code> ;</li><li><code>taille</code>, un nombre à virgule valant <code>1.52</code> ;</li><li><code>groupe</code>, un caractère valant <code>\'B\'</code>.</li></ul><p>Puis affiche-les sur trois lignes, sous la forme <code>Age : 12</code>, <code>Taille : 1.52</code>, <code>Groupe : B</code>.</p>',
        en: '<p>Declare three variables with the right type:</p><ul><li><code>age</code>, an integer equal to <code>12</code>;</li><li><code>taille</code>, a decimal equal to <code>1.52</code>;</li><li><code>groupe</code>, a character equal to <code>\'B\'</code>.</li></ul><p>Then print them on three lines, as <code>Age : 12</code>, <code>Taille : 1.52</code>, <code>Groupe : B</code>.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Trois déclarations, puis trois cout\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'int\\s+age',
          message: {
            fr: 'Un âge est un entier : <code>int age = 12;</code>',
            en: 'An age is a whole number: <code>int age = 12;</code>',
          },
        },
        {
          type: 'codeContient',
          motif: 'double\\s+taille',
          message: {
            fr: 'Une taille a une virgule : <code>double taille = 1.52;</code>',
            en: 'A height has decimals: <code>double taille = 1.52;</code>',
          },
        },
        {
          type: 'codeContient',
          motif: "char\\s+groupe",
          message: {
            fr: 'Un seul caractère, donc <code>char groupe = \'B\';</code> avec des apostrophes simples.',
            en: 'A single character, so <code>char groupe = \'B\';</code> with single quotes.',
          },
        },
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: 'Age : 12' },
        { type: 'sortieContient', valeur: 'Taille : 1.52' },
        { type: 'sortieContient', valeur: 'Groupe : B' },
      ],
      indices: [
        {
          fr: 'Le type se met <strong>avant</strong> le nom : <code>int age = 12;</code>',
          en: 'The type goes <strong>before</strong> the name: <code>int age = 12;</code>',
        },
        {
          fr: 'Le nombre à virgule s’écrit avec un point, jamais une virgule : <code>1.52</code>.',
          en: 'The decimal number uses a dot, never a comma: <code>1.52</code>.',
        },
        {
          fr: 'Puis <code>cout &lt;&lt; "Age : " &lt;&lt; age &lt;&lt; endl;</code>, et pareil pour les deux autres.',
          en: 'Then <code>cout &lt;&lt; "Age : " &lt;&lt; age &lt;&lt; endl;</code>, and the same for the other two.',
        },
      ],
      solution:
        "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 12;\n    double taille = 1.52;\n    char groupe = 'B';\n\n    cout << \"Age : \" << age << endl;\n    cout << \"Taille : \" << taille << endl;\n    cout << \"Groupe : \" << groupe << endl;\n    return 0;\n}",
    },
  },

  'cpp-2-2': {
    langage: 'cpp',
    xp: 30,
    objectif: {
      fr: 'Calculer en C++, et éviter le piège de la division entière.',
      en: 'Do maths in C++, and dodge the integer-division trap.',
    },
    explication: {
      fr: `
        <p>Les opérations sont celles que tu connais : <code>+</code>, <code>-</code>,
        <code>*</code>, <code>/</code>, et <code>%</code> qui donne le <strong>reste</strong> d’une
        division. Les priorités aussi : la multiplication avant l’addition, les parenthèses
        d’abord.</p>
        <p>Mais il y a un piège que le C++ ne signale <strong>jamais</strong> :</p>
        <pre>cout &lt;&lt; 7 / 2 &lt;&lt; endl;      // affiche 3, pas 3.5 !</pre>
        <p>Deux entiers divisés donnent un <strong>entier</strong>. Le C++ ne fait pas d’arrondi :
        il jette la partie décimale, sans un mot. Ton programme donne un résultat faux et tourne
        parfaitement.</p>
        <p>Deux façons de s’en sortir :</p>
        <pre>cout &lt;&lt; 7.0 / 2 &lt;&lt; endl;    // 3.5 — un seul des deux suffit

double total = 7;
cout &lt;&lt; total / 2 &lt;&lt; endl;   // 3.5 — la variable est un double</pre>
        <p>Et <code>%</code>, le modulo, est plus utile qu’il n’en a l’air :
        <code>n % 2 == 0</code> teste si un nombre est pair, <code>secondes % 60</code> donne les
        secondes restantes d’une minute.</p>
        <p><strong>Retiens ceci :</strong> dès qu’une moyenne ou un pourcentage est en jeu, il te
        faut un <code>double</code> quelque part. C’est le bug numéro un des débutants en C++, et
        il est silencieux.</p>
      `,
      en: `
        <p>The operations are the ones you know: <code>+</code>, <code>-</code>, <code>*</code>,
        <code>/</code>, and <code>%</code> which gives the <strong>remainder</strong> of a
        division. Precedence too: multiplication before addition, brackets first.</p>
        <p>But there is a trap C++ <strong>never</strong> warns you about:</p>
        <pre>cout &lt;&lt; 7 / 2 &lt;&lt; endl;      // prints 3, not 3.5!</pre>
        <p>Two integers divided give an <strong>integer</strong>. C++ does not round: it throws the
        decimal part away, without a word. Your program gives a wrong answer and runs perfectly.</p>
        <p>Two ways out:</p>
        <pre>cout &lt;&lt; 7.0 / 2 &lt;&lt; endl;    // 3.5 — one of the two is enough

double total = 7;
cout &lt;&lt; total / 2 &lt;&lt; endl;   // 3.5 — the variable is a double</pre>
        <p>And <code>%</code>, the modulo, is more useful than it looks: <code>n % 2 == 0</code>
        tests whether a number is even, <code>secondes % 60</code> gives the seconds left in a
        minute.</p>
        <p><strong>Remember this:</strong> as soon as an average or a percentage is involved, you
        need a <code>double</code> somewhere. It is the number one beginner bug in C++, and it is
        silent.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "7 / 2 en entiers  : " << 7 / 2 << endl;\n    cout << "7.0 / 2 en réels  : " << 7.0 / 2 << endl;\n    cout << "Reste de 7 / 2    : " << 7 % 2 << endl;\n    cout << "Priorites : " << 2 + 3 * 4 << " et " << (2 + 3) * 4 << endl;\n    return 0;\n}',
      note: {
        fr: 'Les deux premières lignes se ressemblent et ne donnent pas le même résultat. C’est tout le piège.',
        en: 'The first two lines look alike and give different results. That is the whole trap.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Trois notes : <code>12</code>, <code>15</code> et <code>16</code>. Leur somme fait 43, et leur moyenne <strong>14.3333</strong>.</p><p>Affiche exactement :</p><pre>Somme : 43\nMoyenne : 14.3333</pre><p>Attention : si tu obtiens <code>14</code>, tu es tombé dans le piège de la division entière.</p>',
        en: '<p>Three marks: <code>12</code>, <code>15</code> and <code>16</code>. Their sum is 43, their average <strong>14.3333</strong>.</p><p>Print exactly:</p><pre>Somme : 43\nMoyenne : 14.3333</pre><p>Careful: if you get <code>14</code>, you fell into the integer-division trap.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 12;\n    int b = 15;\n    int c = 16;\n\n    cout << "Somme : " << a + b + c << endl;\n    cout << "Moyenne : " << (a + b + c) / 3 << endl;\n    return 0;\n}',
      verifications: [
        { type: 'sortieContient', valeur: 'Somme : 43' },
        {
          type: 'sortieContient',
          valeur: 'Moyenne : 14.3333',
          message: {
            fr: 'Ta moyenne est fausse : trois entiers divisés par un entier donnent un entier. Il faut un <code>double</code> dans le calcul.',
            en: 'Your average is wrong: three integers divided by an integer give an integer. You need a <code>double</code> in the calculation.',
          },
        },
      ],
      indices: [
        {
          fr: 'Exécute le code de départ tel quel : il affiche <code>14</code>. Tu vois le bug silencieux en vrai.',
          en: 'Run the starting code as is: it prints <code>14</code>. There is the silent bug, live.',
        },
        {
          fr: 'Il suffit qu’<strong>un seul</strong> des nombres du calcul soit un réel.',
          en: 'It is enough for <strong>one</strong> of the numbers in the calculation to be a real.',
        },
        {
          fr: 'Remplace <code>/ 3</code> par <code>/ 3.0</code>.',
          en: 'Replace <code>/ 3</code> with <code>/ 3.0</code>.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 12;\n    int b = 15;\n    int c = 16;\n\n    cout << "Somme : " << a + b + c << endl;\n    cout << "Moyenne : " << (a + b + c) / 3.0 << endl;\n    return 0;\n}',
    },
  },

  'cpp-2-3': {
    langage: 'cpp',
    xp: 30,
    objectif: {
      fr: 'Lire ce que l’utilisateur tape au clavier avec cin.',
      en: 'Read what the user types on the keyboard with cin.',
    },
    explication: {
      fr: `
        <p><code>cin</code> est le miroir de <code>cout</code> : au lieu de pousser vers l’écran,
        il tire depuis le clavier. Et les chevrons changent de sens :</p>
        <pre>int age;
cout &lt;&lt; "Quel âge as-tu ? ";
cin &gt;&gt; age;
cout &lt;&lt; "Dans 10 ans tu auras " &lt;&lt; age + 10 &lt;&lt; " ans." &lt;&lt; endl;</pre>
        <p><code>cin &gt;&gt; age</code> se lit : « prends ce qui est tapé et mets-le
        <em>dans</em> <code>age</code> ». La flèche montre le trajet, du clavier vers la
        variable.</p>
        <p>Il faut avoir <strong>déclaré la variable avant</strong> : le C++ doit savoir dans quel
        genre de boîte il range ce qu’on lui donne.</p>
        <p>Pour du texte, le C++ historique utilise un tableau de caractères :</p>
        <pre>char pseudo[20];
cin &gt;&gt; pseudo;</pre>
        <p>Vingt caractères réservés d’avance. Deux limites importantes et honnêtes :
        <code>cin &gt;&gt; pseudo</code> s’arrête au <strong>premier espace</strong>, et ce type
        ne sait pas encaisser les <strong>accents</strong> — un pseudo comme <code>Théo</code>
        ferait planter le programme. Écris donc ton pseudo sans accent.</p>
        <p>C’est la forme historique du texte en C++. <code>std::string</code>, la forme moderne
        que tu rencontreras plus tard, règle ces deux problèmes.</p>
      `,
      en: `
        <p><code>cin</code> is the mirror of <code>cout</code>: instead of pushing to the screen,
        it pulls from the keyboard. And the brackets change direction:</p>
        <pre>int age;
cout &lt;&lt; "How old are you? ";
cin &gt;&gt; age;
cout &lt;&lt; "In 10 years you will be " &lt;&lt; age + 10 &lt;&lt; "." &lt;&lt; endl;</pre>
        <p><code>cin &gt;&gt; age</code> reads as: "take what was typed and put it
        <em>into</em> <code>age</code>". The arrow shows the journey, keyboard to variable.</p>
        <p>The variable must be <strong>declared first</strong>: C++ needs to know what kind of box
        it is putting the value into.</p>
        <p>For text, historic C++ uses an array of characters:</p>
        <pre>char pseudo[20];
cin &gt;&gt; pseudo;</pre>
        <p>Twenty characters reserved in advance. Two important, honest limits:
        <code>cin &gt;&gt; pseudo</code> stops at the <strong>first space</strong>, and this type
        cannot cope with <strong>accents</strong> — a nickname like <code>Théo</code> would crash
        the program. So write your nickname without accents.</p>
        <p>This is the historic form of text in C++. <code>std::string</code>, the modern form you
        will meet later, fixes both problems.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    char pseudo[20];\n    int niveau;\n\n    cout << "Ton pseudo (sans accent) : ";\n    cin >> pseudo;\n    cout << "Ton niveau : ";\n    cin >> niveau;\n\n    cout << pseudo << " est niveau " << niveau << endl;\n    return 0;\n}',
      note: {
        fr: 'Deux saisies à la suite : le programme attend, tu tapes, il continue.',
        en: 'Two inputs in a row: the program waits, you type, it carries on.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Demande son pseudo puis son score, et affiche le bilan.</p><p>Avec le pseudo <code>Nova</code> et le score <code>1200</code>, ton programme doit afficher, en dernière ligne :</p><p><code>Nova a 1200 points, soit 1400 avec le bonus.</code></p><p>Le bonus est de <code>200</code> points.</p>',
        en: '<p>Ask for a nickname then a score, and print the summary.</p><p>With the nickname <code>Nova</code> and the score <code>1200</code>, your program must print, on its last line:</p><p><code>Nova a 1200 points, soit 1400 avec le bonus.</code></p><p>The bonus is <code>200</code> points.</p>',
      },
      entree: 'Nova\n1200\n',
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    char pseudo[20];\n    int score;\n\n    // Demande le pseudo, puis le score, puis affiche le bilan\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'cin\\s*>>\\s*pseudo',
          message: {
            fr: 'Il faut lire le pseudo au clavier : <code>cin &gt;&gt; pseudo;</code>',
            en: 'You must read the nickname from the keyboard: <code>cin &gt;&gt; pseudo;</code>',
          },
        },
        {
          type: 'codeContient',
          motif: 'cin\\s*>>\\s*score',
          message: {
            fr: 'Il faut aussi lire le score : <code>cin &gt;&gt; score;</code>',
            en: 'You must read the score too: <code>cin &gt;&gt; score;</code>',
          },
        },
        { type: 'sortieContient', valeur: 'Nova a 1200 points, soit 1400 avec le bonus.' },
      ],
      indices: [
        {
          fr: 'Les deux variables sont déjà déclarées : il ne reste qu’à les remplir avec <code>cin</code>.',
          en: 'Both variables are already declared: all that is left is filling them with <code>cin</code>.',
        },
        {
          fr: 'Le bonus se calcule directement dans le <code>cout</code> : <code>score + 200</code>.',
          en: 'The bonus is computed straight inside the <code>cout</code>: <code>score + 200</code>.',
        },
        {
          fr: '<code>cout &lt;&lt; pseudo &lt;&lt; " a " &lt;&lt; score &lt;&lt; " points, soit " &lt;&lt; score + 200 &lt;&lt; " avec le bonus." &lt;&lt; endl;</code>',
          en: '<code>cout &lt;&lt; pseudo &lt;&lt; " a " &lt;&lt; score &lt;&lt; " points, soit " &lt;&lt; score + 200 &lt;&lt; " avec le bonus." &lt;&lt; endl;</code>',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    char pseudo[20];\n    int score;\n\n    cout << "Ton pseudo : ";\n    cin >> pseudo;\n    cout << "Ton score : ";\n    cin >> score;\n\n    cout << pseudo << " a " << score << " points, soit " << score + 200 << " avec le bonus." << endl;\n    return 0;\n}',
    },
  },

  'cpp-2-4': {
    langage: 'cpp',
    xp: 25,
    objectif: {
      fr: 'Faire prendre une décision au programme avec if.',
      en: 'Let the program make a decision with if.',
    },
    explication: {
      fr: `
        <p>La condition en C++ ressemble beaucoup à celle du JavaScript :</p>
        <pre>if (age &gt;= 12) {
    cout &lt;&lt; "Tu peux jouer." &lt;&lt; endl;
}</pre>
        <p>Parenthèses autour de la condition, accolades autour du bloc. Les comparaisons sont les
        mêmes : <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>,
        <code>==</code> pour l’égalité et <code>!=</code> pour la différence.</p>
        <p><strong>Deux signes égal, pas trois.</strong> Le C++ n’a pas le <code>===</code> du
        JavaScript : ici, <code>==</code> compare, <code>=</code> range. Et confondre les deux est
        d’autant plus dangereux que <code>if (vies = 0)</code> <em>compile</em> : il met
        <code>vies</code> à zéro, puis considère la condition comme fausse. Le programme tourne, et
        il est faux.</p>
        <p>Pour combiner : <code>&amp;&amp;</code> pour ET, <code>||</code> pour OU,
        <code>!</code> pour la négation.</p>
        <pre>if (age &gt;= 12 &amp;&amp; taille &gt;= 140) {
    cout &lt;&lt; "Accès autorisé." &lt;&lt; endl;
}</pre>
        <p>Enfin, un détail de style : quand le bloc ne contient qu’une seule instruction, les
        accolades sont facultatives. <strong>Mets-les quand même</strong> — le jour où tu ajoutes
        une deuxième ligne, tu ne te feras pas piéger.</p>
      `,
      en: `
        <p>A condition in C++ looks a lot like the JavaScript one:</p>
        <pre>if (age &gt;= 12) {
    cout &lt;&lt; "You can play." &lt;&lt; endl;
}</pre>
        <p>Parentheses around the condition, braces around the block. The comparisons are the same:
        <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>,
        <code>==</code> for equality and <code>!=</code> for difference.</p>
        <p><strong>Two equals signs, not three.</strong> C++ has no JavaScript
        <code>===</code>: here <code>==</code> compares, <code>=</code> assigns. And confusing them
        is all the more dangerous because <code>if (vies = 0)</code> <em>compiles</em>: it sets
        <code>vies</code> to zero, then treats the condition as false. The program runs, and it is
        wrong.</p>
        <p>To combine: <code>&amp;&amp;</code> for AND, <code>||</code> for OR, <code>!</code> for
        NOT.</p>
        <pre>if (age &gt;= 12 &amp;&amp; taille &gt;= 140) {
    cout &lt;&lt; "Access granted." &lt;&lt; endl;
}</pre>
        <p>One style note: when the block holds a single instruction, the braces are optional.
        <strong>Write them anyway</strong> — the day you add a second line, you will not be
        caught out.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int points;\n    cin >> points;\n\n    if (points >= 1000) {\n        cout << "Niveau expert débloqué !" << endl;\n    }\n\n    cout << "Points : " << points << endl;\n    return 0;\n}',
      note: {
        fr: 'La saisie vaut 1200 : la condition est vraie et le message apparaît.',
        en: 'The input is 1200: the condition holds and the message appears.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le programme lit une note sur 20 (ici <code>15</code>).</p><p>Avec un <code>if</code>, affiche <code>Bravo, c’est réussi !</code> quand la note est <strong>supérieure ou égale à 10</strong>.</p><p>Puis, en dehors du <code>if</code>, affiche toujours <code>Note : 15</code>.</p>',
        en: '<p>The program reads a mark out of 20 (here <code>15</code>).</p><p>With an <code>if</code>, print <code>Bravo, c’est réussi !</code> when the mark is <strong>10 or above</strong>.</p><p>Then, outside the <code>if</code>, always print <code>Note : 15</code>.</p>',
      },
      entree: '15\n',
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int note;\n    cin >> note;\n\n    // Ton if ici\n\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'if\\s*\\(',
          message: {
            fr: 'Il faut un vrai <code>if</code> : c’est l’objet de la leçon.',
            en: 'You need a real <code>if</code>: that is the point of this lesson.',
          },
        },
        {
          type: 'codeContient',
          motif: 'note\\s*>=?\\s*10',
          message: {
            fr: 'Compare la note au seuil : <code>note &gt;= 10</code>.',
            en: 'Compare the mark to the threshold: <code>note &gt;= 10</code>.',
          },
        },
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: 'Bravo, c’est réussi !' },
        { type: 'sortieContient', valeur: 'Note : 15' },
      ],
      indices: [
        {
          fr: '<code>if (note &gt;= 10) {</code> puis le <code>cout</code> de félicitations, puis <code>}</code>.',
          en: '<code>if (note &gt;= 10) {</code> then the congratulation <code>cout</code>, then <code>}</code>.',
        },
        {
          fr: 'Le second <code>cout</code> vient <strong>après</strong> l’accolade fermante : il s’affiche toujours.',
          en: 'The second <code>cout</code> comes <strong>after</strong> the closing brace: it always prints.',
        },
        {
          fr: 'N’écris pas <code>note = 10</code> : un seul égal rangerait 10 dans la note.',
          en: 'Do not write <code>note = 10</code>: a single equals would store 10 into the mark.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int note;\n    cin >> note;\n\n    if (note >= 10) {\n        cout << "Bravo, c’est réussi !" << endl;\n    }\n\n    cout << "Note : " << note << endl;\n    return 0;\n}',
    },
  },

  'cpp-2-5': {
    langage: 'cpp',
    xp: 30,
    objectif: {
      fr: 'Traiter plusieurs cas avec else et else if.',
      en: 'Handle several cases with else and else if.',
    },
    explication: {
      fr: `
        <p>Un <code>if</code> tout seul traite un cas. Pour en traiter plusieurs :</p>
        <pre>if (note &gt;= 16) {
    cout &lt;&lt; "Très bien" &lt;&lt; endl;
} else if (note &gt;= 14) {
    cout &lt;&lt; "Bien" &lt;&lt; endl;
} else if (note &gt;= 10) {
    cout &lt;&lt; "Passable" &lt;&lt; endl;
} else {
    cout &lt;&lt; "Insuffisant" &lt;&lt; endl;
}</pre>
        <p><strong>L’ordre décide de tout.</strong> Le programme descend les cas un par un et
        s’arrête au <em>premier</em> qui est vrai. Les suivants ne sont même pas regardés.</p>
        <p>C’est pour ça qu’on va du plus exigeant au moins exigeant. Si tu mettais
        <code>note &gt;= 10</code> en premier, un 18 afficherait « Passable » — la condition est
        vraie, le programme s’arrête là, et tu n’atteindrais jamais « Très bien ».</p>
        <p>Le <code>else</code> final attrape <strong>tout le reste</strong>. Il n’a pas de
        condition, parce qu’il n’en a pas besoin : à ce stade, tous les autres cas ont échoué.</p>
        <p><strong>Le bon test à faire :</strong> essaie mentalement une valeur de chaque
        catégorie — 18, 15, 11, 5. Si les quatre tombent dans la bonne branche, ton enchaînement
        est juste.</p>
      `,
      en: `
        <p>A lone <code>if</code> handles one case. To handle several:</p>
        <pre>if (note &gt;= 16) {
    cout &lt;&lt; "Très bien" &lt;&lt; endl;
} else if (note &gt;= 14) {
    cout &lt;&lt; "Bien" &lt;&lt; endl;
} else if (note &gt;= 10) {
    cout &lt;&lt; "Passable" &lt;&lt; endl;
} else {
    cout &lt;&lt; "Insuffisant" &lt;&lt; endl;
}</pre>
        <p><strong>Order decides everything.</strong> The program walks the cases one by one and
        stops at the <em>first</em> that is true. The rest are not even looked at.</p>
        <p>That is why you go from the most demanding to the least. If you put
        <code>note &gt;= 10</code> first, an 18 would print "Passable" — the condition is true, the
        program stops there, and you would never reach "Très bien".</p>
        <p>The final <code>else</code> catches <strong>everything else</strong>. It has no
        condition because it needs none: by then, every other case has failed.</p>
        <p><strong>The test to run:</strong> mentally try one value from each category — 18, 15,
        11, 5. If all four land in the right branch, your chain is correct.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int heure;\n    cin >> heure;\n\n    if (heure < 12) {\n        cout << "Bonjour !" << endl;\n    } else if (heure < 18) {\n        cout << "Bon après-midi !" << endl;\n    } else {\n        cout << "Bonsoir !" << endl;\n    }\n    return 0;\n}',
      note: {
        fr: 'Ici la saisie vaut 15 : le premier cas échoue, le second passe.',
        en: 'Here the input is 15: the first case fails, the second passes.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le programme lit une note (ici <code>15</code>). Affiche une <strong>seule</strong> appréciation :</p><ul><li><code>Très bien</code> si la note est ≥ 16 ;</li><li><code>Bien</code> si elle est ≥ 14 ;</li><li><code>Passable</code> si elle est ≥ 10 ;</li><li><code>Insuffisant</code> sinon.</li></ul><p>Avec 15, la bonne réponse est donc <code>Bien</code>.</p>',
        en: '<p>The program reads a mark (here <code>15</code>). Print a <strong>single</strong> assessment:</p><ul><li><code>Très bien</code> if the mark is ≥ 16;</li><li><code>Bien</code> if it is ≥ 14;</li><li><code>Passable</code> if it is ≥ 10;</li><li><code>Insuffisant</code> otherwise.</li></ul><p>With 15, the right answer is therefore <code>Bien</code>.</p>',
      },
      entree: '15\n',
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int note;\n    cin >> note;\n\n    // Quatre cas, du plus exigeant au moins exigeant\n\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'else\\s+if',
          message: {
            fr: 'Il faut enchaîner les cas avec <code>else if</code>, pas empiler des <code>if</code> séparés.',
            en: 'Chain the cases with <code>else if</code>, do not stack separate <code>if</code> blocks.',
          },
        },
        {
          type: 'sortieLignes',
          nombre: 1,
          message: {
            fr: 'Une seule appréciation doit s’afficher. Si tu en vois plusieurs, tes <code>if</code> ne sont pas enchaînés.',
            en: 'Only one assessment should print. If you see several, your <code>if</code> blocks are not chained.',
          },
        },
        { type: 'sortieEgale', valeur: 'Bien' },
      ],
      indices: [
        {
          fr: 'Commence par le cas le plus haut : <code>if (note &gt;= 16) {</code>',
          en: 'Start with the highest case: <code>if (note &gt;= 16) {</code>',
        },
        {
          fr: 'Puis <code>} else if (note &gt;= 14) {</code>, et ainsi de suite en descendant.',
          en: 'Then <code>} else if (note &gt;= 14) {</code>, and so on going down.',
        },
        {
          fr: 'Le dernier est un <code>} else {</code> tout court, sans condition.',
          en: 'The last one is just <code>} else {</code>, with no condition.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int note;\n    cin >> note;\n\n    if (note >= 16) {\n        cout << "Très bien" << endl;\n    } else if (note >= 14) {\n        cout << "Bien" << endl;\n    } else if (note >= 10) {\n        cout << "Passable" << endl;\n    } else {\n        cout << "Insuffisant" << endl;\n    }\n\n    return 0;\n}',
    },
  },

  /* ===================================================== Module 3 ========= */

  'cpp-3-1': {
    langage: 'cpp',
    xp: 30,
    objectif: {
      fr: 'Répéter un nombre connu de fois avec une boucle for.',
      en: 'Repeat a known number of times with a for loop.',
    },
    explication: {
      fr: `
        <p>La boucle <code>for</code> du C++ est exactement celle du JavaScript — ce n’est pas un
        hasard, c’est le JavaScript qui l’a copiée sur le C.</p>
        <pre>for (int i = 1; i &lt;= 5; i++) {
    cout &lt;&lt; "Tour " &lt;&lt; i &lt;&lt; endl;
}</pre>
        <p>Trois morceaux entre parenthèses, séparés par des points-virgules :</p>
        <ul>
          <li><code>int i = 1</code> — le point de départ. Remarque le <code>int</code> : même
          ici, il faut annoncer le type ;</li>
          <li><code>i &lt;= 5</code> — tant que c’est vrai, on continue ;</li>
          <li><code>i++</code> — ce qui se passe après chaque tour.</li>
        </ul>
        <p>La variable <code>i</code> n’existe qu’<strong>à l’intérieur</strong> de la boucle. En
        dehors, elle est inconnue — le compilateur refusera de l’utiliser. C’est voulu : ça évite
        de la réutiliser par erreur.</p>
        <p><strong>Le compteur de tours :</strong> <code>for (int i = 0; i &lt; 5; i++)</code> et
        <code>for (int i = 1; i &lt;= 5; i++)</code> font tous les deux cinq tours. Le premier est
        la forme habituelle des programmeurs (parce que les tableaux commencent à zéro), le second
        est plus naturel quand on compte pour un humain.</p>
      `,
      en: `
        <p>The C++ <code>for</code> loop is exactly the JavaScript one — no coincidence: JavaScript
        copied it from C.</p>
        <pre>for (int i = 1; i &lt;= 5; i++) {
    cout &lt;&lt; "Round " &lt;&lt; i &lt;&lt; endl;
}</pre>
        <p>Three pieces in parentheses, separated by semicolons:</p>
        <ul>
          <li><code>int i = 1</code> — the starting point. Note the <code>int</code>: even here
          the type must be announced;</li>
          <li><code>i &lt;= 5</code> — while this is true, keep going;</li>
          <li><code>i++</code> — what happens after each round.</li>
        </ul>
        <p>The <code>i</code> variable exists only <strong>inside</strong> the loop. Outside, it is
        unknown — the compiler will refuse to use it. That is deliberate: it stops you reusing it
        by mistake.</p>
        <p><strong>Counting rounds:</strong> <code>for (int i = 0; i &lt; 5; i++)</code> and
        <code>for (int i = 1; i &lt;= 5; i++)</code> both run five times. The first is the
        programmers’ usual form (because arrays start at zero), the second reads more naturally
        when counting for a human.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        cout << "Tour numéro " << i << endl;\n    }\n\n    for (int i = 10; i >= 1; i--) {\n        cout << i << " ";\n    }\n    cout << endl;\n    return 0;\n}',
      note: {
        fr: 'La seconde boucle descend : <code>i--</code> enlève 1 à chaque tour.',
        en: 'The second loop counts down: <code>i--</code> subtracts 1 each round.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Affiche la table de 8, de 1 à 10, une ligne par résultat :</p><pre>8 x 1 = 8\n8 x 2 = 16\n…\n8 x 10 = 80</pre><p>Avec une boucle — pas dix <code>cout</code>.</p>',
        en: '<p>Print the 8 times table, from 1 to 10, one line per result:</p><pre>8 x 1 = 8\n8 x 2 = 16\n…\n8 x 10 = 80</pre><p>With a loop — not ten <code>cout</code> lines.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Une boucle for, de 1 à 10\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s*\\(',
          message: {
            fr: 'Utilise une boucle <code>for</code> : c’est l’objet de la leçon.',
            en: 'Use a <code>for</code> loop: that is the point of this lesson.',
          },
        },
        { type: 'sortieLignes', nombre: 10 },
        { type: 'sortieContient', valeur: '8 x 1 = 8' },
        { type: 'sortieContient', valeur: '8 x 10 = 80' },
      ],
      indices: [
        {
          fr: '<code>for (int i = 1; i &lt;= 10; i++) {</code>',
          en: '<code>for (int i = 1; i &lt;= 10; i++) {</code>',
        },
        {
          fr: 'Le résultat se calcule directement dans le <code>cout</code> : <code>8 * i</code>.',
          en: 'The result is computed straight in the <code>cout</code>: <code>8 * i</code>.',
        },
        {
          fr: '<code>cout &lt;&lt; "8 x " &lt;&lt; i &lt;&lt; " = " &lt;&lt; 8 * i &lt;&lt; endl;</code>',
          en: '<code>cout &lt;&lt; "8 x " &lt;&lt; i &lt;&lt; " = " &lt;&lt; 8 * i &lt;&lt; endl;</code>',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        cout << "8 x " << i << " = " << 8 * i << endl;\n    }\n    return 0;\n}',
    },
  },

  'cpp-3-2': {
    langage: 'cpp',
    xp: 30,
    objectif: {
      fr: 'Répéter tant qu’une condition tient, avec while.',
      en: 'Repeat while a condition holds, with while.',
    },
    explication: {
      fr: `
        <p>La boucle <code>for</code> sert quand tu sais <strong>combien</strong> de tours faire.
        Quand tu ne le sais pas — « tant que le joueur n’a pas trouvé », « tant qu’il reste des
        vies » — c’est <code>while</code> :</p>
        <pre>int vies = 3;

while (vies &gt; 0) {
    cout &lt;&lt; "Il reste " &lt;&lt; vies &lt;&lt; " vies" &lt;&lt; endl;
    vies--;
}</pre>
        <p><strong>Le danger, c’est la boucle infinie.</strong> Si rien à l’intérieur ne rapproche
        la condition de la fausseté, le programme tourne pour toujours. Ici c’est
        <code>vies--</code> qui sauve tout : oublie-le, et ton programme se fige.</p>
        <p>Avant d’écrire un <code>while</code>, pose-toi toujours la question :
        <em>« qu’est-ce qui, dans mon bloc, va finir par rendre la condition fausse ? »</em> Si tu
        n’as pas de réponse, tu as un bug.</p>
        <p>Il existe une variante, <code>do … while</code>, qui exécute le bloc
        <strong>avant</strong> de tester :</p>
        <pre>do {
    cin &gt;&gt; essai;
} while (essai != secret);</pre>
        <p>Elle garantit au moins un tour. C’est exactement ce qu’il faut pour demander une saisie
        : il faut bien lire une première réponse avant de pouvoir la juger.</p>
      `,
      en: `
        <p>The <code>for</code> loop is for when you know <strong>how many</strong> rounds to run.
        When you do not — "while the player has not guessed", "while lives remain" — that is
        <code>while</code>:</p>
        <pre>int vies = 3;

while (vies &gt; 0) {
    cout &lt;&lt; "Lives left: " &lt;&lt; vies &lt;&lt; endl;
    vies--;
}</pre>
        <p><strong>The danger is the infinite loop.</strong> If nothing inside brings the condition
        closer to false, the program runs forever. Here <code>vies--</code> saves everything: leave
        it out and your program freezes.</p>
        <p>Before writing a <code>while</code>, always ask: <em>"what, inside my block, will
        eventually make the condition false?"</em> If you have no answer, you have a bug.</p>
        <p>There is a variant, <code>do … while</code>, which runs the block
        <strong>before</strong> testing:</p>
        <pre>do {
    cin &gt;&gt; essai;
} while (essai != secret);</pre>
        <p>It guarantees at least one round. That is exactly what you want for reading input: you
        must read a first answer before you can judge it.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int vies = 3;\n\n    while (vies > 0) {\n        cout << "Il reste " << vies << " vies" << endl;\n        vies--;\n    }\n\n    cout << "Game over" << endl;\n    return 0;\n}',
      note: {
        fr: 'Enlève <code>vies--</code> et la boucle ne s’arrêterait jamais. L’application le détecterait et couperait.',
        en: 'Remove <code>vies--</code> and the loop would never stop. The app would detect it and cut in.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Un compte à rebours avec <code>while</code>. Pars de <code>5</code> et descends jusqu’à <code>1</code>, une ligne par nombre, puis une dernière ligne <code>Décollage !</code></p><p>Six lignes en tout.</p>',
        en: '<p>A countdown with <code>while</code>. Start at <code>5</code> and go down to <code>1</code>, one line per number, then a final <code>Décollage !</code> line.</p><p>Six lines in total.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int compte = 5;\n\n    // Une boucle while, puis le décollage\n\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'while\\s*\\(',
          message: {
            fr: 'Utilise <code>while</code> : c’est l’objet de la leçon, pas <code>for</code>.',
            en: 'Use <code>while</code>: that is this lesson’s point, not <code>for</code>.',
          },
        },
        { type: 'sortieLignes', nombre: 6 },
        { type: 'sortieContient', valeur: 'Décollage !' },
      ],
      indices: [
        {
          fr: '<code>while (compte &gt; 0) {</code> — la variable existe déjà.',
          en: '<code>while (compte &gt; 0) {</code> — the variable already exists.',
        },
        {
          fr: 'Dans la boucle : affiche <code>compte</code>, puis diminue-le avec <code>compte--;</code>',
          en: 'In the loop: print <code>compte</code>, then decrease it with <code>compte--;</code>',
        },
        {
          fr: 'Sans le <code>compte--</code>, la boucle tournerait sans fin. Le <code>Décollage !</code> vient après l’accolade fermante.',
          en: 'Without <code>compte--</code> the loop would spin forever. The <code>Décollage !</code> comes after the closing brace.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    int compte = 5;\n\n    while (compte > 0) {\n        cout << compte << endl;\n        compte--;\n    }\n\n    cout << "Décollage !" << endl;\n    return 0;\n}',
    },
  },

  'cpp-3-3': {
    langage: 'cpp',
    xp: 35,
    objectif: {
      fr: 'Ranger plusieurs valeurs dans un tableau et les parcourir.',
      en: 'Store several values in an array and go through them.',
    },
    explication: {
      fr: `
        <p>Un tableau range plusieurs valeurs du <strong>même type</strong>, à la suite :</p>
        <pre>int notes[4] = {12, 15, 8, 17};</pre>
        <p>Le type, le nom, la <strong>taille entre crochets</strong>, puis les valeurs entre
        accolades. Chaque case se lit par sa position, <strong>à partir de zéro</strong> :</p>
        <pre>cout &lt;&lt; notes[0] &lt;&lt; endl;   // 12
cout &lt;&lt; notes[3] &lt;&lt; endl;   // 17</pre>
        <p>Et on le parcourt avec une boucle :</p>
        <pre>for (int i = 0; i &lt; 4; i++) {
    cout &lt;&lt; notes[i] &lt;&lt; endl;
}</pre>
        <p><strong>Le point le plus important de cette leçon.</strong> En C++, un tableau ne connaît
        pas sa propre taille, et <strong>personne ne vérifie que tu restes dedans</strong>. Écrire
        <code>notes[7]</code> sur un tableau de 4 ne provoque aucune erreur : le programme va lire
        ailleurs en mémoire et te renvoyer n’importe quoi.</p>
        <p>C’est ce qui rend le C++ rapide — aucune vérification — et dangereux. Le prix à payer,
        c’est de compter soi-même. Un tableau de taille 4 a des cases de <code>0</code> à
        <code>3</code>, jamais <code>4</code>.</p>
        <p>D’où l’habitude de ranger la taille dans une constante :
        <code>const int TAILLE = 4;</code> — écrite une fois, utilisée partout.</p>
      `,
      en: `
        <p>An array stores several values of the <strong>same type</strong>, in a row:</p>
        <pre>int notes[4] = {12, 15, 8, 17};</pre>
        <p>The type, the name, the <strong>size in square brackets</strong>, then the values in
        braces. Each slot is read by its position, <strong>starting at zero</strong>:</p>
        <pre>cout &lt;&lt; notes[0] &lt;&lt; endl;   // 12
cout &lt;&lt; notes[3] &lt;&lt; endl;   // 17</pre>
        <p>And you walk it with a loop:</p>
        <pre>for (int i = 0; i &lt; 4; i++) {
    cout &lt;&lt; notes[i] &lt;&lt; endl;
}</pre>
        <p><strong>The most important point in this lesson.</strong> In C++ an array does not know
        its own size, and <strong>nobody checks that you stay inside it</strong>. Writing
        <code>notes[7]</code> on an array of 4 raises no error: the program reads elsewhere in
        memory and hands you anything.</p>
        <p>That is what makes C++ fast — no checks — and dangerous. The price is counting yourself.
        An array of size 4 has slots <code>0</code> to <code>3</code>, never <code>4</code>.</p>
        <p>Hence the habit of storing the size in a constant:
        <code>const int TAILLE = 4;</code> — written once, used everywhere.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    const int TAILLE = 4;\n    int notes[TAILLE] = {12, 15, 8, 17};\n\n    for (int i = 0; i < TAILLE; i++) {\n        cout << "Note " << i + 1 << " : " << notes[i] << endl;\n    }\n\n    cout << "La première est " << notes[0] << endl;\n    cout << "La dernière est " << notes[TAILLE - 1] << endl;\n    return 0;\n}',
      note: {
        fr: 'La dernière case est <code>TAILLE - 1</code>, jamais <code>TAILLE</code>.',
        en: 'The last slot is <code>TAILLE - 1</code>, never <code>TAILLE</code>.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le tableau <code>scores</code> contient <code>{120, 340, 75, 260, 190}</code>.</p><p>Parcours-le pour calculer le <strong>total</strong> et trouver le <strong>meilleur</strong>, puis affiche exactement :</p><pre>Total : 985\nMeilleur : 340</pre>',
        en: '<p>The <code>scores</code> array holds <code>{120, 340, 75, 260, 190}</code>.</p><p>Loop through it to compute the <strong>total</strong> and find the <strong>best</strong>, then print exactly:</p><pre>Total : 985\nMeilleur : 340</pre>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    const int TAILLE = 5;\n    int scores[TAILLE] = {120, 340, 75, 260, 190};\n    int total = 0;\n    int meilleur = scores[0];\n\n    // Parcours le tableau : additionne, et garde le plus grand\n\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s*\\(',
          message: {
            fr: 'Il faut une boucle : additionner les cinq à la main ne marcherait plus avec vingt scores.',
            en: 'You need a loop: adding the five by hand would break with twenty scores.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '985|Meilleur\\s*:\\s*"?\\s*340',
          message: {
            fr: 'Le total et le meilleur doivent être calculés par la boucle, pas écrits en dur.',
            en: 'The total and the best must be computed by the loop, not written by hand.',
          },
        },
        { type: 'sortieContient', valeur: 'Total : 985' },
        { type: 'sortieContient', valeur: 'Meilleur : 340' },
      ],
      indices: [
        {
          fr: '<code>for (int i = 0; i &lt; TAILLE; i++) {</code> — de 0 à TAILLE - 1.',
          en: '<code>for (int i = 0; i &lt; TAILLE; i++) {</code> — from 0 to TAILLE - 1.',
        },
        {
          fr: 'Dans la boucle : <code>total = total + scores[i];</code>',
          en: 'In the loop: <code>total = total + scores[i];</code>',
        },
        {
          fr: 'Et pour le meilleur : <code>if (scores[i] &gt; meilleur) { meilleur = scores[i]; }</code>. Les deux <code>cout</code> viennent après la boucle.',
          en: 'And for the best: <code>if (scores[i] &gt; meilleur) { meilleur = scores[i]; }</code>. Both <code>cout</code> lines come after the loop.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    const int TAILLE = 5;\n    int scores[TAILLE] = {120, 340, 75, 260, 190};\n    int total = 0;\n    int meilleur = scores[0];\n\n    for (int i = 0; i < TAILLE; i++) {\n        total = total + scores[i];\n        if (scores[i] > meilleur) {\n            meilleur = scores[i];\n        }\n    }\n\n    cout << "Total : " << total << endl;\n    cout << "Meilleur : " << meilleur << endl;\n    return 0;\n}',
    },
  },

  'cpp-3-4': {
    langage: 'cpp',
    xp: 35,
    objectif: {
      fr: 'Écrire ta propre fonction, avec son type de retour.',
      en: 'Write your own function, with its return type.',
    },
    explication: {
      fr: `
        <p>Une fonction C++ ressemble à celles que tu connais, avec une exigence de plus : il faut
        annoncer <strong>ce qu’elle renvoie</strong>.</p>
        <pre>int carre(int n) {
    return n * n;
}</pre>
        <p>Le premier <code>int</code> est le <strong>type de retour</strong> : cette fonction rend
        un entier. Le second est le type du paramètre.</p>
        <p>Tu comprends du coup pourquoi <code>main</code> s’écrit <code>int main()</code> : c’est
        une fonction comme les autres, qui renvoie un entier — d’où son <code>return 0;</code>.</p>
        <p>Quelques types de retour utiles :</p>
        <ul>
          <li><code>int</code> — renvoie un entier ;</li>
          <li><code>double</code> — renvoie un nombre à virgule ;</li>
          <li><code>bool</code> — renvoie vrai ou faux, parfait pour une question ;</li>
          <li><code>void</code> — ne renvoie <strong>rien</strong>, elle se contente d’agir.</li>
        </ul>
        <pre>bool estPair(int n) {
    return n % 2 == 0;
}</pre>
        <p><strong>Une règle du C++ à connaître :</strong> une fonction doit être écrite
        <em>au-dessus</em> de l’endroit où tu l’appelles. Le compilateur lit de haut en bas ; il ne
        peut pas utiliser quelque chose qu’il n’a pas encore rencontré. Tes fonctions vont donc
        avant <code>main</code>.</p>
      `,
      en: `
        <p>A C++ function looks like the ones you know, with one extra requirement: you must
        announce <strong>what it returns</strong>.</p>
        <pre>int carre(int n) {
    return n * n;
}</pre>
        <p>The first <code>int</code> is the <strong>return type</strong>: this function gives back
        an integer. The second is the parameter’s type.</p>
        <p>This is why <code>main</code> is written <code>int main()</code>: it is a function like
        any other, returning an integer — hence its <code>return 0;</code>.</p>
        <p>Some useful return types:</p>
        <ul>
          <li><code>int</code> — returns a whole number;</li>
          <li><code>double</code> — returns a decimal;</li>
          <li><code>bool</code> — returns true or false, perfect for a question;</li>
          <li><code>void</code> — returns <strong>nothing</strong>, it just acts.</li>
        </ul>
        <pre>bool estPair(int n) {
    return n % 2 == 0;
}</pre>
        <p><strong>A C++ rule to know:</strong> a function must be written <em>above</em> the place
        you call it. The compiler reads top to bottom; it cannot use something it has not met yet.
        So your functions go before <code>main</code>.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint carre(int n) {\n    return n * n;\n}\n\nbool estPair(int n) {\n    return n % 2 == 0;\n}\n\nint main() {\n    cout << carre(6) << endl;\n    cout << carre(3) + carre(4) << endl;\n    cout << estPair(10) << endl;\n    cout << estPair(7) << endl;\n    return 0;\n}',
      note: {
        fr: 'Un <code>bool</code> s’affiche <code>1</code> pour vrai et <code>0</code> pour faux.',
        en: 'A <code>bool</code> prints as <code>1</code> for true and <code>0</code> for false.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une fonction <code>triple(int n)</code> qui <strong>renvoie</strong> le triple de <code>n</code>.</p><p>Puis, dans <code>main</code>, affiche <code>triple(7)</code> et <code>triple(12)</code>, soit deux lignes : <code>21</code> et <code>36</code>.</p><p>N’oublie pas : la fonction s’écrit <strong>avant</strong> <code>main</code>.</p>',
        en: '<p>Write a <code>triple(int n)</code> function that <strong>returns</strong> three times <code>n</code>.</p><p>Then, in <code>main</code>, print <code>triple(7)</code> and <code>triple(12)</code>, giving two lines: <code>21</code> and <code>36</code>.</p><p>Remember: the function goes <strong>before</strong> <code>main</code>.</p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\n// Ta fonction triple ici, AVANT main\n\nint main() {\n    // Deux appels\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'int\\s+triple\\s*\\(\\s*int',
          message: {
            fr: 'La fonction doit s’écrire <code>int triple(int n)</code> : type de retour, nom, paramètre typé.',
            en: 'The function must read <code>int triple(int n)</code>: return type, name, typed parameter.',
          },
        },
        {
          type: 'codeContient',
          motif: 'return',
          message: {
            fr: 'La fonction doit <strong>renvoyer</strong> le résultat avec <code>return</code>, pas l’afficher elle-même.',
            en: 'The function must <strong>return</strong> the result with <code>return</code>, not print it itself.',
          },
        },
        { type: 'sortieLignes', nombre: 2 },
        { type: 'sortieContient', valeur: '21' },
        { type: 'sortieContient', valeur: '36' },
      ],
      indices: [
        {
          fr: 'La signature : <code>int triple(int n) {</code>',
          en: 'The signature: <code>int triple(int n) {</code>',
        },
        {
          fr: 'Une seule ligne dedans : <code>return n * 3;</code>',
          en: 'One line inside: <code>return n * 3;</code>',
        },
        {
          fr: 'Dans <code>main</code> : <code>cout &lt;&lt; triple(7) &lt;&lt; endl;</code> et la même chose avec 12.',
          en: 'In <code>main</code>: <code>cout &lt;&lt; triple(7) &lt;&lt; endl;</code> and the same with 12.',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint triple(int n) {\n    return n * 3;\n}\n\nint main() {\n    cout << triple(7) << endl;\n    cout << triple(12) << endl;\n    return 0;\n}',
    },
  },

  'cpp-3-5': {
    langage: 'cpp',
    xp: 35,
    objectif: {
      fr: 'Passer plusieurs paramètres, y compris un tableau entier.',
      en: 'Pass several parameters, including a whole array.',
    },
    explication: {
      fr: `
        <p>Une fonction peut recevoir autant de paramètres qu’il faut, chacun avec son type,
        séparés par des virgules :</p>
        <pre>double moyenne(int total, int nombre) {
    return total / (double) nombre;
}</pre>
        <p>Remarque le <code>(double)</code> : il force le C++ à faire une division réelle. C’est le
        piège de la leçon sur les calculs, réglé proprement.</p>
        <p>On peut aussi passer un <strong>tableau entier</strong>. Mais comme un tableau ne connaît
        pas sa taille, il faut la donner à côté :</p>
        <pre>int somme(int tableau[], int taille) {
    int total = 0;
    for (int i = 0; i &lt; taille; i++) {
        total = total + tableau[i];
    }
    return total;
}</pre>
        <p>Les crochets vides <code>int tableau[]</code> disent « je reçois un tableau d’entiers,
        de taille quelconque ». C’est pour ça que <code>taille</code> vient toujours avec — tu la
        verras dans presque toutes les fonctions C++ qui manipulent des tableaux.</p>
        <p><strong>Une différence à connaître :</strong> les nombres sont passés par
        <em>copie</em> — les modifier dans la fonction ne change rien dehors. Les tableaux, eux,
        sont partagés : les modifier dans la fonction modifie l’original. C’est surprenant au
        début, et parfaitement logique une fois qu’on sait qu’un tableau est en réalité une adresse
        en mémoire.</p>
      `,
      en: `
        <p>A function can take as many parameters as needed, each with its type, separated by
        commas:</p>
        <pre>double moyenne(int total, int nombre) {
    return total / (double) nombre;
}</pre>
        <p>Note the <code>(double)</code>: it forces C++ into a real division. That is the trap from
        the maths lesson, solved cleanly.</p>
        <p>You can also pass a <strong>whole array</strong>. But since an array does not know its
        size, you must hand it over alongside:</p>
        <pre>int somme(int tableau[], int taille) {
    int total = 0;
    for (int i = 0; i &lt; taille; i++) {
        total = total + tableau[i];
    }
    return total;
}</pre>
        <p>The empty brackets <code>int tableau[]</code> say "I take an array of integers, of any
        size". That is why <code>taille</code> always comes with it — you will see this in almost
        every C++ function that handles arrays.</p>
        <p><strong>A difference worth knowing:</strong> numbers are passed by <em>copy</em> —
        changing them inside the function changes nothing outside. Arrays are shared: changing them
        inside changes the original. Surprising at first, and perfectly logical once you know an
        array is really an address in memory.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint somme(int tableau[], int taille) {\n    int total = 0;\n    for (int i = 0; i < taille; i++) {\n        total = total + tableau[i];\n    }\n    return total;\n}\n\ndouble moyenne(int total, int nombre) {\n    return total / (double) nombre;\n}\n\nint main() {\n    int notes[4] = {12, 15, 8, 17};\n    int t = somme(notes, 4);\n\n    cout << "Somme : " << t << endl;\n    cout << "Moyenne : " << moyenne(t, 4) << endl;\n    return 0;\n}',
      note: {
        fr: 'Deux fonctions qui s’enchaînent : la seconde travaille sur le résultat de la première.',
        en: 'Two functions in sequence: the second works on the first one’s result.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une fonction <code>compterAuDessus(int tableau[], int taille, int seuil)</code> qui <strong>renvoie</strong> combien de valeurs du tableau sont <strong>strictement supérieures</strong> au seuil.</p><p>Avec <code>{120, 340, 75, 260, 190}</code> et un seuil de <code>150</code>, la réponse est <code>3</code>.</p><p>Affiche exactement : <code>Au-dessus de 150 : 3</code></p>',
        en: '<p>Write a <code>compterAuDessus(int tableau[], int taille, int seuil)</code> function that <strong>returns</strong> how many values in the array are <strong>strictly greater</strong> than the threshold.</p><p>With <code>{120, 340, 75, 260, 190}</code> and a threshold of <code>150</code>, the answer is <code>3</code>.</p><p>Print exactly: <code>Au-dessus de 150 : 3</code></p>',
      },
      depart:
        '#include <iostream>\nusing namespace std;\n\n// Ta fonction ici, avant main\n\nint main() {\n    int scores[5] = {120, 340, 75, 260, 190};\n\n    // Appelle la fonction et affiche le résultat\n\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'compterAuDessus\\s*\\(\\s*int\\s+\\w+\\s*\\[\\s*\\]',
          message: {
            fr: 'La fonction reçoit un tableau : <code>int compterAuDessus(int tableau[], int taille, int seuil)</code>.',
            en: 'The function takes an array: <code>int compterAuDessus(int tableau[], int taille, int seuil)</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'return',
          message: {
            fr: 'La fonction doit <strong>renvoyer</strong> le compte, pas l’afficher elle-même.',
            en: 'The function must <strong>return</strong> the count, not print it itself.',
          },
        },
        { type: 'sortieEgale', valeur: 'Au-dessus de 150 : 3' },
      ],
      indices: [
        {
          fr: 'La signature : <code>int compterAuDessus(int tableau[], int taille, int seuil) {</code>',
          en: 'The signature: <code>int compterAuDessus(int tableau[], int taille, int seuil) {</code>',
        },
        {
          fr: 'Dedans : un compteur à zéro, une boucle, et <code>if (tableau[i] &gt; seuil) { compteur++; }</code>',
          en: 'Inside: a counter at zero, a loop, and <code>if (tableau[i] &gt; seuil) { compteur++; }</code>',
        },
        {
          fr: 'Dans <code>main</code> : <code>cout &lt;&lt; "Au-dessus de 150 : " &lt;&lt; compterAuDessus(scores, 5, 150) &lt;&lt; endl;</code>',
          en: 'In <code>main</code>: <code>cout &lt;&lt; "Au-dessus de 150 : " &lt;&lt; compterAuDessus(scores, 5, 150) &lt;&lt; endl;</code>',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint compterAuDessus(int tableau[], int taille, int seuil) {\n    int compteur = 0;\n    for (int i = 0; i < taille; i++) {\n        if (tableau[i] > seuil) {\n            compteur++;\n        }\n    }\n    return compteur;\n}\n\nint main() {\n    int scores[5] = {120, 340, 75, 260, 190};\n\n    cout << "Au-dessus de 150 : " << compterAuDessus(scores, 5, 150) << endl;\n    return 0;\n}',
    },
  },

  'cpp-3-6': {
    langage: 'cpp',
    xp: 50,
    objectif: {
      fr: 'Assembler saisie, boucle et conditions dans un vrai jeu de console.',
      en: 'Combine input, loop and conditions into a real console game.',
    },
    explication: {
      fr: `
        <p>Dernier défi du parcours : le <strong>« devine le nombre »</strong>, en C++. Tu as tout
        ce qu’il faut — <code>cin</code>, <code>while</code>, <code>if</code>, un compteur.</p>
        <p>Le déroulé du jeu :</p>
        <ol>
          <li>un nombre secret, rangé dans une <code>const int</code> ;</li>
          <li>une boucle qui tourne <strong>tant que</strong> le joueur n’a pas trouvé ;</li>
          <li>à chaque tour : lire l’essai, compter le coup, dire « plus grand » ou
          « plus petit » ;</li>
          <li>quand c’est trouvé : annoncer le nombre de coups.</li>
        </ol>
        <pre>while (essai != secret) {
    cin &gt;&gt; essai;
    coups++;

    if (essai &lt; secret) {
        cout &lt;&lt; "Plus grand !" &lt;&lt; endl;
    } else if (essai &gt; secret) {
        cout &lt;&lt; "Plus petit !" &lt;&lt; endl;
    }
}</pre>
        <p><strong>Remarque le troisième cas absent.</strong> Quand l’essai est égal au secret, ni
        le <code>if</code> ni le <code>else if</code> ne s’appliquent : la boucle s’arrête d’elle-même
        et le message de victoire arrive après. C’est plus élégant que de tout mettre dans la
        boucle.</p>
        <p>Ce jeu est le même que celui que tu as écrit en Python. Compare les deux quand tu auras
        fini : c’est la <strong>même logique</strong>, dans deux costumes différents. C’est
        exactement ce qu’il faut retenir de tout ce parcours — apprendre un deuxième langage, c’est
        surtout réapprendre à écrire ce qu’on sait déjà.</p>
      `,
      en: `
        <p>The track’s final challenge: <strong>"guess the number"</strong>, in C++. You have
        everything you need — <code>cin</code>, <code>while</code>, <code>if</code>, a counter.</p>
        <p>How the game goes:</p>
        <ol>
          <li>a secret number, stored in a <code>const int</code>;</li>
          <li>a loop running <strong>while</strong> the player has not guessed;</li>
          <li>each round: read the guess, count the attempt, say "higher" or "lower";</li>
          <li>when found: announce the number of attempts.</li>
        </ol>
        <pre>while (essai != secret) {
    cin &gt;&gt; essai;
    coups++;

    if (essai &lt; secret) {
        cout &lt;&lt; "Plus grand !" &lt;&lt; endl;
    } else if (essai &gt; secret) {
        cout &lt;&lt; "Plus petit !" &lt;&lt; endl;
    }
}</pre>
        <p><strong>Notice the missing third case.</strong> When the guess equals the secret, neither
        the <code>if</code> nor the <code>else if</code> applies: the loop ends by itself and the
        victory message comes after. More elegant than cramming everything into the loop.</p>
        <p>This game is the same one you wrote in Python. Compare them when you are done: it is the
        <strong>same logic</strong>, in two different outfits. That is exactly what to take from
        this whole track — learning a second language is mostly relearning how to write what you
        already know.</p>
      `,
    },
    exemple: {
      code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    const int secret = 42;\n    int essai = 0;\n\n    while (essai != secret) {\n        cin >> essai;\n        if (essai < secret) {\n            cout << "Plus grand !" << endl;\n        } else if (essai > secret) {\n            cout << "Plus petit !" << endl;\n        }\n    }\n\n    cout << "Trouvé !" << endl;\n    return 0;\n}',
      note: {
        fr: 'Une version minimale, sans compteur : la boucle s’arrête toute seule quand c’est trouvé. À toi d’ajouter le décompte des coups.',
        en: 'A minimal version, with no counter: the loop stops by itself when the number is found. Adding the attempt count is up to you.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris le jeu complet. Le secret est <code>42</code>. Les essais joués sont <code>10</code>, <code>80</code> puis <code>42</code>.</p><p>Ton programme doit afficher exactement ces trois lignes :</p><pre>Plus grand !\nPlus petit !\nTrouvé en 3 coups !</pre><p>Il te faut donc un <strong>compteur de coups</strong> en plus de l’exemple.</p>',
        en: '<p>Write the full game. The secret is <code>42</code>. The guesses played are <code>10</code>, <code>80</code> then <code>42</code>.</p><p>Your program must print exactly these three lines:</p><pre>Plus grand !\nPlus petit !\nTrouvé en 3 coups !</pre><p>So you need an <strong>attempt counter</strong> on top of the example.</p>',
      },
      entree: '10\n80\n42\n',
      depart:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    const int secret = 42;\n    int essai = 0;\n    int coups = 0;\n\n    // La boucle de jeu, puis le message de victoire\n\n    return 0;\n}',
      verifications: [
        {
          type: 'codeContient',
          motif: 'while\\s*\\(',
          message: {
            fr: 'Il faut une boucle <code>while</code> : on ne sait pas d’avance combien d’essais il faudra.',
            en: 'You need a <code>while</code> loop: you cannot know in advance how many guesses it takes.',
          },
        },
        {
          type: 'codeContient',
          motif: 'cin\\s*>>\\s*essai',
          message: {
            fr: 'Chaque tour doit lire un essai au clavier : <code>cin &gt;&gt; essai;</code>',
            en: 'Each round must read a guess: <code>cin &gt;&gt; essai;</code>',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: '3\\s*coups|coups\\s*=\\s*3',
          message: {
            fr: 'Le nombre de coups doit être compté par la boucle, pas écrit en dur.',
            en: 'The attempt count must be counted by the loop, not written by hand.',
          },
        },
        { type: 'sortieLignes', nombre: 3 },
        { type: 'sortieContient', valeur: 'Plus grand !' },
        { type: 'sortieContient', valeur: 'Plus petit !' },
        { type: 'sortieContient', valeur: 'Trouvé en 3 coups !' },
      ],
      indices: [
        {
          fr: 'La boucle : <code>while (essai != secret) {</code> — les trois variables existent déjà.',
          en: 'The loop: <code>while (essai != secret) {</code> — all three variables already exist.',
        },
        {
          fr: 'Dedans, dans l’ordre : <code>cin &gt;&gt; essai;</code>, puis <code>coups++;</code>, puis le <code>if … else if</code>.',
          en: 'Inside, in order: <code>cin &gt;&gt; essai;</code>, then <code>coups++;</code>, then the <code>if … else if</code>.',
        },
        {
          fr: 'Après la boucle : <code>cout &lt;&lt; "Trouvé en " &lt;&lt; coups &lt;&lt; " coups !" &lt;&lt; endl;</code>',
          en: 'After the loop: <code>cout &lt;&lt; "Trouvé en " &lt;&lt; coups &lt;&lt; " coups !" &lt;&lt; endl;</code>',
        },
      ],
      solution:
        '#include <iostream>\nusing namespace std;\n\nint main() {\n    const int secret = 42;\n    int essai = 0;\n    int coups = 0;\n\n    while (essai != secret) {\n        cin >> essai;\n        coups++;\n\n        if (essai < secret) {\n            cout << "Plus grand !" << endl;\n        } else if (essai > secret) {\n            cout << "Plus petit !" << endl;\n        }\n    }\n\n    cout << "Trouvé en " << coups << " coups !" << endl;\n    return 0;\n}',
    },
    projet: { titre: { fr: 'Devine le nombre en C++', en: 'Guess the number in C++' } },
  },
};
