import { e as createComponent, f as createAstro, m as maybeRenderHead, i as renderComponent, h as addAttribute, r as renderTemplate } from '../../../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_Lz9YwrB8.mjs';
import { C as Comment } from '../../../chunks/Comment_D003A93p.mjs';
import Pocketbase from 'pocketbase';
import { d as getPostPage } from '../../../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$CommentCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CommentCard;
  const { comment } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="flex flex-col gap-4 py-4 border-t-1 border-dark-gray"> <div class="flex items-center gap-2"> ${!(comment.expand.user.image_URL.length == 0) ? renderTemplate`<img class="h-8 w-8"${addAttribute(comment.expand.user.image_URL, "src")}>` : renderTemplate`<span class="bg-secondary-2 h-8 w-8 rounded-md"></span>`} <p class="tiny">${comment.expand.user.name}</p> </div> <div class="flex justify-between"> <p class="line-clamp-2">${comment.text}</p> <div class="flex gap-1 items-center self-end *:h-6"> ${comment.comment.length} ${renderComponent($$result, "Comment", Comment, {})} </div> </div> <div class="pl-8"> ${comment.comment.map((reply) => renderTemplate`${renderComponent($$result, "CommentCard", $$CommentCard, { "comment": reply })}`)} </div> </article>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/CommentCard.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
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
  const { id } = Astro2.params;
  const post = await getPostPage(id);
  console.log(post.comment[0]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-8 p-10 mx-30"> <a class="btn-light w-fit" href="javascript:history.back()">Retour au forum</a> <article class="flex flex-col gap-4 px-2 py-4 border-y-1 border-dark-gray"> <div class="flex gap-2 items-center"> ${!(post.expand.user.image_URL.length == 0) ? renderTemplate`<img class="h-8 w-8"${addAttribute(post.expand.user.image_URL, "src")}>` : renderTemplate`<span class="bg-secondary-2 h-8 w-8 rounded-md"></span>`} <p class="tiny">${post.expand.user.name}</p> </div> <header> <h4 class="font-semibold text-xl">${post.title}</h4> </header> <p>${post.text}</p> ${post.image_URL ? renderTemplate`<img class="max-h-200 object-contain"${addAttribute(post.image_URL, "src")} alt="Image du post" loading="lazy">` : ""} <div class="flex gap-1 items-center self-end *:h-6"> ${post.comment_NB} ${renderComponent($$result2, "Comment", Comment, {})} </div> </article> <div class="rounded-full border-1 border-dark-gray p-4">
Ajouter un commentaire
</div> <div class="flex flex-col"> ${post.comment.map((comment) => renderTemplate`${renderComponent($$result2, "CommentCard", $$CommentCard, { "comment": comment })}`)} </div> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/post/[id].astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/post/[id].astro";
const $$url = "/forum/post/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
