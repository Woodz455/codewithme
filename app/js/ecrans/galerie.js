/**
 * Galerie de projets — l'aboutissement visible du travail.
 *
 * Chaque projet est un VRAI fichier dans Documents\CodeWithMe\Mes projets\.
 * D'ou les actions proposees : ouvrir dans l'application pour retoucher, mais
 * aussi montrer le fichier dans l'explorateur et l'ouvrir dans le navigateur —
 * pour qu'il puisse envoyer sa page a sa famille ou la rendre en classe.
 */
import { h, remplir } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import { naviguer } from '../core/routeur.js';
import { icone, logo } from '../icones.js';
import { situerLecon } from '../../content/parcours.js';

const LOGO_PAR_LANGAGE = {
  web: 'html',
  python: 'python',
  cpp: 'cpp',
  javascript: 'javascript',
};

function dateLisible(iso) {
  try {
    return new Date(iso).toLocaleDateString(document.documentElement.lang, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function ecranGalerie() {
  const grille = h('div.galerie-grille');
  const racine = h(
    'div.ecran-galerie',
    h(
      'header.scene__entete',
      h('h1.scene__titre', t('galerie.titre')),
      h('p.scene__sous', h('span.chemin-projets'))
    ),
    grille
  );

  /** Vignette d'un projet : apercu reel s'il existe, logo du langage sinon. */
  function carteProjet(projet, rafraichir) {
    const langageLogo = LOGO_PAR_LANGAGE[projet.langage] || 'python';
    const situation = projet.leconId ? situerLecon(projet.leconId) : null;

    const apercu = projet.apercu
      ? h('img.projet__apercu', { src: projet.apercu, alt: '' })
      : h('div.projet__apercu.projet__apercu--vide', logo(langageLogo));

    const action = (nomIcone, libelle, surClic, classe = '') =>
      h(
        `button.bouton.bouton--petit.bouton--fantome.infobulle${classe}`,
        { 'data-infobulle': libelle, onclick: surClic, 'aria-label': libelle },
        icone(nomIcone)
      );

    return h(
      'article.carte.projet',
      { style: situation ? { '--teinte': situation.parcours.couleur } : null },
      apercu,
      h(
        'div.projet__corps',
        h('h3.projet__titre', projet.titre),
        h(
          'p.projet__meta',
          logo(langageLogo, { classe: 'projet__logo' }),
          h('span', projet.fichier),
          h('span.projet__date', dateLisible(projet.modifieLe))
        ),
        h(
          'div.projet__actions',
          projet.leconId
            ? h(
                'button.bouton.bouton--petit',
                { onclick: () => naviguer(`/lecon/${situation?.parcours.id ?? 'python'}/${projet.leconId}`) },
                icone('code'),
                t('galerie.ouvrir')
              )
            : null,
          projet.langage === 'web'
            ? action('ouvrirDehors', t('galerie.navigateur'), () =>
                window.cwm.projets.ouvrirDansNavigateur(projet.id).catch(signalerErreur)
              )
            : null,
          action('dossier', t('galerie.dossier'), () =>
            window.cwm.projets.ouvrirDossier(projet.id).catch(signalerErreur)
          ),
          action(
            'supprimer',
            t('galerie.supprimer'),
            async () => {
              const confirme = window.confirm(
                texte({
                  fr: `Supprimer « ${projet.titre} » ? Le fichier sera effacé de ton ordinateur.`,
                  en: `Delete "${projet.titre}"? The file will be removed from your computer.`,
                })
              );
              if (!confirme) return;
              await window.cwm.projets.supprimer(projet.id).catch(signalerErreur);
              rafraichir();
            },
            '.bouton--danger'
          )
        )
      )
    );
  }

  function signalerErreur(erreur) {
    console.error('Action sur un projet impossible :', erreur);
  }

  function etatVide() {
    return h(
      'div.galerie-vide.carte',
      h('div.galerie-vide__icone', icone('projets', { taille: '3rem' })),
      h('h2', t('galerie.vide')),
      h('p.scene__sous', t('galerie.videNote')),
      h(
        'button.bouton.bouton--principal',
        { onclick: () => naviguer('/accueil') },
        icone('executer'),
        t('accueil.continuer')
      )
    );
  }

  async function charger() {
    try {
      const [projets, infos] = await Promise.all([window.cwm.projets.lister(), window.cwm.infos()]);
      document.body.dataset.nombreProjets = String(projets.length);

      const chemin = racine.querySelector('.chemin-projets');
      if (chemin) {
        chemin.textContent = projets.length
          ? texte({
              fr: `Tes créations sont de vrais fichiers, rangés dans ${infos.dossierProjets}`,
              en: `Your creations are real files, stored in ${infos.dossierProjets}`,
            })
          : '';
      }

      remplir(grille, projets.length ? projets.map((p) => carteProjet(p, charger)) : etatVide());
    } catch (erreur) {
      remplir(
        grille,
        h(
          'div.carte',
          h('p', texte({ fr: 'Impossible de lire tes projets.', en: 'Could not read your projects.' })),
          h('pre.console__erreur', String(erreur?.message || erreur))
        )
      );
    }
  }

  charger();
  return racine;
}
