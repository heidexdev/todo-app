import "./styles.css";
import projects from "./modules/projects.js";
import createTask from "./modules/createTask.js";

projects.addProject("school");
createTask("school", "do homework");
projects.logProject();
