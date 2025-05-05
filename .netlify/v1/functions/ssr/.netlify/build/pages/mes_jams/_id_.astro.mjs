import { e as createComponent, f as createAstro, i as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_CShz5-nX.mjs';
import { c as createSvgComponent } from '../../chunks/icon_twitter_iKYBUHIN.mjs';
import { c as getTeam } from '../../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../../renderers.mjs';

const User = createSvgComponent({"meta":{"src":"/_astro/User_orange.Bp-4wGbk.svg","width":18,"height":23,"format":"svg"},"attributes":{"mode":"inline","width":"18","height":"23","viewBox":"0 0 18 23","fill":"none"},"children":"\r\n<path d=\"M9 9.5C11.2091 9.5 13 7.70914 13 5.5C13 3.29086 11.2091 1.5 9 1.5C6.79086 1.5 5 3.29086 5 5.5C5 7.70914 6.79086 9.5 9 9.5Z\" stroke=\"#F29F05\" stroke-width=\"2\" />\r\n<path d=\"M16.9975 17.5C17 17.3358 17 17.169 17 17C17 14.5147 13.4183 12.5 9 12.5C4.58172 12.5 1 14.5147 1 17C1 19.4853 1 21.5 9 21.5C11.231 21.5 12.8398 21.3433 14 21.0634\" stroke=\"#F29F05\" stroke-width=\"2\" stroke-linecap=\"round\" />\r\n"});

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const team = await getTeam(id);
  console.log(team);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-10 py-20"> <section class="flex justify-between items-center"> <p>${team?.name}</p> <a href="" class="btn-light"> ${renderComponent($$result2, "User", User, {})}
Inviter
</a> </section> <section class=""> <div class="flex justify-between items-center"> <h1>${team.expand.game_jam?.name}</h1> <a${addAttribute(`/toutes_les_jams/${team.expand.game_jam?.id}`, "href")} class="btn-light">Page de la jam</a> </div> <div> <article> <h2>Compte à rebours</h2> <!-- <p>{team.expand.game_jam?.d}</p> --> </article> </div> </section> </div> ` })}`;
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
