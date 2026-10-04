import render from "./render.js";
const eventHandler = (function () {
  function loadProjectTasks() {
    const projects = document.querySelectorAll(".project");
    projects.forEach((project) => {
        project.addEventListener("click", () => {
          const projectName = project.dataset.projectName;
          render.projectTasks(projectName);          
        });
    });
  }
  return { loadProjectTasks };
})();
export default eventHandler;
