import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_LpxO00PT.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/","cacheDir":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/node_modules/.astro/","outDir":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/dist/","srcDir":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/src/","publicDir":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/public/","buildClientDir":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/dist/","buildServerDir":"file:///C:/Users/black/Desktop/Projet%20S2/projet-co-s2-2025-13_hivejam/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/actu","isIndex":true,"type":"page","pattern":"^\\/actu\\/?$","segments":[[{"content":"actu","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/actu/index.astro","pathname":"/actu","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/auth","isIndex":false,"type":"page","pattern":"^\\/auth\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth.astro","pathname":"/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/creer","isIndex":false,"type":"page","pattern":"^\\/creer\\/?$","segments":[[{"content":"creer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/creer.astro","pathname":"/creer","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/forum","isIndex":true,"type":"page","pattern":"^\\/forum\\/?$","segments":[[{"content":"forum","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/forum/index.astro","pathname":"/forum","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"route":"/game","isIndex":false,"type":"page","pattern":"^\\/game\\/?$","segments":[[{"content":"game","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/game.astro","pathname":"/game","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"route":"/games/testgame","isIndex":false,"type":"page","pattern":"^\\/games\\/testgame\\/?$","segments":[[{"content":"games","dynamic":false,"spread":false}],[{"content":"testgame","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/games/testgame.astro","pathname":"/games/testgame","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/landing_page","isIndex":false,"type":"page","pattern":"^\\/landing_page\\/?$","segments":[[{"content":"landing_page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing_page.astro","pathname":"/landing_page","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[],"routeData":{"route":"/logout","isIndex":false,"type":"page","pattern":"^\\/logout\\/?$","segments":[[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logout.astro","pathname":"/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/mes_jams/[id]","isIndex":false,"type":"page","pattern":"^\\/mes_jams\\/([^/]+?)\\/?$","segments":[[{"content":"mes_jams","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/mes_jams/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/mes_jams","isIndex":true,"type":"page","pattern":"^\\/mes_jams\\/?$","segments":[[{"content":"mes_jams","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/mes_jams/index.astro","pathname":"/mes_jams","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/toutes_les_jams/[id]","isIndex":false,"type":"page","pattern":"^\\/toutes_les_jams\\/([^/]+?)\\/?$","segments":[[{"content":"toutes_les_jams","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/toutes_les_jams/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/toutes_les_jams","isIndex":true,"type":"page","pattern":"^\\/toutes_les_jams\\/?$","segments":[[{"content":"toutes_les_jams","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/toutes_les_jams/index.astro","pathname":"/toutes_les_jams","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.BvKxy2Uc.js"}],"styles":[{"type":"external","src":"/_astro/index.Etq6GD0t.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/game.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/games/testgame.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/landing_page.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/actu/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/creer.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/toutes_les_jams/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/toutes_les_jams/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/actu/index@_@astro":"pages/actu.astro.mjs","\u0000@astro-page:src/pages/auth@_@astro":"pages/auth.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/creer@_@astro":"pages/creer.astro.mjs","\u0000@astro-page:src/pages/forum/index@_@astro":"pages/forum.astro.mjs","\u0000@astro-page:src/pages/game@_@astro":"pages/game.astro.mjs","\u0000@astro-page:src/pages/games/testgame@_@astro":"pages/games/testgame.astro.mjs","\u0000@astro-page:src/pages/landing_page@_@astro":"pages/landing_page.astro.mjs","\u0000@astro-page:src/pages/logout@_@astro":"pages/logout.astro.mjs","\u0000@astro-page:src/pages/mes_jams/[id]@_@astro":"pages/mes_jams/_id_.astro.mjs","\u0000@astro-page:src/pages/mes_jams/index@_@astro":"pages/mes_jams.astro.mjs","\u0000@astro-page:src/pages/toutes_les_jams/[id]@_@astro":"pages/toutes_les_jams/_id_.astro.mjs","\u0000@astro-page:src/pages/toutes_les_jams/index@_@astro":"pages/toutes_les_jams.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C9Mbjjdz.mjs","C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C_N5CV1s.mjs","C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/landing_page.astro?astro&type=script&index=0&lang.ts":"_astro/landing_page.astro_astro_type_script_index_0_lang.DO4CWw4M.js","astro:scripts/page.js":"_astro/page.BvKxy2Uc.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/landing_page.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"#menu-btn\"),o=document.querySelector(\"#menu\"),c=document.body;e&&o&&e.addEventListener(\"click\",()=>{const n=e.ariaExpanded===\"true\",t=!n;e.ariaExpanded=String(t),o.ariaHidden=String(n),c.classList.toggle(\"noscroll\",t)});"]],"assets":["/_astro/Next.CexK82Cb.svg","/_astro/Prev.Bm7G8Sw0.svg","/_astro/User_orange.Bp-4wGbk.svg","/_astro/logo.CcYcHbUN.svg","/_astro/icon_facebook.DgTBCkBz.svg","/_astro/icon_insta.Bf89i2UQ.svg","/_astro/icon_tiktok.ONr6oYRR.svg","/_astro/icon_twitter.BBHFpth4.svg","/_astro/hexagon_hero.CMHUiPDQ.png","/_astro/abeille_free.BIb0ezma.png","/_astro/abeille_premium.uA8bshQi.png","/_astro/abeille_royal.Dm9ac39T.png","/_astro/icon_contact.CH3b0AfC.svg","/_astro/icon_tickets.DEMuIDQy.svg","/_astro/icon_interogation.BsS1E9nc.svg","/_astro/icon_fonctionalite.Dpy8b-VH.svg","/_astro/icon_info.DE_sv6sX.svg","/_astro/icon_pen.Dxg8cHV3.svg","/_astro/icon_partage._avb_zv3.svg","/_astro/icon_code.6i4WDs95.svg","/_astro/Book.CvMbpoAK.svg","/_astro/Comment.Bo7HKarz.svg","/_astro/jam_placeholder.DZLYlYoE.png","/_astro/Crown.Dcgtzczr.svg","/_astro/Article_placeholder.SvHhFGFz.png","/_astro/Group.jPNYrnZI.svg","/_astro/logo-white.B4XwtKpZ.svg","/_astro/fond_hero.CbykUt2D.png","/_astro/index.Etq6GD0t.css","/favicon.svg","/_astro/page.BvKxy2Uc.js","/_astro/page.BvKxy2Uc.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"UXkv97YhZf+2c4T0glHTJ0nyYiGc2pu11442NOCLTNg=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\black\\Desktop\\Projet S2\\projet-co-s2-2025-13_hivejam\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
