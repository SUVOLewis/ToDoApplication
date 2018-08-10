import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
// import { NavController } from 'ionic-angular';
// import { TodoDetailPage } from '../../pages/todo-detail/todo-detail';
import {ITodoItem} from "../../models/todoitem";

@Injectable()
export class ToDoService {
  todoItems: ITodoItem[];
  item: any;
  lastIDUsed: number;

  toDoItemsSubject: BehaviorSubject<Array<ITodoItem>>;

  constructor(public http: HttpClient) {
    this.toDoItemsSubject = new BehaviorSubject<Array<ITodoItem>>(this.todoItems);
  }

  loadToDo() {
    let todoData: Observable<any>;
    this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe((res: Array<ITodoItem> ) => {
      this.todoItems = res;

      this.toDoItemsSubject.next(this.todoItems);
    });
  }

  addOrEdit() {
    
  }
}
