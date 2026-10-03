import projects from "./projects.js";
const render = (function () {
  const projectsContainer = document.querySelector(".nav-items");
  const tasksContainer = document.querySelector(".tasks");
  function renderProjects() {
    const projectsArr = projects.getProject();
    projectsArr.forEach((project) => {
      const projectName = document.createElement("h4");
      projectName.textContent = project.name;
      projectsContainer.appendChild(projectName);
    });
  }
  function projectTasks(currentProject) {
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
  return { renderProjects,projectTasks };
})();
export default render;
