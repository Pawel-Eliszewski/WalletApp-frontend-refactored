const CACHE_NAME = "wallet-pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/src/styles/main.css",
  "/assets/currency-desktop.svg",
  "/assets/icon-arrow.svg",
  "/assets/icon-email.svg",
  "/assets/icon-income.svg",
  "/assets/icon-wallet.svg",
  "/assets/currency-mobile.svg",
  "/assets/icon-calendar.svg",
  "/assets/icon-exit-doors.svg",
  "/assets/icon-lock.svg",
  "/assets/image-hero-login.svg",
  "/assets/currency-tablet.svg",
  "/assets/icon-close.svg",
  "/assets/icon-pen.svg",
  "/assets/image-hero-register.svg",
  "/assets/dashboard-background-desktop.png",
  "/assets/icon-expense.svg",
  "/assets/icon-person.svg",
  "/assets/dashboard-background-tablet.png",
  "/assets/icon-dollar.svg",
  "/assets/icon-home.svg",
  "/assets/icon-statistics.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return fetch(event.request)
        .then((response) => {
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => caches.match(event.request));
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
