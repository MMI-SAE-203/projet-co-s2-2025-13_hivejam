import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Lz9YwrB8.mjs';
import { $ as $$TeamMedium } from '../../chunks/Team_medium_Cok4clWN.mjs';
import { P as Prev, N as Next } from '../../chunks/Prev_z3lVygQ9.mjs';
import { n as getUser, l as getUserTeams } from '../../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const user = await getUser(id);
  const userTeams = await getUserTeams(id);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <section class="flex justify-center items-center gap-20"> <img${addAttribute(user?.image_URL, "src")} alt=""> <h1>${user?.name}</h1> </section> <section> <h2>Biographie</h2> ${user?.bio ? renderTemplate`<p>${user?.bio}</p>` : renderTemplate`<p>Cette utilisateur n'a pas de biographie</p>`} </section> <section class="flex flex-col gap-10"> <div class="flex"> <h2>Jam Participer</h2> </div> ${Object.keys(userTeams.past).length > 0 ? renderTemplate`<div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${userTeams?.past.map((team) => renderTemplate`${renderComponent($$result2, "Team_medium", $$TeamMedium, { ...team })}`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div>` : renderTemplate`<div class="text-center"> <p>Cette utilisateur n'a jamais participer a une Jam</p> </div>`} </section> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/profile/[id].astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/profile/[id].astro";
const $$url = "/profile/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
