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
  function addTask(title) {
    projects[0].todos.push(title);
  }
  return { addProject, logProject, addTask };
})();
export default projects;
