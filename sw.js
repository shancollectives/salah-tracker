const CACHE_NAME = 'salah-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // "force: true" makes it skip files it can't find
      return cache.addAll(ASSETS).catch(err => console.log("Cache error skipped"));
    })
  );
});

// Fetch event (This is what PWABuilder checks for)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
