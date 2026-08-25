'use strict';
/**
 * Galerie de projets — l'aboutissement visible du travail de l'eleve.
 *
 * Chaque projet est ecrit comme un VRAI fichier dans Documents\CodeWithMe\,
 * pas dans une base cachee : il peut l'ouvrir dans son navigateur, le montrer
 * a sa famille, le mettre sur une cle USB ou le rendre en classe.
 */
const { app, shell } = require('electron');
const fsp = require('node:fs/promises');
const path = require('node:path');

const EXTENSIONS = {
  web: '.html',
  python: '.py',
  cpp: '.cpp',
  javascript: '.js',
};

function dossierProjets() {
  return path.join(app.getPath('documents'), 'CodeWithMe', 'Mes projets');
}
function cheminIndex() {
  return path.join(dossierProjets(), 'projets.json');
}

/** Transforme un titre libre en nom de fichier sur pour Windows. */
function nomDeFichierSur(titre, identifiant) {
  const base = String(titre || 'projet')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')          // accents combinatoires
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, '') // interdits par Windows
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, 60);
  return `${base || 'projet'}-${identifiant.slice(-6)}`;
}

async function lireIndex() {
  try {
    const brut = JSON.parse(await fsp.readFile(cheminIndex(), 'utf8'));
    return Array.isArray(brut) ? brut : [];
  } catch {
    return [];
  }
}

async function ecrireIndex(liste) {
  await fsp.mkdir(dossierProjets(), { recursive: true });
  await fsp.writeFile(cheminIndex(), JSON.stringify(liste, null, 2), 'utf8');
}

async function lister() {
  const liste = await lireIndex();
  // Un projet dont le fichier a ete supprime a la main ne doit plus apparaitre.
  const presents = [];
  for (const projet of liste) {
    try {
      await fsp.access(path.join(dossierProjets(), projet.fichier));
      presents.push(projet);
    } catch {
      /* fichier disparu : on l'oublie silencieusement */
    }
  }
  if (presents.length !== liste.length) await ecrireIndex(presents);
  return presents;
}

/**
 * @param {{id?, titre, langage, code, apercu?, leconId?}} projet
 *   `code` est le contenu final du fichier, `apercu` une image data: URL.
 */
async function enregistrer(projet) {
  if (!projet?.langage || typeof projet.code !== 'string') {
    throw new Error('Projet incomplet.');
  }

  const liste = await lireIndex();
  const identifiant = projet.id || `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const existant = liste.find((element) => element.id === identifiant);

  const extension = EXTENSIONS[projet.langage] || '.txt';
  const fichier = existant?.fichier || `${nomDeFichierSur(projet.titre, identifiant)}${extension}`;

  await fsp.mkdir(dossierProjets(), { recursive: true });
  await fsp.writeFile(path.join(dossierProjets(), fichier), projet.code, 'utf8');

  const fiche = {
    id: identifiant,
    titre: projet.titre || 'Projet',
    langage: projet.langage,
    leconId: projet.leconId || null,
    fichier,
    apercu: projet.apercu || existant?.apercu || null,
    creeLe: existant?.creeLe || new Date().toISOString(),
    modifieLe: new Date().toISOString(),
  };

  const suivante = existant
    ? liste.map((element) => (element.id === identifiant ? fiche : element))
    : [fiche, ...liste];
  await ecrireIndex(suivante);

  return fiche;
}

async function supprimer(identifiant) {
  const liste = await lireIndex();
  const projet = liste.find((element) => element.id === identifiant);
  if (!projet) return false;

  await fsp.rm(path.join(dossierProjets(), projet.fichier), { force: true });
  await ecrireIndex(liste.filter((element) => element.id !== identifiant));
  return true;
}

async function ouvrirDossier(identifiant) {
  const liste = await lireIndex();
  const projet = liste.find((element) => element.id === identifiant);
  if (projet) {
    shell.showItemInFolder(path.join(dossierProjets(), projet.fichier));
  } else {
    await fsp.mkdir(dossierProjets(), { recursive: true });
    await shell.openPath(dossierProjets());
  }
  return true;
}

async function ouvrirDansNavigateur(identifiant) {
  const liste = await lireIndex();
  const projet = liste.find((element) => element.id === identifiant);
  if (!projet) throw new Error('Projet introuvable.');
  await shell.openPath(path.join(dossierProjets(), projet.fichier));
  return true;
}

module.exports = {
  lister,
  enregistrer,
  supprimer,
  ouvrirDossier,
  ouvrirDansNavigateur,
  dossierProjets,
};
