const CACHE_NAME = 'currency-calculator-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  // Add other static assets as needed
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Handle background sync for currency rates
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-rates') {
    event.waitUntil(
      // This would typically update exchange rates in the background
      console.log('Background sync triggered for exchange rates')
    );
  }
});
