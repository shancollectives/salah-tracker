const CACHE_NAME = "pwabuilder-offline";
const QUEUE_NAME = "bgSyncQueue";
const offlineFallbackPage = "index.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.add(offlineFallbackPage);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(offlineFallbackPage);
        });
      })
    );
  }
});
