const CACHE_NAME = 'salah-cache-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'sw.js',
  'icon512.png'
];

// Install: Save all files to the cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch: Serve from cache even if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file if found, OR try the network
      return response || fetch(event.request).catch(() => {
        // If both fail (OFFLINE), force return the index.html
        return caches.match('index.html');
      });
    })
  );
});
