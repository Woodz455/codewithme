/**
 * Reglages.
 *
 * Peu d'options, mais celles qui comptent vraiment pour un collegien :
 * son prenom, le niveau d'animation, les sons, la mascotte, la taille du
 * texte — et la sauvegarde de sa progression, qui doit rester recuperable
 * s'il change d'ordinateur.
 */
import { h, remplir } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { icone } from '../icones.js';
import * as bit from '../mascotte.js';
import { jouerSon } from '../core/sons.js';

/** Ligne de reglage : un libelle, une explication, un controle. */
function ligne(titre, note, controle) {
  return h(
    'div.reglage',
    h('div.reglage__texte', h('div.reglage__titre', titre), note ? h('div.reglage__note', note) : null),
    h('div.reglage__controle', controle)
  );
}

function interrupteur(actif, surChangement) {
  const entree = h('input', {
    type: 'checkbox',
    checked: actif,
    onchange: (evenement) => surChangement(evenement.target.checked),
  });
  return h('label.interrupteur', entree, h('span.interrupteur__piste', h('span.interrupteur__pastille')));
}

export function ecranReglages() {
  const reglages = store.reglages();

  const zoneMessage = h('div.reglages-message', { hidden: true });
  const message = (contenu, type = 'info') => {
    zoneMessage.hidden = false;
    zoneMessage.dataset.type = type;
    remplir(zoneMessage, icone(type === 'erreur' ? 'attention' : 'reussi'), h('span', contenu));
  };

  /* --------------------------------------------------------- profil ----- */

  const champPrenom = h('input.champ', {
    type: 'text',
    value: store.etat().prenom || '',
    maxlength: '40',
    placeholder: texte({ fr: 'Ton prénom', en: 'Your first name' }),
    oninput: (evenement) => store.definirPrenom(evenement.target.value),
  });

  /* ------------------------------------------------------ apparence ----- */

  const choixTaille = ['normale', 'grande', 'tres-grande'];
  const libelleTaille = { normale: t('reglages.normale'), grande: t('reglages.grande'), 'tres-grande': t('reglages.tresGrande') };

  const selecteurTaille = h(
    'div.segments',
    choixTaille.map((valeur) =>
      h(
        'button.segments__choix',
        {
          type: 'button',
          'aria-pressed': String(reglages.taillePolice === valeur),
          onclick: (evenement) => {
            store.definirReglage('taillePolice', valeur);
            document.documentElement.dataset.police = valeur;
            for (const frere of evenement.target.parentElement.children) {
              frere.setAttribute('aria-pressed', String(frere === evenement.target));
            }
          },
        },
        libelleTaille[valeur]
      )
    )
  );

  /* ------------------------------------------------ progression --------- */

  const exporter = async () => {
    try {
      const resultat = await window.cwm.profil.exporter();
      if (!resultat.annule) {
        message(
          texte({
            fr: `Progression sauvegardée dans ${resultat.chemin}`,
            en: `Progress saved to ${resultat.chemin}`,
          })
        );
      }
    } catch (erreur) {
      message(String(erreur?.message || erreur), 'erreur');
    }
  };

  const importer = async () => {
    const confirme = window.confirm(
      texte({
        fr: 'Restaurer une sauvegarde remplacera ta progression actuelle. Continuer ?',
        en: 'Restoring a backup will replace your current progress. Continue?',
      })
    );
    if (!confirme) return;

    try {
      const resultat = await window.cwm.profil.importer();
      if (!resultat.annule) {
        await store.charger();
        message(
          texte({ fr: 'Progression restaurée. Recharge l’écran d’accueil.', en: 'Progress restored. Go back home.' })
        );
      }
    } catch (erreur) {
      message(String(erreur?.message || erreur), 'erreur');
    }
  };

  /* ------------------------------------------------------ code tuteur --- */

  const champCode = h('input.champ.champ--court', {
    type: 'text',
    inputmode: 'numeric',
    maxlength: '4',
    value: reglages.codeTuteur || '',
    placeholder: '––––',
    oninput: (evenement) => {
      const chiffres = evenement.target.value.replace(/\D/g, '').slice(0, 4);
      evenement.target.value = chiffres;
      store.definirReglage('codeTuteur', chiffres.length === 4 ? chiffres : null);
    },
  });

  /* ------------------------------------------------------------ ecran --- */

  return h(
    'div.ecran-reglages',
    h('header.scene__entete', h('h1.scene__titre', t('reglages.titre'))),
    zoneMessage,

    h(
      'section.carte.reglages-groupe',
      h('h2.surtitre', texte({ fr: 'Toi', en: 'You' })),
      ligne(
        t('reglages.prenom'),
        texte({ fr: 'Il apparaîtra sur ton accueil et sur tes certificats.', en: 'It appears on your home screen and certificates.' }),
        champPrenom
      )
    ),

    h(
      'section.carte.reglages-groupe',
      h('h2.surtitre', texte({ fr: 'Apparence', en: 'Appearance' })),
      ligne(
        t('reglages.animations'),
        texte({
          fr: 'Décoche si les animations te gênent ou ralentissent ton ordinateur.',
          en: 'Uncheck if animations bother you or slow your computer down.',
        }),
        interrupteur(reglages.animations !== false, (actif) => {
          store.definirReglage('animations', actif);
          document.documentElement.dataset.animations = actif ? 'normales' : 'reduites';
        })
      ),
      ligne(
        t('reglages.mascotte'),
        texte({ fr: 'Bit t’encourage et réagit à ton code.', en: 'Bit cheers you on and reacts to your code.' }),
        interrupteur(reglages.mascotte !== false, (actif) => {
          store.definirReglage('mascotte', actif);
          bit.definirVisibilite(actif);
        })
      ),
      ligne(
        t('reglages.sons'),
        texte({ fr: 'Petits sons de réussite et d’erreur.', en: 'Small success and error sounds.' }),
        interrupteur(reglages.sons === true, (actif) => {
          store.definirReglage('sons', actif);
          // Repondre tout de suite a la question que l'eleve se pose a cet
          // instant : « est-ce que ca marche ? ». Sans ce retour, il resterait
          // devant un interrupteur muet — exactement le defaut corrige ici.
          if (actif) jouerSon('reussite');
        })
      ),
      ligne(t('reglages.taillePolice'), null, selecteurTaille)
    ),

    h(
      'section.carte.reglages-groupe',
      h('h2.surtitre', texte({ fr: 'Ta progression', en: 'Your progress' })),
      ligne(
        t('reglages.exporterProfil'),
        texte({
          fr: 'Enregistre tout dans un fichier : leçons, XP, badges. Utile avant de changer d’ordinateur.',
          en: 'Saves everything to a file: lessons, XP, badges. Useful before changing computer.',
        }),
        h('button.bouton.bouton--petit', { onclick: exporter }, icone('telecharger'), t('reglages.exporterProfil'))
      ),
      ligne(
        t('reglages.importerProfil'),
        texte({
          fr: 'Remplace la progression actuelle par celle d’un fichier de sauvegarde.',
          en: 'Replaces current progress with a backup file.',
        }),
        h('button.bouton.bouton--petit.bouton--fantome', { onclick: importer }, icone('importer'), t('reglages.importerProfil'))
      )
    ),

    h(
      'section.carte.reglages-groupe',
      h('h2.surtitre', t('nav.tuteur')),
      ligne(
        texte({ fr: 'Code à 4 chiffres', en: '4-digit code' }),
        texte({
          fr: 'Facultatif. S’il est rempli, l’espace tuteur demandera ce code. Laisse vide pour un accès libre.',
          en: 'Optional. If set, the tutor area asks for this code. Leave empty for open access.',
        }),
        champCode
      )
    )
  );
}
