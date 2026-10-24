import { home } from "../../config/home.js";
import { el } from "../core/dom.js";
import { renderBlocks } from "../components/blocks.js";

export const renderHome = (main) => {
  const photo = el("img", { src: home.photo.src, alt: home.photo.alt });
  photo.addEventListener("error", () => photo.remove());

  main.append(
    el("section", { class: "hero container" }, [
      el("div", { class: "hero__text" }, [
        el("p", { class: "eyebrow", "data-reveal": "", style: "--delay:0ms" }, home.greeting),
        el("h1", { class: "hero__title", "data-reveal": "", style: "--delay:80ms" }, home.name),
        el("p", { class: "hero__headline", "data-reveal": "", style: "--delay:160ms" }, home.headline),
        el("div", { class: "hero__bio", "data-reveal": "", style: "--delay:240ms" },
          home.bio.map((text) => el("p", {}, text))
        ),
        el("div", { class: "actions", "data-reveal": "", style: "--delay:320ms" },
          home.actions.map((action) =>
            el("a", { class: action.primary ? "button button--primary" : "button", href: action.href }, action.label)
          )
        )
      ]),
      el("figure", { class: "hero__photo", "data-reveal": "", style: "--delay:120ms" }, photo)
    ]),
    el("section", { class: "container home-extra" }, renderBlocks(home.blocks))
  );
};
