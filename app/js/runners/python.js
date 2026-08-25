/**
 * Moteur Python, cote interface.
 *
 * Pilote le worker qui contient CPython : demarrage paresseux (le premier
 * chargement prend quelques secondes, les suivants sont instantanes), envoi du
 * code, reception de la sortie et du dessin, gestion de input() et de l'arret.
 */

const TAILLE_ENTREE = 8192;

export class MoteurPython {
  constructor() {
    this.worker = null;
    this.pret = false;
    this.promessePret = null;
    this.enExecution = false;

    // Memoire partagee : permet a input() de bloquer le programme, et au
    // bouton Arreter d'interrompre une boucle infinie.
    this.memoireEntree = new SharedArrayBuffer(16 + TAILLE_ENTREE);
    this.controleEntree = new Int32Array(this.memoireEntree, 0, 2);
    this.donneesEntree = new Uint8Array(this.memoireEntree, 16);
    this.tamponInterruption = new Uint8Array(new SharedArrayBuffer(1));

    this.ecouteurs = {};
  }

  /** @param {'sortie'|'dessin'|'entree'|'termine'|'erreur'|'progression'} evenement */
  sur(evenement, rappel) {
    (this.ecouteurs[evenement] ||= []).push(rappel);
    return this;
  }

  emettre(evenement, donnees) {
    for (const rappel of this.ecouteurs[evenement] || []) rappel(donnees);
  }

  /** Demarre CPython. Appelable plusieurs fois sans risque. */
  demarrer() {
    if (this.promessePret) return this.promessePret;

    this.promessePret = new Promise((resoudre, rejeter) => {
      this.worker = new Worker('app://app/js/runners/python-worker.js', { type: 'module' });

      this.worker.onmessage = (evenement) => {
        const message = evenement.data;
        switch (message.type) {
          case 'pret':
            this.pret = true;
            resoudre();
            break;
          case 'sortie':
            this.emettre('sortie', message.lignes);
            break;
          case 'dessin':
            this.emettre('dessin', message.commandes);
            break;
          case 'entree':
            this.emettre('entree', message.invite);
            break;
          case 'termine':
            this.enExecution = false;
            this.emettre('termine', { arrete: message.arrete });
            break;
          case 'erreur':
            this.enExecution = false;
            this.emettre('erreur', message.message);
            break;
          default:
            break;
        }
      };

      this.worker.onerror = (erreur) => {
        this.enExecution = false;
        const message = erreur?.message || 'Le moteur Python a rencontre un probleme.';
        this.emettre('erreur', message);
        rejeter(new Error(message));
      };

      this.worker.postMessage({
        type: 'demarrer',
        memoireEntree: this.memoireEntree,
        tamponInterruption: this.tamponInterruption,
      });
    });

    return this.promessePret;
  }

  async executer(code) {
    await this.demarrer();
    this.tamponInterruption[0] = 0;
    this.enExecution = true;
    this.worker.postMessage({ type: 'executer', code });
  }

  /** Repond a un input() en attente. */
  repondre(texte) {
    const octets = new TextEncoder().encode(String(texte ?? '').slice(0, TAILLE_ENTREE - 1));
    this.donneesEntree.set(octets);
    Atomics.store(this.controleEntree, 1, octets.length);
    Atomics.store(this.controleEntree, 0, 1); // 1 = donnee prete
    Atomics.notify(this.controleEntree, 0);
  }

  /**
   * Interrompt le programme.
   * Deux cas : bloque sur input() (on debloque avec un signal d'arret), ou en
   * pleine boucle (le tampon d'interruption fait lever KeyboardInterrupt).
   */
  arreter() {
    if (!this.enExecution) return;
    this.tamponInterruption[0] = 2; // SIGINT
    Atomics.store(this.controleEntree, 0, 2); // 2 = arret demande
    Atomics.notify(this.controleEntree, 0);
  }

  /** Redemarre le moteur de zero : filet de securite si le worker se bloque. */
  async reinitialiser() {
    this.worker?.terminate();
    this.worker = null;
    this.pret = false;
    this.promessePret = null;
    this.enExecution = false;
    return this.demarrer();
  }

  detruire() {
    this.worker?.terminate();
    this.worker = null;
    this.ecouteurs = {};
  }
}

/** Un seul moteur pour toute l'application : CPython ne se charge qu'une fois. */
let moteurPartage = null;

export function moteurPython() {
  if (!moteurPartage) moteurPartage = new MoteurPython();
  return moteurPartage;
}
