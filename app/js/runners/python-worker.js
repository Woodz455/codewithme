/**
 * Worker Python — execute le code de l'eleve avec le vrai CPython (Pyodide).
 *
 * Pourquoi un worker : une boucle infinie ecrite par un debutant ne doit
 * jamais figer l'application. Le worker permet aussi a `input()` de bloquer
 * reellement le programme, comme dans un terminal, grace a Atomics.wait sur
 * une memoire partagee avec le fil principal.
 *
 * Messages recus  : {type:'demarrer'}, {type:'executer', code}
 * Messages emis   : 'pret' · 'sortie' · 'dessin' · 'entree' · 'termine' · 'erreur'
 */

let pyodide = null;
let sourceTortue = null;

/* --------------------------------------------------- memoire partagee --- */

let controleEntree = null; // Int32Array : [0] etat, [1] longueur
let donneesEntree = null; // Uint8Array : le texte saisi, en UTF-8
const decodeur = new TextDecoder();

const ETAT_ATTENTE = 0;
const ETAT_DONNEE = 1;
const ETAT_INTERRUPTION = 2;

/**
 * Appelee par Python a chaque input(). Bloque le worker jusqu'a la reponse.
 *
 * Python ecrit l'invite (« Ton prenom ? ») sur la sortie standard avant de
 * lire : il faut donc vider le tampon d'affichage ici, sinon l'invite resterait
 * coincee pendant que le worker attend, et l'eleve verrait un champ de saisie
 * sans savoir ce qu'on lui demande.
 */
function lireEntree() {
  if (!controleEntree) return '';

  viderSortie();
  viderDessin();

  Atomics.store(controleEntree, 0, ETAT_ATTENTE);
  self.postMessage({ type: 'entree' });
  Atomics.wait(controleEntree, 0, ETAT_ATTENTE);

  if (Atomics.load(controleEntree, 0) === ETAT_INTERRUPTION) {
    throw new Error('__ARRET_DEMANDE__');
  }

  const longueur = Atomics.load(controleEntree, 1);
  // TextDecoder refuse une vue posee sur de la memoire partagee : on recopie
  // d'abord les octets dans un tableau ordinaire.
  return decodeur.decode(new Uint8Array(donneesEntree.subarray(0, longueur)));
}

/* ------------------------------------------------------------- sorties --- */

let tampon = [];
let minuteurSortie = null;

function viderSortie() {
  if (!tampon.length) return;
  self.postMessage({ type: 'sortie', lignes: tampon });
  tampon = [];
  minuteurSortie = null;
}

function ecrire(texte, flux = 'sortie') {
  tampon.push({ flux, texte });
  // Regroupe les ecritures rapprochees : un print dans une boucle de 1000
  // tours ne doit pas declencher 1000 messages.
  if (tampon.length >= 120) viderSortie();
  else if (!minuteurSortie) minuteurSortie = setTimeout(viderSortie, 24);
}

/* -------------------------------------------------------------- dessin --- */

let commandesDessin = [];
let minuteurDessin = null;

function viderDessin() {
  if (!commandesDessin.length) return;
  self.postMessage({ type: 'dessin', commandes: commandesDessin });
  commandesDessin = [];
  minuteurDessin = null;
}

/** Recoit les ordres de trace envoyes par le module turtle. */
function recevoirDessin(commande) {
  // `commande` arrive en proxy Python : on le convertit puis on le libere,
  // sinon la memoire de l'interpreteur grimpe a chaque trait dessine.
  let objet;
  if (commande && typeof commande.toJs === 'function') {
    objet = commande.toJs({ dict_converter: Object.fromEntries });
    commande.destroy();
  } else {
    objet = commande;
  }

  commandesDessin.push(objet);
  if (commandesDessin.length >= 250) viderDessin();
  else if (!minuteurDessin) minuteurDessin = setTimeout(viderDessin, 16);
}

/* ---------------------------------------------------------- demarrage ---- */

async function demarrer(tamponInterruption) {
  const { loadPyodide } = await import('app://vendor/pyodide/pyodide.mjs');

  pyodide = await loadPyodide({ indexURL: 'app://vendor/pyodide/' });

  // Sortie non tamponnee (`write` plutot que `batched`) : sans cela, une invite
  // comme `input("Ton prenom ? ")`, qui ne se termine pas par un retour a la
  // ligne, resterait invisible jusqu'au print suivant.
  const enOctets = new TextDecoder();
  pyodide.setStdout({
    write: (octets) => {
      ecrire(enOctets.decode(octets), 'sortie');
      return octets.length;
    },
  });
  pyodide.setStderr({
    write: (octets) => {
      ecrire(enOctets.decode(octets), 'erreur');
      return octets.length;
    },
  });

  // Permet d'interrompre une boucle infinie : le fil principal ecrit 2 dans
  // ce tampon, CPython leve alors KeyboardInterrupt a la prochaine
  // instruction.
  if (tamponInterruption) pyodide.setInterruptBuffer(tamponInterruption);

  pyodide.setStdin({ stdin: lireEntree, isatty: true });

  // Pont utilise par notre module turtle.
  pyodide.registerJsModule('cwm_pont', { dessin: recevoirDessin });

  // Le module turtle maison est depose dans le systeme de fichiers virtuel,
  // pour qu'un simple `import turtle` fonctionne.
  const reponse = await fetch('app://python/turtle.py');
  sourceTortue = await reponse.text();
  pyodide.FS.mkdirTree('/cwm');
  pyodide.FS.writeFile('/cwm/turtle.py', sourceTortue);
  pyodide.runPython("import sys; sys.path.insert(0, '/cwm')");

  self.postMessage({ type: 'pret' });
}

/* ---------------------------------------------------------- execution ---- */

/** Rend une erreur Python lisible : on retire la pile interne a Pyodide. */
function nettoyerErreur(message) {
  const lignes = String(message).split('\n');
  const debut = lignes.findIndex((ligne) => ligne.includes('File "<exec>"'));
  const utiles = debut >= 0 ? ['Traceback (most recent call last):', ...lignes.slice(debut)] : lignes;
  return utiles
    .filter((ligne) => !ligne.includes('/lib/python') && !ligne.includes('pyodide/_'))
    .join('\n')
    .replace(/File "<exec>", line (\d+)/g, 'Ligne $1')
    .trim();
}

async function executer(code) {
  if (!pyodide) {
    self.postMessage({ type: 'erreur', message: 'Python n est pas encore pret.' });
    return;
  }

  // Chaque execution repart d'un etat propre : variables de l'essai precedent
  // oubliees, et tortue remise au centre.
  pyodide.runPython(`
import sys
sys.modules.pop('turtle', None)
`);

  const espace = pyodide.runPython('dict()');
  let arrete = false;

  try {
    pyodide.runPython(code, { globals: espace });
  } catch (erreur) {
    const message = String(erreur?.message || erreur);
    if (message.includes('__ARRET_DEMANDE__') || message.includes('KeyboardInterrupt')) {
      arrete = true;
    } else {
      viderSortie();
      viderDessin();
      self.postMessage({ type: 'erreur', message: nettoyerErreur(message) });
      espace.destroy();
      return;
    }
  }

  viderSortie();
  viderDessin();
  espace.destroy();
  self.postMessage({ type: 'termine', arrete });
}

/* ------------------------------------------------------------ messages --- */

self.onmessage = async (evenement) => {
  const message = evenement.data;

  try {
    switch (message.type) {
      case 'demarrer':
        controleEntree = new Int32Array(message.memoireEntree, 0, 2);
        donneesEntree = new Uint8Array(message.memoireEntree, 16);
        await demarrer(message.tamponInterruption);
        break;

      case 'executer':
        await executer(message.code);
        break;

      default:
        break;
    }
  } catch (erreur) {
    self.postMessage({ type: 'erreur', message: String(erreur?.stack || erreur) });
  }
};
