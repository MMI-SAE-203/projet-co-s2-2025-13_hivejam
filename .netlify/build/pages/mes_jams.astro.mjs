import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CShz5-nX.mjs';
import { C as Crown, $ as $$Team, a as $$JamMini } from '../chunks/Jam_mini_DCbKOfhL.mjs';
import PocketBase from 'pocketbase';
import { P as Prev, N as Next } from '../chunks/Prev_-pX8j6IG.mjs';
import { d as getUserTeams } from '../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$TeamMedium = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TeamMedium;
  const { ...team } = Astro2.props;
  console.log(team.expand?.game_jam);
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
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/mes_jams/${team.id}`, "href")}> <article class="border-1 border-drak-gray p-3 flex flex-col justify-between gap-2 w-80 rounded-md"> <div class="flex gap-2"> <img${addAttribute(team.image_URL, "src")} alt="" class="h-24"> <div class="flex flex-col gap-2"> <h3>${team.expand.game_jam?.name}</h3> <p class="tiny line-clamp-2">${team.expand.game_jam?.description}</p> </div> </div> <div class="flex flex-col"> <p class="tiny">Terminée il y a 4 mois et 2 semaines</p> </div> ${team.expand.game_jam.host == user?.id ? renderTemplate`<div class="self-end"> ${renderComponent($$result, "Crown", Crown, {})} </div>` : renderTemplate`<div class="self-end"></div>`} </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Team/Team_medium.astro", void 0);

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
  const userTeams = await getUserTeams(user?.id);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-10 p-10"> ${user ? renderTemplate`<div class="space-y-12 col-start-1 col-end-4"> <h1>Mes jams</h1> <section class="flex flex-col gap-10"> <div class="flex justify-between"> <h2>Mes Jams en cours</h2> <div class="flex gap-2"> <a href="/mes_jams" class="btn-light">
Rejoindre
</a> <a href="/creer" class="btn-full">
Créer
</a> </div> </div> <div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.present.map((team) => renderTemplate`${renderComponent($$result2, "Team", $$Team, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div> </section> <section class="flex flex-col gap-10"> <div class="flex"> <h2>À venir</h2> </div> <div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.future.map((team) => renderTemplate`${renderComponent($$result2, "Team_medium", $$TeamMedium, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div> </section> <section class="flex flex-col gap-10"> <div class="flex"> <h2>Terminée</h2> </div> <div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.past.map((team) => renderTemplate`${renderComponent($$result2, "Team_medium", $$TeamMedium, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div> </section> </div>` : renderTemplate`<div class="space-y-12 col-start-1 col-end-4 display flex flex-col justify-center items-center"> <h2>Vous n'êtes pas connectez</h2> <div class="flex items-center gap-2.5"> <a href="/auth" class="btn-light">
Login
</a> <a href="/auth" class="btn-full">
Sign Up
</a> </div> </div>`} <div class="space-y-10"> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Jams Populaires</h2> <div class="border-b border-dark-gray"> ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} ${renderComponent($$result2, "Jam_Mini", $$JamMini, {})} </div> <a href="/toutes_les_jams" class="btn-light self-end">Voir toutes les jams</a> </section> </div> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/index.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/index.astro";
const $$url = "/mes_jams";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
