'use strict';
/**
 * Pont entre l'interface et le systeme.
 *
 * L'interface n'a aucun acces a Node : elle ne voit que les fonctions nommees
 * ci-dessous. Chacune correspond a une action precise et verifiee cote main.js.
 */
const { contextBridge, ipcRenderer } = require('electron');

/** Deballe la reponse {ok, valeur|erreur} renvoyee par main.js. */
async function appeler(canal, ...args) {
  const reponse = await ipcRenderer.invoke(canal, ...args);
  if (!reponse?.ok) throw new Error(reponse?.erreur || `Echec de ${canal}`);
  return reponse.valeur;
}

contextBridge.exposeInMainWorld('cwm', {
  profil: {
    lire: () => appeler('profil:lire'),
    ecrire: (donnees) => appeler('profil:ecrire', donnees),
    exporter: () => appeler('profil:exporter'),
    importer: () => appeler('profil:importer'),
  },

  projets: {
    lister: () => appeler('projets:lister'),
    enregistrer: (projet) => appeler('projets:enregistrer', projet),
    supprimer: (id) => appeler('projets:supprimer', id),
    ouvrirDossier: (id) => appeler('projets:ouvrirDossier', id),
    ouvrirDansNavigateur: (id) => appeler('projets:ouvrirDansNavigateur', id),
  },

  cpp: {
    detecter: () => appeler('cpp:detecter'),
    compiler: (source, entree) => appeler('cpp:compiler', source, entree),
  },

  rapport: {
    exporter: (donnees) => appeler('rapport:exporter', donnees),
  },

  infos: () => appeler('app:infos'),

  // Evenements envoyes par les menus natifs. On reexpose des abonnements
  // nommes plutot que ipcRenderer lui-meme, pour ne pas ouvrir tout l'IPC.
  surNavigation: (rappel) => {
    ipcRenderer.on('menu:naviguer', (_evenement, route) => rappel(route));
  },
  surBasculeLangue: (rappel) => {
    ipcRenderer.on('menu:basculer-langue', () => rappel());
  },
});
