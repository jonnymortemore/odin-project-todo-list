

export class WebAppDom {
    updateProjectElements(name, id, addListFunc) {
        //set project name
        const projectEl = document.querySelector(".project");
        document.querySelector(".project-name").innerText = name;
        projectEl.id = id;
        //load lists
        document.querySelector(".project-lists").innerHTML = "";
        document.querySelector(".add-list-button").addEventListener("click", () => {
            addListFunc("New List");
        });
    }
    createListElements(name, id, addTaskFunc, renameListFunc) {
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
        listEl.querySelector('.list-name').addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                renameListFunc(id, evt.target.innerText);
                evt.target.blur();
            }
        });
    }
    deleteListElements(id) {
        document.querySelector(`#${id}.list `).remove();
    }
    createTaskElements(listId, title, id) {
        const listEl = document.querySelector(`.list[id="${listId}"]`)
        const taskEl = document.createElement("div");
        taskEl.className = "task";
        taskEl.innerText = title;
        taskEl.id = id;
        listEl.querySelector(".list-tasks").appendChild(taskEl);
    }
}