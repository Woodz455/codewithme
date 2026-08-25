/**
 * Petits outils de rendu.
 *
 * L'application n'utilise pas de framework : ce fichier fournit le minimum
 * necessaire pour construire du DOM lisiblement, sans concatener des chaines
 * de HTML (source classique de bugs et de failles d'injection).
 */

/**
 * Cree un element.
 *
 *   h('div.carte', { onclick: f }, 'Bonjour')
 *   h('span', { class: 'etiquette', style: { color: 'red' } })
 *
 * @param {string} selecteur  balise, avec classes optionnelles : 'button.bouton.bouton--principal'
 * @param {object} [proprietes]
 * @param {...(Node|string|number|Array|null|false|undefined)} enfants
 */
export function h(selecteur, proprietes = null, ...enfants) {
  const [balise, ...classes] = String(selecteur).split('.');
  const element = document.createElement(balise || 'div');
  if (classes.length) element.classList.add(...classes);

  // Un tableau est un objet : sans ce test, `h('div', listeDElements)` prendrait
  // la liste d'enfants pour des proprietes et n'afficherait rien.
  const sontDesProprietes =
    proprietes && typeof proprietes === 'object' && !(proprietes instanceof Node) && !Array.isArray(proprietes);

  if (sontDesProprietes) {
    for (const [cle, valeur] of Object.entries(proprietes)) {
      if (valeur === null || valeur === undefined || valeur === false) continue;

      if (cle === 'class') {
        element.classList.add(...String(valeur).split(/\s+/).filter(Boolean));
      } else if (cle === 'style' && typeof valeur === 'object') {
        for (const [propriete, v] of Object.entries(valeur)) {
          if (propriete.startsWith('--')) element.style.setProperty(propriete, v);
          else element.style[propriete] = v;
        }
      } else if (cle === 'dataset') {
        Object.assign(element.dataset, valeur);
      } else if (cle === 'html') {
        // Reserve au contenu pedagogique interne, jamais a du texte saisi.
        element.innerHTML = valeur;
      } else if (cle.startsWith('on') && typeof valeur === 'function') {
        element.addEventListener(cle.slice(2).toLowerCase(), valeur);
      } else if (cle in element && cle !== 'list' && typeof valeur !== 'object') {
        element[cle] = valeur;
      } else {
        element.setAttribute(cle, valeur);
      }
    }
  } else if (proprietes !== null && proprietes !== undefined) {
    enfants.unshift(proprietes);
  }

  ajouter(element, enfants);
  return element;
}

function ajouter(parent, enfants) {
  for (const enfant of enfants.flat(Infinity)) {
    if (enfant === null || enfant === undefined || enfant === false || enfant === true) continue;
    parent.append(enfant instanceof Node ? enfant : document.createTextNode(String(enfant)));
  }
}

/** Cree un element SVG (les balises SVG exigent le bon espace de noms). */
export function svg(balise, proprietes = {}, ...enfants) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', balise);
  for (const [cle, valeur] of Object.entries(proprietes)) {
    if (valeur === null || valeur === undefined || valeur === false) continue;
    if (cle === 'class') element.setAttribute('class', valeur);
    else if (cle.startsWith('on') && typeof valeur === 'function') {
      element.addEventListener(cle.slice(2).toLowerCase(), valeur);
    } else element.setAttribute(cle, valeur);
  }
  for (const enfant of enfants.flat(Infinity)) {
    if (enfant === null || enfant === undefined || enfant === false) continue;
    element.append(enfant instanceof Node ? enfant : document.createTextNode(String(enfant)));
  }
  return element;
}

/** Vide un element puis y place un nouveau contenu. */
export function remplir(hote, ...contenu) {
  hote.replaceChildren();
  ajouter(hote, contenu);
  return hote;
}

/**
 * Anneau de progression.
 * @param {{valeur:number, taille?:number, epaisseur?:number, couleur?:string, centre?:Node|string}} options
 */
export function anneau({ valeur, taille = 64, epaisseur = 6, couleur = 'var(--cyan)', centre = null }) {
  const rayon = (taille - epaisseur) / 2;
  const circonference = 2 * Math.PI * rayon;
  const proportion = Math.max(0, Math.min(1, valeur));
  const identifiant = `degrade-${Math.random().toString(36).slice(2, 9)}`;

  const dessin = svg(
    'svg',
    { class: 'anneau', width: taille, height: taille, viewBox: `0 0 ${taille} ${taille}` },
    svg(
      'defs',
      {},
      svg(
        'linearGradient',
        { id: identifiant, x1: '0', y1: '0', x2: '1', y2: '1' },
        svg('stop', { offset: '0%', 'stop-color': couleur }),
        svg('stop', { offset: '100%', 'stop-color': couleur, 'stop-opacity': '0.45' })
      )
    ),
    svg('circle', {
      class: 'anneau__fond',
      cx: taille / 2,
      cy: taille / 2,
      r: rayon,
      'stroke-width': epaisseur,
    }),
    svg('circle', {
      class: 'anneau__valeur',
      cx: taille / 2,
      cy: taille / 2,
      r: rayon,
      'stroke-width': epaisseur,
      stroke: `url(#${identifiant})`,
      'stroke-dasharray': circonference,
      'stroke-dashoffset': circonference * (1 - proportion),
      style: `filter: drop-shadow(0 0 6px ${couleur})`,
    })
  );

  return h(
    'div.anneau-boite',
    { style: { width: `${taille}px`, height: `${taille}px` } },
    dessin,
    centre ? h('div.anneau-boite__centre', { style: { fontSize: `${Math.round(taille / 4.2)}px` } }, centre) : null
  );
}

/**
 * Fait grimper un nombre affiche, facon compteur de score.
 * @param {HTMLElement} element
 */
export function compter(element, de, vers, duree = 900, formater = (n) => String(Math.round(n))) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = formater(vers);
    return;
  }
  const debut = performance.now();
  const etape = (maintenant) => {
    const avancement = Math.min(1, (maintenant - debut) / duree);
    // Ralentissement en fin de course : le chiffre « se pose ».
    const adouci = 1 - (1 - avancement) ** 3;
    element.textContent = formater(de + (vers - de) * adouci);
    if (avancement < 1) requestAnimationFrame(etape);
  };
  requestAnimationFrame(etape);
}

/** Retarde l'appel tant que de nouveaux appels arrivent (sauvegarde, frappe...). */
export function attendre(fonction, delai = 400) {
  let minuteur = null;
  return (...args) => {
    clearTimeout(minuteur);
    minuteur = setTimeout(() => fonction(...args), delai);
  };
}

/** Echappe du texte destine a etre insere dans du HTML. */
export function echapper(texte) {
  const boite = document.createElement('div');
  boite.textContent = String(texte ?? '');
  return boite.innerHTML;
}
