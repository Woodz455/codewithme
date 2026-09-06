#!/usr/bin/env node
/**
 * Verifie l'accueil du premier lancement.
 *
 * C'est la seule suite qui demarre sur un profil VRAIMENT vierge : toutes les
 * autres passent par `preparerProfil()`, qui marque la presentation comme deja
 * vue. Ce qui se joue ici tient en deux promesses :
 *
 *   1. la presentation s'ouvre a la premiere ouverture, recueille le prenom,
 *      les sons, et mene a la premiere lecon ;
 *   2. elle ne revient JAMAIS ensuite — ni au relancement, ni pour un eleve
 *      qui met a jour l'application avec de la progression derriere lui.
 *
 * La seconde compte autant que la premiere : une presentation qui reapparait
 * est plus penible qu'une presentation absente.
 */
import { _electron as electron } from 'playwright';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
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

/** Un dossier de profil reellement vide : aucun profil.json n'y est ecrit. */
function dossierVierge(nom) {
  const dossier = join(os.tmpdir(), `cwm-bienvenue-${nom}-${Date.now()}`);
  mkdirSync(dossier, { recursive: true });
  return dossier;
}

const erreursPage = [];

async function lancer(dossier) {
  const application = await electron.launch({
    args: [process.cwd(), '--no-sandbox', `--user-data-dir=${dossier}`],
    env: { ...process.env, CWM_DOSSIER_PROJETS: join(os.tmpdir(), `cwm-bienvenue-projets-${Date.now()}`) },
  });
  const page = await application.firstWindow();
  page.on('pageerror', (erreur) => erreursPage.push(String(erreur)));
  await page.setViewportSize({ width: 1440, height: 900 });
  return { application, page };
}

/** L'ecriture du profil est differee de 350 ms : on laisse le disque suivre. */
const lireProfil = async (page) => {
  await page.waitForTimeout(700);
  return page.evaluate(() => window.cwm.profil.lire());
};

const dossiers = [];

/* ================================================== 1. LA PRESENTATION ==== */

process.stdout.write('\nAccueil du premier lancement\n\n');

const dossierPrincipal = dossierVierge('principal');
dossiers.push(dossierPrincipal);
let { application, page } = await lancer(dossierPrincipal);

// L'hypothese sur laquelle repose tout `profil-de-test.mjs` : le profil ecrit
// dans le dossier passe a `--user-data-dir` est bien celui que l'application
// va lire. Si elle cessait d'etre vraie, les onze autres suites se mettraient
// a voir la presentation sans que rien ne le dise.
const cheminUserData = await application.evaluate(({ app }) => app.getPath('userData'));
verifier(
  'le profil se range dans le dossier passe a --user-data-dir',
  cheminUserData === dossierPrincipal,
  `${cheminUserData} ≠ ${dossierPrincipal}`
);

await page.waitForSelector('#bienvenue:not([hidden])', { timeout: 25000 });
verifier('la presentation s ouvre sur un profil vierge', true);

// Le logo de demarrage se fond par-dessus la presentation pendant 460 ms, puis
// se retire du document. On attend ce retrait : une presentation qui resterait
// coiffee par le logo serait invisible.
let demarrageRetire = true;
try {
  await page.waitForSelector('#demarrage', { state: 'detached', timeout: 4000 });
} catch {
  demarrageRetire = false;
}
verifier("l ecran de demarrage s efface pour la laisser voir", demarrageRetire);

// L'interface est deja construite derriere : la sortie sera un simple fondu,
// sans temps de chargement.
verifier(
  "l interface est deja prete derriere la presentation",
  await page.isVisible('#application .rail__lien'),
  'la sortie ne doit rien avoir a charger'
);

/* --- Etape 1 : la marque et la langue ----------------------------------- */

verifier('le nom du logiciel est affiche', (await page.textContent('.bienvenue__nom')) === 'CodeWithMe');
verifier('le logo est dessine', (await page.$$eval('.bienvenue__trait', (e) => e.length)) === 3);
verifier('les quatre etapes sont annoncees', (await page.$$eval('.bienvenue__point', (e) => e.length)) === 4);

const accrocheFr = await page.textContent('.bienvenue__accroche');
await page.click('#bienvenueLangueEn');
await page.waitForTimeout(300);
const accrocheEn = await page.textContent('.bienvenue__accroche');
verifier(
  'le selecteur FR / EN rebascule la presentation en direct',
  accrocheFr === 'Ton atelier de code' && accrocheEn === 'Your code workshop',
  `${accrocheFr} → ${accrocheEn}`
);
// Ce bouton vit hors de la carte : il etait reste en francais en anglais.
verifier(
  'la bascule atteint aussi ce qui est hors de la carte',
  (await page.textContent('.bienvenue__passer')) === 'Skip the intro',
  await page.textContent('.bienvenue__passer')
);
verifier('la langue choisie est enregistree', (await lireProfil(page)).langue === 'en');

await page.click('#bienvenueLangueFr');
await page.waitForTimeout(300);

/* --- Etape 2 : le prenom ------------------------------------------------- */

await page.click('.bienvenue__principal');
await page.waitForSelector('.bienvenue__champ', { timeout: 5000 });
// Le focus est pose a l'image suivante : on lui laisse cette image.
await page.waitForTimeout(200);
verifier('le champ prenom prend le focus tout seul', await page.evaluate(
  () => document.activeElement?.classList.contains('bienvenue__champ')
));

await page.fill('.bienvenue__champ', 'Lucas');
verifier('le prenom saisi est enregistre dans le profil', (await lireProfil(page)).prenom === 'Lucas');

/* --- Etape 3 : ce qu on va construire ------------------------------------ */

await page.click('.bienvenue__principal');
await page.waitForSelector('.bienvenue__parcoursCarte', { timeout: 5000 });

// Bit salue par le prenom une fois l'etape suivante affichee. Le dire au
// moment de la saisie ne servirait a rien : la phrase de l'etape suivante le
// recouvrirait dans la meme fraction de seconde.
verifier(
  'Bit salue l eleve par son prenom',
  (await page.textContent('.bit__bulle')) === 'Enchanté, Lucas !',
  await page.textContent('.bit__bulle')
);

const parcours = await page.$$eval('.bienvenue__parcoursCarte', (elements) => elements.length);
verifier('les six parcours sont presentes', parcours === 6, `${parcours} cartes`);
verifier(
  'chaque parcours annonce ce qu il produit',
  (await page.$$eval('.bienvenue__parcoursBut', (e) => e.every((element) => element.textContent.trim().length > 20)))
);

/* --- Etape 4 : les deux reglages ----------------------------------------- */

await page.click('.bienvenue__principal');
await page.waitForSelector('.bienvenue__reglages', { timeout: 5000 });

// Les sons sont allumes par defaut. On verifie que l'interrupteur commande
// vraiment le reglage, dans les deux sens.
await page.click('.bienvenue__reglages .interrupteur');
verifier('eteindre les sons ecrit le reglage', (await lireProfil(page)).reglages.sons === false);
await page.click('.bienvenue__reglages .interrupteur');
verifier('les rallumer aussi', (await lireProfil(page)).reglages.sons === true);

verifier(
  'la premiere lecon est annoncee par son vrai titre',
  (await page.textContent('.bienvenue__premiereTitre')) === 'Ton tout premier programme',
  await page.textContent('.bienvenue__premiereTitre')
);

/* --- La sortie ----------------------------------------------------------- */

await page.click('.bienvenue__principal');
await page.waitForSelector('.atelier', { timeout: 30000 });
verifier('le bouton final ouvre la premiere lecon', page.url().includes('/lecon/python/py-1-1'), page.url());
verifier('la presentation a disparu', await page.isHidden('#bienvenue'));
verifier('Bit est revenu dans son coin', await page.isVisible('#mascotte .bit'));
verifier("l accueil de l eleve porte son prenom", await page.evaluate(async () => {
  window.location.hash = '#/accueil';
  await new Promise((r) => setTimeout(r, 600));
  return document.querySelector('.cockpit__salut em')?.textContent === 'Lucas';
}));

const profilFinal = await lireProfil(page);
verifier('le profil retient que la presentation a ete vue', profilFinal.bienvenueVue === true);

await application.close();

/* ============================================ 2. ELLE NE REVIENT PLUS ===== */

process.stdout.write('\nElle ne revient plus\n\n');

({ application, page } = await lancer(dossierPrincipal));
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(2600); // au-dela du delai d'ouverture de la presentation
verifier('au second lancement, la presentation ne reapparait pas', await page.isHidden('#bienvenue'));
verifier('le prenom a survecu au redemarrage', (await lireProfil(page)).prenom === 'Lucas');
await application.close();

/* --- Un eleve qui met a jour l application ------------------------------- */

// Cas reel : un profil ecrit par une version anterieure ne porte pas le champ
// `bienvenueVue`. Le service le complete a `false` — sans la seconde condition
// de `bienvenueANeuf()`, une presentation de bienvenue s'ouvrirait en plein
// milieu du parcours de quelqu'un qui utilise l'application depuis des mois.
const dossierAncien = dossierVierge('ancien');
dossiers.push(dossierAncien);
writeFileSync(
  join(dossierAncien, 'profil.json'),
  JSON.stringify({
    version: 1,
    prenom: 'Théo',
    langue: 'fr',
    xp: 240,
    lecons: { 'py-1-1': { terminee: true, tentatives: 1, indices: 0, tempsMs: 60000, xp: 20 } },
  }),
  'utf8'
);

({ application, page } = await lancer(dossierAncien));
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(2600);
verifier(
  'un profil deja avance ne se voit pas imposer la presentation',
  await page.isHidden('#bienvenue'),
  'une mise a jour ne doit pas interrompre un eleve en cours'
);
await application.close();

/* ==================================================== 3. LA SORTIE ======== */

process.stdout.write('\nOn peut toujours en sortir\n\n');

const dossierEchap = dossierVierge('echap');
dossiers.push(dossierEchap);
({ application, page } = await lancer(dossierEchap));
await page.waitForSelector('#bienvenue:not([hidden])', { timeout: 25000 });

await page.keyboard.press('Escape');
await page.waitForTimeout(700);
verifier('la touche Echap ferme la presentation', await page.isHidden('#bienvenue'));
verifier(
  'passer la presentation la marque vue : elle ne reviendra pas',
  (await lireProfil(page)).bienvenueVue === true
);
verifier("on atterrit sur l accueil", await page.isVisible('.cockpit'));

verifier('aucune erreur JavaScript', erreursPage.length === 0, erreursPage.join(' | '));

await application.close();
for (const dossier of dossiers) rmSync(dossier, { recursive: true, force: true });

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
