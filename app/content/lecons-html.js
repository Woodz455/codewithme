/**
 * Parcours HTML — contenu des lecons.
 * Voir `_schema.md` pour la description d'une lecon.
 */

export const LECONS_HTML = {
  /* ===================================================== Module 1 ========= */

  'html-1-1': {
    langage: 'html',
    xp: 20,
    objectif: {
      fr: 'Comprendre ce qu’est une balise, et en écrire une.',
      en: 'Understand what a tag is, and write one.',
    },
    explication: {
      fr: `
        <p>Une page web, c’est du texte avec des <strong>étiquettes</strong> autour. Ces
        étiquettes s’appellent des <strong>balises</strong>, et elles disent au navigateur
        <em>ce qu’est</em> chaque morceau : un titre, un paragraphe, une image…</p>
        <p>Une balise s’écrit entre chevrons, et va presque toujours par paire :</p>
        <p><code>&lt;p&gt;Bonjour&lt;/p&gt;</code></p>
        <ul>
          <li><code>&lt;p&gt;</code> ouvre — c’est la balise de paragraphe ;</li>
          <li><code>&lt;/p&gt;</code> ferme — avec une barre oblique.</li>
        </ul>
        <p>Ce qui est entre les deux est le contenu. Le navigateur affiche le contenu, jamais les
        balises elles-mêmes.</p>
        <p><strong>L’erreur la plus courante :</strong> oublier de fermer. Le navigateur ne
        proteste pas, il fait de son mieux — et le résultat est souvent bizarre.</p>
      `,
      en: `
        <p>A web page is text with <strong>labels</strong> around it. Those labels are called
        <strong>tags</strong>, and they tell the browser <em>what each piece is</em>: a heading,
        a paragraph, an image…</p>
        <p>A tag is written between angle brackets, and almost always comes in a pair:</p>
        <p><code>&lt;p&gt;Hello&lt;/p&gt;</code></p>
        <ul>
          <li><code>&lt;p&gt;</code> opens — it is the paragraph tag;</li>
          <li><code>&lt;/p&gt;</code> closes — with a slash.</li>
        </ul>
        <p>What sits between the two is the content. The browser displays the content, never the
        tags themselves.</p>
        <p><strong>The most common mistake:</strong> forgetting to close. The browser does not
        complain, it does its best — and the result is often odd.</p>
      `,
    },
    exemple: {
      code: '<p>Ceci est un paragraphe.</p>\n<p>Et en voici un deuxième.</p>',
      note: {
        fr: 'Regarde l’aperçu à droite : les balises ont disparu, il reste deux paragraphes.',
        en: 'Look at the preview on the right: the tags are gone, two paragraphs remain.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris <strong>trois paragraphes</strong> qui se présentent : ton prénom, ton âge, et ce que tu aimes.</p><p>Chacun doit être entouré de <code>&lt;p&gt;</code> et <code>&lt;/p&gt;</code>.</p>',
        en: '<p>Write <strong>three paragraphs</strong> introducing yourself: your name, your age, and what you like.</p><p>Each must be wrapped in <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code>.</p>',
      },
      depart: '<!-- Écris tes trois paragraphes ici -->\n',
      verifications: [{ type: 'dom', selecteur: 'p', quoi: 'nombre', attendu: 3 }],
      indices: [
        { fr: 'Une ligne par paragraphe, chacune commençant par <code>&lt;p&gt;</code>.', en: 'One line per paragraph, each starting with <code>&lt;p&gt;</code>.' },
        { fr: 'N’oublie pas de fermer chaque paragraphe avec <code>&lt;/p&gt;</code>.', en: 'Do not forget to close each paragraph with <code>&lt;/p&gt;</code>.' },
        { fr: 'Il en faut exactement trois, ni deux ni quatre.', en: 'You need exactly three, not two or four.' },
      ],
      solution: '<p>Je m\'appelle Théo.</p>\n<p>J\'ai 12 ans.</p>\n<p>J\'aime le foot et les jeux vidéo.</p>',
    },
  },

  'html-1-2': {
    langage: 'html',
    xp: 20,
    objectif: {
      fr: 'Hiérarchiser une page avec des titres de différents niveaux.',
      en: 'Structure a page with headings of different levels.',
    },
    explication: {
      fr: `
        <p>Une page, ce n’est pas une bouillie de paragraphes. Il lui faut des
        <strong>titres</strong>, et surtout des titres de différentes importances.</p>
        <p>HTML en propose six niveaux, de <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> :</p>
        <ul>
          <li><code>&lt;h1&gt;</code> — le titre principal ;</li>
          <li><code>&lt;h2&gt;</code> — les grandes parties ;</li>
          <li><code>&lt;h3&gt;</code> — les sous-parties.</li>
        </ul>
        <p>C’est exactement la logique d’un exposé : un titre, des parties, des sous-parties.</p>
        <p><strong>Une règle importante :</strong> il n’y a qu’<strong>un seul</strong>
        <code>&lt;h1&gt;</code> par page. C’est le sujet de la page. Et on ne saute pas de
        niveau : après un <code>h1</code> vient un <code>h2</code>, pas un <code>h4</code>.</p>
        <p>Ce n’est pas qu’une question de taille : les moteurs de recherche et les lecteurs
        d’écran utilisent cette hiérarchie pour comprendre la page.</p>
      `,
      en: `
        <p>A page is not a mush of paragraphs. It needs <strong>headings</strong>, and above all
        headings of different importance.</p>
        <p>HTML offers six levels, from <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>:</p>
        <ul>
          <li><code>&lt;h1&gt;</code> — the main title;</li>
          <li><code>&lt;h2&gt;</code> — the big sections;</li>
          <li><code>&lt;h3&gt;</code> — the subsections.</li>
        </ul>
        <p>Exactly the logic of a school presentation: a title, sections, subsections.</p>
        <p><strong>An important rule:</strong> there is only <strong>one</strong>
        <code>&lt;h1&gt;</code> per page. It is the subject of the page. And you do not skip
        levels: after an <code>h1</code> comes an <code>h2</code>, not an <code>h4</code>.</p>
        <p>This is not just about size: search engines and screen readers use this hierarchy to
        understand the page.</p>
      `,
    },
    exemple: {
      code: '<h1>Mon carnet de voyage</h1>\n\n<h2>L\'Italie</h2>\n<p>Rome était magnifique.</p>\n\n<h2>L\'Espagne</h2>\n<p>Barcelone aussi.</p>',
      note: {
        fr: 'Le navigateur donne automatiquement une taille à chaque niveau.',
        en: 'The browser automatically gives each level its own size.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Construis la fiche d’un jeu vidéo :</p><ul><li>un <code>&lt;h1&gt;</code> avec le nom du jeu ;</li><li>deux <code>&lt;h2&gt;</code> : <code>Histoire</code> et <code>Personnages</code> ;</li><li>un paragraphe sous chaque <code>&lt;h2&gt;</code>.</li></ul>',
        en: '<p>Build a video game page:</p><ul><li>an <code>&lt;h1&gt;</code> with the game name;</li><li>two <code>&lt;h2&gt;</code>: <code>Histoire</code> and <code>Personnages</code>;</li><li>a paragraph under each <code>&lt;h2&gt;</code>.</li></ul>',
      },
      depart: '<!-- Un h1, deux h2, et un paragraphe sous chacun -->\n',
      verifications: [
        { type: 'dom', selecteur: 'h1', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'h2', quoi: 'nombre', attendu: 2 },
        { type: 'dom', selecteur: 'h2', quoi: 'texte', attendu: { fr: 'Histoire', en: 'Histoire' } },
        { type: 'dom', selecteur: 'h2', quoi: 'texte', attendu: { fr: 'Personnages', en: 'Personnages' } },
        { type: 'dom', selecteur: 'p', quoi: 'nombre', attendu: 2 },
      ],
      indices: [
        { fr: 'Commence par <code>&lt;h1&gt;Le nom du jeu&lt;/h1&gt;</code>.', en: 'Start with <code>&lt;h1&gt;The game name&lt;/h1&gt;</code>.' },
        { fr: 'Puis <code>&lt;h2&gt;Histoire&lt;/h2&gt;</code> suivi d’un <code>&lt;p&gt;</code>.', en: 'Then <code>&lt;h2&gt;Histoire&lt;/h2&gt;</code> followed by a <code>&lt;p&gt;</code>.' },
        { fr: 'Recommence avec <code>&lt;h2&gt;Personnages&lt;/h2&gt;</code> et son paragraphe.', en: 'Repeat with <code>&lt;h2&gt;Personnages&lt;/h2&gt;</code> and its paragraph.' },
      ],
      solution:
        '<h1>Zelda</h1>\n\n<h2>Histoire</h2>\n<p>Un héros part sauver un royaume.</p>\n\n<h2>Personnages</h2>\n<p>Link, Zelda et Ganon.</p>',
    },
  },

  'html-1-3': {
    langage: 'html',
    xp: 25,
    objectif: {
      fr: 'Connaître le squelette complet d’une vraie page web.',
      en: 'Know the full skeleton of a real web page.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici tu écrivais des morceaux. Une <strong>vraie page</strong>, celle qu’on
        enregistre dans un fichier <code>.html</code>, a toujours la même charpente :</p>
        <pre>&lt;!doctype html&gt;
&lt;html lang="fr"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Titre dans l'onglet&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Ce qu'on voit&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <p>Ce qu’il faut retenir :</p>
        <ul>
          <li><code>&lt;head&gt;</code> — les informations <strong>sur</strong> la page. Rien de
          ce qui s’y trouve n’est affiché dans la fenêtre.</li>
          <li><code>&lt;title&gt;</code> — le texte de l’onglet du navigateur.</li>
          <li><code>&lt;meta charset="utf-8"&gt;</code> — sans lui, les accents deviennent des
          hiéroglyphes. Toujours le mettre.</li>
          <li><code>&lt;body&gt;</code> — tout ce qu’on voit.</li>
        </ul>
        <p>Les <strong>décalages</strong> ne servent qu’aux humains : ils montrent ce qui est à
        l’intérieur de quoi. Le navigateur, lui, s’en moque.</p>
      `,
      en: `
        <p>So far you wrote fragments. A <strong>real page</strong>, the kind saved in a
        <code>.html</code> file, always has the same frame:</p>
        <pre>&lt;!doctype html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Title in the tab&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;What you see&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
        <p>What to remember:</p>
        <ul>
          <li><code>&lt;head&gt;</code> — information <strong>about</strong> the page. Nothing in
          there is shown in the window.</li>
          <li><code>&lt;title&gt;</code> — the text in the browser tab.</li>
          <li><code>&lt;meta charset="utf-8"&gt;</code> — without it, accented letters turn into
          gibberish. Always include it.</li>
          <li><code>&lt;body&gt;</code> — everything you see.</li>
        </ul>
        <p>The <strong>indentation</strong> is only for humans: it shows what is inside what. The
        browser does not care.</p>
      `,
    },
    exemple: {
      code: '<h1>Le head est invisible</h1>\n<p>Dans cet atelier, tu écris directement le contenu du body.</p>\n<p>Le squelette complet est ajouté automatiquement quand tu exportes ta page.</p>',
      note: {
        fr: 'L’atelier ajoute le squelette pour toi : tu te concentres sur le contenu.',
        en: 'The workshop adds the skeleton for you: you focus on the content.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Structure le contenu d’une page « À propos de moi » :</p><ul><li>un <code>&lt;h1&gt;</code> ;</li><li>un <code>&lt;h2&gt;</code> contenant <code>Mes passions</code> ;</li><li>au moins <strong>deux</strong> paragraphes.</li></ul><p>Souviens-toi : ici tu écris ce qui va dans le <code>body</code>.</p>',
        en: '<p>Structure the content of an "About me" page:</p><ul><li>an <code>&lt;h1&gt;</code>;</li><li>an <code>&lt;h2&gt;</code> containing <code>Mes passions</code>;</li><li>at least <strong>two</strong> paragraphs.</li></ul><p>Remember: here you write what goes inside the <code>body</code>.</p>',
      },
      depart: '<!-- Le contenu du body -->\n',
      verifications: [
        { type: 'dom', selecteur: 'h1', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'h2', quoi: 'texte', attendu: { fr: 'Mes passions', en: 'Mes passions' } },
        { type: 'dom', selecteur: 'p', quoi: 'nombre', attendu: 2 },
      ],
      indices: [
        { fr: 'Un seul <code>&lt;h1&gt;</code> : c’est le sujet de la page.', en: 'Only one <code>&lt;h1&gt;</code>: it is the subject of the page.' },
        { fr: 'Le <code>&lt;h2&gt;</code> doit contenir exactement <code>Mes passions</code>.', en: 'The <code>&lt;h2&gt;</code> must contain exactly <code>Mes passions</code>.' },
        { fr: 'Ajoute deux <code>&lt;p&gt;</code> — pas un, pas trois.', en: 'Add two <code>&lt;p&gt;</code> — not one, not three.' },
      ],
      solution:
        '<h1>À propos de moi</h1>\n\n<h2>Mes passions</h2>\n<p>J\'adore le dessin et la programmation.</p>\n<p>Je joue aussi au basket le mercredi.</p>',
    },
  },

  'html-1-4': {
    langage: 'html',
    xp: 25,
    objectif: {
      fr: 'Regrouper des éléments pour pouvoir les manipuler ensemble.',
      en: 'Group elements so you can handle them together.',
    },
    explication: {
      fr: `
        <p>Quand une page grandit, il faut <strong>ranger</strong>. Deux balises servent à
        regrouper :</p>
        <ul>
          <li><code>&lt;section&gt;</code> — un bloc qui a du <em>sens</em> : une partie du
          contenu ;</li>
          <li><code>&lt;div&gt;</code> — un bloc neutre, une simple boîte.</li>
        </ul>
        <p>Elles ne changent rien à l’apparence. Leur intérêt vient après : en CSS, tu pourras
        dire « colore toute cette boîte », et en JavaScript « fais disparaître ce bloc ».</p>
        <p>Pour désigner un bloc précis, on lui donne une <strong>classe</strong> :</p>
        <p><code>&lt;section class="presentation"&gt;…&lt;/section&gt;</code></p>
        <p>Une classe, c’est une étiquette que tu choisis. Plusieurs éléments peuvent porter la
        même. C’est ce qui te permettra de dire « tous les éléments marqués
        <em>presentation</em> ».</p>
        <p>Il existe aussi <code>id="…"</code>, mais un <code>id</code> doit être
        <strong>unique</strong> dans la page. Dans le doute, utilise une classe.</p>
      `,
      en: `
        <p>As a page grows, you need to <strong>tidy up</strong>. Two tags group things:</p>
        <ul>
          <li><code>&lt;section&gt;</code> — a block that <em>means</em> something: one part of
          the content;</li>
          <li><code>&lt;div&gt;</code> — a neutral block, just a box.</li>
        </ul>
        <p>They change nothing visually. Their value comes later: in CSS you will say "colour
        this whole box", and in JavaScript "hide this block".</p>
        <p>To point at a specific block, give it a <strong>class</strong>:</p>
        <p><code>&lt;section class="presentation"&gt;…&lt;/section&gt;</code></p>
        <p>A class is a label you choose. Several elements can share the same one. That is what
        lets you say "every element marked <em>presentation</em>".</p>
        <p>There is also <code>id="…"</code>, but an <code>id</code> must be
        <strong>unique</strong> in the page. When in doubt, use a class.</p>
      `,
    },
    exemple: {
      code: '<section class="intro">\n  <h2>Introduction</h2>\n  <p>Le premier bloc.</p>\n</section>\n\n<section class="suite">\n  <h2>La suite</h2>\n  <p>Le deuxième bloc.</p>\n</section>',
      note: {
        fr: 'Rien ne change à l’écran — pour l’instant. Le CSS s’en servira.',
        en: 'Nothing changes on screen — for now. CSS will use it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Range une page de recette en <strong>deux sections</strong> :</p><ul><li>la première avec <code>class="ingredients"</code>, contenant un <code>&lt;h2&gt;</code> et un paragraphe ;</li><li>la seconde avec <code>class="etapes"</code>, contenant aussi un <code>&lt;h2&gt;</code> et un paragraphe.</li></ul>',
        en: '<p>Organise a recipe page into <strong>two sections</strong>:</p><ul><li>the first with <code>class="ingredients"</code>, containing an <code>&lt;h2&gt;</code> and a paragraph;</li><li>the second with <code>class="etapes"</code>, also containing an <code>&lt;h2&gt;</code> and a paragraph.</li></ul>',
      },
      depart: '<!-- Deux sections, avec leurs classes -->\n',
      verifications: [
        { type: 'dom', selecteur: 'section', quoi: 'nombre', attendu: 2 },
        { type: 'dom', selecteur: 'section.ingredients', quoi: 'existe' },
        { type: 'dom', selecteur: 'section.etapes', quoi: 'existe' },
        { type: 'dom', selecteur: 'section.ingredients h2', quoi: 'existe' },
        { type: 'dom', selecteur: 'section.etapes p', quoi: 'existe' },
      ],
      indices: [
        { fr: 'Ouvre avec <code>&lt;section class="ingredients"&gt;</code>.', en: 'Open with <code>&lt;section class="ingredients"&gt;</code>.' },
        { fr: 'Le <code>&lt;h2&gt;</code> et le <code>&lt;p&gt;</code> se placent <strong>entre</strong> l’ouverture et la fermeture de la section.', en: 'The <code>&lt;h2&gt;</code> and <code>&lt;p&gt;</code> go <strong>between</strong> the section opening and closing.' },
        { fr: 'Ferme avec <code>&lt;/section&gt;</code>, puis recommence pour <code>etapes</code>.', en: 'Close with <code>&lt;/section&gt;</code>, then repeat for <code>etapes</code>.' },
      ],
      solution:
        '<section class="ingredients">\n  <h2>Ingrédients</h2>\n  <p>Farine, œufs, sucre.</p>\n</section>\n\n<section class="etapes">\n  <h2>Étapes</h2>\n  <p>Mélanger, puis cuire 20 minutes.</p>\n</section>',
    },
  },

  /* ===================================================== Module 2 ========= */

  'html-2-1': {
    langage: 'html',
    xp: 20,
    objectif: {
      fr: 'Mettre en valeur des mots à l’intérieur d’un texte.',
      en: 'Emphasise words inside a text.',
    },
    explication: {
      fr: `
        <p>Toutes les balises ne créent pas un bloc. Certaines s’utilisent
        <strong>au milieu d’une phrase</strong> :</p>
        <ul>
          <li><code>&lt;strong&gt;</code> — important : s’affiche en gras ;</li>
          <li><code>&lt;em&gt;</code> — accentué : s’affiche en italique ;</li>
          <li><code>&lt;br&gt;</code> — un retour à la ligne ;</li>
          <li><code>&lt;code&gt;</code> — du code informatique.</li>
        </ul>
        <p>Elles s’imbriquent dans un paragraphe :</p>
        <p><code>&lt;p&gt;Attention, c'est &lt;strong&gt;important&lt;/strong&gt; !&lt;/p&gt;</code></p>
        <p><code>&lt;br&gt;</code> est particulière : elle ne contient rien, donc elle
        <strong>ne se ferme pas</strong>. C’est une des rares balises solitaires.</p>
        <p>Pourquoi <code>&lt;strong&gt;</code> plutôt qu’une balise « gras » ? Parce qu’elle dit
        le <em>sens</em> — « ceci est important » — et pas seulement l’apparence. Un lecteur
        d’écran, lui, le prononcera avec insistance.</p>
      `,
      en: `
        <p>Not every tag creates a block. Some are used <strong>inside a sentence</strong>:</p>
        <ul>
          <li><code>&lt;strong&gt;</code> — important: shown in bold;</li>
          <li><code>&lt;em&gt;</code> — emphasised: shown in italics;</li>
          <li><code>&lt;br&gt;</code> — a line break;</li>
          <li><code>&lt;code&gt;</code> — computer code.</li>
        </ul>
        <p>They nest inside a paragraph:</p>
        <p><code>&lt;p&gt;Careful, this is &lt;strong&gt;important&lt;/strong&gt;!&lt;/p&gt;</code></p>
        <p><code>&lt;br&gt;</code> is special: it contains nothing, so it
        <strong>does not close</strong>. One of the rare lone tags.</p>
        <p>Why <code>&lt;strong&gt;</code> rather than a "bold" tag? Because it states the
        <em>meaning</em> — "this matters" — not just the look. A screen reader will say it with
        emphasis.</p>
      `,
    },
    exemple: {
      code: '<p>Ce mot est <strong>important</strong>, celui-ci est <em>accentué</em>.</p>\n<p>Première ligne<br>Deuxième ligne</p>',
      note: {
        fr: 'Le <br> coupe la ligne sans créer un nouveau paragraphe.',
        en: 'The <br> breaks the line without creating a new paragraph.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris un paragraphe d’avertissement qui contient :</p><ul><li>au moins un mot en <code>&lt;strong&gt;</code> ;</li><li>au moins un mot en <code>&lt;em&gt;</code> ;</li><li>un <code>&lt;br&gt;</code> quelque part.</li></ul>',
        en: '<p>Write a warning paragraph containing:</p><ul><li>at least one word in <code>&lt;strong&gt;</code>;</li><li>at least one word in <code>&lt;em&gt;</code>;</li><li>a <code>&lt;br&gt;</code> somewhere.</li></ul>',
      },
      depart: '<p>Écris ton avertissement ici.</p>\n',
      verifications: [
        { type: 'dom', selecteur: 'p strong', quoi: 'existe' },
        { type: 'dom', selecteur: 'p em', quoi: 'existe' },
        { type: 'dom', selecteur: 'p br', quoi: 'existe' },
      ],
      indices: [
        { fr: 'Le <code>&lt;strong&gt;</code> s’écrit autour d’un mot, à l’intérieur du paragraphe.', en: 'The <code>&lt;strong&gt;</code> goes around a word, inside the paragraph.' },
        { fr: 'Même chose pour <code>&lt;em&gt;</code>, sur un autre mot.', en: 'Same for <code>&lt;em&gt;</code>, on another word.' },
        { fr: 'Le <code>&lt;br&gt;</code> se pose seul, sans balise fermante.', en: 'The <code>&lt;br&gt;</code> stands alone, with no closing tag.' },
      ],
      solution:
        '<p>Attention : ne <strong>jamais</strong> partager ton mot de passe.<br>C\'est <em>vraiment</em> important.</p>',
    },
  },

  'html-2-2': {
    langage: 'html',
    xp: 25,
    objectif: {
      fr: 'Afficher une image, et comprendre les attributs.',
      en: 'Display an image, and understand attributes.',
    },
    explication: {
      fr: `
        <p>Une image s’ajoute avec <code>&lt;img&gt;</code>. Comme <code>&lt;br&gt;</code>, elle
        ne se ferme pas : elle ne contient rien.</p>
        <p><code>&lt;img src="chat.jpg" alt="Un chat roux endormi"&gt;</code></p>
        <p>Les deux mots avant le <code>=</code> sont des <strong>attributs</strong> : des
        réglages qu’on donne à une balise.</p>
        <ul>
          <li><code>src</code> — <em>source</em> : où trouver l’image ;</li>
          <li><code>alt</code> — le texte affiché si l’image ne charge pas, et lu à voix haute
          par les lecteurs d’écran.</li>
        </ul>
        <p><strong>Le <code>alt</code> n’est pas optionnel.</strong> Sans lui, une personne
        aveugle ne saura jamais ce que montre ton image. Décris ce qu’on y voit, pas
        « photo ».</p>
        <p>Ici, on utilisera des images du web, avec une adresse complète qui commence par
        <code>https://</code>.</p>
      `,
      en: `
        <p>An image is added with <code>&lt;img&gt;</code>. Like <code>&lt;br&gt;</code>, it does
        not close: it contains nothing.</p>
        <p><code>&lt;img src="cat.jpg" alt="A ginger cat asleep"&gt;</code></p>
        <p>The two words before the <code>=</code> are <strong>attributes</strong>: settings
        given to a tag.</p>
        <ul>
          <li><code>src</code> — <em>source</em>: where to find the image;</li>
          <li><code>alt</code> — the text shown if the image fails to load, and read aloud by
          screen readers.</li>
        </ul>
        <p><strong>The <code>alt</code> is not optional.</strong> Without it, a blind person will
        never know what your image shows. Describe what is in it, not "photo".</p>
        <p>Here we will use images from the web, with a full address starting with
        <code>https://</code>.</p>
      `,
    },
    exemple: {
      code: '<h2>Mon animal préféré</h2>\n<img src="https://placehold.co/300x200/00E5FF/0B0E1A?text=Chat" alt="Un chat roux endormi sur un canapé">\n<p>Voici à quoi il ressemble.</p>',
      note: {
        fr: 'L’image ne se charge pas ici (pas d’internet dans l’app), mais le texte alt s’affiche à sa place — c’est exactement son rôle.',
        en: 'The image does not load here (no internet in the app), but the alt text shows instead — which is exactly its purpose.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Ajoute une image à ta page :</p><ul><li>une balise <code>&lt;img&gt;</code> avec un attribut <code>src</code> ;</li><li>un attribut <code>alt</code> qui <strong>décrit</strong> l’image (au moins 10 caractères) ;</li><li>un <code>&lt;h2&gt;</code> au-dessus.</li></ul>',
        en: '<p>Add an image to your page:</p><ul><li>an <code>&lt;img&gt;</code> tag with a <code>src</code> attribute;</li><li>an <code>alt</code> attribute that <strong>describes</strong> the image (at least 10 characters);</li><li>an <code>&lt;h2&gt;</code> above it.</li></ul>',
      },
      depart: '<h2>Mon animal préféré</h2>\n<!-- Ajoute ton image ici -->\n',
      verifications: [
        { type: 'dom', selecteur: 'img', quoi: 'existe' },
        {
          type: 'codeContient',
          motif: 'alt\\s*=\\s*["\'][^"\']{10,}["\']',
          message: {
            fr: 'Le texte alt doit vraiment décrire l’image : au moins une dizaine de caractères.',
            en: 'The alt text must really describe the image: at least ten characters or so.',
          },
        },
        { type: 'dom', selecteur: 'h2', quoi: 'existe' },
      ],
      indices: [
        { fr: 'La balise commence par <code>&lt;img src="…"</code>.', en: 'The tag starts with <code>&lt;img src="…"</code>.' },
        { fr: 'Tu peux utiliser cette adresse : <code>https://placehold.co/300x200</code>.', en: 'You can use this address: <code>https://placehold.co/300x200</code>.' },
        { fr: 'Ajoute ensuite <code>alt="…"</code> avec une vraie description, puis referme avec <code>&gt;</code>.', en: 'Then add <code>alt="…"</code> with a real description, and close with <code>&gt;</code>.' },
      ],
      solution:
        '<h2>Mon animal préféré</h2>\n<img src="https://placehold.co/300x200" alt="Un chat roux endormi sur un canapé bleu">',
    },
  },

  'html-2-3': {
    langage: 'html',
    xp: 25,
    objectif: {
      fr: 'Relier des pages entre elles : c’est ce qui fait le web.',
      en: 'Link pages together: this is what makes the web.',
    },
    explication: {
      fr: `
        <p>Le mot « web » veut dire « toile ». Ce qui tisse cette toile, ce sont les
        <strong>liens</strong>.</p>
        <p><code>&lt;a href="https://fr.wikipedia.org"&gt;Wikipédia&lt;/a&gt;</code></p>
        <ul>
          <li><code>&lt;a&gt;</code> vient de <em>anchor</em>, ancre ;</li>
          <li><code>href</code> est la destination ;</li>
          <li>le texte entre les balises est ce qu’on voit et sur quoi on clique.</li>
        </ul>
        <p><strong>Soigne le texte du lien.</strong> « Cliquez ici » ne dit rien : hors contexte,
        personne ne sait où il mène. Écris plutôt « la page Wikipédia sur les chats ». C’est plus
        clair pour tout le monde, et indispensable pour qui navigue de lien en lien.</p>
        <p>Un lien peut aussi entourer une image : on obtient une image cliquable.</p>
      `,
      en: `
        <p>The word "web" means a woven net. What weaves it are <strong>links</strong>.</p>
        <p><code>&lt;a href="https://en.wikipedia.org"&gt;Wikipedia&lt;/a&gt;</code></p>
        <ul>
          <li><code>&lt;a&gt;</code> comes from <em>anchor</em>;</li>
          <li><code>href</code> is the destination;</li>
          <li>the text between the tags is what you see and click.</li>
        </ul>
        <p><strong>Take care with the link text.</strong> "Click here" says nothing: out of
        context, nobody knows where it goes. Write "the Wikipedia page about cats" instead.
        Clearer for everyone, and essential for anyone navigating link by link.</p>
        <p>A link can also wrap an image: you get a clickable image.</p>
      `,
    },
    exemple: {
      code: '<p>Pour en savoir plus, consulte <a href="https://fr.wikipedia.org/wiki/Chat">la page Wikipédia sur les chats</a>.</p>',
      note: {
        fr: 'Le texte du lien décrit la destination — pas « cliquez ici ».',
        en: 'The link text describes the destination — not "click here".',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée une petite liste de favoris :</p><ul><li><strong>trois</strong> liens <code>&lt;a&gt;</code>, chacun dans son paragraphe ;</li><li>chaque lien doit avoir un <code>href</code> commençant par <code>https://</code> ;</li><li>aucun ne doit s’appeler « cliquez ici ».</li></ul>',
        en: '<p>Create a small favourites list:</p><ul><li><strong>three</strong> <code>&lt;a&gt;</code> links, each in its own paragraph;</li><li>each link needs an <code>href</code> starting with <code>https://</code>;</li><li>none may be called "cliquez ici".</li></ul>',
      },
      depart: '<h2>Mes sites préférés</h2>\n<!-- Trois liens, un par paragraphe -->\n',
      verifications: [
        { type: 'dom', selecteur: 'a', quoi: 'nombre', attendu: 3 },
        {
          type: 'codeNeContientPas',
          motif: '>\\s*(cliquez ici|clique ici|click here)\\s*<',
          options: 'i',
          message: {
            fr: 'Remplace « cliquez ici » par un texte qui dit où mène le lien.',
            en: 'Replace "click here" with text that says where the link goes.',
          },
        },
        {
          type: 'codeContient',
          motif: '(href\\s*=\\s*["\']https://[\\s\\S]*){3}',
          message: {
            fr: 'Les trois liens doivent avoir une adresse commençant par https://.',
            en: 'All three links need an address starting with https://.',
          },
        },
      ],
      indices: [
        { fr: 'Un lien : <code>&lt;a href="https://…"&gt;texte&lt;/a&gt;</code>.', en: 'A link: <code>&lt;a href="https://…"&gt;text&lt;/a&gt;</code>.' },
        { fr: 'Entoure chaque lien d’un <code>&lt;p&gt;</code> pour qu’ils soient sur des lignes séparées.', en: 'Wrap each link in a <code>&lt;p&gt;</code> so they sit on separate lines.' },
        { fr: 'Le texte doit décrire le site : « le site de la NASA » plutôt que « ici ».', en: 'The text should describe the site: "the NASA website" rather than "here".' },
      ],
      solution:
        '<h2>Mes sites préférés</h2>\n<p><a href="https://fr.wikipedia.org">L\'encyclopédie Wikipédia</a></p>\n<p><a href="https://www.nasa.gov">Le site de la NASA</a></p>\n<p><a href="https://www.python.org">Le site officiel de Python</a></p>',
    },
  },

  'html-2-4': {
    langage: 'html',
    xp: 40,
    objectif: {
      fr: 'Assembler tout le module en une vraie page de présentation.',
      en: 'Bring the whole module together into a real profile page.',
    },
    explication: {
      fr: `
        <p>Tu as maintenant tout ce qu’il faut pour une <strong>carte de visite</strong> : ta
        page à toi, celle que tu pourras montrer.</p>
        <p>Rappel de tes outils :</p>
        <ul>
          <li><code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code> pour les titres ;</li>
          <li><code>&lt;p&gt;</code> pour le texte, avec <code>&lt;strong&gt;</code> et
          <code>&lt;em&gt;</code> à l’intérieur ;</li>
          <li><code>&lt;img&gt;</code> pour une photo ;</li>
          <li><code>&lt;a&gt;</code> pour tes liens ;</li>
          <li><code>&lt;section class="…"&gt;</code> pour ranger.</li>
        </ul>
        <p>Cette page sera enregistrée comme un vrai fichier <code>.html</code> dans tes
        projets. Tu pourras l’ouvrir dans un navigateur, et l’embellir au parcours CSS.</p>
      `,
      en: `
        <p>You now have everything you need for a <strong>business card</strong>: your own page,
        the one you can show around.</p>
        <p>Your toolkit:</p>
        <ul>
          <li><code>&lt;h1&gt;</code>, <code>&lt;h2&gt;</code> for headings;</li>
          <li><code>&lt;p&gt;</code> for text, with <code>&lt;strong&gt;</code> and
          <code>&lt;em&gt;</code> inside;</li>
          <li><code>&lt;img&gt;</code> for a photo;</li>
          <li><code>&lt;a&gt;</code> for your links;</li>
          <li><code>&lt;section class="…"&gt;</code> to organise.</li>
        </ul>
        <p>This page will be saved as a real <code>.html</code> file in your projects. You will
        be able to open it in a browser, and make it beautiful in the CSS track.</p>
      `,
    },
    exemple: {
      code: '<section class="entete">\n  <h1>Prénom Nom</h1>\n  <p>Élève au collège, passionné de <strong>code</strong>.</p>\n</section>',
      note: {
        fr: 'Le début. À toi de compléter avec les autres sections.',
        en: 'The beginning. Your turn to add the other sections.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Construis ta carte de visite. Elle doit contenir :</p><ul><li>un <code>&lt;h1&gt;</code> avec ton nom ;</li><li><strong>deux sections</strong> avec une classe chacune ;</li><li>au moins <strong>deux</strong> <code>&lt;h2&gt;</code> ;</li><li>une <code>&lt;img&gt;</code> avec un <code>alt</code> descriptif ;</li><li>au moins <strong>deux liens</strong> ;</li><li>au moins <strong>trois paragraphes</strong>.</li></ul>',
        en: '<p>Build your business card. It must contain:</p><ul><li>an <code>&lt;h1&gt;</code> with your name;</li><li><strong>two sections</strong>, each with a class;</li><li>at least <strong>two</strong> <code>&lt;h2&gt;</code>;</li><li>an <code>&lt;img&gt;</code> with a descriptive <code>alt</code>;</li><li>at least <strong>two links</strong>;</li><li>at least <strong>three paragraphs</strong>.</li></ul>',
      },
      depart:
        '<section class="entete">\n  <h1>Ton nom</h1>\n</section>\n\n<!-- Ajoute une deuxième section, une image, des liens et des paragraphes -->\n',
      verifications: [
        { type: 'dom', selecteur: 'h1', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'section[class]', quoi: 'nombre', attendu: 2 },
        { type: 'dom', selecteur: 'h2', quoi: 'nombre', min: 2 },
        { type: 'dom', selecteur: 'img[alt]', quoi: 'existe' },
        { type: 'dom', selecteur: 'a[href]', quoi: 'nombre', min: 2 },
        { type: 'dom', selecteur: 'p', quoi: 'nombre', min: 3 },
      ],
      indices: [
        {
          fr: 'Garde la première section, et ajoute-lui un <code>&lt;h2&gt;</code>, un paragraphe et ton image.',
          en: 'Keep the first section, and add an <code>&lt;h2&gt;</code>, a paragraph and your image to it.',
        },
        {
          fr: 'Crée une seconde <code>&lt;section class="liens"&gt;</code> avec son <code>&lt;h2&gt;</code>.',
          en: 'Create a second <code>&lt;section class="liens"&gt;</code> with its own <code>&lt;h2&gt;</code>.',
        },
        {
          fr: 'Il faut exactement 3 paragraphes et 2 liens : compte-les avant de vérifier.',
          en: 'You need exactly 3 paragraphs and 2 links: count them before checking.',
        },
      ],
      solution:
        '<section class="entete">\n  <h1>Théo Martin</h1>\n  <h2>Qui je suis</h2>\n  <p>Élève de 5e, passionné de <strong>code</strong> et de <em>dessin</em>.</p>\n  <img src="https://placehold.co/240x240" alt="Portrait dessiné d\'un adolescent souriant">\n  <p>J\'apprends Python et le HTML.</p>\n</section>\n\n<section class="liens">\n  <h2>Mes liens</h2>\n  <p>Voici où me trouver.</p>\n  <p><a href="https://www.python.org">Le site officiel de Python</a></p>\n  <p><a href="https://fr.wikipedia.org">L\'encyclopédie Wikipédia</a></p>\n</section>',
    },
    projet: { titre: { fr: 'Ma carte de visite', en: 'My business card' } },
  },

  /* ===================================================== Module 3 ========= */

  'html-3-1': {
    langage: 'html',
    xp: 20,
    objectif: {
      fr: 'Présenter une énumération proprement.',
      en: 'Present a list of items properly.',
    },
    explication: {
      fr: `
        <p>Pour énumérer, on n’écrit pas des tirets à la main. HTML a deux sortes de listes :</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;Pommes&lt;/li&gt;
  &lt;li&gt;Bananes&lt;/li&gt;
&lt;/ul&gt;</pre>
        <ul>
          <li><code>&lt;ul&gt;</code> — <em>unordered list</em>, liste à puces : l’ordre n’a pas
          d’importance ;</li>
          <li><code>&lt;ol&gt;</code> — <em>ordered list</em>, liste numérotée : l’ordre compte
          (une recette, un classement) ;</li>
          <li><code>&lt;li&gt;</code> — <em>list item</em>, un élément. Toujours à l’intérieur
          d’un <code>ul</code> ou d’un <code>ol</code>.</li>
        </ul>
        <p>Les puces et les numéros sont ajoutés automatiquement par le navigateur : ne les écris
        pas toi-même.</p>
        <p>Choisis en fonction du <strong>sens</strong> : des ingrédients dans n’importe quel
        ordre → <code>ul</code>. Les étapes d’une recette → <code>ol</code>.</p>
      `,
      en: `
        <p>To enumerate, you do not type dashes by hand. HTML has two kinds of list:</p>
        <pre>&lt;ul&gt;
  &lt;li&gt;Apples&lt;/li&gt;
  &lt;li&gt;Bananas&lt;/li&gt;
&lt;/ul&gt;</pre>
        <ul>
          <li><code>&lt;ul&gt;</code> — unordered list, bullets: order does not matter;</li>
          <li><code>&lt;ol&gt;</code> — ordered list, numbers: order matters (a recipe, a
          ranking);</li>
          <li><code>&lt;li&gt;</code> — list item. Always inside a <code>ul</code> or an
          <code>ol</code>.</li>
        </ul>
        <p>Bullets and numbers are added automatically by the browser: do not type them
        yourself.</p>
        <p>Choose by <strong>meaning</strong>: ingredients in any order → <code>ul</code>. The
        steps of a recipe → <code>ol</code>.</p>
      `,
    },
    exemple: {
      code: '<h2>Ingrédients</h2>\n<ul>\n  <li>200 g de farine</li>\n  <li>3 œufs</li>\n</ul>\n\n<h2>Étapes</h2>\n<ol>\n  <li>Mélanger</li>\n  <li>Cuire 20 minutes</li>\n</ol>',
      note: {
        fr: 'Puces d’un côté, numéros de l’autre — sans les écrire.',
        en: 'Bullets on one side, numbers on the other — without typing them.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Écris la fiche d’un match :</p><ul><li>une liste <strong>à puces</strong> de 3 joueurs ;</li><li>une liste <strong>numérotée</strong> de 4 étapes du match ;</li><li>un <code>&lt;h2&gt;</code> avant chaque liste.</li></ul>',
        en: '<p>Write a match sheet:</p><ul><li>a <strong>bulleted</strong> list of 3 players;</li><li>a <strong>numbered</strong> list of 4 match steps;</li><li>an <code>&lt;h2&gt;</code> before each list.</li></ul>',
      },
      depart: '<!-- Une liste à puces, une liste numérotée -->\n',
      verifications: [
        { type: 'dom', selecteur: 'ul', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'ol', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'ul > li', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'ol > li', quoi: 'nombre', attendu: 4 },
        { type: 'dom', selecteur: 'h2', quoi: 'nombre', attendu: 2 },
      ],
      indices: [
        { fr: 'La liste à puces : <code>&lt;ul&gt;</code> avec trois <code>&lt;li&gt;</code> dedans.', en: 'The bulleted list: <code>&lt;ul&gt;</code> with three <code>&lt;li&gt;</code> inside.' },
        { fr: 'La numérotée : <code>&lt;ol&gt;</code> avec quatre <code>&lt;li&gt;</code>.', en: 'The numbered one: <code>&lt;ol&gt;</code> with four <code>&lt;li&gt;</code>.' },
        { fr: 'Chaque <code>&lt;li&gt;</code> se ferme avec <code>&lt;/li&gt;</code>, et la liste avec <code>&lt;/ul&gt;</code> ou <code>&lt;/ol&gt;</code>.', en: 'Each <code>&lt;li&gt;</code> closes with <code>&lt;/li&gt;</code>, and the list with <code>&lt;/ul&gt;</code> or <code>&lt;/ol&gt;</code>.' },
      ],
      solution:
        '<h2>Les joueurs</h2>\n<ul>\n  <li>Lucas</li>\n  <li>Emma</li>\n  <li>Noah</li>\n</ul>\n\n<h2>Déroulé du match</h2>\n<ol>\n  <li>Échauffement</li>\n  <li>Première mi-temps</li>\n  <li>Pause</li>\n  <li>Seconde mi-temps</li>\n</ol>',
    },
  },

  'html-3-2': {
    langage: 'html',
    xp: 30,
    objectif: {
      fr: 'Présenter des données en lignes et en colonnes.',
      en: 'Present data in rows and columns.',
    },
    explication: {
      fr: `
        <p>Un <strong>tableau</strong> sert quand une information a deux dimensions : des lignes
        et des colonnes. Un emploi du temps, un classement, un relevé de notes.</p>
        <pre>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Jour&lt;/th&gt;
    &lt;th&gt;Matière&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Lundi&lt;/td&gt;
    &lt;td&gt;Maths&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — le tableau entier ;</li>
          <li><code>&lt;tr&gt;</code> — <em>table row</em>, une ligne ;</li>
          <li><code>&lt;th&gt;</code> — <em>table header</em>, une cellule d’en-tête ;</li>
          <li><code>&lt;td&gt;</code> — <em>table data</em>, une cellule normale.</li>
        </ul>
        <p>On construit <strong>ligne par ligne</strong>, et dans chaque ligne on pose les
        cellules. Chaque ligne doit avoir le même nombre de cellules, sinon le tableau se
        déforme.</p>
        <p>Un tableau sert à présenter des <em>données</em>, jamais à faire une mise en page.
        Pour placer des éléments, ce sera le rôle du CSS.</p>
      `,
      en: `
        <p>A <strong>table</strong> is for information with two dimensions: rows and columns. A
        timetable, a ranking, a report card.</p>
        <pre>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Day&lt;/th&gt;
    &lt;th&gt;Subject&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Monday&lt;/td&gt;
    &lt;td&gt;Maths&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
        <ul>
          <li><code>&lt;table&gt;</code> — the whole table;</li>
          <li><code>&lt;tr&gt;</code> — table row;</li>
          <li><code>&lt;th&gt;</code> — table header cell;</li>
          <li><code>&lt;td&gt;</code> — table data cell.</li>
        </ul>
        <p>You build it <strong>row by row</strong>, placing cells inside each row. Every row
        must have the same number of cells, or the table warps.</p>
        <p>A table presents <em>data</em>, never a page layout. Positioning elements is CSS's
        job.</p>
      `,
    },
    exemple: {
      code: '<table>\n  <tr>\n    <th>Élève</th>\n    <th>Note</th>\n  </tr>\n  <tr>\n    <td>Emma</td>\n    <td>17</td>\n  </tr>\n  <tr>\n    <td>Lucas</td>\n    <td>14</td>\n  </tr>\n</table>',
      note: {
        fr: 'Les en-têtes s’affichent en gras et centrés, automatiquement.',
        en: 'Headers are shown bold and centred, automatically.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Construis un tableau des planètes :</p><ul><li>une ligne d’en-tête avec <strong>3</strong> cellules <code>&lt;th&gt;</code> : <code>Planète</code>, <code>Diamètre</code>, <code>Lunes</code> ;</li><li><strong>3 lignes</strong> de données, chacune avec 3 cellules <code>&lt;td&gt;</code>.</li></ul><p>Soit 4 lignes en tout.</p>',
        en: '<p>Build a table of planets:</p><ul><li>a header row with <strong>3</strong> <code>&lt;th&gt;</code> cells: <code>Planète</code>, <code>Diamètre</code>, <code>Lunes</code>;</li><li><strong>3 rows</strong> of data, each with 3 <code>&lt;td&gt;</code> cells.</li></ul><p>Four rows in total.</p>',
      },
      depart: '<table>\n  <!-- Une ligne d\'en-tête, puis trois lignes de données -->\n</table>\n',
      verifications: [
        { type: 'dom', selecteur: 'table', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'tr', quoi: 'nombre', attendu: 4 },
        { type: 'dom', selecteur: 'th', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'td', quoi: 'nombre', attendu: 9 },
        { type: 'dom', selecteur: 'th', quoi: 'texte', attendu: { fr: 'Planète', en: 'Planète' } },
      ],
      indices: [
        { fr: 'La première ligne : <code>&lt;tr&gt;</code> avec trois <code>&lt;th&gt;</code>.', en: 'The first row: <code>&lt;tr&gt;</code> with three <code>&lt;th&gt;</code>.' },
        { fr: 'Chaque ligne de données : <code>&lt;tr&gt;</code> avec trois <code>&lt;td&gt;</code>.', en: 'Each data row: <code>&lt;tr&gt;</code> with three <code>&lt;td&gt;</code>.' },
        { fr: '3 lignes × 3 cellules = 9 <code>&lt;td&gt;</code> au total.', en: '3 rows × 3 cells = 9 <code>&lt;td&gt;</code> in total.' },
      ],
      solution:
        '<table>\n  <tr>\n    <th>Planète</th>\n    <th>Diamètre</th>\n    <th>Lunes</th>\n  </tr>\n  <tr>\n    <td>Mercure</td>\n    <td>4 879 km</td>\n    <td>0</td>\n  </tr>\n  <tr>\n    <td>Terre</td>\n    <td>12 742 km</td>\n    <td>1</td>\n  </tr>\n  <tr>\n    <td>Mars</td>\n    <td>6 779 km</td>\n    <td>2</td>\n  </tr>\n</table>',
    },
  },

  'html-3-3': {
    langage: 'html',
    xp: 35,
    objectif: {
      fr: 'Construire un vrai document utile, avec tableau et listes.',
      en: 'Build a genuinely useful document, with a table and lists.',
    },
    explication: {
      fr: `
        <p>Ton <strong>emploi du temps</strong> : un document que tu peux vraiment utiliser, et
        qui rassemble ce que tu sais du module.</p>
        <p>Un tableau à cinq colonnes (les jours) et plusieurs lignes (les heures) est un exercice
        classique — et un bon test de rigueur : si une ligne a une cellule de trop, tout se
        décale.</p>
        <p>Conseil : écris d’abord toutes les balises <code>&lt;tr&gt;</code> vides, puis remplis
        les cellules. C’est plus sûr que d’écrire au fil de la plume.</p>
      `,
      en: `
        <p>Your <strong>timetable</strong>: a document you can actually use, pulling together
        what you learned in this module.</p>
        <p>A five-column table (the days) with several rows (the hours) is a classic exercise —
        and a good test of care: one extra cell in a row and everything shifts.</p>
        <p>Tip: write all the empty <code>&lt;tr&gt;</code> tags first, then fill the cells. Safer
        than writing as you go.</p>
      `,
    },
    exemple: {
      code: '<h1>Mon emploi du temps</h1>\n<table>\n  <tr>\n    <th>Heure</th>\n    <th>Lundi</th>\n  </tr>\n  <tr>\n    <td>8h</td>\n    <td>Maths</td>\n  </tr>\n</table>',
      note: {
        fr: 'Deux colonnes pour l’exemple. À toi d’en faire quatre.',
        en: 'Two columns for the example. Your turn to make four.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée ton emploi du temps :</p><ul><li>un <code>&lt;h1&gt;</code> ;</li><li>un tableau avec <strong>4 colonnes</strong> : Heure, Lundi, Mardi, Mercredi ;</li><li><strong>3 créneaux horaires</strong> (donc 3 lignes de données) ;</li><li>en dessous, un <code>&lt;h2&gt;</code> et une liste à puces d’au moins <strong>3</strong> affaires à ne pas oublier.</li></ul>',
        en: '<p>Create your timetable:</p><ul><li>an <code>&lt;h1&gt;</code>;</li><li>a table with <strong>4 columns</strong>: Heure, Lundi, Mardi, Mercredi;</li><li><strong>3 time slots</strong> (so 3 data rows);</li><li>below, an <code>&lt;h2&gt;</code> and a bulleted list of at least <strong>3</strong> things not to forget.</li></ul>',
      },
      depart: '<h1>Mon emploi du temps</h1>\n\n<table>\n</table>\n',
      verifications: [
        { type: 'dom', selecteur: 'h1', quoi: 'nombre', attendu: 1 },
        { type: 'dom', selecteur: 'tr', quoi: 'nombre', attendu: 4 },
        { type: 'dom', selecteur: 'th', quoi: 'nombre', attendu: 4 },
        { type: 'dom', selecteur: 'td', quoi: 'nombre', attendu: 12 },
        { type: 'dom', selecteur: 'ul > li', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'h2', quoi: 'existe' },
      ],
      indices: [
        { fr: '4 colonnes signifie 4 <code>&lt;th&gt;</code> dans la première ligne.', en: '4 columns means 4 <code>&lt;th&gt;</code> in the first row.' },
        { fr: '3 créneaux × 4 colonnes = 12 cellules <code>&lt;td&gt;</code>.', en: '3 slots × 4 columns = 12 <code>&lt;td&gt;</code> cells.' },
        { fr: 'La liste va après <code>&lt;/table&gt;</code>, avec son <code>&lt;h2&gt;</code> juste avant.', en: 'The list goes after <code>&lt;/table&gt;</code>, with its <code>&lt;h2&gt;</code> just before.' },
      ],
      solution:
        '<h1>Mon emploi du temps</h1>\n\n<table>\n  <tr>\n    <th>Heure</th>\n    <th>Lundi</th>\n    <th>Mardi</th>\n    <th>Mercredi</th>\n  </tr>\n  <tr>\n    <td>8h</td>\n    <td>Maths</td>\n    <td>Français</td>\n    <td>Sport</td>\n  </tr>\n  <tr>\n    <td>10h</td>\n    <td>Histoire</td>\n    <td>Anglais</td>\n    <td>Techno</td>\n  </tr>\n  <tr>\n    <td>14h</td>\n    <td>SVT</td>\n    <td>Maths</td>\n    <td>Libre</td>\n  </tr>\n</table>\n\n<h2>À ne pas oublier</h2>\n<ul>\n  <li>Tenue de sport le mercredi</li>\n  <li>Calculatrice</li>\n  <li>Carnet de correspondance</li>\n</ul>',
    },
    projet: { titre: { fr: 'Mon emploi du temps', en: 'My timetable' } },
  },

  /* ===================================================== Module 4 ========= */

  'html-4-1': {
    langage: 'html',
    xp: 25,
    objectif: {
      fr: 'Créer des champs où l’on peut taper.',
      en: 'Create fields people can type into.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici ta page ne faisait qu’afficher. Un <strong>formulaire</strong> permet de
        recevoir quelque chose.</p>
        <pre>&lt;form&gt;
  &lt;label for="prenom"&gt;Ton prénom&lt;/label&gt;
  &lt;input type="text" id="prenom"&gt;
  &lt;button&gt;Envoyer&lt;/button&gt;
&lt;/form&gt;</pre>
        <ul>
          <li><code>&lt;form&gt;</code> — le formulaire entier ;</li>
          <li><code>&lt;input&gt;</code> — un champ. Solitaire, comme <code>&lt;img&gt;</code> ;</li>
          <li><code>&lt;label&gt;</code> — l’étiquette qui dit ce qu’on attend ;</li>
          <li><code>&lt;button&gt;</code> — le bouton.</li>
        </ul>
        <p>Le <code>type</code> change le comportement du champ : <code>text</code>,
        <code>email</code>, <code>number</code>, <code>password</code>, <code>date</code>. Le
        navigateur adapte le clavier et vérifie la saisie.</p>
        <p><strong>Le lien label ↔ champ est essentiel.</strong> Le <code>for</code> du label doit
        valoir exactement l’<code>id</code> du champ. Cliquer sur l’étiquette place alors le
        curseur dans le champ — et un lecteur d’écran sait quoi annoncer.</p>
      `,
      en: `
        <p>So far your page only displayed things. A <strong>form</strong> lets it receive
        something.</p>
        <pre>&lt;form&gt;
  &lt;label for="prenom"&gt;Your name&lt;/label&gt;
  &lt;input type="text" id="prenom"&gt;
  &lt;button&gt;Send&lt;/button&gt;
&lt;/form&gt;</pre>
        <ul>
          <li><code>&lt;form&gt;</code> — the whole form;</li>
          <li><code>&lt;input&gt;</code> — a field. Lone tag, like <code>&lt;img&gt;</code>;</li>
          <li><code>&lt;label&gt;</code> — the label saying what is expected;</li>
          <li><code>&lt;button&gt;</code> — the button.</li>
        </ul>
        <p>The <code>type</code> changes the field's behaviour: <code>text</code>,
        <code>email</code>, <code>number</code>, <code>password</code>, <code>date</code>. The
        browser adapts the keyboard and checks the entry.</p>
        <p><strong>The label ↔ field link matters.</strong> The label's <code>for</code> must
        exactly match the field's <code>id</code>. Clicking the label then puts the cursor in the
        field — and a screen reader knows what to announce.</p>
      `,
    },
    exemple: {
      code: '<form>\n  <label for="pseudo">Ton pseudo</label>\n  <input type="text" id="pseudo">\n\n  <label for="age">Ton âge</label>\n  <input type="number" id="age">\n\n  <button>Valider</button>\n</form>',
      note: {
        fr: 'Clique sur l’étiquette « Ton pseudo » : le curseur saute dans le champ.',
        en: 'Click the "Ton pseudo" label: the cursor jumps into the field.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée un formulaire de contact avec :</p><ul><li><strong>trois</strong> champs <code>&lt;input&gt;</code> : un <code>text</code>, un <code>email</code>, un <code>number</code> ;</li><li>un <code>&lt;label&gt;</code> par champ, correctement relié par <code>for</code> et <code>id</code> ;</li><li>un <code>&lt;button&gt;</code>.</li></ul>',
        en: '<p>Create a contact form with:</p><ul><li><strong>three</strong> <code>&lt;input&gt;</code> fields: one <code>text</code>, one <code>email</code>, one <code>number</code>;</li><li>one <code>&lt;label&gt;</code> per field, properly linked by <code>for</code> and <code>id</code>;</li><li>a <code>&lt;button&gt;</code>.</li></ul>',
      },
      depart: '<form>\n  <!-- Trois champs avec leurs étiquettes, puis un bouton -->\n</form>\n',
      verifications: [
        { type: 'dom', selecteur: 'form', quoi: 'existe' },
        { type: 'dom', selecteur: 'input', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'input[type="email"]', quoi: 'existe' },
        { type: 'dom', selecteur: 'input[type="number"]', quoi: 'existe' },
        { type: 'dom', selecteur: 'label[for]', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'button', quoi: 'existe' },
      ],
      indices: [
        { fr: 'Pour chaque champ : d’abord le <code>&lt;label for="…"&gt;</code>, puis l’<code>&lt;input id="…"&gt;</code>.', en: 'For each field: first the <code>&lt;label for="…"&gt;</code>, then the <code>&lt;input id="…"&gt;</code>.' },
        { fr: 'Le <code>for</code> et l’<code>id</code> doivent être <strong>identiques</strong>, et différents d’un champ à l’autre.', en: 'The <code>for</code> and <code>id</code> must be <strong>identical</strong>, and different from one field to the next.' },
        { fr: 'Change le <code>type</code> : <code>text</code>, <code>email</code>, <code>number</code>.', en: 'Change the <code>type</code>: <code>text</code>, <code>email</code>, <code>number</code>.' },
      ],
      solution:
        '<form>\n  <label for="nom">Ton nom</label>\n  <input type="text" id="nom">\n\n  <label for="courriel">Ton adresse e-mail</label>\n  <input type="email" id="courriel">\n\n  <label for="age">Ton âge</label>\n  <input type="number" id="age">\n\n  <button>Envoyer</button>\n</form>',
    },
  },

  'html-4-2': {
    langage: 'html',
    xp: 30,
    objectif: {
      fr: 'Proposer des choix plutôt que de la saisie libre.',
      en: 'Offer choices rather than free typing.',
    },
    explication: {
      fr: `
        <p>Taper au clavier n’est pas toujours la bonne idée : pour une réponse parmi quelques
        possibilités, mieux vaut <strong>proposer</strong>.</p>
        <p><strong>La case à cocher</strong> — plusieurs réponses possibles :</p>
        <p><code>&lt;input type="checkbox" id="sport"&gt;</code></p>
        <p><strong>Le bouton radio</strong> — une seule réponse. Les boutons d’un même groupe
        doivent partager le <strong>même <code>name</code></strong> ; c’est ce qui les rend
        exclusifs :</p>
        <pre>&lt;input type="radio" name="niveau" id="debutant"&gt;
&lt;input type="radio" name="niveau" id="expert"&gt;</pre>
        <p><strong>Le menu déroulant</strong> — quand il y a beaucoup de choix :</p>
        <pre>&lt;select id="pays"&gt;
  &lt;option&gt;France&lt;/option&gt;
  &lt;option&gt;Canada&lt;/option&gt;
&lt;/select&gt;</pre>
        <p>Oublier le <code>name</code> commun sur les radios est l’erreur classique : on peut
        alors tout cocher en même temps.</p>
      `,
      en: `
        <p>Typing is not always the right idea: for one answer among a few options, better to
        <strong>offer</strong> them.</p>
        <p><strong>The checkbox</strong> — several answers possible:</p>
        <p><code>&lt;input type="checkbox" id="sport"&gt;</code></p>
        <p><strong>The radio button</strong> — a single answer. Buttons in the same group must
        share the <strong>same <code>name</code></strong>; that is what makes them exclusive:</p>
        <pre>&lt;input type="radio" name="niveau" id="debutant"&gt;
&lt;input type="radio" name="niveau" id="expert"&gt;</pre>
        <p><strong>The dropdown</strong> — when there are many options:</p>
        <pre>&lt;select id="pays"&gt;
  &lt;option&gt;France&lt;/option&gt;
  &lt;option&gt;Canada&lt;/option&gt;
&lt;/select&gt;</pre>
        <p>Forgetting the shared <code>name</code> on radios is the classic mistake: you can then
        tick them all at once.</p>
      `,
    },
    exemple: {
      code: '<form>\n  <p>Tes activités :</p>\n  <input type="checkbox" id="sport">\n  <label for="sport">Sport</label>\n  <input type="checkbox" id="musique">\n  <label for="musique">Musique</label>\n\n  <p>Ton niveau :</p>\n  <input type="radio" name="niveau" id="deb">\n  <label for="deb">Débutant</label>\n  <input type="radio" name="niveau" id="exp">\n  <label for="exp">Expert</label>\n</form>',
      note: {
        fr: 'Essaie : tu peux cocher les deux activités, mais un seul niveau.',
        en: 'Try it: you can tick both activities, but only one level.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Crée un sondage contenant :</p><ul><li><strong>2 cases à cocher</strong> ;</li><li><strong>3 boutons radio</strong> partageant le même <code>name</code> ;</li><li>un <strong>menu déroulant</strong> avec au moins <strong>3</strong> options.</li></ul>',
        en: '<p>Create a survey containing:</p><ul><li><strong>2 checkboxes</strong>;</li><li><strong>3 radio buttons</strong> sharing the same <code>name</code>;</li><li>a <strong>dropdown</strong> with at least <strong>3</strong> options.</li></ul>',
      },
      depart: '<form>\n  <!-- Cases à cocher, boutons radio, menu déroulant -->\n</form>\n',
      verifications: [
        { type: 'dom', selecteur: 'input[type="checkbox"]', quoi: 'nombre', attendu: 2 },
        { type: 'dom', selecteur: 'input[type="radio"]', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'select', quoi: 'existe' },
        { type: 'dom', selecteur: 'select > option', quoi: 'nombre', attendu: 3 },
        {
          type: 'codeContient',
          motif: '(type=["\']radio["\'][^>]*name=["\'](\\w+)["\'][\\s\\S]*){3}',
          message: {
            fr: 'Les trois boutons radio doivent avoir un attribut name — le même pour les trois.',
            en: 'All three radio buttons need a name attribute — the same one for all three.',
          },
        },
      ],
      indices: [
        { fr: 'Les cases : <code>&lt;input type="checkbox" id="…"&gt;</code>, deux fois avec des id différents.', en: 'The checkboxes: <code>&lt;input type="checkbox" id="…"&gt;</code>, twice with different ids.' },
        { fr: 'Les radios : même <code>name="avis"</code> pour les trois, mais des <code>id</code> différents.', en: 'The radios: same <code>name="avis"</code> for all three, but different <code>id</code>.' },
        { fr: 'Le menu : <code>&lt;select&gt;</code> avec trois <code>&lt;option&gt;…&lt;/option&gt;</code> dedans.', en: 'The dropdown: <code>&lt;select&gt;</code> with three <code>&lt;option&gt;…&lt;/option&gt;</code> inside.' },
      ],
      solution:
        '<form>\n  <p>Ce que tu aimes :</p>\n  <input type="checkbox" id="jeux">\n  <label for="jeux">Jeux vidéo</label>\n  <input type="checkbox" id="lecture">\n  <label for="lecture">Lecture</label>\n\n  <p>Ton avis :</p>\n  <input type="radio" name="avis" id="bien">\n  <label for="bien">Bien</label>\n  <input type="radio" name="avis" id="moyen">\n  <label for="moyen">Moyen</label>\n  <input type="radio" name="avis" id="bof">\n  <label for="bof">Bof</label>\n\n  <p>Ta classe :</p>\n  <select id="classe">\n    <option>6e</option>\n    <option>5e</option>\n    <option>4e</option>\n  </select>\n</form>',
    },
  },

  'html-4-3': {
    langage: 'html',
    xp: 40,
    objectif: {
      fr: 'Assembler un formulaire complet et bien construit.',
      en: 'Assemble a complete, well-built form.',
    },
    explication: {
      fr: `
        <p>Dernier exercice du parcours HTML : un <strong>formulaire d’inscription</strong>
        complet, comme sur un vrai site.</p>
        <p>Trois points font la différence entre un formulaire correct et un formulaire bâclé :</p>
        <ul>
          <li><strong>chaque champ a son label</strong>, relié par <code>for</code> ;</li>
          <li><strong>le bon <code>type</code></strong> pour chaque information — un e-mail dans
          un champ <code>email</code>, pas dans un champ <code>text</code> ;</li>
          <li><strong>les champs obligatoires portent <code>required</code></strong>, et le
          navigateur refuse alors l’envoi s’ils sont vides.</li>
        </ul>
        <p><code>required</code> s’écrit tout seul, sans valeur :
        <code>&lt;input type="text" id="nom" required&gt;</code></p>
        <p>Il existe aussi <code>&lt;textarea&gt;</code> pour un texte long, et
        <code>placeholder="…"</code> pour un exemple grisé dans le champ.</p>
      `,
      en: `
        <p>Last exercise of the HTML track: a complete <strong>sign-up form</strong>, like on a
        real site.</p>
        <p>Three things separate a decent form from a sloppy one:</p>
        <ul>
          <li><strong>every field has its label</strong>, linked by <code>for</code>;</li>
          <li><strong>the right <code>type</code></strong> for each piece of information — an
          email in an <code>email</code> field, not a <code>text</code> one;</li>
          <li><strong>required fields carry <code>required</code></strong>, and the browser then
          refuses to submit if they are empty.</li>
        </ul>
        <p><code>required</code> stands alone, with no value:
        <code>&lt;input type="text" id="nom" required&gt;</code></p>
        <p>There is also <code>&lt;textarea&gt;</code> for long text, and
        <code>placeholder="…"</code> for a greyed-out example inside the field.</p>
      `,
    },
    exemple: {
      code: '<form>\n  <label for="pseudo">Pseudo</label>\n  <input type="text" id="pseudo" placeholder="ex : theo42" required>\n\n  <label for="message">Message</label>\n  <textarea id="message" rows="3"></textarea>\n\n  <button>S\'inscrire</button>\n</form>',
      note: {
        fr: 'Clique sur le bouton en laissant le pseudo vide : le navigateur bloque tout seul.',
        en: 'Click the button with the pseudo empty: the browser blocks it on its own.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Construis le formulaire d’inscription d’un club :</p><ul><li>un <code>&lt;h2&gt;</code> ;</li><li><strong>4 champs</strong> <code>&lt;input&gt;</code>, chacun avec son <code>&lt;label for&gt;</code> ;</li><li>parmi eux, un <code>email</code> et un <code>date</code> ;</li><li>au moins <strong>2 champs</strong> marqués <code>required</code> ;</li><li>un <code>&lt;select&gt;</code> avec 3 options ;</li><li>un <code>&lt;textarea&gt;</code> ;</li><li>un <code>&lt;button&gt;</code>.</li></ul>',
        en: '<p>Build a club sign-up form:</p><ul><li>an <code>&lt;h2&gt;</code>;</li><li><strong>4</strong> <code>&lt;input&gt;</code> fields, each with its <code>&lt;label for&gt;</code>;</li><li>among them, one <code>email</code> and one <code>date</code>;</li><li>at least <strong>2 fields</strong> marked <code>required</code>;</li><li>a <code>&lt;select&gt;</code> with 3 options;</li><li>a <code>&lt;textarea&gt;</code>;</li><li>a <code>&lt;button&gt;</code>.</li></ul>',
      },
      depart: '<h2>Inscription au club</h2>\n\n<form>\n</form>\n',
      verifications: [
        { type: 'dom', selecteur: 'h2', quoi: 'existe' },
        { type: 'dom', selecteur: 'form input', quoi: 'nombre', attendu: 4 },
        { type: 'dom', selecteur: 'label[for]', quoi: 'nombre', min: 4 },
        { type: 'dom', selecteur: 'input[type="email"]', quoi: 'existe' },
        { type: 'dom', selecteur: 'input[type="date"]', quoi: 'existe' },
        { type: 'dom', selecteur: 'input[required]', quoi: 'nombre', min: 2 },
        { type: 'dom', selecteur: 'select > option', quoi: 'nombre', attendu: 3 },
        { type: 'dom', selecteur: 'textarea', quoi: 'existe' },
        { type: 'dom', selecteur: 'button', quoi: 'existe' },
      ],
      indices: [
        { fr: 'Quatre paires label + input. Chaque <code>for</code> reprend l’<code>id</code> du champ voisin.', en: 'Four label + input pairs. Each <code>for</code> repeats the neighbouring field id.' },
        { fr: 'Ajoute simplement le mot <code>required</code> avant le <code>&gt;</code> de deux champs.', en: 'Just add the word <code>required</code> before the <code>&gt;</code> of two fields.' },
        { fr: 'Le <code>&lt;textarea&gt;</code> se ferme avec <code>&lt;/textarea&gt;</code>, même s’il est vide.', en: 'The <code>&lt;textarea&gt;</code> closes with <code>&lt;/textarea&gt;</code>, even when empty.' },
      ],
      solution:
        '<h2>Inscription au club</h2>\n\n<form>\n  <label for="nom">Nom</label>\n  <input type="text" id="nom" required>\n\n  <label for="courriel">Adresse e-mail</label>\n  <input type="email" id="courriel" required>\n\n  <label for="naissance">Date de naissance</label>\n  <input type="date" id="naissance">\n\n  <label for="tel">Téléphone</label>\n  <input type="text" id="tel">\n\n  <label for="activite">Activité choisie</label>\n  <select id="activite">\n    <option>Football</option>\n    <option>Escalade</option>\n    <option>Théâtre</option>\n  </select>\n\n  <label for="mot">Un mot pour te présenter</label>\n  <textarea id="mot" rows="3"></textarea>\n\n  <button>S\'inscrire</button>\n</form>',
    },
    projet: { titre: { fr: 'Mon formulaire d’inscription', en: 'My sign-up form' } },
  },
};
