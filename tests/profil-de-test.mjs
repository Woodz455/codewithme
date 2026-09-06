/**
 * Dossier de profil pour une suite de tests.
 *
 * Pourquoi ce fichier existe : depuis l'ajout de l'accueil du premier
 * lancement, un profil vierge ouvre une presentation en plein ecran. Or les
 * onze suites Playwright demarrent toutes avec un `--user-data-dir` neuf,
 * c'est-a-dire exactement dans cet etat. Le panneau intercepte les clics :
 * `verifier-espaces` (8 clics), `verifier-atelier` (5), les captures… se
 * seraient toutes mises a echouer, avec pour seul diagnostic un « element
 * intercepts pointer events » qui ne dit pas pourquoi.
 *
 * La reponse n'est pas d'affaiblir la presentation, c'est de donner a ces
 * suites le profil qu'elles decrivent reellement : celui d'un eleve qui
 * revient. Une seule suite — `verifier-bienvenue.mjs` — part vraiment de zero,
 * et c'est son sujet.
 *
 * L'ecriture a lieu AVANT le lancement, ce qui suppose que `--user-data-dir=X`
 * rend bien `app.getPath('userData') === X`. L'hypothese n'est pas laissee
 * tacite : `verifier-bienvenue.mjs` la verifie explicitement.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

/**
 * Prepare un dossier de profil neuf, marque « presentation deja vue ».
 *
 * @param {string} nom      court identifiant de la suite, pour retrouver le dossier
 * @param {object} [profil] champs a poser en plus (progression, prenom, reglages…)
 * @returns {string} le chemin a passer a `--user-data-dir`
 */
export function preparerProfil(nom, profil = {}) {
  const dossier = join(os.tmpdir(), `cwm-${nom}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);
  mkdirSync(dossier, { recursive: true });

  // Le service profil complete les champs manquants : on ne pose ici que ce
  // qui doit differer d'un profil vierge.
  writeFileSync(join(dossier, 'profil.json'), JSON.stringify({ bienvenueVue: true, ...profil }, null, 2), 'utf8');

  return dossier;
}
