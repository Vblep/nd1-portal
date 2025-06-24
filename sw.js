const CACHE_NAME = 'nd1portal-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/auth.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/sw.js',
  '/timetable.html',
  '/notices.html',
  '/hod.html',
  '/reps.html',
  '/gallery.html',
  '/forum.html',
  '/polls.html',
  '/leaderboard.html',
  '/events.html',
  '/users.html',
  '/approve.html',
  '/view-profile.html',
  '/username.html',
  '/style.css', // if you use one
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'
];

// Install Service Worker and cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Fetch cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request)
    )
  );
});