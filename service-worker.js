const CACHE_NAME = "goodanm";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/anime.html",
  "/pages/manga.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/css/main.css",
  "/assets/bers.jpg",
  "/assets/fmabro.jpg",
  "/assets/fmam.jpg",
  "/assets/ged.jpg",
  "/assets/gintama.jpg",
  "/assets/github.png",
  "/assets/hxh.jpg",
  "/assets/instagram-new.png",
  "/assets/jojo.jpg",
  "/assets/mons.jpg",
  "/assets/op.jpg",
  "/assets/sg.jpg",
  "/assets/twitter.png",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/manifest.json",
  "/maskable_icon192.png",
  "/maskable_icon512.png",
  "/favicon.ico",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
    .match(event.request, {
      cacheName: CACHE_NAME
    })
    .then(function (response) {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
          return cacheName;
        })
      );
    })
  );
});
