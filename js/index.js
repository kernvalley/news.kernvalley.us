import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://unpkg.com/@webcomponents/custom-elements@1.4.2/custom-elements.min.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/share-to-button/share-to-button.js';
import 'https://cdn.kernvalley.us/components/slide-show/slide-show.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/bacon-ipsum.js';
import 'https://cdn.kernvalley.us/components/leaflet/map.js';
import 'https://cdn.kernvalley.us/components/leaflet/marker.js';
import 'https://cdn.kernvalley.us/components/pwa/install.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import 'https://cdn.kernvalley.us/components/weather/current.js';
import 'https://cdn.kernvalley.us/components/app/list-button.js';
import { $, ready } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { init } from 'https://cdn.kernvalley.us/js/std-js/data-handlers.js';
import { loadScript } from 'https://cdn.kernvalley.us/js/std-js/loader.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';

$(document.documentElement).toggleClass({
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'no-js': false,
	'js': true,
});

if (typeof GA === 'string' && GA.length !== 0) {
	requestIdleCallback(() => {
		importGa(GA).then(async ({ ga }) => {
			ga('create', GA, 'auto');
			ga('set', 'transport', 'beacon');
			ga('send', 'pageview');

			await ready();

			$('a[rel~="external"]').click(externalHandler, { passive: true, capture: true });
			$('a[href^="tel:"]').click(telHandler, { passive: true, capture: true });
			$('a[href^="mailto:"]').click(mailtoHandler, { passive: true, capture: true });
		});
	});
}

cookieStore.get({ name: 'theme' }).then(async cookie => {
	await $.ready;
	const $ads = $('ad-block:not([theme]), ad-block[theme="auto"]');
	const setTheme = async ({ name, value = 'auto' }) => {
		if (name === 'theme') {
			await Promise.all([
				$(':root, [data-theme]').data({ theme: value }),
				$('[theme]:not(ad-block)').attr({ theme: value }),
				$ads.attr({ theme: value }),
			]);
		}
	};

	if (cookie) {
		setTheme(cookie);
	}

	cookieStore.addEventListener('change', ({ changed, deleted }) => {
		const cookie = [...changed, ...deleted].find(({ name }) => name === 'theme');

		if (cookie) {
			setTheme(cookie);
		}
	});
});

document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

$(window).debounce('resize', () => {
	$(document.documentElement).css({'--viewport-height': `${window.innerHeight}px`});
});

Promise.allSettled([
	ready(),
	loadScript('https://cdn.polyfill.io/v3/polyfill.min.js'),
]).then(async () => {
	init().catch(console.error);
});
