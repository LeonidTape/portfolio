import { el } from "../core/dom.js";

const renderers = {
  heading: (block) => el("h2", { class: "prose__heading" }, block.text),

  paragraph: (block) => el("p", { class: "prose__paragraph" }, block.text),

  quote: (block) => el("blockquote", { class: "prose__quote" }, [
    el("p", {}, block.text),
    block.author ? el("cite", {}, block.author) : null
  ]),

  list: (block) => el("ul", { class: "prose__list" },
    block.items.map((item) => el("li", {}, item))
  ),

  links: (block) => el("ul", { class: "prose__links" },
    block.items.map((item) =>
      el("li", {}, el("a", { href: item.href, target: "_blank", rel: "noopener" }, item.label))
    )
  ),

  image: (block) => el("figure", { class: "prose__figure" }, [
    el("img", { src: block.src, alt: block.alt || "", loading: "lazy" }),
    block.caption ? el("figcaption", {}, block.caption) : null
  ]),

  divider: () => el("hr", { class: "prose__divider" })
};

export const renderBlocks = (blocks = []) => {
  const wrapper = el("div", { class: "prose" });

  blocks.forEach((block) => {
    const render = renderers[block.type];
    if (!render) return;
    const node = render(block);
    node.setAttribute("data-reveal", "");
    wrapper.append(node);
  });

  return wrapper;
};
