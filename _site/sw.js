const cacheName = 'ws-01';

const filesToCache = [
  '/',
  '/css/vars.css',
  '/css/baijamjuree-bold-webfont.woff',
  '/css/baijamjuree-light-webfont.woff',
  '/css/baijamjuree-regular-webfont.woff',
  '/css/baijamjuree-semibold-webfont.woff',
  '/img/logo-sml.svg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
