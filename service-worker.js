---
<<<<<<< HEAD
---
'use strict';
/*eslint no-undef: 0*/
/* {{ site.time | date: data_to_xmlschema }} */
=======
layout: null
---
'use strict';
/*eslint no-undef: 0*/
/* {{ site.data.app.version }} */
>>>>>>> patch/rebase
self.importScripts('/sw-config.js');

self.addEventListener('install', async event => {
	event.waitUntil((async () => {
		try {
			for (const key of await caches.keys()) {
<<<<<<< HEAD
				await caches.delete(key);
			}

			const cache = await caches.open(config.version);
			await cache.addAll(config.stale);
=======
				if (key !== 'user') {
					await caches.delete(key);
				}
			}

			const cache = await caches.open(config.version);
			await cache.addAll([...config.stale || [], ...config.fresh || []]);
>>>>>>> patch/rebase
		} catch (err) {
			console.error(err);
		}
	})());
});

self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('fetch', event => {
<<<<<<< HEAD
	if (event.request.method === 'GET' && event.request.url.startsWith(location.origin)) {
=======
	if (event.request.method === 'GET') {
>>>>>>> patch/rebase
		event.respondWith((async () => {
			const url = new URL(event.request.url);
			url.hash = '';

			if (Array.isArray(config.stale) && config.stale.includes(url.href)) {
				const cached = await caches.match(url);
				if (cached instanceof Response) {
					return cached;
				}
			} else if (Array.isArray(config.fresh) && config.fresh.includes(url.href)) {
				if (navigator.onLine) {
					const resp = await fetch(url.href);
					const cache = await caches.open(config.version);

					if (resp.ok) {
<<<<<<< HEAD
						cache.add(resp.clone());
					}
					return resp;
				} else {
					return caches.match(event.request);
				}
			} else if (Array.isArray(config.allowed) && config.allowed.some(host => new URL(event.request.url).host === host)) {
				const resp = await caches.match(event.request);
				if (resp instanceof Response) {
					return resp;
				} else if (navigator.onLine) {
					const resp = await fetch(event.request);
					const cache = await caches.open(config.version);
					cache.add(resp.clone());
					return resp;
				}
			} else {
				return fetch(event.request.url);
=======
						cache.put(event.request, resp.clone());
					}
					return resp;
				} else {
					return caches.match(event.request.url);
				}
			} else if (Array.isArray(config.allowed) && config.allowed.some(entry => (
				entry instanceof RegExp
					? entry.test(event.request.url)
					: url.host === entry
			))) {
				const resp = await caches.match(event.request.url);
				if (resp instanceof Response) {
					return resp;
				} else if (navigator.onLine) {
					const resp = await fetch(event.request.url, {
						mode: 'cors',
						headers: event.request.headers,
					});

					if (resp instanceof Response) {
						const cache = await caches.open(config.version);
						cache.put(event.request.url, resp.clone());
						return resp;
					} else {
						console.error(`Failed in request for ${event.request.url}`);
					}
				} else {
					console.error('Offline');
				}
			} else {
				return fetch(event.request);
>>>>>>> patch/rebase
			}
		})());
	}
});

self.addEventListener('error', console.error);
