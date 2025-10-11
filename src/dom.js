

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
    createTaskElements(listId, title, id, renameTaskFunc, deleteTaskFunc) {
        const listEl = document.querySelector(`.list[id="${listId}"]`)
        const taskEl = document.querySelector(".task-template").cloneNode(true);
        taskEl.hidden = false;
        taskEl.className = "task";
        const taskText = taskEl.querySelector(".task-text");
        const deleteBtn = taskEl.querySelector("button");
        taskText.innerText = title;
        taskEl.id = id;
        listEl.querySelector(".list-tasks").appendChild(taskEl);
        taskEl.addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                renameTaskFunc(listId, id, evt.target.innerText);
                evt.target.blur();
                window.getSelection().removeAllRanges();
                taskEl.querySelector("button").hidden = false;
            }
        });
        taskEl.addEventListener("mouseover", () => {
            taskEl.classList.add("task-hover");
            deleteBtn.hidden = false;
        })
        taskEl.addEventListener("mouseout", () => {
            taskEl.className = "task";
            deleteBtn.hidden = true;
        })
        deleteBtn.addEventListener("click", () => {
            deleteTaskFunc(id, listId);
        })
        taskText.focus();
        this.selectElementContents(taskText);
    }
    deleteTaskElements(listId, taskId) {
        const list = document.querySelector(`.list[id="${listId}"]`);
        list.querySelector(`.task[id="${taskId}"]`).remove()
    }
}