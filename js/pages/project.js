import { site } from "../../config/site.js";
import { projects, getProjectById } from "../../config/projects/index.js";
import { el } from "../core/dom.js";
import { renderBlocks } from "../components/blocks.js";

const renderNotFound = (main) => {
  document.title = `Работа не найдена — ${site.name}`;
  main.append(
    el("section", { class: "container project-missing" }, [
      el("h1", { class: "page-title" }, "Работа не найдена"),
      el("a", { class: "button", href: "works.html" }, site.backLabel)
    ])
  );
};

export const renderProject = (main) => {
  const id = new URLSearchParams(window.location.search).get("id");
  const project = getProjectById(id);

  if (!project) {
    renderNotFound(main);
    return;
  }

  document.title = `${project.title} — ${site.name}`;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const meta = [project.category, project.year, project.role].filter(Boolean).join(" · ");

  const links = project.links?.length
    ? el("ul", { class: "article__links", "data-reveal": "", style: "--delay:320ms" },
        project.links.map((link) =>
          el("li", {}, el("a", { class: "button", href: link.href, target: "_blank", rel: "noopener" }, link.label))
        )
      )
    : null;

  const cover = project.cover
    ? el("figure", { class: "article__cover", "data-reveal": "" },
        el("img", { src: project.cover, alt: project.coverAlt || project.title })
      )
    : null;

  main.append(
    el("article", { class: "article" }, [
      el("header", { class: "article__header" }, [
        el("a", { class: "back", href: "works.html", "data-reveal": "" }, `← ${site.backLabel}`),
        el("h1", { class: "article__title", "data-reveal": "", style: "--delay:80ms" }, project.title),
        el("p", { class: "article__meta", "data-reveal": "", style: "--delay:160ms" }, meta),
        el("p", { class: "article__summary", "data-reveal": "", style: "--delay:240ms" }, project.summary),
        links
      ]),
      cover,
      el("div", { class: "article__body" }, renderBlocks(project.content)),
      el("nav", { class: "article__next", "data-reveal": "" }, [
        el("p", {}, site.nextLabel),
        el("a", { href: `project.html?id=${encodeURIComponent(next.id)}` }, next.title)
      ])
    ])
  );
};
