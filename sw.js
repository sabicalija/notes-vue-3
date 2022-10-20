const version = "v1.0.0-beta.0";

const files = [
  "/notes-vue-3/",
  "/notes-vue-3/index.js",
  "/notes-vue-3/assets/favicon/favicon.ico",
  "/notes-vue-3/assets/favicon/favicon-16x16.png",
  "/notes-vue-3/assets/favicon/favicon-32x32.png",
  "/notes-vue-3/assets/favicon/apple-touch-icon.png",
  "/notes-vue-3/assets/favicon/safari-pinned-tab.svg",
  "/notes-vue-3/assets/favicon/manifest.json",
  "/notes-vue-3/assets/favicon/android-chrome-192x192.png",
  "/notes-vue-3/assets/favicon/android-chrome-512x512.png",
  "/notes-vue-3/assets/favicon/browserconfig.xml",
  "/notes-vue-3/assets/favicon/mstile-70x70.png",
  "/notes-vue-3/assets/favicon/mstile-144x144.png",
  "/notes-vue-3/assets/favicon/mstile-150x150.png",
  "/notes-vue-3/assets/favicon/mstile-310x150.png",
  "/notes-vue-3/assets/favicon/mstile-310x310.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(version).then((cache) => {
      console.log("Cache " + version + " created.");
      return cache.addAll(files);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const keep = [version];
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (keep.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
