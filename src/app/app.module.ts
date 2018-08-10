import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { TodoDetailPage } from '../pages/todo-detail/todo-detail';
import { ToDoService } from '../services/to-do/to-do.service';
import { TodoItem } from '../models/todoitem';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TodoDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TodoDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToDoService,
    TodoItem,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
