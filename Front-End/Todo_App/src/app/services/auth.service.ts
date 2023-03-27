import { Injectable } from '@angular/core';
import { LoginComponent } from '../pages/login/login.component';
import { ViewTodoComponent } from '../pages/view-todo/view-todo.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private view:LoginComponent) { }

  isLoggedIn : boolean=false

  login(){
 
    this.isLoggedIn=true;
  }

  logOut(){
    
    this.isLoggedIn = false;
  }

}
