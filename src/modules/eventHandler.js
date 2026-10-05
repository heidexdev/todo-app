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
    editTask();
  }
  function openTaskForm() {
    const addTaskBtn = document.querySelector(".add-task");
    addTaskBtn.addEventListener("click", () => {
      dialog.showModal();
    });
  }
  function editTask() {
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const taskContainer = btn.parentElement;
        const taskTitle =
          taskContainer.querySelector(".task-title").textContent;
        const taskDate = taskContainer.querySelector(".task-date").textContent;
        const taskDescription =
          taskContainer.querySelector(".task-description").textContent;
        const taskPriority =
          taskContainer.querySelector(".task-priority").textContent;
        document.querySelector("#task-title").value = taskTitle;
        document.querySelector("#task-date").value = taskDate;
        document.querySelector("#task-description").value = taskDescription;
        document.querySelector("#task-priority").value = taskPriority;
        dialog.showModal();
      });
    });
  }
  return {
    loadProjectTasks,
    addProject,
    addTask,
    deleteProject,
    editTask,
    init,
  };
})();
export default eventHandler;
