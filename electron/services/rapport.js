'use strict';
/**
 * Export du bilan de l'espace tuteur.
 *
 * L'interface fabrique le HTML du bilan ; ce service se contente de l'ecrire
 * la ou l'utilisateur le demande, ou de le convertir en PDF via le moteur
 * d'impression d'Electron. Rien n'est envoye sur le reseau.
 */
const { dialog, BrowserWindow } = require('electron');
const fsp = require('node:fs/promises');

/**
 * @param {BrowserWindow} fenetre
 * @param {{html: string, format?: 'html'|'pdf', nomSuggere?: string,
 *          paysage?: boolean, titre?: string}} donnees
 */
async function exporter(fenetre, donnees) {
  const format = donnees?.format === 'pdf' ? 'pdf' : 'html';
  if (typeof donnees?.html !== 'string' || !donnees.html.trim()) {
    throw new Error('Bilan vide : rien a exporter.');
  }

  const date = new Date().toISOString().slice(0, 10);
  const defaut = donnees.nomSuggere || `codewithme-bilan-${date}.${format}`;

  const { canceled, filePath } = await dialog.showSaveDialog(fenetre, {
    title: donnees.titre || 'Exporter le bilan / Export the report',
    defaultPath: defaut,
    filters:
      format === 'pdf'
        ? [{ name: 'PDF', extensions: ['pdf'] }]
        : [{ name: 'Page web', extensions: ['html'] }],
  });
  if (canceled || !filePath) return { annule: true };

  if (format === 'html') {
    await fsp.writeFile(filePath, donnees.html, 'utf8');
    return { annule: false, chemin: filePath };
  }

  // Le PDF est rendu dans une fenetre invisible, jetee juste apres.
  const rendu = new BrowserWindow({
    show: false,
    webPreferences: { offscreen: true, javascript: false },
  });
  try {
    await rendu.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(donnees.html)}`);
    const pdf = await rendu.webContents.printToPDF({
      printBackground: true,
      pageSize: 'A4',
      // Un certificat se lit en paysage, et sans marges : son cadre decoratif
      // va jusqu'au bord de la feuille.
      landscape: Boolean(donnees.paysage),
      margins: donnees.paysage
        ? { marginType: 'custom', top: 0, bottom: 0, left: 0, right: 0 }
        : { marginType: 'custom', top: 0.4, bottom: 0.4, left: 0.4, right: 0.4 },
    });
    await fsp.writeFile(filePath, pdf);
    return { annule: false, chemin: filePath };
  } finally {
    rendu.destroy();
  }
}

module.exports = { exporter };
