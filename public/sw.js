const CACHE_VERSION = 'letofy-v2';
const CACHE_NAME = `letofy-cache-${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Don't cache if not a success response
        if (!response.ok) {
          return response;
        }

        // Clone the response because it can only be consumed once
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, responseClone))
          .catch(err => console.error('Error caching response:', err));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});