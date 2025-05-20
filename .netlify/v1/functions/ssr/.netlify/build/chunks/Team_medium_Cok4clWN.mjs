import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, i as renderComponent } from './astro/server_Dro5Tqqm.mjs';
import 'kleur/colors';
import { C as Crown } from './Crown_oBkCNiqN.mjs';
import Pocketbase from 'pocketbase';

const $$Astro = createAstro();
const $$TeamMedium = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TeamMedium;
  const { ...team } = Astro2.props;
  console.log(team.expand?.game_jam);
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
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/mes_jams/${team.id}`, "href")}> <article class="border-1 border-drak-gray p-3 flex flex-col justify-between gap-2 w-80 rounded-md"> <div class="flex gap-2"> <img${addAttribute(team.image_URL, "src")} alt="" class="h-24"> <div class="flex flex-col gap-2"> <h3>${team.expand.game_jam?.name}</h3> <p class="tiny line-clamp-2">${team.expand.game_jam?.description}</p> </div> </div> <div class="flex flex-col"> ${team.time == "present" ? renderTemplate`<p class="CD text-3xl">${team.time_info}</p>` : renderTemplate`<p class="tiny">${team.time_info}</p>`} </div> ${team.expand.game_jam.host == user?.id ? renderTemplate`<div class="self-end"> ${renderComponent($$result, "Crown", Crown, {})} </div>` : renderTemplate`<div class="self-end"></div>`} </article> </a>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Team/Team_medium.astro", void 0);

export { $$TeamMedium as $ };
