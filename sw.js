const CACHE = 'android17-v1'
const PRECACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.svg',
  '/manifest.json',
  '/assets/hero.webp',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  )
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).then((res) => {
      if (res.status === 200) {
        const clone = res.clone()
        caches.open(CACHE).then((cache) => cache.put(e.request, clone))
      }
      return res
    }))
  )
})
