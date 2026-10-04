import render from "./render.js";
import projects from "./projects.js";
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
  function addProject() {
    const addTaskBtn = document.querySelector(".add-project");
    addTaskBtn.addEventListener("click", () => {
      const projectNameInput = prompt("enter the project name:");
      projects.addProject(projectNameInput);
      render.renderProjects();
      loadProjectTasks();
    });
  }
  return { loadProjectTasks, addProject };
})();
export default eventHandler;
