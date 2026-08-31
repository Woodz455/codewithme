/**
 * Le pont `window.cwm`, version navigateur.
 *
 * Dans l'application de bureau, ce pont parle a Electron, qui ecrit de vrais
 * fichiers. Ici, il doit rendre les memes services avec ce qu'un navigateur
 * sait faire. L'interface, elle, ne voit aucune difference : c'est tout
 * l'interet d'avoir garde ce pont etroit et nomme.
 *
 * Ce fichier n'est charge QUE par la version web. Le code de l'application de
 * bureau n'est pas touche — c'est ce qui garantit qu'ajouter le web ne peut
 * pas casser l'installateur qui fonctionne deja.
 *
 * Les equivalences, et leurs limites, annoncees franchement :
 *
 *   profil   → localStorage. Un navigateur peut l'effacer (navigation privee,
 *              nettoyage de l'historique). L'export du profil devient donc
 *              vraiment utile ici, pas seulement pratique.
 *   projets  → localStorage pour l'index et le contenu, plus un
 *              telechargement quand l'eleve veut le fichier sur son disque.
 *   cpp      → pas de compilateur natif dans un navigateur. JSCPP, lui,
 *              fonctionne : seul le bonus « vrai g++ » disparait.
 *   rapport  → impression du navigateur, avec repli sur un telechargement.
 */

const CLE_PROFIL = 'cwm:profil';
const CLE_INDEX = 'cwm:projets';
const CLE_CONTENU = 'cwm:projet:';
const CLE_APERCU = 'cwm:apercu:';

// La vignette d'un dessin de tortue pese 58 ko en PNG pleine taille. Rangee
// dans l'index, elle le faisait grossir de 58 ko par projet : mesure faite,
// l'index atteignait 3,5 Mo pour 60 projets et le stockage cassait vers 90.
// Reduite a 320 px en JPEG, la meme vignette pese 3,5 ko — dix-sept fois
// moins, pour une image affichee en petit dans la galerie.
//
// JPEG et pas WebP : le gain supplementaire est marginal (2,5 ko), et Safari
// ne sait pas encoder en WebP — `toDataURL('image/webp')` y renvoie
// silencieusement un PNG, donc quatre fois plus gros sans que rien ne le dise.
const LARGEUR_APERCU = 320;
const QUALITE_APERCU = 0.72;

const EXTENSIONS = { python: '.py', cpp: '.cpp', web: '.html', html: '.html', javascript: '.js', css: '.css' };

/* ------------------------------------------------------------- stockage -- */

/**
 * Le profil est la chose precieuse : on ne le laisse jamais tomber a cause
 * d'un projet trop gros. Chaque famille a donc sa cle, et les erreurs de
 * quota sont attrapees separement.
 */
function lireJson(cle, defaut) {
  try {
    const brut = localStorage.getItem(cle);
    return brut ? JSON.parse(brut) : defaut;
  } catch {
    return defaut;
  }
}

function ecrireTexte(cle, texte) {
  try {
    localStorage.setItem(cle, texte);
    return true;
  } catch (erreur) {
    // QuotaExceededError, ou stockage refuse en navigation privee.
    console.warn(`[pont-web] impossible d'enregistrer ${cle} :`, erreur?.name || erreur);
    return false;
  }
}

function ecrireJson(cle, valeur) {
  return ecrireTexte(cle, JSON.stringify(valeur));
}

/* ----------------------------------------------------------- telechargement */

function telecharger(nomFichier, contenu, type = 'text/plain;charset=utf-8') {
  const blob = contenu instanceof Blob ? contenu : new Blob([contenu], { type });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  lien.remove();
  // On libere l'URL apres coup : la revoquer trop tot annule le telechargement.
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

/** Ouvre un fichier a choisir, et renvoie son texte. */
function choisirFichier(accept) {
  return new Promise((resoudre) => {
    const champ = document.createElement('input');
    champ.type = 'file';
    champ.accept = accept;
    champ.style.display = 'none';
    champ.addEventListener('change', async () => {
      const fichier = champ.files?.[0];
      champ.remove();
      if (!fichier) return resoudre(null);
      resoudre({ nom: fichier.name, texte: await fichier.text() });
    });
    // Un champ annule ne declenche aucun evenement fiable selon les
    // navigateurs : l'appelant traite donc `null` comme une annulation, et on
    // ne bloque jamais l'interface en attendant un evenement qui ne vient pas.
    champ.addEventListener('cancel', () => {
      champ.remove();
      resoudre(null);
    });
    document.body.appendChild(champ);
    champ.click();
  });
}

/* ------------------------------------------------------------------ profil */

const profilVierge = () => ({
  version: 1,
  creeLe: new Date().toISOString(),
  prenom: '',
  langue: 'fr',
  reglages: {
    theme: 'sombre',
    animations: true,
    sons: false,
    mascotte: true,
    taillePolice: 'normale',
    codeTuteur: null,
  },
  xp: 0,
  lecons: {},
  badges: [],
  serie: { jours: 0, dernierJour: null, record: 0 },
  tempsParJour: {},
  brouillons: {},
  bacASable: {},
});

/**
 * Jette toutes les vignettes pour recuperer de la place.
 *
 * C'est la donnee la moins precieuse du stockage : purement decorative, et
 * refabriquee au prochain enregistrement du projet. La galerie retombe
 * proprement sur le logo du langage.
 *
 * @returns {boolean} vrai si quelque chose a ete libere
 */
function libererDesVignettes() {
  const cles = Object.keys(localStorage).filter((cle) => cle.startsWith(CLE_APERCU));
  for (const cle of cles) localStorage.removeItem(cle);
  return cles.length > 0;
}

const profil = {
  async lire() {
    return lireJson(CLE_PROFIL, null) || profilVierge();
  },

  /**
   * Derniere marche de l'ordre de sacrifice.
   *
   * Ranger le profil dans sa propre cle le protege d'un projet trop gros, mais
   * ne le protege pas d'un stockage integralement plein — aucune cle separee
   * ne le pourrait. Alors quand l'ecriture echoue, on jette les vignettes et on
   * reessaie : la progression de l'eleve vaut plus que toutes les images de la
   * galerie reunies.
   *
   * Sans cela, la garantie n'etait pas fausse, elle etait seulement probable —
   * et le test qui l'eprouvait passait une fois sur deux.
   */
  async ecrire(donnees) {
    if (ecrireJson(CLE_PROFIL, donnees)) return true;
    if (libererDesVignettes()) return ecrireJson(CLE_PROFIL, donnees);
    return false;
  },

  async exporter() {
    const donnees = lireJson(CLE_PROFIL, null) || profilVierge();
    const nom = `codewithme-profil-${new Date().toISOString().slice(0, 10)}.json`;
    telecharger(nom, JSON.stringify(donnees, null, 2), 'application/json');
    return { annule: false, chemin: nom };
  },

  async importer() {
    const fichier = await choisirFichier('.json,application/json');
    if (!fichier) return { annule: true };
    try {
      const importe = JSON.parse(fichier.texte);
      ecrireJson(CLE_PROFIL, importe);
      return { annule: false, profil: importe };
    } catch {
      throw new Error('Ce fichier n’est pas un profil CodeWithMe valide.');
    }
  },
};

/* ----------------------------------------------------------------- projets */

function nomDeFichierSur(titre, identifiant) {
  const base = String(titre || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 40);
  return `${base || 'projet'}-${identifiant.slice(-6)}`;
}

/**
 * Reduit une vignette avant de la ranger.
 *
 * En cas de pepin — image illisible, canevas indisponible — on renvoie `null`
 * plutot que l'original : une vignette est decorative, et la garder entiere
 * couterait la place d'une quinzaine de projets.
 */
async function reduireApercu(donneesImage) {
  if (typeof donneesImage !== 'string' || !donneesImage.startsWith('data:image/')) return null;
  try {
    const image = await new Promise((resoudre, rejeter) => {
      const element = new Image();
      element.onload = () => resoudre(element);
      element.onerror = () => rejeter(new Error('image illisible'));
      element.src = donneesImage;
    });
    if (!image.width || !image.height) return null;

    const largeur = Math.min(LARGEUR_APERCU, image.width);
    const canevas = document.createElement('canvas');
    canevas.width = largeur;
    canevas.height = Math.max(1, Math.round((image.height / image.width) * largeur));

    const contexte = canevas.getContext('2d');
    // Le JPEG ne connait pas la transparence : sans ce fond, le trace de la
    // tortue apparaitrait sur du noir.
    contexte.fillStyle = '#ffffff';
    contexte.fillRect(0, 0, canevas.width, canevas.height);
    contexte.drawImage(image, 0, 0, canevas.width, canevas.height);

    return canevas.toDataURL('image/jpeg', QUALITE_APERCU);
  } catch {
    return null;
  }
}

const projets = {
  /**
   * L'index ne contient que des metadonnees ; les vignettes vivent a part et
   * sont rattachees ici. C'est ce qui permet a une vignette de manquer sans
   * que le projet disparaisse.
   */
  async lister() {
    const liste = lireJson(CLE_INDEX, []);
    const presents = liste.filter((p) => localStorage.getItem(CLE_CONTENU + p.id) !== null);
    if (presents.length !== liste.length) ecrireJson(CLE_INDEX, presents);

    const connus = new Set(presents.map((p) => p.id));
    // Du contenu sans fiche occupe de la place pour rien, et rien ne le
    // montrerait jamais a l'eleve. On le rend au navigateur.
    for (const cle of Object.keys(localStorage)) {
      if (cle.startsWith(CLE_CONTENU) && !connus.has(cle.slice(CLE_CONTENU.length))) {
        localStorage.removeItem(cle);
      } else if (cle.startsWith(CLE_APERCU) && !connus.has(cle.slice(CLE_APERCU.length))) {
        localStorage.removeItem(cle);
      }
    }

    return presents.map((p) => ({ ...p, apercu: localStorage.getItem(CLE_APERCU + p.id) }));
  },

  /**
   * Trois ecritures, par ordre d'importance decroissante — et c'est cet ordre
   * qui decide de ce qu'on sacrifie quand le stockage est plein :
   *
   *   1. le code de l'eleve. S'il ne passe pas, rien n'est enregistre et on
   *      le dit ;
   *   2. la fiche dans l'index. Si elle ne passe pas, on ANNULE l'ecriture du
   *      code : un projet invisible dans la galerie mais occupant la place
   *      est le pire des deux mondes. Mesure faite avant cette correction :
   *      sur 128 enregistrements, 89 restaient visibles et 39 disparaissaient
   *      en silence, l'appel renvoyant malgre tout « enregistre » ;
   *   3. la vignette. Purement decorative : son echec n'empeche pas
   *      l'enregistrement, et la galerie retombe sur le logo du langage.
   */
  async enregistrer(projet) {
    if (!projet?.langage || typeof projet.code !== 'string') {
      throw new Error('Projet incomplet.');
    }

    const liste = lireJson(CLE_INDEX, []);
    const identifiant = projet.id || `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
    const existant = liste.find((element) => element.id === identifiant);
    const extension = EXTENSIONS[projet.langage] || '.txt';

    const fiche = {
      id: identifiant,
      titre: projet.titre || 'Projet',
      langage: projet.langage,
      leconId: projet.leconId || null,
      fichier: existant?.fichier || `${nomDeFichierSur(projet.titre, identifiant)}${extension}`,
      creeLe: existant?.creeLe || new Date().toISOString(),
      modifieLe: new Date().toISOString(),
    };

    // Le code est range tel quel, et non en JSON : c'est ce texte exact qui
    // sera telecharge. Encadre de guillemets et avec ses retours a la ligne
    // echappes, le fichier obtenu ne serait plus executable.
    const contenuPrecedent = localStorage.getItem(CLE_CONTENU + identifiant);
    if (!ecrireTexte(CLE_CONTENU + identifiant, projet.code)) {
      throw new Error('Le navigateur n’a plus de place pour enregistrer ce projet.');
    }

    const suivante = existant
      ? liste.map((element) => (element.id === identifiant ? fiche : element))
      : [fiche, ...liste];

    if (!ecrireJson(CLE_INDEX, suivante)) {
      // Retour en arriere : on ne laisse pas derriere nous un projet que
      // l'eleve ne reverra jamais mais qui lui coute sa place.
      if (contenuPrecedent === null) localStorage.removeItem(CLE_CONTENU + identifiant);
      else localStorage.setItem(CLE_CONTENU + identifiant, contenuPrecedent);
      throw new Error('Le navigateur n’a plus de place pour enregistrer ce projet.');
    }

    // Rangee telle quelle, pas en JSON : une data URL est deja du texte, et
    // l'encadrer de guillemets la rendrait illisible pour `lister()`.
    const vignette = await reduireApercu(projet.apercu);
    if (vignette) ecrireTexte(CLE_APERCU + identifiant, vignette);

    return { ...fiche, apercu: localStorage.getItem(CLE_APERCU + identifiant) };
  },

  async supprimer(identifiant) {
    const liste = lireJson(CLE_INDEX, []);
    if (!liste.some((p) => p.id === identifiant)) return false;
    localStorage.removeItem(CLE_CONTENU + identifiant);
    localStorage.removeItem(CLE_APERCU + identifiant);
    ecrireJson(CLE_INDEX, liste.filter((p) => p.id !== identifiant));
    return true;
  },

  /** Pas de dossier dans un navigateur : le geste utile equivalent est de
   *  poser le fichier sur le disque de l'eleve. */
  async ouvrirDossier(identifiant) {
    const fiche = lireJson(CLE_INDEX, []).find((p) => p.id === identifiant);
    const contenu = localStorage.getItem(CLE_CONTENU + identifiant);
    if (!fiche || contenu === null) return false;
    telecharger(fiche.fichier, contenu);
    return true;
  },

  async ouvrirDansNavigateur(identifiant) {
    const fiche = lireJson(CLE_INDEX, []).find((p) => p.id === identifiant);
    const contenu = localStorage.getItem(CLE_CONTENU + identifiant);
    if (!fiche || contenu === null) return false;

    const blob = new Blob([contenu], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const onglet = window.open(url, '_blank');
    if (!onglet) {
      // Fenetre bloquee : on ne laisse pas l'eleve sans rien.
      URL.revokeObjectURL(url);
      telecharger(fiche.fichier, contenu, 'text/html;charset=utf-8');
      return true;
    }
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return true;
  },
};

/* --------------------------------------------------------------------- C++ */

const cpp = {
  // JSCPP fonctionne dans le navigateur : c'est le moteur habituel des
  // lecons. Seule la detection d'un vrai g++ sur la machine disparait, et
  // elle n'a toujours ete qu'un bonus.
  async detecter() {
    return { disponible: false, raison: 'navigateur' };
  },
  async compiler() {
    throw new Error('La compilation native n’est pas disponible dans le navigateur.');
  },
};

/* ----------------------------------------------------------------- rapport */

const rapport = {
  async exporter(donnees) {
    if (typeof donnees?.html !== 'string' || !donnees.html.trim()) {
      throw new Error('Document vide : rien a exporter.');
    }

    const date = new Date().toISOString().slice(0, 10);
    const nom = (donnees.nomSuggere || `codewithme-bilan-${date}.pdf`).replace(/\.pdf$/, '.html');

    // Un navigateur ne fabrique pas de PDF : le geste equivalent est
    // d'ouvrir le document et de laisser l'eleve l'imprimer — « Enregistrer
    // au format PDF » y est proposé par le navigateur lui-meme.
    if (donnees.format === 'pdf') {
      const onglet = window.open('', '_blank');
      if (onglet) {
        onglet.document.write(donnees.html);
        onglet.document.close();
        onglet.addEventListener('load', () => onglet.print(), { once: true });
        // Certains navigateurs declenchent `load` avant l'abonnement.
        setTimeout(() => {
          try { onglet.print(); } catch { /* deja imprime */ }
        }, 600);
        return { annule: false, chemin: '(fenêtre d’impression)' };
      }
    }

    telecharger(nom, donnees.html, 'text/html;charset=utf-8');
    return { annule: false, chemin: nom };
  },
};

/* ------------------------------------------------------------- publication */

window.cwm = {
  profil,
  projets,
  cpp,
  rapport,

  async infos() {
    return { version: 'web', plateforme: 'web', dossierProjets: null };
  },

  // Les menus natifs n'existent pas dans un navigateur : on expose les memes
  // abonnements, qui ne se declencheront simplement jamais. L'interface n'a
  // donc aucun test de plateforme a faire.
  surNavigation() {},
  surBasculeLangue() {},
};

/* ------------------------------------------------------------ hors ligne -- */

// L'enregistrement vit ici, et non dans une balise <script> en ligne : la
// politique de securite du site interdit le script inline, et une exception
// pour trois lignes n'en vaut pas le prix.
//
// Il echoue silencieusement en developpement (`npm run serveur:web` ne sert
// pas de service worker, pour qu'aucun cache perime ne masque une
// modification en cours). C'est voulu : le site reste parfaitement
// fonctionnel sans lui, simplement il redemande le reseau.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
