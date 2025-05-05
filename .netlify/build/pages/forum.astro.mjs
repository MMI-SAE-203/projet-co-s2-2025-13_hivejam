import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, i as renderComponent } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CShz5-nX.mjs';
import 'clsx';
import { $ as $$Post } from '../chunks/Post_BGgjPhGV.mjs';
import PocketBase from 'pocketbase';
export { renderers } from '../renderers.mjs';

const $$Reponses = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="" class="flex flex-col gap-2 p-2 border-t border-dark-gray"> <div class="flex items-center gap-2"> <span class="bg-secondary-2 h-8 w-8"></span> <p>Username</p> </div> <p class="line-clamp-2">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla tempore
        a, velit modi recusandae asperiores ducimus cumque tempora aliquam
        perspiciatis nam non cum placeat sapiente rem officia distinctio vel
        eum?
</p> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Reponses.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pb = new PocketBase("http://127.0.0.1:8090");
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-4 gap-10 p-10"> <div class="space-y-12 col-start-1 col-end-4"> <h1>Forum</h1> <h2>Discussions récentes</h2> <section class="border-b-1 border-dark-gray"> ${renderComponent($$result2, "Post", $$Post, {})} ${renderComponent($$result2, "Post", $$Post, {})} </section> </div> <div class="space-y-10"> <section class="flex flex-col gap-4 border-1 border-dark-gray p-4 rounded-md"> <h2>Réponses</h2> ${user ? renderTemplate`<div class="border-b border-dark-gray"> ${renderComponent($$result2, "Reponses", $$Reponses, {})} ${renderComponent($$result2, "Reponses", $$Reponses, {})} ${renderComponent($$result2, "Reponses", $$Reponses, {})} </div>` : renderTemplate`<div class="space-y-4 col-start-1 col-end-4 display flex flex-col justify-center items-center"> <h4>Vous n'êtes pas connectez</h4> <div class="flex items-center gap-2.5"> <a href="/auth" class="btn-light">
Login
</a> <a href="/auth" class="btn-full">
Sign Up
</a> </div> </div>`} </section> </div> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/index.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/forum/index.astro";
const $$url = "/forum";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
