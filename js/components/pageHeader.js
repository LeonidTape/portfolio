import { el } from "../core/dom.js";

export const renderPageHeader = ({ eyebrow, title, subtitle }) =>
  el("section", { class: "page-header container" }, [
    el("p", { class: "eyebrow", "data-reveal": "" }, eyebrow),
    el("h1", { class: "page-title", "data-reveal": "", style: "--delay:80ms" }, title),
    subtitle ? el("p", { class: "page-subtitle", "data-reveal": "", style: "--delay:160ms" }, subtitle) : null
  ]);
