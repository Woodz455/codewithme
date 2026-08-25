/**
 * Espace tuteur.
 *
 * Repond a quatre questions, dans cet ordre : combien de temps, avec quelle
 * regularite, ou il en est par langage, et sur quoi il bloque. Le dernier point
 * est le plus utile pour l'aider concretement — c'est lui qui dit ou s'asseoir
 * a cote de lui.
 *
 * Aucune donnee ne quitte l'ordinateur.
 *
 * Couleurs : les barres n'emploient pas les teintes neon de l'interface. Sur un
 * fond sombre, une grande surface pleine en neon eblouit. Ce sont des variantes
 * assombries des memes teintes, verifiees pour la lisibilite et pour la vision
 * des couleurs deficiente (ecart minimal mesure entre teintes voisines : 18,5
 * pour un seuil requis de 8).
 */
import { h, remplir, svg } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { icone } from '../icones.js';
import { PARCOURS, leconsDuParcours, situerLecon } from '../../content/parcours.js';

/** Teintes des barres : memes hues que les parcours, assombries pour le fond. */
const COULEURS_BARRES = {
  python: '#0095AB',
  html: '#CE5C23',
  css: '#3573C4',
  javascript: '#AD8A12',
  cpp: '#8E36D2',
};

/** Rampe sequentielle du calendrier : une seule teinte, du sombre au clair. */
const RAMPE_ACTIVITE = ['rgba(255,255,255,0.055)', '#0E4A57', '#10707F', '#0E96A9', '#00BCD4'];

const SEMAINES_AFFICHEES = 12;

/* ------------------------------------------------------------------ outils */

function dureeLisible(millisecondes) {
  const minutes = Math.round(millisecondes / 60000);
  if (minutes < 60) return { valeur: String(minutes), unite: 'min' };
  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  return { valeur: reste ? `${heures}h${String(reste).padStart(2, '0')}` : `${heures}`, unite: reste ? '' : 'h' };
}

function cleDuJour(date) {
  return date.toISOString().slice(0, 10);
}

/* -------------------------------------------------------------- vignettes */

/** Chiffre isole : un nombre a lire, pas un graphique a decoder. */
function vignette(nomIcone, valeur, unite, libelle) {
  return h(
    'div.carte.tuteur-vignette',
    h('div.tuteur-vignette__icone', icone(nomIcone, { taille: '1.3rem' })),
    h(
      'div.tuteur-vignette__valeur',
      valeur,
      unite ? h('span.tuteur-vignette__unite', unite) : null
    ),
    h('div.tuteur-vignette__libelle', libelle)
  );
}

/* ------------------------------------------- progression par langage (barres) */

function barresParLangage() {
  const lignes = PARCOURS.map((parcours) => {
    const lecons = leconsDuParcours(parcours.id);
    const faites = lecons.filter((fiche) => store.leconTerminee(fiche.id)).length;
    return { parcours, faites, total: lecons.length, part: lecons.length ? faites / lecons.length : 0 };
  });

  return h(
    'section.carte.tuteur-bloc',
    h('h2.tuteur-bloc__titre', icone('statistiques'), t('tuteur.parLangage')),
    h(
      'div.barres',
      lignes.map(({ parcours, faites, total, part }) =>
        h(
          'div.barre-ligne',
          {
            // Le detail au survol ; l'essentiel reste ecrit a cote de la barre.
            'data-infobulle': `${parcours.nom} — ${faites} / ${total} (${Math.round(part * 100)} %)`,
            class: 'infobulle',
          },
          h('span.barre-ligne__nom', parcours.nom),
          h(
            'div.barre-ligne__piste',
            h('div.barre-ligne__valeur', {
              // Un parcours jamais ouvert n'affiche aucune barre : montrer un
              // segment minimal laisserait croire a un debut de progression.
              style: {
                width: `${part * 100}%`,
                background: COULEURS_BARRES[parcours.id],
              },
            })
          ),
          h('span.barre-ligne__chiffre', `${faites} / ${total}`)
        )
      )
    )
  );
}

/* ------------------------------------------------- calendrier de regularite */

function calendrierActivite() {
  const tempsParJour = store.etat().tempsParJour || {};
  const aujourdHui = new Date();

  // On remonte jusqu'au lundi de la semaine la plus ancienne affichee, pour que
  // chaque colonne soit une semaine complete.
  const debut = new Date(aujourdHui);
  debut.setDate(debut.getDate() - (SEMAINES_AFFICHEES * 7 - 1));
  const jourSemaine = (debut.getDay() + 6) % 7; // 0 = lundi
  debut.setDate(debut.getDate() - jourSemaine);

  const semaines = [];
  const curseur = new Date(debut);

  while (curseur <= aujourdHui) {
    const semaine = [];
    for (let jour = 0; jour < 7; jour += 1) {
      const cle = cleDuJour(curseur);
      const minutes = Math.round((tempsParJour[cle] || 0) / 60000);
      semaine.push({
        cle,
        minutes,
        futur: curseur > aujourdHui,
        niveau: minutes === 0 ? 0 : minutes < 5 ? 1 : minutes < 15 ? 2 : minutes < 30 ? 3 : 4,
        date: new Date(curseur),
      });
      curseur.setDate(curseur.getDate() + 1);
    }
    semaines.push(semaine);
  }

  const joursActifs = Object.values(tempsParJour).filter((valeur) => valeur > 60000).length;

  return h(
    'section.carte.tuteur-bloc',
    h('h2.tuteur-bloc__titre', icone('calendrier'), t('tuteur.regularite')),
    h(
      'p.tuteur-bloc__note',
      texte({
        fr: `${joursActifs} jour${joursActifs > 1 ? 's' : ''} d’activité au total. Chaque carré est un jour.`,
        en: `${joursActifs} active day${joursActifs > 1 ? 's' : ''} in total. Each square is one day.`,
      })
    ),
    h(
      'div.calendrier',
      h(
        'div.calendrier__jours',
        [
          texte({ fr: 'L', en: 'M' }),
          '',
          texte({ fr: 'M', en: 'W' }),
          '',
          texte({ fr: 'V', en: 'F' }),
          '',
          texte({ fr: 'D', en: 'S' }),
        ].map((lettre) => h('span.calendrier__jour', lettre))
      ),
      h(
        'div.calendrier__grille',
        semaines.map((semaine) =>
          h(
            'div.calendrier__semaine',
            semaine.map((jour) =>
              jour.futur
                ? h('span.calendrier__case.calendrier__case--vide')
                : h('span.calendrier__case.infobulle', {
                    style: { background: RAMPE_ACTIVITE[jour.niveau] },
                    'data-infobulle': `${jour.date.toLocaleDateString(document.documentElement.lang, {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })} — ${jour.minutes} min`,
                  })
            )
          )
        )
      )
    ),
    h(
      'div.calendrier__legende',
      h('span', texte({ fr: 'Moins', en: 'Less' })),
      RAMPE_ACTIVITE.map((couleur) => h('span.calendrier__case', { style: { background: couleur } })),
      h('span', texte({ fr: 'Plus', en: 'More' }))
    )
  );
}

/* --------------------------------------------------------- points de blocage */

/**
 * Les notions ou il a peine : beaucoup d'essais, ou des indices demandes.
 * C'est l'information la plus actionnable de tout l'ecran.
 */
function pointsDeBlocage() {
  const difficiles = Object.entries(store.etat().lecons)
    .map(([identifiant, donnees]) => ({
      identifiant,
      ...donnees,
      score: (donnees.tentatives || 0) + (donnees.indices || 0) * 2,
    }))
    .filter((lecon) => lecon.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return h(
    'section.carte.tuteur-bloc',
    h('h2.tuteur-bloc__titre', icone('attention'), t('tuteur.blocages')),
    h('p.tuteur-bloc__note', t('tuteur.blocagesNote')),
    difficiles.length
      ? h(
          'ul.blocages',
          difficiles.map((lecon) => {
            const situation = situerLecon(lecon.identifiant);
            return h(
              'li.blocage',
              h(
                'div.blocage__texte',
                h('span.blocage__titre', situation ? texte(situation.fiche.titre) : lecon.identifiant),
                h(
                  'span.blocage__parcours',
                  situation ? `${situation.parcours.nom} · ${texte(situation.module.titre)}` : ''
                )
              ),
              h(
                'div.blocage__mesures',
                h(
                  'span.blocage__mesure',
                  texte({ fr: `${lecon.tentatives} essais`, en: `${lecon.tentatives} attempts` })
                ),
                lecon.indices
                  ? h(
                      'span.blocage__mesure.blocage__mesure--indice',
                      icone('indice'),
                      texte({ fr: `${lecon.indices} indices`, en: `${lecon.indices} hints` })
                    )
                  : null,
                lecon.terminee
                  ? h('span.blocage__mesure.blocage__mesure--reussi', icone('reussi'), texte({ fr: 'réussie', en: 'solved' }))
                  : h('span.blocage__mesure', texte({ fr: 'en cours', en: 'in progress' }))
              )
            );
          })
        )
      : h('p.tuteur-vide', t('tuteur.aucunBlocage'))
  );
}

/* ---------------------------------------------------------------- rapport */

/** Bilan autonome, lisible sans l'application. */
function construireBilanHtml() {
  const profil = store.etat();
  const { valeur, unite } = dureeLisible(store.tempsTotal());
  const lignes = PARCOURS.map((parcours) => {
    const lecons = leconsDuParcours(parcours.id);
    const faites = lecons.filter((fiche) => store.leconTerminee(fiche.id)).length;
    return `<tr><td>${parcours.nom}</td><td>${faites} / ${lecons.length}</td></tr>`;
  }).join('');

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Bilan CodeWithMe</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 20px; color: #1a1a2e; }
  h1 { margin-bottom: 4px; } .sous { color: #666; margin-top: 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0 28px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e2ea; }
  .chiffres { display: flex; gap: 28px; margin: 20px 0 28px; }
  .chiffre strong { display: block; font-size: 28px; }
  .chiffre span { color: #666; font-size: 13px; }
  footer { color: #888; font-size: 12px; margin-top: 32px; }
</style></head><body>
  <h1>Bilan d'apprentissage${profil.prenom ? ` — ${profil.prenom}` : ''}</h1>
  <p class="sous">CodeWithMe, ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  <div class="chiffres">
    <div class="chiffre"><strong>${valeur}${unite}</strong><span>temps passé</span></div>
    <div class="chiffre"><strong>${store.nombreLeconsTerminees()}</strong><span>leçons terminées</span></div>
    <div class="chiffre"><strong>${profil.badges.length}</strong><span>badges obtenus</span></div>
    <div class="chiffre"><strong>${profil.serie.record || 0}</strong><span>jours d'affilée (record)</span></div>
  </div>
  <h2>Progression par langage</h2>
  <table><tr><th>Langage</th><th>Leçons terminées</th></tr>${lignes}</table>
  <footer>Bilan généré sur cet ordinateur. Aucune donnée n'a été envoyée sur internet.</footer>
</body></html>`;
}

/* ------------------------------------------------------------------- ecran */

export function ecranTuteur() {
  const racine = h('div.ecran-tuteur');

  function afficherTableauDeBord() {
    const { valeur, unite } = dureeLisible(store.tempsTotal());
    const zoneMessage = h('div.reglages-message', { hidden: true });

    remplir(
      racine,
      h(
        'header.scene__entete',
        h('h1.scene__titre', icone('tuteur', { taille: '1.6rem' }), t('tuteur.titre')),
        h('p.scene__sous.tuteur-confidentialite', icone('cadenas'), t('tuteur.confidentialite'))
      ),
      zoneMessage,
      h(
        'div.tuteur-vignettes',
        vignette('temps', valeur, unite, t('tuteur.tempsTotal')),
        vignette('livre', String(store.nombreLeconsTerminees()), '', t('accueil.leconsTerminees')),
        vignette('trophee', String(store.etat().badges.length), '', t('accueil.badgesGagnes')),
        vignette('flamme', String(store.serie().record || 0), 'j', texte({ fr: 'record de série', en: 'best streak' }))
      ),
      barresParLangage(),
      calendrierActivite(),
      pointsDeBlocage(),
      h(
        'div.tuteur-actions',
        h(
          'button.bouton.bouton--principal',
          {
            onclick: async () => {
              try {
                const resultat = await window.cwm.rapport.exporter({
                  html: construireBilanHtml(),
                  format: 'pdf',
                });
                if (!resultat.annule) {
                  zoneMessage.hidden = false;
                  zoneMessage.dataset.type = 'info';
                  remplir(
                    zoneMessage,
                    icone('reussi'),
                    h('span', texte({ fr: `Bilan enregistré : ${resultat.chemin}`, en: `Report saved: ${resultat.chemin}` }))
                  );
                }
              } catch (erreur) {
                zoneMessage.hidden = false;
                zoneMessage.dataset.type = 'erreur';
                remplir(zoneMessage, icone('attention'), h('span', String(erreur?.message || erreur)));
              }
            },
          },
          icone('telecharger'),
          t('tuteur.exporter')
        )
      )
    );
  }

  /* --- Verrou optionnel ------------------------------------------------- */

  const code = store.reglages().codeTuteur;

  if (!code) {
    afficherTableauDeBord();
    return racine;
  }

  const champ = h('input.champ.champ--court', {
    type: 'password',
    inputmode: 'numeric',
    maxlength: '4',
    placeholder: '––––',
    autofocus: true,
  });
  const erreur = h('p.verrou__erreur', { hidden: true }, texte({ fr: 'Code incorrect.', en: 'Wrong code.' }));

  const valider = () => {
    if (champ.value === code) afficherTableauDeBord();
    else {
      erreur.hidden = false;
      champ.value = '';
      champ.focus();
    }
  };

  champ.addEventListener('keydown', (evenement) => {
    if (evenement.key === 'Enter') valider();
  });

  remplir(
    racine,
    h(
      'div.verrou.carte',
      h('div.verrou__icone', icone('cadenas', { taille: '2rem' })),
      h('h1', t('tuteur.titre')),
      h(
        'p.scene__sous',
        texte({ fr: 'Entre le code à 4 chiffres.', en: 'Enter the 4-digit code.' })
      ),
      champ,
      erreur,
      h('button.bouton.bouton--principal', { onclick: valider }, t('commun.confirmer'))
    )
  );

  return racine;
}
