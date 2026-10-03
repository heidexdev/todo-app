import projects from "./projects.js";
const render = (function () {
  const projectsContainer = document.querySelector(".nav-items");
  function renderProjects() {
    const projectsArr = projects.getProject();
    projectsArr.forEach((project) => {
      const projectName = document.createElement("h4");
      projectName.textContent = project.name;
      projectsContainer.appendChild(projectName);
    });
  }
  return { renderProjects };
})();
export default render;
