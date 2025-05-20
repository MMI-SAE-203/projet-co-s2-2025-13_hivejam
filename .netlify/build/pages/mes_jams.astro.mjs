import { e as createComponent, f as createAstro, i as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Lz9YwrB8.mjs';
import { $ as $$Team, a as $$JamMini } from '../chunks/Jam_mini_D6exhaJv.mjs';
import { $ as $$TeamMedium } from '../chunks/Team_medium_Cok4clWN.mjs';
import { P as Prev, N as Next } from '../chunks/Prev_z3lVygQ9.mjs';
import Pocketbase from 'pocketbase';
import { l as getUserTeams, m as getPopularJam } from '../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../renderers.mjs';

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
  const userTeams = await getUserTeams(user?.id);
  const jamsPopulaire = await getPopularJam();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-10 p-10"> ${user ? renderTemplate`<div class="space-y-12 col-start-1 col-end-4"> <h1>Mes jams</h1> <section class="flex flex-col gap-10"> <div class="flex justify-between"> <h2>En cours</h2> <div class="flex gap-2"> <a href="/mes_jams" class="btn-light">
Rejoindre
</a> <a href="/creer" class="btn-full">
Créer
</a> </div> </div> ${Object.keys(userTeams.present).length > 0 ? renderTemplate`<div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.present.map((team) => renderTemplate`${renderComponent($$result2, "Team", $$Team, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div>` : renderTemplate`<div class="text-center"> <p>Vous n'avez aucune game jam en cours</p> </div>`} </section> <section class="flex flex-col gap-10"> <div class="flex"> <h2>À venir</h2> </div> ${Object.keys(userTeams.future).length > 0 ? renderTemplate`<div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.future.map((team) => renderTemplate`${renderComponent($$result2, "Team_medium", $$TeamMedium, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div>` : renderTemplate`<div class="text-center"> <p>Vous n'avez aucune game jam à venir</p> </div>`} </section> <section class="flex flex-col gap-10"> <div class="flex"> <h2>Terminée</h2> </div> ${Object.keys(userTeams.past).length > 0 ? renderTemplate`<div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.past.map((team) => renderTemplate`${renderComponent($$result2, "Team_medium", $$TeamMedium, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div>` : renderTemplate`<div class="text-center"> <p>Vous n'avez aucune game jam terminée</p> </div>`} </section> </div>` : renderTemplate`<div class="space-y-12 col-start-1 col-end-4 display flex flex-col justify-center items-center"> <h2>Vous n'êtes pas connectez</h2> <div class="flex items-center gap-2.5"> <a href="/auth" class="btn-light">
Login
</a> <a href="/auth" class="btn-full">
Sign Up
</a> </div> </div>`} <div class="space-y-10"> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Jams Populaires</h2> <div class="border-b border-dark-gray"> ${jamsPopulaire?.map((jam) => renderTemplate`${renderComponent($$result2, "Jam_Mini", $$JamMini, { ...jam })}`)} </div> <a href="/toutes_les_jams" class="btn-light self-end">Voir toutes les jams</a> </section> </div> </div> ` })} ${renderScript($$result, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/index.astro?astro&type=script&index=0&lang.ts")}`;
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
