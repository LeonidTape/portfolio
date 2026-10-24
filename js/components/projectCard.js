import { el } from "../core/dom.js";

export const renderProjectCard = (project, index) => {
  const media = project.cover
    ? el("img", { class: "card__media-img", src: project.cover, alt: project.coverAlt || project.title, loading: "lazy" })
    : el("span", { class: "card__media-placeholder", "aria-hidden": "true" }, project.title.charAt(0));

  const meta = [project.category, project.year].filter(Boolean).join(" · ");

  return el("a", {
    class: "card",
    href: `project.html?id=${encodeURIComponent(project.id)}`,
    "data-reveal": "",
    style: `--delay:${index * 80}ms`
  }, [
    el("div", { class: "card__media" }, media),
    el("div", { class: "card__body" }, [
      el("p", { class: "card__meta" }, meta),
      el("h3", { class: "card__title" }, project.title),
      el("p", { class: "card__summary" }, project.summary)
    ])
  ]);
};
