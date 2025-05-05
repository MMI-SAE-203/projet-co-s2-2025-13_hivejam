import { e as createComponent, f as createAstro } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import 'clsx';
import PocketBase from 'pocketbase';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  const pb = new PocketBase("http://127.0.0.1:8090");
  const cookies = Astro2.cookies;
  pb.authStore.clear();
  cookies.delete("pb_auth", { path: "/" });
  return Astro2.redirect("/");
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/logout.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
