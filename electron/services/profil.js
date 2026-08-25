'use strict';
/**
 * Profil de l'eleve : progression, XP, badges, series, historique.
 *
 * Ecrit dans un vrai fichier JSON (dossier userData de Windows), pas dans le
 * navigateur : rien ne disparait si le cache est vide. Chaque ecriture passe
 * par un fichier temporaire puis un renommage atomique, et conserve la version
 * precedente en .bak — un profil de plusieurs mois ne doit jamais etre perdu a
 * cause d'une coupure de courant pendant une sauvegarde.
 */
const { app, dialog } = require('electron');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const VERSION_SCHEMA = 1;

function cheminProfil() {
  return path.join(app.getPath('userData'), 'profil.json');
}
function cheminSauvegarde() {
  return `${cheminProfil()}.bak`;
}

function profilVierge() {
  return {
    version: VERSION_SCHEMA,
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
    lecons: {},        // "python/1-2" -> { reussie, tentatives, indices, xp, tempsMs, terminee }
    badges: [],        // identifiants des badges obtenus
    serie: { jours: 0, dernierJour: null, record: 0 },
    tempsParJour: {},  // "2026-08-25" -> millisecondes
    brouillons: {},    // code en cours par lecon
    bacASable: {},     // code libre par langage
  };
}

/** Complete un profil ancien ou partiel avec les champs manquants. */
function normaliser(donnees) {
  const vierge = profilVierge();
  if (!donnees || typeof donnees !== 'object') return vierge;
  return {
    ...vierge,
    ...donnees,
    version: VERSION_SCHEMA,
    reglages: { ...vierge.reglages, ...(donnees.reglages || {}) },
    serie: { ...vierge.serie, ...(donnees.serie || {}) },
    lecons: donnees.lecons || {},
    badges: Array.isArray(donnees.badges) ? donnees.badges : [],
    tempsParJour: donnees.tempsParJour || {},
    brouillons: donnees.brouillons || {},
    bacASable: donnees.bacASable || {},
  };
}

async function lireFichier(chemin) {
  try {
    return normaliser(JSON.parse(await fsp.readFile(chemin, 'utf8')));
  } catch {
    return null;
  }
}

async function lire() {
  return (await lireFichier(cheminProfil())) || (await lireFichier(cheminSauvegarde())) || profilVierge();
}

async function ecrire(donnees) {
  const profil = normaliser(donnees);
  const cible = cheminProfil();
  const temporaire = `${cible}.tmp`;

  await fsp.mkdir(path.dirname(cible), { recursive: true });
  await fsp.writeFile(temporaire, JSON.stringify(profil, null, 2), 'utf8');

  // On ne remplace la sauvegarde qu'apres avoir un temporaire complet et valide.
  if (fs.existsSync(cible)) await fsp.copyFile(cible, cheminSauvegarde()).catch(() => {});
  await fsp.rename(temporaire, cible);

  return true;
}

async function exporter(fenetre) {
  const date = new Date().toISOString().slice(0, 10);
  const { canceled, filePath } = await dialog.showSaveDialog(fenetre, {
    title: 'Exporter ma progression / Export my progress',
    defaultPath: `codewithme-progression-${date}.json`,
    filters: [{ name: 'CodeWithMe', extensions: ['json'] }],
  });
  if (canceled || !filePath) return { annule: true };

  await fsp.writeFile(filePath, JSON.stringify(await lire(), null, 2), 'utf8');
  return { annule: false, chemin: filePath };
}

async function importer(fenetre) {
  const { canceled, filePaths } = await dialog.showOpenDialog(fenetre, {
    title: 'Importer une progression / Import progress',
    filters: [{ name: 'CodeWithMe', extensions: ['json'] }],
    properties: ['openFile'],
  });
  if (canceled || !filePaths?.length) return { annule: true };

  const importe = await lireFichier(filePaths[0]);
  if (!importe) throw new Error('Ce fichier n est pas une progression CodeWithMe valide.');

  await ecrire(importe);
  return { annule: false, profil: importe };
}

module.exports = { lire, ecrire, exporter, importer, profilVierge };
