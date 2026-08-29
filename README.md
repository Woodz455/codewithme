# CodeWithMe

**Apprendre à coder pour de vrai, et voir tout de suite ce que ça donne.**

Un logiciel qui enseigne **Python, HTML, CSS, JavaScript et C++** à un grand débutant —
135 leçons, 18 projets, et un certificat à la fin.

Il existe en **application Windows** et en **site web**, avec exactement le même contenu et le
même atelier. Aucune donnée ne quitte la machine dans un cas comme dans l'autre : il n'y a pas
de serveur, pas de compte, pas de suivi.

![L'écran d'accueil](docs/images/accueil.png)

---

## Deux façons de l'utiliser

| | Application Windows | Version web |
|---|---|---|
| **Installation** | un `.exe` à télécharger | rien, une adresse suffit |
| **Fonctionne hors ligne** | oui, complètement | oui — dès la première visite, et Python dès qu'il l'a lancé une fois |
| **Ses projets** | de vrais fichiers dans `Documents\CodeWithMe\` | gardés dans le navigateur, téléchargeables en un clic |
| **Compilateur C++ de la machine** | utilisé s'il est installé | indisponible — le C++ tourne quand même, avec le moteur intégré |
| **Sur une tablette, un Mac, un Linux** | non | oui |

Tout le reste est identique : les 135 leçons, l'`input()` qui bloque vraiment, la tortue qui
dessine, l'aperçu qui suit la frappe, les badges, l'espace tuteur et le certificat.

Le site se met lui-même en cache : l'application, les 135 leçons, les polices, l'éditeur et le
moteur C++ (2,4 Mo) dès la première visite, puis Pyodide (13 Mo) au premier lancement de
Python. Après ça, le wifi peut lâcher — ça continue de marcher.

> L'application Windows reste la version de référence pour un usage quotidien : elle démarre
> plus vite et ne dépend d'aucune connexion. La version web sert à essayer sans rien installer,
> ou à travailler sur un ordinateur du collège où l'installation est bloquée.

---

## Télécharger l'application Windows

Les fichiers se trouvent dans la [page des versions](../../releases/latest).

| Fichier | Pour qui |
|---|---|
| **CodeWithMe-Setup.exe** | La plupart des gens. Installe l'application, crée un raccourci sur le bureau et dans le menu Démarrer. **Aucun mot de passe administrateur n'est demandé.** |
| **CodeWithMe-portable.exe** | Aucune installation. À garder sur une clé USB, ou à utiliser sur un ordinateur où l'installation est bloquée — au collège, par exemple. |

### « Windows a protégé votre ordinateur »

Un écran bleu apparaîtra au premier lancement. **Ce n'est pas un avertissement de virus.**

Windows affiche ce message pour tout programme dont l'éditeur n'a pas payé un certificat de
signature commercial (environ 200 € par an). Il ne dit rien sur le contenu du fichier.

Pour passer outre, en deux clics :

1. cliquer sur **Informations complémentaires** — le texte discret sous le message ;
2. cliquer sur **Exécuter quand même**, le bouton qui vient d'apparaître.

Cela n'est demandé qu'une seule fois.

> Le code source de cette application est entièrement dans ce dépôt, et l'exécutable est
> construit publiquement par GitHub Actions à partir de ce code — les journaux de construction
> sont consultables dans l'onglet Actions.

---

## Ce qu'il y a dedans

### 135 leçons, six parcours

| Parcours | Leçons | Ce qu'il sait faire à la fin |
|---|---:|---|
| **Python** | 71 | Une rosace dessinée par son code, un jeu « devine le nombre », un bulletin scolaire, un tableau des scores enregistré sur disque |
| **HTML** | 14 | Sa page de présentation, avec images, liens et tableaux |
| **CSS** | 16 | La même page transformée en vrai site, animations et affichage mobile compris |
| **JavaScript** | 18 | Un quiz interactif, puis un petit jeu jouable au clavier |
| **C++** | 15 | Un jeu de devinette en console, avec compteur de coups |
| **Grand projet** | 1 | Son site personnel, où les trois langages du web tiennent ensemble |

Chaque leçon suit la même structure : une explication sans jargon, un exemple exécutable, un
défi corrigé automatiquement, **trois indices progressifs** puis la solution commentée. Jamais
de blocage.

#### Le parcours Python en détail

Vingt modules, du premier `print` aux classes, dans l'ordre où chaque notion sert à la
suivante :

> premiers pas · variables et calculs · **opérateurs** · décisions et boucles · tortue ·
> **texte** · listes · **tuples et ensembles** · **dictionnaires** · fonctions ·
> **modules** · **compréhensions** · **fonctions d'ordre supérieur** · **types et erreurs** ·
> **dates** · **expressions régulières** · **fichiers** · **classes et objets** ·
> **statistiques** · la suite du voyage

Quatre sujets d'un cursus Python classique **ne sont pas enseignables ici**, et la dernière
leçon le dit franchement plutôt que de faire semblant : installer des bibliothèques (`pip`),
parler au web (`requests`, les API, le *scraping*), les environnements virtuels (`venv`) et
les grosses bibliothèques (`pandas`, `flask`, `pymongo`). Toutes demandent un réseau ou une
installation, que Python-dans-une-page n'a pas. La leçon explique ce qui les débloque — Python
installé depuis python.org — et fait écrire un vrai `requirements.txt`, ce qui est la seule
part de la gestion de paquets qui, elle, fonctionne hors ligne.

### Un atelier où le résultat est immédiat

![L'atelier Python et le dessin de la tortue](docs/images/atelier-python.png)

Éditeur à gauche, résultat vivant à droite. Le résultat change de nature selon le parcours :

- **Python** — une console avec `input()` réellement fonctionnel, et un canevas de tortue où
  le tracé s'anime. C'est le principal levier de motivation d'un débutant ;
- **HTML / CSS** — un aperçu qui suit la frappe, un mode **Objectif / Ton résultat** pour les
  défis « reproduis ce visuel », et une bascule **ordinateur / téléphone** pour voir agir un
  `@media` ;
- **JavaScript** — console, aperçu, et `<canvas>` pour les jeux ;
- **C++** — console avec `cout` et saisie `cin`, et les erreurs de compilation traduites en
  français quand elles sont reconnues.

![Le mode Objectif / Ton résultat](docs/images/atelier-css.png)

Une boucle infinie ne fige jamais l'application : le code de l'élève tourne à part, et le
bouton *Arrêter* l'interrompt.

### Ses créations deviennent de vrais fichiers

![La galerie de projets](docs/images/galerie.png)

Chaque projet terminé est écrit dans `Documents\CodeWithMe\Mes projets\` — un `.html` autonome,
un `.py`, un `.cpp`. Il peut les rouvrir, les modifier, les montrer à sa famille ou les rendre
en classe. Le fichier fonctionne **sans l'application**.

Sur la version web, les projets sont gardés dans le navigateur et un bouton les télécharge —
le fichier obtenu est le même.

### Un espace tuteur

![L'espace tuteur](docs/images/tuteur.png)

Progression par parcours, temps passé, régularité, et surtout les **points de blocage** — les
notions où il a demandé des indices ou multiplié les essais. C'est ce qui permet de l'aider
concrètement. Protégeable par un code à 4 chiffres, et exportable en bilan PDF.

### Un certificat à la fin d'un parcours

![Le certificat](docs/images/certificat.png)

À son prénom, imprimable ou enregistrable en PDF.

---

## Pour l'élève

- **Bilingue** français / anglais, avec un bouton dans l'en-tête.
- **Parcours guidé recommandé**, mais aucun verrou : il peut aller où il veut.
- **XP, niveaux, badges, série de jours** et une carte de progression.
- Un **bac à sable** par langage, sans consigne ni note, pour essayer sans être jugé.
- **Bit**, un petit robot qui réagit à son code — et qui se masque en un clic quand il en a
  assez.

---

## Développement

```bash
npm install
npm run vendor      # extrait les bibliotheques embarquees dans vendor/
npm start           # lance l'application de bureau
npm run serveur:web # lance la version web sur http://127.0.0.1:4173
```

### Les contrôles

Rien n'est déclaré fonctionnel sans avoir été exécuté.

| Commande | Ce qu'elle vérifie |
|---|---|
| `npm run check:content` | Les 135 leçons, dans les vrais moteurs : structure bilingue complète, solution de référence qui passe, code de départ qui **ne** passe pas, exemple qui s'exécute |
| `npm test` | 168 vérifications : moteurs, atelier, correction, XP, galerie, espace tuteur, projet final, certificat, le script qui contrôle les `.exe` produits, et la version web dans un vrai navigateur |
| `npm run test:web` | Le site **construit** est servi puis ouvert dans un Chromium ordinaire : démarrage, isolation d'origine, `input()` bloquant, tortue, aperçu, C++, octets exacts d'un fichier téléchargé, comportement quand le stockage est **saturé**, et fonctionnement **réseau coupé** |
| `npm run test:paquet` | L'application **empaquetée** se lance et fonctionne — c'est là qu'on découvre un fichier manquant |
| `npm run check:contrast` | Contrastes WCAG AA mesurés, et palette des graphiques contrôlée en simulant le daltonisme |
| `npm run check:icones` | Aucun emoji dans l'interface — Windows les dessine lui-même, leur rendu changerait d'une machine à l'autre |
| `npm run check:empaquetage` | La configuration Windows est valide, **sans rien construire** : les noms de fichiers s'étendent réellement et correspondent à ce que le workflow cherche ensuite |

### Architecture

```
electron/    processus principal : protocole app://, menus, profil, projets
app/         interface : modules ES, sans framework — partagee par les deux versions
  content/   les 135 lecons, en donnees pures — ajouter une lecon = ajouter un objet
python/      turtle.py, le module tortue maison injecte dans Pyodide
vendor/      Pyodide, JSCPP, CodeMirror, polices — embarques, aucun reseau requis
web/         pont-navigateur.js (window.cwm rendu par un navigateur) et sw.js (hors ligne)
tools/       vendorisation, controle du contenu, construction et serveur web
tests/       Playwright pilotant l'application Electron reelle, et le site construit
```

L'interface est en **JavaScript sans framework**. L'application est riche en contenu, pas en
état complexe : cela réduit les pièces mobiles, et le neveu peut ouvrir le code source du
logiciel qu'il utilise — c'est pédagogique.

Electron est configuré strictement : `contextIsolation`, pas d'accès Node dans le rendu, un
pont IPC nommé et étroit, et le code de l'élève exécuté dans une iframe isolée qui ne peut
atteindre ni son profil ni le reste de l'application.

### Construire le `.exe`

```bash
npm run build:win     # necessite Windows
```

En pratique, la construction est faite par GitHub Actions sur un runner `windows-latest` :
onglet **Actions → Construire l'application Windows**, ou en poussant une étiquette `v1.1.0`,
ce qui publie en plus une Release téléchargeable.

### Publier la version web

```bash
npm run build:web         # produit dist-web/
npm run serveur:web -- --dist   # sert exactement ce qui sera publie
```

`dist-web/` est un site **entièrement statique** : il suffit de le déposer chez un hébergeur.
`netlify.toml` configure Netlify ; Cloudflare Pages lit les mêmes réglages (commande
`npm run vendor && npm run build:web`, dossier `dist-web`).

**Un hébergeur ne convient que s'il sait poser des en-têtes.** La construction écrit
`dist-web/_headers` avec `Cross-Origin-Opener-Policy: same-origin` et
`Cross-Origin-Embedder-Policy: require-corp`. Sans ces deux lignes, `SharedArrayBuffer`
n'existe pas — et c'est lui qui permet à `input()` de **vraiment** attendre la réponse de
l'élève. Sans lui, la console poserait la question puis passerait à la suite sans écouter.
C'est pour cette seule raison que **GitHub Pages ne convient pas** : il ne permet pas de
configurer les en-têtes.

#### Comment le web réutilise le même code

L'interface est chargée dans l'application de bureau par un protocole maison `app://`, que le
navigateur ne connaît pas. `npm run build:web` traduit ces 21 adresses en chemins ordinaires
**dans une copie**, et injecte `web/pont-navigateur.js` — l'équivalent navigateur du pont
`window.cwm`, qui remplace les fichiers du disque par le stockage local et les téléchargements.

Aucun fichier du dépôt n'est modifié par cette construction, et le code de l'application de
bureau ne contient aucun test de plateforme. C'est ce qui garantit qu'ajouter le web ne peut
pas casser l'installateur Windows.

Les projets, eux, vivent dans le stockage du navigateur. C'est une ressource limitée — environ
5 Mo — alors que l'aperçu d'un dessin de tortue pèse 58 Ko en PNG pleine taille. Le pont réduit
donc chaque vignette à 320 px en JPEG (3,5 Ko, soit dix-sept fois moins) et range le code, la
fiche et la vignette dans trois clés distinctes. L'ordre est délibéré : si la place manque, on
perd la vignette avant la fiche, et la fiche avant le code — jamais l'inverse, et jamais en
silence.

---

## Licences

Le code de l'application est sous licence MIT.

Les bibliothèques embarquées gardent la leur : **Pyodide** (MPL-2.0), **JSCPP** (MIT),
**CodeMirror** (MIT), **Inter**, **Space Grotesk** et **JetBrains Mono** (OFL),
**Lucide** (ISC), **Devicon** (MIT).

Les logos des langages appartiennent à leurs détenteurs respectifs et servent ici à identifier
le langage enseigné, comme dans tout éditeur de code.
