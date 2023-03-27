import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddtodoComponent } from '../addtodo/addtodo.component';
import { ViewTodoComponent } from '../view-todo/view-todo.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
 
constructor(private dial:MatDialog,private router:Router){}











  ngOnInit(): void {
   
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dial.open(AddtodoComponent, {
      enterAnimationDuration,
      exitAnimationDuration
      
    });
   
  }

  openInbox(): void {
    this.dial.open(ViewTodoComponent, {
     
      
    });
   
  }

  inbox(){
    this.router.navigate(['/viewTodo'])
  }

}
