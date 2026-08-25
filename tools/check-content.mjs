#!/usr/bin/env node
/**
 * Controle du contenu pedagogique.
 *
 * Sur 85 lecons, une consigne impossible ou une solution fausse passe
 * inapercue a la relecture. Ce script les debusque en executant reellement
 * chaque lecon dans l'application, avec les vrais moteurs.
 *
 * Pour chaque lecon :
 *   1. structure complete, en francais ET en anglais ;
 *   2. la solution de reference passe les verifications de la lecon ;
 *   3. le code de depart NE passe PAS — sinon le defi est deja resolu ;
 *   4. l'exemple s'execute sans erreur.
 *
 * Lancer : npm run check:content [-- --parcours python]
 */
import { _electron as electron } from 'playwright';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rmSync } from 'node:fs';
import os from 'node:os';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const filtreParcours = process.argv.includes('--parcours')
  ? process.argv[process.argv.indexOf('--parcours') + 1]
  : null;

const problemes = [];
const signaler = (identifiant, message) => problemes.push(`${identifiant} — ${message}`);

/* ============================================================== STRUCTURE == */

const { PARCOURS, leconsDuParcours } = await import(join(RACINE, 'app/content/parcours.js'));
const { LECONS } = await import(join(RACINE, 'app/content/lecons.js'));

/** Un champ bilingue doit exister dans les deux langues et n'etre jamais vide. */
function verifierBilingue(identifiant, chemin, champ) {
  if (champ === null || champ === undefined) {
    signaler(identifiant, `${chemin} manquant`);
    return;
  }
  if (typeof champ === 'string') {
    signaler(identifiant, `${chemin} est une chaine simple : il faut { fr, en }`);
    return;
  }
  for (const langue of ['fr', 'en']) {
    if (!champ[langue] || !String(champ[langue]).trim()) {
      signaler(identifiant, `${chemin} n'a pas de version « ${langue} »`);
    }
  }
}

const aVerifier = [];

for (const parcours of PARCOURS) {
  if (filtreParcours && parcours.id !== filtreParcours) continue;

  for (const fiche of leconsDuParcours(parcours.id)) {
    const lecon = LECONS[fiche.id];

    if (!lecon) {
      signaler(fiche.id, 'aucun contenu pour cette lecon');
      continue;
    }

    verifierBilingue(fiche.id, 'objectif', lecon.objectif);
    verifierBilingue(fiche.id, 'explication', lecon.explication);
    verifierBilingue(fiche.id, 'defi.consigne', lecon.defi?.consigne);

    if (!lecon.langage) signaler(fiche.id, 'langage manquant');
    if (!lecon.xp) signaler(fiche.id, 'xp manquante');

    const indices = lecon.defi?.indices;
    if (!Array.isArray(indices) || indices.length !== 3) {
      signaler(fiche.id, `il faut exactement 3 indices (${indices?.length ?? 0} trouve(s))`);
    } else {
      indices.forEach((indice, index) => verifierBilingue(fiche.id, `indice ${index + 1}`, indice));
    }

    if (!lecon.defi?.solution) signaler(fiche.id, 'solution manquante');
    if (lecon.defi?.depart === undefined) signaler(fiche.id, 'code de depart manquant');
    if (!lecon.defi?.verifications?.length) signaler(fiche.id, 'aucune verification : le defi ne peut pas etre corrige');

    // Le depart et la solution doivent avoir la meme forme : une chaine, ou les
    // memes zones (html/css/js). Sinon « Recopier la solution » ne remplirait
    // pas les bons onglets.
    const formeDepart = typeof lecon.defi?.depart === 'string' ? 'chaine' : Object.keys(lecon.defi?.depart ?? {}).sort().join(',');
    const formeSolution = typeof lecon.defi?.solution === 'string' ? 'chaine' : Object.keys(lecon.defi?.solution ?? {}).sort().join(',');
    if (formeDepart !== formeSolution) {
      signaler(fiche.id, `depart (${formeDepart}) et solution (${formeSolution}) n'ont pas la meme forme`);
    }

    // Un objectif vide afficherait a l'eleve une moitie d'ecran blanche
    // presentee comme « le resultat a atteindre » : pire que pas d'objectif.
    const objectif = lecon.defi?.objectif;
    if (objectif !== undefined) {
      const utile = ['html', 'css'].some((cle) => String(objectif?.[cle] ?? '').trim());
      if (!utile) signaler(fiche.id, 'defi.objectif ne contient ni html ni css : le rendu de reference serait vide');
    }

    if (lecon.exemple) verifierBilingue(fiche.id, 'exemple.note', lecon.exemple.note ?? { fr: 'x', en: 'x' });
    if (lecon.projet) verifierBilingue(fiche.id, 'projet.titre', lecon.projet.titre);

    aVerifier.push({ id: fiche.id, parcours: parcours.id });
  }
}

const orphelines = Object.keys(LECONS).filter(
  (identifiant) => !PARCOURS.some((p) => leconsDuParcours(p.id).some((f) => f.id === identifiant))
);
for (const identifiant of orphelines) {
  signaler(identifiant, 'contenu ecrit mais lecon absente de parcours.js');
}

process.stdout.write(`\nControle du contenu — ${aVerifier.length} lecon(s)\n\n`);

if (problemes.length) {
  process.stdout.write('  Structure :\n');
  for (const probleme of problemes) process.stdout.write(`    ${probleme}\n`);
  process.stdout.write('\n');
}

if (!aVerifier.length) {
  process.stdout.write('  Rien a executer.\n\n');
  process.exit(problemes.length ? 1 : 0);
}

/* ============================================================== EXECUTION == */

const dossierProfil = join(os.tmpdir(), `cwm-contenu-${Date.now()}`);
const application = await electron.launch({
  args: [RACINE, '--no-sandbox', `--user-data-dir=${dossierProfil}`],
  env: { ...process.env, CWM_DOSSIER_PROJETS: join(os.tmpdir(), `cwm-contenu-projets-${Date.now()}`) },
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 30000 });

// Banc d'essai installe dans la page : il rejoue exactement ce que fait
// l'atelier — meme moteurs, meme correcteur.
await page.evaluate(async () => {
  const { MoteurPython } = await import('app://app/js/runners/python.js');
  const { MoteurWeb } = await import('app://app/js/runners/web.js');
  const { executerCpp } = await import('app://app/js/runners/cpp.js');
  const { corriger } = await import('app://app/js/validateur.js');
  const { LECONS } = await import('app://app/content/lecons.js');

  const moteurPython = new MoteurPython();

  const cadre = document.createElement('iframe');
  cadre.style.cssText = 'position:fixed;left:-9999px;width:800px;height:600px';
  document.body.appendChild(cadre);
  const moteurWeb = new MoteurWeb(cadre);
  await moteurWeb.charger();

  /** Execute un code et renvoie ce que le correcteur doit examiner. */
  async function executer(langage, code, entree = '') {
    if (langage === 'python') {
      const sortie = [];
      const dessin = [];
      const erreurs = [];
      const detacher = [];
      // Reponses jouees a la place de l'eleve pour les lecons qui utilisent
      // input(). Dans l'application, c'est lui qui tape.
      const reponses = String(entree ?? '').split('\n');
      let prochaineReponse = 0;

      const poser = (evenement, rappel) => {
        moteurPython.sur(evenement, rappel);
        detacher.push(() => {
          const liste = moteurPython.ecouteurs[evenement] || [];
          const index = liste.indexOf(rappel);
          if (index >= 0) liste.splice(index, 1);
        });
      };

      const fini = new Promise((resoudre) => {
        poser('sortie', (lignes) => lignes.forEach((l) => l.flux === 'sortie' && sortie.push(l.texte)));
        poser('dessin', (commandes) => dessin.push(...commandes));
        // Une lecon qui attend une saisie non fournie ne doit pas bloquer.
        poser('entree', () => moteurPython.repondre(reponses[prochaineReponse++] ?? ''));
        poser('erreur', (message) => {
          erreurs.push(message);
          resoudre();
        });
        poser('termine', () => resoudre());
      });

      await moteurPython.executer(code);
      await Promise.race([fini, new Promise((r) => setTimeout(r, 25000))]);
      for (const d of detacher) d();

      return { sortie: sortie.join(''), dessin, erreur: erreurs[0] ?? null };
    }

    if (langage === 'cpp') {
      const resultat = await executerCpp(code, entree);
      return { sortie: resultat.sortie, dessin: [], erreur: resultat.ok ? null : resultat.erreur };
    }

    // Web : html / css / javascript
    const zones =
      typeof code === 'string'
        ? langage === 'javascript'
          ? { html: '', css: '', js: code }
          : langage === 'css'
            ? { html: '', css: code, js: '' }
            : { html: code, css: '', js: '' }
        : { html: code.html ?? '', css: code.css ?? '', js: code.js ?? '' };

    const messages = [];
    const surConsole = ({ texte }) => messages.push(texte);
    const surErreur = ({ message }) => messages.push(message);
    moteurWeb.sur('console', surConsole);
    moteurWeb.sur('erreur', surErreur);

    await moteurWeb.rendre(zones);
    // Meme delai que l'atelier : une lecon animee doit etre jugee ici
    // exactement comme elle le sera sous les yeux de l'eleve.
    await new Promise((r) => setTimeout(r, 700));

    for (const nom of ['console', 'erreur']) {
      const liste = moteurWeb.ecouteurs[nom] || [];
      const cible = nom === 'console' ? surConsole : surErreur;
      const index = liste.indexOf(cible);
      if (index >= 0) liste.splice(index, 1);
    }

    return { sortie: messages.join('\n'), dessin: [], erreur: null };
  }

  const concatener = (code) => (typeof code === 'string' ? code : Object.values(code ?? {}).join('\n'));

  window.__contenu = {
    async verifier(identifiant) {
      const lecon = LECONS[identifiant];
      const langage = lecon.langage;
      const entree = lecon.defi?.entree ?? '';
      const rapport = { id: identifiant, erreurs: [] };

      // 1. La solution doit passer.
      const solution = await executer(langage, lecon.defi.solution, entree);
      if (solution.erreur) {
        rapport.erreurs.push(`la solution plante : ${String(solution.erreur).split('\n').slice(-1)[0]}`);
      } else {
        const verdict = await corriger(lecon.defi.verifications, {
          code: concatener(lecon.defi.solution),
          sortie: solution.sortie,
          dessin: solution.dessin,
          moteurWeb,
        });
        if (!verdict.reussi) rapport.erreurs.push(`la solution ne passe pas : ${verdict.message}`);
      }

      // 2. Le code de depart ne doit PAS passer.
      const depart = await executer(langage, lecon.defi.depart, entree);
      if (!depart.erreur) {
        const verdict = await corriger(lecon.defi.verifications, {
          code: concatener(lecon.defi.depart),
          sortie: depart.sortie,
          dessin: depart.dessin,
          moteurWeb,
        });
        if (verdict.reussi) rapport.erreurs.push('le code de depart passe deja : le defi est resolu au chargement');
      }

      // 3. L'exemple doit s'executer.
      if (lecon.exemple?.code && !lecon.exemple.erreurAttendue) {
        const exemple = await executer(langage, lecon.exemple.code, entree);
        if (exemple.erreur) {
          rapport.erreurs.push(`l'exemple plante : ${String(exemple.erreur).split('\n').slice(-1)[0]}`);
        }
      }

      return rapport;
    },
  };
});

let echecs = 0;
let parcoursCourant = null;

for (const { id, parcours } of aVerifier) {
  if (parcours !== parcoursCourant) {
    parcoursCourant = parcours;
    process.stdout.write(`  ${parcours}\n`);
  }

  const rapport = await page.evaluate((identifiant) => window.__contenu.verifier(identifiant), id);

  if (rapport.erreurs.length) {
    echecs += 1;
    process.stdout.write(`    ECHEC ${id}\n`);
    for (const erreur of rapport.erreurs) process.stdout.write(`          ${erreur}\n`);
  } else {
    process.stdout.write(`    ok    ${id}\n`);
  }
}

await application.close();
rmSync(dossierProfil, { recursive: true, force: true });

const total = aVerifier.length;
process.stdout.write(
  `\n  ${total - echecs}/${total} lecon(s) valides` +
    (problemes.length ? `, ${problemes.length} probleme(s) de structure` : '') +
    '\n\n'
);

if (echecs || problemes.length) process.exit(1);
