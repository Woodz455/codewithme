/**
 * Etat de l'eleve, cote interface.
 *
 * Le profil vit dans un fichier JSON gere par le processus principal. Ici on
 * en garde une copie en memoire, on la modifie, et on l'ecrit sur le disque
 * avec un leger differe pour ne pas saturer le disque a chaque frappe.
 */
import { attendre } from './ui.js';

const XP_PAR_NIVEAU = 250; // palier constant : simple a comprendre pour un debutant

let profil = null;
const abonnes = new Set();

const ecrireDiffere = attendre(async () => {
  try {
    await window.cwm.profil.ecrire(profil);
  } catch (erreur) {
    console.error('Sauvegarde du profil impossible :', erreur);
  }
}, 350);

/* ------------------------------------------------------------ chargement -- */

export async function charger() {
  profil = await window.cwm.profil.lire();
  majSerie();
  return profil;
}

export function etat() {
  return profil;
}

export function surChangement(rappel) {
  abonnes.add(rappel);
  return () => abonnes.delete(rappel);
}

function notifier() {
  ecrireDiffere();
  for (const abonne of abonnes) abonne(profil);
}

/** Applique une modification au profil puis previent l'interface. */
export function modifier(mutation) {
  mutation(profil);
  notifier();
  return profil;
}

/* ------------------------------------------------------------- niveaux ---- */

export function niveau(xp = profil.xp) {
  return Math.floor(xp / XP_PAR_NIVEAU) + 1;
}

export function xpDansNiveau(xp = profil.xp) {
  return xp % XP_PAR_NIVEAU;
}

export function xpPourNiveauSuivant() {
  return XP_PAR_NIVEAU;
}

export function progressionNiveau(xp = profil.xp) {
  return xpDansNiveau(xp) / XP_PAR_NIVEAU;
}

/* --------------------------------------------------------------- lecons --- */

export function etatLecon(identifiant) {
  return profil.lecons[identifiant] || null;
}

export function leconTerminee(identifiant) {
  return Boolean(profil.lecons[identifiant]?.terminee);
}

/**
 * Enregistre la reussite d'une lecon. L'XP n'est accordee qu'une fois :
 * refaire une lecon pour reviser ne doit pas gonfler le score.
 * @returns {{xpGagne:number, nouveauNiveau:number|null}}
 */
export function terminerLecon(identifiant, { xp = 20, tentatives = 1, indices = 0, tempsMs = 0 } = {}) {
  const niveauAvant = niveau();
  const dejaFaite = leconTerminee(identifiant);
  const xpGagne = dejaFaite ? 0 : xp;

  modifier((p) => {
    const precedent = p.lecons[identifiant] || { tentatives: 0, indices: 0, tempsMs: 0 };
    p.lecons[identifiant] = {
      terminee: true,
      reussieLe: precedent.reussieLe || new Date().toISOString(),
      tentatives: precedent.tentatives + tentatives,
      indices: precedent.indices + indices,
      tempsMs: precedent.tempsMs + tempsMs,
      xp: dejaFaite ? precedent.xp : xp,
    };
    p.xp += xpGagne;
  });

  const niveauApres = niveau();
  return { xpGagne, nouveauNiveau: niveauApres > niveauAvant ? niveauApres : null };
}

/** Enregistre un essai rate : sert aux « points de blocage » de l'espace tuteur. */
export function noterTentative(identifiant, { indice = false } = {}) {
  modifier((p) => {
    const precedent = p.lecons[identifiant] || { terminee: false, tentatives: 0, indices: 0, tempsMs: 0, xp: 0 };
    p.lecons[identifiant] = {
      ...precedent,
      tentatives: precedent.tentatives + 1,
      indices: precedent.indices + (indice ? 1 : 0),
    };
  });
}

export function nombreLeconsTerminees() {
  return Object.values(profil.lecons).filter((lecon) => lecon.terminee).length;
}

/* -------------------------------------------------------------- badges ---- */

export function possedeBadge(identifiant) {
  return profil.badges.includes(identifiant);
}

export function accorderBadge(identifiant) {
  if (possedeBadge(identifiant)) return false;
  modifier((p) => p.badges.push(identifiant));
  return true;
}

/* --------------------------------------------------------------- serie ---- */

function aujourdHui() {
  return new Date().toISOString().slice(0, 10);
}

function veilleDe(jour) {
  const date = new Date(`${jour}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

/**
 * Met la serie a jour au lancement.
 * Meme jour : rien ne change. Veille : la serie continue. Plus vieux : elle
 * repart a 1 — mais le record personnel, lui, est conserve.
 */
function majSerie() {
  const jour = aujourdHui();
  const { dernierJour } = profil.serie;
  if (dernierJour === jour) return;

  modifier((p) => {
    p.serie.jours = dernierJour === veilleDe(jour) ? p.serie.jours + 1 : 1;
    p.serie.dernierJour = jour;
    p.serie.record = Math.max(p.serie.record || 0, p.serie.jours);
  });
}

export function serie() {
  return profil.serie;
}

/* ---------------------------------------------------------------- temps --- */

export function ajouterTemps(millisecondes) {
  if (millisecondes < 1000) return;
  modifier((p) => {
    const jour = aujourdHui();
    p.tempsParJour[jour] = (p.tempsParJour[jour] || 0) + millisecondes;
  });
}

export function tempsTotal() {
  return Object.values(profil.tempsParJour).reduce((somme, valeur) => somme + valeur, 0);
}

/* ------------------------------------------------------------ brouillons -- */

export function lireBrouillon(identifiant) {
  return profil.brouillons[identifiant] ?? null;
}

export function ecrireBrouillon(identifiant, code) {
  modifier((p) => {
    p.brouillons[identifiant] = code;
  });
}

export function lireBacASable(langage) {
  return profil.bacASable[langage] ?? null;
}

export function ecrireBacASable(langage, code) {
  modifier((p) => {
    p.bacASable[langage] = code;
  });
}

/* ------------------------------------------------------------- reglages --- */

export function reglages() {
  return profil.reglages;
}

export function definirReglage(cle, valeur) {
  modifier((p) => {
    p.reglages[cle] = valeur;
  });
}

export function definirPrenom(prenom) {
  modifier((p) => {
    p.prenom = String(prenom).slice(0, 40);
  });
}

export function definirLangueProfil(langue) {
  modifier((p) => {
    p.langue = langue;
  });
}
