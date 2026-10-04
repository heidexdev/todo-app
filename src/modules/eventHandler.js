import render from "./render.js";
import projects from "./projects.js";
import createTask from "./createTask.js";
const eventHandler = (function () {
  let currentProject = "";
  function loadProjectTasks() {
    const projects = document.querySelectorAll(".project");
    projects.forEach((project) => {
      project.addEventListener("click", () => {
        const projectName = project.dataset.projectName;
        currentProject = project.dataset.projectName;
        render.projectTasks(projectName);
        render.title(projectName);
      });
    });
  }
  function addProject() {
    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
      const projectNameInput = prompt("enter the project name:");
      projects.addProject(projectNameInput);
      render.renderProjects();
      loadProjectTasks();
    });
  }
  function addTask() {
    const addTaskBtn = document.querySelector(".add-task");
    addTaskBtn.addEventListener("click", () => {
      const taskTitleInput = prompt("enter the title of the task:");
      createTask(currentProject, taskTitleInput);
      render.projectTasks(currentProject);
    });
  }
  function deleteProject() {
    const projectDeleteBtn = document.querySelector(".project-dl-btn");
    projectDeleteBtn.addEventListener("click", () => {
      projects.deleteProject(currentProject);
      render.renderProjects();
      render.projectTasks();
      render.title();
      loadProjectTasks();
    });
  }
  function init() {
    loadProjectTasks();
    addProject();
    addTask();
    deleteProject();
  }
  return { loadProjectTasks, addProject, addTask, deleteProject,init };
})();
export default eventHandler;
