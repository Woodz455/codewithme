/**
 * Rendu du dessin de la tortue sur un canevas.
 *
 * Le worker Python envoie des ordres de trace ; ce module les rejoue. Le trace
 * est **anime** : les traits apparaissent progressivement, a la vitesse
 * demandee par `speed()`. Voir son dessin se construire est ce qui accroche un
 * debutant — un resultat qui surgit d'un coup n'a pas le meme effet.
 */

export class ToileTortue {
  /** @param {HTMLCanvasElement} canevas */
  constructor(canevas) {
    this.canevas = canevas;
    this.contexte = canevas.getContext('2d');
    this.fileAttente = [];
    this.enCours = false;
    this.fond = '#ffffff';
    this.tortue = null;
    this.animation = null;
    this.echelle = 1;
    this.redimensionner();
  }

  /** Adapte la resolution du canevas a sa taille reelle et a l'ecran. */
  redimensionner() {
    const rectangle = this.canevas.getBoundingClientRect();
    const densite = window.devicePixelRatio || 1;
    const largeur = Math.max(1, Math.round(rectangle.width));
    const hauteur = Math.max(1, Math.round(rectangle.height));

    if (this.canevas.width === largeur * densite && this.canevas.height === hauteur * densite) return;

    this.canevas.width = largeur * densite;
    this.canevas.height = hauteur * densite;
    this.echelle = densite;
    this.redessiner();
  }

  /** Convertit les coordonnees turtle (centre, y vers le haut) en pixels. */
  versEcran(x, y) {
    return [this.canevas.width / 2 + x * this.echelle, this.canevas.height / 2 - y * this.echelle];
  }

  effacer() {
    this.fileAttente = [];
    this.traces = [];
    this.tortue = null;
    this.arreterAnimation();
    this.redessiner();
  }

  arreterAnimation() {
    if (this.animation) cancelAnimationFrame(this.animation);
    this.animation = null;
    this.enCours = false;
  }

  /** Repeint le fond et tous les traces deja joues. */
  redessiner() {
    const { contexte, canevas } = this;
    contexte.setTransform(1, 0, 0, 1, 0, 0);
    contexte.fillStyle = this.fond;
    contexte.fillRect(0, 0, canevas.width, canevas.height);

    for (const trace of this.traces || []) this.peindre(trace);
    this.peindreTortue();
  }

  /** Dessine un ordre unique, deja converti en coordonnees turtle. */
  peindre(commande) {
    const contexte = this.contexte;

    switch (commande.c) {
      case 'ligne': {
        const [x1, y1] = this.versEcran(commande.x1, commande.y1);
        const [x2, y2] = this.versEcran(commande.x2, commande.y2);
        contexte.beginPath();
        contexte.moveTo(x1, y1);
        contexte.lineTo(x2, y2);
        contexte.strokeStyle = commande.couleur || '#000';
        contexte.lineWidth = (commande.epaisseur || 1) * this.echelle;
        contexte.lineCap = 'round';
        contexte.stroke();
        break;
      }
      case 'point': {
        const [x, y] = this.versEcran(commande.x, commande.y);
        contexte.beginPath();
        contexte.arc(x, y, ((commande.taille || 4) / 2) * this.echelle, 0, Math.PI * 2);
        contexte.fillStyle = commande.couleur || '#000';
        contexte.fill();
        break;
      }
      case 'remplir': {
        if (!commande.points?.length) break;
        contexte.beginPath();
        commande.points.forEach(([x, y], index) => {
          const [px, py] = this.versEcran(x, y);
          if (index === 0) contexte.moveTo(px, py);
          else contexte.lineTo(px, py);
        });
        contexte.closePath();
        contexte.fillStyle = commande.couleur || '#000';
        contexte.fill();
        break;
      }
      case 'ecrire': {
        const [x, y] = this.versEcran(commande.x, commande.y);
        contexte.fillStyle = commande.couleur || '#000';
        contexte.font = `${(commande.taille || 12) * this.echelle}px Inter, sans-serif`;
        contexte.textAlign =
          commande.alignement === 'center' ? 'center' : commande.alignement === 'right' ? 'right' : 'left';
        contexte.fillText(commande.texte ?? '', x, y);
        break;
      }
      default:
        break;
    }
  }

  /** Le petit triangle qui montre ou se trouve la tortue et vers ou elle regarde. */
  peindreTortue() {
    if (!this.tortue || !this.tortue.visible) return;
    const { x, y, cap } = this.tortue;
    const [px, py] = this.versEcran(x, y);
    const radians = (-cap * Math.PI) / 180;
    const taille = 11 * this.echelle;
    const contexte = this.contexte;

    contexte.save();
    contexte.translate(px, py);
    contexte.rotate(radians);
    contexte.beginPath();
    contexte.moveTo(taille, 0);
    contexte.lineTo(-taille * 0.7, taille * 0.62);
    contexte.lineTo(-taille * 0.35, 0);
    contexte.lineTo(-taille * 0.7, -taille * 0.62);
    contexte.closePath();
    contexte.fillStyle = '#3DFFA8';
    contexte.strokeStyle = '#0B3D2A';
    contexte.lineWidth = 1.5 * this.echelle;
    contexte.fill();
    contexte.stroke();
    contexte.restore();
  }

  /** Ajoute des ordres a jouer et relance l'animation si besoin. */
  ajouter(commandes) {
    for (const commande of commandes) {
      if (commande.c === 'effacer') {
        this.traces = [];
        this.fileAttente = [];
      } else if (commande.c === 'fond') {
        this.fond = commande.couleur || '#ffffff';
      }
      this.fileAttente.push(commande);
    }
    this.jouer();
  }

  /**
   * Joue la file d'attente image par image. Le nombre d'ordres traites par
   * image depend de `speed()` : 0 signifie « instantane » en turtle standard.
   */
  jouer() {
    if (this.enCours) return;
    this.enCours = true;
    this.traces = this.traces || [];

    const etape = () => {
      let budget = this.vitesseCourante();
      while (budget > 0 && this.fileAttente.length) {
        const commande = this.fileAttente.shift();
        if (commande.c === 'tortue') {
          this.tortue = commande;
        } else if (commande.c === 'sauter') {
          // Deplacement stylo leve : rien a peindre.
        } else if (commande.c !== 'effacer' && commande.c !== 'fond') {
          this.traces.push(commande);
        }
        budget -= 1;
      }
      this.redessiner();

      if (this.fileAttente.length) {
        this.animation = requestAnimationFrame(etape);
      } else {
        this.enCours = false;
        this.animation = null;
      }
    };

    this.animation = requestAnimationFrame(etape);
  }

  /** Ordres joues par image, deduits de la vitesse demandee par le programme. */
  vitesseCourante() {
    const prochain = this.fileAttente.find((commande) => commande.vitesse !== undefined);
    const vitesse = prochain?.vitesse ?? 6;
    if (vitesse === 0) return 100000; // `speed(0)` : tout de suite
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return 100000;
    return Math.max(1, Math.round(vitesse * vitesse * 0.6));
  }

  /** Termine le trace immediatement (fin de programme, ou bouton Arreter). */
  terminer() {
    while (this.fileAttente.length) {
      const commande = this.fileAttente.shift();
      if (commande.c === 'tortue') this.tortue = commande;
      else if (commande.c !== 'sauter' && commande.c !== 'effacer' && commande.c !== 'fond') {
        this.traces.push(commande);
      }
    }
    this.arreterAnimation();
    this.redessiner();
  }

  /** Vrai si quelque chose a ete dessine : sert a savoir s'il faut afficher l'onglet. */
  aDuContenu() {
    return Boolean(this.traces?.length) || this.fileAttente.length > 0;
  }

  /** Image du dessin, pour la vignette d'un projet dans la galerie. */
  versImage() {
    return this.canevas.toDataURL('image/png');
  }
}
