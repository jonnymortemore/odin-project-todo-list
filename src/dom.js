import {WebApp, Page, List, Task, Label} from "./classes"

export class WebAppDom {
    constructor() {
        this.webApp = new WebApp
        this.currentPage = this.webApp.pages[0];
        this.loadPage(this.currentPage)
    }
    loadPage(page) {
        //generate selected page
        const pageElement = document.createElement('div');
        pageElement.className = "page";
        pageElement.innerText = page.name;
        document.querySelector("main").appendChild(pageElement);
    }
    loadList() {

    }
    loadTask() {

    }
}