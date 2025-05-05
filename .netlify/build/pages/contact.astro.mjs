import { e as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CShz5-nX.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-10 space-y-10"> <h1>Besoin de nous contacter ?</h1> <form method="post" action="/contact" enctype="multipart/form-data" class="flex flex-col gap-5 px-60"> <div class="flex gap-5 justify-between mb-10"> <div class="flex flex-col  w-full"> <label for="nom">Nom</label> <input type="text" name="nom" id="nom" placeholder="Votre nom" required class="btn-light normal-case placeholder:uppercase"> </div> <div class="flex flex-col w-full"> <label for="prenom">Prenom</label> <input type="text" name="prenom" id="prenom" placeholder="Votre prénom" required class="btn-light normal-case placeholder:uppercase"> </div> <div class="flex flex-col w-full"> <label for="email">Adresse E-Mail</label> <input type="email" name="email" id="email" placeholder="Votre adresse e-mail" required class="btn-light normal-case placeholder:uppercase"> </div> </div> <div class="flex flex-col w-2/3"> <label for="sujet">Sujet</label> <input type="text" name="sujet" id="sujet" placeholder="Le sujet de votre message" required class="btn-light normal-case placeholder:uppercase"> </div> <div class="flex flex-col w-2/3"> <label for="message">Description</label> <textarea name="message" id="message" placeholder="Votre message" required class="btn-light min-h-40"></textarea> </div> <button type="submit" class="btn-full self-center">
Envoyer
</button> </form> </div> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/contact.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Contact,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
