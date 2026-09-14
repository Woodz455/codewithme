#!/usr/bin/env node
/**
 * Le site REELLEMENT en ligne, chez son hebergeur.
 *
 * `npm run test:web` construit le site et le sert lui-meme, avec des en-tetes
 * fabriques depuis les memes constantes que celles qui ecrivent `_headers`
 * (`ISOLATION` et `CSP`, dans `tools/web-commun.mjs`). C'est une bonne garantie
 * sur le CONTENU des en-tetes — et elle ne dit rien sur l'hebergeur.
 *
 * Or c'est la que la mise en ligne peut echouer en silence. Si Cloudflare
 * ignorait `_headers`, le site s'ouvrirait normalement, les lecons
 * s'afficheraient, et SEUL l'input() de Python cesserait de bloquer : la
 * console poserait la question puis passerait a la suite sans ecouter. Un
 * defaut discret, invisible depuis le code, et que seule une mesure sur
 * l'adresse publique peut attraper.
 *
 * Ce controle n'est pas dans la chaine `npm test` : il lui faut un site en
 * ligne et un reseau, deux choses qu'une integration continue hors ligne n'a
 * pas.
 *
 * Lancer : npm run test:enligne -- https://mon-projet.pages.dev
 */
import { ouvrirNavigateur } from '../tools/navigateur.mjs';

const adresse = (process.argv[2] || '').replace(/\/+$/, '');

if (!adresse || !/^https?:\/\//.test(adresse)) {
  process.stderr.write(
    '\n  Il faut l adresse du site :\n' +
      '    npm run test:enligne -- https://mon-projet.pages.dev\n\n'
  );
  process.exit(2);
}

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

/**
 * Sans isolation d'origine, le moteur Python ne demarre pas : `page.evaluate`
 * leve alors, et le controle mourrait ici — juste avant de rendre son verdict.
 * Or c'est precisement le cas qu'on cherche a diagnostiquer. On rattrape donc,
 * pour que l'echec soit COMPTE et que les controles suivants aient lieu.
 *
 * On borne AUSSI l'attente. `page.evaluate` n'a aucun delai par defaut : une
 * promesse qui ne se resout jamais — `navigator.serviceWorker.ready` sur un
 * site ou le worker ne s'active pas — bloquerait le controle sans fin. Mesure :
 * 13 minutes sur un runner GitHub avant annulation a la main. Un controle qui
 * peut pendre indefiniment ne vaut pas mieux qu'un controle absent.
 */
const sansCasser = async (quoi, parDefaut, delaiMs = 120000) => {
  const expire = Symbol('expire');
  let minuteur;
  try {
    const resultat = await Promise.race([
      quoi(),
      new Promise((r) => {
        minuteur = setTimeout(() => r(expire), delaiMs);
      }),
    ]);
    if (resultat === expire) {
      return { ...parDefaut, echec: `aucune reponse apres ${Math.round(delaiMs / 1000)} s` };
    }
    return resultat;
  } catch (erreur) {
    return { ...parDefaut, echec: String(erreur?.message || erreur).split('\n')[0] };
  } finally {
    clearTimeout(minuteur);
  }
};

process.stdout.write(`\nSite en ligne — ${adresse}\n`);

/* ============================================== 1. LES EN-TETES, BRUTS ==== */

process.stdout.write('\nEn-tetes servis par l hebergeur\n\n');

/** Lit les en-tetes d'une vraie reponse HTTP, sans navigateur. */
async function entetesDe(chemin) {
  const reponse = await fetch(`${adresse}${chemin}`, { redirect: 'follow' });
  const entetes = {};
  reponse.headers.forEach((valeur, nom) => {
    entetes[nom.toLowerCase()] = valeur;
  });
  return { statut: reponse.status, entetes };
}

let racine;
try {
  racine = await entetesDe('/');
} catch (erreur) {
  process.stderr.write(`\n  Le site ne repond pas : ${erreur?.message || erreur}\n\n`);
  process.exit(1);
}

verifier('la page d accueil repond', racine.statut === 200, `statut ${racine.statut}`);

// Les deux en-tetes qui decident de tout. Leur absence ne casse rien de
// visible : elle enleve SharedArrayBuffer, donc l'input() bloquant de Python.
verifier(
  'Cross-Origin-Opener-Policy: same-origin',
  racine.entetes['cross-origin-opener-policy'] === 'same-origin',
  racine.entetes['cross-origin-opener-policy'] || 'absent — l hebergeur n applique pas _headers'
);
verifier(
  'Cross-Origin-Embedder-Policy: require-corp',
  racine.entetes['cross-origin-embedder-policy'] === 'require-corp',
  racine.entetes['cross-origin-embedder-policy'] || 'absent — l hebergeur n applique pas _headers'
);

// L'apercu porte sa PROPRE regle dans `_headers`, repetee volontairement
// plutot qu'heritee : les hebergeurs ne s'accordent pas sur la fusion de deux
// regles qui correspondent, et une iframe qui perdrait son isolation ferait
// perdre a la page entiere son SharedArrayBuffer.
const apercu = await entetesDe('/apercu/apercu.html');
verifier('la page d apercu repond', apercu.statut === 200, `statut ${apercu.statut}`);
// Un hebergeur qui ADDITIONNE les regles envoie l'en-tete deux fois, et
// `fetch` les joint : « require-corp, require-corp ». C'est redondant mais sans
// effet — mesure faite sur le site publie, ou crossOriginIsolated valait bien
// true. En revanche « require-corp, unsafe-none » serait un vrai conflit : on
// exige donc que CHAQUE valeur recue soit la bonne, pas qu'il y en ait une.
const coepApercu = apercu.entetes['cross-origin-embedder-policy'] || '';
verifier(
  'l apercu porte lui aussi l isolation',
  coepApercu.split(',').map((v) => v.trim()).filter(Boolean).every((v) => v === 'require-corp') &&
    coepApercu !== '',
  coepApercu || 'absent — la regle /apercu/* n est pas appliquee'
);

// Deux politiques sur un meme document s'intersectent : c'est ce qui a tue
// l'apercu du site publie. Une seule, donc.
const cspApercu = apercu.entetes['content-security-policy'] || '';
verifier(
  'l apercu ne recoit qu UNE politique de securite',
  cspApercu.split('default-src').length - 1 <= 1,
  cspApercu.length > 160 ? `${cspApercu.slice(0, 160)}…` : cspApercu
);
verifier(
  'l apercu a sa propre politique de securite',
  (apercu.entetes['content-security-policy'] || '').includes("script-src 'self' 'unsafe-inline'"),
  apercu.entetes['content-security-policy'] || 'absente'
);

/* ================================================ 2. DANS UN NAVIGATEUR === */

process.stdout.write('\nDans un navigateur ordinaire\n\n');

const navigateur = await ouvrirNavigateur();
const contexte = await navigateur.newContext();
const page = await contexte.newPage();

const manquants = [];
const erreursPage = [];
page.on('response', (r) => {
  if (r.status() >= 400) manquants.push(`${r.status()} ${new URL(r.url()).pathname}`);
});
page.on('pageerror', (e) => erreursPage.push(String(e?.message || e)));

let demarre = true;
await page.goto(adresse, { waitUntil: 'domcontentloaded' });
try {
  await page.waitForSelector('#application:not([hidden])', { timeout: 40000 });
} catch {
  demarre = false;
}
verifier('l application demarre', demarre, erreursPage.join(' | '));

// Premiere visite : le profil est vierge, la presentation doit s ouvrir.
let bienvenue = true;
try {
  await page.waitForSelector('#bienvenue:not([hidden])', { timeout: 10000 });
} catch {
  bienvenue = false;
}
verifier('l accueil du premier lancement s ouvre', bienvenue);
if (bienvenue) {
  await page.click('.bienvenue__passer');
  await page.waitForTimeout(700);
}

// `infos()` passe par le pont et rend une promesse : la lire sans l'attendre
// donnerait `undefined` — et un controle qui compare undefined a 'web' echoue
// pour une raison qui n'a rien a voir avec l'hebergeur.
const etat = await sansCasser(() => page.evaluate(async () => ({
  isole: window.crossOriginIsolated,
  memoirePartagee: typeof SharedArrayBuffer === 'function',
  pont: typeof window.cwm === 'object' && window.cwm !== null,
  plateforme: (await window.cwm?.infos?.())?.plateforme,
})), {}, 30000);

// La consequence observable des deux en-tetes. C'est elle qui compte : un
// en-tete present mais mal interprete se verrait ici, pas plus haut.
verifier('la page est isolee (crossOriginIsolated)', etat.isole === true);
verifier(
  'SharedArrayBuffer est disponible',
  etat.memoirePartagee,
  "sans lui, l'input() de Python ne bloquerait plus"
);
verifier('le pont window.cwm est en place', etat.pont);
verifier('le pont s annonce comme navigateur', etat.plateforme === 'web', String(etat.plateforme));

const nombreLecons = await sansCasser(
  () =>
    page.evaluate(async () => {
      const { nombreLeconsTotal } = await import('/content/parcours.js');
      return nombreLeconsTotal();
    }),
  null,
  30000
);
verifier('les lecons publiees sont bien les 165', nombreLecons === 165, String(nombreLecons));

/* ======================================================= 3. PYTHON ======== */

process.stdout.write('\nPython, et le vrai test de l isolation\n\n');

const resultatPython = await sansCasser(() => page.evaluate(async () => {
  const { MoteurPython } = await import('/js/runners/python.js');
  const moteur = new MoteurPython();
  const sortie = [];
  const erreurs = [];
  let demandes = 0;

  const fini = new Promise((resoudre) => {
    moteur.sur('sortie', (lignes) => lignes.forEach((l) => sortie.push(l.texte)));
    moteur.sur('entree', () => {
      demandes += 1;
      // Le delai est delibere : si input() ne bloquait pas, le programme
      // serait deja fini quand la reponse arrive, et le test le verrait.
      setTimeout(() => moteur.repondre('Louis'), 300);
    });
    moteur.sur('erreur', (message) => {
      erreurs.push(message);
      resoudre();
    });
    moteur.sur('termine', () => resoudre());
  });

  await moteur.executer('nom = input("Ton prenom ? ")\nprint("Bonjour", nom, "!")\nprint(2 ** 10)');
  await Promise.race([fini, new Promise((r) => setTimeout(r, 180000))]);
  moteur.detruire();
  return { texte: sortie.join(''), erreurs, demandes };
}), { texte: '', erreurs: [], demandes: 0 }, 180000);

verifier(
  'un programme Python s execute',
  resultatPython.texte.includes('1024'),
  resultatPython.echec || `${resultatPython.texte} ${resultatPython.erreurs.join(' ')}`
);
verifier(
  "input() a VRAIMENT bloque et recu la reponse",
  resultatPython.texte.includes('Bonjour Louis'),
  resultatPython.echec || resultatPython.texte || resultatPython.erreurs.join(' ')
);

/* ============================== 4. UNE LECON DU NOUVEAU MODULE js-form === */

// Ce module est le seul dont le fonctionnement depend de la politique de
// securite posee sur /apercu/* : un formulaire envoye, intercepte, et une
// ligne fabriquee depuis le code.
process.stdout.write('\nUne lecon du module js-form, dans l apercu en ligne\n\n');

const resultatForm = await sansCasser(() => page.evaluate(async () => {
  const { MoteurWeb } = await import('/js/runners/web.js');
  const cadre = document.createElement('iframe');
  cadre.style.cssText = 'position:fixed;left:-9999px;width:800px;height:600px';
  document.body.append(cadre);
  const moteur = new MoteurWeb(cadre);
  await moteur.charger();

  await moteur.rendre({
    html: '<form id="f"><input id="entree" value="Réviser les maths"><button id="ajouter" type="submit">Ajouter</button></form><ul id="liste"></ul>',
    css: '',
    js: 'const f = document.querySelector("#f");\nconst entree = document.querySelector("#entree");\nconst liste = document.querySelector("#liste");\nf.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const texte = entree.value.trim();\n  if (texte === "") return;\n  const li = document.createElement("li");\n  li.textContent = texte;\n  liste.append(li);\n  entree.value = "";\n});',
  });
  await new Promise((r) => setTimeout(r, 700));

  const reponses = await moteur.interroger([
    { selecteur: '#ajouter', quoi: 'clic' },
    { selecteur: '#liste li', quoi: 'texte' },
  ]);
  return reponses[reponses.length - 1];
}), null);

verifier(
  'le formulaire est intercepte et la tache ajoutee',
  Array.isArray(resultatForm) && resultatForm[0] === 'Réviser les maths',
  JSON.stringify(resultatForm)
);

/* ==================================================== 5. HORS LIGNE ======= */

process.stdout.write('\nHors ligne\n\n');

const serviceWorkerPret = await sansCasser(
  () => page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    return true;
  }),
  false,
  60000
);
verifier('le service worker s installe', serviceWorkerPret === true, serviceWorkerPret?.echec || '');
await contexte.setOffline(true);

let horsLigne = false;
try {
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#application:not([hidden])', { timeout: 30000 });
  horsLigne = true;
} catch {
  /* reste faux */
}
verifier("le site s ouvre sans reseau", horsLigne);
await contexte.setOffline(false);

/* ========================================================== bilan ========= */

verifier('aucune ressource manquante', manquants.length === 0, manquants.join(', '));
verifier('aucune erreur JavaScript', erreursPage.length === 0, erreursPage.join(' | '));

await navigateur.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
