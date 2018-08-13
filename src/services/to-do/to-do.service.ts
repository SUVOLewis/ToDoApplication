import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {ITodoItem} from "../../models/todoitem";

@Injectable()
export class ToDoService {
  todoItems: ITodoItem[];
  item: any;
  lastIDUsed: number;

  toDoItemsSubject: BehaviorSubject<Array<ITodoItem>>;

  constructor(public http: HttpClient) {
    this.toDoItemsSubject = new BehaviorSubject<Array<ITodoItem>>(this.todoItems);
    console.log('created new behaviorsubject');
  }

  loadToDo() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe((res: Array<ITodoItem> ) => {
      this.todoItems = res;

      this.toDoItemsSubject.next(this.todoItems);
      console.log('service subscribed and loaded');
    });
  }

  checkIfNewTask(listitems: any[], item: any) {
    this.item = item;

    if(this.item === undefined) {
      this.lastIDUsed = this.todoItems[this.todoItems.length - 1].id;
      let newitem: ITodoItem = 
        {
          userId: 1,
          id: this.lastIDUsed + 1,
          title: 'New Task',
          description: 'New Description',
          completed: false
        };
      this.item = newitem;
    }
    return this.item;
  }

  updateOrAddTask(task) {

    if(task.taskID > this.lastIDUsed) {
      // Create new entry
      debugger;
      let newitem: ITodoItem = 
        {
          userId: task.taskUserID,
          id: task.taskID,
          title: task.taskTitle,
          description: task.taskDesc,
          completed: task.taskCompleted
        };
      this.todoItems.push(newitem);
      this.item.title = task.taskTitle; // Change title to new Task
    } else {
      // Update Existing Entry
      this.item.title = task.taskTitle;
      this.item.description = task.taskDesc;
      this.item.completed = task.taskCompleted;

      this.todoItems[this.item.id - 1] = this.item;
    }
    this.toDoItemsSubject.next(this.todoItems);
  }
}
