import { format, parseISO } from 'date-fns';
export {ToDoController, Project, List, Task, Label}

class SupportFunc {
    getNow() {
        // Get the current date and time
        const now = new Date();
        // Format the date and time
        return format(now, 'yyyy-MM-dd HH:mm:ss'); 
    }
    setTextToDate(date) {
        return parseISO(date);
    }
    setDateToText(date) {
        return format(date, "YYYY-MM-DDTHH:mm")
    }
}

class ToDoController extends SupportFunc {

    #project_id = 0
    #label_id = 0

    constructor(todoLoadData) {
        super()
        this.projects = [];
        //if no data to load in
        if (todoLoadData === null) {
            this.projects.push(new Project("Project 1", this.#project_id, null));
        } else {
            this.#project_id = todoLoadData.project_id;
            this.#label_id = todoLoadData.label_id;
            todoLoadData.projects.forEach((project) => {
                this.projects.push(new Project(project.name, project.id, project));
            })
        }
        
        // will hold all created labels
        this.labels = [
            new Label("Important", "#FF0000", this.#label_id),
        ];
    }

    findProject(projectId) {
        const project = this.projects.find(project => project.id === projectId);
        return project
    }

    createProject(projectName) {
        this.#project_id++
        const project = new Project(projectName, this.#project_id, null)
        this.projects.push(project);
        return project;
       
    }

    deleteProject(projectId) {
        //find projects in array and remove
        const project = this.findProject(projectId);
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
        }
    }

    updateProject(projectId, newName) {
        const project = this.findProject(projectId);
        project.name = newName

    }

    createLabel(labelName, color) {
        //check color correct format
        this.#label_id++
        this.labels.push(new Label(labelName, color, this.#label_id))
    }

    deleteLabel(label) {
        //find label in array and remove
    }

    getToDoAsJson() {
        const projectsJson = {
            "project_id": this.#project_id,
            "label_id": this.#label_id,
            "projects": [

            ]
        };
        this.projects.forEach((project) => {
            projectsJson.projects.push(project.toJson())
        });
        return projectsJson;
    }
}

class Project extends SupportFunc {

    #list_id = 0;

    constructor(projectName, id, loadedProjectData) {
        super()
        this.id = id;
        this.name = projectName;
        this.lists = [];
        if (loadedProjectData === null) {
            //if not loading in existing lists, set a standard single list
            this.dateCreated = this.getNow()
            this.lists.push(
                new List("List 1", this.#list_id, null)
            ); 
        } else {
            //load in existing lists
            console.log(loadedProjectData)
            this.dateCreated = loadedProjectData.dateCreated;
            this.#list_id = loadedProjectData.list_id;
            loadedProjectData.lists.forEach((list) => {
                this.lists.push(
                    new List(list.name, list.id, list)
                )
            })
        }
        
    }

    //getting and setting project name
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    findList(listId) {
        const list = this.lists.find(list => list.id === listId);
        return list
    }

    createList(listName) {
        this.#list_id++;
        const list = new List(listName, this.#list_id, null);
        this.lists.push(list);
        return list


    }

    deleteList(listId) {
        //find list and delete from array
        const list = this.findList(listId);
        const index = this.lists.indexOf(list);
        if (index > -1) {
            this.lists.splice(index, 1);
        }
    }

    updateList(listId, newName) {
        const list = this.findList(listId);
        if (!list) {
            return
        }
        list.name = newName;
    }

    toJson() {
        const projectJson = {
            "id": this.id,
            "list_id": this.#list_id,
            "name": this.name,
            "dateCreated": this.dateCreated,
            "lists": []
        }
        this.lists.forEach((list) => {
            projectJson.lists.push(list.toJson());
        })
        return projectJson
    }

}
 
class List extends SupportFunc {

    #task_id = 0;

    constructor(listName, id, loadedListData) {
        super()
        this.id = id;
        this.name = listName;
        this.tasks = []
        if (loadedListData === null) {
            this.dateCreated = this.getNow();
            this.tasks.push(
                new Task("Task 1", null, this.#task_id, null)
            );
        } else {
            this.dateCreated = loadedListData.dateCreated;
            this.#task_id = loadedListData.task_id;
            loadedListData.tasks.forEach((task) => {
                this.tasks.push(
                    new Task(task.title, task.completionDate, task.id, task)
                )
            })
        }
        
    }

    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    findTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        return task
    }

    createTask(taskName, finishDate) {
        this.#task_id++
        const task = new Task(
            taskName, 
            finishDate,  
            this.#task_id,
            null
        )
        this.tasks.push(task);
        return task;
    }

    deleteTask(taskId) {
        //find task in array and remove
        //find list and delete from array
        const task = this.findTask(taskId);
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    updateTask(taskId, title, desc, date) {
        const task = this.findTask(taskId);
        if (!task) {
            return
        }
        task.title = title;
        task.description = desc;
        task.completionDate = date;
    }

    toggleTaskCompleted(taskId, state) {
        const task = this.findTask(taskId);
        if (!task) {
            return
        }
        task.completed = state;
        console.log(task);
    }

    toJson() {
        const listJson = {
            "id": this.id,
            "name": this.name,
            "date": this.dateCreated,
            "task_id": this.#task_id,
            "tasks": []
        }
        this.tasks.forEach((task) => {
            listJson.tasks.push(task.toJson());
        })
        return listJson;
    }

}

class Task extends SupportFunc {
    constructor(taskName, finishDate, id, loadedTaskData) {
        super()
        this.id = id;
        this.title = taskName;
        this.completionDate = finishDate;
        this.labels = []
        
        if (loadedTaskData === null) {
            this.dateCreated = this.getNow();
            this.description = "";
            this.completed = false;
           
        } else {
            this.dateCreated = loadedTaskData.dateCreated;
            this.description = loadedTaskData.description;
            this.completed = loadedTaskData.completed;
        }
        
    }

    set title(title) {
        if (title === null || title === "") {
            return
        }
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set completionDate(date) {
        // make sure completion date + time isn't before current date + time
        if (date === null || date === "" || date === undefined || date === 0) {
            return
        }
        this._completionDate = date;
    }

    get completionDate() {
        return this._completionDate;
    }

    set description(newDesc) {
         if (newDesc === null) {
            return
        }
        this._description = newDesc;
    }

    get description() {
        return this._description
    }

    addLabel(label) {
        this.labels.push(label);
    }

    toJson() {
        return {
            "id": this.id,
            "title": this.title,
            "dateCreated": this.dateCreated,
            "completionDate": this.completionDate ,
            "description": this.description,
            "completed": this.completed
        }
    }
}

class Label {
    constructor(labelName, color, id) {
        this.name = labelName;
        this.color = color;
        this.id = id;
    }

    set color(color) {
        //check correct format
        this._color = color
    }

    get color() {
        return this._color
    }

    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}