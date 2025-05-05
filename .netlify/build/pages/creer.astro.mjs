import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CShz5-nX.mjs';
import PocketBase from 'pocketbase';
import { a as addJam } from '../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Creer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Creer;
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
  if (Astro2.request.method == "POST") {
    const data = await Astro2.request.formData();
    data.append("host", user?.id);
    console.log(data);
    const message = await addJam(data, user?.name, user?.id);
    console.log(message);
    return Astro2.redirect(message.redirect);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h2>Créer votre Jam</h2> <form method="POST"> <input type="hidden" name="formType" value="jam"> <input type="text" name="name" placeholder="Nom de la jam" required> <input type="text" name="theme" placeholder="Thème de la jam" required> <textarea name="description" placeholder="Descrption du thème"></textarea> <input type="date" name="date_beginning" placeholder="Débuts de la Jam" required> <input type="number" name="duration" required> <button type="submit">Envoyer</button> </form> ` })}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/creer.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/creer.astro";
const $$url = "/creer";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Creer,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
