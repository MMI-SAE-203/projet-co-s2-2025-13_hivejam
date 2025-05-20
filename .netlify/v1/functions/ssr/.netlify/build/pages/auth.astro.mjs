import { e as createComponent, f as createAstro, h as addAttribute, j as renderHead, i as renderComponent, k as Fragment, r as renderTemplate } from '../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
/* empty css                                */
import Pocketbase from 'pocketbase';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Auth = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Auth;
  const pb = new Pocketbase("https://hivejam.paolo-vincent.fr:443/");
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
    console.log(email);
    try {
      if (formType === "register") {
        const data = {
          "email": formData.get("email"),
          "password": formData.get("password"),
          "passwordConfirm": formData.get("passwordConfirm"),
          "name": formData.get("name"),
          "subscription": "free"
        };
        console.log(data);
        await pb.collection("users").create(data);
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
  if (!pb.authStore.isValid) {
    error = "L'adresse e-mail ou le mot de passe est incorrect.";
  }
  return renderTemplate`<html lang="fr"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Document</title>${renderHead()}</head> <body> ${user ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <p>
Bienvenue, <strong>${user.name || user.email}</strong> 👋
<a href="/logout">Logout</a> </p> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <div class="flex absolute inset-0"> <form method="POST" class="flex flex-col justify-center items-center gap-12.5 w-full"> <h1>Connecte toi !</h1> <input type="hidden" name="formType" value="login"> ${error && renderTemplate`<p class=" text-negative">${error}</p>`} ${message && renderTemplate`<p class="">${message}</p>`} <div class="space-y-5"> <div> <label for="email">Votre email</label> <input name="email" type="email" placeholder="Email" required class="btn-light normal-case"> </div> <div> <label for="email">Votre mot de passe</label> <input name="password" type="password" placeholder="Mot de passe" required class="btn-light normal-case"> </div> </div> <button type="submit" class="btn-full bg-black cursor-pointer">
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
