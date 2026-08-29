#!/usr/bin/env node
/**
 * Serveur local de la version web.
 *
 * Deux modes, un seul comportement :
 *
 *   npm run serveur:web          sert le depot tel quel, en traduisant les
 *                                adresses `app://` a la volee — pour
 *                                travailler sans reconstruire ;
 *   npm run serveur:web -- --dist  sert `dist-web/` tel qu'il sera publie —
 *                                pour eprouver ce qui partira vraiment.
 *
 * Les deux modes posent exactement les memes en-tetes, calcules par le meme
 * module que le fichier `_headers` livre avec le site : le serveur de
 * developpement ne peut donc pas etre plus permissif que l'hebergeur.
 *
 * L'isolation d'origine (COOP/COEP) est le point critique. Sans elle,
 * `SharedArrayBuffer` disparait et l'`input()` de Python cesse de bloquer.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, normalize, sep } from 'node:path';
import {
  RACINE,
  fichierPour,
  traduire,
  injecterPont,
  enTetes,
  EXTENSIONS_TRADUITES,
} from './web-commun.mjs';

/** Resolution dans `dist-web/`, ou tout est deja traduit et a plat. */
function fichierDansDist(racine, cheminUrl) {
  let chemin = decodeURIComponent(cheminUrl.split('?')[0].split('#')[0]);
  if (chemin === '/' || chemin === '') chemin = '/index.html';
  const cible = normalize(join(racine, chemin));
  if (cible !== racine && !cible.startsWith(racine + sep)) return null;
  return existsSync(cible) ? cible : null;
}

export function demarrer({ dossier = null, port = 0, silencieux = false } = {}) {
  const serveur = createServer(async (requete, reponse) => {
    const cheminUrl = new URL(requete.url, 'http://localhost').pathname;
    const fichier = dossier ? fichierDansDist(dossier, cheminUrl) : fichierPour(cheminUrl);

    if (!fichier) {
      reponse.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      reponse.end('Introuvable');
      return;
    }

    try {
      const informations = await stat(fichier);
      if (!informations.isFile()) throw new Error('pas un fichier');

      const ext = extname(fichier).toLowerCase();
      const entetes = enTetes(cheminUrl, fichier);

      // En mode source, la traduction a lieu ici plutot qu'a la construction.
      if (!dossier && EXTENSIONS_TRADUITES.has(ext)) {
        let contenu = traduire(await readFile(fichier, 'utf8')).contenu;
        if (cheminUrl === '/' || cheminUrl === '/index.html') contenu = injecterPont(contenu);
        const corps = Buffer.from(contenu, 'utf8');
        reponse.writeHead(200, { ...entetes, 'Content-Length': corps.length });
        reponse.end(requete.method === 'HEAD' ? undefined : corps);
        return;
      }

      const corps = await readFile(fichier);
      reponse.writeHead(200, { ...entetes, 'Content-Length': corps.length });
      reponse.end(requete.method === 'HEAD' ? undefined : corps);
    } catch {
      reponse.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      reponse.end('Erreur de lecture');
    }
  });

  return new Promise((resoudre) => {
    serveur.listen(port, '127.0.0.1', () => {
      const adresse = `http://127.0.0.1:${serveur.address().port}`;
      if (!silencieux) {
        process.stdout.write(
          `\nCodeWithMe — version web\n\n  ${adresse}\n\n` +
            `  source : ${dossier || RACINE}\n` +
            `  isolation d'origine posee (SharedArrayBuffer disponible)\n\n` +
            `  Ctrl+C pour arreter.\n\n`
        );
      }
      resoudre({ adresse, serveur, fermer: () => new Promise((r) => serveur.close(r)) });
    });
  });
}

/* Lance seul, et pas importe par un test. */
if (process.argv[1] && process.argv[1].endsWith('serveur-web.mjs')) {
  const dist = process.argv.includes('--dist');
  const indexPort = process.argv.indexOf('--port');
  const port = indexPort !== -1 ? Number(process.argv[indexPort + 1]) : 4173;

  if (dist && !existsSync(join(RACINE, 'dist-web'))) {
    process.stderr.write('\ndist-web/ n existe pas encore. Lancer d abord : npm run build:web\n\n');
    process.exit(1);
  }

  await demarrer({ dossier: dist ? join(RACINE, 'dist-web') : null, port });
}
