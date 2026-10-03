import createProject from "./createProject.js";
const projects = (function () {
  const projects = [];

  function addProject(name) {
    const project = createProject(name);
    projects.push(project);
  }
  function logProject() {
    console.log(projects);
  }
  function addTask(project, title) {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].name === project) {
        projects[i].todos.push(title);
      }
    }
  }
  return { addProject, logProject, addTask };
})();
export default projects;
