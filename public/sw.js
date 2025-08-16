const CACHE_NAME = 'currency-calculator-v1_2_3'; // Increment for new versions
const STATIC_CACHE = 'currency-calc-static-v1_2_3';
const DYNAMIC_CACHE = 'currency-calc-dynamic-v1_2_3';
const API_CACHE = 'currency-calc-api-v1_2_3';
const VERSION = '1.2.17'; // App version

// Critical assets for offline functionality
const urlsToCache = [
  '/',
  '/de',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/icons/favicon-32x32.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker...');
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching critical assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('SW: Installation complete');
        // Auto-activate for better offline-first behavior
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('SW: Installation failed', error);
      })
  );
});

// Listen for messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('SW: Received skip waiting message');
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    console.log('SW: Sending version to client:', VERSION);
    // Send version back to client
    event.ports[0]?.postMessage({
      type: 'VERSION_RESPONSE',
      version: VERSION,
    }) ||
      event.source?.postMessage({ type: 'VERSION_RESPONSE', version: VERSION });
  }
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker...');
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return !cacheName.includes('v1_2_3'); // Keep only current version caches
            })
            .map((cacheName) => {
              console.log('SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('SW: Activation complete, version:', VERSION);

        // Notify all clients about the new version
        return self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SW_UPDATED',
              version: VERSION,
              timestamp: Date.now(),
            });
          });
        });
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls - Network first with cache fallback
  if (
    url.hostname.includes('exchangerate-api.com') ||
    url.pathname.includes('/api/')
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseClone = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseClone);
            console.log('SW: Cached API response');
          });
          return response;
        })
        .catch(() => {
          console.log('SW: Network failed, serving from cache');
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return offline fallback for API calls
            return new Response(
              JSON.stringify({
                error: 'Network unavailable',
                cached: false,
                timestamp: Date.now(),
              }),
              {
                headers: { 'Content-Type': 'application/json' },
              }
            );
          });
        })
    );
    return;
  }

  // Static assets - Cache first
  if (
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((fetchResponse) => {
          const responseClone = fetchResponse.clone();
          caches
            .open(DYNAMIC_CACHE)
            .then((cache) => cache.put(request, responseClone));
          return fetchResponse;
        });
      })
    );
    return;
  }

  // Navigation requests - Cache first for offline-first behavior
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately, then try to update in background
          console.log('SW: Serving navigation from cache');
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                // Update cache in background
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, networkResponse.clone());
                });
              }
            })
            .catch(() => {
              // Network failed, cache was the right choice
              console.log('SW: Network failed, cache was correct');
            });
          return cachedResponse;
        }

        // Not in cache, try network
        return fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              // Cache successful navigation responses
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Network failed and no cache - serve offline page
            console.log('SW: Serving offline page');
            return caches.match('/offline') || caches.match('/');
          });
      })
    );
    return;
  }

  // Default strategy - network first
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

// Background sync for currency rates
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-rates') {
    event.waitUntil(syncExchangeRates());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Exchange rates updated',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: data.url || '/',
    actions: [
      {
        action: 'view',
        title: 'View App',
        icon: '/icons/icon-72x72.png',
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Currency Calculator',
      options
    )
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(clients.openWindow(event.notification.data || '/'));
  }
});

// Helper function to sync exchange rates in background
async function syncExchangeRates() {
  try {
    console.log('SW: Background syncing exchange rates...');

    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/EUR'
    );
    if (response.ok) {
      const cache = await caches.open(API_CACHE);
      await cache.put('exchange-rates-eur', response.clone());
      console.log('SW: Exchange rates synced successfully');

      // Optionally notify all clients about the update
      const clients = await self.clients.matchAll();
      clients.forEach((client) => {
        client.postMessage({
          type: 'RATES_UPDATED',
          timestamp: Date.now(),
        });
      });
    }
  } catch (error) {
    console.error('SW: Failed to sync exchange rates', error);
  }
}
