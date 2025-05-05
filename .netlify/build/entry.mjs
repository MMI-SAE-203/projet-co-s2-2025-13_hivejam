import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C9Mbjjdz.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/actu.astro.mjs');
const _page2 = () => import('./pages/auth.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/creer.astro.mjs');
const _page5 = () => import('./pages/forum.astro.mjs');
const _page6 = () => import('./pages/game.astro.mjs');
const _page7 = () => import('./pages/games/testgame.astro.mjs');
const _page8 = () => import('./pages/landing_page.astro.mjs');
const _page9 = () => import('./pages/logout.astro.mjs');
const _page10 = () => import('./pages/mes_jams/_id_.astro.mjs');
const _page11 = () => import('./pages/mes_jams.astro.mjs');
const _page12 = () => import('./pages/toutes_les_jams/_id_.astro.mjs');
const _page13 = () => import('./pages/toutes_les_jams.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/actu/index.astro", _page1],
    ["src/pages/auth.astro", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/creer.astro", _page4],
    ["src/pages/forum/index.astro", _page5],
    ["src/pages/game.astro", _page6],
    ["src/pages/games/testgame.astro", _page7],
    ["src/pages/landing_page.astro", _page8],
    ["src/pages/logout.astro", _page9],
    ["src/pages/mes_jams/[id].astro", _page10],
    ["src/pages/mes_jams/index.astro", _page11],
    ["src/pages/toutes_les_jams/[id].astro", _page12],
    ["src/pages/toutes_les_jams/index.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bc9dc58a-928e-4b79-9ede-f3c61b2260ca"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
