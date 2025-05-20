import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, i as renderComponent, r as renderTemplate } from './astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { B as Book } from './Book_GQRm11Sy.mjs';

const $$Astro = createAstro();
const $$Article = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Article;
  const article = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/actu/${article.id}`, "href")} class="h-fit"> <article class="space-y-2.5 h-fit"> <img${addAttribute(article.image_URL, "src")} alt="Illustration de l'article" class="h-40 w-full"> <h4 class="line-clamp-2">${article?.title}</h4> <div class="flex gap-2.5 items-center tiny"> <p class="border rounded-md px-2.5 py-1">${article.topic}</p> <p>${article.date}</p> <span class="bg-dark-gray w-0.25 h-3"></span> ${renderComponent($$result, "Book", Book, {})} <p>${article.reading_time} min</p> </div> </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Article.astro", void 0);

export { $$Article as $ };
