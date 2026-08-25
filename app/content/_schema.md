# Format d'une leçon

Chaque leçon est un objet dans `lecons-<langage>.js`, dont la clé est l'identifiant déclaré
dans `parcours.js`. Tout texte destiné à l'élève porte ses deux langues : `{ fr, en }`.

```js
'py-1-1': {
  langage: 'python',        // python · cpp · html · css · javascript · web
  xp: 20,

  objectif: { fr, en },     // une phrase : ce qu'il saura faire après
  explication: { fr, en },  // HTML simple : <p> <strong> <code> <ul> <pre>

  exemple: {
    code: '…',              // exécutable tel quel ; objet {html, css, js} pour le web
    note: { fr, en },       // optionnel
    erreurAttendue: true,   // optionnel : l'exemple doit planter (leçon sur les erreurs)
  },

  defi: {
    consigne: { fr, en },   // HTML simple
    depart: '…',            // code présent dans l'éditeur au chargement
                            // (ou objet {html, css, js} : un onglet par clé)
    entree: '…',            // optionnel : entrée standard fournie (C++)
    verifications: [ … ],   // voir plus bas
    indices: [ {fr,en}, {fr,en}, {fr,en} ],   // exactement 3
    solution: '…',          // même forme que `depart`
  },

  projet: { titre: { fr, en } },   // optionnel : enregistre le résultat dans la galerie
}
```

## Règles non négociables

Elles sont **vérifiées automatiquement** par `npm run check:content` :

1. Chaque identifiant déclaré dans `parcours.js` a une leçon.
2. Tout champ visible existe **en français et en anglais**.
3. Il y a exactement **3 indices**, et une **solution**.
4. La **solution passe** les vérifications de la leçon, exécutée dans le vrai moteur.
5. Le **code de départ ne passe pas** — sinon le défi est déjà résolu au chargement.
6. L'**exemple s'exécute** sans erreur.

## Vérifications disponibles

| Type | Rôle |
|---|---|
| `sortieEgale` | la console affiche exactement ce texte |
| `sortieContient` | la console contient ce texte |
| `sortieMotif` | la console correspond à une expression régulière |
| `sortieLignes` | la console compte exactement N lignes |
| `codeContient` | le code contient ce motif (imposer une boucle `for`…) |
| `codeNeContientPas` | le code évite ce motif (interdire une réponse écrite en dur) |
| `dom` | la page contient tel élément, en tel nombre, avec tel texte |
| `style` | telle propriété CSS vaut réellement telle valeur (style **calculé**) |
| `canvasDessine` | quelque chose a réellement été tracé sur le `<canvas>` |
| `tortueTraits` | la tortue a tracé entre N et M traits |
| `tortueFermee` | la figure revient à son point de départ |
| `tortueCouleurs` | au moins N couleurs différentes |

Pour `dom` avec `quoi: 'nombre'`, deux formes selon ce que dit la consigne :
`attendu: 3` exige **exactement** trois éléments, `min: 3` en exige **au moins** trois.
Une consigne qui dit « au moins » et une vérification qui exige un compte exact rendent
l'exercice infaisable dès que l'élève en fait un peu plus — piège déjà rencontré deux fois.

Chaque règle accepte un `message: { fr, en }` qui remplace le message par défaut. À n'utiliser
que si le message automatique est vraiment moins clair : les messages par défaut citent les
valeurs réelles (« tu affiches X, on attendait Y »), ce qu'un message figé ne peut pas faire.

## Deux pièges de largeur et de temps

**La largeur de l'aperçu n'est pas la même partout.** Le panneau de l'application mesure 492 px,
`check:content` rend la page dans une iframe de 800 px, et l'élève peut basculer l'aperçu en
largeur « Mobile » (380 px). Une vérification qui dépend de la largeur passerait donc ici et
échouerait là. Une leçon `@media` se vérifie par `codeContient` sur `@media`, **plus** un `style`
vrai à toutes les largeurs — jamais par une valeur qui ne s'applique qu'en dessous du point de
rupture.

**Le correcteur photographie la page ~350 ms après l'exécution** (400 ms dans `check:content`).
Une leçon d'animation ou de jeu doit donc dessiner **au moins une image tout de suite**, et pas
uniquement dans le `setInterval` ou le `requestAnimationFrame`.

## Mode « Objectif / Ton résultat »

Une leçon web peut fournir un rendu de référence :

```js
defi: {
  objectif: { html: '…', css: '…' },   // au moins l'une des deux clés, non vide
  …
}
```

L'aperçu se partage alors en deux : la référence en haut (repliable), le résultat de l'élève en
dessous. C'est fait pour les défis « reproduis ce visuel » : viser une image motive bien plus que
lire une consigne. La référence n'est jamais interrogée par le correcteur — seul le résultat de
l'élève est jugé.

## Ce qui fonctionne réellement en C++

L'interpréteur embarqué ne couvre pas tout le langage. **Mesuré, pas supposé** :

**Utilisable** — `int` `double` `bool` `char` `const` · `cout` `cin` (accents compris) ·
`if`/`else` `switch` · `for` `while` `do…while` · tableaux, tableaux 2D, tableaux en paramètre ·
fonctions à paramètres par valeur · `<cmath>` `<cstring>` `<iomanip>` `rand`/`srand` ·
`char nom[20];` avec `cin >> nom`.

**À ne jamais employer dans une leçon** — `std::string` et `<string>` · `getline` · `struct` ·
`vector` · paramètres par référence (`int &n`).

Le texte s'enseigne donc avec `char nom[20]`, qui fonctionne. C'est du C++ authentique, à
présenter comme la forme historique, en signalant que `std::string` est la forme moderne qu'il
rencontrera plus tard.
