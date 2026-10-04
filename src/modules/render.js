import projects from "./projects.js";
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
    tasksContainer.innerHTML = "";
    const projectsArr = projects.getProject();
    projectsArr.forEach((project) => {
      if (project.name === currentProject) {
        project.todos.forEach((task) => {
          const taskP = document.createElement("p");
          taskP.textContent = task;
          tasksContainer.appendChild(taskP);
        });
      }
    });
  }
  function title(projectName) {
    const projectTitle = document.querySelector(".project-title");
    projectTitle.textContent = projectName;
  }
  return { renderProjects, projectTasks,title };
})();
export default render;
