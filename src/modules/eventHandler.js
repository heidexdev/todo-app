import render from "./render.js";
import projects from "./projects.js";
import createTask from "./createTask.js";
const eventHandler = (function () {
  const dialog = document.querySelector("dialog");

  let currentProject = "inbox";
  let taskBeingEdited = null;

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

      const title = document.querySelector("#task-title").value.trim();
      const date = document.querySelector("#task-date").value;
      const description = document
        .querySelector("#task-description")
        .value.trim();
      const priority = document.querySelector("#task-priority").value;

      if (taskBeingEdited !== null) {
        const updatedTask = {
          title,
          date,
          description,
          priority,
        };

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
  function init() {
    loadProjectTasks();
    addProject();
    addTask();
    deleteProject();
    openTaskForm();
    editTask();
    dialog.addEventListener("close", () => {
      taskBeingEdited = null;
      dialog.querySelector("form").reset();
    });
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
        const taskContainer = btn.closest(".task");
        const taskId = taskContainer.dataset.taskId;

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
