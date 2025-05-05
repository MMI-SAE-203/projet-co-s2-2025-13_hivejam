import { e as createComponent, k as renderHead, h as addAttribute, r as renderTemplate } from '../../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getGame } from '../../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../../renderers.mjs';

const $$Testgame = createComponent(async ($$result, $$props, $$slots) => {
  const game = await getGame("iu743xr63tdf9ua");
  console.log(game);
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>This is a Game</title>${renderHead()}</head> <body> <h1>This is a game</h1> <iframe${addAttribute(game.file_path, "src")} width="100%" height="600" style="border: none;" allowfullscreen></iframe> </body> </html>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/games/testgame.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/games/testgame.astro";
const $$url = "/games/testgame";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Testgame,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
