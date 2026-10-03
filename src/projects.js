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
  return { addProject, logProject };
})();
export default projects;
