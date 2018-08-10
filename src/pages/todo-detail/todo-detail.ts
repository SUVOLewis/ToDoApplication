import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; 
import { HomePage } from '../home/home';

/**
 * Generated class for the TodoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-detail',
  templateUrl: 'todo-detail.html',
})
export class TodoDetailPage {
  item: any;
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
              public formbuilder: FormBuilder) {
    
    // debugger
    this.item = navParams.get('item');
    this.listItems = navParams.get('listItems');
    console.log(this.listItems);
    
    if(this.item === undefined) {
      this.lastIDUsed = this.listItems[this.listItems.length - 1].id;
      let newitem: newItem = 
        {
          userId: 1,
          id: this.lastIDUsed + 1,
          title: 'New Task',
          description: 'New Description',
          completed: false
        };
      this.item = newitem;
    }

    // this.item = navParams.get('item');

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
    debugger;
    if(task.taskID > this.lastIDUsed) {
      // Create new entry
      let newitem: newItem = 
        {
          userId: task.taskUserID,
          id: task.taskID,
          title: task.taskTitle,
          description: task.taskDesc,
          completed: task.taskCompleted
        };
      this.listItems.push(newitem);
      this.item.title = task.taskTitle; // Change title to new Task
    } else {
      // Update Existing Entry
      this.item.title = task.taskTitle;
      this.item.description = task.taskDesc;
      this.item.completed = task.taskCompleted;
    }
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoDetailPage');
  }

}

class newItem {
  userId: number;
  id: number;
  title: string;
  description: string;
  completed: false;
}