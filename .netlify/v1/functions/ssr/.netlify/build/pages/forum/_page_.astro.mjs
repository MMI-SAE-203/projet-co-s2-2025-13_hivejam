import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, i as renderComponent } from '../../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_Lz9YwrB8.mjs';
import 'clsx';
import { $ as $$Post } from '../../chunks/Post_CyiNJs9l.mjs';
import Pocketbase from 'pocketbase';
import { e as getSomePost, f as getRecentComment } from '../../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Reponses = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Reponses;
  const { ...comment } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a href="" class="flex flex-col gap-2 p-2 border-t border-dark-gray"> <div class="flex items-center gap-2"> ${!(comment.expand.user.image_URL.length == 0) ? renderTemplate`<img class="h-8 w-8"${addAttribute(comment.expand.user.image_URL, "src")}>` : renderTemplate`<span class="bg-secondary-2 h-8 w-8 rounded-md"></span>`} <p class="tiny">${comment.expand.user.name}</p> </div> <p class="line-clamp-2"> ${comment.text} </p> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Reponses.astro", void 0);

const $$Astro = createAstro();
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
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
  const pageParam = Astro2.params;
  const page = parseInt(pageParam.page);
  let posts = await getSomePost(page, 2);
  let comments;
  if (user) {
    comments = await getRecentComment(user.id);
  }
  console.log(posts);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-10 p-10"> <div class="space-y-12 col-start-1 col-span-3"> <h1>Forum</h1> <h2>Discussions récentes</h2> <section class="border-b-1 border-dark-gray"> ${posts.posts?.map((post) => renderTemplate`${renderComponent($$result2, "Post", $$Post, { ...post })}`)} </section> <div class="flex gap-4 justify-center"> <div class="w-full flex justify-end"> ${page > 1 ? renderTemplate`<a${addAttribute(`/forum/${page - 1}`, "href")}>&lt; page précédente</a>` : ""} </div> <p class="rounded-full min-w-7 bg-brand-1 font-medium text-white text-xl text-center">${page}</p> <div class="w-full flex"> ${page < posts?.totalPages ? renderTemplate`<a${addAttribute(`/forum/${page + 1}`, "href")}>page suivante &gt;</a>` : ""} </div> </div> </div> <div class="space-y-10 col-span-1"> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Réponses</h2> ${user ? renderTemplate`<div class="border-b border-dark-gray"> ${comments?.map((comment) => renderTemplate`${renderComponent($$result2, "Reponses", $$Reponses, { ...comment })}`)} </div>` : renderTemplate`<div class="space-y-4 col-start-1 col-end-4 display flex flex-col justify-center items-center"> <h4>Vous n'êtes pas connecté</h4> </div>`} </section> </div> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/[page].astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/[page].astro";
const $$url = "/forum/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$page,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
