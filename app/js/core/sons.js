/**
 * Les effets sonores.
 *
 * L'ecran Reglages proposait un interrupteur « Effets sonores » depuis le
 * debut, decrit comme « Petits sons de reussite et d'erreur ». Personne
 * n'avait ecrit ces sons : l'eleve qui l'activait n'entendait rien, et pouvait
 * raisonnablement croire que le logiciel etait casse. C'est lui qui l'a
 * signale.
 *
 * Les sons sont SYNTHETISES, pas charges depuis des fichiers. Ce choix n'est
 * pas une astuce d'implementation :
 *
 *   - il n'ajoute pas un octet au .exe de 117 Mo ni aux 2,4 Mo preloades du
 *     site web, et rien au service worker : « fonctionne hors ligne » reste
 *     vrai sans un fichier de plus ;
 *   - il n'ajoute aucune licence a gerer, alors que le depot documente
 *     scrupuleusement celles de Pyodide, JSCPP, CodeMirror et des polices.
 *
 * Le module est coupe en deux exprès. `composer()` ne fait qu'ecrire des notes
 * dans un contexte audio qu'on lui donne : c'est ce qui permet de le rendre
 * dans un OfflineAudioContext et de MESURER les echantillons produits, plutot
 * que de se contenter de verifier qu'une fonction a ete appelee.
 */
import * as store from './store.js';

/** Volume d'une note. Deux notes peuvent se superposer, d'ou la marge. */
const VOLUME = 0.13;

/** Le silence, pour les rampes exponentielles — qui refusent la valeur zero. */
const SILENCE = 0.0001;

/**
 * Les trois partitions, en secondes et en hertz.
 *
 * Toutes durent moins de 400 ms : un son d'interface qui s'attarde devient un
 * son qu'on finit par couper.
 */
const PARTITIONS = {
  // Deux notes qui montent : do5 puis sol5. Ca se lit comme « c'est bon ».
  reussite: [
    { frequence: 523.25, debut: 0, duree: 0.12 },
    { frequence: 783.99, debut: 0.09, duree: 0.2 },
  ],

  // Deux notes qui descendent, en sinus doux. Un constat, pas une punition :
  // l'eleve se trompera des centaines de fois, et le son ne doit jamais
  // ressembler a un reproche.
  erreur: [
    { frequence: 311.13, debut: 0, duree: 0.22, forme: 'sine' },
    { frequence: 233.08, debut: 0.1, duree: 0.22, forme: 'sine' },
  ],

  // Trois notes qui montent, pour un niveau ou un badge.
  fete: [
    { frequence: 523.25, debut: 0, duree: 0.11 },
    { frequence: 659.25, debut: 0.09, duree: 0.11 },
    { frequence: 1046.5, debut: 0.18, duree: 0.2 },
  ],
};

/**
 * Ecrit un son dans un contexte audio.
 *
 * Ne consulte aucun reglage et n'a aucun effet de bord : on peut donc lui
 * donner un OfflineAudioContext et mesurer ce qui en sort.
 *
 * @returns {number} la duree du son en secondes, ou 0 si le nom est inconnu
 */
export function composer(contexte, nom, debut = 0) {
  const partition = PARTITIONS[nom];
  if (!partition) return 0;

  let duree = 0;
  for (const note of partition) {
    const oscillateur = contexte.createOscillator();
    const gain = contexte.createGain();

    oscillateur.type = note.forme || 'triangle';
    oscillateur.frequency.value = note.frequence;

    // Attaque, tenue, extinction — dans cet ordre, et la tenue compte.
    //
    // Une simple decroissance exponentielle du volume vers le silence sur
    // toute la duree de la note parait naturelle, mais mesure : elle passe
    // sous le seuil d'audibilite a 40 % du parcours. La note devenait un
    // clic, et l'accord de deux notes ne s'entendait pas. C'est le test de
    // hauteur qui l'a revele — aucune relecture ne l'aurait montre.
    const depart = debut + note.debut;
    const fin = depart + note.duree;
    const attaque = 0.012;
    const extinction = Math.min(0.06, note.duree * 0.4);

    gain.gain.setValueAtTime(SILENCE, depart);
    gain.gain.exponentialRampToValueAtTime(VOLUME, depart + attaque);
    gain.gain.setValueAtTime(VOLUME, fin - extinction);
    gain.gain.exponentialRampToValueAtTime(SILENCE, fin);

    oscillateur.connect(gain).connect(contexte.destination);
    oscillateur.start(depart);
    oscillateur.stop(fin);

    duree = Math.max(duree, note.debut + note.duree);
  }
  return duree;
}

/** La duree d'un son, sans le jouer. Sert aux tests et aux enchainements. */
export function dureeSon(nom) {
  const partition = PARTITIONS[nom];
  if (!partition) return 0;
  return Math.max(...partition.map((note) => note.debut + note.duree));
}

export const NOMS_SONS = Object.keys(PARTITIONS);

/* ------------------------------------------------------------- lecture -- */

let contexte = null;

/**
 * Le contexte audio, cree au PREMIER son et jamais au chargement du module.
 *
 * Un navigateur refuse de demarrer l'audio tant que l'utilisateur n'a rien
 * fait. Ici chaque son suit un clic — Verifier, ou l'interrupteur des
 * reglages — donc la contrainte est respectee sans reglage particulier.
 */
function contexteAudio() {
  if (contexte) return contexte;
  const Constructeur = window.AudioContext || window.webkitAudioContext;
  if (!Constructeur) return null;
  contexte = new Constructeur();
  return contexte;
}

/**
 * Joue un son, si l'eleve les a actives.
 *
 * @returns {boolean} vrai si un son a reellement ete lance
 */
export function jouerSon(nom) {
  try {
    if (store.reglages()?.sons !== true) return false;

    const audio = contexteAudio();
    if (!audio) return false;
    if (audio.state === 'suspended') audio.resume();

    return composer(audio, nom, audio.currentTime) > 0;
  } catch {
    // Pas de carte son, contexte refuse, machine muette : le silence est
    // acceptable, un plantage ne l'est pas.
    return false;
  }
}
