/**
 * Grand projet final — le seul defi transversal du parcours.
 *
 * Il n'apporte pas une notion de plus : il fait tenir ensemble les trois
 * langages du web, ce qu'aucun parcours ne demande seul. Le resultat part
 * dans la galerie sous forme de vrai fichier .html autonome, ouvrable hors
 * de l'application.
 */

export const LECONS_PROJET = {
  'projet-1-1': {
    langage: 'web',
    xp: 80,
    objectif: {
      fr: 'Faire tenir HTML, CSS et JavaScript ensemble dans un vrai site personnel.',
      en: 'Make HTML, CSS and JavaScript work together in a real personal site.',
    },
    explication: {
      fr: `
        <p>Voici le dernier défi, et le plus important. Jusqu’ici tu as appris les trois langages
        du web séparément. Un vrai site, c’est les trois <strong>en même temps</strong>, chacun à
        sa place :</p>
        <ul>
          <li><strong>HTML</strong> — ce qu’il y a sur la page. La structure, le contenu ;</li>
          <li><strong>CSS</strong> — à quoi ça ressemble. Couleurs, espaces, mise en page ;</li>
          <li><strong>JavaScript</strong> — ce qui se passe quand on agit. Les réactions.</li>
        </ul>
        <p>Cette séparation est <strong>la</strong> règle du métier. Quand tu hésites sur l’endroit
        où écrire quelque chose, pose-toi la question : est-ce du contenu, de l’apparence, ou du
        comportement ?</p>
        <p>Ton site est déjà écrit en HTML. Il te reste deux choses :</p>
        <ol>
          <li><strong>l’habiller</strong> — une barre de navigation en Flexbox, des cartes avec des
          coins arrondis ;</li>
          <li><strong>le rendre vivant</strong> — un bouton qui bascule entre thème sombre et
          thème clair.</li>
        </ol>
        <p>Pour la bascule, une seule idée nouvelle, et elle est élégante :</p>
        <pre>document.body.classList.toggle("clair");</pre>
        <p><code>classList.toggle</code> ajoute une classe si elle est absente, l’enlève si elle
        est là. Le JavaScript ne touche <strong>aucune couleur</strong> : il pose juste une
        étiquette, et c’est le CSS qui décide de ce que cette étiquette veut dire.</p>
        <p>C’est exactement comme ça que fonctionne le mode sombre de toutes les applications que
        tu utilises. Tu es en train d’écrire du vrai code de professionnel.</p>
        <p><strong>Ce fichier est à toi.</strong> Il part dans ta galerie en <code>.html</code>
        autonome : double-clique dessus et il s’ouvre dans ton navigateur, sans l’application.
        Tu peux l’envoyer à ta famille, ou le rendre en classe.</p>
      `,
      en: `
        <p>Here is the last challenge, and the most important one. So far you have learned the
        three web languages separately. A real site is all three <strong>at once</strong>, each in
        its place:</p>
        <ul>
          <li><strong>HTML</strong> — what is on the page. Structure, content;</li>
          <li><strong>CSS</strong> — what it looks like. Colours, spacing, layout;</li>
          <li><strong>JavaScript</strong> — what happens when you act. The reactions.</li>
        </ul>
        <p>This separation is <strong>the</strong> rule of the trade. When you hesitate about where
        to write something, ask yourself: is this content, appearance, or behaviour?</p>
        <p>Your site’s HTML is already written. Two things are left:</p>
        <ol>
          <li><strong>dress it</strong> — a Flexbox navigation bar, cards with rounded corners;</li>
          <li><strong>bring it to life</strong> — a button switching between a dark and a light
          theme.</li>
        </ol>
        <p>For the switch, one single new idea, and it is elegant:</p>
        <pre>document.body.classList.toggle("clair");</pre>
        <p><code>classList.toggle</code> adds a class if it is missing, removes it if it is there.
        The JavaScript touches <strong>no colour at all</strong>: it just sticks a label on, and
        the CSS decides what that label means.</p>
        <p>This is exactly how dark mode works in every app you use. You are writing real
        professional code.</p>
        <p><strong>This file is yours.</strong> It goes to your gallery as a standalone
        <code>.html</code>: double-click it and it opens in your browser, without the app. You can
        send it to your family, or hand it in at school.</p>
      `,
    },
    exemple: {
      code: {
        html: '<button id="bascule">Changer de thème</button>\n<p>Regarde le fond changer.</p>',
        css: 'body {\n  background: #0b0e1a;\n  color: #e8ecff;\n  padding: 24px;\n}\n\nbody.clair {\n  background: #f4f6ff;\n  color: #0b0e1a;\n}',
        js: 'document.querySelector("#bascule").addEventListener("click", function () {\n  document.body.classList.toggle("clair");\n});',
      },
      note: {
        fr: 'Le JavaScript ne connaît aucune couleur : il pose une classe, le CSS fait le reste.',
        en: 'The JavaScript knows no colours: it adds a class, the CSS does the rest.',
      },
    },
    defi: {
      consigne: {
        fr: `
          <p>Le HTML de ton site est écrit. À toi de l’habiller et de l’animer.</p>
          <p><strong>Dans l’onglet CSS :</strong></p>
          <ul>
            <li>mets <code>nav</code> en <code>display: flex</code>, avec
            <code>justify-content: space-between</code> et <code>align-items: center</code> ;</li>
            <li>donne à <code>.carte</code> un <code>border-radius</code> de <code>16px</code> et
            un <code>padding</code> de <code>20px</code> ;</li>
            <li>écris la règle du thème clair : <code>body.clair</code> avec le fond
            <code>#f4f6ff</code>.</li>
          </ul>
          <p><strong>Dans l’onglet JS :</strong> au clic sur <code>#bascule</code>, ajoute ou
          enlève la classe <code>clair</code> sur <code>document.body</code>.</p>
          <p>Change le prénom, les textes et les couleurs autant que tu veux : c’est ton site.</p>
        `,
        en: `
          <p>Your site’s HTML is written. Dressing and animating it is up to you.</p>
          <p><strong>In the CSS tab:</strong></p>
          <ul>
            <li>set <code>nav</code> to <code>display: flex</code>, with
            <code>justify-content: space-between</code> and <code>align-items: center</code>;</li>
            <li>give <code>.carte</code> a <code>16px</code> <code>border-radius</code> and a
            <code>20px</code> <code>padding</code>;</li>
            <li>write the light-theme rule: <code>body.clair</code> with background
            <code>#f4f6ff</code>.</li>
          </ul>
          <p><strong>In the JS tab:</strong> on a click on <code>#bascule</code>, add or remove the
          <code>clair</code> class on <code>document.body</code>.</p>
          <p>Change the name, the texts and the colours as much as you like: it is your site.</p>
        `,
      },
      depart: {
        html: `<nav>
  <span class="logo">THÉO</span>
  <button id="bascule">Thème</button>
</nav>

<header>
  <h1>Salut, moi c’est Théo</h1>
  <p class="intro">J’ai 12 ans et j’apprends à coder.</p>
</header>

<section class="cartes">
  <article class="carte">
    <h2>Python</h2>
    <p>Mon premier langage. J’y ai dessiné une rosace.</p>
  </article>
  <article class="carte">
    <h2>Le web</h2>
    <p>HTML, CSS et JavaScript. Cette page en est la preuve.</p>
  </article>
  <article class="carte">
    <h2>C++</h2>
    <p>Le langage des jeux vidéo. Plus exigeant, plus rapide.</p>
  </article>
</section>`,
        css: `body {
  margin: 0;
  padding: 0 0 32px;
  font-family: system-ui, sans-serif;
  background: #0b0e1a;
  color: #e8ecff;
}

nav {
  padding: 16px 24px;
  background: #141a2e;
}

.logo {
  font-weight: 700;
  letter-spacing: 2px;
  color: #3dffa8;
}

header {
  padding: 40px 24px;
}

h1 {
  margin: 0 0 8px;
}

.cartes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
}

.carte {
  background: #1c2440;
}

/* 1. nav en Flexbox
   2. .carte : coins arrondis et padding
   3. la règle body.clair */
`,
        js: '// Au clic sur #bascule : classList.toggle("clair") sur document.body\n',
      },
      verifications: [
        { type: 'dom', selecteur: 'nav', quoi: 'existe' },
        { type: 'dom', selecteur: '.carte', quoi: 'nombre', min: 3 },
        { type: 'style', selecteur: 'nav', propriete: 'display', attendu: 'flex' },
        { type: 'style', selecteur: 'nav', propriete: 'justify-content', attendu: 'space-between' },
        { type: 'style', selecteur: 'nav', propriete: 'align-items', attendu: 'center' },
        { type: 'style', selecteur: '.carte', propriete: 'border-radius', attendu: '16px' },
        { type: 'style', selecteur: '.carte', propriete: 'padding-top', attendu: '20px' },
        {
          type: 'codeContient',
          motif: 'classList\\.toggle',
          message: {
            fr: 'La bascule se fait avec <code>document.body.classList.toggle("clair");</code>',
            en: 'The switch uses <code>document.body.classList.toggle("clair");</code>',
          },
        },
        {
          type: 'style',
          clic: '#bascule',
          selecteur: 'body',
          propriete: 'background-color',
          attendu: 'rgb(244, 246, 255)',
          message: {
            fr: 'Après un clic sur le bouton, le fond doit passer au thème clair <code>#f4f6ff</code>. Vérifie la règle <code>body.clair</code> et ton écouteur.',
            en: 'After clicking the button, the background must switch to the light theme <code>#f4f6ff</code>. Check the <code>body.clair</code> rule and your listener.',
          },
        },
      ],
      indices: [
        {
          fr: 'Commence par le CSS. La règle <code>nav</code> existe déjà : ajoute-lui les trois lignes de Flexbox.',
          en: 'Start with the CSS. The <code>nav</code> rule already exists: add the three Flexbox lines to it.',
        },
        {
          fr: 'Le thème clair est une règle à part : <code>body.clair { background: #f4f6ff; color: #0b0e1a; }</code> — sans espace entre <code>body</code> et <code>.clair</code>.',
          en: 'The light theme is its own rule: <code>body.clair { background: #f4f6ff; color: #0b0e1a; }</code> — no space between <code>body</code> and <code>.clair</code>.',
        },
        {
          fr: 'Le JavaScript tient en trois lignes : <code>document.querySelector("#bascule").addEventListener("click", function () { document.body.classList.toggle("clair"); });</code>',
          en: 'The JavaScript fits in three lines: <code>document.querySelector("#bascule").addEventListener("click", function () { document.body.classList.toggle("clair"); });</code>',
        },
      ],
      solution: {
        html: `<nav>
  <span class="logo">THÉO</span>
  <button id="bascule">Thème</button>
</nav>

<header>
  <h1>Salut, moi c’est Théo</h1>
  <p class="intro">J’ai 12 ans et j’apprends à coder.</p>
</header>

<section class="cartes">
  <article class="carte">
    <h2>Python</h2>
    <p>Mon premier langage. J’y ai dessiné une rosace.</p>
  </article>
  <article class="carte">
    <h2>Le web</h2>
    <p>HTML, CSS et JavaScript. Cette page en est la preuve.</p>
  </article>
  <article class="carte">
    <h2>C++</h2>
    <p>Le langage des jeux vidéo. Plus exigeant, plus rapide.</p>
  </article>
</section>`,
        css: `body {
  margin: 0;
  padding: 0 0 32px;
  font-family: system-ui, sans-serif;
  background: #0b0e1a;
  color: #e8ecff;
}

body.clair {
  background: #f4f6ff;
  color: #0b0e1a;
}

nav {
  padding: 16px 24px;
  background: #141a2e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 700;
  letter-spacing: 2px;
  color: #3dffa8;
}

header {
  padding: 40px 24px;
}

h1 {
  margin: 0 0 8px;
}

.cartes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px;
}

.carte {
  background: #1c2440;
  border-radius: 16px;
  padding: 20px;
}`,
        js: `document.querySelector("#bascule").addEventListener("click", function () {
  document.body.classList.toggle("clair");
});`,
      },
    },
    projet: { titre: { fr: 'Mon site personnel', en: 'My personal site' } },
  },
};
