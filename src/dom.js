

export class WebAppDom {
    constructor() {
        //hide popup on start
        document.querySelector("#task-popup-template").style.display = "none";
    }

    #selectElementContents(el) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    
    #removeAllListeners(element) {
        const clone = element.cloneNode(true);
        element.replaceWith(clone);
        return clone;
    }

    updateProjectElements(
            name, 
            id, 
            initialLoad, 
            addListFunc, 
            renameProjectFunc, 
            addNewProjectFunc, 
            removeProjectFunc, 
            projects,
            loadProjectFunc
        ) {
        const projectEl = document.querySelector(".project");
        document.querySelector(".project-name").innerText = name;
        projectEl.id = `project-${id}`;

        document.querySelector(".project-lists").innerHTML = "";

        //setup projects drop down
        function setupProjectsDropdown() {
            const projectDropdown = document.querySelector("#projects-dropdown")
            projectDropdown.style.display = "none";
            projectDropdown.hidden = true;
            projectDropdown.innerHTML = "";
            projects.forEach(project => {
                const dropdownEl = document.createElement("div");
                dropdownEl.className = "dropdown-element";
                dropdownEl.innerText = project.name;
                dropdownEl.id = `project-dropdown-${project.id}`;
                dropdownEl.dataset.projectId = project.id;
                projectDropdown.appendChild(dropdownEl);
                dropdownEl.addEventListener("click", (evt) => {
                    loadProjectFunc(evt.target.dataset.projectId);
                })
            });
        }

        setupProjectsDropdown();
        
        if (initialLoad) {
            document.querySelector(".add-list-button").addEventListener("click", () => {
                addListFunc("New List");
            });

            document.querySelector(".add-project-button").addEventListener("click", () => {
                addNewProjectFunc("New Project");
            }); 
            
            document.querySelector(".change-project-button").addEventListener("click", () => {
                const dropdown = document.querySelector("#projects-dropdown");
                if (dropdown.hidden === false) {
                    dropdown.hidden = true;
                    dropdown.style.display = "none";
                } else {
                    dropdown.hidden = false;
                    dropdown.style.display = "flex";
                }
            });
        }
       

        function renameProject(evt) {
            if (evt.type === "keydown" && evt.key === "Enter") {
                evt.preventDefault();
                renameProjectFunc(id, evt.target.innerText);
                setupProjectsDropdown();
                evt.target.blur();
            }
            if (evt.type === "focusout") {
                renameProjectFunc(id, evt.target.innerText);
                setupProjectsDropdown();
            }
        }

        const projectName = this.#removeAllListeners(document.querySelector('.project-name'));
        projectName.addEventListener('focusout', renameProject);
        projectName.addEventListener('keydown', renameProject);
       

        const removeProjButton = this.#removeAllListeners(document.querySelector(".remove-project-button"));
        removeProjButton.addEventListener("click", () => {
            removeProjectFunc(id);
        });
        
    }
    createListElements(name, id, addTaskFunc, renameListFunc, deleteListFunc) {
        //copy list template and update classname and append
        const listEl = document.querySelector(".list-template").cloneNode(true);
        listEl.className = "list";
        listEl.removeAttribute("hidden");
        listEl.id = `list-${id}`;
        document.querySelector(".project-lists").appendChild(listEl);
        listEl.querySelector(".list-header .list-name").innerText = name;

        listEl.querySelector(".add-task-button").addEventListener("click", () => {
            addTaskFunc("New Task", id);
        });
        listEl.querySelector(".delete-list-button").addEventListener("click", () => {
            deleteListFunc(id);
        });
        const listName = listEl.querySelector('.list-name')
        listName.addEventListener("focusout", (evt) => {
            renameListFunc(id, evt.target.innerText);
        })
        listName.addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                renameListFunc(id, evt.target.innerText);
                evt.target.blur();
                window.getSelection().removeAllRanges();
            }
        });
        listName.focus();
        this.#selectElementContents(listName);
        

    }
    deleteListElements(listId) {
        document.querySelector(`.list[id="list-${listId}"]`).remove();
    }
    createTaskElements(listId, title, id, updateTaskFunc, getTaskDetailsFunc, deleteTaskFunc) {
        const listEl = document.querySelector(`.list[id="list-${listId}"]`)
        const taskEl = document.querySelector(".task-template").cloneNode(true);
        taskEl.hidden = false;
        taskEl.className = "task";
        const taskText = taskEl.querySelector(".task-text");
        const taskDropBtn = taskEl.querySelector(".task-menu-button");
        taskText.innerText = title;
        taskEl.id = `task-${id}`;
        listEl.querySelector(".list-tasks").appendChild(taskEl);
        taskEl.addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                updateTaskFunc(listId, id, evt.currentTarget.innerText, null, null);
                evt.target.blur();
                window.getSelection().removeAllRanges();
                taskEl.querySelector("button").hidden = false;
            }
        });
        taskEl.addEventListener("focusout", (evt) => {
            //current target always targets the source of the event listener
            updateTaskFunc(listId, id, evt.currentTarget.innerText, null, null);
        })
        taskEl.addEventListener("mouseover", () => {
            taskEl.classList.add("task-hover");
            taskDropBtn.hidden = false;
        })
        taskEl.addEventListener("mouseout", () => {
            taskEl.className = "task";
            taskDropBtn.hidden = true;
        })
        taskDropBtn.addEventListener("click", () => {
            document.querySelectorAll("#task-popup").forEach((popup) => {
                popup.remove()
            })
            const taskPopup = document.querySelector("#task-popup-template").cloneNode(true);
            taskPopup.id = "task-popup";
            taskPopup.style.display = "flex";
            document.querySelector(".project").appendChild(taskPopup);

            function setupPopup(popup) {
                //setup the task popup when opened
                const task = getTaskDetailsFunc(listId, id);
                const inputTitle = popup.querySelector(".popup-task-name");
                inputTitle.value = task.title;
                const inputDesc = popup.querySelector(".popup-task-description");
                inputDesc.value = task.description;
                const inputCompletionDate = popup.querySelector(".popup-task-completion-date");
                if (task.completionDate !== undefined) {
                    inputCompletionDate.value = task.completionDate;
                } else {
                    inputCompletionDate.value = "";
                }
                popup.querySelector(".delete-task-button").addEventListener("click", () => {
                    deleteTaskFunc(id, listId);
                    popup.remove();
                })
                popup.querySelector(".exit-popup-button").addEventListener("click", () => {
                    popup.remove();
                })
                popup.querySelector(".update-task-button").addEventListener("click", () => {
                    updateTaskFunc(
                        listId, 
                        id, 
                        inputTitle.value, 
                        inputDesc.value, 
                        inputCompletionDate.value
                    );
                    taskText.innerText = inputTitle.value;
                    popup.remove();;
                })
            }

            setupPopup(taskPopup);
        })
        taskText.focus();
        this.#selectElementContents(taskText);
    }
    deleteTaskElements(listId, taskId) {
        const list = document.querySelector(`.list[id="list-${listId}"]`);
        list.querySelector(`.task[id="task-${taskId}"]`).remove()
    }
}