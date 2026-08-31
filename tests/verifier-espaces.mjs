#!/usr/bin/env node
/**
 * Verifie les espaces personnels : galerie, badges, bac a sable, reglages,
 * espace tuteur.
 *
 * Le point le plus important est teste ici : un projet termine doit devenir un
 * VRAI fichier sur le disque, ouvrable en dehors de l'application. C'est la
 * promesse centrale faite a l'eleve.
 */
import { _electron as electron } from 'playwright';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import os from 'node:os';

const cas = [];
const echecs = [];

function verifier(nom, condition, detail = '') {
  cas.push(nom);
  if (condition) process.stdout.write(`  ok   ${nom}\n`);
  else {
    echecs.push(nom);
    process.stdout.write(`  ECHEC ${nom}${detail ? ` — ${detail}` : ''}\n`);
  }
}

const dossierProfil = join(os.tmpdir(), `cwm-espaces-${Date.now()}`);
const dossierProjets = join(os.tmpdir(), `cwm-projets-${Date.now()}`);
const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${dossierProfil}`],
  // Les tests n'ecrivent jamais dans les vrais documents de l'utilisateur.
  env: { ...process.env, CWM_DOSSIER_PROJETS: dossierProjets },
});
const page = await application.firstWindow();
const erreursPage = [];
page.on('pageerror', (erreur) => erreursPage.push(String(erreur)));

await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1600);

/**
 * Navigue vers un ecran.
 * On passe par l'accueil quand on y est deja : changer l'ancre pour la meme
 * valeur ne declenche aucun evenement, donc aucun nouveau rendu.
 */
const aller = async (route, selecteur) => {
  await page.evaluate((cible) => {
    if (window.location.hash === cible) window.location.hash = '#/accueil';
  }, route);
  await page.waitForTimeout(150);
  await page.evaluate((cible) => {
    window.location.hash = cible;
  }, route);
  await page.waitForSelector(selecteur, { timeout: 15000 });
  await page.waitForTimeout(500);
};

/* ============================================================== BADGES ==== */

process.stdout.write('\nEspaces personnels\n\n');

await aller('#/badges', '.badges-grille');
const nombreBadges = await page.$$eval('.badge-carte', (els) => els.length);
verifier('la liste des badges s affiche', nombreBadges === 12, `${nombreBadges} badges`);
verifier(
  'les badges non obtenus restent visibles avec leur condition',
  (await page.$$eval('.badge-carte[data-acquis="false"]', (els) => els.length)) > 0
);

/* ============================================================= GALERIE ==== */

await aller('#/galerie', '.galerie-grille');
verifier('la galerie vide explique quoi faire', await page.isVisible('.galerie-vide'));

// Un projet est enregistre comme le ferait l'atelier a la fin d'une lecon.
const fiche = await page.evaluate(() =>
  window.cwm.projets.enregistrer({
    titre: 'Ma page de test',
    langage: 'web',
    code: '<!doctype html><html><body><h1>Bonjour</h1></body></html>',
    leconId: 'html-1-1',
  })
);

const infos = await page.evaluate(() => window.cwm.infos());
const cheminFichier = join(infos.dossierProjets, fiche.fichier);

verifier('le projet devient un vrai fichier sur le disque', existsSync(cheminFichier), cheminFichier);
verifier(
  'le fichier contient bien le code de l eleve',
  existsSync(cheminFichier) && readFileSync(cheminFichier, 'utf8').includes('<h1>Bonjour</h1>')
);
verifier('le nom de fichier est sur pour Windows', !/[<>:"/\\|?*]/.test(fiche.fichier), fiche.fichier);

await aller('#/galerie', '.projet');
verifier(
  'le projet apparait dans la galerie',
  (await page.textContent('.projet__titre')) === 'Ma page de test',
  await page.textContent('.projet__titre')
);
verifier(
  'la galerie indique ou sont ranges les fichiers',
  (await page.textContent('.chemin-projets')).includes(infos.dossierProjets),
  await page.textContent('.chemin-projets')
);

/* ========================================================= BAC A SABLE ==== */

await aller('#/bac-a-sable/python', '.bac');
await page.waitForSelector('.CodeMirror', { timeout: 15000 });
// Le grand projet final n'est pas un langage : il n'a pas de bac a sable.
verifier('le bac a sable propose les 5 langages', (await page.$$eval('.bac__langage', (e) => e.length)) === 5);

await page.evaluate(() => {
  document.querySelector('.CodeMirror').CodeMirror.setValue('print("bac a sable")\nprint(6 * 7)');
});
await page.click('.bac__atelier .bouton--principal');
await page.waitForFunction(() => document.querySelector('.console__fin') !== null, { timeout: 90000 });

const sortieBac = await page.textContent('.console');
verifier('le code du bac a sable s execute', sortieBac.includes('bac a sable') && sortieBac.includes('42'), sortieBac);

// Le code libre doit survivre a un changement de langage puis un retour.
await aller('#/bac-a-sable/css', '.bac');
await page.waitForSelector('.CodeMirror', { timeout: 15000 });
await aller('#/bac-a-sable/python', '.bac');
await page.waitForSelector('.CodeMirror', { timeout: 15000 });
await page.waitForTimeout(700);
const codeRetrouve = await page.evaluate(() => document.querySelector('.CodeMirror').CodeMirror.getValue());
verifier('le code libre est conserve', codeRetrouve.includes('bac a sable'), codeRetrouve.slice(0, 60));

/* ============================================================ REGLAGES ==== */

await aller('#/reglages', '.ecran-reglages');
await page.fill('.ecran-reglages .champ', 'Théo');
await page.waitForTimeout(700);

// L'interrupteur de la mascotte doit reellement la masquer.
await page.click('.reglages-groupe:nth-of-type(2) .reglage:nth-of-type(2) .interrupteur');
await page.waitForTimeout(400);
verifier('masquer la mascotte fonctionne', await page.isHidden('#mascotte'));
await page.click('.reglages-groupe:nth-of-type(2) .reglage:nth-of-type(2) .interrupteur');
await page.waitForTimeout(400);
verifier('la mascotte peut revenir', await page.isVisible('#mascotte'));

await aller('#/accueil', '.cockpit');
verifier(
  'le prenom saisi apparait sur l accueil',
  (await page.textContent('.cockpit__salut')).includes('Théo'),
  await page.textContent('.cockpit__salut')
);

/* ============================================================== TUTEUR ==== */

await aller('#/tuteur', '.ecran-tuteur');
verifier('le tableau de bord tuteur s affiche', (await page.$$eval('.tuteur-vignette', (e) => e.length)) === 4);
// Six lignes : les cinq langages, plus le grand projet final.
verifier(
  'la progression liste les 5 parcours et le projet final',
  (await page.$$eval('.barre-ligne', (e) => e.length)) === 6
);
verifier('le calendrier de regularite est dessine', (await page.$$eval('.calendrier__case', (e) => e.length)) > 60);

// Une barre a zero ne doit afficher aucun segment : sinon elle laisse croire
// a une progression qui n'existe pas.
const largeurs = await page.$$eval('.barre-ligne', (lignes) =>
  lignes.map((ligne) => ({
    chiffre: ligne.querySelector('.barre-ligne__chiffre').textContent.trim(),
    largeur: ligne.querySelector('.barre-ligne__valeur').getBoundingClientRect().width,
  }))
);
const zeros = largeurs.filter((l) => l.chiffre.startsWith('0 /'));
verifier(
  'une progression nulle n affiche aucune barre',
  zeros.length > 0 && zeros.every((l) => l.largeur === 0),
  JSON.stringify(zeros)
);

verifier('la confidentialite est rappelee', (await page.textContent('.tuteur-confidentialite')).includes('ordinateur'));

/* --- verrou par code ------------------------------------------------------ */

await page.evaluate(async () => {
  const store = await import('app://app/js/core/store.js');
  store.definirReglage('codeTuteur', '1234');
});
await page.waitForTimeout(600);
await aller('#/tuteur', '.verrou');
verifier('le code tuteur verrouille l acces', await page.isVisible('.verrou'));

await page.fill('.verrou .champ', '9999');
await page.click('.verrou .bouton--principal');
await page.waitForTimeout(300);
verifier('un mauvais code est refuse', await page.isVisible('.verrou__erreur'));

await page.fill('.verrou .champ', '1234');
await page.click('.verrou .bouton--principal');
await page.waitForSelector('.tuteur-vignettes', { timeout: 5000 });
verifier('le bon code donne acces', await page.isVisible('.tuteur-vignettes'));

/* ================================================ CARTE D UN PARCOURS ==== */

// Le parcours Python fait 9 123 px de haut, onze ecrans, contre trois pour
// tous les autres : c'est le prix de ses 71 lecons. S'il s'ouvrait tout en
// haut, un eleve avance devrait retrouver sa place a la main a chaque visite.
process.stdout.write('\nCarte du parcours\n\n');

await page.evaluate(async () => {
  const store = await import('app://app/js/core/store.js');
  const { leconsDuParcours } = await import('app://app/content/parcours.js');
  // Trente lecons terminees : bien au-dela du premier ecran.
  for (const fiche of leconsDuParcours('python').slice(0, 30)) {
    store.terminerLecon(fiche.id, { xp: 10 });
  }
});
await page.waitForTimeout(400);
await aller('#/parcours/python', '.carte-plan');

const carte = await page.evaluate(() => {
  const scene = document.querySelector('.scene');
  const suivante = document.querySelector('.noeud[data-etat="suivante"]');
  if (!suivante) return { erreur: 'aucun noeud suivant' };
  const r = suivante.getBoundingClientRect();
  const s = scene.getBoundingClientRect();
  return {
    defilement: Math.round(scene.scrollTop),
    hauteurTotale: scene.scrollHeight,
    visible: r.top >= s.top && r.bottom <= s.bottom,
    titre: suivante.querySelector('.noeud__titre')?.textContent || '',
  };
});

verifier(
  'la carte s ouvre a l endroit ou l eleve en est',
  carte.defilement > 0,
  `defilement ${carte.defilement} px sur ${carte.hauteurTotale}`
);
verifier(
  'la prochaine lecon est reellement a l ecran',
  carte.visible === true,
  `« ${carte.titre} » hors du cadre`
);

// Sur un parcours jamais commence, en revanche, on ne bouge pas : le debut EST
// la prochaine etape, et l'en-tete merite d'etre vu.
await aller('#/parcours/cpp', '.carte-plan');
const neuf = await page.evaluate(() => Math.round(document.querySelector('.scene').scrollTop));
verifier('un parcours jamais commence s ouvre en haut', neuf === 0, `defilement ${neuf} px`);

/* ------------------------------------------------------------------------- */

verifier('aucune erreur JavaScript', erreursPage.length === 0, erreursPage.join(' | '));

await page.evaluate((id) => window.cwm.projets.supprimer(id), fiche.id);
await application.close();
rmSync(dossierProfil, { recursive: true, force: true });
rmSync(dossierProjets, { recursive: true, force: true });

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
