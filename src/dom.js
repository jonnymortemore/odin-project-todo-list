import {WebApp, Page, List, Task, Label} from "./classes"

export class WebAppDom {
    constructor() {
        this.webApp = new WebApp
        this.loadPage(this.webApp.pages[0])
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