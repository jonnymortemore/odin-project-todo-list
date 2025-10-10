import { format } from 'date-fns';
export {ToDoController, Project, List, Task, Label}

class SupportFunc {
    getNow() {
        // Get the current date and time
        const now = new Date();
        // Format the date and time
        return format(now, 'yyyy-MM-dd HH:mm:ss'); 
    }
}

class ToDoController extends SupportFunc {

    #project_id = 0
    #label_id = 0

    constructor() {
        super()
        this.projects = [
            new Project("Project 1", this.#project_id)
        ];
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
        const project = new Project(projectName, this.#project_id)
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
}

class Project extends SupportFunc {

    #list_id = 0;

    constructor(projectName, id) {
        super()
        this.id = id;
        this.name = projectName;
        this.dateCreated = this.getNow()
        this.lists = [
            new List("List 1", this.#list_id)
        ]
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
        const list = new List(listName, this.#list_id);
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
        list.name = newName;
    }

}
 
class List extends SupportFunc {

    #task_id = 0;

    constructor(listName, id) {
        super()
        this.id = id;
        this.name = listName;
        this.dateCreated = this.getNow();
        this.tasks = [
            new Task("Task 1", null, this.#task_id)
        ]
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
            this.#task_id
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

    updateTask(taskId, title) {
        const task = this.findTask(taskId);
        task.title = title;
    }


}

class Task extends SupportFunc {
    constructor(taskName, finishDate, id) {
        super()
        this.id = id;
        this.title = taskName;
        this.dateCreated = this.getNow();
        this.completionDate = finishDate;
        this.description = "";
        this.completed = false;
        // will hold all added labels
        this.label = []
    }

    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }

    set completionDate(date) {
        // make sure completion date + time isn't before current date + time
        this._completionDate = date;
    }

    get completionDate() {
        return this._completionDate;
    }

    set description(newDesc) {
        this._description = newDesc;
    }

    get description() {
        return this._description
    }

    addLabel(label) {
        this.labels.push(label);
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