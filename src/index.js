import "./styles.css";
import projects from "./modules/projects.js";
import render from "./modules/render.js";
import eventHandler from "./modules/eventHandler.js";
render.renderProjects();
eventHandler.init();
render.projectTT("inbox");