// このファイルは tools/build.mjs が生成する。直接編集しない。
// キャッシュ名は配信ファイルの内容ハッシュ。データやページを変えると自動で新しい版になる。
const CACHE_NAME = 'cancer-staging-7455520d8f28';
const urlsToCache = [
  "./",
  "./biliary-tract/distal.html",
  "./biliary-tract/distal_tool.html",
  "./biliary-tract/gallbladder.html",
  "./biliary-tract/gallbladder_tool.html",
  "./biliary-tract/index.html",
  "./biliary-tract/intrahepatic.html",
  "./biliary-tract/intrahepatic_tool.html",
  "./biliary-tract/perihilar.html",
  "./biliary-tract/perihilar_tool.html",
  "./changelog.html",
  "./colorectal/index.html",
  "./colorectal/jp_tool.html",
  "./colorectal/tool.html",
  "./data/editions.json",
  "./data/staging/biliary-distal.json",
  "./data/staging/biliary-gallbladder.json",
  "./data/staging/biliary-intrahepatic.json",
  "./data/staging/biliary-perihilar.json",
  "./data/staging/colorectal-jp.json",
  "./data/staging/colorectal.json",
  "./data/staging/esophagus-p.json",
  "./data/staging/esophagus.json",
  "./data/staging/liver-jp.json",
  "./data/staging/liver-uicc.json",
  "./data/staging/pancreas-jp.json",
  "./data/staging/pancreas-uicc.json",
  "./data/staging/stomach-p.json",
  "./data/staging/stomach.json",
  "./esophagus/index.html",
  "./esophagus/p_tool.html",
  "./esophagus/tool.html",
  "./images/icon-192x192.png",
  "./images/icon-512x512.png",
  "./index.html",
  "./js/editions.js",
  "./js/info.js",
  "./js/language.js",
  "./js/main.js",
  "./js/staging-engine.js",
  "./liver/jp.html",
  "./liver/jp_tool.html",
  "./liver/uicc.html",
  "./liver/uicc_tool.html",
  "./manifest.json",
  "./pancreas/jp.html",
  "./pancreas/jp_tool.html",
  "./pancreas/uicc.html",
  "./pancreas/uicc_tool.html",
  "./stomach/index.html",
  "./stomach/tool.html",
  "./style.css"
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
