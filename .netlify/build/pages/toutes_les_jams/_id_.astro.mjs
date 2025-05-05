import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CShz5-nX.mjs';
import { P as Prev, N as Next } from '../../chunks/Prev_-pX8j6IG.mjs';
import { e as getJamPage } from '../../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const jam = await getJamPage(id);
  console.log(jam);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-10 py-20 space-y-10"> <section class="flex justify-between items-center"> <h1>${jam?.name}</h1> <a href="" class="btn-full">Rejoindre</a> </section> <section class="grid grid-cols-2 gap-10"> <img${addAttribute(jam?.image_URL, "src")} alt="" class="col-start-1"> <div class="flex flex-col justify-between py-11"> <div class="flex flex-col justify-center items-center gap-4"> <h2>Compte à rebours</h2> <div> <p>${jam?.time_info}</p> <span class="font-bold text-6xl text-negative">12:34:56</span> </div> </div> <div class="flex flex-col justify-center items-center"> <h2>Thème</h2> <p>${jam?.theme}</p> </div> </div> </section> <section class="space-y-5"> <h2>Description</h2> <div>${unescapeHTML(jam?.description)}</div> </section> <section> <h2>Jeux Soumis</h2> <div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"></div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div> </section> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/toutes_les_jams/[id].astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/toutes_les_jams/[id].astro";
const $$url = "/toutes_les_jams/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
