/**
 * Moteur C++.
 *
 * Par defaut, l'interpreteur JSCPP embarque : il fonctionne toujours, sans
 * rien installer, et demarre instantanement. Si l'ordinateur possede un vrai
 * compilateur (g++, clang++, MinGW), l'atelier peut aussi passer par lui — un
 * bonus, jamais un prerequis.
 *
 * Particularite a connaitre : JSCPP execute le programme d'un seul bloc et lit
 * l'entree standard dans une chaine fournie a l'avance. Une saisie interactive
 * n'est donc pas possible ; l'atelier demande les valeurs AVANT de lancer, ce
 * qui reste fidele a l'usage reel (`programme.exe < entree.txt`).
 */

let bibliotheque = null;

/** Charge JSCPP a la premiere utilisation. */
async function charger() {
  if (bibliotheque) return bibliotheque;
  if (!window.JSCPP) {
    await new Promise((resoudre, rejeter) => {
      const balise = document.createElement('script');
      balise.src = 'app://vendor/jscpp/jscpp.js';
      balise.onload = resoudre;
      balise.onerror = () => rejeter(new Error('Le moteur C++ n a pas pu etre charge.'));
      document.head.appendChild(balise);
    });
  }
  bibliotheque = window.JSCPP;
  return bibliotheque;
}

/* ------------------------------------------------- messages en francais -- */

const TRADUCTIONS = [
  [/identifier (\w+) not found/i, (m) => `« ${m[1] } » n’est pas connu ici. Vérifie l’orthographe, ou déclare-le avant de t’en servir.`],
  [/expected ';'/i, () => 'Il manque un point-virgule ; en C++, chaque instruction se termine par « ; ».'],
  [/unexpected end of file|unexpected EOF/i, () => 'Le programme s’arrête trop tôt : il manque probablement une accolade fermante « } ».'],
  [/expected '}'/i, () => 'Il manque une accolade fermante « } ».'],
  [/expected '\)'/i, () => 'Il manque une parenthèse fermante « ) ».'],
  [/division by zero/i, () => 'Division par zéro : on ne peut pas diviser un nombre par 0.'],
  [/no matching function/i, () => 'Cette fonction n’existe pas, ou tu ne lui donnes pas les bons arguments.'],
  [/cannot convert|invalid conversion/i, () => 'Types incompatibles : tu mélanges par exemple du texte et un nombre.'],
  [/index out of (bounds|range)/i, () => 'Tu sors du tableau : la case demandée n’existe pas. Les indices vont de 0 à taille − 1.'],
  [/main.*not (found|defined)/i, () => 'Le programme n’a pas de fonction « main ». C’est par elle que tout commence.'],
];

/**
 * Erreur d'analyse de JSCPP. Son message brut est un mur de texte :
 *
 *   ERROR: Parsing Failure:
 *   line 5 (column 5):  point-virgule"
 *   ----------^
 *   Expected "!=", "%", … , ";", … but "r" found.
 *
 * Illisible pour un debutant. On en tire le seul contenu utile — la ligne, ce
 * qui etait attendu, ce qui a ete trouve — et on le reformule.
 */
function analyserEchecDAnalyse(brut) {
  if (!/Parsing Failure/i.test(brut)) return null;

  const ligne = Number(brut.match(/line (\d+)/i)?.[1]) || null;
  const attendus = Array.from(brut.matchAll(/"([^"]{1,3})"/g)).map((c) => c[1]);
  const trouve = brut.match(/but "([^"]*)" found/i)?.[1] ?? null;

  const position = ligne ? `Ligne ${ligne}` : 'Quelque part dans ton programme';
  let explication;

  if (attendus.includes(';')) {
    explication =
      `${position} : il manque très probablement un point-virgule « ; » à la fin de la ligne précédente. ` +
      'En C++, chaque instruction se termine par « ; ».';
  } else if (attendus.includes('}')) {
    explication = `${position} : il manque une accolade fermante « } ».`;
  } else if (attendus.includes(')')) {
    explication = `${position} : il manque une parenthèse fermante « ) ».`;
  } else if (attendus.includes('"')) {
    explication = `${position} : un guillemet n’est pas refermé.`;
  } else {
    explication = `${position} : C++ ne comprend pas cette ligne${trouve ? `, il bute sur « ${trouve} »` : ''}.`;
  }

  return {
    court: `Erreur de syntaxe${ligne ? ` ligne ${ligne}` : ''}.`,
    explication,
    ligne,
  };
}

/**
 * Ajoute une explication en francais et raccourcit le message d'origine.
 * @returns {{brut:string, explication:string|null, ligne:number|null}}
 */
export function expliquerErreur(message) {
  const brut = String(message || '').trim();
  if (!brut) return { brut, explication: null, ligne: null };

  const analyse = analyserEchecDAnalyse(brut);
  if (analyse) return { brut: analyse.court, explication: analyse.explication, ligne: analyse.ligne };

  const ligne = Number(brut.match(/line (\d+)/i)?.[1]) || null;
  for (const [motif, rendre] of TRADUCTIONS) {
    const correspondance = brut.match(motif);
    if (correspondance) return { brut, explication: rendre(correspondance), ligne };
  }
  return { brut, explication: null, ligne };
}

/* ------------------------------------------------------------ execution -- */

const LIMITE_SORTIE = 100000;

/**
 * Execute un programme C++ avec l'interpreteur embarque.
 * @param {string} source
 * @param {string} entree  contenu de l'entree standard (pour cin)
 * @returns {Promise<{ok:boolean, sortie:string, erreur:string|null, explication:string|null, codeSortie:number|null}>}
 */
export async function executerCpp(source, entree = '') {
  const JSCPP = await charger();

  let sortie = '';
  let tropLong = false;

  const config = {
    stdio: {
      write: (texte) => {
        if (sortie.length > LIMITE_SORTIE) {
          tropLong = true;
          return;
        }
        sortie += texte;
      },
    },
    // Garde-fou contre les boucles infinies : JSCPP compte les pas executes.
    maxTimeout: 8000,
  };

  try {
    const codeSortie = JSCPP.run(source, String(entree ?? ''), config);
    return {
      ok: true,
      sortie: tropLong ? `${sortie}\n\n[sortie très longue, coupée ici — as-tu une boucle sans fin ?]` : sortie,
      erreur: null,
      explication: null,
      codeSortie: typeof codeSortie === 'number' ? codeSortie : 0,
    };
  } catch (erreur) {
    const message = String(erreur?.message || erreur);
    const delaiDepasse = /timeout|maxTimeout/i.test(message);
    const { brut, explication, ligne } = expliquerErreur(message);

    return {
      ok: false,
      sortie,
      erreur: delaiDepasse
        ? 'Le programme tourne depuis trop longtemps et a été arrêté.'
        : brut,
      explication: delaiDepasse
        ? 'C’est presque toujours une boucle qui ne s’arrête jamais : vérifie sa condition.'
        : explication,
      ligne,
      codeSortie: null,
    };
  }
}

/* ------------------------------------------------- compilateur du systeme -- */

let compilateurSysteme = null;

/** Renseigne si un vrai compilateur est installe sur cet ordinateur. */
export async function detecterCompilateur() {
  if (compilateurSysteme) return compilateurSysteme;
  try {
    compilateurSysteme = await window.cwm.cpp.detecter();
  } catch {
    compilateurSysteme = { disponible: false, commande: null, version: null };
  }
  return compilateurSysteme;
}

/** Compile et execute avec le compilateur du systeme (si present). */
export async function compilerAvecSysteme(source, entree = '') {
  const resultat = await window.cwm.cpp.compiler(source, entree);
  const { explication } = expliquerErreur(resultat.erreurs);
  return {
    ok: resultat.ok,
    sortie: resultat.sortie || '',
    erreur: resultat.ok ? null : resultat.erreurs,
    explication: resultat.ok ? null : explication,
    codeSortie: resultat.codeSortie,
    etape: resultat.etape,
  };
}

/**
 * Devine si un programme attend une saisie, pour que l'atelier propose le
 * champ d'entree avant de lancer plutot qu'apres.
 */
export function attendUneSaisie(source) {
  return /\bcin\s*>>|\bgetline\s*\(/.test(String(source || ''));
}
