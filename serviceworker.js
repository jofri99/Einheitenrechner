const cacheName = 'Einheitenrechner';
const staticAssets = [
    '.',
    'index.html',
    'app.js',
    './style/app.css',
    'manifest.json',
    'icons/'
];

self.addEventListener('install',evt => {
    console.log("[Service Worker] Install");
    evt.waitUntil(
    caches.open(cacheName)
      .then((cache)=>{
        console.log("[Service Worker] Pre-caching offline page");
        return cache.addAll(staticAssets);
      })
  );
  self.skipWaiting();
});


self.addEventListener('activate', (evt) => {
    console.log("[Service Worker] Activate");
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );;
    self.clients.claim();
});



self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

