/**
 * Routeur par ancre (#/...).
 *
 * Chaque ecran est une fonction qui recoit les parametres de la route et
 * renvoie un element. Le routeur se charge de l'afficher et de prevenir
 * l'ecran precedent qu'il doit se nettoyer (arreter un programme, liberer un
 * editeur...).
 */

const routes = [];
let ecranActuel = null;
let hoteScene = null;

/**
 * @param {string} motif  ex. '/lecon/:parcours/:lecon'
 * @param {(params:object) => Node|Promise<Node>} rendu
 */
export function route(motif, rendu) {
  const noms = [];
  const expression = new RegExp(
    `^${motif
      .replace(/\/+$/, '')
      .replace(/:[^/]+/g, (correspondance) => {
        noms.push(correspondance.slice(1));
        return '([^/]+)';
      })}/?$`
  );
  routes.push({ expression, noms, rendu, motif });
}

function analyser() {
  const ancre = location.hash.slice(1) || '/accueil';
  const [chemin] = ancre.split('?');
  for (const definition of routes) {
    const correspondance = chemin.match(definition.expression);
    if (!correspondance) continue;
    const params = {};
    definition.noms.forEach((nom, index) => {
      params[nom] = decodeURIComponent(correspondance[index + 1]);
    });
    return { definition, params, chemin };
  }
  return null;
}

async function afficher() {
  const resultat = analyser();
  if (!resultat) {
    naviguer('/accueil');
    return;
  }

  // L'ecran sortant doit pouvoir couper ce qu'il a lance.
  if (typeof ecranActuel?.detruire === 'function') {
    try {
      ecranActuel.detruire();
    } catch (erreur) {
      console.error('Nettoyage de l ecran precedent :', erreur);
    }
  }

  const contenu = await resultat.definition.rendu(resultat.params);
  ecranActuel = contenu;

  hoteScene.replaceChildren(contenu instanceof Node ? contenu : contenu.element);
  hoteScene.scrollTop = 0;
  hoteScene.focus({ preventScroll: true });

  document.dispatchEvent(
    new CustomEvent('route:changee', { detail: { chemin: resultat.chemin, params: resultat.params } })
  );
}

export function naviguer(chemin) {
  const cible = chemin.startsWith('#') ? chemin.slice(1) : chemin;
  if (location.hash.slice(1) === cible) afficher();
  else location.hash = cible;
}

export function cheminActuel() {
  return location.hash.slice(1) || '/accueil';
}

export function demarrer(hote) {
  hoteScene = hote;
  window.addEventListener('hashchange', afficher);
  return afficher();
}

/** Redessine l'ecran courant (utilise au changement de langue). */
export function rafraichir() {
  return afficher();
}
