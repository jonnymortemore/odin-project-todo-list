import { format } from 'date-fns';

class webApp {


}

class SupportFunc {
    getNow() {
        // Get the current date and time
        const now = new Date();
        // Format the date and time
        return format(now, 'yyyy-MM-dd HH:mm:ss'); 
    }
}

class Page extends SupportFunc {
    constructor(pageName) {
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

}
 
class List extends SupportFunc {
    constructor(listName) {
        this.name = listName;
        this.dateCreated = this.getNow();
        this.tasks = [
            new Task("Task 1", null)
        ]
    }

}

class Task extends SupportFunc {
    constructor(taskName, finishDate) {
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

class CheckList {

}