import { e as createComponent, f as createAstro, m as maybeRenderHead, r as renderTemplate, i as renderComponent, j as Fragment } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
/* empty css                                 */
import PocketBase from 'pocketbase';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Auth = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Auth;
  const pb = new PocketBase("http://127.0.0.1:8090");
  let error = "";
  let message = "";
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
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const formType = formData.get("formType");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    try {
      if (formType === "register") {
        const name = formData.get("name");
        await pb.collection("users").create({
          email,
          password,
          passwordConfirm,
          name
        });
        message = "\u2705 Compte cr\xE9\xE9. Connectez-vous.";
      }
      if (formType === "login") {
        const authData = await pb.collection("users").authWithPassword(email, password);
        Astro2.cookies.set("pb_auth", pb.authStore.token, {
          path: "/",
          httpOnly: true
        });
        return Astro2.redirect("/");
      }
    } catch (e) {
      console.error(e);
    }
  }
  console.log(pb.authStore.isValid);
  console.log(pb.authStore.record?.id);
  console.log(user?.name);
  return renderTemplate`<html> ${maybeRenderHead()}<body> ${error} ${message && renderTemplate`<p class="success">${message}</p>`} ${user ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <p>
Bienvenue, <strong>${user.name || user.email}</strong> 👋
</p> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <div class="flex absolute inset-0"> <form method="POST" class="flex flex-col justify-center items-center gap-12.5 w-full"> <h1>Connecte toi !</h1> <input type="hidden" name="formType" value="login"> <div class="space-y-5"> <div> <label for="email">Votre email</label> <input name="email" type="email" placeholder="Email" required class="btn-light normal-case"> </div> <div> <label for="email">Votre mot de passe</label> <input name="password" type="password" placeholder="Mot de passe" required class="btn-light normal-case"> </div> </div> <button type="submit" class="btn-full bg-black cursor-pointer">
Se connecter
</button> </form> <form method="POST" class="flex flex-col justify-center items-center bg-secondary-1 w-full gap-12.5"> <h1>Nouveaux ?</h1> <input type="hidden" name="formType" value="register"> <div class="space-y-5"> <div> <label for="">Votre pseudo</label> <input name="name" type="text" placeholder="Pseudo" required class="btn-light normal-case border-white text-black"> </div> <div> <label for="">Votre email</label> <input name="email" type="email" placeholder="Email" required class="btn-light normal-case border-white text-black"> </div> <div> <label for="">Votre mot de passe</label> <input name="password" type="password" placeholder="Mot de passe" required class="btn-light normal-case border-white text-black"> </div> <div> <label for="">Confirmer votre mot de passe</label> <input name="passwordConfirm" type="password" placeholder="Confirmer" required class="btn-light normal-case border-white text-black"> </div> </div> <button type="submit" class="btn-full bg-black cursor-pointer">
Creer un compte
</button> </form> </div> ` })}`} </body></html>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/auth.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/auth.astro";
const $$url = "/auth";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Auth,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
