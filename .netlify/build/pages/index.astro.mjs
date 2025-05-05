import { e as createComponent, m as maybeRenderHead, i as renderComponent, r as renderTemplate, f as createAstro } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CShz5-nX.mjs';
import { $ as $$Team, a as $$JamMini } from '../chunks/Jam_mini_DCbKOfhL.mjs';
import { $ as $$Post } from '../chunks/Post_BGgjPhGV.mjs';
import { B as Book } from '../chunks/Book_De8exgnj.mjs';
import { P as Prev, N as Next } from '../chunks/Prev_-pX8j6IG.mjs';
import PocketBase from 'pocketbase';
import { d as getUserTeams } from '../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../renderers.mjs';

const $$ArticleMini = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="" class="flex flex-col gap-2 p-2 border-t border-dark-gray"> <h4>Titre de l'article</h4> <div class="flex gap-2.5 items-center tiny"> <p>07 Mars 25</p> <span class="bg-dark-gray w-0.25 h-4"></span> ${renderComponent($$result, "Book", Book, {})} <p>2 min</p> </div> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Article_mini.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pb = new PocketBase("http://127.0.0.1:8090");
  const cookies = Astro2.cookies;
  const token = cookies.get("pb_auth")?.value;
  if (token) {
    pb.authStore.save(token);
  }
  let user = pb.authStore.model;
  if (!user && pb.authStore.isValid) {
    await pb.collection("users").authRefresh();
    user = pb.authStore.model;
  }
  console.log(user?.id);
  const userTeams = await getUserTeams(user?.id);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-10 p-10"> <div class="space-y-10 col-start-1 col-end-4"> ${user ? renderTemplate`<section class="flex flex-col gap-10"> <div class="flex justify-between"> <h2>Mes Jams en cours</h2> <div class="flex gap-2"> <a href="/mes_jams" class="btn-light">
Voir mes jams
</a> <a href="/creer" class="btn-full">
Créer
</a> </div> </div> <div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.present.map((team) => renderTemplate`${renderComponent($$result2, "Team", $$Team, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div> </section>` : renderTemplate`<div class="space-y-6 col-start-1 col-end-4 display flex flex-col justify-center items-center"> <h2 class="self-start">Mes Jams en cours</h2> <h3>Vous n'êtes pas connectez</h3> <div class="flex items-center gap-2.5"> <a href="/auth" class="btn-light">
Login
</a> <a href="/auth" class="btn-full">
Sign Up
</a> </div> </div>`} <section class="flex flex-col gap-10"> <div class="flex justify-between"> <h2>Discussions récentes</h2> <div class="flex gap-2"> <a href="/forum" class="btn-light">Aller au forum</a> </div> </div> <div class="border-b-1 border-dark-gray"> ${renderComponent($$result2, "Post", $$Post, {})} ${renderComponent($$result2, "Post", $$Post, {})} </div> </section> </div> <div class="space-y-10"> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Jams Populaires</h2> <div class="border-b border-dark-gray"> ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} </div> <a href="/toutes_les_jams" class="btn-light self-end">Voir toutes les jams</a> </section> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Actualité</h2> <div class="border-b border-dark-gray"> ${renderComponent($$result2, "Article_Mini", $$ArticleMini, {})} ${renderComponent($$result2, "Article_Mini", $$ArticleMini, {})} ${renderComponent($$result2, "Article_Mini", $$ArticleMini, {})} </div> <a href="/actu" class="btn-light self-end">Voir toutes l'actu</a> </section> </div> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/index.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
