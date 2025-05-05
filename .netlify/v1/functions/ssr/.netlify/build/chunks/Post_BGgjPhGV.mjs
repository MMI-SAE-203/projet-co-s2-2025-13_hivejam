import { e as createComponent, m as maybeRenderHead, i as renderComponent, r as renderTemplate } from './astro/server_LpxO00PT.mjs';
import 'kleur/colors';
import { c as createSvgComponent } from './icon_twitter_iKYBUHIN.mjs';

const Comment = createSvgComponent({"meta":{"src":"/_astro/Comment.Bo7HKarz.svg","width":33,"height":32,"format":"svg"},"attributes":{"mode":"inline","width":"33","height":"32","viewBox":"0 0 33 32","fill":"none"},"children":"\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.6 26C15.432 26 14.304 25.864 13.22 25.633L8.51198 28.463L8.57497 23.824C4.96597 21.654 2.59998 18.066 2.59998 14C2.59998 7.373 8.86798 2 16.6 2C24.332 2 30.6 7.373 30.6 14C30.6 20.628 24.332 26 16.6 26ZM16.6 0C7.76398 0 0.599976 6.269 0.599976 14C0.599976 18.419 2.94498 22.354 6.59998 24.919V32L13.609 27.747C14.579 27.907 15.577 28 16.6 28C25.436 28 32.6 21.732 32.6 14C32.6 6.269 25.436 0 16.6 0Z\" fill=\"black\" />\r\n"});

const $$Post = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-4 px-2 py-4 border-t-1 border-dark-gray"> <div class="flex gap-2 items-center"> <span class="bg-secondary-2 h-8 w-8"></span> <p class="tiny">Utilisateur</p> </div> <h3>Titre du post</h3> <p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        libero tempora velit, odit doloribus nam molestias, perferendis
        perspiciatis debitis quasi non, vel praesentium delectus quos nihil
        laudantium suscipit porro nostrum. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Quo illum voluptatem magnam neque dolores
        eos adipisci aliquam, quisquam perferendis sint minus inventore aperiam
        tempora saepe distinctio quis eaque quibusdam ex!
</p> <a href="" class="flex gap-1 items-center self-end *:h-6">
0
${renderComponent($$result, "Comment", Comment, {})} </a> </div>`;
}, "C:/Users/black/Desktop/Projet S2/projet-co-s2-2025-13_hivejam/src/components/Card/Forum/Post.astro", void 0);

export { $$Post as $ };
