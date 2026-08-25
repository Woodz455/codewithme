/**
 * Parcours CSS — contenu des lecons.
 * Voir `_schema.md` pour la description d'une lecon.
 *
 * Toutes les lecons donnent la structure HTML et laissent l'eleve ecrire le
 * style : c'est le CSS qu'on apprend ici, et il doit toujours habiller une
 * vraie page plutot qu'un carre abstrait.
 */

export const LECONS_CSS = {
  /* ===================================================== Module 1 ========= */

  'css-1-1': {
    langage: 'css',
    xp: 20,
    objectif: {
      fr: 'Écrire ta première règle CSS et voir la page changer.',
      en: 'Write your first CSS rule and watch the page change.',
    },
    explication: {
      fr: `
        <p>Le HTML dit <em>ce que sont</em> les choses. Le CSS dit <em>à quoi elles
        ressemblent</em>. C’est la différence entre « ceci est un titre » et « ce titre est
        rouge et énorme ».</p>
        <p>Une règle CSS a toujours la même forme :</p>
        <pre>h1 {
  color: tomato;
}</pre>
        <ul>
          <li><code>h1</code> — le <strong>sélecteur</strong> : à qui je parle ;</li>
          <li><code>color</code> — la <strong>propriété</strong> : ce que je change ;</li>
          <li><code>tomato</code> — la <strong>valeur</strong> : ce que ça devient.</li>
        </ul>
        <p>Deux-points entre la propriété et la valeur, point-virgule à la fin, accolades autour.
        Cette forme ne change jamais : quand tu la connais, tu peux écrire n’importe quelle règle.</p>
        <p><strong>L’erreur la plus courante :</strong> oublier le point-virgule. La règle
        suivante est alors avalée et rien ne se passe. Si une règle « ne marche pas », regarde
        d’abord la ligne <em>au-dessus</em>.</p>
      `,
      en: `
        <p>HTML says <em>what things are</em>. CSS says <em>what they look like</em>. That is the
        difference between "this is a heading" and "this heading is red and huge".</p>
        <p>A CSS rule always has the same shape:</p>
        <pre>h1 {
  color: tomato;
}</pre>
        <ul>
          <li><code>h1</code> — the <strong>selector</strong>: who I am talking to;</li>
          <li><code>color</code> — the <strong>property</strong>: what I am changing;</li>
          <li><code>tomato</code> — the <strong>value</strong>: what it becomes.</li>
        </ul>
        <p>A colon between property and value, a semicolon at the end, braces around it. This
        shape never changes: once you know it, you can write any rule.</p>
        <p><strong>The most common mistake:</strong> forgetting the semicolon. The next rule gets
        swallowed and nothing happens. If a rule "does not work", look at the line
        <em>above</em> first.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Bonjour</h1>\n<p>Un paragraphe tout simple.</p>',
        css: 'h1 {\n  color: mediumseagreen;\n}',
      },
      note: {
        fr: 'Change mediumseagreen en tomato, en gold, en hotpink : l’aperçu suit ta frappe.',
        en: 'Change mediumseagreen to tomato, gold, hotpink: the preview follows as you type.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>La page est déjà écrite. Dans l’onglet <strong>CSS</strong>, colore :</p><ul><li>le titre <code>h1</code> en <code>tomato</code> ;</li><li>les paragraphes <code>p</code> en <code>#555555</code>.</li></ul>',
        en: '<p>The page is already written. In the <strong>CSS</strong> tab, colour:</p><ul><li>the <code>h1</code> heading in <code>tomato</code>;</li><li>the <code>p</code> paragraphs in <code>#555555</code>.</li></ul>',
      },
      depart: {
        html: '<h1>Mon site à moi</h1>\n<p>Bienvenue sur ma toute première page stylée.</p>\n<p>Ici, c’est moi qui choisis les couleurs.</p>',
        css: '/* Écris tes deux règles ici */\n',
      },
      verifications: [
        { type: 'style', selecteur: 'h1', propriete: 'color', attendu: ['rgb(255, 99, 71)', 'tomato'] },
        { type: 'style', selecteur: 'p', propriete: 'color', attendu: ['rgb(85, 85, 85)', '#555555'] },
      ],
      indices: [
        {
          fr: 'Commence par le sélecteur, puis une accolade ouvrante : <code>h1 {</code>.',
          en: 'Start with the selector, then an opening brace: <code>h1 {</code>.',
        },
        {
          fr: 'À l’intérieur : <code>color: tomato;</code>. N’oublie ni les deux-points ni le point-virgule.',
          en: 'Inside: <code>color: tomato;</code>. Do not forget the colon or the semicolon.',
        },
        {
          fr: 'Referme avec <code>}</code>, puis recommence une règle complète pour <code>p</code>.',
          en: 'Close with <code>}</code>, then write a second complete rule for <code>p</code>.',
        },
      ],
      solution: {
        html: '<h1>Mon site à moi</h1>\n<p>Bienvenue sur ma toute première page stylée.</p>\n<p>Ici, c’est moi qui choisis les couleurs.</p>',
        css: 'h1 {\n  color: tomato;\n}\n\np {\n  color: #555555;\n}',
      },
    },
  },

  'css-1-2': {
    langage: 'css',
    xp: 20,
    objectif: {
      fr: 'Choisir des couleurs de texte et de fond, en toutes lettres ou en hexadécimal.',
      en: 'Choose text and background colours, by name or in hexadecimal.',
    },
    explication: {
      fr: `
        <p>Il y a deux couleurs sur presque tout élément : celle du <strong>texte</strong>
        (<code>color</code>) et celle du <strong>fond</strong> (<code>background-color</code>).</p>
        <p>Et deux façons de nommer une couleur :</p>
        <ul>
          <li><strong>par son nom</strong> — <code>tomato</code>, <code>gold</code>,
          <code>hotpink</code>. Pratique, mais seulement 148 couleurs existent ;</li>
          <li><strong>en hexadécimal</strong> — <code>#0b1020</code>. Trois paires :
          rouge, vert, bleu, de <code>00</code> (rien) à <code>ff</code> (à fond).
          Seize millions de couleurs.</li>
        </ul>
        <p><code>#ff0000</code> = rouge pur. <code>#000000</code> = noir. <code>#ffffff</code> =
        blanc. Tous les dégradés de gris ont leurs trois paires identiques :
        <code>#555555</code>, <code>#cccccc</code>.</p>
        <p><strong>Attention au contraste.</strong> Du gris clair sur du blanc est illisible.
        Un texte doit toujours trancher franchement sur son fond — c’est la première règle
        du design, avant même le goût.</p>
      `,
      en: `
        <p>Almost every element has two colours: the <strong>text</strong> colour
        (<code>color</code>) and the <strong>background</strong> colour
        (<code>background-color</code>).</p>
        <p>And two ways of naming a colour:</p>
        <ul>
          <li><strong>by name</strong> — <code>tomato</code>, <code>gold</code>,
          <code>hotpink</code>. Handy, but only 148 colours exist;</li>
          <li><strong>in hexadecimal</strong> — <code>#0b1020</code>. Three pairs: red, green,
          blue, from <code>00</code> (none) to <code>ff</code> (full). Sixteen million colours.</li>
        </ul>
        <p><code>#ff0000</code> = pure red. <code>#000000</code> = black. <code>#ffffff</code> =
        white. Every shade of grey has its three pairs identical: <code>#555555</code>,
        <code>#cccccc</code>.</p>
        <p><strong>Watch the contrast.</strong> Light grey on white is unreadable. Text must
        always stand out clearly against its background — that is the first rule of design,
        before taste even comes into it.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h2>Carte de score</h2>\n<p>Niveau 7 — 1 240 points</p>',
        css: 'body {\n  background-color: #0b1020;\n}\n\nh2 {\n  color: #ffd93d;\n}\n\np {\n  color: #a9b3d4;\n}',
      },
      note: {
        fr: 'Fond sombre, titre jaune, texte gris clair : trois couleurs qui se répondent.',
        en: 'Dark background, yellow heading, light grey text: three colours that work together.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Donne à cette carte son ambiance :</p><ul><li><code>body</code> : fond <code>#0b1020</code> ;</li><li><code>.carte</code> : fond <code>#ffffff</code> ;</li><li><code>h2</code> : texte <code>#b14bff</code>.</li></ul>',
        en: '<p>Give this card its atmosphere:</p><ul><li><code>body</code>: background <code>#0b1020</code>;</li><li><code>.carte</code>: background <code>#ffffff</code>;</li><li><code>h2</code>: text <code>#b14bff</code>.</li></ul>',
      },
      depart: {
        html: '<div class="carte">\n  <h2>Théo Martin</h2>\n  <p>Apprenti développeur, 12 ans.</p>\n</div>',
        css: '.carte {\n  padding: 20px;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: 'body', propriete: 'background-color', attendu: 'rgb(11, 16, 32)' },
        { type: 'style', selecteur: '.carte', propriete: 'background-color', attendu: 'rgb(255, 255, 255)' },
        { type: 'style', selecteur: 'h2', propriete: 'color', attendu: 'rgb(177, 75, 255)' },
      ],
      indices: [
        {
          fr: 'Le fond de la page se règle sur <code>body</code>, pas sur <code>.carte</code>.',
          en: 'The page background is set on <code>body</code>, not on <code>.carte</code>.',
        },
        {
          fr: 'La propriété du fond s’appelle <code>background-color</code>, celle du texte <code>color</code>.',
          en: 'The background property is <code>background-color</code>, the text one is <code>color</code>.',
        },
        {
          fr: 'Une règle existe déjà pour <code>.carte</code> : ajoute-lui simplement une ligne de plus.',
          en: 'A rule already exists for <code>.carte</code>: just add one more line inside it.',
        },
      ],
      solution: {
        html: '<div class="carte">\n  <h2>Théo Martin</h2>\n  <p>Apprenti développeur, 12 ans.</p>\n</div>',
        css: 'body {\n  background-color: #0b1020;\n}\n\n.carte {\n  padding: 20px;\n  background-color: #ffffff;\n}\n\nh2 {\n  color: #b14bff;\n}',
      },
    },
  },

  'css-1-3': {
    langage: 'css',
    xp: 25,
    objectif: {
      fr: 'Changer la police, la taille, la graisse et l’alignement d’un texte.',
      en: 'Change a text’s font, size, weight and alignment.',
    },
    explication: {
      fr: `
        <p>Quatre propriétés suffisent à transformer complètement un texte :</p>
        <ul>
          <li><code>font-family</code> — la police. On en écrit toujours <strong>plusieurs</strong>,
          séparées par des virgules : si la première manque sur l’ordinateur, la suivante prend
          le relais. <code>font-family: Georgia, serif;</code></li>
          <li><code>font-size</code> — la taille, en pixels : <code>font-size: 44px;</code></li>
          <li><code>font-weight</code> — la graisse. <code>400</code> = normal,
          <code>700</code> = gras ;</li>
          <li><code>text-align</code> — <code>left</code>, <code>center</code>,
          <code>right</code>.</li>
        </ul>
        <p>Les polices se rangent en deux grandes familles : <strong>serif</strong> (avec des
        petits empattements, comme dans un livre) et <strong>sans-serif</strong> (au trait net,
        comme sur un écran).</p>
        <p><strong>À savoir :</strong> tu ne peux utiliser que les polices présentes sur
        l’ordinateur de celui qui regarde. C’est pour ça qu’on termine toujours la liste par une
        famille générique — <code>serif</code> ou <code>sans-serif</code> — qui existe partout.</p>
      `,
      en: `
        <p>Four properties are enough to transform a text completely:</p>
        <ul>
          <li><code>font-family</code> — the font. You always write <strong>several</strong>,
          separated by commas: if the first is missing on the computer, the next takes over.
          <code>font-family: Georgia, serif;</code></li>
          <li><code>font-size</code> — the size, in pixels: <code>font-size: 44px;</code></li>
          <li><code>font-weight</code> — the weight. <code>400</code> = normal,
          <code>700</code> = bold;</li>
          <li><code>text-align</code> — <code>left</code>, <code>center</code>,
          <code>right</code>.</li>
        </ul>
        <p>Fonts fall into two big families: <strong>serif</strong> (with little feet, like in a
        book) and <strong>sans-serif</strong> (clean lines, like on a screen).</p>
        <p><strong>Worth knowing:</strong> you can only use fonts that exist on the reader’s
        computer. That is why the list always ends with a generic family —
        <code>serif</code> or <code>sans-serif</code> — which exists everywhere.</p>
      `,
    },
    exemple: {
      code: {
        html: '<h1>Le Petit Journal</h1>\n<p>Édition du matin</p>',
        css: 'h1 {\n  font-family: Georgia, serif;\n  font-size: 48px;\n  text-align: center;\n}\n\np {\n  text-align: center;\n  font-weight: 700;\n}',
      },
      note: {
        fr: 'Une police à empattements et un centrage : ça fait tout de suite « journal ».',
        en: 'A serif font and centring: it immediately reads as "newspaper".',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Mets cette affiche en forme. Sur le <code>h1</code> :</p><ul><li>police <code>Georgia, serif</code> ;</li><li>taille <code>44px</code> ;</li><li>centré.</li></ul><p>Et mets le <code>.sous-titre</code> en gras (<code>700</code>), centré lui aussi.</p>',
        en: '<p>Lay out this poster. On the <code>h1</code>:</p><ul><li>font <code>Georgia, serif</code>;</li><li>size <code>44px</code>;</li><li>centred.</li></ul><p>And make the <code>.sous-titre</code> bold (<code>700</code>) and centred too.</p>',
      },
      depart: {
        html: '<h1>Tournoi de jeux vidéo</h1>\n<p class="sous-titre">Samedi 14 juin — Salle des fêtes</p>',
        css: '/* Le titre, puis le sous-titre */\n',
      },
      verifications: [
        { type: 'style', selecteur: 'h1', propriete: 'font-family', attendu: ['Georgia, serif', 'georgia,serif'] },
        { type: 'style', selecteur: 'h1', propriete: 'font-size', attendu: '44px' },
        { type: 'style', selecteur: 'h1', propriete: 'text-align', attendu: 'center' },
        { type: 'style', selecteur: '.sous-titre', propriete: 'font-weight', attendu: '700' },
        { type: 'style', selecteur: '.sous-titre', propriete: 'text-align', attendu: 'center' },
      ],
      indices: [
        {
          fr: 'Trois lignes dans la règle <code>h1</code> : <code>font-family</code>, <code>font-size</code>, <code>text-align</code>.',
          en: 'Three lines in the <code>h1</code> rule: <code>font-family</code>, <code>font-size</code>, <code>text-align</code>.',
        },
        {
          fr: 'La liste de polices s’écrit telle quelle : <code>font-family: Georgia, serif;</code>',
          en: 'The font list is written as is: <code>font-family: Georgia, serif;</code>',
        },
        {
          fr: 'Le sous-titre porte une classe : son sélecteur commence par un point, <code>.sous-titre</code>.',
          en: 'The subtitle has a class: its selector starts with a dot, <code>.sous-titre</code>.',
        },
      ],
      solution: {
        html: '<h1>Tournoi de jeux vidéo</h1>\n<p class="sous-titre">Samedi 14 juin — Salle des fêtes</p>',
        css: 'h1 {\n  font-family: Georgia, serif;\n  font-size: 44px;\n  text-align: center;\n}\n\n.sous-titre {\n  font-weight: 700;\n  text-align: center;\n}',
      },
    },
  },

  'css-1-4': {
    langage: 'css',
    xp: 25,
    objectif: {
      fr: 'Ranger des éléments par classe, pour n’en styler que certains.',
      en: 'Group elements with classes, to style only some of them.',
    },
    explication: {
      fr: `
        <p>Jusqu’ici tu as visé des balises : <code>p</code> touche <strong>tous</strong> les
        paragraphes. Mais souvent, tu ne veux en changer qu’un seul.</p>
        <p>C’est le rôle des <strong>classes</strong>. Tu poses une étiquette dans le HTML :</p>
        <pre>&lt;p class="alerte"&gt;Attention !&lt;/p&gt;</pre>
        <p>et tu la vises dans le CSS avec un <strong>point</strong> devant :</p>
        <pre>.alerte {
  color: crimson;
}</pre>
        <p>Une même classe peut servir sur autant d’éléments que tu veux — c’est même l’idée :
        écrire la règle une fois, l’appliquer partout. Et un élément peut porter plusieurs
        classes, séparées par une espace : <code>class="carte grande"</code>.</p>
        <p><strong>Deux pièges à connaître :</strong> le point ne s’écrit que dans le CSS, jamais
        dans l’attribut <code>class</code>. Et le nom d’une classe ne prend ni accent ni espace —
        <code>mise-en-avant</code>, pas <code>mise en avant</code>.</p>
      `,
      en: `
        <p>So far you have targeted tags: <code>p</code> hits <strong>every</strong> paragraph.
        But often you only want to change one of them.</p>
        <p>That is what <strong>classes</strong> are for. You put a label in the HTML:</p>
        <pre>&lt;p class="alerte"&gt;Careful!&lt;/p&gt;</pre>
        <p>and you target it in the CSS with a <strong>dot</strong> in front:</p>
        <pre>.alerte {
  color: crimson;
}</pre>
        <p>The same class can be used on as many elements as you like — that is the whole point:
        write the rule once, apply it everywhere. And one element can carry several classes,
        separated by a space: <code>class="carte grande"</code>.</p>
        <p><strong>Two traps:</strong> the dot only ever appears in the CSS, never in the
        <code>class</code> attribute. And a class name takes no accents and no spaces —
        <code>mise-en-avant</code>, not <code>mise en avant</code>.</p>
      `,
    },
    exemple: {
      code: {
        html: '<p>Un paragraphe normal.</p>\n<p class="alerte">Un paragraphe important !</p>\n<p>Encore un normal.</p>',
        css: 'p {\n  color: #444444;\n}\n\n.alerte {\n  color: crimson;\n  font-weight: 700;\n}',
      },
      note: {
        fr: 'La règle <code>p</code> touche les trois ; <code>.alerte</code> n’en reprend qu’un.',
        en: 'The <code>p</code> rule hits all three; <code>.alerte</code> takes just one back.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Dans le <strong>HTML</strong>, ajoute la classe <code>faite</code> aux <strong>deux premières</strong> tâches de la liste.</p><p>Dans le <strong>CSS</strong>, donne à <code>.faite</code> la couleur <code>#9aa5c8</code> et la décoration <code>line-through</code> (texte barré).</p>',
        en: '<p>In the <strong>HTML</strong>, add the class <code>faite</code> to the <strong>first two</strong> tasks in the list.</p><p>In the <strong>CSS</strong>, give <code>.faite</code> the colour <code>#9aa5c8</code> and the decoration <code>line-through</code> (struck through).</p>',
      },
      depart: {
        html: '<h2>Ma liste du jour</h2>\n<ul>\n  <li>Ranger ma chambre</li>\n  <li>Faire les maths</li>\n  <li>Finir cette leçon</li>\n</ul>',
        css: 'li {\n  font-size: 18px;\n  line-height: 1.8;\n}\n',
      },
      verifications: [
        { type: 'dom', selecteur: '.faite', quoi: 'nombre', attendu: 2 },
        { type: 'style', selecteur: '.faite', propriete: 'color', attendu: 'rgb(154, 165, 200)' },
        { type: 'style', selecteur: '.faite', propriete: 'text-decoration-line', attendu: 'line-through' },
      ],
      indices: [
        {
          fr: 'Dans le HTML : <code>&lt;li class="faite"&gt;Ranger ma chambre&lt;/li&gt;</code>.',
          en: 'In the HTML: <code>&lt;li class="faite"&gt;Tidy my room&lt;/li&gt;</code>.',
        },
        {
          fr: 'Exactement deux <code>li</code> doivent porter la classe, pas trois.',
          en: 'Exactly two <code>li</code> must carry the class, not three.',
        },
        {
          fr: 'Dans le CSS, le sélecteur prend un point : <code>.faite { … }</code>, avec <code>text-decoration: line-through;</code>.',
          en: 'In the CSS the selector takes a dot: <code>.faite { … }</code>, with <code>text-decoration: line-through;</code>.',
        },
      ],
      solution: {
        html: '<h2>Ma liste du jour</h2>\n<ul>\n  <li class="faite">Ranger ma chambre</li>\n  <li class="faite">Faire les maths</li>\n  <li>Finir cette leçon</li>\n</ul>',
        css: 'li {\n  font-size: 18px;\n  line-height: 1.8;\n}\n\n.faite {\n  color: #9aa5c8;\n  text-decoration: line-through;\n}',
      },
    },
  },

  /* ===================================================== Module 2 ========= */

  'css-2-1': {
    langage: 'css',
    xp: 25,
    objectif: {
      fr: 'Comprendre que chaque élément est une boîte, et lui donner une taille.',
      en: 'Understand that every element is a box, and give it a size.',
    },
    explication: {
      fr: `
        <p>Voici l’idée qui débloque tout le CSS : <strong>chaque élément d’une page est une
        boîte rectangulaire</strong>. Un titre, un paragraphe, une image, un bouton : des boîtes.
        On ne les voit pas parce qu’elles sont transparentes, mais elles sont là.</p>
        <p>Deux sortes de boîtes :</p>
        <ul>
          <li><strong>bloc</strong> (<code>div</code>, <code>p</code>, <code>h1</code>…) — prend
          toute la largeur disponible et pousse la suite à la ligne ;</li>
          <li><strong>en ligne</strong> (<code>span</code>, <code>a</code>,
          <code>strong</code>…) — ne prend que la place de son contenu et reste dans le texte.</li>
        </ul>
        <p>Sur une boîte de type bloc, tu peux imposer <code>width</code> (largeur) et
        <code>height</code> (hauteur), en pixels ou en pourcentage de son parent.</p>
        <p><strong>Le conseil de pro :</strong> mets un fond bien visible sur une boîte quand tu
        ne comprends pas ce qui se passe. Voir la boîte, c’est comprendre le problème — c’est
        exactement ce que font les développeurs tous les jours.</p>
      `,
      en: `
        <p>Here is the idea that unlocks all of CSS: <strong>every element on a page is a
        rectangular box</strong>. A heading, a paragraph, an image, a button: boxes. You do not
        see them because they are transparent, but they are there.</p>
        <p>Two kinds of box:</p>
        <ul>
          <li><strong>block</strong> (<code>div</code>, <code>p</code>, <code>h1</code>…) — takes
          the full available width and pushes whatever follows onto a new line;</li>
          <li><strong>inline</strong> (<code>span</code>, <code>a</code>, <code>strong</code>…) —
          takes only the room its content needs and stays within the text.</li>
        </ul>
        <p>On a block box you can set <code>width</code> and <code>height</code>, in pixels or as
        a percentage of its parent.</p>
        <p><strong>The pro tip:</strong> put an obvious background on a box whenever you cannot
        work out what is happening. Seeing the box is understanding the problem — that is exactly
        what developers do every day.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="boite">Je suis une boîte.</div>\n<p>Et moi je suis en dessous.</p>',
        css: '.boite {\n  width: 260px;\n  height: 90px;\n  background-color: #b14bff;\n  color: white;\n}',
      },
      note: {
        fr: 'Enlève la hauteur : la boîte se contente alors de la place de son texte.',
        en: 'Remove the height: the box then takes only the room its text needs.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Fabrique un drapeau. Donne à <code>.bande</code> :</p><ul><li>une largeur de <code>300px</code> ;</li><li>une hauteur de <code>60px</code> ;</li><li>un fond <code>#00e5ff</code>.</li></ul>',
        en: '<p>Build a flag. Give <code>.bande</code>:</p><ul><li>a width of <code>300px</code>;</li><li>a height of <code>60px</code>;</li><li>a <code>#00e5ff</code> background.</li></ul>',
      },
      depart: {
        html: '<div class="bande"></div>\n<div class="bande"></div>\n<div class="bande"></div>',
        css: '/* Les trois bandes portent la même classe :\n   une seule règle suffit. */\n',
      },
      verifications: [
        { type: 'style', selecteur: '.bande', propriete: 'width', attendu: '300px' },
        { type: 'style', selecteur: '.bande', propriete: 'height', attendu: '60px' },
        { type: 'style', selecteur: '.bande', propriete: 'background-color', attendu: 'rgb(0, 229, 255)' },
      ],
      indices: [
        {
          fr: 'Une seule règle <code>.bande { … }</code> : elle s’applique aux trois d’un coup.',
          en: 'A single <code>.bande { … }</code> rule: it applies to all three at once.',
        },
        {
          fr: 'Les tailles s’écrivent avec leur unité : <code>300px</code>, pas <code>300</code>.',
          en: 'Sizes are written with their unit: <code>300px</code>, not <code>300</code>.',
        },
        {
          fr: 'Trois lignes dans la règle : <code>width</code>, <code>height</code>, <code>background-color</code>.',
          en: 'Three lines in the rule: <code>width</code>, <code>height</code>, <code>background-color</code>.',
        },
      ],
      solution: {
        html: '<div class="bande"></div>\n<div class="bande"></div>\n<div class="bande"></div>',
        css: '.bande {\n  width: 300px;\n  height: 60px;\n  background-color: #00e5ff;\n}',
      },
    },
  },

  'css-2-2': {
    langage: 'css',
    xp: 25,
    objectif: {
      fr: 'Distinguer la marge intérieure de la marge extérieure, et respirer.',
      en: 'Tell padding from margin, and let a design breathe.',
    },
    explication: {
      fr: `
        <p>Deux espaces à ne jamais confondre :</p>
        <ul>
          <li><code>padding</code> — la marge <strong>intérieure</strong>, entre le bord de la
          boîte et son contenu. C’est le rembourrage d’un colis ;</li>
          <li><code>margin</code> — la marge <strong>extérieure</strong>, entre cette boîte et
          les boîtes voisines. C’est la distance entre deux colis sur l’étagère.</li>
        </ul>
        <p>Le fond coloré s’arrête au bord de la boîte : il couvre donc le <code>padding</code>,
        jamais le <code>margin</code>. C’est le moyen le plus simple de savoir lequel des deux tu
        regardes.</p>
        <p>Les deux acceptent plusieurs formes :</p>
        <pre>padding: 20px;              /* partout */
padding: 10px 30px;         /* haut-bas, puis gauche-droite */
padding-top: 40px;          /* un seul côté */</pre>
        <p><strong>Le vrai secret d’une page qui a l’air pro,</strong> ce ne sont pas les
        couleurs : c’est l’espace. Un débutant colle tout ; un designer laisse respirer. Quand
        une page te semble « pas belle » sans savoir pourquoi, il manque presque toujours de
        l’espace.</p>
      `,
      en: `
        <p>Two spaces never to be confused:</p>
        <ul>
          <li><code>padding</code> — the <strong>inner</strong> space, between the box’s edge and
          its content. It is the padding inside a parcel;</li>
          <li><code>margin</code> — the <strong>outer</strong> space, between this box and its
          neighbours. It is the distance between two parcels on the shelf.</li>
        </ul>
        <p>A background colour stops at the box edge: so it covers the <code>padding</code>,
        never the <code>margin</code>. That is the easiest way to tell which one you are
        looking at.</p>
        <p>Both accept several forms:</p>
        <pre>padding: 20px;              /* all round */
padding: 10px 30px;         /* top-bottom, then left-right */
padding-top: 40px;          /* one side only */</pre>
        <p><strong>The real secret of a page that looks professional</strong> is not the
        colours: it is space. A beginner crams everything together; a designer lets it breathe.
        When a page looks "wrong" and you cannot say why, space is almost always what is
        missing.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="colle">Sans respiration.</div>\n<div class="aere">Avec de l’espace.</div>',
        css: '.colle {\n  background-color: #ffd93d;\n}\n\n.aere {\n  background-color: #3dffa8;\n  padding: 24px;\n  margin-top: 24px;\n}',
      },
      note: {
        fr: 'Le fond jaune colle au texte ; le vert a du rembourrage, et de la distance au-dessus.',
        en: 'The yellow background hugs the text; the green one has padding, and distance above.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Fais respirer ces deux cartes. Sur <code>.carte</code> :</p><ul><li><code>padding-top</code> et <code>padding-left</code> de <code>24px</code> ;</li><li><code>margin-top</code> de <code>32px</code>.</li></ul>',
        en: '<p>Let these two cards breathe. On <code>.carte</code>:</p><ul><li><code>padding-top</code> and <code>padding-left</code> of <code>24px</code>;</li><li><code>margin-top</code> of <code>32px</code>.</li></ul>',
      },
      depart: {
        html: '<div class="carte">\n  <h3>Minecraft</h3>\n  <p>Construire, creuser, survivre.</p>\n</div>\n<div class="carte">\n  <h3>Mario Kart</h3>\n  <p>Des carapaces et des virages.</p>\n</div>',
        css: '.carte {\n  background-color: #1c2440;\n  color: #e8ecff;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.carte', propriete: 'padding-top', attendu: '24px' },
        { type: 'style', selecteur: '.carte', propriete: 'padding-left', attendu: '24px' },
        { type: 'style', selecteur: '.carte', propriete: 'margin-top', attendu: '32px' },
      ],
      indices: [
        {
          fr: 'Tout se passe dans la règle <code>.carte</code> qui existe déjà : ajoute-lui des lignes.',
          en: 'Everything happens in the existing <code>.carte</code> rule: just add lines to it.',
        },
        {
          fr: '<code>padding: 24px;</code> d’un coup règle aussi le haut et la gauche — c’est accepté.',
          en: '<code>padding: 24px;</code> in one go also sets top and left — that is accepted.',
        },
        {
          fr: 'La marge extérieure du haut s’écrit <code>margin-top: 32px;</code>.',
          en: 'The outer top margin is written <code>margin-top: 32px;</code>.',
        },
      ],
      solution: {
        html: '<div class="carte">\n  <h3>Minecraft</h3>\n  <p>Construire, creuser, survivre.</p>\n</div>\n<div class="carte">\n  <h3>Mario Kart</h3>\n  <p>Des carapaces et des virages.</p>\n</div>',
        css: '.carte {\n  background-color: #1c2440;\n  color: #e8ecff;\n  padding: 24px;\n  margin-top: 32px;\n}',
      },
    },
  },

  'css-2-3': {
    langage: 'css',
    xp: 25,
    objectif: {
      fr: 'Encadrer une boîte et lui arrondir les coins.',
      en: 'Frame a box and round off its corners.',
    },
    explication: {
      fr: `
        <p>Une bordure se décrit en trois informations, dans le même ordre :</p>
        <pre>border: 3px solid #00e5ff;</pre>
        <p><strong>épaisseur</strong>, <strong>style</strong>, <strong>couleur</strong>. Les
        styles utiles : <code>solid</code> (trait plein), <code>dashed</code> (tirets),
        <code>dotted</code> (pointillés).</p>
        <p>Et pour adoucir les angles :</p>
        <pre>border-radius: 16px;</pre>
        <p>Plus le nombre est grand, plus c’est rond. Avec <code>border-radius: 50%</code> sur
        une boîte carrée, tu obtiens un <strong>cercle parfait</strong> — c’est comme ça que sont
        faites toutes les photos de profil rondes que tu vois.</p>
        <p><strong>Un détail qui compte :</strong> des coins arrondis rendent une interface plus
        douce et plus moderne ; des coins vifs font plus sérieux, plus technique. Ce n’est pas un
        hasard si les applications pour ados arrondissent tout.</p>
      `,
      en: `
        <p>A border is described by three pieces of information, always in the same order:</p>
        <pre>border: 3px solid #00e5ff;</pre>
        <p><strong>thickness</strong>, <strong>style</strong>, <strong>colour</strong>. The useful
        styles: <code>solid</code>, <code>dashed</code>, <code>dotted</code>.</p>
        <p>And to soften the angles:</p>
        <pre>border-radius: 16px;</pre>
        <p>The bigger the number, the rounder it gets. With <code>border-radius: 50%</code> on a
        square box you get a <strong>perfect circle</strong> — that is how every round profile
        picture you see is made.</p>
        <p><strong>A detail that matters:</strong> rounded corners make an interface feel softer
        and more modern; sharp corners feel more serious, more technical. It is no accident that
        apps aimed at teenagers round everything.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="cadre">Encadré</div>\n<div class="pastille"></div>',
        css: '.cadre {\n  border: 3px solid #00e5ff;\n  border-radius: 16px;\n  padding: 16px;\n}\n\n.pastille {\n  width: 80px;\n  height: 80px;\n  margin-top: 16px;\n  background-color: #ff3d8b;\n  border-radius: 50%;\n}',
      },
      note: {
        fr: 'Une boîte carrée + <code>border-radius: 50%</code> = un cercle.',
        en: 'A square box + <code>border-radius: 50%</code> = a circle.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Transforme ce bloc en badge. Sur <code>.badge</code> :</p><ul><li>une bordure de <code>3px</code>, <code>solid</code>, de couleur <code>#ffd93d</code> ;</li><li>des coins arrondis de <code>20px</code>.</li></ul>',
        en: '<p>Turn this block into a badge. On <code>.badge</code>:</p><ul><li>a <code>3px</code> <code>solid</code> border in <code>#ffd93d</code>;</li><li>corners rounded by <code>20px</code>.</li></ul>',
      },
      depart: {
        html: '<div class="badge">\n  <h3>Chasseur de bugs</h3>\n  <p>Débloqué le 14 juin</p>\n</div>',
        css: '.badge {\n  padding: 20px;\n  background-color: #141a2e;\n  color: #e8ecff;\n  text-align: center;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.badge', propriete: 'border-width', attendu: '3px' },
        { type: 'style', selecteur: '.badge', propriete: 'border-style', attendu: 'solid' },
        { type: 'style', selecteur: '.badge', propriete: 'border-color', attendu: 'rgb(255, 217, 61)' },
        { type: 'style', selecteur: '.badge', propriete: 'border-radius', attendu: '20px' },
      ],
      indices: [
        {
          fr: 'Une seule ligne suffit pour la bordure : <code>border: 3px solid #ffd93d;</code>',
          en: 'One line is enough for the border: <code>border: 3px solid #ffd93d;</code>',
        },
        {
          fr: 'L’ordre compte : épaisseur, puis style, puis couleur.',
          en: 'The order matters: thickness, then style, then colour.',
        },
        {
          fr: 'Les coins se règlent à part : <code>border-radius: 20px;</code>',
          en: 'The corners are set separately: <code>border-radius: 20px;</code>',
        },
      ],
      solution: {
        html: '<div class="badge">\n  <h3>Chasseur de bugs</h3>\n  <p>Débloqué le 14 juin</p>\n</div>',
        css: '.badge {\n  padding: 20px;\n  background-color: #141a2e;\n  color: #e8ecff;\n  text-align: center;\n  border: 3px solid #ffd93d;\n  border-radius: 20px;\n}',
      },
    },
  },

  'css-2-4': {
    langage: 'css',
    xp: 30,
    objectif: {
      fr: 'Donner du relief avec une ombre portée et un dégradé.',
      en: 'Add depth with a drop shadow and a gradient.',
    },
    explication: {
      fr: `
        <p>Deux effets transforment une boîte plate en objet qui a l’air d’exister.</p>
        <p><strong>L’ombre portée</strong> décale une tache sombre derrière la boîte :</p>
        <pre>box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);</pre>
        <p>Décalage horizontal, décalage vertical, flou, couleur. <code>rgba</code>, c’est du RVB
        avec une quatrième valeur : la transparence, de <code>0</code> (invisible) à
        <code>1</code> (opaque). Une ombre doit toujours être transparente, jamais noire pleine.</p>
        <p><strong>Le dégradé</strong> remplace une couleur unie par un passage progressif :</p>
        <pre>background-image: linear-gradient(135deg, #b14bff, #00e5ff);</pre>
        <p>Un angle, puis les couleurs traversées. <code>135deg</code> va du coin haut-gauche au
        coin bas-droit.</p>
        <p><strong>La règle qui sépare le joli du criard :</strong> ombre légère, dégradé entre
        deux couleurs proches. Un débutant met une ombre noire de 40 px et un dégradé rouge-vert.
        La retenue, ici, est tout le métier.</p>
      `,
      en: `
        <p>Two effects turn a flat box into something that looks like an object.</p>
        <p><strong>The drop shadow</strong> offsets a dark patch behind the box:</p>
        <pre>box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);</pre>
        <p>Horizontal offset, vertical offset, blur, colour. <code>rgba</code> is RGB with a
        fourth value: transparency, from <code>0</code> (invisible) to <code>1</code> (opaque).
        A shadow should always be transparent, never solid black.</p>
        <p><strong>The gradient</strong> replaces a flat colour with a smooth transition:</p>
        <pre>background-image: linear-gradient(135deg, #b14bff, #00e5ff);</pre>
        <p>An angle, then the colours passed through. <code>135deg</code> runs from the top-left
        corner to the bottom-right one.</p>
        <p><strong>The rule that separates tasteful from garish:</strong> light shadow, gradient
        between two nearby colours. A beginner uses a 40px black shadow and a red-to-green
        gradient. Restraint, here, is the whole craft.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="carte">Une carte qui décolle</div>',
        css: '.carte {\n  padding: 32px;\n  border-radius: 18px;\n  color: white;\n  font-weight: 700;\n  background-image: linear-gradient(135deg, #b14bff, #00e5ff);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}',
      },
      note: {
        fr: 'Change l’angle : 90deg descend, 0deg va vers la droite.',
        en: 'Change the angle: 90deg goes down, 0deg goes to the right.',
      },
    },
    defi: {
      consigne: {
        fr: '<p><strong>Reproduis l’objectif affiché en haut de l’aperçu.</strong></p><p>Sur <code>.tuile</code>, ajoute :</p><ul><li>un dégradé <code>linear-gradient(135deg, #ff3d8b, #b14bff)</code> ;</li><li>une ombre <code>0 8px 24px rgba(0, 0, 0, 0.45)</code> ;</li><li>des coins arrondis de <code>18px</code>.</li></ul>',
        en: '<p><strong>Reproduce the goal shown at the top of the preview.</strong></p><p>On <code>.tuile</code>, add:</p><ul><li>a <code>linear-gradient(135deg, #ff3d8b, #b14bff)</code> gradient;</li><li>a <code>0 8px 24px rgba(0, 0, 0, 0.45)</code> shadow;</li><li>corners rounded by <code>18px</code>.</li></ul>',
      },
      objectif: {
        html: '<div class="tuile">\n  <h3>Niveau 7</h3>\n  <p>1 240 points</p>\n</div>',
        css: 'body { background: #0b0e1a; margin: 0; padding: 24px; }\n.tuile {\n  padding: 28px;\n  color: white;\n  text-align: center;\n  background-image: linear-gradient(135deg, #ff3d8b, #b14bff);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);\n  border-radius: 18px;\n}\n.tuile h3 { margin: 0 0 8px; }\n.tuile p { margin: 0; }',
      },
      depart: {
        html: '<div class="tuile">\n  <h3>Niveau 7</h3>\n  <p>1 240 points</p>\n</div>',
        css: 'body {\n  background: #0b0e1a;\n  margin: 0;\n  padding: 24px;\n}\n\n.tuile {\n  padding: 28px;\n  color: white;\n  text-align: center;\n}\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: 'linear-gradient\\s*\\(\\s*135deg',
          message: {
            fr: 'Il manque le dégradé : <code>background-image: linear-gradient(135deg, …);</code>',
            en: 'The gradient is missing: <code>background-image: linear-gradient(135deg, …);</code>',
          },
        },
        {
          type: 'codeContient',
          motif: 'box-shadow',
          message: {
            fr: 'Il manque l’ombre portée : <code>box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);</code>',
            en: 'The drop shadow is missing: <code>box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);</code>',
          },
        },
        { type: 'style', selecteur: '.tuile', propriete: 'border-radius', attendu: '18px' },
      ],
      indices: [
        {
          fr: 'Tout se passe dans la règle <code>.tuile</code> : trois lignes à ajouter.',
          en: 'Everything happens in the <code>.tuile</code> rule: three lines to add.',
        },
        {
          fr: 'Le dégradé n’est pas une couleur : il se met dans <code>background-image</code>.',
          en: 'A gradient is not a colour: it goes in <code>background-image</code>.',
        },
        {
          fr: 'Recopie les valeurs de la consigne telles quelles, virgules et espaces compris.',
          en: 'Copy the values from the brief exactly, commas and spaces included.',
        },
      ],
      solution: {
        html: '<div class="tuile">\n  <h3>Niveau 7</h3>\n  <p>1 240 points</p>\n</div>',
        css: 'body {\n  background: #0b0e1a;\n  margin: 0;\n  padding: 24px;\n}\n\n.tuile {\n  padding: 28px;\n  color: white;\n  text-align: center;\n  background-image: linear-gradient(135deg, #ff3d8b, #b14bff);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);\n  border-radius: 18px;\n}',
      },
    },
  },

  /* ===================================================== Module 3 ========= */

  'css-3-1': {
    langage: 'css',
    xp: 30,
    objectif: {
      fr: 'Aligner des éléments en ligne ou en colonne avec Flexbox.',
      en: 'Line elements up in a row or a column with Flexbox.',
    },
    explication: {
      fr: `
        <p>Par défaut, les blocs s’empilent : chacun sur sa ligne, du haut vers le bas. Pendant
        vingt ans, mettre trois choses côte à côte a été un cauchemar en CSS.</p>
        <p>Puis <strong>Flexbox</strong> est arrivé, et ça tient en une ligne :</p>
        <pre>.rangee {
  display: flex;
}</pre>
        <p>Cette règle se pose sur le <strong>parent</strong>, jamais sur les enfants. C’est le
        point que tout le monde rate au début : tu ne dis pas « toi, mets-toi à côté de lui », tu
        dis « toi le conteneur, range tes enfants ».</p>
        <p>Une fois en flex, tu choisis le sens :</p>
        <ul>
          <li><code>flex-direction: row;</code> — en ligne, de gauche à droite (par défaut) ;</li>
          <li><code>flex-direction: column;</code> — en colonne, de haut en bas.</li>
        </ul>
        <p><strong>Le réflexe à prendre :</strong> quand une mise en page ne fait pas ce que tu
        veux, demande-toi d’abord <em>qui est le conteneur</em>. La réponse est presque toujours
        là.</p>
      `,
      en: `
        <p>By default, blocks stack: each on its own line, top to bottom. For twenty years,
        putting three things side by side was a nightmare in CSS.</p>
        <p>Then <strong>Flexbox</strong> arrived, and it fits on one line:</p>
        <pre>.rangee {
  display: flex;
}</pre>
        <p>This rule goes on the <strong>parent</strong>, never on the children. That is the point
        everybody misses at first: you do not say "you, stand next to him", you say "you, the
        container, arrange your children".</p>
        <p>Once in flex mode, you choose the direction:</p>
        <ul>
          <li><code>flex-direction: row;</code> — in a row, left to right (the default);</li>
          <li><code>flex-direction: column;</code> — in a column, top to bottom.</li>
        </ul>
        <p><strong>The reflex to build:</strong> when a layout will not do what you want, ask
        yourself first <em>who the container is</em>. The answer is almost always there.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="rangee">\n  <div class="case">1</div>\n  <div class="case">2</div>\n  <div class="case">3</div>\n</div>',
        css: '.rangee {\n  display: flex;\n}\n\n.case {\n  padding: 20px;\n  background-color: #00e5ff;\n  margin-right: 8px;\n}',
      },
      note: {
        fr: 'Enlève <code>display: flex</code> : les trois cases se remettent l’une sous l’autre.',
        en: 'Remove <code>display: flex</code>: the three boxes stack again.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Ce menu doit descendre <strong>en colonne</strong>, comme une barre latérale.</p><p>Sur <code>.menu</code>, mets <code>display: flex</code> et <code>flex-direction: column</code>.</p>',
        en: '<p>This menu should run <strong>down a column</strong>, like a sidebar.</p><p>On <code>.menu</code>, set <code>display: flex</code> and <code>flex-direction: column</code>.</p>',
      },
      depart: {
        html: '<div class="menu">\n  <span class="lien">Accueil</span>\n  <span class="lien">Mes jeux</span>\n  <span class="lien">Contact</span>\n</div>',
        css: '.menu {\n  background-color: #141a2e;\n  padding: 16px;\n}\n\n.lien {\n  color: #00e5ff;\n  padding: 10px;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.menu', propriete: 'display', attendu: 'flex' },
        { type: 'style', selecteur: '.menu', propriete: 'flex-direction', attendu: 'column' },
      ],
      indices: [
        {
          fr: 'La règle se met sur <code>.menu</code>, le conteneur — pas sur <code>.lien</code>.',
          en: 'The rule goes on <code>.menu</code>, the container — not on <code>.lien</code>.',
        },
        {
          fr: 'Deux lignes à ajouter dans la règle <code>.menu</code> qui existe déjà.',
          en: 'Two lines to add inside the existing <code>.menu</code> rule.',
        },
        {
          fr: '<code>display: flex;</code> puis <code>flex-direction: column;</code>',
          en: '<code>display: flex;</code> then <code>flex-direction: column;</code>',
        },
      ],
      solution: {
        html: '<div class="menu">\n  <span class="lien">Accueil</span>\n  <span class="lien">Mes jeux</span>\n  <span class="lien">Contact</span>\n</div>',
        css: '.menu {\n  background-color: #141a2e;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n}\n\n.lien {\n  color: #00e5ff;\n  padding: 10px;\n}',
      },
    },
  },

  'css-3-2': {
    langage: 'css',
    xp: 30,
    objectif: {
      fr: 'Centrer un élément horizontalement et verticalement, pour de bon.',
      en: 'Centre an element horizontally and vertically, for good.',
    },
    explication: {
      fr: `
        <p>« Centrer un truc en CSS » a été la blague préférée des développeurs pendant des
        années. Avec Flexbox, ça tient en trois lignes — et ça marche toujours.</p>
        <pre>.scene {
  display: flex;
  justify-content: center;
  align-items: center;
}</pre>
        <p>Les deux propriétés font des choses différentes :</p>
        <ul>
          <li><code>justify-content</code> place les enfants <strong>dans le sens de la
          direction</strong> — horizontalement quand on est en <code>row</code> ;</li>
          <li><code>align-items</code> les place <strong>dans l’autre sens</strong> —
          verticalement quand on est en <code>row</code>.</li>
        </ul>
        <p>Attention : centrer verticalement n’a de sens que si le conteneur a une
        <strong>hauteur</strong>. Sans hauteur, il fait exactement la taille de son contenu, et
        il n’y a rien à centrer.</p>
        <p><strong>Le moyen de ne plus jamais confondre :</strong> <code>justify</code> suit la
        flèche de <code>flex-direction</code>, <code>align</code> lui est perpendiculaire. Si tu
        passes en <code>column</code>, les deux échangent leurs rôles.</p>
      `,
      en: `
        <p>"Centring a thing in CSS" was developers’ favourite joke for years. With Flexbox it
        takes three lines — and it always works.</p>
        <pre>.scene {
  display: flex;
  justify-content: center;
  align-items: center;
}</pre>
        <p>The two properties do different things:</p>
        <ul>
          <li><code>justify-content</code> places children <strong>along the direction</strong> —
          horizontally when you are in <code>row</code>;</li>
          <li><code>align-items</code> places them <strong>across it</strong> — vertically when
          you are in <code>row</code>.</li>
        </ul>
        <p>Careful: centring vertically only means something if the container has a
        <strong>height</strong>. Without one it is exactly as tall as its content, and there is
        nothing to centre.</p>
        <p><strong>How never to mix them up again:</strong> <code>justify</code> follows the
        <code>flex-direction</code> arrow, <code>align</code> is perpendicular to it. Switch to
        <code>column</code> and the two swap roles.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="scene">\n  <div class="jeton">GO</div>\n</div>',
        css: '.scene {\n  height: 200px;\n  background-color: #141a2e;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.jeton {\n  padding: 20px 32px;\n  background-color: #3dffa8;\n  border-radius: 999px;\n  font-weight: 700;\n}',
      },
      note: {
        fr: 'Enlève <code>align-items</code> : le jeton remonte en haut. Enlève la hauteur : plus rien à centrer.',
        en: 'Remove <code>align-items</code>: the token jumps to the top. Remove the height: nothing left to centre.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le bouton doit se retrouver <strong>pile au milieu</strong> de la scène, horizontalement et verticalement.</p><p>La hauteur est déjà donnée. À toi les trois lignes de Flexbox sur <code>.scene</code>.</p>',
        en: '<p>The button must land <strong>right in the middle</strong> of the stage, horizontally and vertically.</p><p>The height is already set. The three Flexbox lines on <code>.scene</code> are yours.</p>',
      },
      depart: {
        html: '<div class="scene">\n  <div class="bouton">Jouer</div>\n</div>',
        css: '.scene {\n  height: 240px;\n  background-color: #0b0e1a;\n}\n\n.bouton {\n  padding: 16px 32px;\n  background-color: #ff3d8b;\n  color: white;\n  border-radius: 12px;\n  font-weight: 700;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.scene', propriete: 'display', attendu: 'flex' },
        { type: 'style', selecteur: '.scene', propriete: 'justify-content', attendu: 'center' },
        { type: 'style', selecteur: '.scene', propriete: 'align-items', attendu: 'center' },
      ],
      indices: [
        {
          fr: 'Rien à changer sur <code>.bouton</code> : tout se joue sur le conteneur <code>.scene</code>.',
          en: 'Nothing to change on <code>.bouton</code>: it all happens on the <code>.scene</code> container.',
        },
        {
          fr: 'Sans <code>display: flex;</code>, les deux autres propriétés ne servent à rien.',
          en: 'Without <code>display: flex;</code>, the other two properties do nothing.',
        },
        {
          fr: 'Horizontalement : <code>justify-content: center;</code>. Verticalement : <code>align-items: center;</code>',
          en: 'Horizontally: <code>justify-content: center;</code>. Vertically: <code>align-items: center;</code>',
        },
      ],
      solution: {
        html: '<div class="scene">\n  <div class="bouton">Jouer</div>\n</div>',
        css: '.scene {\n  height: 240px;\n  background-color: #0b0e1a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.bouton {\n  padding: 16px 32px;\n  background-color: #ff3d8b;\n  color: white;\n  border-radius: 12px;\n  font-weight: 700;\n}',
      },
    },
  },

  'css-3-3': {
    langage: 'css',
    xp: 30,
    objectif: {
      fr: 'Répartir l’espace entre plusieurs éléments et les espacer proprement.',
      en: 'Distribute space between several elements and space them cleanly.',
    },
    explication: {
      fr: `
        <p><code>justify-content</code> ne sait pas que centrer. Il sait répartir :</p>
        <ul>
          <li><code>flex-start</code> — tout collé au début ;</li>
          <li><code>center</code> — tout groupé au milieu ;</li>
          <li><code>flex-end</code> — tout collé à la fin ;</li>
          <li><code>space-between</code> — le premier tout à gauche, le dernier tout à droite,
          le reste réparti au milieu ;</li>
          <li><code>space-around</code> — de l’espace autour de chacun.</li>
        </ul>
        <p><code>space-between</code> est <strong>la</strong> valeur des barres de navigation :
        le logo à gauche, le menu à droite, sans un seul calcul.</p>
        <p>Et pour l’espace entre les éléments, une seule propriété :</p>
        <pre>gap: 16px;</pre>
        <p><strong>Oublie <code>margin</code> pour ça.</strong> Avant <code>gap</code>, il fallait
        mettre une marge à droite de chaque élément… sauf le dernier, ce qui donnait des règles
        alambiquées. <code>gap</code> met l’espace <em>entre</em>, et jamais sur les bords. C’est
        plus simple et plus juste.</p>
      `,
      en: `
        <p><code>justify-content</code> does more than centre. It distributes:</p>
        <ul>
          <li><code>flex-start</code> — all packed at the start;</li>
          <li><code>center</code> — all grouped in the middle;</li>
          <li><code>flex-end</code> — all packed at the end;</li>
          <li><code>space-between</code> — first hard left, last hard right, the rest spread
          in between;</li>
          <li><code>space-around</code> — space around each one.</li>
        </ul>
        <p><code>space-between</code> is <strong>the</strong> value for navigation bars: logo on
        the left, menu on the right, without a single calculation.</p>
        <p>And for the space between items, one single property:</p>
        <pre>gap: 16px;</pre>
        <p><strong>Forget <code>margin</code> for this.</strong> Before <code>gap</code>, you had
        to put a right margin on every item… except the last, which led to convoluted rules.
        <code>gap</code> puts space <em>between</em>, never on the edges. Simpler, and more
        correct.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="barre">\n  <span>Logo</span>\n  <span>Menu</span>\n</div>\n<div class="groupe">\n  <span class="puce">A</span>\n  <span class="puce">B</span>\n  <span class="puce">C</span>\n</div>',
        css: '.barre {\n  display: flex;\n  justify-content: space-between;\n  background-color: #141a2e;\n  color: white;\n  padding: 12px;\n}\n\n.groupe {\n  display: flex;\n  gap: 16px;\n  margin-top: 16px;\n}\n\n.puce {\n  padding: 12px;\n  background-color: #ffd93d;\n}',
      },
      note: {
        fr: 'Le premier écarte ses deux enfants aux extrémités ; le second les espace régulièrement.',
        en: 'The first pushes its two children to the edges; the second spaces them evenly.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Ce tableau de score doit s’étaler sur toute la largeur : le nom à gauche, les points à droite.</p><p>Sur <code>.ligne</code> : <code>display: flex</code>, <code>justify-content: space-between</code>.</p><p>Sur <code>.tableau</code> : un <code>gap</code> de <code>12px</code> entre les lignes.</p>',
        en: '<p>This scoreboard should span the full width: name on the left, points on the right.</p><p>On <code>.ligne</code>: <code>display: flex</code>, <code>justify-content: space-between</code>.</p><p>On <code>.tableau</code>: a <code>12px</code> <code>gap</code> between rows.</p>',
      },
      depart: {
        html: '<div class="tableau">\n  <div class="ligne"><span>Théo</span><span>1 240</span></div>\n  <div class="ligne"><span>Lina</span><span>980</span></div>\n  <div class="ligne"><span>Sam</span><span>760</span></div>\n</div>',
        css: '.tableau {\n  display: flex;\n  flex-direction: column;\n}\n\n.ligne {\n  background-color: #1c2440;\n  color: #e8ecff;\n  padding: 14px 18px;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.ligne', propriete: 'display', attendu: 'flex' },
        { type: 'style', selecteur: '.ligne', propriete: 'justify-content', attendu: 'space-between' },
        { type: 'style', selecteur: '.tableau', propriete: 'row-gap', attendu: '12px' },
      ],
      indices: [
        {
          fr: 'Chaque <code>.ligne</code> devient elle-même un conteneur flex : elle a deux enfants à écarter.',
          en: 'Each <code>.ligne</code> becomes a flex container itself: it has two children to push apart.',
        },
        {
          fr: '<code>space-between</code> colle le premier enfant à gauche et le dernier à droite.',
          en: '<code>space-between</code> pins the first child left and the last one right.',
        },
        {
          fr: 'Le <code>gap</code> se met sur <code>.tableau</code>, qui est déjà en colonne : <code>gap: 12px;</code>',
          en: 'The <code>gap</code> goes on <code>.tableau</code>, already a column: <code>gap: 12px;</code>',
        },
      ],
      solution: {
        html: '<div class="tableau">\n  <div class="ligne"><span>Théo</span><span>1 240</span></div>\n  <div class="ligne"><span>Lina</span><span>980</span></div>\n  <div class="ligne"><span>Sam</span><span>760</span></div>\n</div>',
        css: '.tableau {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.ligne {\n  background-color: #1c2440;\n  color: #e8ecff;\n  padding: 14px 18px;\n  display: flex;\n  justify-content: space-between;\n}',
      },
    },
  },

  'css-3-4': {
    langage: 'css',
    xp: 40,
    objectif: {
      fr: 'Construire une vraie barre de navigation, comme sur tous les sites.',
      en: 'Build a real navigation bar, like the ones on every site.',
    },
    explication: {
      fr: `
        <p>Tu as maintenant tout ce qu’il faut pour l’élément le plus universel du web : la
        <strong>barre de navigation</strong>. Elle est en haut de chaque site que tu connais, et
        elle est toujours bâtie de la même façon.</p>
        <p>La recette complète :</p>
        <pre>nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}</pre>
        <ul>
          <li><code>space-between</code> — le logo d’un côté, les liens de l’autre ;</li>
          <li><code>align-items: center</code> — tout aligné sur la même ligne médiane, même si
          le logo est plus gros que les liens ;</li>
          <li>un <code>gap</code> sur le groupe de liens pour les espacer.</li>
        </ul>
        <p>Cette structure — un conteneur flex, deux groupes aux extrémités — tu la reverras
        partout : barres d’outils, pieds de page, cartes, entêtes d’application.</p>
        <p><strong>Ce projet est enregistré dans ta galerie</strong> comme un vrai fichier
        <code>.html</code> que tu peux ouvrir dans ton navigateur, ou montrer.</p>
      `,
      en: `
        <p>You now have everything you need for the most universal element on the web: the
        <strong>navigation bar</strong>. It sits at the top of every site you know, and it is
        always built the same way.</p>
        <p>The full recipe:</p>
        <pre>nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}</pre>
        <ul>
          <li><code>space-between</code> — logo on one side, links on the other;</li>
          <li><code>align-items: center</code> — everything on the same midline, even when the
          logo is bigger than the links;</li>
          <li>a <code>gap</code> on the link group to space them out.</li>
        </ul>
        <p>This structure — a flex container, two groups at the ends — you will meet everywhere:
        toolbars, footers, cards, app headers.</p>
        <p><strong>This project is saved to your gallery</strong> as a real <code>.html</code>
        file you can open in your browser, or show to someone.</p>
      `,
    },
    exemple: {
      code: {
        html: '<nav>\n  <span class="logo">Studio</span>\n  <div class="liens">\n    <span>Accueil</span>\n    <span>Projets</span>\n  </div>\n</nav>',
        css: 'nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background-color: #141a2e;\n  color: #e8ecff;\n}\n\n.liens {\n  display: flex;\n  gap: 20px;\n}',
      },
      note: {
        fr: 'Deux conteneurs flex imbriqués : la barre, puis le groupe de liens.',
        en: 'Two nested flex containers: the bar, then the link group.',
      },
    },
    defi: {
      consigne: {
        fr: '<p><strong>Reproduis la barre affichée en objectif.</strong> Le HTML est prêt : un logo et quatre liens.</p><p>Sur <code>nav</code> : <code>display: flex</code>, <code>justify-content: space-between</code>, <code>align-items: center</code>, fond <code>#141a2e</code>.</p><p>Sur <code>.liens</code> : <code>display: flex</code> et un <code>gap</code> de <code>20px</code>.</p>',
        en: '<p><strong>Reproduce the bar shown as the goal.</strong> The HTML is ready: a logo and four links.</p><p>On <code>nav</code>: <code>display: flex</code>, <code>justify-content: space-between</code>, <code>align-items: center</code>, background <code>#141a2e</code>.</p><p>On <code>.liens</code>: <code>display: flex</code> and a <code>20px</code> <code>gap</code>.</p>',
      },
      objectif: {
        html: '<nav>\n  <span class="logo">THÉO</span>\n  <div class="liens">\n    <span>Accueil</span>\n    <span>Jeux</span>\n    <span>Photos</span>\n    <span>Contact</span>\n  </div>\n</nav>',
        css: 'body { margin: 0; background: #0b0e1a; }\nnav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background-color: #141a2e;\n}\n.logo {\n  color: #00e5ff;\n  font-weight: 700;\n  font-size: 22px;\n  letter-spacing: 2px;\n}\n.liens {\n  display: flex;\n  gap: 20px;\n}\n.liens span {\n  color: #a9b3d4;\n  font-size: 14px;\n}',
      },
      depart: {
        html: '<nav>\n  <span class="logo">THÉO</span>\n  <div class="liens">\n    <span>Accueil</span>\n    <span>Jeux</span>\n    <span>Photos</span>\n    <span>Contact</span>\n  </div>\n</nav>',
        css: 'body {\n  margin: 0;\n  background: #0b0e1a;\n}\n\n.logo {\n  color: #00e5ff;\n  font-weight: 700;\n  font-size: 22px;\n  letter-spacing: 2px;\n}\n\n.liens span {\n  color: #a9b3d4;\n  font-size: 14px;\n}\n',
      },
      verifications: [
        { type: 'dom', selecteur: 'nav .liens span', quoi: 'nombre', min: 4 },
        { type: 'style', selecteur: 'nav', propriete: 'display', attendu: 'flex' },
        { type: 'style', selecteur: 'nav', propriete: 'justify-content', attendu: 'space-between' },
        { type: 'style', selecteur: 'nav', propriete: 'align-items', attendu: 'center' },
        { type: 'style', selecteur: 'nav', propriete: 'background-color', attendu: 'rgb(20, 26, 46)' },
        { type: 'style', selecteur: '.liens', propriete: 'display', attendu: 'flex' },
        { type: 'style', selecteur: '.liens', propriete: 'column-gap', attendu: '20px' },
      ],
      indices: [
        {
          fr: 'Deux règles à écrire : une pour <code>nav</code>, une pour <code>.liens</code>.',
          en: 'Two rules to write: one for <code>nav</code>, one for <code>.liens</code>.',
        },
        {
          fr: 'Sans <code>display: flex</code> sur <code>.liens</code>, les quatre liens restent empilés.',
          en: 'Without <code>display: flex</code> on <code>.liens</code>, the four links stay stacked.',
        },
        {
          fr: '<code>nav { display: flex; justify-content: space-between; align-items: center; background-color: #141a2e; }</code>',
          en: '<code>nav { display: flex; justify-content: space-between; align-items: center; background-color: #141a2e; }</code>',
        },
      ],
      solution: {
        html: '<nav>\n  <span class="logo">THÉO</span>\n  <div class="liens">\n    <span>Accueil</span>\n    <span>Jeux</span>\n    <span>Photos</span>\n    <span>Contact</span>\n  </div>\n</nav>',
        css: 'body {\n  margin: 0;\n  background: #0b0e1a;\n}\n\nnav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background-color: #141a2e;\n}\n\n.logo {\n  color: #00e5ff;\n  font-weight: 700;\n  font-size: 22px;\n  letter-spacing: 2px;\n}\n\n.liens {\n  display: flex;\n  gap: 20px;\n}\n\n.liens span {\n  color: #a9b3d4;\n  font-size: 14px;\n}',
      },
    },
    projet: { titre: { fr: 'Ma barre de navigation', en: 'My navigation bar' } },
  },

  /* ===================================================== Module 4 ========= */

  'css-4-1': {
    langage: 'css',
    xp: 30,
    objectif: {
      fr: 'Faire réagir un élément quand la souris passe dessus.',
      en: 'Make an element react when the mouse moves over it.',
    },
    explication: {
      fr: `
        <p>Un site vivant répond à ce que fait la main. Le moyen le plus simple :
        <code>:hover</code>, qui veut dire « quand la souris est dessus ».</p>
        <pre>.bouton {
  background-color: #b14bff;
}

.bouton:hover {
  background-color: #ff3d8b;
}</pre>
        <p>Deux règles pour le même élément : l’une au repos, l’autre au survol. Le
        <code>:hover</code> se colle directement au sélecteur, <strong>sans espace</strong>.</p>
        <p>Ajoute aussi <code>cursor: pointer;</code> : le curseur devient une main, et l’élément
        <em>annonce</em> qu’il est cliquable. Sans ça, un bouton qui change de couleur reste
        ambigu.</p>
        <p><strong>À savoir :</strong> il n’y a pas de survol sur un téléphone — le doigt n’a pas
        de position de repos. Le <code>:hover</code> est donc un <strong>bonus</strong>, jamais
        le seul moyen de comprendre une page.</p>
      `,
      en: `
        <p>A living site responds to what the hand does. The simplest way: <code>:hover</code>,
        which means "while the mouse is over it".</p>
        <pre>.bouton {
  background-color: #b14bff;
}

.bouton:hover {
  background-color: #ff3d8b;
}</pre>
        <p>Two rules for the same element: one at rest, one on hover. The <code>:hover</code>
        attaches directly to the selector, <strong>with no space</strong>.</p>
        <p>Add <code>cursor: pointer;</code> too: the cursor becomes a hand, and the element
        <em>announces</em> that it is clickable. Without it, a button that changes colour stays
        ambiguous.</p>
        <p><strong>Worth knowing:</strong> there is no hover on a phone — a finger has no resting
        position. So <code>:hover</code> is a <strong>bonus</strong>, never the only way to
        understand a page.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="bouton">Passe la souris ici</div>',
        css: '.bouton {\n  display: inline-block;\n  padding: 16px 28px;\n  border-radius: 12px;\n  background-color: #b14bff;\n  color: white;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: #ff3d8b;\n}',
      },
      note: {
        fr: 'Survole le bouton dans l’aperçu : la couleur change tant que la souris est dessus.',
        en: 'Hover the button in the preview: the colour changes while the mouse is over it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Rends cette carte survolable :</p><ul><li>sur <code>.carte</code>, ajoute <code>cursor: pointer</code> ;</li><li>écris une règle <code>.carte:hover</code> qui change le <code>background-color</code> en <code>#1c2440</code>.</li></ul><p>Teste-la avec la souris dans l’aperçu.</p>',
        en: '<p>Make this card hoverable:</p><ul><li>on <code>.carte</code>, add <code>cursor: pointer</code>;</li><li>write a <code>.carte:hover</code> rule changing <code>background-color</code> to <code>#1c2440</code>.</li></ul><p>Try it with the mouse in the preview.</p>',
      },
      depart: {
        html: '<div class="carte">\n  <h3>Mon premier jeu</h3>\n  <p>Cliquer pour ouvrir</p>\n</div>',
        css: '.carte {\n  padding: 24px;\n  border-radius: 16px;\n  background-color: #141a2e;\n  color: #e8ecff;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.carte', propriete: 'cursor', attendu: 'pointer' },
        {
          type: 'codeContient',
          motif: '\\.carte\\s*:\\s*hover|\\.carte:hover',
          message: {
            fr: 'Il manque la règle de survol : <code>.carte:hover { … }</code>, sans espace avant les deux-points.',
            en: 'The hover rule is missing: <code>.carte:hover { … }</code>, with no space before the colon.',
          },
        },
        {
          type: 'codeContient',
          motif: '\\.carte:hover[^}]*background-color\\s*:\\s*#1c2440',
          message: {
            fr: 'Dans <code>.carte:hover</code>, il faut <code>background-color: #1c2440;</code>',
            en: 'Inside <code>.carte:hover</code> you need <code>background-color: #1c2440;</code>',
          },
        },
      ],
      indices: [
        {
          fr: 'Ajoute d’abord <code>cursor: pointer;</code> dans la règle <code>.carte</code>.',
          en: 'First add <code>cursor: pointer;</code> inside the <code>.carte</code> rule.',
        },
        {
          fr: 'Puis écris une <strong>deuxième</strong> règle complète, en dessous.',
          en: 'Then write a <strong>second</strong> complete rule, below.',
        },
        {
          fr: '<code>.carte:hover {\n  background-color: #1c2440;\n}</code>',
          en: '<code>.carte:hover {\n  background-color: #1c2440;\n}</code>',
        },
      ],
      solution: {
        html: '<div class="carte">\n  <h3>Mon premier jeu</h3>\n  <p>Cliquer pour ouvrir</p>\n</div>',
        css: '.carte {\n  padding: 24px;\n  border-radius: 16px;\n  background-color: #141a2e;\n  color: #e8ecff;\n  cursor: pointer;\n}\n\n.carte:hover {\n  background-color: #1c2440;\n}',
      },
    },
  },

  'css-4-2': {
    langage: 'css',
    xp: 30,
    objectif: {
      fr: 'Adoucir un changement de style avec une transition.',
      en: 'Soften a style change with a transition.',
    },
    explication: {
      fr: `
        <p>Ton survol marche, mais il <em>claque</em> : la couleur saute d’un coup. Une seule
        propriété change tout :</p>
        <pre>transition: background-color 0.3s;</pre>
        <p>Deux informations : <strong>quoi</strong> animer, et <strong>en combien de temps</strong>.
        Le navigateur fabrique lui-même toutes les images intermédiaires.</p>
        <p>Point crucial : la <code>transition</code> se met sur la règle <strong>au repos</strong>,
        pas dans le <code>:hover</code>. Sinon l’aller est fluide… et le retour brutal. C’est
        l’erreur numéro un.</p>
        <p>Les durées qui marchent : <code>0.2s</code> à <code>0.3s</code>. En dessous on ne voit
        rien, au-dessus ça donne l’impression d’un logiciel qui rame. Les applications que tu
        trouves « fluides » sont presque toutes réglées entre 150 et 300 millisecondes.</p>
        <p>Tu peux aussi écrire <code>transition: all 0.3s;</code> pour tout animer d’un coup —
        pratique, mais moins précis.</p>
      `,
      en: `
        <p>Your hover works, but it <em>snaps</em>: the colour jumps. One property changes
        everything:</p>
        <pre>transition: background-color 0.3s;</pre>
        <p>Two pieces of information: <strong>what</strong> to animate, and <strong>how
        long</strong> it takes. The browser makes all the in-between frames itself.</p>
        <p>Crucial point: the <code>transition</code> goes on the <strong>resting</strong> rule,
        not inside the <code>:hover</code>. Otherwise the way in is smooth… and the way back is
        abrupt. That is mistake number one.</p>
        <p>Durations that work: <code>0.2s</code> to <code>0.3s</code>. Below that you see
        nothing; above it, the software feels sluggish. The apps you find "smooth" are almost all
        tuned between 150 and 300 milliseconds.</p>
        <p>You can also write <code>transition: all 0.3s;</code> to animate everything at once —
        handy, but less precise.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="bouton sec">Sans transition</div>\n<div class="bouton doux">Avec transition</div>',
        css: '.bouton {\n  display: inline-block;\n  padding: 16px 24px;\n  margin-right: 8px;\n  border-radius: 12px;\n  background-color: #b14bff;\n  color: white;\n  cursor: pointer;\n}\n\n.doux {\n  transition: background-color 0.3s;\n}\n\n.bouton:hover {\n  background-color: #3dffa8;\n}',
      },
      note: {
        fr: 'Survole les deux : le second glisse d’une couleur à l’autre, le premier saute.',
        en: 'Hover both: the second glides between colours, the first jumps.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Le survol est déjà écrit, mais il est brutal.</p><p>Ajoute à <code>.bouton</code> — la règle <strong>au repos</strong> — une transition de <code>background-color</code> en <code>0.3s</code>.</p>',
        en: '<p>The hover is already written, but it is abrupt.</p><p>Add to <code>.bouton</code> — the <strong>resting</strong> rule — a <code>background-color</code> transition of <code>0.3s</code>.</p>',
      },
      depart: {
        html: '<div class="bouton">Commencer</div>',
        css: '.bouton {\n  display: inline-block;\n  padding: 16px 28px;\n  border-radius: 12px;\n  background-color: #00e5ff;\n  color: #0b0e1a;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: #3dffa8;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.bouton', propriete: 'transition-duration', attendu: '0.3s' },
        {
          type: 'style',
          selecteur: '.bouton',
          propriete: 'transition-property',
          attendu: ['background-color', 'all'],
        },
      ],
      indices: [
        {
          fr: 'Une seule ligne à ajouter, dans la première règle — pas dans celle du <code>:hover</code>.',
          en: 'One line to add, in the first rule — not in the <code>:hover</code> one.',
        },
        {
          fr: 'La forme est : <code>transition: quoi durée;</code>',
          en: 'The shape is: <code>transition: what duration;</code>',
        },
        {
          fr: '<code>transition: background-color 0.3s;</code>',
          en: '<code>transition: background-color 0.3s;</code>',
        },
      ],
      solution: {
        html: '<div class="bouton">Commencer</div>',
        css: '.bouton {\n  display: inline-block;\n  padding: 16px 28px;\n  border-radius: 12px;\n  background-color: #00e5ff;\n  color: #0b0e1a;\n  font-weight: 700;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.bouton:hover {\n  background-color: #3dffa8;\n}',
      },
    },
  },

  'css-4-3': {
    langage: 'css',
    xp: 35,
    objectif: {
      fr: 'Créer une animation qui tourne toute seule, en boucle.',
      en: 'Create an animation that runs by itself, on a loop.',
    },
    explication: {
      fr: `
        <p>Une transition attend un déclencheur. Une <strong>animation</strong>, elle, part toute
        seule et peut tourner sans fin.</p>
        <p>Deux temps. D’abord tu décris les étapes, avec un nom que tu choisis :</p>
        <pre>@keyframes flotte {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-16px); }
  100% { transform: translateY(0); }
}</pre>
        <p>Puis tu l’appliques :</p>
        <pre>.etoile {
  animation: flotte 2s infinite;
}</pre>
        <p>Le nom, la durée d’un tour, et le nombre de tours — <code>infinite</code> pour ne
        jamais s’arrêter.</p>
        <p><code>transform</code> est la propriété reine de l’animation :
        <code>translateY(-16px)</code> déplace vers le haut, <code>rotate(360deg)</code> fait
        tourner, <code>scale(1.2)</code> agrandit. Le navigateur la traite très efficacement,
        bien mieux que <code>margin</code> ou <code>top</code>.</p>
        <p><strong>La retenue, encore :</strong> une animation attire l’œil, donc <em>une</em> à
        la fois. Une page où tout bouge est une page qu’on ferme.</p>
      `,
      en: `
        <p>A transition waits for a trigger. An <strong>animation</strong> starts on its own and
        can loop forever.</p>
        <p>Two steps. First you describe the stages, with a name you choose:</p>
        <pre>@keyframes flotte {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-16px); }
  100% { transform: translateY(0); }
}</pre>
        <p>Then you apply it:</p>
        <pre>.etoile {
  animation: flotte 2s infinite;
}</pre>
        <p>The name, the length of one cycle, and how many cycles — <code>infinite</code> to
        never stop.</p>
        <p><code>transform</code> is the king of animation properties:
        <code>translateY(-16px)</code> moves up, <code>rotate(360deg)</code> spins,
        <code>scale(1.2)</code> grows. The browser handles it very efficiently, far better than
        <code>margin</code> or <code>top</code>.</p>
        <p><strong>Restraint, again:</strong> an animation draws the eye, so use <em>one</em> at
        a time. A page where everything moves is a page people close.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="pastille"></div>',
        css: '@keyframes pulse {\n  0%   { transform: scale(1); }\n  50%  { transform: scale(1.3); }\n  100% { transform: scale(1); }\n}\n\n.pastille {\n  width: 80px;\n  height: 80px;\n  margin: 40px;\n  border-radius: 50%;\n  background-color: #ff3d8b;\n  animation: pulse 1.5s infinite;\n}',
      },
      note: {
        fr: 'Change <code>1.5s</code> en <code>0.4s</code> : la pastille s’affole. C’est trop rapide, et ça se sent.',
        en: 'Change <code>1.5s</code> to <code>0.4s</code>: the dot panics. Too fast, and you can feel it.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Fais flotter la fusée. Écris :</p><ul><li>une animation nommée <code>flotte</code> qui monte de <code>-16px</code> à mi-parcours et revient ;</li><li>sur <code>.fusee</code> : <code>animation: flotte 2s infinite;</code></li></ul>',
        en: '<p>Make the rocket float. Write:</p><ul><li>an animation named <code>flotte</code> that rises by <code>-16px</code> halfway and comes back;</li><li>on <code>.fusee</code>: <code>animation: flotte 2s infinite;</code></li></ul>',
      },
      depart: {
        html: '<div class="ciel">\n  <div class="fusee">▲</div>\n</div>',
        css: '.ciel {\n  height: 220px;\n  background-color: #0b0e1a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.fusee {\n  font-size: 64px;\n  color: #00e5ff;\n}\n',
      },
      verifications: [
        {
          type: 'codeContient',
          motif: '@keyframes\\s+flotte',
          message: {
            fr: 'Il manque le bloc <code>@keyframes flotte { … }</code> qui décrit les étapes.',
            en: 'The <code>@keyframes flotte { … }</code> block describing the stages is missing.',
          },
        },
        { type: 'style', selecteur: '.fusee', propriete: 'animation-name', attendu: 'flotte' },
        { type: 'style', selecteur: '.fusee', propriete: 'animation-duration', attendu: '2s' },
        { type: 'style', selecteur: '.fusee', propriete: 'animation-iteration-count', attendu: 'infinite' },
      ],
      indices: [
        {
          fr: 'Le bloc <code>@keyframes</code> s’écrit en dehors de toute règle, tout en haut du CSS.',
          en: 'The <code>@keyframes</code> block sits outside any rule, at the top of the CSS.',
        },
        {
          fr: 'Trois étapes : <code>0%</code>, <code>50%</code>, <code>100%</code>, chacune avec un <code>transform</code>.',
          en: 'Three stages: <code>0%</code>, <code>50%</code>, <code>100%</code>, each with a <code>transform</code>.',
        },
        {
          fr: 'Puis, dans <code>.fusee</code>, une seule ligne : <code>animation: flotte 2s infinite;</code>',
          en: 'Then, in <code>.fusee</code>, one line: <code>animation: flotte 2s infinite;</code>',
        },
      ],
      solution: {
        html: '<div class="ciel">\n  <div class="fusee">▲</div>\n</div>',
        css: '@keyframes flotte {\n  0%   { transform: translateY(0); }\n  50%  { transform: translateY(-16px); }\n  100% { transform: translateY(0); }\n}\n\n.ciel {\n  height: 220px;\n  background-color: #0b0e1a;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.fusee {\n  font-size: 64px;\n  color: #00e5ff;\n  animation: flotte 2s infinite;\n}',
      },
    },
  },

  'css-4-4': {
    langage: 'css',
    xp: 35,
    objectif: {
      fr: 'Adapter une page au téléphone avec une requête média.',
      en: 'Adapt a page to phones with a media query.',
    },
    explication: {
      fr: `
        <p>Plus de la moitié du web se regarde sur un téléphone. Une mise en page en trois
        colonnes y devient illisible. Il faut donc pouvoir dire : <em>« en dessous de telle
        largeur, fais autrement »</em>.</p>
        <pre>@media (max-width: 480px) {
  .grille {
    flex-direction: column;
  }
}</pre>
        <p>Tout ce qui est à l’intérieur ne s’applique <strong>que</strong> si l’écran fait 480 px
        de large ou moins. Au-dessus, ces règles n’existent pas.</p>
        <p>Le changement le plus utile, et de loin : passer une rangée en colonne. Côte à côte sur
        un ordinateur, empilés sur un téléphone.</p>
        <p><strong>Pour le voir fonctionner ici :</strong> l’aperçu a deux boutons en haut à
        droite, <em>largeur ordinateur</em> et <em>largeur téléphone</em>. Écris ta règle, puis
        clique sur le téléphone : ta grille doit basculer en colonne. C’est exactement ce que
        font les développeurs toute la journée.</p>
      `,
      en: `
        <p>More than half of the web is read on a phone. A three-column layout becomes unreadable
        there. So you need a way to say: <em>"below this width, do it differently"</em>.</p>
        <pre>@media (max-width: 480px) {
  .grille {
    flex-direction: column;
  }
}</pre>
        <p>Everything inside applies <strong>only</strong> if the screen is 480px wide or less.
        Above that, these rules do not exist.</p>
        <p>The most useful change, by far: turning a row into a column. Side by side on a
        computer, stacked on a phone.</p>
        <p><strong>To see it work here:</strong> the preview has two buttons top right,
        <em>desktop width</em> and <em>phone width</em>. Write your rule, then click the phone:
        your grid should switch to a column. That is exactly what developers do all day.</p>
      `,
    },
    exemple: {
      code: {
        html: '<div class="grille">\n  <div class="bloc">A</div>\n  <div class="bloc">B</div>\n</div>',
        css: '.grille {\n  display: flex;\n  gap: 12px;\n}\n\n.bloc {\n  flex: 1;\n  padding: 30px;\n  background-color: #b14bff;\n  color: white;\n  text-align: center;\n}\n\n@media (max-width: 480px) {\n  .grille {\n    flex-direction: column;\n  }\n}',
      },
      note: {
        fr: 'Bascule l’aperçu en largeur téléphone : A et B s’empilent.',
        en: 'Switch the preview to phone width: A and B stack up.',
      },
    },
    defi: {
      consigne: {
        fr: '<p>Ces trois cartes sont côte à côte. Sur un téléphone, elles seraient minuscules.</p><p>Ajoute une requête média <code>@media (max-width: 480px)</code> qui passe <code>.grille</code> en <code>flex-direction: column</code>.</p><p>Puis clique sur le bouton <strong>largeur téléphone</strong>, en haut de l’aperçu, pour vérifier de tes yeux.</p>',
        en: '<p>These three cards sit side by side. On a phone they would be tiny.</p><p>Add a <code>@media (max-width: 480px)</code> query switching <code>.grille</code> to <code>flex-direction: column</code>.</p><p>Then click the <strong>phone width</strong> button at the top of the preview and see for yourself.</p>',
      },
      depart: {
        html: '<div class="grille">\n  <div class="carte">Python</div>\n  <div class="carte">HTML</div>\n  <div class="carte">CSS</div>\n</div>',
        css: 'body {\n  margin: 0;\n  padding: 16px;\n  background: #0b0e1a;\n}\n\n.grille {\n  display: flex;\n  gap: 12px;\n}\n\n.carte {\n  flex: 1;\n  padding: 28px 12px;\n  border-radius: 14px;\n  background-color: #1c2440;\n  color: #e8ecff;\n  text-align: center;\n}\n',
      },
      verifications: [
        { type: 'style', selecteur: '.grille', propriete: 'display', attendu: 'flex' },
        {
          type: 'codeContient',
          motif: '@media[^{]*max-width\\s*:\\s*480px',
          message: {
            fr: 'Il manque la requête média : <code>@media (max-width: 480px) { … }</code>',
            en: 'The media query is missing: <code>@media (max-width: 480px) { … }</code>',
          },
        },
        {
          type: 'codeContient',
          motif: '@media[\\s\\S]*flex-direction\\s*:\\s*column',
          message: {
            fr: 'À l’intérieur du <code>@media</code>, il faut <code>.grille { flex-direction: column; }</code>',
            en: 'Inside the <code>@media</code> you need <code>.grille { flex-direction: column; }</code>',
          },
        },
      ],
      indices: [
        {
          fr: 'La requête média s’écrit tout en bas du CSS, après les règles normales.',
          en: 'The media query goes at the very bottom of the CSS, after the normal rules.',
        },
        {
          fr: 'Elle contient une règle complète, avec son propre sélecteur — donc deux accolades imbriquées.',
          en: 'It contains a complete rule, with its own selector — so two nested sets of braces.',
        },
        {
          fr: '<code>@media (max-width: 480px) {\n  .grille { flex-direction: column; }\n}</code>',
          en: '<code>@media (max-width: 480px) {\n  .grille { flex-direction: column; }\n}</code>',
        },
      ],
      solution: {
        html: '<div class="grille">\n  <div class="carte">Python</div>\n  <div class="carte">HTML</div>\n  <div class="carte">CSS</div>\n</div>',
        css: 'body {\n  margin: 0;\n  padding: 16px;\n  background: #0b0e1a;\n}\n\n.grille {\n  display: flex;\n  gap: 12px;\n}\n\n.carte {\n  flex: 1;\n  padding: 28px 12px;\n  border-radius: 14px;\n  background-color: #1c2440;\n  color: #e8ecff;\n  text-align: center;\n}\n\n@media (max-width: 480px) {\n  .grille {\n    flex-direction: column;\n  }\n}',
      },
    },
  },
};
