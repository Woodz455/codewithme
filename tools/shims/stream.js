/**
 * Substitut navigateur du module Node `stream`, pour la compilation de JSCPP.
 *
 * `printf` teste `args[0] instanceof Stream` afin d'ecrire dans un flux Node.
 * Dans le navigateur ce cas ne se produit jamais : une classe vide suffit,
 * le test renvoie toujours false et printf retourne simplement une chaine.
 */
export class Stream {}

export default { Stream };
