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
    constructor() {
        this.pages = [
            new Page("Page 1")
        ]
    }
    createPage(pageName) {
        this.pages.push(new Page(pageName, this.pages.length));
    }
    deletePage(id) {
        this.pages.splice(id, 1);
    }

}


class Page extends SupportFunc {
    constructor(pageName, id = 0) {
        this.id = id;
        this.name = pageName;
        this.dateCreated = this.getNow()
        this.lists = [
            new List("List 1")
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
        this.lists.push(
            new List(
                listName, 
                this.lists.length
            )
        )

    }
    deleteList(id) {
        this.lists.splice(id, 1);
    }
}
 
class List extends SupportFunc {
    constructor(listName, id = 0) {
        this.id = id;
        this.name = listName;
        this.dateCreated = this.getNow();
        this.tasks = [
            new Task("Task 1", null)
        ]
    }
    createTask(taskName, finishDate) {
        this.tasks.push(
            new Task(
                taskName, 
                finishDate,  
                this.tasks.length
            )
        )
    }
    deleteTask(id) {
        this.tasks.splice(id, 1);
    }


}

class Task extends SupportFunc {
    constructor(taskName, finishDate, id = 0) {
        this.id = id;
        this.title = taskName;
        this.dateCreated = this.getNow();
        this.completionDate = finishDate;
        this.description = "";
        this.completed = false;
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
}

