import { format } from 'date-fns';


class SupportFunc {
    getNow() {
        // Get the current date and time
        const now = new Date();
        // Format the date and time
        return format(now, 'yyyy-MM-dd HH:mm:ss'); 
    }
}

class webApp {

    #page_id = 0
    #label_id = 0

    constructor() {
        this.pages = [
            new Page("Page 1", this.#page_id)
        ];
        // will hold all created labels
        this.labels = [
            new Label("Important", "#FF0000", this.#label_id),
        ];
    }
    createPage(pageName) {
        this.#page_id++
        this.pages.push(new Page(pageName, this.#page_id));
    }
    deletePage(page) {
        //find pages in array and remove
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

class Page extends SupportFunc {

    #list_id = 0;

    constructor(pageName, id) {
        this.id = id;
        this.name = pageName;
        this.dateCreated = this.getNow()
        this.lists = [
            new List("List 1", this.#list_id)
        ]
    }
    //getting and setting page name
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    createList(listName) {
        this.#list_id++
        this.lists.push(
            new List(
                listName, 
                this.#list_id
            )
        )

    }
    deleteList(list) {
        //find list and delete from array
    }
}
 
class List extends SupportFunc {

    #task_id = 0;

    constructor(listName, id) {
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

    createTask(taskName, finishDate) {
        this.#task_id++
        this.tasks.push(
            new Task(
                taskName, 
                finishDate,  
                this.#task_id
            )
        )
    }
    deleteTask(task) {
        //find task in array and remove
    }


}

class Task extends SupportFunc {
    constructor(taskName, finishDate, id) {
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