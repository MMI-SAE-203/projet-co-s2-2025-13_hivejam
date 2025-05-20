import { e as createComponent, f as createAstro, m as maybeRenderHead, i as renderComponent, h as addAttribute, r as renderTemplate, l as renderScript } from '../../chunks/astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { P as PP, $ as $$Layout } from '../../chunks/Layout_Lz9YwrB8.mjs';
import { c as createSvgComponent } from '../../chunks/icon_twitter_DZ9QTEaQ.mjs';
import { j as getTeamBoard, k as addTask } from '../../chunks/backend_D0iwzCcC.mjs';
export { renderers } from '../../renderers.mjs';

const User = createSvgComponent({"meta":{"src":"/_astro/User_orange.Bp-4wGbk.svg","width":18,"height":23,"format":"svg"},"attributes":{"mode":"inline","width":"18","height":"23","viewBox":"0 0 18 23","fill":"none"},"children":"\r\n<path d=\"M9 9.5C11.2091 9.5 13 7.70914 13 5.5C13 3.29086 11.2091 1.5 9 1.5C6.79086 1.5 5 3.29086 5 5.5C5 7.70914 6.79086 9.5 9 9.5Z\" stroke=\"#F29F05\" stroke-width=\"2\" />\r\n<path d=\"M16.9975 17.5C17 17.3358 17 17.169 17 17C17 14.5147 13.4183 12.5 9 12.5C4.58172 12.5 1 14.5147 1 17C1 19.4853 1 21.5 9 21.5C11.231 21.5 12.8398 21.3433 14 21.0634\" stroke=\"#F29F05\" stroke-width=\"2\" stroke-linecap=\"round\" />\r\n"});

const Dots = createSvgComponent({"meta":{"src":"/_astro/Dots.neqKYRkw.svg","width":35,"height":6,"format":"svg"},"attributes":{"mode":"inline","width":"35","height":"6","viewBox":"0 0 35 6","fill":"none"},"children":"\r\n<path d=\"M31.6 5C32.7046 5 33.6 4.1046 33.6 3C33.6 1.8954 32.7046 1 31.6 1C30.4954 1 29.6 1.8954 29.6 3C29.6 4.1046 30.4954 5 31.6 5Z\" fill=\"#1E1E1E\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\r\n<path d=\"M17.6001 5C18.7047 5 19.6001 4.1046 19.6001 3C19.6001 1.8954 18.7047 1 17.6001 1C16.4955 1 15.6001 1.8954 15.6001 3C15.6001 4.1046 16.4955 5 17.6001 5Z\" fill=\"#1E1E1E\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\r\n<path d=\"M3.59998 5C4.70454 5 5.59998 4.1046 5.59998 3C5.59998 1.8954 4.70454 1 3.59998 1C2.49542 1 1.59998 1.8954 1.59998 3C1.59998 4.1046 2.49542 5 3.59998 5Z\" fill=\"#1E1E1E\" stroke=\"black\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\r\n"});

const $$Astro$1 = createAstro();
const $$Tache = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Tache;
  const tache = Astro2.props;
  console.log(tache);
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-[1fr_1fr_1fr_1fr_75px] gap-1 h-15 *:bg-light-gray *:flex *:items-center *:py-2 *:px-3 *:rounded-md"> <div class="border-l-4 border-brand-1"> ${tache.name} </div> <div> ${tache.description} </div> <div class="gap-4"> <!-- {
            tache?.expand?.user.map((user) => (
                <a href=\`/profile/\${user.id}\` class="flex items-center gap-2">
                    {user.image ? (
                        <img
                            src={user.image_URL}
                            alt=""
                            height="40px"
                            width="40px"
                        />
                    ) : (
                        <img src={PP.src} alt="" height="40px" width="40px" />
                    )}
                </a>
            ))
        } --> ${Object.keys(tache.user).length > 0 ? tache?.expand?.user.map((user) => renderTemplate`<a${addAttribute(`/profile/${user.id}`, "href")} class="flex items-center gap-2"> ${user.image ? renderTemplate`<img${addAttribute(user.image_URL, "src")} alt="" height="40px" width="40px">` : renderTemplate`<img${addAttribute(PP.src, "src")} alt="" height="40px" width="40px">`} </a>`) : renderTemplate`<p>Pas de responsables</p>`} </div> <div> <p class="uppercase">${tache.state}</p> </div> <div class="items-center justify-center cursor-pointer"> <button> ${renderComponent($$result, "Dots", Dots, {})} </button> </div> </div>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Team/Tache.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const team = await getTeamBoard(id);
  console.log(team?.expand?.users);
  if (Astro2.request.method == "POST") {
    const data = await Astro2.request.formData();
    const message = await addTask(data, team?.id);
    return Astro2.redirect(message.redirect);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-10 py-20"> <section class="flex justify-between items-center"> <div class="flex gap-10 items-center"> <p>${team?.name}</p> <div class="flex items-center gap-2"> ${team?.expand?.users.map((user) => renderTemplate`<a${addAttribute(`/profile/${user.id}`, "href")} class="flex gap-2 items-center"> <img${addAttribute(user.image_URL, "src")} alt="" width="30px" height="30px"> <p>${user.name}</p> </a>`)} </div> </div> <a href="" class="btn-light"> ${renderComponent($$result2, "User", User, {})}
Inviter
</a> </section> <section class="space-y-10"> <div class="flex justify-between items-center"> <h1>${team?.expand?.game_jam?.name}</h1> <a${addAttribute(`/toutes_les_jams/${team?.expand?.game_jam?.id}`, "href")} class="btn-light">Page de la jam</a> </div> <div class="grid grid-cols-2 gap-10"> <article class="flex flex-col gap-4 items-center border-1 py-10 rounded-md"> ${team?.time == "present" ? renderTemplate`<header> <h2>Compte à rebours</h2> </header>
                            <div> <p>Se termine dans ...</p> <p class="CD font-black text-negative text-6xl">${team.time_info}</p> </div>` : renderTemplate`<p class="text-2xl">${team?.time_info}</p>`} </article> <article class="flex flex-col items-center justify-center gap-4"> <header> <h2>thème</h2> </header> <p>${team?.expand?.game_jam?.theme}</p> </article> </div> </section> <section x-data="{open: false}" class="mt-20 space-y-5"> <div class="flex justify-between"> <h2>Suivie de tâche</h2> <button id="menu-btn" aria-label="Menu" @click="open = !open" class="btn-light">Ajouter une thâche</button> </div> <div class="grid grid-cols-[1fr_1fr_1fr_1fr_75px]"> <p class="font-bold text-xl text-brand-1">Titre</p> <p class="font-bold text-xl">Description</p> <p class="font-bold text-xl">Responsables</p> <p class="font-bold text-xl">Statut</p> </div> <div class="flex flex-col gap-3"> ${team?.task.map((record) => renderTemplate`${renderComponent($$result2, "Tache", $$Tache, { ...record })}`)} </div> <div class="bg-white fixed border-2 rounded w-70 top-40 bottom-40 right-1/3" id="menu" :aria-hidden="!open" x-show="open"> <form method="POST"> <input type="text" placeholder="Titre" name="name" required> <input type="text" placeholder="Description" name="description"> <div> ${team?.expand?.users.map((user) => renderTemplate`<div class="flex gap-2"> <input type="checkbox" name="user"${addAttribute(user.id, "value")}> <img${addAttribute(user.image_URL, "src")} alt="" width="40px"> <p>${user.name}</p> </div>`)} </div> <select name="state"> <option value="pas commencé">pas commencé</option> <option value="en cours">en cours</option> <option value="terminé">terminé</option> </select> <button type="submit">Créer</button> </form> </div> </section> </div> ` })} ${renderScript($$result, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/[id].astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/mes_jams/[id].astro";
const $$url = "/mes_jams/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
