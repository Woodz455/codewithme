/**
 * Correction automatique des defis.
 *
 * Chaque lecon declare ses verifications sous forme de donnees ; ce module les
 * execute et renvoie, en cas d'echec, un message qui dit **precisement** ce qui
 * ne va pas. Un « raté, réessaie » n'apprend rien ; « tu affiches Bonjour mais
 * on attendait Bonjour ! » se corrige tout seul.
 */
import { texte } from './core/i18n.js';

/* --------------------------------------------------------------- outils -- */

/** Compare deux sorties en tolerant les espaces et retours a la ligne en trop. */
function normaliser(valeur) {
  return String(valeur ?? '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((ligne) => ligne.trimEnd())
    .join('\n')
    .trim();
}

/** Version sans accents ni majuscules, pour les comparaisons indulgentes. */
function simplifier(valeur) {
  return normaliser(valeur)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function citer(valeur) {
  const propre = String(valeur ?? '').trim();
  return propre.length > 90 ? `${propre.slice(0, 90)}…` : propre;
}

/* -------------------------------------------------------- verifications -- */

/**
 * @param {object} regle
 * @param {{code:string, sortie:string, dessin:Array, moteurWeb:object|null}} contexte
 * @returns {Promise<{ok:boolean, message?:string}>}
 */
async function verifierUneRegle(regle, contexte) {
  const messagePersonnalise = regle.message ? texte(regle.message) : null;
  const echec = (parDefaut) => ({ ok: false, message: messagePersonnalise || parDefaut });

  switch (regle.type) {
    /* --- sortie console (Python, C++, JavaScript) ----------------------- */

    case 'sortieEgale': {
      const attendu = normaliser(texte(regle.valeur));
      const obtenu = normaliser(contexte.sortie);
      if (obtenu === attendu) return { ok: true };
      if (simplifier(obtenu) === simplifier(attendu)) {
        return echec(
          `Presque ! Il y a une différence de majuscules ou d’accents : tu affiches « ${citer(obtenu)} », on attendait « ${citer(attendu)} ».`
        );
      }
      if (!obtenu) return echec('Ton programme n’affiche rien. As-tu bien utilisé print (ou cout) ?');
      return echec(`Tu affiches « ${citer(obtenu)} » mais on attendait « ${citer(attendu)} ».`);
    }

    case 'sortieContient': {
      const attendu = texte(regle.valeur);
      if (normaliser(contexte.sortie).includes(normaliser(attendu))) return { ok: true };
      if (simplifier(contexte.sortie).includes(simplifier(attendu))) {
        return echec(`Il manque juste les majuscules ou les accents de « ${citer(attendu)} ».`);
      }
      return echec(`On ne trouve pas « ${citer(attendu)} » dans ce que ton programme affiche.`);
    }

    case 'sortieMotif': {
      const expression = new RegExp(regle.motif, regle.options || '');
      if (expression.test(normaliser(contexte.sortie))) return { ok: true };
      return echec('Ce que ton programme affiche ne correspond pas encore à ce qui est demandé.');
    }

    case 'sortieLignes': {
      const lignes = normaliser(contexte.sortie).split('\n').filter(Boolean);
      if (lignes.length === regle.nombre) return { ok: true };
      return echec(
        `Ton programme affiche ${lignes.length} ligne${lignes.length > 1 ? 's' : ''}, on en attendait ${regle.nombre}.`
      );
    }

    /* --- inspection du code lui-meme ------------------------------------ */

    case 'codeContient': {
      const expression = new RegExp(regle.motif, regle.options ?? 'm');
      if (expression.test(contexte.code)) return { ok: true };
      return echec('Ton code n’utilise pas encore ce qui est demandé dans la consigne.');
    }

    case 'codeNeContientPas': {
      const expression = new RegExp(regle.motif, regle.options ?? 'm');
      if (!expression.test(contexte.code)) return { ok: true };
      return echec('Il y a dans ton code quelque chose que la consigne demande d’éviter.');
    }

    /* --- resultat affiche (HTML / CSS / JavaScript) --------------------- */

    case 'dom': {
      if (!contexte.moteurWeb) return echec('L’aperçu n’est pas disponible.');
      const [resultat] = await contexte.moteurWeb.interroger([
        { selecteur: regle.selecteur, quoi: regle.quoi || 'nombre', nom: regle.nom },
      ]);

      if (regle.quoi === 'existe' || !regle.quoi) {
        const nombre = typeof resultat === 'number' ? resultat : resultat ? 1 : 0;
        if (regle.attendu === undefined ? nombre > 0 : nombre === regle.attendu) return { ok: true };
        return echec(
          regle.attendu === undefined || regle.attendu > 0
            ? `On ne trouve pas « ${regle.selecteur} » dans ta page.`
            : `Ta page contient « ${regle.selecteur} » alors qu’elle ne devrait pas.`
        );
      }

      if (regle.quoi === 'nombre') {
        if (resultat === regle.attendu) return { ok: true };
        return echec(`Ta page contient ${resultat} fois « ${regle.selecteur} », on en attendait ${regle.attendu}.`);
      }

      if (regle.quoi === 'texte' || regle.quoi === 'html' || regle.quoi === 'attribut') {
        const valeurs = Array.isArray(resultat) ? resultat : [];
        const attendu = texte(regle.attendu);
        const trouve = valeurs.some((valeur) =>
          regle.exact ? normaliser(valeur) === normaliser(attendu) : simplifier(valeur).includes(simplifier(attendu))
        );
        if (trouve) return { ok: true };
        if (!valeurs.length) return echec(`On ne trouve pas « ${regle.selecteur} » dans ta page.`);
        return echec(`« ${regle.selecteur} » ne contient pas « ${citer(attendu)} » (on y lit « ${citer(valeurs[0])} »).`);
      }

      return echec('Vérification impossible.');
    }

    case 'style': {
      if (!contexte.moteurWeb) return echec('L’aperçu n’est pas disponible.');
      const [valeurs] = await contexte.moteurWeb.interroger([
        { selecteur: regle.selecteur, quoi: 'style', nom: regle.propriete },
      ]);

      const liste = Array.isArray(valeurs) ? valeurs : [];
      if (!liste.length) return echec(`On ne trouve pas « ${regle.selecteur} » dans ta page.`);

      const attendus = (Array.isArray(regle.attendu) ? regle.attendu : [regle.attendu]).map((v) =>
        simplifier(v).replace(/\s+/g, '')
      );
      const correspond = liste.some((valeur) => attendus.includes(simplifier(valeur).replace(/\s+/g, '')));
      if (correspond) return { ok: true };

      return echec(
        `La propriété ${regle.propriete} de « ${regle.selecteur} » vaut « ${citer(liste[0])} », on attendait « ${citer(regle.attendu)} ».`
      );
    }

    /* --- dessin de la tortue -------------------------------------------- */

    case 'tortueTraits': {
      const traits = contexte.dessin.filter((commande) => commande.c === 'ligne');
      const minimum = regle.min ?? 1;
      const maximum = regle.max ?? Infinity;
      if (traits.length >= minimum && traits.length <= maximum) return { ok: true };
      if (!traits.length) return echec('La tortue n’a rien dessiné. Vérifie que tu la fais avancer.');
      return echec(
        `La tortue a tracé ${traits.length} trait${traits.length > 1 ? 's' : ''}, on en attendait ${
          maximum === Infinity ? `au moins ${minimum}` : minimum === maximum ? minimum : `entre ${minimum} et ${maximum}`
        }.`
      );
    }

    case 'tortueFermee': {
      const traits = contexte.dessin.filter((commande) => commande.c === 'ligne');
      if (!traits.length) return echec('La tortue n’a rien dessiné.');
      const dernier = traits[traits.length - 1];
      const tolerance = regle.tolerance ?? 1;
      if (Math.abs(dernier.x2) < tolerance && Math.abs(dernier.y2) < tolerance) return { ok: true };
      return echec('Ta figure ne se referme pas : la tortue ne revient pas à son point de départ.');
    }

    case 'tortueCouleurs': {
      const couleurs = new Set(
        contexte.dessin.filter((commande) => commande.c === 'ligne').map((commande) => commande.couleur)
      );
      if (couleurs.size >= (regle.min ?? 2)) return { ok: true };
      return echec(`Utilise au moins ${regle.min ?? 2} couleurs différentes pour ton dessin.`);
    }

    default:
      console.warn(`[validateur] regle inconnue : ${regle.type}`);
      return { ok: true };
  }
}

/**
 * Corrige un defi.
 * S'arrete a la premiere regle non satisfaite : un debutant corrige une chose
 * a la fois, lui en signaler cinq d'un coup le decourage.
 *
 * @returns {Promise<{reussi:boolean, message:string|null}>}
 */
export async function corriger(verifications, contexte) {
  if (!verifications?.length) return { reussi: true, message: null };

  for (const regle of verifications) {
    const resultat = await verifierUneRegle(regle, contexte);
    if (!resultat.ok) return { reussi: false, message: resultat.message };
  }
  return { reussi: true, message: null };
}

/**
 * Verifie une lecon avec sa solution de reference.
 * Utilise par `npm run check:content` : garantit qu'aucun defi n'est
 * impossible et qu'aucune solution fournie n'est fausse.
 */
export async function corrigerSolution(lecon, contexte) {
  return corriger(lecon?.defi?.verifications, contexte);
}
