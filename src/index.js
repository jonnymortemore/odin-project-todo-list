import "./styles.css" // all css files need to be imported into js
import { WebAppDom } from "./dom";
import {ToDoController} from "./todo";

//To import images using JS, import as any file: import odinImage from "./odin.png";

class WebAppController {
    constructor() {
        this.webApp = new ToDoController
        this.webDom = new WebAppDom
        this.currentProject = this.webApp.projects[0];
        this.loadProject(this.webApp.projects[0])
    }
    
    loadProject(project) {
        this.currentProject = project;
        this.webDom.updateProjectElements(project.name, project.id)
        project.lists.forEach(list => {
            this.webDom.createListElements(list.name, list.id)
            list.tasks.forEach(task => {
                this.webDom.createTaskElements(list.id, task.title, task.id)
            });
        });
    }

    addProject(projectName) {
        const newProject = this.webApp.createProject(projectName);
        this.loadProject(newProject);
    }

    deleteProject(projectId) {
        this.webApp.deleteProject(projectId);
        this.loadProject(this.webApp.projects[0]);
    }

    renameProject(projectId, name) {
        this.webApp.updateProject(projectId, name)
        //update HTML
    }

    addList(listName) {
        const list = this.currentProject.createList(listName);
        this.webDom.createListElements(list.name, list.id)
    }

    deleteList(listId) {
        this.currentProject.deleteList(listId);
        this.webDom.deleteListElements(listId);
        //Update HTML
    }

    renameList(listId, name) {
        this.currentProject.updateList(listId, name);
        //update HTML name
    }

    addTask(taskName, listId) {
        const list = this.currentProject.findList(listId);
        const task = list.addTask(taskName, list.id);
        this.webDom.createTaskElements(listId, task.title, task.id)
    }

    deleteTask(taskId, listId) {
        const list = this.currentProject.findList(listId);
        list.deleteTask(taskId);
        //update HTML

    }

    renameTask(listId, taskId, newName) {
        const list = this.currentProject.findList(listId);
        list.updateTask(taskId, newName)

    }
}

console.log(new WebAppController);