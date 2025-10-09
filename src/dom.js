import {WebApp, Page, List, Task, Label} from "./classes"

export class WebAppDom {
    constructor() {
        this.webApp = new WebApp
        this.currentPage = this.webApp.pages[0];
        this.loadPage(this.currentPage)
    }
    loadPage(page) {
        //set page name
        document.querySelector(".page-name").innerText = page.name
        //load lists
        page.lists.forEach(list => {
            this.loadList(list)
        });
    }
    loadList(list) {
        //copy list template and update classname and append
        const listEl = document.querySelector(".list-template").cloneNode(true);
        listEl.className = "list";
        listEl.removeAttribute("hidden");
        document.querySelector(".page-lists").appendChild(listEl);
        listEl.querySelector(".list-header .list-name").innerText = list.name;
        list.tasks.forEach(task => {
            this.loadTask(listEl.querySelector(".list-tasks"), task)
        });
    }
    loadTask(listEl, task) {
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.innerText = task.title;
        listEl.appendChild(taskEl);
    }
}