import { da } from "date-fns/locale";
import projects from "./projects.js";
function createTask(project,title, date, description, priority) {
  const taskObject = {
    id: Date.now(),
    title,
    date,
    description,
    priority,
    isCompleted: false,
  };
  projects.addTask(project, taskObject);
}
export default createTask;
