import {WebApp, Project, List, Task, Label} from "./classes"

export class WebAppDom {
    constructor() {
        this.webApp = new WebApp
        this.currentProject = this.webApp.projects[0];
        this.loadProject(this.currentProject)
    }
    loadProject(project) {
        //set project name
        const projectEl = document.querySelector(".project");
        document.querySelector(".project-name").innerText = project.name;
        projectEl.id = project.id;
        //load lists
        document.querySelector(".project-lists").innerHTML = "";
        project.lists.forEach(list => {
            this.loadList(list)
        });
    }
    loadList(list) {
        //copy list template and update classname and append
        const listEl = document.querySelector(".list-template").cloneNode(true);
        listEl.className = "list";
        listEl.removeAttribute("hidden");
        listEl.id = list.id;
        document.querySelector(".project-lists").appendChild(listEl);
        listEl.querySelector(".list-header .list-name").innerText = list.name;
        list.tasks.forEach(task => {
            this.loadTask(listEl.querySelector(".list-tasks"), task)
        });
    }
    loadTask(listEl, task) {
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.innerText = task.title;
        taskEl.id = task.id;
        listEl.appendChild(taskEl);
    }
}