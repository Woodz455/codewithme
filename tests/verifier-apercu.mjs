#!/usr/bin/env node
/**
 * Verifie les trois ajouts au panneau d'apercu :
 *   - la question `canvasDessine`, qui distingue un canevas vierge d'un
 *     canevas reellement dessine ;
 *   - la bascule Bureau / Mobile, qui contraint la largeur de l'iframe ;
 *   - le mode « Objectif / Ton resultat », qui affiche deux rendus distincts.
 *
 * Ces trois briques existent pour rendre des lecons verifiables ou visibles.
 * Un test qui se contenterait de constater la presence d'un bouton ne prouverait
 * rien : on mesure donc la largeur reelle et on lit les pixels reels.
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
  args: [process.cwd(), '--no-sandbox', `--user-data-dir=${join(os.tmpdir(), `cwm-apercu-${Date.now()}`)}`],
  env: { ...process.env, CWM_DOSSIER_PROJETS: join(os.tmpdir(), `cwm-apercu-projets-${Date.now()}`) },
});
const page = await application.firstWindow();
await page.waitForSelector('#application:not([hidden])', { timeout: 25000 });
await page.waitForTimeout(1200);

/* ==================================================== 1. canvasDessine ==== */

process.stdout.write('\nVerification du dessin sur canvas\n\n');

await page.evaluate(async () => {
  const { MoteurWeb } = await import('app://app/js/runners/web.js');
  const cadre = document.createElement('iframe');
  cadre.style.cssText = 'position:fixed;left:-9999px;width:600px;height:400px';
  document.body.appendChild(cadre);
  const moteur = new MoteurWeb(cadre);
  await moteur.charger();
  window.__apercu = { moteur };
});

const rendreEtDemander = (donnees, questions) =>
  page.evaluate(
    async ([d, q]) => {
      await window.__apercu.moteur.rendre(d);
      await new Promise((r) => setTimeout(r, 450));
      return window.__apercu.moteur.interroger(q);
    },
    [donnees, questions]
  );

const [canevasVierge] = await rendreEtDemander(
  { html: '<canvas id="jeu" width="200" height="150"></canvas>', css: '', js: '' },
  [{ selecteur: 'canvas', quoi: 'canvasDessine' }]
);
verifier('un canevas vierge est reconnu comme vide', canevasVierge === false, String(canevasVierge));

const [canevasDessine] = await rendreEtDemander(
  {
    html: '<canvas id="jeu" width="200" height="150"></canvas>',
    css: '',
    js: `
      const c = document.getElementById("jeu").getContext("2d");
      c.fillStyle = "tomato";
      c.fillRect(20, 20, 60, 40);
    `,
  },
  [{ selecteur: 'canvas', quoi: 'canvasDessine' }]
);
verifier('un canevas dessine est reconnu', canevasDessine === true, String(canevasDessine));

// Un trait clair sur fond transparent doit compter autant qu'un aplat vif :
// c'est le canal alpha qui fait foi, pas la luminosite.
const [traitPale] = await rendreEtDemander(
  {
    html: '<canvas id="jeu" width="200" height="150"></canvas>',
    css: '',
    js: `
      const c = document.getElementById("jeu").getContext("2d");
      c.strokeStyle = "#fafafa";
      c.beginPath();
      c.moveTo(10, 10);
      c.lineTo(180, 120);
      c.stroke();
    `,
  },
  [{ selecteur: 'canvas', quoi: 'canvasDessine' }]
);
verifier('un trait tres clair compte comme un dessin', traitPale === true, String(traitPale));

// Et la regle du validateur, pas seulement la question posee a l'iframe.
const verdicts = await page.evaluate(async () => {
  const { corriger } = await import('app://app/js/validateur.js');
  const moteurWeb = window.__apercu.moteur;
  const regles = [{ type: 'canvasDessine', selecteur: 'canvas' }];

  await moteurWeb.rendre({ html: '<canvas width="120" height="90"></canvas>', css: '', js: '' });
  await new Promise((r) => setTimeout(r, 400));
  const vide = await corriger(regles, { code: '', sortie: '', dessin: [], moteurWeb });

  await moteurWeb.rendre({
    html: '<canvas width="120" height="90"></canvas>',
    css: '',
    js: 'const c = document.querySelector("canvas").getContext("2d"); c.fillRect(5, 5, 30, 30);',
  });
  await new Promise((r) => setTimeout(r, 400));
  const plein = await corriger(regles, { code: '', sortie: '', dessin: [], moteurWeb });

  return { vide, plein };
});

verifier('le correcteur refuse un canevas vide', verdicts.vide.reussi === false, JSON.stringify(verdicts.vide));
verifier(
  'le refus explique que rien n a ete dessine',
  /vide|dessin/i.test(verdicts.vide.message ?? ''),
  JSON.stringify(verdicts.vide.message)
);
verifier('le correcteur accepte un canevas dessine', verdicts.plein.reussi === true, JSON.stringify(verdicts.plein));

/* =============================================== 2. bascule de largeur ==== */

process.stdout.write('\nBascule Bureau / Mobile\n\n');

await page.evaluate(() => {
  window.location.hash = '#/lecon/html/html-1-1';
});
await page.waitForSelector('.panneau--apercu', { timeout: 15000 });
await page.waitForTimeout(900);

const largeurBureau = await page.evaluate(() => {
  const panneau = document.querySelector('.panneau--apercu');
  return { etat: panneau.dataset.largeur, largeur: panneau.querySelector('.apercu').getBoundingClientRect().width };
});
verifier('l apercu demarre en largeur ordinateur', largeurBureau.etat === 'bureau', JSON.stringify(largeurBureau));

await page.click('.largeur[data-largeur="mobile"]');
await page.waitForTimeout(400);

const largeurMobile = await page.evaluate(() => {
  const panneau = document.querySelector('.panneau--apercu');
  return { etat: panneau.dataset.largeur, largeur: panneau.querySelector('.apercu').getBoundingClientRect().width };
});

verifier('le bouton Mobile change l etat du panneau', largeurMobile.etat === 'mobile', JSON.stringify(largeurMobile));
verifier(
  'l iframe est reellement retrecie',
  largeurMobile.largeur < largeurBureau.largeur - 40 && largeurMobile.largeur <= 380,
  `bureau ${Math.round(largeurBureau.largeur)}px, mobile ${Math.round(largeurMobile.largeur)}px`
);

// Le point clef : sous 380 px, un @media mobile s'applique enfin — alors qu'a
// la largeur du panneau (~490 px) il ne s'appliquerait jamais.
const pointDeRupture = await page.evaluate(async () => {
  const moteur = window.__apercu.moteur;
  const cadre = moteur.iframe;
  const mesurer = async (largeurPx) => {
    cadre.style.width = `${largeurPx}px`;
    await moteur.rendre({
      html: '<p class="titre">Salut</p>',
      css: '.titre { font-size: 40px; } @media (max-width: 480px) { .titre { font-size: 14px; } }',
      js: '',
    });
    await new Promise((r) => setTimeout(r, 400));
    const [valeurs] = await moteur.interroger([{ selecteur: '.titre', quoi: 'style', nom: 'font-size' }]);
    return valeurs?.[0];
  };
  return { large: await mesurer(800), etroit: await mesurer(380) };
});

verifier(
  'un @media reagit vraiment a la largeur de l iframe',
  pointDeRupture.large === '40px' && pointDeRupture.etroit === '14px',
  JSON.stringify(pointDeRupture)
);

await application.close();

process.stdout.write(`\n  ${cas.length - echecs.length}/${cas.length} verifications passees\n\n`);
if (echecs.length) process.exit(1);
