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

function ecrireJson(cle, valeur) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
    return true;
  } catch (erreur) {
    // QuotaExceededError, ou stockage refuse en navigation privee.
    console.warn(`[pont-web] impossible d'enregistrer ${cle} :`, erreur?.name || erreur);
    return false;
  }
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

const profil = {
  async lire() {
    return lireJson(CLE_PROFIL, null) || profilVierge();
  },

  async ecrire(donnees) {
    return ecrireJson(CLE_PROFIL, donnees);
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

const projets = {
  async lister() {
    // On ne renvoie que les projets dont le contenu est encore la : le
    // nettoyage du navigateur peut avoir emporte l'un sans l'autre.
    const liste = lireJson(CLE_INDEX, []);
    const presents = liste.filter((p) => localStorage.getItem(CLE_CONTENU + p.id) !== null);
    if (presents.length !== liste.length) ecrireJson(CLE_INDEX, presents);
    return presents;
  },

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
      apercu: projet.apercu || existant?.apercu || null,
      creeLe: existant?.creeLe || new Date().toISOString(),
      modifieLe: new Date().toISOString(),
    };

    // Le contenu d'abord : si le quota explose, on n'aura pas laisse une
    // fiche dans l'index qui pointe vers un fichier inexistant.
    if (!ecrireJson(CLE_CONTENU + identifiant, projet.code)) {
      throw new Error('Le navigateur n’a plus de place pour enregistrer ce projet.');
    }

    const suivante = existant
      ? liste.map((element) => (element.id === identifiant ? fiche : element))
      : [fiche, ...liste];
    ecrireJson(CLE_INDEX, suivante);

    return fiche;
  },

  async supprimer(identifiant) {
    const liste = lireJson(CLE_INDEX, []);
    if (!liste.some((p) => p.id === identifiant)) return false;
    localStorage.removeItem(CLE_CONTENU + identifiant);
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
