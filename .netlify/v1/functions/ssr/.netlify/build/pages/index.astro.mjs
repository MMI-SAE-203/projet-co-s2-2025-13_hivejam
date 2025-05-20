import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, i as renderComponent, r as renderTemplate, l as renderScript } from '../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Lz9YwrB8.mjs';
import { $ as $$Team, a as $$JamMini } from '../chunks/Jam_mini_D6exhaJv.mjs';
import { $ as $$Post } from '../chunks/Post_CyiNJs9l.mjs';
import { B as Book } from '../chunks/Book_GQRm11Sy.mjs';
import { P as Prev, N as Next } from '../chunks/Prev_z3lVygQ9.mjs';
import Pocketbase from 'pocketbase';
import { l as getUserTeams, m as getPopularJam, q as getRecentArticle, e as getSomePost } from '../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$ArticleMini = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArticleMini;
  const article = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`actu/${article.id}`, "href")} class="flex flex-col gap-2 p-2 border-t border-dark-gray"> <h4 class="line-clamp-2">${article.title}</h4> <div class="flex gap-2.5 items-center tiny"> <p>${article.date}</p> <span class="bg-dark-gray w-0.25 h-4"></span> ${renderComponent($$result, "Book", Book, {})} <p>${article.reading_time} min</p> </div> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Article_mini.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pb = new Pocketbase("https://hivejam.paolo-vincent.fr:443/");
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
  console.log(user);
  const userTeams = await getUserTeams(user?.id);
  const jamsPopulaire = await getPopularJam();
  const recentArticle = await getRecentArticle();
  const posts = await getSomePost(1, 5);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-10 p-10"> <div class="space-y-10 col-start-1 col-span-3"> ${user ? renderTemplate`<section class="flex flex-col gap-10"> <div class="flex justify-between"> <h2>Mes Jams en cours</h2> <div class="flex gap-2"> <a href="/mes_jams" class="btn-light">
Voir mes jams
</a> <a href="/creer" class="btn-full">
Créer
</a> </div> </div> ${Object.keys(userTeams.present).length > 0 ? renderTemplate`<div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.present.map((team) => renderTemplate`${renderComponent($$result2, "Team", $$Team, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div>` : renderTemplate`<div class="text-center mb-10"> <p>Vous n'avez aucune game jam en cours</p> </div>`} </section>` : renderTemplate`<div class="space-y-6 col-start-1 col-end-4 display flex flex-col justify-center items-center"> <h2 class="self-start">Mes Jams en cours</h2> <h3>Vous n'êtes pas connectez</h3> <div class="flex items-center gap-2.5"> <a href="/auth" class="btn-light">
Login
</a> <a href="/auth" class="btn-full">
Sign Up
</a> </div> </div>`} <section class="flex flex-col gap-10"> <div class="flex justify-between"> <h2>Discussions récentes</h2> <div class="flex gap-2"> <a${addAttribute(`/forum/${1}`, "href")} class="btn-light">Aller au forum</a> </div> </div> <div class="border-b-1 border-dark-gray"> ${posts.posts?.map((post) => renderTemplate`${renderComponent($$result2, "Post", $$Post, { ...post })}`)} </div> </section> </div> <div class="space-y-10"> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Jams Populaires</h2> <div class="border-b border-dark-gray"> ${jamsPopulaire?.map((jam) => renderTemplate`${renderComponent($$result2, "Jam_Mini", $$JamMini, { ...jam })}`)} </div> <a href="/toutes_les_jams" class="btn-light self-end">Voir toutes les jams</a> </section> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Actualité</h2> <div class="border-b border-dark-gray"> ${recentArticle?.map((article) => renderTemplate`${renderComponent($$result2, "Article_Mini", $$ArticleMini, { ...article })}`)} </div> <a href="/actu" class="btn-light self-end">Voir toutes l'actu</a> </section> </div> </div> ` })} ${renderScript($$result, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
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
