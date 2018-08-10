import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { TodoDetailPage } from '../todo-detail/todo-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listItems: any[];

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.loadToDo();
  }

  dummyData() {
    this.listItems = [];
      for (let i = 0; i < 6; i++) {
        this.listItems.push({
          taskTitle: 'Task ' + i,
          id: i
        });
        
      }
  }

  loadToDo() {
    let todoData: Observable<any>;
    todoData = this.http.get('https://jsonplaceholder.typicode.com/todos/');
    todoData.subscribe(result => {
      this.listItems = result;
    })
  }

  newTask(item, listItems) {
    this.navCtrl.push(TodoDetailPage, {
      item: item,
      listItems: this.listItems
    })
  }

  itemSelected(item) {
    this.navCtrl.push(TodoDetailPage, {
      item: item
    });
  }

}
