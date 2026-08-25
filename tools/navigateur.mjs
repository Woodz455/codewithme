/**
 * Ouvre un navigateur ordinaire, sans rien de l'application.
 *
 * On laisse Playwright choisir son Chromium : c'est ce qui marche partout, y
 * compris sur un runner d'integration continue. Le repli ne sert qu'aux
 * environnements ou le navigateur est installe ailleurs — et son chemin y est
 * decouvert, jamais impose. Un chemin code en dur a deja fait echouer la CI :
 * il n'existait que sur la machine ou le test avait ete ecrit.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

const REPLIS = ['/opt/pw-browsers/chromium'];

export async function ouvrirNavigateur(options = {}) {
  const arguments_ = { args: ['--no-sandbox'], ...options };

  try {
    return await chromium.launch(arguments_);
  } catch (erreur) {
    for (const chemin of [process.env.CWM_CHROMIUM, ...REPLIS].filter(Boolean)) {
      if (existsSync(chemin)) return chromium.launch({ ...arguments_, executablePath: chemin });
    }
    throw erreur;
  }
}
