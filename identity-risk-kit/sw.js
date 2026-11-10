// RETACH Identity Risk Kit: offline cache. Same-origin files only. No analytics, no user data stored.
// Bump VERSION on every release so installed copies pick up the new files.
const VERSION = 'retach-irk-v1';
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts.css",
  "apple-touch-icon-180.png",
  "favicon-32.png",
  "ibm-plex-mono-latin-400-normal.woff2",
  "ibm-plex-mono-latin-500-normal.woff2",
  "ibm-plex-mono-latin-600-normal.woff2",
  "ibm-plex-sans-latin-400-normal.woff2",
  "ibm-plex-sans-latin-500-normal.woff2",
  "ibm-plex-sans-latin-600-normal.woff2",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "space-grotesk-latin-500-normal.woff2",
  "space-grotesk-latin-700-normal.woff2"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => hit || fetch(r).catch(() =>
    r.mode === 'navigate' ? caches.match('index.html') : Response.error())));
});
