/**
 * Ecran des badges.
 *
 * Les badges verrouilles restent visibles, avec la condition a remplir : c'est
 * ce qui donne envie de les decrocher. Les masquer en ferait une surprise, donc
 * un non-objectif.
 */
import { h, anneau } from '../core/ui.js';
import { t, texte } from '../core/i18n.js';
import * as store from '../core/store.js';
import { icone } from '../icones.js';
import { BADGES } from '../gamification.js';

export function ecranBadges() {
  const obtenus = BADGES.filter((badge) => store.possedeBadge(badge.id));
  const proportion = BADGES.length ? obtenus.length / BADGES.length : 0;

  return h(
    'div.ecran-badges',
    h(
      'header.badges-entete.carte',
      h(
        'div.badges-entete__texte',
        h('h1', t('badges.titre')),
        h('p.scene__sous', t('badges.obtenus', { n: obtenus.length, total: BADGES.length }))
      ),
      anneau({
        valeur: proportion,
        taille: 84,
        epaisseur: 7,
        couleur: '#FFB020',
        centre: h('span', { style: { fontSize: '1rem' } }, `${Math.round(proportion * 100)}%`),
      })
    ),

    h(
      'div.badges-grille',
      BADGES.map((badge) => {
        const acquis = store.possedeBadge(badge.id);
        return h(
          'article.badge-carte.carte',
          { style: { '--teinte': badge.couleur }, dataset: { acquis: String(acquis) } },
          h(
            `div.badge.${acquis ? 'badge--obtenu' : 'badge--verrouille'}`,
            { style: { '--teinte': badge.couleur } },
            icone(badge.icone)
          ),
          h(
            'div.badge-carte__texte',
            h('h3.badge-carte__nom', texte(badge.nom)),
            h('p.badge-carte__note', acquis ? texte(badge.note) : t('badges.verrouille'))
          ),
          acquis ? h('span.badge-carte__coche', icone('reussi')) : h('span.badge-carte__coche', icone('cadenas'))
        );
      })
    )
  );
}
