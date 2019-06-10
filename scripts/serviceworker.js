const cacheName = 'Einheitenrechner';
const staticAssets = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/style/app.css',
    '/manifest.json'
];

self.addEventListener('install',function(event){
    event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(staticAssets);
      })
  );

});

self.addEventListener('activate',function(event){
    event.waitUntil(
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



self.addEventListener('fetch', async e =>{
    // CODELAB: Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(cacheName)
                .then((cache) => {
                  return cache.match('index.html');
                });
          })
  );
});

    

