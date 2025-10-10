

export class WebAppDom {
    updateProjectElements(name, id) {
        //set project name
        const projectEl = document.querySelector(".project");
        document.querySelector(".project-name").innerText = name;
        projectEl.id = id;
        //load lists
        document.querySelector(".project-lists").innerHTML = "";
    }
    createListElements(name, id) {
        //copy list template and update classname and append
        const listEl = document.querySelector(".list-template").cloneNode(true);
        listEl.className = "list";
        listEl.removeAttribute("hidden");
        listEl.id = id;
        document.querySelector(".project-lists").appendChild(listEl);
        listEl.querySelector(".list-header .list-name").innerText = name;
    }
    deleteListElements(id) {
        document.querySelector(`#${id}.list `).remove();
    }
    createTaskElements(listId, title, id) {
        const listEl = document.querySelector(`#${listId}.list `)
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.innerText = title;
        taskEl.id = id;
        listEl.querySelector(".list-tasks").appendChild(taskEl);
    }
}