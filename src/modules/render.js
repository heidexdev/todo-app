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
          const taskTitle = document.createElement("h4");
          taskTitle.textContent = task.title;
          taskContainer.appendChild(taskTitle);
          const taskDate = document.createElement("p");
          taskDate.textContent = format(task.date, "MMM d, yyyy");
          taskContainer.appendChild(taskDate);
          const taskDescription = document.createElement("p");
          taskDescription.textContent = task.description;
          taskContainer.appendChild(taskDescription);
          const taskPriority = document.createElement("p");
          taskPriority.textContent = task.priority;
          taskContainer.appendChild(taskPriority);
          tasksContainer.appendChild(taskContainer);
        });
      }
    });
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
