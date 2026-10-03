import projects from "./projects.js";
function createTask(project,title) {
  projects.addTask(project,title);
}
export default createTask;
