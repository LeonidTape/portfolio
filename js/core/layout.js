import { site } from "../../config/site.js";
import { el } from "./dom.js";

export const renderHeader = (activePage) => {
  const header = el("header", { class: "header" }, [
    el("div", { class: "container header__inner" }, [
      el("a", { class: "brand", href: "index.html" }, site.name),
      el("nav", { class: "nav", "aria-label": "Основная навигация" },
        site.navigation.map((item) =>
          el("a", {
            class: "nav__link",
            href: item.href,
            "aria-current": item.id === activePage ? "page" : false
          }, item.label)
        )
      )
    ])
  ]);

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  return header;
};

export const renderFooter = () =>
  el("footer", { class: "footer" }, [
    el("div", { class: "container" }, site.footerText)
  ]);
