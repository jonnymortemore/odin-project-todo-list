import "./styles.css" // all css files need to be imported into js
import { WebAppDom } from "./dom";
import {ToDoController} from "./todo";

//To import images using JS, import as any file: import odinImage from "./odin.png";

class WebAppController {
    constructor() {
        this.webApp = new ToDoController
        this.webDom = new WebAppDom
        this.currentProject = this.webApp.projects[0];
        this.loadProject(this.webApp.projects[0], true)
    }
    loadProject(project, initialLoad) {
        this.currentProject = project;
        this.webDom.updateProjectElements(
            project.name, 
            project.id, 
            initialLoad,
            this.addList.bind(this),
            this.renameProject.bind(this),
            this.addProject.bind(this),
            this.deleteProject.bind(this)
        )
        project.lists.forEach(list => {
            this.webDom.createListElements(
                list.name, 
                list.id, 
                this.addTask.bind(this),
                this.renameList.bind(this),
                this.deleteList.bind(this)
            )
            list.tasks.forEach(task => {
                this.webDom.createTaskElements(
                    list.id, 
                    task.title, 
                    task.id,
                    this.renameTask.bind(this),
                    this.deleteTask.bind(this)
                )
            });
        });
    }

    addProject(projectName) {
        const newProject = this.webApp.createProject(projectName);
        this.loadProject(newProject, false);
    }

    deleteProject(projectId) {
        this.webApp.deleteProject(projectId);
        console.log(this.webApp);
        this.loadProject(this.webApp.projects[0]);
    }

    renameProject(projectId, name) {
        this.webApp.updateProject(projectId, name);
        console.log("renameProject");

    }

    addList(listName) {
        const list = this.currentProject.createList(listName);
        this.webDom.createListElements(
            list.name, 
            list.id, 
            this.addTask.bind(this),
            this.renameList.bind(this),
            this.deleteList.bind(this)
        )
    }

    deleteList(listId) {
        this.currentProject.deleteList(listId);
        this.webDom.deleteListElements(listId);
        //Update HTML
    }

    renameList(listId, name) {
        this.currentProject.updateList(listId, name);
    }

    addTask(taskName, listId) {
        const list = this.currentProject.findList(listId);
        const task = list.createTask(taskName, list.id);
        this.webDom.createTaskElements(
            listId, 
            task.title, 
            task.id,
            this.renameTask.bind(this),
            this.deleteTask.bind(this)
        )
    }

    deleteTask(taskId, listId) {
        const list = this.currentProject.findList(listId);
        list.deleteTask(taskId);
        this.webDom.deleteTaskElements(listId, taskId);

    }

    renameTask(listId, taskId, newName) {
        const list = this.currentProject.findList(listId);
        list.updateTask(taskId, newName);

    }
}

console.log(new WebAppController);