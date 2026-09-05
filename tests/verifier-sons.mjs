#!/usr/bin/env node
/**
 * Les effets sonores, mesures.
 *
 * L'interrupteur « Effets sonores » existait depuis le debut et ne produisait
 * rien : personne n'avait ecrit les sons. C'est l'eleve qui l'a signale, ce
 * qui est la pire facon de decouvrir un defaut.
 *
 * Ce test ne se contente donc pas de verifier qu'une fonction a ete appelee.
 * Il REND l'audio dans un OfflineAudioContext et lit les echantillons
 * produits : si le signal etait silencieux, la mesure le dirait.
 *
 * Ce qu'il ne peut pas faire : juger si le son est agreable. Ca, seul l'eleve
 * peut le dire.
 *
 * Lancer : npm run test:sons
 */
import { _electron as electron } from 'playwright';
import os from 'node:os';
import { join } from 'node:path';

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

const application = await electron.launch({
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-sons-${Date.now()}`)}`],
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });

process.stdout.write('\nEffets sonores\n\n');

/* --- Ce qui sort vraiment des haut-parleurs ------------------------------ */

const mesures = await page.evaluate(async () => {
  const { composer, dureeSon, NOMS_SONS } = await import('app://app/js/core/sons.js');
  const resultats = {};

  for (const nom of NOMS_SONS) {
    const duree = dureeSon(nom);
    const echantillonnage = 44100;
    const contexte = new OfflineAudioContext(1, Math.ceil((duree + 0.05) * echantillonnage), echantillonnage);

    composer(contexte, nom, 0);
    const rendu = await contexte.startRendering();
    const donnees = rendu.getChannelData(0);

    let crete = 0;
    let somme = 0;
    let passagesParZero = 0;
    for (let i = 0; i < donnees.length; i += 1) {
      const valeur = Math.abs(donnees[i]);
      if (valeur > crete) crete = valeur;
      somme += donnees[i] * donnees[i];
      if (i > 0 && Math.sign(donnees[i]) !== Math.sign(donnees[i - 1])) passagesParZero += 1;
    }

    resultats[nom] = {
      duree,
      crete,
      rms: Math.sqrt(somme / donnees.length),
      // Le taux de passages par zero distingue des sons de hauteurs
      // differentes : c'est une empreinte grossiere mais suffisante.
      hauteur: Math.round((passagesParZero / (donnees.length / echantillonnage)) / 2),
    };
  }
  return resultats;
});

for (const [nom, m] of Object.entries(mesures)) {
  verifier(
    `« ${nom} » produit vraiment du son`,
    m.crete > 0.01 && m.rms > 0.001,
    `crete ${m.crete.toFixed(3)}, rms ${m.rms.toFixed(4)}`
  );
  verifier(
    `« ${nom} » reste court (< 400 ms)`,
    m.duree > 0 && m.duree < 0.4,
    `${Math.round(m.duree * 1000)} ms`
  );
  // Un son d'interface qui sature est un son qu'on finit par couper.
  verifier(
    `« ${nom} » reste discret (crete <= 0,3)`,
    m.crete <= 0.3,
    `crete ${m.crete.toFixed(3)}`
  );
}

const hauteurs = Object.values(mesures).map((m) => m.hauteur);
verifier(
  'les trois sons se distinguent a l oreille',
  new Set(hauteurs).size === hauteurs.length,
  `hauteurs mesurees : ${JSON.stringify(hauteurs)}`
);

// La reussite monte, l'erreur descend : ce n'est pas de la decoration, c'est
// ce qui rend le son comprehensible sans l'avoir appris.
const sens = await page.evaluate(async () => {
  const { composer, dureeSon } = await import('app://app/js/core/sons.js');
  const ECHANTILLONNAGE = 44100;

  const lire = async (nom) => {
    // On rend EXACTEMENT la duree du son. Rendre plus long remplirait la
    // seconde moitie de silence, qui ne contient aucun passage par zero : on
    // mesurerait alors la queue de silence, pas la hauteur. C'est l'erreur
    // qui a fait echouer ce test la premiere fois.
    const duree = dureeSon(nom);
    const contexte = new OfflineAudioContext(1, Math.ceil(duree * ECHANTILLONNAGE), ECHANTILLONNAGE);
    composer(contexte, nom, 0);
    const donnees = (await contexte.startRendering()).getChannelData(0);

    // Passages par zero par seconde de son REEL : les echantillons trop
    // faibles sont ignores, sinon la decroissance de chaque note fausserait
    // la mesure.
    const hauteurDe = (debut, fin) => {
      let passages = 0;
      let actifs = 0;
      for (let i = debut + 1; i < fin; i += 1) {
        if (Math.abs(donnees[i]) < 0.005) continue;
        actifs += 1;
        if (Math.sign(donnees[i]) !== Math.sign(donnees[i - 1])) passages += 1;
      }
      return actifs ? Math.round((passages * ECHANTILLONNAGE) / actifs / 2) : 0;
    };

    const moitie = Math.floor(donnees.length / 2);
    return { debut: hauteurDe(0, moitie), fin: hauteurDe(moitie, donnees.length) };
  };
  return { reussite: await lire('reussite'), erreur: await lire('erreur') };
});

verifier(
  'le son de reussite monte',
  sens.reussite.fin > sens.reussite.debut,
  JSON.stringify(sens.reussite)
);
verifier(
  'le son d erreur descend',
  sens.erreur.fin < sens.erreur.debut,
  JSON.stringify(sens.erreur)
);

/* --- Le reglage decide, et il est respecte ------------------------------- */

const reglage = await page.evaluate(async () => {
  const { jouerSon } = await import('app://app/js/core/sons.js');
  const store = await import('app://app/js/core/store.js');

  store.definirReglage('sons', false);
  const coupe = jouerSon('reussite');

  store.definirReglage('sons', true);
  const actif = jouerSon('reussite');

  const inconnu = jouerSon('nexiste-pas');
  return { coupe, actif, inconnu, defautWeb: null };
});

verifier('reglage coupe : aucun son', reglage.coupe === false, String(reglage.coupe));
verifier('reglage actif : un son part', reglage.actif === true, String(reglage.actif));
verifier('un nom de son inconnu ne plante pas', reglage.inconnu === false, String(reglage.inconnu));

/* --- Le defaut, identique des deux cotes --------------------------------- */

const defauts = await page.evaluate(async () => {
  const infos = await window.cwm.infos();
  return { plateforme: infos.plateforme };
});

// Les deux profils vierges — celui d'Electron et celui du pont web — doivent
// declarer le meme defaut, sinon le bureau et le web divergeraient en silence.
const { readFileSync } = await import('node:fs');
const bureau = /sons:\s*true/.test(readFileSync('electron/services/profil.js', 'utf8'));
const web = /sons:\s*true/.test(readFileSync('web/pont-navigateur.js', 'utf8'));
verifier('le son est actif par defaut sur le bureau', bureau);
verifier('le son est actif par defaut sur le web', web, `plateforme testee : ${defauts.plateforme}`);

await application.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
