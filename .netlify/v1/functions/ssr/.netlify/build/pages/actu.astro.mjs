import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_Lz9YwrB8.mjs';
import { $ as $$Article } from '../chunks/Article_UVCLvTYN.mjs';
import { B as Book } from '../chunks/Book_GQRm11Sy.mjs';
import { b as getAllArticle } from '../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$ArticleBig = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArticleBig;
  const article = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/actu/${article.id}`, "href")} class="col-start-1 col-end-3 row-start-1 row-end-3"> <article class="flex flex-col gap-2 h-full"> <img${addAttribute(article.image_URL, "src")} alt="" class="h-160"> <div class="space-y-2.5"> <h3>${article.title}</h3> <div class="flex gap-2.5 items-center tiny"> <p class="border rounded-md px-2.5 py-1">${article.topic}</p> <p>${article.date}</p> <span class="bg-dark-gray w-0.25 h-3"></span> ${renderComponent($$result, "Book", Book, {})} <p>${article.reading_time} min</p> </div> </div> </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Article_big.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const articles = await getAllArticle();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-12.5 p-10"> <h1>Actualités</h1> <section class="space-y-10"> <h2>Articles à la une</h2> <div class="grid grid-cols-3 grid-rows-1 gap-6"> ${renderComponent($$result2, "ArticleBig", $$ArticleBig, { ...articles[0] })} ${renderComponent($$result2, "Article", $$Article, { ...articles[1] })} ${renderComponent($$result2, "Article", $$Article, { ...articles[2] })} </div> </section> <section class="space-y-10"> <h2>Toute l'actualité</h2> <div class="grid grid-cols-4 gap-6"> ${articles.map((article) => renderTemplate`${renderComponent($$result2, "Article", $$Article, { ...article })}`)} </div> </section> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/actu/index.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/actu/index.astro";
const $$url = "/actu";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
