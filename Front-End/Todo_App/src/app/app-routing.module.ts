import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedTodosComponent } from './pages/completed-todos/completed-todos.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AddtodoComponent } from './pages/addtodo/addtodo.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { ViewTodoComponent } from './pages/view-todo/view-todo.component';
import { PrioritiesComponent } from './priorities/priorities.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { ViewArchieveComponent } from './view-archieve/view-archieve.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SigninComponent } from './pages/signin/signin.component';
import { CanActivateService } from './services/can-activate.service';
import { ArchiveDetailsComponent } from './archive-details/archive-details.component';
import { CompleteDetailsComponent } from './complete-details/complete-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
// import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"contact",component:ContactUsComponent
  },

  {
    path:"", redirectTo:"/home", pathMatch:"full"
  },
  {
    path:"login",component:LoginComponent
  },
 
  {
    path:"forget",component:ForgetPasswordComponent
  },
  {
    path:"userDashboard",component:UserDashboardComponent,
    children:[
      {
        path:"addtodo",component:AddtodoComponent
      },
      {
        path:"archiveDetails/:todoId",component:ArchiveDetailsComponent
      },
      // {
      //   path:"profileupdate",component:UpdateProfileComponent
      // },
      {
        path:"viewTodo",component:ViewTodoComponent
      },
      {
        path:"completed",component:CompletedTodosComponent
      },
      {
        path:"completeDetails/:todoId",component:CompleteDetailsComponent
      },
      {
        path:"todoDetails/:todoId",component:TodoDetailsComponent
      },
      {
        path:"updatetodo/:todoId",component:UpdateTodoComponent
      },
      {
        path:"archieve",component:ViewArchieveComponent
      },
      {
        path:"priorities",component:PrioritiesComponent
      },
      {
        path:"profile",component:ViewProfileComponent
      }
    ]

  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
