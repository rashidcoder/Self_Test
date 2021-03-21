var cacheName = 'COVID-19 SELF TEST'; 
var STATIC_FILES = [
  '/',
  '/index.html',
  '/app.js',
  '/main.js',
  '/ar.html',
  '/es.html',
  '/fr.html',
  '/img/logo.png',
  '/map.js',
  "https://code.jquery.com/jquery-3.5.1.slim.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
  "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js",
  "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css",
  "http://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js",
  
];



self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll(STATIC_FILES);
      })
  )
});
/* Serve cached content when offline */ 
self.addEventListener('fetch', function(event) {  
event.respondWith(caches.match(event.request).then(function(response) {  
return response || fetch(event.request);
})   
);  
});