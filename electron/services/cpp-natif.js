'use strict';
/**
 * Compilation C++ reelle — bonus optionnel, jamais un prerequis.
 *
 * L'application sait toujours executer du C++ grace a l'interpreteur embarque
 * (JSCPP), sans rien installer. Si la machine possede en plus un vrai
 * compilateur (g++, clang++ ou MinGW), on le propose : l'eleve retrouve alors
 * exactement le comportement d'un vrai projet C++, messages d'erreur compris.
 */
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const fsp = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const executer = promisify(execFile);

const CANDIDATS = ['g++', 'clang++', 'c++'];
const DELAI_COMPILATION_MS = 20000;
const DELAI_EXECUTION_MS = 10000;
const SORTIE_MAX = 200000; // au-dela, le programme part en boucle : on coupe

let cache = null;

/** Cherche un compilateur utilisable. Resultat mis en cache pour la session. */
async function detecter() {
  if (cache) return cache;

  for (const commande of CANDIDATS) {
    try {
      const { stdout } = await executer(commande, ['--version'], { timeout: 5000 });
      cache = {
        disponible: true,
        commande,
        version: String(stdout).split('\n')[0].trim(),
      };
      return cache;
    } catch {
      /* compilateur absent : on essaie le suivant */
    }
  }

  cache = { disponible: false, commande: null, version: null };
  return cache;
}

function tronquer(texte) {
  const chaine = String(texte || '');
  if (chaine.length <= SORTIE_MAX) return chaine;
  return `${chaine.slice(0, SORTIE_MAX)}\n\n[sortie trop longue, coupee ici]`;
}

/**
 * Compile puis execute un programme, dans un dossier temporaire efface ensuite.
 * @returns {{etape, ok, sortie, erreurs, codeSortie}}
 */
async function compilerEtExecuter(source, entree = '') {
  const compilateur = await detecter();
  if (!compilateur.disponible) {
    throw new Error('Aucun compilateur C++ installe sur cet ordinateur.');
  }

  const dossier = await fsp.mkdtemp(path.join(os.tmpdir(), 'cwm-cpp-'));
  const fichierSource = path.join(dossier, 'programme.cpp');
  const binaire = path.join(dossier, process.platform === 'win32' ? 'programme.exe' : 'programme');

  try {
    await fsp.writeFile(fichierSource, String(source), 'utf8');

    try {
      await executer(compilateur.commande, [fichierSource, '-o', binaire, '-std=c++17', '-O0'], {
        timeout: DELAI_COMPILATION_MS,
        cwd: dossier,
      });
    } catch (erreur) {
      return {
        etape: 'compilation',
        ok: false,
        sortie: '',
        erreurs: tronquer(erreur.stderr || erreur.message),
        codeSortie: null,
      };
    }

    try {
      const processus = executer(binaire, [], {
        timeout: DELAI_EXECUTION_MS,
        cwd: dossier,
        maxBuffer: SORTIE_MAX * 2,
      });
      processus.child.stdin?.end(String(entree ?? ''));
      const { stdout, stderr } = await processus;
      return {
        etape: 'execution',
        ok: true,
        sortie: tronquer(stdout),
        erreurs: tronquer(stderr),
        codeSortie: 0,
      };
    } catch (erreur) {
      const expire = erreur.killed || erreur.signal === 'SIGTERM';
      return {
        etape: 'execution',
        ok: false,
        sortie: tronquer(erreur.stdout),
        erreurs: expire
          ? 'Le programme a ete arrete : il tournait depuis trop longtemps (boucle infinie ?).'
          : tronquer(erreur.stderr || erreur.message),
        codeSortie: typeof erreur.code === 'number' ? erreur.code : null,
      };
    }
  } finally {
    await fsp.rm(dossier, { recursive: true, force: true }).catch(() => {});
  }
}

module.exports = { detecter, compilerEtExecuter };
