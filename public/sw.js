/// <reference lib="webworker" />
// Вместо import используйте importScripts
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
// Теперь workbox доступен глобально
const { strategies, routing, precaching } = workbox;
self.addEventListener('install', (event) => {
    console.log('SW installed');
});
console.log('SW hello');
const promise = new Promise((resolve, reject) => {
    if ('success') {
        resolve(1);
    }
    else {
        reject();
    }
});
