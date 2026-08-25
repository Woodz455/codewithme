/**
 * Moteur web : execute le HTML, le CSS et le JavaScript de l'eleve.
 *
 * Le code tourne dans une iframe « bac a sable » servie par app://apercu/,
 * sans acces a l'origine de l'application. Consequence : l'atelier ne peut pas
 * lire ce DOM directement, il l'interroge par messages — c'est le prix de
 * l'isolation, et c'est le bon compromis.
 */

let compteurQuestions = 0;

export class MoteurWeb {
  /** @param {HTMLIFrameElement} iframe */
  constructor(iframe) {
    this.iframe = iframe;
    this.pret = false;
    this.attentePret = null;
    this.questionsEnCours = new Map();
    this.ecouteurs = {};

    this.iframe.setAttribute('sandbox', 'allow-scripts allow-modals allow-forms allow-pointer-lock');
    this.iframe.setAttribute('title', 'Aperçu');

    this.surMessage = (evenement) => {
      const message = evenement.data;
      if (!message || message.source !== 'cwm-apercu') return;
      if (evenement.source !== this.iframe.contentWindow) return;

      switch (message.type) {
        case 'pret':
          this.pret = true;
          this.attentePret?.();
          break;
        case 'console':
          this.emettre('console', { niveau: message.niveau, texte: message.texte });
          break;
        case 'erreur':
          this.emettre('erreur', message);
          break;
        case 'rendu-termine':
          this.emettre('rendu', null);
          break;
        case 'reponse': {
          const resolveur = this.questionsEnCours.get(message.id);
          if (resolveur) {
            this.questionsEnCours.delete(message.id);
            resolveur(message.resultats);
          }
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('message', this.surMessage);
  }

  sur(evenement, rappel) {
    (this.ecouteurs[evenement] ||= []).push(rappel);
    return this;
  }

  emettre(evenement, donnees) {
    for (const rappel of this.ecouteurs[evenement] || []) rappel(donnees);
  }

  /** Charge (ou recharge) la page d'apercu et attend qu'elle soit prete. */
  charger() {
    this.pret = false;
    return new Promise((resoudre) => {
      this.attentePret = resoudre;
      this.iframe.src = 'app://app/apercu/apercu.html';
    });
  }

  async attendrePret() {
    if (this.pret) return;
    if (!this.iframe.src) await this.charger();
    else await new Promise((resoudre) => (this.attentePret = resoudre));
  }

  envoyer(message) {
    this.iframe.contentWindow?.postMessage({ source: 'cwm-atelier', ...message }, '*');
  }

  /**
   * Affiche le resultat.
   * Rechargement complet quand il y a du JavaScript : c'est le seul moyen sur
   * de repartir d'une page neuve. Sans JS, une simple mise a jour suffit et
   * l'apercu se met a jour a la frappe, sans clignoter.
   */
  async rendre({ html = '', css = '', js = '' }) {
    if (js && js.trim()) await this.charger();
    else await this.attendrePret();
    this.envoyer({ type: 'rendre', html, css, js });
  }

  /**
   * Pose des questions sur le resultat affiche, pour la correction.
   * @param {Array<{selecteur:string, quoi:string, nom?:string}>} questions
   */
  interroger(questions) {
    const identifiant = ++compteurQuestions;
    return new Promise((resoudre) => {
      this.questionsEnCours.set(identifiant, resoudre);
      this.envoyer({ type: 'interroger', id: identifiant, questions });
      // Filet de securite : une iframe qui ne repond pas ne doit pas bloquer
      // la correction indefiniment.
      setTimeout(() => {
        if (this.questionsEnCours.has(identifiant)) {
          this.questionsEnCours.delete(identifiant);
          resoudre(questions.map(() => null));
        }
      }, 3000);
    });
  }

  activerInspecteur(actif) {
    this.envoyer({ type: 'inspecteur', actif });
  }

  detruire() {
    window.removeEventListener('message', this.surMessage);
    this.questionsEnCours.clear();
    this.ecouteurs = {};
  }
}

/**
 * Assemble un document HTML complet et autonome a partir des trois zones de
 * l'eleve. Utilise pour l'export d'un projet en vrai fichier .html.
 */
export function pageAutonome({ html = '', css = '', js = '', titre = 'Ma page' }) {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${titre.replace(/[<>&]/g, '')}</title>
    <style>
${css}
    </style>
  </head>
  <body>
${html}
${js ? `    <script>\n${js}\n    </script>` : ''}
  </body>
</html>
`;
}
