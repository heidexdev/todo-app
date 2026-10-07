import createProject from "./createProject.js";
const projects = (function () {
  const projects = [];

  function addProject(name) {
    const project = createProject(name);
    projects.push(project);
    save();
  }

  function getProject() {
    return projects;
  }
  function addTask(projectName, taskObject) {
    const project = projects.find((project) => project.name === projectName);
    if (project) {
      project.todos.push(taskObject);
      save();
    }
  }

  function deleteProject(projectName) {
    projects.forEach((project) => {
      if (project.name === "inbox") return;
      if (project.name === projectName) {
        const projectIndex = projects.indexOf(project);
        projects.splice(projectIndex, 1);
      }
    });
    save();
  }
  function editTask(projectName, taskId, updatedTask) {
    const project = projects.find((project) => project.name === projectName);
    if (!project) return;

    const task = project.todos.find(
      (task) => String(task.id) === String(taskId),
    );
    if (!task) return;

    task.title = updatedTask.title;
    task.date = updatedTask.date;
    task.description = updatedTask.description;
    task.priority = updatedTask.priority;
    save();
  }
  function deleteTask(projectName, taskId) {
    const project = projects.find((project) => project.name === projectName);
    if (!project) return;

    const taskIndex = project.todos.findIndex(
      (task) => String(task.id) === String(taskId),
    );
    if (taskIndex === -1) return;

    project.todos.splice(taskIndex, 1);
    save();
  }
  function toggleCompleted(projectName, taskId) {
    const project = projects.find((project) => project.name === projectName);
    if (!project) return;

    const task = project.todos.find(
      (task) => String(task.id) === String(taskId),
    );
    if (!task) return;
    task.isCompleted = task.isCompleted === true ? false : true;
    save();
  }
  function save() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  function load() {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      const parsedProjects = JSON.parse(storedProjects);
      parsedProjects.forEach((project) => {
        projects.push(project);
      });
    } else {
      addProject("inbox");
    }
  }

  load();
  return {
    addProject,
    getProject,
    addTask,
    deleteProject,
    editTask,
    toggleCompleted,
    deleteTask,
  };
})();
export default projects;
