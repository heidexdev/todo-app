import projects from "./projects.js";
function createTask(project,title, date, description, priority) {
  const taskObject = {
    title,
    date,
    description,
    priority
  };
  projects.addTask(project, taskObject);
}
export default createTask;
