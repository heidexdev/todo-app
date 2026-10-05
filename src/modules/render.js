import eventHandler from "./eventHandler.js";
import projects from "./projects.js";
import { format } from "date-fns";

const render = (function () {
  const projectsContainer = document.querySelector(".nav-items");
  const tasksContainer = document.querySelector(".tasks");

  function renderProjects() {
    projectsContainer.innerHTML = "";
    const projectsArr = projects.getProject();
    projectsArr.forEach((project) => {
      const projectName = document.createElement("h4");
      projectName.textContent = project.name;
      projectName.setAttribute("data-project-name", project.name);
      projectName.classList.add("project");
      projectsContainer.appendChild(projectName);
    });
  }

  function projectTasks(currentProject) {
    if (currentProject === undefined) {
      tasksContainer.innerHTML = "";
      return;
    }

    tasksContainer.innerHTML = "";
    const projectsArr = projects.getProject();

    projectsArr.forEach((project) => {
      if (project.name === currentProject) {
        project.todos.forEach((task) => {
          const taskContainer = document.createElement("div");
          taskContainer.classList.add("task");
          taskContainer.setAttribute("data-task-id", task.id);

          const taskTitle = document.createElement("h4");
          taskTitle.classList.add("task-title");
          taskTitle.textContent = task.title;
          taskContainer.appendChild(taskTitle);

          if (task.date !== "") {
            const taskDate = document.createElement("p");
            taskDate.textContent = format(task.date, "MMM d, yyyy");
            taskDate.classList.add("task-date");
            taskContainer.appendChild(taskDate);
          }

          const taskDescription = document.createElement("p");
          taskDescription.textContent = task.description;
          taskDescription.classList.add("task-description");
          taskContainer.appendChild(taskDescription);

          const taskPriority = document.createElement("p");
          taskPriority.textContent = task.priority;
          taskPriority.classList.add("task-priority");
          taskContainer.appendChild(taskPriority);

          const editBtn = document.createElement("button");
          editBtn.textContent = "edit";
          editBtn.classList.add("edit-btn");
          taskContainer.appendChild(editBtn);

          tasksContainer.appendChild(taskContainer);
        });
      }
    });

    // Call this ONCE after all task elements exist in the DOM
    eventHandler.editTask();
  }

  function title(projectName) {
    const projectTitle = document.querySelector(".project-title");
    projectTitle.textContent = projectName;
  }

  function projectTT(projectName) {
    projectTasks(projectName);
    title(projectName);
  }

  return { renderProjects, projectTasks, title, projectTT };
})();

export default render;
