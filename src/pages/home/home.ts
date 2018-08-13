import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TodoDetailPage } from '../todo-detail/todo-detail';
import { ToDoService } from '../../services/to-do/to-do.service';
import { TodoItem } from '../../models/todoitem';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todoItems: any[];

  constructor(public navCtrl: NavController, 
              public http: HttpClient,
              public todoService: ToDoService) {

      this.todoService.toDoItemsSubject.subscribe((todoItems: Array<TodoItem>) => {
      this.todoItems = todoItems;

      console.log('home component subscribed');
    })
  }

  itemSelected(item) {
    this.navCtrl.push(TodoDetailPage, {
      item: item
    });
  }

  newTask(item) {
    this.navCtrl.push(TodoDetailPage, {
      item: item
    });
  }

  ionViewWillLoad(){
    
  }
}
