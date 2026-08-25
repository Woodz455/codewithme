/**
 * Editeur de code (CodeMirror 5, embarque).
 *
 * CodeMirror 5 est charge en scripts classiques et non en modules : c'est ce
 * qui permet de l'embarquer tel quel, sans etape de compilation dans le projet.
 */

const RESSOURCES = [
  'app://vendor/codemirror/lib/codemirror.js',
  'app://vendor/codemirror/mode/python/python.js',
  'app://vendor/codemirror/mode/clike/clike.js',
  'app://vendor/codemirror/mode/xml/xml.js',
  'app://vendor/codemirror/mode/css/css.js',
  'app://vendor/codemirror/mode/javascript/javascript.js',
  'app://vendor/codemirror/mode/htmlmixed/htmlmixed.js',
  'app://vendor/codemirror/addon/edit/closebrackets.js',
  'app://vendor/codemirror/addon/edit/matchbrackets.js',
  'app://vendor/codemirror/addon/edit/closetag.js',
  'app://vendor/codemirror/addon/selection/active-line.js',
  'app://vendor/codemirror/addon/comment/comment.js',
  'app://vendor/codemirror/addon/display/placeholder.js',
];

const MODES = {
  python: 'python',
  cpp: 'text/x-c++src',
  html: 'htmlmixed',
  css: 'css',
  javascript: 'javascript',
};

let chargement = null;

/** Charge CodeMirror une seule fois, dans l'ordre (le coeur avant les modes). */
function chargerCodeMirror() {
  if (chargement) return chargement;

  chargement = (async () => {
    for (const url of RESSOURCES) {
      await new Promise((resoudre, rejeter) => {
        const balise = document.createElement('script');
        balise.src = url;
        balise.onload = resoudre;
        balise.onerror = () => rejeter(new Error(`Ressource introuvable : ${url}`));
        document.head.appendChild(balise);
      });
    }
    return window.CodeMirror;
  })();

  return chargement;
}

export class Editeur {
  /**
   * @param {HTMLElement} hote
   * @param {{langage:string, valeur?:string, lectureSeule?:boolean, surChangement?:Function}} options
   */
  constructor(hote, options = {}) {
    this.hote = hote;
    this.options = options;
    this.cm = null;
    this.pret = this.construire();
  }

  async construire() {
    const CodeMirror = await chargerCodeMirror();

    this.cm = CodeMirror(this.hote, {
      value: this.options.valeur ?? '',
      mode: MODES[this.options.langage] || 'text/plain',
      theme: 'cwm-neon',
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: this.options.langage === 'python' ? 4 : 2,
      tabSize: this.options.langage === 'python' ? 4 : 2,
      indentWithTabs: false,
      autoCloseBrackets: true,
      autoCloseTags: this.options.langage === 'html',
      matchBrackets: true,
      styleActiveLine: true,
      readOnly: this.options.lectureSeule ? 'nocursor' : false,
      placeholder: this.options.invite || '',
      extraKeys: {
        // Tab insere des espaces : un debutant ne doit pas se battre avec des
        // tabulations invisibles, surtout en Python ou l'indentation compte.
        Tab: (cm) => {
          if (cm.somethingSelected()) cm.indentSelection('add');
          else cm.replaceSelection(' '.repeat(cm.getOption('indentUnit')), 'end');
        },
        'Shift-Tab': (cm) => cm.indentSelection('subtract'),
        'Ctrl-/': 'toggleComment',
        'Cmd-/': 'toggleComment',
        'Ctrl-Enter': () => this.options.surExecution?.(),
        'Cmd-Enter': () => this.options.surExecution?.(),
      },
    });

    if (this.options.surChangement) {
      this.cm.on('change', () => this.options.surChangement(this.cm.getValue()));
    }

    // CodeMirror mesure mal sa taille quand il est cree dans un element encore
    // masque : on le force a se recalculer une fois affiche.
    requestAnimationFrame(() => this.cm.refresh());
    return this.cm;
  }

  async valeur() {
    await this.pret;
    return this.cm.getValue();
  }

  valeurImmediate() {
    return this.cm ? this.cm.getValue() : (this.options.valeur ?? '');
  }

  async definirValeur(code) {
    await this.pret;
    this.cm.setValue(code ?? '');
    this.cm.clearHistory();
  }

  async focus() {
    await this.pret;
    this.cm.focus();
  }

  async rafraichir() {
    await this.pret;
    this.cm.refresh();
  }

  /** Souligne une ligne fautive apres une erreur d'execution. */
  async marquerErreur(numeroLigne) {
    await this.pret;
    this.effacerMarques();
    if (!numeroLigne || numeroLigne < 1) return;
    const index = numeroLigne - 1;
    if (index >= this.cm.lineCount()) return;
    this.cm.addLineClass(index, 'background', 'cm-ligne-erreur');
    this.ligneMarquee = index;
  }

  effacerMarques() {
    if (this.cm && this.ligneMarquee !== undefined) {
      this.cm.removeLineClass(this.ligneMarquee, 'background', 'cm-ligne-erreur');
      this.ligneMarquee = undefined;
    }
  }

  detruire() {
    this.effacerMarques();
    this.cm = null;
    this.hote.replaceChildren();
  }
}

/** Extrait le numero de ligne d'un message d'erreur, pour le souligner. */
export function ligneDeLErreur(message) {
  const correspondance = String(message || '').match(/[Ll]igne (\d+)|line (\d+)/);
  if (!correspondance) return null;
  return Number(correspondance[1] || correspondance[2]) || null;
}
