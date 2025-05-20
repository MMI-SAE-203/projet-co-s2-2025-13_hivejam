import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Lz9YwrB8.mjs';
import { B as Book } from '../../chunks/Book_GQRm11Sy.mjs';
import { P as Prev, N as Next } from '../../chunks/Prev_z3lVygQ9.mjs';
import { g as getArticle, a as getSimilarArticle } from '../../chunks/backend_D0iwzCcC.mjs';
import { $ as $$Article } from '../../chunks/Article_UVCLvTYN.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const article = await getArticle(id);
  const similarArticle = await getSimilarArticle(article?.topic);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-10 py-20 space-y-20"> <section class="grid grid-cols-2 gap-8"> <img${addAttribute(article?.image_URL, "src")} alt="" class="max-h-100 justify-self-center"> <div class="flex flex-col justify-center items-center gap-8"> <h1 class="text-center">${article?.title}</h1> <div class="flex items-center gap-8"> <p class="border rounded-md px-2.5 py-1"> ${article?.topic} </p> <div class="flex items-center gap-2"> ${renderComponent($$result2, "Book", Book, {})} <p>${article?.reading_time} min</p> </div> <p>${article?.date}</p> </div> </div> </section> <section class="space-y-10 px-100"> <h2>Article</h2> <div class="flex flex-col gap-4">${unescapeHTML(article?.text)}</div> </section> <section class="space-y-10"> <h2>D'autre articles</h2> <div class="flex flex-col"> <div class="flex gap-6 overflow-x-scroll border-l-3 border-r-3 border-brand-1 px-10 py-2"> ${similarArticle.map((team) => renderTemplate`<div class="w-100"> ${renderComponent($$result2, "Article", $$Article, { ...team })} </div>`)} </div> <div class="flex justify-center gap-10"> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Prev", Prev, {})} </button> <button class="flex justify-center items-center border-2 border-brand-1 rounded-4xl p-2.5 h-10 w-10 cursor-pointer"> ${renderComponent($$result2, "Next", Next, {})} </button> </div> </div> </section> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/actu/[id].astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/actu/[id].astro";
const $$url = "/actu/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
