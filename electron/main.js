'use strict';
/**
 * CodeWithMe — processus principal.
 *
 * L'interface n'est pas chargee en file:// mais servie par un protocole maison
 * `app://`. Cela permet d'utiliser les modules ES, fetch(), les Web Workers et
 * Pyodide normalement, sans jamais desactiver la securite du navigateur.
 */
const { app, BrowserWindow, Menu, protocol, net, shell, ipcMain } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const APP_ROOT = path.join(__dirname, '..');
const RENDERER_ROOT = path.join(APP_ROOT, 'app');
const VENDOR_ROOT = path.join(APP_ROOT, 'vendor');
const isDev = process.argv.includes('--dev');

const profil = require('./services/profil');
const projets = require('./services/projets');
const cppNatif = require('./services/cpp-natif');
const rapport = require('./services/rapport');

/* ------------------------------------------------------------------ securite */

// Politique de securite du contenu. Tout est local ; `wasm-unsafe-eval` est
// requis par Pyodide pour compiler CPython en WebAssembly.
const CSP = [
  "default-src 'self' app:",
  "script-src 'self' app: 'wasm-unsafe-eval'",
  "style-src 'self' app: 'unsafe-inline'",
  "font-src 'self' app:",
  "img-src 'self' app: data: blob:",
  "connect-src 'self' app: blob: data:",
  "worker-src 'self' app: blob:",
  "frame-src 'self' app: blob:",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

// L'apercu (HTML/CSS/JS ecrit par l'eleve) doit pouvoir executer son propre code
// inline. Il tourne dans une iframe bac a sable sans acces a l'origine de l'app,
// donc cette permission ne peut pas atteindre le reste du logiciel.
const CSP_APERCU = [
  "default-src 'self' app: 'unsafe-inline' data: blob:",
  "script-src 'self' app: 'unsafe-inline' data: blob:",
  "style-src 'self' app: 'unsafe-inline' data: blob:",
  "img-src * data: blob:",
  "font-src 'self' app: data:",
  "connect-src 'none'",
  "object-src 'none'",
].join('; ');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

/* ------------------------------------------------------- service de fichiers */

const TYPES_MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip',
  '.map': 'application/json; charset=utf-8',
  '.py': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

/** Resout une URL app:// vers un fichier reel, en refusant toute sortie du projet. */
function resoudreChemin(urlString) {
  const url = new URL(urlString);
  let relatif = decodeURIComponent(url.pathname);

  // `app://vendor/...` et `app://python/...` pointent vers des dossiers dedies,
  // tout le reste vers l'interface.
  let racine = RENDERER_ROOT;
  if (url.hostname === 'vendor') racine = VENDOR_ROOT;
  else if (url.hostname === 'python') racine = path.join(APP_ROOT, 'python');

  if (relatif === '/' || relatif === '') relatif = '/index.html';

  const cible = path.join(racine, relatif);
  const normalise = path.normalize(cible);

  // Garde-fou contre la traversee de repertoire (`app://app/../../etc/passwd`).
  if (normalise !== racine && !normalise.startsWith(racine + path.sep)) return null;
  return normalise;
}

function enTetes(fichier, urlString) {
  const ext = path.extname(fichier).toLowerCase();
  const entetes = {
    'Content-Type': TYPES_MIME[ext] || 'application/octet-stream',
    // Isolation d'origine : indispensable pour SharedArrayBuffer, lui-meme
    // indispensable pour que input() bloque vraiment dans le worker Python.
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  };

  if (ext === '.html') {
    const estApercu = new URL(urlString).pathname.startsWith('/apercu/');
    entetes['Content-Security-Policy'] = estApercu ? CSP_APERCU : CSP;
    entetes['Cross-Origin-Opener-Policy'] = 'same-origin';
  }
  return entetes;
}

function enregistrerProtocole() {
  protocol.handle('app', async (requete) => {
    const fichier = resoudreChemin(requete.url);
    if (!fichier) return new Response('Chemin refuse', { status: 403 });

    try {
      const reponse = await net.fetch(pathToFileURL(fichier).toString());
      if (!reponse.ok) return new Response('Introuvable', { status: 404 });
      return new Response(reponse.body, {
        status: 200,
        headers: enTetes(fichier, requete.url),
      });
    } catch {
      return new Response('Introuvable', { status: 404 });
    }
  });
}

/* ---------------------------------------------------------------- la fenetre */

let fenetre = null;

function creerFenetre() {
  fenetre = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    show: false,
    backgroundColor: '#0B0E1A', // evite tout flash blanc au demarrage
    title: 'CodeWithMe',
    icon: path.join(APP_ROOT, 'resources', 'icone.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: false,
      spellcheck: false,
    },
  });

  fenetre.once('ready-to-show', () => {
    fenetre.show();
    if (isDev) fenetre.webContents.openDevTools({ mode: 'detach' });
  });

  // Aucun lien externe ne s'ouvre dans l'application : toujours dans le
  // navigateur du systeme, jamais dans une fenetre Electron.
  fenetre.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  fenetre.webContents.on('will-navigate', (evenement, url) => {
    if (!url.startsWith('app://')) {
      evenement.preventDefault();
      if (/^https?:/.test(url)) shell.openExternal(url);
    }
  });

  fenetre.loadURL('app://app/index.html');
  fenetre.on('closed', () => {
    fenetre = null;
  });
}

/* ------------------------------------------------------------------- menus */

function construireMenu() {
  const estMac = process.platform === 'darwin';
  const envoyer = (canal, ...args) => fenetre?.webContents.send(canal, ...args);

  const modele = [
    ...(estMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'CodeWithMe',
      submenu: [
        { label: 'Accueil / Home', accelerator: 'CmdOrCtrl+H', click: () => envoyer('menu:naviguer', '#/accueil') },
        { label: 'Galerie / Gallery', click: () => envoyer('menu:naviguer', '#/galerie') },
        { label: 'Bac a sable / Sandbox', click: () => envoyer('menu:naviguer', '#/bac-a-sable') },
        { type: 'separator' },
        { label: 'Francais / English', accelerator: 'CmdOrCtrl+L', click: () => envoyer('menu:basculer-langue') },
        { type: 'separator' },
        { role: 'quit', label: 'Quitter / Quit' },
      ],
    },
    {
      label: 'Edition / Edit',
      submenu: [
        { role: 'undo', label: 'Annuler / Undo' },
        { role: 'redo', label: 'Retablir / Redo' },
        { type: 'separator' },
        { role: 'cut', label: 'Couper / Cut' },
        { role: 'copy', label: 'Copier / Copy' },
        { role: 'paste', label: 'Coller / Paste' },
        { role: 'selectAll', label: 'Tout selectionner / Select all' },
      ],
    },
    {
      label: 'Affichage / View',
      submenu: [
        { role: 'resetZoom', label: 'Taille normale / Actual size' },
        { role: 'zoomIn', label: 'Agrandir / Zoom in' },
        { role: 'zoomOut', label: 'Reduire / Zoom out' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Plein ecran / Full screen' },
        ...(isDev ? [{ role: 'toggleDevTools' }] : []),
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(modele));
}

/* --------------------------------------------------------------------- IPC */

function enregistrerIpc() {
  const gerer = (canal, fonction) => {
    ipcMain.handle(canal, async (_evenement, ...args) => {
      try {
        return { ok: true, valeur: await fonction(...args) };
      } catch (erreur) {
        return { ok: false, erreur: String(erreur?.message || erreur) };
      }
    });
  };

  gerer('profil:lire', () => profil.lire());
  gerer('profil:ecrire', (donnees) => profil.ecrire(donnees));
  gerer('profil:exporter', () => profil.exporter(fenetre));
  gerer('profil:importer', () => profil.importer(fenetre));

  gerer('projets:lister', () => projets.lister());
  gerer('projets:enregistrer', (projet) => projets.enregistrer(projet));
  gerer('projets:supprimer', (id) => projets.supprimer(id));
  gerer('projets:ouvrirDossier', (id) => projets.ouvrirDossier(id));
  gerer('projets:ouvrirDansNavigateur', (id) => projets.ouvrirDansNavigateur(id));

  gerer('cpp:detecter', () => cppNatif.detecter());
  gerer('cpp:compiler', (source, entree) => cppNatif.compilerEtExecuter(source, entree));

  gerer('rapport:exporter', (donnees) => rapport.exporter(fenetre, donnees));

  gerer('app:infos', () => ({
    version: app.getVersion(),
    plateforme: process.platform,
    dossierProjets: projets.dossierProjets(),
  }));
}

/* ------------------------------------------------------------- cycle de vie */

// Une seule instance : un double-clic sur l'icone reactive la fenetre existante
// au lieu d'ouvrir un second exemplaire avec le meme profil sur le disque.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (fenetre) {
      if (fenetre.isMinimized()) fenetre.restore();
      fenetre.focus();
    }
  });

  app.whenReady().then(() => {
    enregistrerProtocole();
    enregistrerIpc();
    construireMenu();
    creerFenetre();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) creerFenetre();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
