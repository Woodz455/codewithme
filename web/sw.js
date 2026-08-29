/**
 * Le service worker : ce qui rend la version web utilisable hors ligne.
 *
 * L'application de bureau ne demande jamais le reseau. Sans ce fichier, la
 * version web le demanderait a chaque ouverture — et au college, ou le wifi
 * lache, elle ne s'ouvrirait tout simplement pas. Mesure faite avant :
 * couper le reseau puis recharger donnait une page morte.
 *
 * Deux regimes, choisis sur la taille :
 *
 *   - l'application elle-meme (interface, lecons, polices, editeur, C++) pese
 *     2,4 Mo : elle est mise en cache des l'installation, donc des la
 *     premiere visite ;
 *   - Pyodide pese 13 Mo a lui seul. L'imposer a la premiere visite serait
 *     brutal sur un forfait telephone. Il est donc mis en cache au premier
 *     usage : des que l'eleve a lance Python une fois, Python marche hors
 *     ligne lui aussi.
 *
 * Les reponses sont rejouees depuis le cache avec leurs en-tetes d'origine,
 * COOP et COEP compris : l'isolation survit, donc `input()` continue de
 * bloquer hors ligne.
 */
const VERSION = '__VERSION__';
const CACHE = `codewithme-${VERSION}`;
const PRECHARGE = __PRECACHE__;

self.addEventListener('install', (evenement) => {
  evenement.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(PRECHARGE);
      // Prendre la main tout de suite : sinon une version corrigee
      // n'atteindrait l'eleve qu'apres avoir ferme tous ses onglets.
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (evenement) => {
  evenement.waitUntil(
    (async () => {
      // `VERSION` vient du contenu des fichiers : une mise en ligne change le
      // nom du cache, et l'ancien est jete ici. C'est ce qui evite qu'un
      // eleve reste indefiniment sur une version perimee.
      for (const nom of await caches.keys()) {
        if (nom !== CACHE) await caches.delete(nom);
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (evenement) => {
  const requete = evenement.request;
  if (requete.method !== 'GET') return;

  const url = new URL(requete.url);
  if (url.origin !== self.location.origin) return;

  evenement.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);

      const enCache = await cache.match(requete, { ignoreSearch: true });
      if (enCache) return enCache;

      try {
        const reponse = await fetch(requete);
        // C'est ici que Pyodide entre en cache, au premier `import`.
        if (reponse.status === 200 && reponse.type === 'basic') {
          cache.put(requete, reponse.clone());
        }
        return reponse;
      } catch (erreur) {
        // Hors ligne, et jamais vu. Pour une navigation, on rend l'accueil
        // plutot que l'ecran d'erreur du navigateur.
        if (requete.mode === 'navigate') {
          const accueil = await cache.match('/index.html');
          if (accueil) return accueil;
        }
        throw erreur;
      }
    })()
  );
});
