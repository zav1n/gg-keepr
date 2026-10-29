/* Giffgaff 保号助手 Service Worker
 * 只缓存本应用的外壳（index / manifest / icons），不缓存保号流量。
 * 保号按钮的 CDN 下载必须走真实网络，所以跨域请求一律直接放行，不走缓存。
 */
const CACHE = 'gg-keeper-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // 保号流量：跨域 CDN 下载必须走网络，绝不能从缓存里出
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(e.request));
    return;
  }
  // 本应用外壳：缓存优先，离线也能打开页面（但保号按钮本身仍需联网）
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
