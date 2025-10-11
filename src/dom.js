

export class WebAppDom {

    selectElementContents(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    updateProjectElements(name, id, addListFunc, renameProjectFunc) {
        //set project name
        const projectEl = document.querySelector(".project");
        document.querySelector(".project-name").innerText = name;
        projectEl.id = id;
        //load lists
        document.querySelector(".project-lists").innerHTML = "";
        document.querySelector(".add-list-button").addEventListener("click", () => {
            addListFunc("New List");
        });
        document.querySelector('.project-name').addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                renameProjectFunc(id, evt.target.innerText);
                evt.target.blur();
            }
        });
    }
    createListElements(name, id, addTaskFunc, renameListFunc, deleteListFunc) {
        //copy list template and update classname and append
        const listEl = document.querySelector(".list-template").cloneNode(true);
        listEl.className = "list";
        listEl.removeAttribute("hidden");
        listEl.id = id;
        document.querySelector(".project-lists").appendChild(listEl);
        listEl.querySelector(".list-header .list-name").innerText = name;

        listEl.querySelector(".add-task-button").addEventListener("click", () => {
            addTaskFunc("New Task", id);
        });
        listEl.querySelector(".delete-list-button").addEventListener("click", () => {
            deleteListFunc(id);
        });
        const listName = listEl.querySelector('.list-name')
        listName.addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                renameListFunc(id, evt.target.innerText);
                evt.target.blur();
                window.getSelection().removeAllRanges();
            }
        });
        listName.focus();
        this.selectElementContents(listName);
        

    }
    deleteListElements(listId) {
        document.querySelector(`.list[id="${listId}"]`).remove();
    }
    createTaskElements(listId, title, id, renameTaskFunc) {
        const listEl = document.querySelector(`.list[id="${listId}"]`)
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.innerText = title;
        taskEl.id = id;
        listEl.querySelector(".list-tasks").appendChild(taskEl);
        taskEl.setAttribute("contenteditable", true);
        taskEl.addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                renameTaskFunc(listId, id, evt.target.innerText);
                evt.target.blur();
                window.getSelection().removeAllRanges();
            }
        });
        taskEl.focus();
        this.selectElementContents(taskEl);
    }
}