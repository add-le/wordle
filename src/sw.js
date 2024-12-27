const CACHE_NAME = "wordle-pwa-cache-v1";

const prefix = location.href.includes("wordle") ? "/wordle" : "/src";

const urlsToCache = [
  `${prefix}/`,
  `${prefix}/index.html`,
  `${prefix}/app.webmanifest`,
  `${prefix}/style.css`,
  `${prefix}/sw.js`,
  `${prefix}/script.js`,
  `${prefix}/words.js`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
