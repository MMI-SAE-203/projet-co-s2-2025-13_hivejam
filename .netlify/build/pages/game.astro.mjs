import { e as createComponent, f as createAstro, k as renderHead, r as renderTemplate } from '../chunks/astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import 'clsx';
import { b as addGame } from '../chunks/backend_AFUWHReN.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Game = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Game;
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    console.log(data);
    await addGame(data);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Add a Game</title>${renderHead()}</head> <body> <h1>Add a Game</h1> <form action="/.netlify/functions/unzip-upload" method="POST" enctype="multipart/form-data"> <input type="text" name="name"> <input type="file" name="file_web"> <input type="submit" value="Ajouter"> </form> </body></html>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/game.astro", void 0);

const $$file = "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/pages/game.astro";
const $$url = "/game";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Game,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
