/**
 * Bac a sable : un editeur libre par langage.
 *
 * Aucune consigne, aucune correction, aucune XP. C'est volontaire : apres
 * avoir appris une notion, un debutant a besoin d'essayer sans etre juge. Le
 * code est conserve d'une session a l'autre, pour qu'il retrouve ses essais.
 */
import { h, remplir, attendre } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { naviguer } from '../core/routeur.js';
import { icone, medaillonLogo } from '../icones.js';
import { PARCOURS, parcoursParId } from '../../content/parcours.js';
import { Editeur } from '../editeur.js';
import { moteurPython } from '../runners/python.js';
import { ToileTortue } from '../runners/tortue-canvas.js';
import { MoteurWeb, pageAutonome } from '../runners/web.js';
import { executerCpp } from '../runners/cpp.js';
import * as bit from '../mascotte.js';

const DEPART = {
  python: `# Bac à sable Python — essaie ce que tu veux !
import turtle

turtle.speed(0)
for i in range(36):
    turtle.pencolor("#00E5FF")
    turtle.forward(120)
    turtle.left(170)

print("À toi de jouer !")
`,
  html: `<h1>Ma page d'essai</h1>
<p>Écris ce que tu veux ici, ça s'affiche tout de suite à droite.</p>
<button onclick="alert('Salut !')">Clique-moi</button>
`,
  css: `body {
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #00E5FF, #B14BFF);
  color: white;
  padding: 40px;
}

h1 {
  font-size: 42px;
}
`,
  javascript: `// Bac à sable JavaScript
let total = 0;
for (let i = 1; i <= 10; i++) {
  total = total + i;
}
console.log("La somme de 1 à 10 vaut", total);

document.body.innerHTML = "<h1 style='font-family:sans-serif'>Salut !</h1>";
`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Bac à sable C++" << endl;
    for (int i = 1; i <= 5; i++) {
        cout << i << " x 7 = " << i * 7 << endl;
    }
    return 0;
}
`,
};

const EST_WEB = new Set(['html', 'css', 'javascript']);

export function ecranBacASable(langageDemande) {
  const langage = parcoursParId(langageDemande) ? langageDemande : 'python';
  const parcours = parcoursParId(langage);
  const estWeb = EST_WEB.has(langage);

  const etat = { editeur: null, moteurWeb: null, toile: null, enExecution: false, detacher: [] };

  /* ------------------------------------------------------------ console -- */

  const console_ = h('div.console', { role: 'log', 'aria-live': 'polite' });
  const ecrire = (contenu, flux = 'sortie') => {
    console_.append(h(`span.console__${flux === 'erreur' ? 'erreur' : 'texte'}`, contenu));
    console_.scrollTop = console_.scrollHeight;
  };

  /* ------------------------------------------------------------ panneaux -- */

  const canevas = h('canvas.toile-tortue');
  const cadreApercu = h('iframe.apercu');
  const panneaux = {};
  const onglets = [];

  function definirOnglet(nom) {
    for (const [cle, element] of Object.entries(panneaux)) element.hidden = cle !== nom;
    for (const bouton of onglets) bouton.classList.toggle('onglet--actif', bouton.dataset.onglet === nom);
    if (nom === 'dessin') etat.toile?.redimensionner();
  }

  const definitions = estWeb
    ? [
        ['apercu', t('atelier.apercu'), 'apercu'],
        ['console', t('atelier.console'), 'console'],
      ]
    : langage === 'python'
      ? [
          ['console', t('atelier.console'), 'console'],
          ['dessin', t('atelier.dessin'), 'dessin'],
        ]
      : [['console', t('atelier.console'), 'console']];

  const barreOnglets = h(
    'div.onglets',
    definitions.map(([cle, libelle, nomIcone]) => {
      const bouton = h(
        'button.onglet',
        { dataset: { onglet: cle }, onclick: () => definirOnglet(cle) },
        icone(nomIcone),
        libelle
      );
      onglets.push(bouton);
      return bouton;
    })
  );

  panneaux.console = h('div.panneau', console_);
  if (estWeb) panneaux.apercu = h('div.panneau.panneau--apercu', cadreApercu);
  if (langage === 'python') panneaux.dessin = h('div.panneau.panneau--dessin', canevas);

  /* ----------------------------------------------------------- execution -- */

  const boutonExecuter = h('button.bouton.bouton--principal', { onclick: () => executer() }, icone('executer'), t('atelier.executer'));
  const boutonArreter = h(
    'button.bouton',
    {
      hidden: true,
      onclick: () => {
        if (langage === 'python') moteurPython().arreter();
        else finExecution({ arrete: true });
      },
    },
    icone('arreter'),
    t('atelier.arreter')
  );

  function finExecution({ arrete = false } = {}) {
    etat.enExecution = false;
    boutonExecuter.hidden = false;
    boutonArreter.hidden = true;
    etat.toile?.terminer();
    console_.append(
      h(
        'div.console__fin',
        h('span.console__fin__ligne', icone(arrete ? 'arreter' : 'reussi'), arrete ? t('atelier.arrete') : t('atelier.termine'))
      )
    );
    console_.scrollTop = console_.scrollHeight;
  }

  async function executer() {
    if (etat.enExecution) return;
    etat.enExecution = true;
    boutonExecuter.hidden = true;
    boutonArreter.hidden = false;
    console_.replaceChildren();
    etat.toile?.effacer();
    bit.reagirExecution();

    const code = etat.editeur.valeurImmediate();

    if (langage === 'python') return executerPython(code);
    if (langage === 'cpp') return executerCppIci(code);
    return executerWeb(code);
  }

  async function executerPython(code) {
    definirOnglet('console');
    const moteur = moteurPython();

    if (!moteur.pret) {
      console_.append(
        h(
          'div.console__chargement',
          h('div.chargement__barre', h('div.chargement__jauge')),
          h('div', t('atelier.chargementPython'))
        )
      );
    }

    const poser = (evenement, rappel) => {
      moteur.sur(evenement, rappel);
      etat.detacher.push(() => {
        const liste = moteur.ecouteurs[evenement] || [];
        const index = liste.indexOf(rappel);
        if (index >= 0) liste.splice(index, 1);
      });
    };
    const nettoyer = () => {
      for (const detacher of etat.detacher) detacher();
      etat.detacher = [];
    };

    poser('sortie', (lignes) => {
      console_.querySelector('.console__chargement')?.remove();
      for (const { flux, texte: contenu } of lignes) ecrire(contenu, flux);
    });
    poser('dessin', (commandes) => {
      etat.toile?.ajouter(commandes);
      if (commandes.some((c) => c.c === 'ligne' || c.c === 'point' || c.c === 'remplir')) definirOnglet('dessin');
    });
    poser('entree', () => demanderSaisie((reponse) => moteur.repondre(reponse)));
    poser('erreur', (message) => {
      console_.querySelector('.console__chargement')?.remove();
      ecrire(`${message}\n`, 'erreur');
      bit.reagirErreur();
      finExecution();
      nettoyer();
    });
    poser('termine', ({ arrete }) => {
      console_.querySelector('.console__chargement')?.remove();
      finExecution({ arrete });
      nettoyer();
    });

    await moteur.executer(code);
  }

  function demanderSaisie(repondre) {
    const champ = h('input.saisie__champ', { type: 'text', 'aria-label': t('atelier.entrerValeur') });
    const envoyer = () => {
      const valeur = champ.value;
      ligne.replaceWith(h('div.console__saisie', `> ${valeur}`));
      repondre(valeur);
    };
    const ligne = h(
      'div.saisie',
      champ,
      h('button.bouton.bouton--petit.bouton--principal', { onclick: envoyer }, t('atelier.envoyer'))
    );
    champ.addEventListener('keydown', (evenement) => {
      if (evenement.key === 'Enter') {
        evenement.preventDefault();
        envoyer();
      }
    });
    console_.append(ligne);
    champ.focus();
  }

  async function executerCppIci(code) {
    definirOnglet('console');
    const resultat = await executerCpp(code, zoneEntree?.value ?? '');
    if (resultat.sortie) ecrire(resultat.sortie);
    if (!resultat.ok) {
      ecrire(`\n${resultat.erreur}\n`, 'erreur');
      if (resultat.explication) {
        console_.append(
          h('div.console__explication', h('span.console__fin__ligne', icone('indice'), resultat.explication))
        );
      }
      bit.reagirErreur();
    }
    finExecution();
  }

  async function executerWeb(code) {
    definirOnglet('apercu');
    await etat.moteurWeb.rendre(zonesWeb(code));
    finExecution();
  }

  /** Le bac a sable n'a qu'un editeur : on place le code dans la bonne zone. */
  function zonesWeb(code) {
    if (langage === 'html') return { html: code, css: '', js: '' };
    if (langage === 'css') return { html: EXEMPLE_HTML_POUR_CSS, css: code, js: '' };
    return { html: '', css: '', js: code };
  }

  const EXEMPLE_HTML_POUR_CSS = `
    <h1>Un titre</h1>
    <p>Un paragraphe pour voir tes styles s'appliquer.</p>
    <button>Un bouton</button>
  `;

  /* ------------------------------------------------------ enregistrement -- */

  async function enregistrerProjet() {
    const code = etat.editeur.valeurImmediate();
    const titre = window.prompt(
      texte({ fr: 'Nom de ton projet :', en: 'Name your project:' }),
      texte({ fr: 'Essai libre', en: 'Free experiment' })
    );
    if (!titre) return;

    try {
      await window.cwm.projets.enregistrer({
        titre,
        langage: estWeb ? 'web' : langage,
        code: estWeb ? pageAutonome({ ...zonesWeb(code), titre }) : code,
        apercu: langage === 'python' && etat.toile?.aDuContenu() ? etat.toile.versImage() : null,
      });
      bit.parler({ fr: 'Enregistré dans tes projets !', en: 'Saved to your projects!' }, 3000);
    } catch (erreur) {
      ecrire(`${erreur?.message || erreur}\n`, 'erreur');
    }
  }

  /* ---------------------------------------------------------- C++ : entree */

  let zoneEntree = null;
  const blocEntree =
    langage === 'cpp'
      ? (() => {
          zoneEntree = h('textarea.entree-cpp__zone', {
            rows: 2,
            spellcheck: false,
            placeholder: texte({ fr: 'Une réponse par ligne…', en: 'One answer per line…' }),
          });
          return h(
            'div.entree-cpp',
            h('label.entree-cpp__titre', icone('clavier'), texte({ fr: 'Ce que tu taperas au clavier', en: 'What you will type' })),
            zoneEntree
          );
        })()
      : null;

  /* --------------------------------------------------------------- ecran -- */

  const hoteEditeur = h('div.editeur');

  const racine = h(
    'div.bac',
    { style: { '--teinte': parcours.couleur } },
    h(
      'header.bac__entete',
      h(
        'div.bac__titre',
        h('h1', t('bac.titre')),
        h('p.scene__sous', t('bac.note'))
      ),
      h(
        'div.bac__langages',
        PARCOURS.map((element) =>
          h(
            'button.bac__langage',
            {
              'aria-pressed': String(element.id === langage),
              style: { '--teinte': element.couleur },
              onclick: () => naviguer(`/bac-a-sable/${element.id}`),
              title: element.nom,
            },
            medaillonLogo(element.logo, { classe: 'medaillon--petit', titre: element.nom }),
            h('span', element.nom)
          )
        )
      )
    ),
    h(
      'div.bac__atelier',
      h(
        'section.atelier__centre',
        h(
          'div.atelier__barre',
          h('span.surtitre.atelier__etiquette', t('atelier.tonCode')),
          h(
            'div.atelier__actions',
            h(
              'button.bouton.bouton--fantome.bouton--petit.infobulle',
              {
                'data-infobulle': t('atelier.reinitialiser'),
                onclick: () => etat.editeur.definirValeur(DEPART[langage] ?? ''),
              },
              icone('reinitialiser')
            ),
            h(
              'button.bouton.bouton--petit',
              { onclick: enregistrerProjet },
              icone('enregistrer'),
              texte({ fr: 'Enregistrer', en: 'Save' })
            ),
            boutonArreter,
            boutonExecuter
          )
        ),
        hoteEditeur
      ),
      h(
        'section.atelier__resultat',
        h('div.atelier__barre', barreOnglets),
        h('div.panneau-hote', Object.values(panneaux)),
        blocEntree
      )
    )
  );

  /* ------------------------------------------------------------ montage -- */

  const enregistrerCode = attendre((code) => store.ecrireBacASable(langage, code), 600);

  etat.editeur = new Editeur(hoteEditeur, {
    langage,
    valeur: store.lireBacASable(langage) ?? DEPART[langage] ?? '',
    surChangement: (code) => {
      enregistrerCode(code);
      if (estWeb && langage !== 'javascript') rendreDirect(code);
    },
    surExecution: executer,
  });

  const rendreDirect = attendre((code) => etat.moteurWeb?.rendre(zonesWeb(code)), 260);

  if (langage === 'python') {
    etat.toile = new ToileTortue(canevas);
    moteurPython().demarrer().catch(() => {});
  }

  if (estWeb) {
    etat.moteurWeb = new MoteurWeb(cadreApercu);
    etat.moteurWeb.sur('console', ({ niveau, texte: contenu }) =>
      ecrire(`${contenu}\n`, niveau === 'erreur' ? 'erreur' : 'sortie')
    );
    etat.moteurWeb.sur('erreur', ({ message }) => {
      ecrire(`${message}\n`, 'erreur');
      definirOnglet('console');
    });
    etat.moteurWeb.charger().then(() => rendreDirect(etat.editeur.valeurImmediate()));
  }

  definirOnglet(estWeb ? 'apercu' : 'console');

  const surRedimension = () => etat.toile?.redimensionner();
  window.addEventListener('resize', surRedimension);

  racine.detruire = () => {
    window.removeEventListener('resize', surRedimension);
    for (const detacher of etat.detacher) detacher();
    if (etat.enExecution && langage === 'python') moteurPython().arreter();
    etat.moteurWeb?.detruire();
    etat.editeur?.detruire();
  };

  return racine;
}
