import { site } from "../config/site.js";
import { renderHeader, renderFooter } from "./core/layout.js";
import { initReveal } from "./core/reveal.js";
import { renderHome } from "./pages/home.js";
import { renderWorks } from "./pages/works.js";
import { renderProject } from "./pages/project.js";
import { renderContacts } from "./pages/contacts.js";

const renderers = {
  home: renderHome,
  works: renderWorks,
  project: renderProject,
  contacts: renderContacts
};

const page = document.body.dataset.page;
const main = document.getElementById("app");

document.documentElement.lang = site.lang;
document.documentElement.classList.add("js");
document.body.prepend(renderHeader(page === "project" ? "works" : page));
document.body.append(renderFooter());

renderers[page]?.(main);

if (page !== "project") {
  document.title = `${site.pageTitles[page]} — ${site.name}`;
}

initReveal();
