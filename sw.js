// Grain Site Designer — offline app shell.
// Only same-origin GETs are cached. Supabase auth/API traffic is cross-origin
// and is deliberately never touched, so sign-in and project data are always live.
const CACHE = 'grain-site-designer-v2';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      // cache each file independently so one missing file can't fail the install
      Promise.allSettled(FILES.map(f => c.add(f)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Leave anything cross-origin alone: Supabase, map tiles, CDN modules.
  if (url.origin !== self.location.origin) return;

  // Network-first so a deployed update is picked up straight away, with the
  // cached shell as the offline fallback.
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});
