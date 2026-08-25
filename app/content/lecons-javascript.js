/**
 * Parcours JavaScript — contenu des lecons.
 * Voir `_schema.md` pour la description d'une lecon.
 *
 * Chaque lecon donne le HTML et laisse l'eleve ecrire le JavaScript : c'est
 * le comportement qu'on apprend ici, pas la structure.
 *
 * Rappel important pour les lecons animees : le correcteur photographie la
 * page environ 350 ms apres l'execution. Tout ce qui doit etre verifie doit
 * donc etre visible tout de suite, et pas seulement au bout de plusieurs tours
 * de `setInterval`.
 */

export const LECONS_JAVASCRIPT = {
  /* ===================================================== Module 1 ========= */

  'js-1-1': {
    langage: 'javascript',
    xp: 20,
    objectif: {
      fr: 'Écrire ton premier message JavaScript et le voir dans la console.',
      en: 'Write your first JavaScript message and see it in the console.',
    },
    explication: {
      fr: `
        <p>HTML donne la structure. CSS donne l’allure. <strong>JavaScript donne la vie</strong> :
        c’est lui qui fait qu’un bouton répond, qu’un score monte, qu’un personnage bouge.</p>
        <p>La toute première instruction à connaître :</p>
        <pre>console.log("Bonjour !");</pre>
        <p>Elle écrit un message dans la <strong>console</strong> — l’onglet à droite, à côté de
        l’aperçu. La console n’est pas visible par le visiteur du site : c’est le carnet de bord
        du développeur.</p>
        <p>Trois choses à retenir dans cette ligne :</p>
        <ul>
          <li>le texte est entre <strong>guillemets</strong> ;</li>
          <li>les <strong>parenthèses</strong> contiennent ce qu’on envoie ;</li>
          <li>le <strong>point-virgule</strong> termine l’instruction.</li>
        </ul>
        <p><strong>Pourquoi ça compte :</strong> <code>console.log</code> est l’outil que tu
        utiliseras le plus, toute ta vie de programmeur. Quand un programme ne fait pas ce que tu
        crois, tu y affiches ce qu’il contient vraiment. C’est comme ça qu’on trouve un bug.</p>
      `,
      en: `
        <p>HTML gives structure. CSS gives looks. <strong>JavaScript gives life</strong>: it makes
        a button respond, a score go up, a character move.</p>
        <p>The very first instruction to learn:</p>
        <pre>console.log("Hello!");</pre>
        <p>It writes a message in the <strong>console</strong> — the tab on the right, next to the
        preview. The console is not visible to a site’s visitor: it is the developer’s logbook.</p>
        <p>Three things to notice in that line:</p>
        <ul>
          <li>the text is inside <strong>quotes</strong>;</li>
          <li>the <strong>parentheses</strong> hold what you are sending;</li>
          <li>the <strong>semicolon</strong> ends the instruction.</li>
        </ul>
        <p><strong>Why it matters:</strong> <code>console.log</code> is the tool you will use most,
        for the rest of your programming life. When a program does not do what you think, you
        print what it actually contains. That is how bugs get found.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Ma page</h1>',
        js: 'console.log("Bonjour !");\nconsole.log("J\'apprends le JavaScript.");',
      },
      note: {
        fr: 'Regarde l’onglet Console à droite : les deux messages y sont, l’un sous l’autre.',
        en: 'Look at the Console tab on the right: both messages are there, one under the other.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Dans l’onglet <strong>JS</strong>, affiche dans la console la phrase exacte :</p><p><code>Salut, moi c’est le JavaScript !</code></p><p>Attention aux majuscules et à la ponctuation.</p>',
        en: '<p>In the <strong>JS</strong> tab, print this exact sentence to the console:</p><p><code>Salut, moi c’est le JavaScript !</code></p><p>Watch the capitals and the punctuation.</p>',
      },
      depart: {
        html: '<h1>Ma première page vivante</h1>',
        js: '// Écris ton console.log ici\n',
      },
      verifications: [{ type: 'sortieContient', valeur: 'Salut, moi c’est le JavaScript !' }],
      indices: [
        {
          fr: 'La forme est <code>console.log("…");</code>',
          en: 'The shape is <code>console.log("…");</code>',
        },
        {
          fr: 'Le texte se met entre guillemets, à l’intérieur des parenthèses.',
          en: 'The text goes inside quotes, inside the parentheses.',
        },
        {
          fr: 'Recopie la phrase telle quelle, avec la virgule, l’apostrophe et le point d’exclamation.',
          en: 'Copy the sentence exactly, with the comma, the apostrophe and the exclamation mark.',
        },
      ],
      solution: {
        html: '<h1>Ma première page vivante</h1>',
        js: 'console.log("Salut, moi c’est le JavaScript !");',
      },
    },
  },

  'js-1-2': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Attraper un élément de la page pour pouvoir agir dessus.',
      en: 'Grab an element from the page so you can act on it.',
    },
    explication: {
      fr: `
        <p>Pour changer quelque chose sur la page, il faut d’abord <strong>l’attraper</strong>.
        JavaScript a une pince pour ça :</p>
        <pre>const titre = document.querySelector("h1");</pre>
        <ul>
          <li><code>document</code> — toute la page ;</li>
          <li><code>querySelector</code> — « trouve-moi le premier qui correspond » ;</li>
          <li><code>"h1"</code> — un <strong>sélecteur CSS</strong>, exactement le même que
          celui que tu écris dans une feuille de style.</li>
        </ul>
        <p>Bonne nouvelle : tu sais déjà écrire des sélecteurs. <code>"h1"</code> pour une balise,
        <code>".carte"</code> pour une classe, <code>"#score"</code> pour un identifiant.</p>
        <p>Une fois attrapé, l’élément est rangé dans une <strong>variable</strong> avec
        <code>const</code>. Tu peux alors lire ce qu’il contient :</p>
        <pre>console.log(titre.textContent);</pre>
        <p><strong>L’erreur classique du débutant :</strong> chercher un élément qui n’existe pas.
        <code>querySelector</code> renvoie alors <code>null</code>, et la ligne suivante plante
        avec un message du genre « Cannot read properties of null ». Quand tu vois ça, vérifie
        d’abord ton sélecteur.</p>
      `,
      en: `
        <p>To change something on the page, you first have to <strong>grab it</strong>. JavaScript
        has a pair of pliers for that:</p>
        <pre>const titre = document.querySelector("h1");</pre>
        <ul>
          <li><code>document</code> — the whole page;</li>
          <li><code>querySelector</code> — "find me the first one that matches";</li>
          <li><code>"h1"</code> — a <strong>CSS selector</strong>, exactly the one you would
          write in a stylesheet.</li>
        </ul>
        <p>Good news: you already know how to write selectors. <code>"h1"</code> for a tag,
        <code>".carte"</code> for a class, <code>"#score"</code> for an id.</p>
        <p>Once grabbed, the element is stored in a <strong>variable</strong> with
        <code>const</code>. You can then read what it holds:</p>
        <pre>console.log(titre.textContent);</pre>
        <p><strong>The classic beginner error:</strong> looking for an element that does not
        exist. <code>querySelector</code> then returns <code>null</code>, and the next line
        crashes with something like "Cannot read properties of null". When you see that, check
        your selector first.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Bienvenue</h1>\n<p id="message">Un texte caché dans la page.</p>',
        js: 'const titre = document.querySelector("h1");\nconsole.log(titre.textContent);\n\nconst message = document.querySelector("#message");\nconsole.log(message.textContent);',
      },
      note: {
        fr: 'Le JavaScript lit la page : les deux textes apparaissent dans la console.',
        en: 'The JavaScript reads the page: both texts appear in the console.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La page contient un élément <code>#secret</code>.</p><p>Attrape-le avec <code>querySelector</code> et affiche son texte dans la console.</p>',
        en: '<p>The page contains a <code>#secret</code> element.</p><p>Grab it with <code>querySelector</code> and print its text to the console.</p>',
      },
      depart: {
        html: '<h1>Le coffre</h1>\n<p id="secret">Le code est 4271</p>',
        js: '// Attrape #secret, puis affiche son textContent\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'querySelector',
          message: {
            fr: 'Utilise <code>document.querySelector</code> : c’est l’outil de la leçon.',
            en: 'Use <code>document.querySelector</code>: that is this lesson’s tool.',
          },
        },
        { type: 'sortieContient', valeur: 'Le code est 4271' },
      ],
      indices: [
        {
          fr: 'Un identifiant se cible avec un dièse : <code>"#secret"</code>.',
          en: 'An id is targeted with a hash: <code>"#secret"</code>.',
        },
        {
          fr: 'Range-le dans une variable : <code>const secret = document.querySelector("#secret");</code>',
          en: 'Store it in a variable: <code>const secret = document.querySelector("#secret");</code>',
        },
        {
          fr: 'Puis affiche <code>secret.textContent</code>, sans guillemets autour.',
          en: 'Then print <code>secret.textContent</code>, with no quotes around it.',
        },
      ],
      solution: {
        html: '<h1>Le coffre</h1>\n<p id="secret">Le code est 4271</p>',
        js: 'const secret = document.querySelector("#secret");\nconsole.log(secret.textContent);',
      },
    },
  },

  'js-1-3': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Modifier le texte et le style d’un élément depuis le code.',
      en: 'Change an element’s text and style from code.',
    },
    explication: {
      fr: `
        <p>Attraper, c’est bien. Modifier, c’est mieux. Une fois l’élément dans une variable, deux
        pouvoirs s’ouvrent :</p>
        <pre>const titre = document.querySelector("h1");

titre.textContent = "Nouveau titre";
titre.style.color = "tomato";</pre>
        <ul>
          <li><code>textContent</code> — remplace le texte affiché ;</li>
          <li><code>style.quelqueChose</code> — change une propriété CSS.</li>
        </ul>
        <p>Attention au nom des propriétés : en CSS on écrit <code>background-color</code>, en
        JavaScript ça devient <code>backgroundColor</code>. Le tiret disparaît et la lettre
        suivante passe en majuscule. Pareil pour <code>fontSize</code>, <code>borderRadius</code>,
        <code>textAlign</code>.</p>
        <p>Et les valeurs sont toujours du <strong>texte entre guillemets</strong>, unité
        comprise : <code>titre.style.fontSize = "32px";</code>, jamais <code>32</code> tout seul.</p>
        <p><strong>Le bon réflexe :</strong> tout ce qui reste pareil se met dans le CSS. Le
        JavaScript, lui, sert à ce qui <em>change</em> — après un clic, à la fin d’un compte à
        rebours, quand le score dépasse un seuil.</p>
      `,
      en: `
        <p>Grabbing is good. Changing is better. Once the element is in a variable, two powers
        open up:</p>
        <pre>const titre = document.querySelector("h1");

titre.textContent = "New title";
titre.style.color = "tomato";</pre>
        <ul>
          <li><code>textContent</code> — replaces the displayed text;</li>
          <li><code>style.something</code> — changes a CSS property.</li>
        </ul>
        <p>Careful with property names: in CSS you write <code>background-color</code>, in
        JavaScript it becomes <code>backgroundColor</code>. The dash disappears and the next
        letter goes uppercase. Same for <code>fontSize</code>, <code>borderRadius</code>,
        <code>textAlign</code>.</p>
        <p>And values are always <strong>text in quotes</strong>, unit included:
        <code>titre.style.fontSize = "32px";</code>, never a bare <code>32</code>.</p>
        <p><strong>The right instinct:</strong> anything that stays the same belongs in the CSS.
        JavaScript is for what <em>changes</em> — after a click, at the end of a countdown, when
        a score passes a threshold.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Titre d’origine</h1>',
        js: 'const titre = document.querySelector("h1");\ntitre.textContent = "Modifié par JavaScript !";\ntitre.style.color = "#00e5ff";\ntitre.style.backgroundColor = "#0b0e1a";\ntitre.style.padding = "16px";',
      },
      note: {
        fr: 'Le HTML n’a pas changé d’une lettre : c’est le JavaScript qui réécrit la page.',
        en: 'The HTML has not changed by a single letter: JavaScript is rewriting the page.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Sur l’élément <code>#alerte</code> :</p><ul><li>mets le texte <code>Attention !</code> ;</li><li>mets la couleur du texte en <code>white</code> ;</li><li>mets le fond (<code>backgroundColor</code>) en <code>crimson</code>.</li></ul>',
        en: '<p>On the <code>#alerte</code> element:</p><ul><li>set the text to <code>Attention !</code>;</li><li>set the text colour to <code>white</code>;</li><li>set the background (<code>backgroundColor</code>) to <code>crimson</code>.</li></ul>',
      },
      depart: {
        html: '<h1>Console de bord</h1>\n<p id="alerte">Tout va bien</p>',
        js: 'const alerte = document.querySelector("#alerte");\n// À toi de jouer : texte, couleur, fond\n',
      },
      verifications: [
        { type: 'dom', selecteur: '#alerte', quoi: 'texte', attendu: 'Attention !' },
        { type: 'style', selecteur: '#alerte', propriete: 'color', attendu: 'rgb(255, 255, 255)' },
        { type: 'style', selecteur: '#alerte', propriete: 'background-color', attendu: 'rgb(220, 20, 60)' },
      ],
      indices: [
        {
          fr: 'La variable <code>alerte</code> existe déjà : il te reste trois lignes à écrire.',
          en: 'The <code>alerte</code> variable already exists: three lines left to write.',
        },
        {
          fr: '<code>alerte.textContent = "Attention !";</code>',
          en: '<code>alerte.textContent = "Attention !";</code>',
        },
        {
          fr: 'Pour le fond : <code>alerte.style.backgroundColor = "crimson";</code> — en un seul mot, avec un C majuscule.',
          en: 'For the background: <code>alerte.style.backgroundColor = "crimson";</code> — one word, capital C.',
        },
      ],
      solution: {
        html: '<h1>Console de bord</h1>\n<p id="alerte">Tout va bien</p>',
        js: 'const alerte = document.querySelector("#alerte");\nalerte.textContent = "Attention !";\nalerte.style.color = "white";\nalerte.style.backgroundColor = "crimson";',
      },
    },
  },

  'js-1-4': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Faire réagir un bouton au clic — le vrai début de l’interactivité.',
      en: 'Make a button react to a click — where interactivity really starts.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici ton code s’exécutait une fois, au chargement, et c’était fini. Maintenant on
        va lui dire : <em>« attends, et quand ça arrive, fais ça »</em>.</p>
        <pre>const bouton = document.querySelector("#bouton");

bouton.addEventListener("click", function () {
  console.log("On a cliqué !");
});</pre>
        <p>Décortiquons :</p>
        <ul>
          <li><code>addEventListener</code> — « écoute cet événement » ;</li>
          <li><code>"click"</code> — lequel ;</li>
          <li>la <code>function () { … }</code> — ce qu’il faut faire quand ça arrive.</li>
        </ul>
        <p>Ce bloc de code n’est <strong>pas exécuté tout de suite</strong>. Il est mis de côté et
        attend. C’est l’idée la plus importante du JavaScript : un programme qui réagit, au lieu
        de dérouler bêtement ses lignes.</p>
        <p><strong>Le piège des parenthèses :</strong> il faut bien fermer dans l’ordre —
        <code>});</code> à la fin. L’accolade ferme la fonction, la parenthèse ferme
        <code>addEventListener</code>, le point-virgule termine l’instruction.</p>
      `,
      en: `
        <p>So far your code ran once, at load, and that was that. Now we tell it: <em>"wait, and
        when this happens, do that"</em>.</p>
        <pre>const bouton = document.querySelector("#bouton");

bouton.addEventListener("click", function () {
  console.log("Clicked!");
});</pre>
        <p>Piece by piece:</p>
        <ul>
          <li><code>addEventListener</code> — "listen for this event";</li>
          <li><code>"click"</code> — which one;</li>
          <li>the <code>function () { … }</code> — what to do when it happens.</li>
        </ul>
        <p>That block is <strong>not run straight away</strong>. It is set aside and waits. This
        is the single most important idea in JavaScript: a program that reacts, instead of
        blindly running through its lines.</p>
        <p><strong>The bracket trap:</strong> you must close in the right order —
        <code>});</code> at the end. The brace closes the function, the parenthesis closes
        <code>addEventListener</code>, the semicolon ends the instruction.</p>
      `,
    },
    exemple: {
      code: {
        html: '<button id="bouton">Clique-moi</button>\n<p id="resultat">Rien pour l’instant</p>',
        js: 'const bouton = document.querySelector("#bouton");\nconst resultat = document.querySelector("#resultat");\n\nbouton.addEventListener("click", function () {\n  resultat.textContent = "Tu as cliqué !";\n});',
      },
      note: {
        fr: 'Clique vraiment sur le bouton dans l’aperçu : le texte change sous tes yeux.',
        en: 'Actually click the button in the preview: the text changes before your eyes.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Quand on clique sur <code>#allumer</code>, la <code>#lampe</code> doit :</p><ul><li>afficher le texte <code>Allumée</code> ;</li><li>passer son fond (<code>backgroundColor</code>) en <code>gold</code>.</li></ul><p>Rien ne doit se passer avant le clic.</p>',
        en: '<p>When <code>#allumer</code> is clicked, the <code>#lampe</code> must:</p><ul><li>show the text <code>Allumée</code>;</li><li>turn its background (<code>backgroundColor</code>) to <code>gold</code>.</li></ul><p>Nothing should happen before the click.</p>',
      },
      depart: {
        html: '<button id="allumer">Allumer</button>\n<div id="lampe">Éteinte</div>',
        js: 'const allumer = document.querySelector("#allumer");\nconst lampe = document.querySelector("#lampe");\n\n// Écoute le clic sur le bouton\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'addEventListener\\s*\\(\\s*["\']click["\']',
          message: {
            fr: 'Il manque l’écouteur : <code>allumer.addEventListener("click", function () { … });</code>',
            en: 'The listener is missing: <code>allumer.addEventListener("click", function () { … });</code>',
          },
        },
        {
          type: 'dom',
          selecteur: '#lampe',
          quoi: 'texte',
          attendu: 'Éteinte',
          message: {
            fr: 'La lampe doit rester éteinte tant qu’on n’a pas cliqué : ne change rien en dehors de la fonction.',
            en: 'The lamp must stay off until the click: change nothing outside the function.',
          },
        },
        { type: 'dom', clic: '#allumer', selecteur: '#lampe', quoi: 'texte', attendu: 'Allumée' },
        {
          type: 'style',
          clic: '#allumer',
          selecteur: '#lampe',
          propriete: 'background-color',
          attendu: 'rgb(255, 215, 0)',
        },
      ],
      indices: [
        {
          fr: 'Les deux variables sont déjà là. Commence par <code>allumer.addEventListener("click", function () {</code>.',
          en: 'Both variables are already there. Start with <code>allumer.addEventListener("click", function () {</code>.',
        },
        {
          fr: 'À l’intérieur, deux lignes : le <code>textContent</code> et le <code>style.backgroundColor</code> de <code>lampe</code>.',
          en: 'Inside, two lines: <code>lampe</code>’s <code>textContent</code> and <code>style.backgroundColor</code>.',
        },
        {
          fr: 'Ferme bien avec <code>});</code> — accolade, parenthèse, point-virgule.',
          en: 'Close properly with <code>});</code> — brace, parenthesis, semicolon.',
        },
      ],
      solution: {
        html: '<button id="allumer">Allumer</button>\n<div id="lampe">Éteinte</div>',
        js: 'const allumer = document.querySelector("#allumer");\nconst lampe = document.querySelector("#lampe");\n\nallumer.addEventListener("click", function () {\n  lampe.textContent = "Allumée";\n  lampe.style.backgroundColor = "gold";\n});',
      },
    },
  },

  /* ===================================================== Module 2 ========= */

  'js-2-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Ranger des valeurs dans des variables, et connaître leurs types.',
      en: 'Store values in variables, and know their types.',
    },
    explication: {
      fr: `
        <p>Une variable, c’est une boîte étiquetée. En JavaScript, deux façons d’en créer une :</p>
        <pre>let score = 0;        // pourra changer
const nom = "Théo";   // ne changera jamais</pre>
        <p><code>let</code> pour ce qui varie — un score, un compteur, une position.
        <code>const</code> pour ce qui est fixé une fois pour toutes.</p>
        <p><strong>Prends l’habitude de mettre <code>const</code> par défaut</strong>, et de
        passer à <code>let</code> seulement quand tu as besoin de changer la valeur. Le programme
        te protège alors de tes propres erreurs : réaffecter une <code>const</code> déclenche une
        erreur immédiate, au lieu d’un bug silencieux.</p>
        <p>Les valeurs ont des <strong>types</strong>, et c’est là que ça se corse :</p>
        <ul>
          <li><code>"12"</code> — du texte (avec guillemets) ;</li>
          <li><code>12</code> — un nombre (sans guillemets) ;</li>
          <li><code>true</code> / <code>false</code> — un booléen, vrai ou faux.</li>
        </ul>
        <p><strong>Le piège qui coûte le plus cher :</strong> <code>"2" + 3</code> ne fait pas
        <code>5</code>, mais <code>"23"</code> — JavaScript colle les textes au lieu d’additionner.
        Un nombre entre guillemets n’est pas un nombre.</p>
      `,
      en: `
        <p>A variable is a labelled box. In JavaScript there are two ways to make one:</p>
        <pre>let score = 0;        // may change
const nom = "Théo";   // will never change</pre>
        <p><code>let</code> for what varies — a score, a counter, a position. <code>const</code>
        for what is fixed once and for all.</p>
        <p><strong>Get into the habit of using <code>const</code> by default</strong>, and switch
        to <code>let</code> only when you actually need to change the value. The program then
        protects you from your own mistakes: reassigning a <code>const</code> raises an immediate
        error instead of a silent bug.</p>
        <p>Values have <strong>types</strong>, and that is where it gets tricky:</p>
        <ul>
          <li><code>"12"</code> — text (with quotes);</li>
          <li><code>12</code> — a number (without quotes);</li>
          <li><code>true</code> / <code>false</code> — a boolean, true or false.</li>
        </ul>
        <p><strong>The costliest trap:</strong> <code>"2" + 3</code> is not <code>5</code>, it is
        <code>"23"</code> — JavaScript glues text together instead of adding. A number in quotes
        is not a number.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Types</h1>',
        js: 'const nom = "Théo";\nlet score = 40;\n\nscore = score + 2;\n\nconsole.log(nom + " a " + score + " points");\nconsole.log("2" + 3);\nconsole.log(2 + 3);',
      },
      note: {
        fr: 'Les deux dernières lignes se ressemblent et ne donnent pas du tout la même chose.',
        en: 'The last two lines look alike and give completely different results.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée trois variables :</p><ul><li><code>const pseudo</code> qui vaut <code>"Nova"</code> ;</li><li><code>let vies</code> qui vaut <code>3</code> — un <strong>nombre</strong>, pas du texte ;</li><li>enlève une vie, puis affiche exactement : <code>Nova a 2 vies</code>.</li></ul>',
        en: '<p>Create three variables:</p><ul><li><code>const pseudo</code> equal to <code>"Nova"</code>;</li><li><code>let vies</code> equal to <code>3</code> — a <strong>number</strong>, not text;</li><li>remove one life, then print exactly: <code>Nova a 2 vies</code>.</li></ul>',
      },
      depart: {
        html: '<h1>Aventure</h1>',
        js: '// Le pseudo, les vies, puis le message\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'const\\s+pseudo',
          message: {
            fr: 'Le pseudo ne change jamais : déclare-le avec <code>const pseudo</code>.',
            en: 'The nickname never changes: declare it with <code>const pseudo</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: 'let\\s+vies',
          message: {
            fr: 'Le nombre de vies change : déclare-le avec <code>let vies</code>.',
            en: 'The number of lives changes: declare it with <code>let vies</code>.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'vies\\s*=\\s*["\']',
          message: {
            fr: 'Un nombre s’écrit sans guillemets : <code>3</code>, et non <code>"3"</code>.',
            en: 'A number is written without quotes: <code>3</code>, not <code>"3"</code>.',
          },
        },
        { type: 'sortieContient', valeur: 'Nova a 2 vies' },
      ],
      indices: [
        {
          fr: '<code>const pseudo = "Nova";</code> puis <code>let vies = 3;</code>',
          en: '<code>const pseudo = "Nova";</code> then <code>let vies = 3;</code>',
        },
        {
          fr: 'Pour enlever une vie : <code>vies = vies - 1;</code>',
          en: 'To remove a life: <code>vies = vies - 1;</code>',
        },
        {
          fr: 'Assemble avec des <code>+</code> : <code>console.log(pseudo + " a " + vies + " vies");</code> — attention aux espaces dans les guillemets.',
          en: 'Join with <code>+</code>: <code>console.log(pseudo + " a " + vies + " vies");</code> — mind the spaces inside the quotes.',
        },
      ],
      solution: {
        html: '<h1>Aventure</h1>',
        js: 'const pseudo = "Nova";\nlet vies = 3;\n\nvies = vies - 1;\n\nconsole.log(pseudo + " a " + vies + " vies");',
      },
    },
  },

  'js-2-2': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Comparer deux valeurs et faire prendre une décision au programme.',
      en: 'Compare two values and let the program make a decision.',
    },
    explication: {
      fr: `
        <p>Un programme qui décide, c’est un programme qui compare :</p>
        <pre>if (score >= 100) {
  console.log("Niveau suivant !");
} else {
  console.log("Continue.");
}</pre>
        <p>Les comparaisons disponibles :</p>
        <ul>
          <li><code>&gt;</code> plus grand, <code>&lt;</code> plus petit ;</li>
          <li><code>&gt;=</code> plus grand ou égal, <code>&lt;=</code> plus petit ou égal ;</li>
          <li><code>===</code> égal, <code>!==</code> différent.</li>
        </ul>
        <p><strong>Trois signes égal, oui.</strong> Un seul (<code>=</code>) veut dire
        « range dans » ; trois veulent dire « est-ce que c’est pareil ». Confondre les deux est
        l’erreur la plus fréquente du monde, et elle ne provoque pas toujours de message : le
        programme fait juste n’importe quoi.</p>
        <p>Pourquoi trois et pas deux ? Parce que <code>==</code> compare mollement :
        <code>"5" == 5</code> est vrai. <code>===</code> compare aussi le <strong>type</strong> :
        <code>"5" === 5</code> est faux. Utilise toujours <code>===</code>.</p>
      `,
      en: `
        <p>A program that decides is a program that compares:</p>
        <pre>if (score >= 100) {
  console.log("Next level!");
} else {
  console.log("Keep going.");
}</pre>
        <p>The available comparisons:</p>
        <ul>
          <li><code>&gt;</code> greater, <code>&lt;</code> smaller;</li>
          <li><code>&gt;=</code> greater or equal, <code>&lt;=</code> smaller or equal;</li>
          <li><code>===</code> equal, <code>!==</code> different.</li>
        </ul>
        <p><strong>Three equals signs, yes.</strong> One (<code>=</code>) means "store into";
        three mean "is it the same". Mixing them up is the most common mistake in the world, and
        it does not always produce an error message: the program simply misbehaves.</p>
        <p>Why three and not two? Because <code>==</code> compares loosely: <code>"5" == 5</code>
        is true. <code>===</code> also compares the <strong>type</strong>: <code>"5" === 5</code>
        is false. Always use <code>===</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Bulletin</h1>',
        js: 'const note = 14;\n\nif (note >= 10) {\n  console.log("Reçu avec " + note + "/20");\n} else {\n  console.log("Il faut retravailler.");\n}',
      },
      note: {
        fr: 'Change <code>14</code> en <code>8</code> et relance : l’autre branche s’exécute.',
        en: 'Change <code>14</code> to <code>8</code> and run again: the other branch runs.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La variable <code>temperature</code> vaut <code>31</code>.</p><p>Écris un <code>if … else</code> qui affiche :</p><ul><li><code>Il fait chaud</code> si elle est supérieure ou égale à <code>25</code> ;</li><li><code>Il fait frais</code> sinon.</li></ul>',
        en: '<p>The <code>temperature</code> variable is <code>31</code>.</p><p>Write an <code>if … else</code> printing:</p><ul><li><code>Il fait chaud</code> if it is greater than or equal to <code>25</code>;</li><li><code>Il fait frais</code> otherwise.</li></ul>',
      },
      depart: {
        html: '<h1>Météo</h1>',
        js: 'const temperature = 31;\n\n// Ton if … else ici\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'if\\s*\\(',
          message: {
            fr: 'Il faut un vrai <code>if</code> : c’est tout l’objet de la leçon.',
            en: 'You need a real <code>if</code>: that is the point of this lesson.',
          },
        },
        {
          type: 'codeContient',
          motif: 'else',
          message: {
            fr: 'Il manque le <code>else</code>, qui traite l’autre cas.',
            en: 'The <code>else</code>, handling the other case, is missing.',
          },
        },
        {
          type: 'codeContient',
          motif: 'temperature\\s*>=?\\s*25',
          message: {
            fr: 'Compare la variable au seuil : <code>temperature >= 25</code>.',
            en: 'Compare the variable to the threshold: <code>temperature >= 25</code>.',
          },
        },
        { type: 'sortieContient', valeur: 'Il fait chaud' },
        {
          type: 'sortieLignes',
          nombre: 1,
          message: {
            fr: 'Une seule ligne doit s’afficher : les deux branches ne peuvent pas s’exécuter ensemble.',
            en: 'Only one line should appear: both branches cannot run at once.',
          },
        },
      ],
      indices: [
        {
          fr: 'La condition se met entre parenthèses : <code>if (temperature >= 25) {</code>',
          en: 'The condition goes in parentheses: <code>if (temperature >= 25) {</code>',
        },
        {
          fr: 'Ferme l’accolade, puis enchaîne : <code>} else {</code>',
          en: 'Close the brace, then continue: <code>} else {</code>',
        },
        {
          fr: 'Un seul <code>console.log</code> dans chaque branche, et rien en dehors.',
          en: 'One <code>console.log</code> in each branch, and nothing outside.',
        },
      ],
      solution: {
        html: '<h1>Météo</h1>',
        js: 'const temperature = 31;\n\nif (temperature >= 25) {\n  console.log("Il fait chaud");\n} else {\n  console.log("Il fait frais");\n}',
      },
    },
  },

  'js-2-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Combiner plusieurs conditions avec ET et OU.',
      en: 'Combine several conditions with AND and OR.',
    },
    explication: {
      fr: `
        <p>Une seule condition suffit rarement dans la vraie vie. « Il fait beau <em>et</em> c’est
        le week-end. » Deux opérateurs pour ça :</p>
        <ul>
          <li><code>&amp;&amp;</code> — <strong>ET</strong> : il faut que les deux soient vraies ;</li>
          <li><code>||</code> — <strong>OU</strong> : il suffit qu’une des deux le soit.</li>
        </ul>
        <pre>if (age >= 12 && taille >= 140) {
  console.log("Tu peux monter dans le manège.");
}</pre>
        <p>Et pour inverser une condition, le point d’exclamation :</p>
        <pre>if (!estConnecte) {
  console.log("Connecte-toi d’abord.");
}</pre>
        <p>Il se lit « non ». <code>!estConnecte</code> veut dire « s’il n’est pas connecté ».</p>
        <p>Enfin, quand il y a plus de deux cas, on enchaîne avec <code>else if</code> — et
        <strong>l’ordre compte</strong> : le premier cas vrai gagne, les suivants ne sont même pas
        regardés. Va donc toujours du plus exigeant au moins exigeant.</p>
      `,
      en: `
        <p>One condition is rarely enough in real life. "It is sunny <em>and</em> it is the
        weekend." Two operators for that:</p>
        <ul>
          <li><code>&amp;&amp;</code> — <strong>AND</strong>: both must be true;</li>
          <li><code>||</code> — <strong>OR</strong>: one of the two is enough.</li>
        </ul>
        <pre>if (age >= 12 && taille >= 140) {
  console.log("You can ride.");
}</pre>
        <p>And to flip a condition, the exclamation mark:</p>
        <pre>if (!estConnecte) {
  console.log("Log in first.");
}</pre>
        <p>It reads as "not". <code>!estConnecte</code> means "if they are not logged in".</p>
        <p>Finally, when there are more than two cases you chain with <code>else if</code> — and
        <strong>order matters</strong>: the first true case wins, the rest are not even looked at.
        So always go from the most demanding to the least.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Manège</h1>',
        js: 'const age = 13;\nconst taille = 152;\n\nif (age >= 12 && taille >= 140) {\n  console.log("Accès autorisé");\n} else if (age >= 12) {\n  console.log("Trop petit pour l\'instant");\n} else {\n  console.log("Trop jeune");\n}',
      },
      note: {
        fr: 'Baisse la taille à 130 : la deuxième branche prend le relais.',
        en: 'Drop the height to 130: the second branch takes over.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Un mot de passe est <strong>correct</strong> s’il fait <strong>au moins 8 caractères</strong> <em>et</em> qu’il n’est pas <code>"motdepasse"</code>.</p><p>Avec <code>motDePasse.length</code> et l’opérateur <code>&amp;&amp;</code>, affiche <code>Mot de passe accepté</code> ou <code>Mot de passe refusé</code>.</p>',
        en: '<p>A password is <strong>valid</strong> if it is <strong>at least 8 characters</strong> <em>and</em> is not <code>"motdepasse"</code>.</p><p>Using <code>motDePasse.length</code> and the <code>&amp;&amp;</code> operator, print <code>Mot de passe accepté</code> or <code>Mot de passe refusé</code>.</p>',
      },
      depart: {
        html: '<h1>Sécurité</h1>',
        js: 'const motDePasse = "dragon2024";\n\n// Une seule condition, avec &&\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: '&&',
          message: {
            fr: 'Les deux exigences doivent être réunies : utilise <code>&&</code>.',
            en: 'Both requirements must hold: use <code>&&</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.length',
          message: {
            fr: 'La longueur d’un texte se lit avec <code>motDePasse.length</code>.',
            en: 'A text’s length is read with <code>motDePasse.length</code>.',
          },
        },
        { type: 'sortieContient', valeur: 'Mot de passe accepté' },
        { type: 'sortieLignes', nombre: 1 },
      ],
      indices: [
        {
          fr: '<code>motDePasse.length >= 8</code> donne la première moitié de la condition.',
          en: '<code>motDePasse.length >= 8</code> gives the first half of the condition.',
        },
        {
          fr: '« N’est pas égal à » s’écrit <code>!==</code>.',
          en: '"Is not equal to" is written <code>!==</code>.',
        },
        {
          fr: '<code>if (motDePasse.length >= 8 && motDePasse !== "motdepasse") {</code>',
          en: '<code>if (motDePasse.length >= 8 && motDePasse !== "motdepasse") {</code>',
        },
      ],
      solution: {
        html: '<h1>Sécurité</h1>',
        js: 'const motDePasse = "dragon2024";\n\nif (motDePasse.length >= 8 && motDePasse !== "motdepasse") {\n  console.log("Mot de passe accepté");\n} else {\n  console.log("Mot de passe refusé");\n}',
      },
    },
  },

  'js-2-4': {
    langage: 'javascript',
    xp: 40,
    objectif: {
      fr: 'Assembler saisie, conditions et affichage dans un vrai petit outil.',
      en: 'Combine input, conditions and display into a real little tool.',
    },
    explication: {
      fr: `
        <p>Premier projet complet : un <strong>testeur de mot de passe</strong>, comme ceux des
        vrais sites d’inscription.</p>
        <p>Il te manque une seule chose : lire ce que quelqu’un a tapé dans un champ. C’est
        <code>.value</code> :</p>
        <pre>const champ = document.querySelector("#champ");
console.log(champ.value);</pre>
        <p><code>textContent</code> pour le texte affiché dans la page,
        <code>value</code> pour ce qui est <strong>tapé dans un champ</strong>. Les deux ne sont
        pas interchangeables.</p>
        <p>La logique complète, que tu connais déjà :</p>
        <ol>
          <li>attraper le champ, le bouton et la zone de résultat ;</li>
          <li>écouter le clic ;</li>
          <li>dans la fonction : lire <code>.value</code>, tester sa longueur, écrire le verdict.</li>
        </ol>
        <p><strong>Ce que tu construis là existe vraiment</strong> sur tous les sites où tu crées
        un compte. Le tien fait la même chose, avec les mêmes idées.</p>
      `,
      en: `
        <p>First complete project: a <strong>password checker</strong>, like the ones on real
        sign-up pages.</p>
        <p>You are missing one single thing: reading what someone typed into a field. That is
        <code>.value</code>:</p>
        <pre>const champ = document.querySelector("#champ");
console.log(champ.value);</pre>
        <p><code>textContent</code> for text displayed in the page, <code>value</code> for what is
        <strong>typed into a field</strong>. The two are not interchangeable.</p>
        <p>The full logic, which you already know:</p>
        <ol>
          <li>grab the field, the button and the result area;</li>
          <li>listen for the click;</li>
          <li>in the function: read <code>.value</code>, test its length, write the verdict.</li>
        </ol>
        <p><strong>What you are building really exists</strong> on every site where you create an
        account. Yours does the same thing, with the same ideas.</p>
      `,
    },
    exemple: {
      code: {
        html: '<input id="champ" value="salut" />\n<button id="lire">Lire</button>\n<p id="sortie">—</p>',
        js: 'const champ = document.querySelector("#champ");\nconst lire = document.querySelector("#lire");\nconst sortie = document.querySelector("#sortie");\n\nlire.addEventListener("click", function () {\n  sortie.textContent = "Tu as tapé : " + champ.value;\n});',
      },
      note: {
        fr: 'Change le texte du champ dans l’aperçu, puis clique : c’est bien <code>.value</code> qui est lu.',
        en: 'Change the field’s text in the preview, then click: it really is <code>.value</code> being read.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Au clic sur <code>#tester</code>, écris dans <code>#verdict</code> :</p><ul><li><code>Trop court</code> si le mot de passe fait moins de 8 caractères ;</li><li><code>Correct</code> sinon.</li></ul><p>Le champ contient déjà <code>abc</code> : ton verdict de départ doit donc être <code>Trop court</code>.</p>',
        en: '<p>On a click on <code>#tester</code>, write into <code>#verdict</code>:</p><ul><li><code>Trop court</code> if the password is under 8 characters;</li><li><code>Correct</code> otherwise.</li></ul><p>The field already contains <code>abc</code>: so your first verdict must be <code>Trop court</code>.</p>',
      },
      depart: {
        html: '<h1>Testeur de mot de passe</h1>\n<input id="motdepasse" value="abc" />\n<button id="tester">Tester</button>\n<p id="verdict">En attente</p>',
        js: 'const motdepasse = document.querySelector("#motdepasse");\nconst tester = document.querySelector("#tester");\nconst verdict = document.querySelector("#verdict");\n\n// Au clic : lire .value, tester la longueur, écrire le verdict\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: '\\.value',
          message: {
            fr: 'Ce qui est tapé dans un champ se lit avec <code>.value</code>, pas <code>.textContent</code>.',
            en: 'What is typed in a field is read with <code>.value</code>, not <code>.textContent</code>.',
          },
        },
        { type: 'dom', clic: '#tester', selecteur: '#verdict', quoi: 'texte', attendu: 'Trop court', exact: true },
      ],
      indices: [
        {
          fr: 'Le squelette : <code>tester.addEventListener("click", function () { … });</code>',
          en: 'The skeleton: <code>tester.addEventListener("click", function () { … });</code>',
        },
        {
          fr: 'À l’intérieur, un <code>if (motdepasse.value.length < 8) { … } else { … }</code>.',
          en: 'Inside, an <code>if (motdepasse.value.length < 8) { … } else { … }</code>.',
        },
        {
          fr: 'Dans chaque branche, une ligne : <code>verdict.textContent = "Trop court";</code> ou <code>"Correct"</code>.',
          en: 'In each branch, one line: <code>verdict.textContent = "Trop court";</code> or <code>"Correct"</code>.',
        },
      ],
      solution: {
        html: '<h1>Testeur de mot de passe</h1>\n<input id="motdepasse" value="abc" />\n<button id="tester">Tester</button>\n<p id="verdict">En attente</p>',
        js: 'const motdepasse = document.querySelector("#motdepasse");\nconst tester = document.querySelector("#tester");\nconst verdict = document.querySelector("#verdict");\n\ntester.addEventListener("click", function () {\n  if (motdepasse.value.length < 8) {\n    verdict.textContent = "Trop court";\n  } else {\n    verdict.textContent = "Correct";\n  }\n});',
      },
    },
    projet: { titre: { fr: 'Mon testeur de mot de passe', en: 'My password checker' } },
  },

  /* ===================================================== Module 3 ========= */

  'js-3-1': {
    langage: 'javascript',
    xp: 25,
    objectif: {
      fr: 'Répéter une action sans recopier les lignes, avec une boucle for.',
      en: 'Repeat an action without copying lines, with a for loop.',
    },
    explication: {
      fr: `
        <p>Tu as déjà vu les boucles en Python. En JavaScript, la forme est plus bavarde mais dit
        exactement la même chose :</p>
        <pre>for (let i = 1; i <= 5; i++) {
  console.log("Tour numéro " + i);
}</pre>
        <p>Trois morceaux, séparés par des points-virgules, entre les parenthèses :</p>
        <ul>
          <li><code>let i = 1</code> — <strong>d’où on part</strong> ;</li>
          <li><code>i &lt;= 5</code> — <strong>tant que</strong> c’est vrai, on continue ;</li>
          <li><code>i++</code> — <strong>ce qu’on fait à chaque tour</strong> : ajouter 1.</li>
        </ul>
        <p><code>i++</code> est un raccourci pour <code>i = i + 1</code>. Tu verras aussi
        <code>i += 2</code>, qui ajoute 2.</p>
        <p><strong>Le piège du décalage :</strong> partir de <code>0</code> ou de <code>1</code>
        change le nombre de tours. <code>for (let i = 0; i &lt; 5; i++)</code> et
        <code>for (let i = 1; i &lt;= 5; i++)</code> font tous les deux 5 tours — mais
        <code>i &lt;= 5</code> en partant de 0 en fait 6. Compte toujours tes tours.</p>
      `,
      en: `
        <p>You have already met loops in Python. In JavaScript the form is wordier but says
        exactly the same thing:</p>
        <pre>for (let i = 1; i <= 5; i++) {
  console.log("Round number " + i);
}</pre>
        <p>Three pieces, separated by semicolons, inside the parentheses:</p>
        <ul>
          <li><code>let i = 1</code> — <strong>where we start</strong>;</li>
          <li><code>i &lt;= 5</code> — <strong>while</strong> this is true, keep going;</li>
          <li><code>i++</code> — <strong>what happens each round</strong>: add 1.</li>
        </ul>
        <p><code>i++</code> is shorthand for <code>i = i + 1</code>. You will also see
        <code>i += 2</code>, which adds 2.</p>
        <p><strong>The off-by-one trap:</strong> starting from <code>0</code> or <code>1</code>
        changes the number of rounds. <code>for (let i = 0; i &lt; 5; i++)</code> and
        <code>for (let i = 1; i &lt;= 5; i++)</code> both run 5 times — but <code>i &lt;= 5</code>
        starting from 0 runs 6. Always count your rounds.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Compte à rebours</h1>',
        js: 'for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log("Décollage !");',
      },
      note: {
        fr: 'Ici on descend : <code>i--</code> enlève 1 à chaque tour.',
        en: 'Here we count down: <code>i--</code> subtracts 1 each round.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Affiche la table de 7, de 1 à 10, une ligne par résultat, sous la forme :</p><pre>7 x 1 = 7\n7 x 2 = 14\n…</pre><p>Avec une boucle, évidemment — pas dix <code>console.log</code>.</p>',
        en: '<p>Print the 7 times table, from 1 to 10, one line per result, in the form:</p><pre>7 x 1 = 7\n7 x 2 = 14\n…</pre><p>With a loop, of course — not ten <code>console.log</code> lines.</p>',
      },
      depart: {
        html: '<h1>Table de multiplication</h1>',
        js: '// Une boucle for, de 1 à 10\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s*\\(',
          message: {
            fr: 'Utilise une boucle <code>for</code> : c’est tout l’intérêt de la leçon.',
            en: 'Use a <code>for</code> loop: that is the whole point of this lesson.',
          },
        },
        { type: 'sortieLignes', nombre: 10 },
        { type: 'sortieContient', valeur: '7 x 1 = 7' },
        { type: 'sortieContient', valeur: '7 x 10 = 70' },
      ],
      indices: [
        {
          fr: '<code>for (let i = 1; i <= 10; i++) {</code>',
          en: '<code>for (let i = 1; i <= 10; i++) {</code>',
        },
        {
          fr: 'Le résultat se calcule avec <code>7 * i</code>.',
          en: 'The result is computed with <code>7 * i</code>.',
        },
        {
          fr: 'Assemble la ligne : <code>console.log("7 x " + i + " = " + 7 * i);</code>',
          en: 'Build the line: <code>console.log("7 x " + i + " = " + 7 * i);</code>',
        },
      ],
      solution: {
        html: '<h1>Table de multiplication</h1>',
        js: 'for (let i = 1; i <= 10; i++) {\n  console.log("7 x " + i + " = " + 7 * i);\n}',
      },
    },
  },

  'js-3-2': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Ranger plusieurs valeurs dans un tableau et les parcourir.',
      en: 'Store several values in an array and go through them.',
    },
    explication: {
      fr: `
        <p>Une variable range une valeur. Un <strong>tableau</strong> en range autant que tu
        veux, dans l’ordre :</p>
        <pre>const jeux = ["Minecraft", "Zelda", "Mario"];</pre>
        <p>Crochets, valeurs séparées par des virgules. On accède à chacune par sa
        <strong>position</strong> :</p>
        <pre>console.log(jeux[0]);   // Minecraft
console.log(jeux[2]);   // Mario
console.log(jeux.length); // 3</pre>
        <p><strong>La numérotation commence à zéro.</strong> Le premier est <code>jeux[0]</code>,
        le dernier est <code>jeux[jeux.length - 1]</code>. C’est déroutant au début, c’est
        pareil dans presque tous les langages, et on finit par ne plus y penser.</p>
        <p>Pour tout parcourir, la boucle <code>for</code> et la longueur du tableau :</p>
        <pre>for (let i = 0; i < jeux.length; i++) {
  console.log(jeux[i]);
}</pre>
        <p><strong>Remarque la condition :</strong> <code>i &lt; jeux.length</code>, avec un
        « strictement plus petit ». Avec <code>&lt;=</code> tu irais chercher une case qui
        n’existe pas, et tu obtiendrais <code>undefined</code>.</p>
      `,
      en: `
        <p>A variable holds one value. An <strong>array</strong> holds as many as you like, in
        order:</p>
        <pre>const jeux = ["Minecraft", "Zelda", "Mario"];</pre>
        <p>Square brackets, values separated by commas. Each one is reached by its
        <strong>position</strong>:</p>
        <pre>console.log(jeux[0]);   // Minecraft
console.log(jeux[2]);   // Mario
console.log(jeux.length); // 3</pre>
        <p><strong>Numbering starts at zero.</strong> The first is <code>jeux[0]</code>, the last
        is <code>jeux[jeux.length - 1]</code>. It is confusing at first, it is the same in almost
        every language, and eventually you stop noticing.</p>
        <p>To go through everything, a <code>for</code> loop and the array’s length:</p>
        <pre>for (let i = 0; i < jeux.length; i++) {
  console.log(jeux[i]);
}</pre>
        <p><strong>Notice the condition:</strong> <code>i &lt; jeux.length</code>, strictly less
        than. With <code>&lt;=</code> you would reach for a slot that does not exist, and get
        <code>undefined</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Ma collection</h1>',
        js: 'const jeux = ["Minecraft", "Zelda", "Mario"];\n\nconsole.log("J\'ai " + jeux.length + " jeux");\n\nfor (let i = 0; i < jeux.length; i++) {\n  console.log((i + 1) + ". " + jeux[i]);\n}',
      },
      note: {
        fr: 'On affiche <code>i + 1</code> pour numéroter à partir de 1, plus lisible pour un humain.',
        en: 'We print <code>i + 1</code> to number from 1, which reads better for a human.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée un tableau <code>notes</code> contenant <code>12, 15, 8, 17</code>.</p><p>Parcours-le avec une boucle pour calculer le <strong>total</strong>, puis affiche exactement :</p><p><code>Total : 52</code></p>',
        en: '<p>Create a <code>notes</code> array holding <code>12, 15, 8, 17</code>.</p><p>Loop through it to compute the <strong>total</strong>, then print exactly:</p><p><code>Total : 52</code></p>',
      },
      depart: {
        html: '<h1>Moyenne</h1>',
        js: 'const notes = [12, 15, 8, 17];\nlet total = 0;\n\n// Parcours le tableau et ajoute chaque note au total\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'for\\s*\\(',
          message: {
            fr: 'Il faut une boucle : additionner les quatre à la main ne marcherait plus avec dix notes.',
            en: 'You need a loop: adding the four by hand would break with ten marks.',
          },
        },
        {
          type: 'codeNeContientPas',
          motif: 'Total\\s*:\\s*52|total\\s*=\\s*52',
          message: {
            fr: 'Le total doit être calculé par la boucle, pas écrit en dur.',
            en: 'The total must be computed by the loop, not written by hand.',
          },
        },
        { type: 'sortieContient', valeur: 'Total : 52' },
      ],
      indices: [
        {
          fr: 'La boucle va de <code>0</code> à <code>notes.length - 1</code> : <code>for (let i = 0; i < notes.length; i++) {</code>',
          en: 'The loop runs from <code>0</code> to <code>notes.length - 1</code>: <code>for (let i = 0; i < notes.length; i++) {</code>',
        },
        {
          fr: 'Dans la boucle : <code>total = total + notes[i];</code>',
          en: 'Inside the loop: <code>total = total + notes[i];</code>',
        },
        {
          fr: 'L’affichage vient <strong>après</strong> la boucle, une seule fois : <code>console.log("Total : " + total);</code>',
          en: 'The print comes <strong>after</strong> the loop, once: <code>console.log("Total : " + total);</code>',
        },
      ],
      solution: {
        html: '<h1>Moyenne</h1>',
        js: 'const notes = [12, 15, 8, 17];\nlet total = 0;\n\nfor (let i = 0; i < notes.length; i++) {\n  total = total + notes[i];\n}\n\nconsole.log("Total : " + total);',
      },
    },
  },

  'js-3-3': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Créer ta propre fonction, pour réutiliser un morceau de code.',
      en: 'Create your own function, to reuse a piece of code.',
    },
    explication: {
      fr: `
        <p>Une fonction est un morceau de code qu’on range sous un nom, pour le rappeler autant de
        fois qu’on veut :</p>
        <pre>function saluer(prenom) {
  return "Bonjour " + prenom + " !";
}

console.log(saluer("Théo"));
console.log(saluer("Lina"));</pre>
        <ul>
          <li><code>function</code> — on en déclare une ;</li>
          <li><code>prenom</code> — le <strong>paramètre</strong> : ce qu’elle attend ;</li>
          <li><code>return</code> — ce qu’elle <strong>renvoie</strong> à celui qui l’appelle.</li>
        </ul>
        <p>Écrire la fonction ne l’exécute pas. C’est l’<strong>appel</strong>,
        <code>saluer("Théo")</code>, qui la déclenche.</p>
        <p><strong>Ne confonds pas <code>return</code> et <code>console.log</code>.</strong>
        <code>console.log</code> <em>affiche</em> et n’est utile qu’à toi. <code>return</code>
        <em>rend une valeur</em> au reste du programme, qui peut la ranger, la comparer,
        l’additionner. Une fonction qui affiche au lieu de renvoyer est une fonction qu’on ne peut
        pas réutiliser.</p>
        <p>Attention aussi : après un <code>return</code>, la fonction s’arrête immédiatement.
        Tout ce qui suit dans le bloc est ignoré.</p>
      `,
      en: `
        <p>A function is a piece of code stored under a name, to be called as often as you
        like:</p>
        <pre>function saluer(prenom) {
  return "Hello " + prenom + "!";
}

console.log(saluer("Théo"));
console.log(saluer("Lina"));</pre>
        <ul>
          <li><code>function</code> — declares one;</li>
          <li><code>prenom</code> — the <strong>parameter</strong>: what it expects;</li>
          <li><code>return</code> — what it <strong>gives back</strong> to the caller.</li>
        </ul>
        <p>Writing the function does not run it. It is the <strong>call</strong>,
        <code>saluer("Théo")</code>, that fires it.</p>
        <p><strong>Do not confuse <code>return</code> and <code>console.log</code>.</strong>
        <code>console.log</code> <em>displays</em> and is only useful to you. <code>return</code>
        <em>hands a value back</em> to the rest of the program, which can store it, compare it,
        add to it. A function that prints instead of returning is a function you cannot reuse.</p>
        <p>Careful too: after a <code>return</code>, the function stops immediately. Anything
        below it in the block is ignored.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Fonctions</h1>',
        js: 'function carre(n) {\n  return n * n;\n}\n\nconsole.log(carre(6));\nconsole.log(carre(9));\nconsole.log(carre(3) + carre(4));',
      },
      note: {
        fr: 'La dernière ligne montre l’intérêt de <code>return</code> : on peut calculer avec le résultat.',
        en: 'The last line shows why <code>return</code> matters: you can compute with the result.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris une fonction <code>prixTotal(prix, quantite)</code> qui <strong>renvoie</strong> le prix multiplié par la quantité.</p><p>Puis affiche <code>prixTotal(4, 3)</code> et <code>prixTotal(12, 5)</code>, soit deux lignes : <code>12</code> et <code>60</code>.</p>',
        en: '<p>Write a <code>prixTotal(prix, quantite)</code> function that <strong>returns</strong> the price times the quantity.</p><p>Then print <code>prixTotal(4, 3)</code> and <code>prixTotal(12, 5)</code>, giving two lines: <code>12</code> and <code>60</code>.</p>',
      },
      depart: {
        html: '<h1>Caisse</h1>',
        js: '// Déclare la fonction, puis appelle-la deux fois\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'function\\s+prixTotal\\s*\\(',
          message: {
            fr: 'La fonction doit s’appeler exactement <code>prixTotal</code>.',
            en: 'The function must be named exactly <code>prixTotal</code>.',
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
        { type: 'sortieContient', valeur: '12' },
        { type: 'sortieContient', valeur: '60' },
      ],
      indices: [
        {
          fr: 'Deux paramètres se séparent par une virgule : <code>function prixTotal(prix, quantite) {</code>',
          en: 'Two parameters are separated by a comma: <code>function prixTotal(prix, quantite) {</code>',
        },
        {
          fr: 'Une seule ligne à l’intérieur : <code>return prix * quantite;</code>',
          en: 'One line inside: <code>return prix * quantite;</code>',
        },
        {
          fr: 'Puis, en dehors : <code>console.log(prixTotal(4, 3));</code> et la même chose avec <code>12, 5</code>.',
          en: 'Then, outside: <code>console.log(prixTotal(4, 3));</code> and the same with <code>12, 5</code>.',
        },
      ],
      solution: {
        html: '<h1>Caisse</h1>',
        js: 'function prixTotal(prix, quantite) {\n  return prix * quantite;\n}\n\nconsole.log(prixTotal(4, 3));\nconsole.log(prixTotal(12, 5));',
      },
    },
  },

  'js-3-4': {
    langage: 'javascript',
    xp: 45,
    objectif: {
      fr: 'Construire un quiz interactif qui compte les bonnes réponses.',
      en: 'Build an interactive quiz that counts correct answers.',
    },
    explication: {
      fr: `
        <p>Tu as maintenant les cinq briques d’une vraie application : variables, conditions,
        boucles, fonctions, événements. Assemblons-les.</p>
        <p>Le principe d’un quiz tient en trois idées :</p>
        <ol>
          <li>un <strong>score</strong> rangé dans un <code>let</code>, qui commence à zéro ;</li>
          <li>chaque bouton de réponse <strong>écoute le clic</strong> ;</li>
          <li>si la réponse est la bonne, le score monte, et on l’<strong>affiche</strong>.</li>
        </ol>
        <p>Une astuce très employée : plutôt que d’écrire un écouteur par bouton, on met la bonne
        réponse dans le HTML et on écrit <strong>une seule</strong> fonction :</p>
        <pre>bouton.addEventListener("click", function () {
  if (bouton.dataset.bonne === "oui") {
    score = score + 1;
  }
});</pre>
        <p><code>data-bonne="oui"</code> dans le HTML devient <code>bouton.dataset.bonne</code>
        dans le JavaScript. C’est la façon officielle de coller une information sur un élément.</p>
        <p><strong>Ce projet est enregistré dans ta galerie</strong> comme un vrai fichier
        <code>.html</code> : tu pourras le faire passer à quelqu’un pour qu’il y joue.</p>
      `,
      en: `
        <p>You now have the five building blocks of a real application: variables, conditions,
        loops, functions, events. Let us put them together.</p>
        <p>A quiz rests on three ideas:</p>
        <ol>
          <li>a <strong>score</strong> in a <code>let</code>, starting at zero;</li>
          <li>each answer button <strong>listens for a click</strong>;</li>
          <li>if the answer is right, the score goes up, and you <strong>display</strong> it.</li>
        </ol>
        <p>A very common trick: instead of writing one listener per button, put the right answer
        in the HTML and write <strong>a single</strong> function:</p>
        <pre>bouton.addEventListener("click", function () {
  if (bouton.dataset.bonne === "oui") {
    score = score + 1;
  }
});</pre>
        <p><code>data-bonne="oui"</code> in the HTML becomes <code>bouton.dataset.bonne</code> in
        the JavaScript. It is the official way to attach information to an element.</p>
        <p><strong>This project is saved to your gallery</strong> as a real <code>.html</code>
        file: you will be able to pass it to someone so they can play it.</p>
      `,
    },
    exemple: {
      code: {
        html: '<button class="rep" data-bonne="oui">Paris</button>\n<button class="rep" data-bonne="non">Lyon</button>\n<p id="score">Score : 0</p>',
        js: 'let score = 0;\nconst affichage = document.querySelector("#score");\nconst boutons = document.querySelectorAll(".rep");\n\nfor (let i = 0; i < boutons.length; i++) {\n  boutons[i].addEventListener("click", function () {\n    if (boutons[i].dataset.bonne === "oui") {\n      score = score + 1;\n      affichage.textContent = "Score : " + score;\n    }\n  });\n}',
      },
      note: {
        fr: 'Une boucle installe le même écouteur sur tous les boutons : deux réponses ou vingt, le code ne change pas.',
        en: 'A loop installs the same listener on every button: two answers or twenty, the code is the same.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Fais fonctionner ce quiz. Au clic sur une réponse marquée <code>data-bonne="oui"</code>, le score augmente de 1 et <code>#score</code> affiche <code>Score : 1</code>.</p><p>Une mauvaise réponse ne doit rien changer.</p>',
        en: '<p>Make this quiz work. Clicking an answer marked <code>data-bonne="oui"</code> increases the score by 1 and <code>#score</code> shows <code>Score : 1</code>.</p><p>A wrong answer must change nothing.</p>',
      },
      depart: {
        html: '<h1>Quiz du code</h1>\n<p>Quelle balise fait un titre principal ?</p>\n<button class="rep" data-bonne="non">&lt;p&gt;</button>\n<button class="rep" data-bonne="oui" id="bonne">&lt;h1&gt;</button>\n<button class="rep" data-bonne="non" id="mauvaise">&lt;div&gt;</button>\n<p id="score">Score : 0</p>',
        js: 'let score = 0;\nconst affichage = document.querySelector("#score");\nconst boutons = document.querySelectorAll(".rep");\n\n// Installe un écouteur sur chaque bouton\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'addEventListener',
          message: {
            fr: 'Chaque bouton doit écouter le clic : <code>addEventListener("click", …)</code>.',
            en: 'Each button must listen for the click: <code>addEventListener("click", …)</code>.',
          },
        },
        { type: 'dom', clic: '#mauvaise', selecteur: '#score', quoi: 'texte', attendu: 'Score : 0', exact: true },
        { type: 'dom', clic: '#bonne', selecteur: '#score', quoi: 'texte', attendu: 'Score : 1', exact: true },
      ],
      indices: [
        {
          fr: 'Les trois variables sont déjà là. Il te faut une boucle sur <code>boutons</code>.',
          en: 'All three variables are there. You need a loop over <code>boutons</code>.',
        },
        {
          fr: 'Dans la boucle : <code>boutons[i].addEventListener("click", function () { … });</code>',
          en: 'In the loop: <code>boutons[i].addEventListener("click", function () { … });</code>',
        },
        {
          fr: 'Dans la fonction : <code>if (boutons[i].dataset.bonne === "oui") {</code> puis monter le score et mettre à jour <code>affichage.textContent</code>.',
          en: 'In the function: <code>if (boutons[i].dataset.bonne === "oui") {</code> then raise the score and update <code>affichage.textContent</code>.',
        },
      ],
      solution: {
        html: '<h1>Quiz du code</h1>\n<p>Quelle balise fait un titre principal ?</p>\n<button class="rep" data-bonne="non">&lt;p&gt;</button>\n<button class="rep" data-bonne="oui" id="bonne">&lt;h1&gt;</button>\n<button class="rep" data-bonne="non" id="mauvaise">&lt;div&gt;</button>\n<p id="score">Score : 0</p>',
        js: 'let score = 0;\nconst affichage = document.querySelector("#score");\nconst boutons = document.querySelectorAll(".rep");\n\nfor (let i = 0; i < boutons.length; i++) {\n  boutons[i].addEventListener("click", function () {\n    if (boutons[i].dataset.bonne === "oui") {\n      score = score + 1;\n      affichage.textContent = "Score : " + score;\n    }\n  });\n}',
      },
    },
    projet: { titre: { fr: 'Mon quiz interactif', en: 'My interactive quiz' } },
  },

  /* ===================================================== Module 4 ========= */

  'js-4-1': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Réagir au clavier, pas seulement à la souris.',
      en: 'React to the keyboard, not just the mouse.',
    },
    explication: {
      fr: `
        <p>Un jeu se joue au clavier. L’écouteur se pose sur <code>document</code>, parce qu’une
        touche n’appartient à aucun élément précis :</p>
        <pre>document.addEventListener("keydown", function (evenement) {
  console.log("Touche : " + evenement.key);
});</pre>
        <p>Le paramètre <code>evenement</code> est un objet que le navigateur te donne, rempli
        d’informations sur ce qui vient de se passer. Le plus utile ici :
        <code>evenement.key</code>, le nom de la touche.</p>
        <p>Les noms à connaître : <code>"ArrowLeft"</code>, <code>"ArrowRight"</code>,
        <code>"ArrowUp"</code>, <code>"ArrowDown"</code>, <code>" "</code> pour la barre d’espace,
        <code>"Enter"</code>. Les lettres sont simplement <code>"a"</code>, <code>"b"</code>…</p>
        <p><strong>Le doute du débutant :</strong> « comment je devine ces noms ? » On ne les
        devine pas — on met un <code>console.log(evenement.key)</code>, on appuie sur la touche,
        et on lit. C’est exactement ce que font les développeurs professionnels.</p>
      `,
      en: `
        <p>A game is played on the keyboard. The listener goes on <code>document</code>, because a
        key does not belong to any particular element:</p>
        <pre>document.addEventListener("keydown", function (evenement) {
  console.log("Key: " + evenement.key);
});</pre>
        <p>The <code>evenement</code> parameter is an object the browser hands you, full of
        information about what just happened. The most useful one here:
        <code>evenement.key</code>, the key’s name.</p>
        <p>Names worth knowing: <code>"ArrowLeft"</code>, <code>"ArrowRight"</code>,
        <code>"ArrowUp"</code>, <code>"ArrowDown"</code>, <code>" "</code> for the space bar,
        <code>"Enter"</code>. Letters are simply <code>"a"</code>, <code>"b"</code>…</p>
        <p><strong>The beginner’s doubt:</strong> "how am I supposed to guess these names?" You do
        not — you add a <code>console.log(evenement.key)</code>, press the key, and read. That is
        exactly what professional developers do.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Appuie sur une touche</h1>\n<p id="touche">—</p>',
        js: 'const affichage = document.querySelector("#touche");\n\ndocument.addEventListener("keydown", function (evenement) {\n  affichage.textContent = "Tu as appuyé sur : " + evenement.key;\n});',
      },
      note: {
        fr: 'Clique d’abord dans l’aperçu pour lui donner le focus, puis tape sur une touche.',
        en: 'Click inside the preview first to give it focus, then press a key.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écoute le clavier sur <code>document</code>. Quand on appuie sur <code>ArrowRight</code>, <code>#direction</code> doit afficher <code>Droite</code>.</p><p>Toute autre touche ne doit rien changer.</p>',
        en: '<p>Listen to the keyboard on <code>document</code>. When <code>ArrowRight</code> is pressed, <code>#direction</code> must show <code>Droite</code>.</p><p>Any other key must change nothing.</p>',
      },
      depart: {
        html: '<h1>Manette</h1>\n<p id="direction">Immobile</p>',
        js: 'const direction = document.querySelector("#direction");\n\n// Écoute keydown sur document\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'addEventListener\\s*\\(\\s*["\']keydown["\']',
          message: {
            fr: 'Il manque l’écouteur : <code>document.addEventListener("keydown", function (evenement) { … });</code>',
            en: 'The listener is missing: <code>document.addEventListener("keydown", function (evenement) { … });</code>',
          },
        },
        {
          type: 'dom',
          touche: 'ArrowLeft',
          selecteur: '#direction',
          quoi: 'texte',
          attendu: 'Immobile',
          exact: true,
          message: {
            fr: 'Une autre touche ne doit rien changer : teste bien <code>evenement.key</code> avant d’agir.',
            en: 'Another key must change nothing: test <code>evenement.key</code> before acting.',
          },
        },
        { type: 'dom', touche: 'ArrowRight', selecteur: '#direction', quoi: 'texte', attendu: 'Droite', exact: true },
      ],
      indices: [
        {
          fr: 'L’écouteur va sur <code>document</code>, pas sur <code>#direction</code>.',
          en: 'The listener goes on <code>document</code>, not on <code>#direction</code>.',
        },
        {
          fr: 'N’oublie pas le paramètre : <code>function (evenement) {</code>',
          en: 'Do not forget the parameter: <code>function (evenement) {</code>',
        },
        {
          fr: 'À l’intérieur : <code>if (evenement.key === "ArrowRight") { direction.textContent = "Droite"; }</code>',
          en: 'Inside: <code>if (evenement.key === "ArrowRight") { direction.textContent = "Droite"; }</code>',
        },
      ],
      solution: {
        html: '<h1>Manette</h1>\n<p id="direction">Immobile</p>',
        js: 'const direction = document.querySelector("#direction");\n\ndocument.addEventListener("keydown", function (evenement) {\n  if (evenement.key === "ArrowRight") {\n    direction.textContent = "Droite";\n  }\n});',
      },
    },
  },

  'js-4-2': {
    langage: 'javascript',
    xp: 30,
    objectif: {
      fr: 'Faire répéter une action toute seule, à intervalle régulier.',
      en: 'Make an action repeat by itself, at a regular interval.',
    },
    explication: {
      fr: `
        <p>Une boucle <code>for</code> va aussi vite que possible : elle finit avant même que
        l’écran ait le temps d’afficher quoi que ce soit. Pour que les choses arrivent
        <strong>dans le temps</strong>, il faut <code>setInterval</code> :</p>
        <pre>setInterval(function () {
  console.log("une seconde de plus");
}, 1000);</pre>
        <p>La fonction est rejouée <strong>toutes les 1000 millisecondes</strong>, c’est-à-dire
        chaque seconde, indéfiniment. Pour arrêter, il faut retenir l’identifiant renvoyé :</p>
        <pre>const minuteur = setInterval(function () {
  compte = compte - 1;
  if (compte === 0) {
    clearInterval(minuteur);
  }
}, 100);</pre>
        <p><strong>Le piège du premier tour :</strong> <code>setInterval</code> attend le
        <em>premier</em> délai avant la <em>première</em> exécution. Si tu veux que quelque chose
        s’affiche tout de suite, il faut l’afficher une fois <strong>avant</strong> de lancer le
        minuteur. Beaucoup de compteurs qui « commencent en retard » ont exactement ce bug.</p>
      `,
      en: `
        <p>A <code>for</code> loop runs as fast as it can: it finishes before the screen has even
        had time to show anything. For things to happen <strong>over time</strong>, you need
        <code>setInterval</code>:</p>
        <pre>setInterval(function () {
  console.log("one more second");
}, 1000);</pre>
        <p>The function is replayed <strong>every 1000 milliseconds</strong>, that is every
        second, forever. To stop it, keep the id it returns:</p>
        <pre>const minuteur = setInterval(function () {
  compte = compte - 1;
  if (compte === 0) {
    clearInterval(minuteur);
  }
}, 100);</pre>
        <p><strong>The first-round trap:</strong> <code>setInterval</code> waits the
        <em>first</em> delay before the <em>first</em> run. If you want something on screen right
        away, you must display it once <strong>before</strong> starting the timer. Many counters
        that "start late" have exactly this bug.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1 id="compteur">3</h1>',
        js: 'const compteur = document.querySelector("#compteur");\nlet reste = 3;\n\nconst minuteur = setInterval(function () {\n  reste = reste - 1;\n  compteur.textContent = reste;\n  if (reste === 0) {\n    compteur.textContent = "Partez !";\n    clearInterval(minuteur);\n  }\n}, 100);',
      },
      note: {
        fr: 'Relance l’exemple : le compte à rebours redémarre. Change <code>100</code> en <code>1000</code> pour le voir au ralenti.',
        en: 'Run the example again: the countdown restarts. Change <code>100</code> to <code>1000</code> to watch it in slow motion.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Fais un compte à rebours de <code>5</code> à <code>0</code>, un pas toutes les <code>100</code> millisecondes.</p><p>À zéro, <code>#compteur</code> doit afficher <code>Décollage !</code> et le minuteur doit s’arrêter avec <code>clearInterval</code>.</p>',
        en: '<p>Build a countdown from <code>5</code> to <code>0</code>, one step every <code>100</code> milliseconds.</p><p>At zero, <code>#compteur</code> must show <code>Décollage !</code> and the timer must stop with <code>clearInterval</code>.</p>',
      },
      depart: {
        html: '<h1>Lancement</h1>\n<div id="compteur">5</div>',
        js: 'const compteur = document.querySelector("#compteur");\nlet reste = 5;\n\n// setInterval toutes les 100 ms, clearInterval à zéro\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'setInterval',
          message: {
            fr: 'Il faut un <code>setInterval</code> : une boucle <code>for</code> irait trop vite pour être vue.',
            en: 'You need a <code>setInterval</code>: a <code>for</code> loop would be too fast to see.',
          },
        },
        {
          type: 'codeContient',
          motif: 'clearInterval',
          message: {
            fr: 'Sans <code>clearInterval</code>, le compte à rebours continuerait dans les nombres négatifs.',
            en: 'Without <code>clearInterval</code>, the countdown would carry on into negative numbers.',
          },
        },
        { type: 'dom', selecteur: '#compteur', quoi: 'texte', attendu: 'Décollage !', exact: true },
      ],
      indices: [
        {
          fr: 'Range le minuteur dans une variable, tu en auras besoin pour l’arrêter : <code>const minuteur = setInterval(function () {</code>',
          en: 'Store the timer in a variable, you will need it to stop: <code>const minuteur = setInterval(function () {</code>',
        },
        {
          fr: 'Dans la fonction : <code>reste = reste - 1;</code> puis <code>compteur.textContent = reste;</code>',
          en: 'In the function: <code>reste = reste - 1;</code> then <code>compteur.textContent = reste;</code>',
        },
        {
          fr: 'Puis <code>if (reste === 0) { compteur.textContent = "Décollage !"; clearInterval(minuteur); }</code>, et <code>}, 100);</code> pour fermer.',
          en: 'Then <code>if (reste === 0) { compteur.textContent = "Décollage !"; clearInterval(minuteur); }</code>, and <code>}, 100);</code> to close.',
        },
      ],
      solution: {
        html: '<h1>Lancement</h1>\n<div id="compteur">5</div>',
        js: 'const compteur = document.querySelector("#compteur");\nlet reste = 5;\n\nconst minuteur = setInterval(function () {\n  reste = reste - 1;\n  compteur.textContent = reste;\n  if (reste === 0) {\n    compteur.textContent = "Décollage !";\n    clearInterval(minuteur);\n  }\n}, 100);',
      },
    },
  },

  'js-4-3': {
    langage: 'javascript',
    xp: 35,
    objectif: {
      fr: 'Dessiner des formes sur un canvas, la toile du programmeur.',
      en: 'Draw shapes on a canvas, the programmer’s canvas.',
    },
    explication: {
      fr: `
        <p>Le <code>&lt;canvas&gt;</code> est un rectangle vide où le JavaScript peut dessiner
        pixel par pixel. C’est là-dessus que sont faits presque tous les jeux du web.</p>
        <p>Toujours les deux mêmes lignes pour commencer :</p>
        <pre>const toile = document.querySelector("canvas");
const c = toile.getContext("2d");</pre>
        <p><code>c</code> est le <strong>pinceau</strong>. Tout passe par lui :</p>
        <pre>c.fillStyle = "#00e5ff";        // la couleur
c.fillRect(20, 30, 100, 60);    // x, y, largeur, hauteur</pre>
        <p>Le repère est un peu déroutant : <code>(0, 0)</code> est le coin <strong>haut</strong>
        gauche, et <code>y</code> augmente vers le <strong>bas</strong>. À l’envers de ce qu’on
        apprend en maths.</p>
        <p>Pour un disque, il faut passer par un chemin :</p>
        <pre>c.beginPath();
c.arc(150, 80, 40, 0, Math.PI * 2);
c.fill();</pre>
        <p>Centre en x, centre en y, rayon, puis l’angle de départ et l’angle d’arrivée.
        <code>Math.PI * 2</code> est un tour complet.</p>
        <p><strong>À retenir :</strong> il faut d’abord choisir la couleur, ensuite dessiner. Dans
        l’autre ordre, tu peins avec la couleur précédente — c’est l’erreur la plus fréquente sur
        un canvas.</p>
      `,
      en: `
        <p>The <code>&lt;canvas&gt;</code> is an empty rectangle where JavaScript can draw pixel
        by pixel. Almost every web game is built on one.</p>
        <p>Always the same two lines to start:</p>
        <pre>const toile = document.querySelector("canvas");
const c = toile.getContext("2d");</pre>
        <p><code>c</code> is the <strong>brush</strong>. Everything goes through it:</p>
        <pre>c.fillStyle = "#00e5ff";        // the colour
c.fillRect(20, 30, 100, 60);    // x, y, width, height</pre>
        <p>The coordinate system is a little confusing: <code>(0, 0)</code> is the
        <strong>top</strong> left corner, and <code>y</code> grows <strong>downwards</strong>. The
        opposite of what you learn in maths.</p>
        <p>For a disc you go through a path:</p>
        <pre>c.beginPath();
c.arc(150, 80, 40, 0, Math.PI * 2);
c.fill();</pre>
        <p>Centre x, centre y, radius, then the start and end angle. <code>Math.PI * 2</code> is a
        full turn.</p>
        <p><strong>Remember:</strong> pick the colour first, then draw. The other way round you
        paint with the previous colour — the most common canvas mistake there is.</p>
      `,
    },
    exemple: {
      code: {
        html: '<canvas id="toile" width="320" height="200"></canvas>',
        js: 'const toile = document.querySelector("#toile");\nconst c = toile.getContext("2d");\n\nc.fillStyle = "#0b0e1a";\nc.fillRect(0, 0, 320, 200);\n\nc.fillStyle = "#00e5ff";\nc.fillRect(20, 20, 100, 60);\n\nc.fillStyle = "#ff3d8b";\nc.beginPath();\nc.arc(220, 100, 40, 0, Math.PI * 2);\nc.fill();',
      },
      note: {
        fr: 'Un fond, un rectangle, un disque : trois couleurs choisies avant chaque dessin.',
        en: 'A background, a rectangle, a disc: three colours chosen before each shape.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Sur le canvas de 320 × 200 :</p><ul><li>peins tout le fond en <code>#0b0e1a</code> ;</li><li>dessine un carré <code>#3dffa8</code> de 80 × 80 à la position (40, 60) ;</li><li>dessine un disque <code>#ffd93d</code> de rayon 35 centré en (230, 100).</li></ul>',
        en: '<p>On the 320 × 200 canvas:</p><ul><li>paint the whole background <code>#0b0e1a</code>;</li><li>draw an 80 × 80 <code>#3dffa8</code> square at (40, 60);</li><li>draw a <code>#ffd93d</code> disc of radius 35 centred at (230, 100).</li></ul>',
      },
      depart: {
        html: '<canvas id="toile" width="320" height="200"></canvas>',
        js: 'const toile = document.querySelector("#toile");\nconst c = toile.getContext("2d");\n\n// Le fond, le carré, le disque\n',
      },
      verifications: [
        { type: 'canvasDessine', selecteur: '#toile' },
        {
          type: 'codeContient',
          motif: 'fillRect',
          message: {
            fr: 'Le fond et le carré se dessinent avec <code>fillRect</code>.',
            en: 'The background and the square are drawn with <code>fillRect</code>.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.arc\\s*\\(',
          message: {
            fr: 'Le disque demande un <code>c.arc(...)</code> entre <code>beginPath()</code> et <code>fill()</code>.',
            en: 'The disc needs a <code>c.arc(...)</code> between <code>beginPath()</code> and <code>fill()</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Le fond couvre tout : <code>c.fillRect(0, 0, 320, 200);</code>',
          en: 'The background covers everything: <code>c.fillRect(0, 0, 320, 200);</code>',
        },
        {
          fr: 'Change <code>c.fillStyle</code> <strong>avant</strong> chaque forme, sinon tout aura la même couleur.',
          en: 'Change <code>c.fillStyle</code> <strong>before</strong> each shape, or everything ends up the same colour.',
        },
        {
          fr: 'Le disque : <code>c.beginPath(); c.arc(230, 100, 35, 0, Math.PI * 2); c.fill();</code>',
          en: 'The disc: <code>c.beginPath(); c.arc(230, 100, 35, 0, Math.PI * 2); c.fill();</code>',
        },
      ],
      solution: {
        html: '<canvas id="toile" width="320" height="200"></canvas>',
        js: 'const toile = document.querySelector("#toile");\nconst c = toile.getContext("2d");\n\nc.fillStyle = "#0b0e1a";\nc.fillRect(0, 0, 320, 200);\n\nc.fillStyle = "#3dffa8";\nc.fillRect(40, 60, 80, 80);\n\nc.fillStyle = "#ffd93d";\nc.beginPath();\nc.arc(230, 100, 35, 0, Math.PI * 2);\nc.fill();',
      },
    },
  },

  'js-4-4': {
    langage: 'javascript',
    xp: 35,
    objectif: {
      fr: 'Animer une balle : effacer, déplacer, redessiner.',
      en: 'Animate a ball: clear, move, redraw.',
    },
    explication: {
      fr: `
        <p>Une animation, ce n’est pas une image qui bouge : c’est une suite d’images fixes,
        assez rapprochées pour tromper l’œil. À chaque tour, on refait toujours les
        <strong>trois mêmes gestes</strong> :</p>
        <ol>
          <li><strong>effacer</strong> l’image précédente ;</li>
          <li><strong>déplacer</strong> — changer les coordonnées ;</li>
          <li><strong>redessiner</strong> au nouvel endroit.</li>
        </ol>
        <pre>let x = 20;

setInterval(function () {
  c.fillStyle = "#0b0e1a";
  c.fillRect(0, 0, 320, 200);   // 1. effacer

  x = x + 4;                     // 2. déplacer

  c.fillStyle = "#00e5ff";
  c.beginPath();
  c.arc(x, 100, 20, 0, Math.PI * 2);
  c.fill();                      // 3. redessiner
}, 30);</pre>
        <p><strong>Si tu oublies d’effacer</strong>, la balle laisse une traînée derrière elle —
        chaque image reste. C’est un bug classique… et un joli effet quand on le fait exprès.</p>
        <p>Les positions doivent être des <code>let</code> déclarés <strong>en dehors</strong> de
        la fonction : à l’intérieur, elles repartiraient de zéro à chaque tour et rien ne
        bougerait.</p>
      `,
      en: `
        <p>An animation is not a picture that moves: it is a series of still pictures, close
        enough together to fool the eye. Every round, you always do the <strong>same three
        things</strong>:</p>
        <ol>
          <li><strong>clear</strong> the previous frame;</li>
          <li><strong>move</strong> — change the coordinates;</li>
          <li><strong>redraw</strong> at the new place.</li>
        </ol>
        <pre>let x = 20;

setInterval(function () {
  c.fillStyle = "#0b0e1a";
  c.fillRect(0, 0, 320, 200);   // 1. clear

  x = x + 4;                     // 2. move

  c.fillStyle = "#00e5ff";
  c.beginPath();
  c.arc(x, 100, 20, 0, Math.PI * 2);
  c.fill();                      // 3. redraw
}, 30);</pre>
        <p><strong>If you forget to clear</strong>, the ball leaves a trail behind it — every
        frame stays. A classic bug… and a nice effect when it is on purpose.</p>
        <p>Positions must be <code>let</code> variables declared <strong>outside</strong> the
        function: inside, they would restart from zero every round and nothing would move.</p>
      `,
    },
    exemple: {
      code: {
        html: '<canvas id="toile" width="320" height="200"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nlet x = 20;\n\nsetInterval(function () {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 200);\n\n  x = x + 4;\n  if (x > 320) { x = 0; }\n\n  c.fillStyle = "#00e5ff";\n  c.beginPath();\n  c.arc(x, 100, 20, 0, Math.PI * 2);\n  c.fill();\n}, 30);',
      },
      note: {
        fr: 'Enlève les deux lignes qui effacent, relance, et regarde la traînée apparaître.',
        en: 'Remove the two clearing lines, run again, and watch the trail appear.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Fais descendre une balle. Elle part en haut (<code>y = 20</code>) et gagne <code>5</code> pixels toutes les <code>30</code> millisecondes.</p><p>N’oublie pas d’effacer le canvas à chaque tour, sinon tu obtiendras une colonne au lieu d’une balle.</p><p><strong>Dessine aussi une première image tout de suite</strong>, avant le <code>setInterval</code> : sinon rien n’apparaît pendant les 30 premières millisecondes.</p>',
        en: '<p>Make a ball fall. It starts at the top (<code>y = 20</code>) and gains <code>5</code> pixels every <code>30</code> milliseconds.</p><p>Do not forget to clear the canvas each round, or you will get a column instead of a ball.</p><p><strong>Draw a first frame right away too</strong>, before the <code>setInterval</code>: otherwise nothing shows for the first 30 milliseconds.</p>',
      },
      depart: {
        html: '<canvas id="toile" width="320" height="240"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nlet y = 20;\n\nfunction dessiner() {\n  // 1. effacer   2. dessiner la balle en (160, y)\n}\n\n// Appelle dessiner() une fois, puis lance le setInterval\n',
      },
      verifications: [
        { type: 'canvasDessine', selecteur: '#toile' },
        {
          type: 'codeContient',
          motif: 'setInterval',
          message: {
            fr: 'Sans <code>setInterval</code>, la balle ne bougera jamais.',
            en: 'Without <code>setInterval</code>, the ball will never move.',
          },
        },
        {
          type: 'codeContient',
          motif: 'y\\s*(=\\s*y\\s*\\+|\\+=)\\s*5',
          message: {
            fr: 'La balle doit descendre de 5 pixels : <code>y = y + 5;</code>',
            en: 'The ball must fall 5 pixels: <code>y = y + 5;</code>',
          },
        },
      ],
      indices: [
        {
          fr: 'Dans <code>dessiner()</code> : d’abord <code>c.fillStyle</code> + <code>c.fillRect(0, 0, 320, 240)</code> pour effacer.',
          en: 'In <code>dessiner()</code>: first <code>c.fillStyle</code> + <code>c.fillRect(0, 0, 320, 240)</code> to clear.',
        },
        {
          fr: 'Puis la balle : <code>c.beginPath(); c.arc(160, y, 18, 0, Math.PI * 2); c.fill();</code>',
          en: 'Then the ball: <code>c.beginPath(); c.arc(160, y, 18, 0, Math.PI * 2); c.fill();</code>',
        },
        {
          fr: 'En bas : <code>dessiner();</code> puis <code>setInterval(function () { y = y + 5; dessiner(); }, 30);</code>',
          en: 'At the bottom: <code>dessiner();</code> then <code>setInterval(function () { y = y + 5; dessiner(); }, 30);</code>',
        },
      ],
      solution: {
        html: '<canvas id="toile" width="320" height="240"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nlet y = 20;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 240);\n\n  c.fillStyle = "#00e5ff";\n  c.beginPath();\n  c.arc(160, y, 18, 0, Math.PI * 2);\n  c.fill();\n}\n\ndessiner();\n\nsetInterval(function () {\n  y = y + 5;\n  dessiner();\n}, 30);',
      },
    },
  },

  'js-4-5': {
    langage: 'javascript',
    xp: 35,
    objectif: {
      fr: 'Détecter qu’un objet touche un bord, et le faire rebondir.',
      en: 'Detect an object hitting an edge, and make it bounce.',
    },
    explication: {
      fr: `
        <p>Ta balle sort de l’écran et ne revient jamais. Il lui manque une chose : savoir qu’elle
        a touché un bord.</p>
        <p>Une <strong>collision</strong>, c’est juste une comparaison de nombres. La balle a
        touché le bas quand :</p>
        <pre>if (y + rayon > hauteur) {
  // elle touche le bas
}</pre>
        <p>On teste <code>y + rayon</code>, pas <code>y</code> : le centre de la balle est encore
        dans l’écran quand son bord en sort déjà.</p>
        <p>Pour rebondir, on ne remet pas la balle en place : on <strong>inverse sa
        direction</strong>. C’est pour ça qu’on range la vitesse dans une variable :</p>
        <pre>let vitesseY = 5;

y = y + vitesseY;

if (y + rayon > hauteur || y - rayon < 0) {
  vitesseY = -vitesseY;
}</pre>
        <p><code>-vitesseY</code> transforme +5 en −5, et inversement. Une seule ligne, et la
        balle fait des allers-retours indéfiniment.</p>
        <p><strong>C’est le cœur de tous les jeux d’arcade</strong> — Pong tient entièrement dans
        cette idée. Les positions changent, les vitesses s’inversent, et le reste n’est que
        décoration.</p>
      `,
      en: `
        <p>Your ball leaves the screen and never comes back. It is missing one thing: knowing that
        it hit an edge.</p>
        <p>A <strong>collision</strong> is just a comparison of numbers. The ball has hit the
        bottom when:</p>
        <pre>if (y + rayon > hauteur) {
  // it is touching the bottom
}</pre>
        <p>We test <code>y + rayon</code>, not <code>y</code>: the ball’s centre is still on
        screen when its edge is already off it.</p>
        <p>To bounce, you do not put the ball back: you <strong>flip its direction</strong>. That
        is why the speed lives in a variable:</p>
        <pre>let vitesseY = 5;

y = y + vitesseY;

if (y + rayon > hauteur || y - rayon < 0) {
  vitesseY = -vitesseY;
}</pre>
        <p><code>-vitesseY</code> turns +5 into −5, and back. One line, and the ball bounces back
        and forth forever.</p>
        <p><strong>This is the heart of every arcade game</strong> — Pong fits entirely inside
        this idea. Positions change, speeds flip, and the rest is decoration.</p>
      `,
    },
    exemple: {
      code: {
        html: '<canvas id="toile" width="320" height="200"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nlet x = 30;\nlet vitesseX = 6;\nconst rayon = 18;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 200);\n  c.fillStyle = "#ff3d8b";\n  c.beginPath();\n  c.arc(x, 100, rayon, 0, Math.PI * 2);\n  c.fill();\n}\n\ndessiner();\n\nsetInterval(function () {\n  x = x + vitesseX;\n  if (x + rayon > 320 || x - rayon < 0) {\n    vitesseX = -vitesseX;\n  }\n  dessiner();\n}, 30);',
      },
      note: {
        fr: 'La balle rebondit sur les deux murs, sans jamais s’arrêter. Une seule ligne fait tout le travail.',
        en: 'The ball bounces off both walls, never stopping. One single line does all the work.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Reprends la balle qui descend, et fais-la <strong>rebondir</strong> en haut et en bas.</p><p>Range sa vitesse dans <code>let vitesseY = 5;</code> et inverse-la quand la balle touche un bord — sans oublier le rayon dans le calcul.</p><p>Dessine une première image tout de suite, comme dans la leçon précédente.</p>',
        en: '<p>Take the falling ball again, and make it <strong>bounce</strong> off the top and bottom.</p><p>Store its speed in <code>let vitesseY = 5;</code> and flip it when the ball hits an edge — remembering the radius in the calculation.</p><p>Draw a first frame right away, as in the previous lesson.</p>',
      },
      depart: {
        html: '<canvas id="toile" width="320" height="240"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nconst rayon = 18;\nlet y = 40;\nlet vitesseY = 5;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 240);\n  c.fillStyle = "#3dffa8";\n  c.beginPath();\n  c.arc(160, y, rayon, 0, Math.PI * 2);\n  c.fill();\n}\n\n// Dessine une fois, puis anime avec le rebond\n',
      },
      verifications: [
        { type: 'canvasDessine', selecteur: '#toile' },
        {
          type: 'codeContient',
          motif: 'vitesseY\\s*=\\s*-\\s*vitesseY',
          message: {
            fr: 'Pour rebondir, il faut inverser la vitesse : <code>vitesseY = -vitesseY;</code>',
            en: 'To bounce you must flip the speed: <code>vitesseY = -vitesseY;</code>',
          },
        },
        {
          type: 'codeContient',
          motif: 'rayon',
          message: {
            fr: 'Le rebond se calcule sur le bord de la balle : fais entrer <code>rayon</code> dans ta comparaison.',
            en: 'The bounce is measured at the ball’s edge: bring <code>rayon</code> into your comparison.',
          },
        },
        {
          type: 'codeContient',
          motif: 'setInterval',
          message: {
            fr: 'Il faut un <code>setInterval</code> pour rejouer l’animation.',
            en: 'You need a <code>setInterval</code> to replay the animation.',
          },
        },
      ],
      indices: [
        {
          fr: 'Tout est déjà prêt sauf l’animation : appelle <code>dessiner();</code> une fois, puis lance le minuteur.',
          en: 'Everything is ready except the animation: call <code>dessiner();</code> once, then start the timer.',
        },
        {
          fr: 'Dans le minuteur : <code>y = y + vitesseY;</code> avant le test de collision.',
          en: 'In the timer: <code>y = y + vitesseY;</code> before the collision test.',
        },
        {
          fr: '<code>if (y + rayon > 240 || y - rayon < 0) { vitesseY = -vitesseY; }</code> puis <code>dessiner();</code>',
          en: '<code>if (y + rayon > 240 || y - rayon < 0) { vitesseY = -vitesseY; }</code> then <code>dessiner();</code>',
        },
      ],
      solution: {
        html: '<canvas id="toile" width="320" height="240"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nconst rayon = 18;\nlet y = 40;\nlet vitesseY = 5;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 240);\n  c.fillStyle = "#3dffa8";\n  c.beginPath();\n  c.arc(160, y, rayon, 0, Math.PI * 2);\n  c.fill();\n}\n\ndessiner();\n\nsetInterval(function () {\n  y = y + vitesseY;\n  if (y + rayon > 240 || y - rayon < 0) {\n    vitesseY = -vitesseY;\n  }\n  dessiner();\n}, 30);',
      },
    },
  },

  'js-4-6': {
    langage: 'javascript',
    xp: 50,
    objectif: {
      fr: 'Assembler ton premier jeu : une raquette au clavier et une balle à attraper.',
      en: 'Put together your first game: a keyboard paddle and a ball to catch.',
    },
    explication: {
      fr: `
        <p>Voilà. Tu as toutes les pièces : le canvas, l’animation, les collisions, le clavier, les
        conditions, un score. Un jeu n’est rien d’autre que leur assemblage.</p>
        <p>La structure de <strong>tous</strong> les jeux, sans exception :</p>
        <ol>
          <li>des variables d’état — positions, vitesses, score ;</li>
          <li>des écouteurs — ce que fait le joueur ;</li>
          <li>une <strong>boucle de jeu</strong> qui, sans fin : déplace, teste les collisions,
          redessine.</li>
        </ol>
        <p>Ton jeu : une raquette en bas, déplacée par les flèches ; une balle qui tombe ; un point
        à chaque fois qu’elle est rattrapée.</p>
        <pre>document.addEventListener("keydown", function (evenement) {
  if (evenement.key === "ArrowRight") {
    raquetteX = raquetteX + 20;
  }
});</pre>
        <p>Le clavier ne fait que <strong>changer une variable</strong>. Ce n’est jamais lui qui
        dessine — c’est la boucle de jeu, qui redessine tout à partir de l’état courant. Cette
        séparation entre « l’état » et « l’affichage » est le principe le plus important du
        développement de jeux.</p>
        <p><strong>Ton jeu part dans ta galerie</strong> en fichier <code>.html</code> autonome.
        Tu peux l’envoyer à quelqu’un : il y jouera dans son navigateur, sans rien installer.</p>
      `,
      en: `
        <p>There you are. You have all the pieces: the canvas, animation, collisions, the
        keyboard, conditions, a score. A game is nothing more than their assembly.</p>
        <p>The structure of <strong>every</strong> game, without exception:</p>
        <ol>
          <li>state variables — positions, speeds, score;</li>
          <li>listeners — what the player does;</li>
          <li>a <strong>game loop</strong> that endlessly: moves, tests collisions, redraws.</li>
        </ol>
        <p>Your game: a paddle at the bottom, moved by the arrow keys; a falling ball; a point
        every time it is caught.</p>
        <pre>document.addEventListener("keydown", function (evenement) {
  if (evenement.key === "ArrowRight") {
    raquetteX = raquetteX + 20;
  }
});</pre>
        <p>The keyboard only ever <strong>changes a variable</strong>. It never draws — the game
        loop does, redrawing everything from the current state. This separation between "state"
        and "display" is the single most important principle in game development.</p>
        <p><strong>Your game goes to your gallery</strong> as a standalone <code>.html</code>
        file. You can send it to someone: they will play it in their browser, with nothing to
        install.</p>
      `,
    },
    exemple: {
      code: {
        html: '<canvas id="toile" width="320" height="240"></canvas>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nlet raquetteX = 130;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 240);\n  c.fillStyle = "#00e5ff";\n  c.fillRect(raquetteX, 215, 60, 12);\n}\n\ndessiner();\n\ndocument.addEventListener("keydown", function (evenement) {\n  if (evenement.key === "ArrowRight") { raquetteX = raquetteX + 20; }\n  if (evenement.key === "ArrowLeft") { raquetteX = raquetteX - 20; }\n  dessiner();\n});',
      },
      note: {
        fr: 'Clique dans l’aperçu, puis utilise les flèches : la raquette suit.',
        en: 'Click inside the preview, then use the arrow keys: the paddle follows.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Termine le jeu. Tout est en place sauf deux choses :</p><ul><li>le <strong>clavier</strong> : <code>ArrowRight</code> ajoute 20 à <code>raquetteX</code>, <code>ArrowLeft</code> en enlève 20 ;</li><li>la <strong>boucle de jeu</strong> : toutes les 30 ms, la balle descend de 4, et si elle dépasse le bas, elle repart en haut à une position au hasard.</li></ul><p>Dessine une première image avant de lancer la boucle.</p>',
        en: '<p>Finish the game. Everything is in place except two things:</p><ul><li>the <strong>keyboard</strong>: <code>ArrowRight</code> adds 20 to <code>raquetteX</code>, <code>ArrowLeft</code> takes 20 away;</li><li>the <strong>game loop</strong>: every 30 ms the ball falls 4, and if it passes the bottom it goes back to the top at a random position.</li></ul><p>Draw a first frame before starting the loop.</p>',
      },
      depart: {
        html: '<canvas id="toile" width="320" height="240"></canvas>\n<p id="score">Score : 0</p>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nconst affichage = document.querySelector("#score");\n\nlet raquetteX = 130;\nlet balleX = 160;\nlet balleY = 20;\nlet score = 0;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 240);\n\n  c.fillStyle = "#00e5ff";\n  c.fillRect(raquetteX, 215, 60, 12);\n\n  c.fillStyle = "#ffd93d";\n  c.beginPath();\n  c.arc(balleX, balleY, 10, 0, Math.PI * 2);\n  c.fill();\n}\n\n// 1. Écoute les flèches du clavier\n\n// 2. Dessine une fois, puis lance la boucle de jeu\n',
      },
      verifications: [
        { type: 'canvasDessine', selecteur: '#toile' },
        {
          type: 'codeContient',
          motif: 'addEventListener\\s*\\(\\s*["\']keydown["\']',
          message: {
            fr: 'Le jeu se joue au clavier : il faut un écouteur <code>keydown</code> sur <code>document</code>.',
            en: 'The game is played on the keyboard: you need a <code>keydown</code> listener on <code>document</code>.',
          },
        },
        // Le jeu doit encore repondre APRES que le joueur a appuye sur une
        // touche : un gestionnaire qui planterait laisserait un canvas fige.
        {
          type: 'canvasDessine',
          selecteur: '#toile',
          touche: ['ArrowRight', 'ArrowLeft'],
          message: {
            fr: 'Après un appui sur les flèches, le jeu doit continuer à dessiner. Vérifie que ton gestionnaire de touches ne plante pas.',
            en: 'After pressing the arrow keys, the game must keep drawing. Check that your key handler is not crashing.',
          },
        },
        {
          type: 'codeContient',
          motif: 'setInterval',
          message: {
            fr: 'Il manque la boucle de jeu : <code>setInterval(function () { … }, 30);</code>',
            en: 'The game loop is missing: <code>setInterval(function () { … }, 30);</code>',
          },
        },
        {
          type: 'codeContient',
          motif: 'ArrowRight',
          message: {
            fr: 'Teste le nom exact de la touche : <code>evenement.key === "ArrowRight"</code>.',
            en: 'Test the exact key name: <code>evenement.key === "ArrowRight"</code>.',
          },
        },
      ],
      indices: [
        {
          fr: 'Le clavier ne dessine pas : il change juste <code>raquetteX</code>, puis appelle <code>dessiner()</code>.',
          en: 'The keyboard does not draw: it only changes <code>raquetteX</code>, then calls <code>dessiner()</code>.',
        },
        {
          fr: 'La boucle : <code>balleY = balleY + 4;</code> puis <code>if (balleY > 240) { balleY = 0; balleX = Math.random() * 320; }</code>',
          en: 'The loop: <code>balleY = balleY + 4;</code> then <code>if (balleY > 240) { balleY = 0; balleX = Math.random() * 320; }</code>',
        },
        {
          fr: 'Pour compter un point : si <code>balleY > 205</code> et que <code>balleX</code> est entre <code>raquetteX</code> et <code>raquetteX + 60</code>, monte le score et mets à jour <code>affichage.textContent</code>.',
          en: 'To score: if <code>balleY > 205</code> and <code>balleX</code> is between <code>raquetteX</code> and <code>raquetteX + 60</code>, raise the score and update <code>affichage.textContent</code>.',
        },
      ],
      solution: {
        html: '<canvas id="toile" width="320" height="240"></canvas>\n<p id="score">Score : 0</p>',
        js: 'const c = document.querySelector("#toile").getContext("2d");\nconst affichage = document.querySelector("#score");\n\nlet raquetteX = 130;\nlet balleX = 160;\nlet balleY = 20;\nlet score = 0;\n\nfunction dessiner() {\n  c.fillStyle = "#0b0e1a";\n  c.fillRect(0, 0, 320, 240);\n\n  c.fillStyle = "#00e5ff";\n  c.fillRect(raquetteX, 215, 60, 12);\n\n  c.fillStyle = "#ffd93d";\n  c.beginPath();\n  c.arc(balleX, balleY, 10, 0, Math.PI * 2);\n  c.fill();\n}\n\ndocument.addEventListener("keydown", function (evenement) {\n  if (evenement.key === "ArrowRight") {\n    raquetteX = raquetteX + 20;\n  }\n  if (evenement.key === "ArrowLeft") {\n    raquetteX = raquetteX - 20;\n  }\n  dessiner();\n});\n\ndessiner();\n\nsetInterval(function () {\n  balleY = balleY + 4;\n\n  if (balleY > 205 && balleX > raquetteX && balleX < raquetteX + 60) {\n    score = score + 1;\n    affichage.textContent = "Score : " + score;\n    balleY = 0;\n    balleX = Math.random() * 320;\n  }\n\n  if (balleY > 240) {\n    balleY = 0;\n    balleX = Math.random() * 320;\n  }\n\n  dessiner();\n}, 30);',
      },
    },
    projet: { titre: { fr: 'Mon premier jeu', en: 'My first game' } },
  },
};
