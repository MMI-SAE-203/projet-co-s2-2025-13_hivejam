import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, i as renderComponent, r as renderTemplate } from './astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { C as Comment } from './Comment_D003A93p.mjs';

const $$Astro = createAstro();
const $$Post = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Post;
  const { ...post } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/forum/post/${post.id}`, "href")}> <article class="flex flex-col gap-4 px-2 py-4 border-t-1 border-dark-gray"> <div class="flex gap-2 items-center"> ${!(post.expand.user.image_URL.length == 0) ? renderTemplate`<img class="h-8 w-8"${addAttribute(post.expand.user.image_URL, "src")}>` : renderTemplate`<span class="bg-secondary-2 h-8 w-8 rounded-md"></span>`} <p class="tiny">${post.expand.user.name}</p> </div> <header> <h4 class="font-semibold text-xl">${post.title}</h4> </header> <p class="line-clamp-5">${post.text}</p> ${post.image_URL ? renderTemplate`<img class="max-h-100"${addAttribute(post.image_URL, "src")} alt="Image du post" loading="lazy">` : ""} <div class="flex gap-1 items-center self-end *:h-6"> ${post.comment_NB} ${renderComponent($$result, "Comment", Comment, {})} </div> </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Post.astro", void 0);

export { $$Post as $ };
