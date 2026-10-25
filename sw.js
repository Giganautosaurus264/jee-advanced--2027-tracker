/* Bump the shell version and matching HTML asset queries for every release. */
const CACHE='jee-workspace-20261025-1';
const SHELL=['./','./index.html','./styles.css?v=20261025-1','./syllabus.js?v=20261025-1','./catalog.js?v=20261025-1','./core.js?v=20261025-1','./app.js?v=20261025-1','./manifest.webmanifest','./icons/icon.svg','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL))));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jee-workspace-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(response=>response.ok?response:caches.match(new URL('./index.html',self.registration.scope))).catch(()=>caches.match(new URL('./index.html',self.registration.scope))));return;
 }
 if(SHELL.some(path=>new URL(path,self.registration.scope).href===url.href))event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
