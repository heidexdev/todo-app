import createProject from "./createProject.js";
const projects = (function () {
  const projects = [];

  function addProject(name) {
    const project = createProject(name);
    projects.push(project);
  }
  addProject("index");
  function getProject() {
    return projects;
  }
  function addTask(project, title) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].name === project) {
        projects[i].todos.push(title);
      }
    }
  }
  function deleteProject(projectName) {
    projects.forEach((project) => {
      if (project.name === "index") return;
      if (project.name === projectName) {
        const projectIndex = projects.indexOf(project);
        projects.splice(projectIndex, 1);
      }
    });
  }
  return { addProject, getProject, addTask, deleteProject };
})();
export default projects;
