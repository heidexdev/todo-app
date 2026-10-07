import render from "./render.js";
import projects from "./projects.js";
import createTask from "./createTask.js";

const eventHandler = (function () {
  const dialog = document.querySelector("dialog");
  const tasksContainer = document.querySelector(".tasks");

  let currentProject = "inbox";
  let taskBeingEdited = null;

  function loadProjectTasks() {
    const projectEls = document.querySelectorAll(".project");
    projectEls.forEach((project) => {
      project.addEventListener("click", () => {
        const projectName = project.dataset.projectName;
        currentProject = projectName;
        render.projectTasks(projectName);
        render.title(projectName);
      });
    });
  }

  function addProject() {
    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => {
      const projectNameInput = prompt("enter the project name:");
      if (!projectNameInput) return;

      projects.addProject(projectNameInput);
      render.renderProjects();
      currentProject = projectNameInput;
      render.projectTT(projectNameInput);
      loadProjectTasks();
    });
  }

  function addTask() {
    const formSubmitBtn = document.querySelector(".submit-task");

    formSubmitBtn.addEventListener("click", (event) => {
      event.preventDefault();

      const title = document.querySelector("#task-title").value.trim();
      const date = document.querySelector("#task-date").value;
      const description = document
        .querySelector("#task-description")
        .value.trim();
      const priority = document.querySelector("#task-priority").value;

      if (taskBeingEdited !== null) {
        const updatedTask = { title, date, description, priority };
        projects.editTask(currentProject, taskBeingEdited, updatedTask);
        taskBeingEdited = null;
      } else {
        createTask(currentProject, title, date, description, priority);
      }

      render.projectTasks(currentProject);
      dialog.close();
      dialog.querySelector("form").reset();
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

  function openTaskForm() {
    const addTaskBtn = document.querySelector(".add-task");
    addTaskBtn.addEventListener("click", () => {
      // Make sure edit state is clean when opening a fresh form
      taskBeingEdited = null;
      dialog.querySelector("form").reset();
      dialog.showModal();
    });
  }

  function handleTaskClick(e) {
    const taskContainer = e.target.closest(".task");
    if (!taskContainer) return;

    const taskId = taskContainer.dataset.taskId;

    if (e.target.classList.contains("edit-btn")) {
      const project = projects
        .getProject()
        .find((project) => project.name === currentProject);
      if (!project) return;

      const task = project.todos.find(
        (task) => String(task.id) === String(taskId),
      );
      if (!task) return;

      taskBeingEdited = task.id;

      document.querySelector("#task-title").value = task.title;
      document.querySelector("#task-date").value = task.date || "";
      document.querySelector("#task-description").value =
        task.description || "";
      document.querySelector("#task-priority").value = task.priority || "low";

      dialog.showModal();
    }

    if (e.target.classList.contains("delete-btn")) {
      projects.deleteTask(currentProject, taskId);
      render.projectTasks(currentProject);
    }
  }

  function handleTaskChange(e) {
    if (!e.target.classList.contains("task-checkbox")) return;
    const taskId = e.target.closest(".task").dataset.taskId;
    projects.toggleCompleted(currentProject, taskId);
    render.projectTasks(currentProject);
  }

  function init() {
    loadProjectTasks();
    addProject();
    addTask();
    deleteProject();
    openTaskForm();

    // Delegated listeners — attached once, survive every re-render
    tasksContainer.addEventListener("click", handleTaskClick);
    tasksContainer.addEventListener("change", handleTaskChange);

    dialog.addEventListener("close", () => {
      taskBeingEdited = null;
      dialog.querySelector("form").reset();
    });
  }

  return {
    init,
  };
})();

export default eventHandler;
