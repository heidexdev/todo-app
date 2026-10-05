import render from "./render.js";
import projects from "./projects.js";
import createTask from "./createTask.js";
const eventHandler = (function () {
  const dialog = document.querySelector("dialog");

  let currentProject = "inbox";
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
      render.projectTT(projectNameInput);
      currentProject = projectNameInput;
      loadProjectTasks();
    });
  }
  function addTask() {
    const formSubmitBtn = document.querySelector(".submit-task");
    formSubmitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const title = document.querySelector("#task-title").value;
      const date = document.querySelector("#task-date").value;
      const description = document.querySelector("#task-description").value;
      const priority = document.querySelector("#task-priority").value;
      createTask(currentProject, title, date, description, priority);
      render.projectTasks(currentProject);
      dialog.close();
    });
  }
  function deleteProject() {
    const projectDeleteBtn = document.querySelector(".project-dl-btn");
    projectDeleteBtn.addEventListener("click", () => {
      projects.deleteProject(currentProject);
      currentProject = "inbox";
      render.renderProjects();
      render.projectTT(currentProject);
      loadProjectTasks();
    });
  }
  function init() {
    loadProjectTasks();
    addProject();
    addTask();
    deleteProject();
    openTaskForm();
  }
  function openTaskForm() {
    const addTaskBtn = document.querySelector(".add-task");
    addTaskBtn.addEventListener("click", () => {
      dialog.showModal();
    });
  }
  return {
    loadProjectTasks,
    addProject,
    addTask,
    deleteProject,
    init,
  };
})();
export default eventHandler;
