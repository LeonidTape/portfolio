import { works } from "../../config/works.js";
import { projects } from "../../config/projects/index.js";
import { el } from "../core/dom.js";
import { renderPageHeader } from "../components/pageHeader.js";
import { renderProjectCard } from "../components/projectCard.js";

export const renderWorks = (main) => {
  main.append(
    renderPageHeader(works),
    el("section", { class: "container grid" },
      projects.length
        ? projects.map((project, index) => renderProjectCard(project, index))
        : el("p", { class: "empty" }, works.emptyText)
    )
  );
};
