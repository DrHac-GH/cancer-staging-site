const CACHE_NAME = 'my-site-cache-v5'; // Cache version updated
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './images/icon-192x192.png',
  './images/icon-512x512.png',
  './js/staging-logic.js',
  './js/main.js',
  './js/language.js',
  './esophagus/index.html',
  './esophagus/tool.html',
  './stomach/index.html',
  './stomach/tool.html',
  './colorectal/index.html',
  './colorectal/tool.html',
  './liver/jp.html',
  './liver/jp_tool.html',
  './liver/uicc.html',
  './liver/uicc_tool.html',
  './pancreas/jp.html',
  './pancreas/jp_tool.html',
  './pancreas/uicc.html',
  './pancreas/uicc_tool.html',
  './biliary-tract/index.html',
  './biliary-tract/distal.html',
  './biliary-tract/distal_tool.html',
  './biliary-tract/gallbladder.html',
  './biliary-tract/gallbladder_tool.html',
  './biliary-tract/intrahepatic.html',
  './biliary-tract/intrahepatic_tool.html',
  './biliary-tract/perihilar.html',
  './biliary-tract/perihilar_tool.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) return caches.delete(key);
        })
      )
    )
  );
});
