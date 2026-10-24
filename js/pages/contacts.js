import { contacts } from "../../config/contacts.js";
import { el } from "../core/dom.js";
import { renderPageHeader } from "../components/pageHeader.js";

export const renderContacts = (main) => {
  main.append(
    renderPageHeader(contacts),
    el("section", { class: "container contacts" },
      contacts.items.map((item, index) => {
        const external = /^https?:/.test(item.href);
        return el("a", {
          class: "contact",
          href: item.href,
          target: external ? "_blank" : false,
          rel: external ? "noopener" : false,
          "data-reveal": "",
          style: `--delay:${index * 80}ms`
        }, [
          el("span", { class: "contact__label" }, item.label),
          el("span", { class: "contact__value" }, item.value)
        ]);
      })
    )
  );
};
