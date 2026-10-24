import maniaVysoty from "./mania-vysoty.js";
import sagaNormannov from "./saga-normannov.js";
import tochkaVozvrata from "./tochka-vozvrata.js";
import hipHopArchives from "./hip-hop-archives.js";
import pyatayaTochka from "./pyataya-tochka.js";
import flixa from "./flixa.js";
import podcastMiaMir from "./podcast-mia-mir.js";

export const projects = [
  maniaVysoty,
  sagaNormannov,
  tochkaVozvrata,
  hipHopArchives,
  pyatayaTochka,
  flixa,
  podcastMiaMir
];

export const getProjectById = (id) => projects.find((project) => project.id === id);
