import { e as createComponent, m as maybeRenderHead, h as addAttribute, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CShz5-nX.mjs';
import { B as Book } from '../chunks/Book_De8exgnj.mjs';
export { renderers } from '../renderers.mjs';

const Placholder = new Proxy({"src":"/_astro/Article_placeholder.SvHhFGFz.png","width":825,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/assets/img/Article_placeholder.png";
							}
							
							return target[name];
						}
					});

const $$Article = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="" class="h-fit"> <article class="space-y-2.5 h-fit"> <img${addAttribute(Placholder.src, "src")} alt=""> <h4>Titre de l'article principale</h4> <div class="flex gap-2.5 items-center tiny"> <p class="border rounded-md px-2.5 py-1">Topic</p> <p>07 Mars 25</p> <span class="bg-dark-gray w-0.25 h-3"></span> ${renderComponent($$result, "Book", Book, {})} <p>2 min</p> </div> </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Article.astro", void 0);

const $$ArticleBig = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="" class="col-start-1 col-end-3 row-start-1 row-end-3"> <article class="flex flex-col gap-2 h-full"> <img${addAttribute(Placholder.src, "src")} alt="" class="h-full"> <div class="space-y-2.5"> <h3>Titre de l'article principale</h3> <div class="flex gap-2.5 items-center tiny"> <p class="border rounded-md px-2.5 py-1">Topic</p> <p>07 Mars 25</p> <span class="bg-dark-gray w-0.25 h-3"></span> ${renderComponent($$result, "Book", Book, {})} <p>2 min</p> </div> </div> </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Article_big.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-12.5 p-10"> <h1>Actualités</h1> <section class="space-y-10"> <h2>Articles à la une</h2> <div class="grid grid-cols-3 grid-rows-1 gap-6"> ${renderComponent($$result2, "ArticleBig", $$ArticleBig, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} </div> </section> <section class="space-y-10"> <h2>Toute l'actualité</h2> <div class="grid grid-cols-4 gap-6"> ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} ${renderComponent($$result2, "Article", $$Article, {})} </div> </section> </div> ` })}`;
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
