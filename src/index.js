import "./styles.css";
import projects from "./modules/projects.js";
import createTask from "./modules/createTask.js";

projects.addProject("school");
createTask('do homework')
projects.logProject();