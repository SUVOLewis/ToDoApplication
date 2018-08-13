import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { ToDoService } from '../../services/to-do/to-do.service';
import { TodoItem, ITodoItem } from '../../models/todoitem';

@IonicPage()
@Component({
  selector: 'page-todo-detail',
  templateUrl: 'todo-detail.html',
})
export class TodoDetailPage {
  item: ITodoItem;
  listItems: any[];
  lastIDUsed: number;

  formgroup: FormGroup;

  taskUserID: AbstractControl;
  taskID: AbstractControl;
  taskTitle: AbstractControl;
  taskDesc: AbstractControl;
  taskCompleted: AbstractControl;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formbuilder: FormBuilder,
              public ToDoServe: ToDoService) {
    
    this.item = navParams.get('item');
    this.listItems = navParams.get('listItems');

    // this.ToDoServe.loadToDo();
    
    this.item = this.ToDoServe.checkIfNewTask(this.listItems, this.item);

    this.formgroup = formbuilder.group({
      taskUserID: [this.item.userId],
      taskID: [this.item.id],
      taskTitle: [this.item.title, Validators.required], //can also do e.g. Validators.minLength(number)
      taskDesc: [this.item.description, Validators.required],
      taskCompleted: [this.item.completed]
    });
    this.taskUserID = this.formgroup.controls['taskUserID'];
    this.taskID = this.formgroup.controls['taskID'];
    this.taskTitle = this.formgroup.controls['taskTitle'];
    this.taskDesc = this.formgroup.controls['taskDesc'];
    this.taskCompleted = this.formgroup.controls['taskCompleted']
  }

  updateOrAddTask(task) {
    this.ToDoServe.updateOrAddTask(task);

    this.navCtrl.pop();
  }

  ionViewDidLoad() {

    this.ToDoServe.toDoItemsSubject.subscribe((todoItems: Array<TodoItem>) => {
      this.listItems = todoItems;

      console.log('Details component subscribed')
    })
  }
}
