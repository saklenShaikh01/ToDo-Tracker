import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodoService } from '../services/todo.service';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit{
  constructor(private dial:MatDialog,private serve:TodoService, private userSer:UserRegistrationService,private rout:Router){}
  todoDetails:any=[]
  archiveTodo:any=[]
  users:any={}
  userProfile:any
  name:any;
 email:any=localStorage.getItem("emailId")
 ngOnInit(): void {
  // this.userSer.loginStatusSubject.asObservable().subscribe((data)=>{
    this.userSer.getCurrentUser(this.email).subscribe(data=>{
      // console.log(data)
      this.users=data
      this.userProfile=this.users.profile
      // console.log(this.email)
      // console.log(this.userProfile)
      // this.name=this.users.fullName
      // console.log(this.name)
    })
    this.serve.getAllTodos().subscribe(res=>{
      this.todoDetails=res;
      this.ngOnInit()
    })
    // this.serve.getTodoIntoArchieve().subscribe(res=>{
    //   this.archiveTodo=res
    //   this.ngOnInit()
    // })
}

logOut(){
  this.userSer.logout();
  this.userSer.loginStatusSubject.next(false);
  Swal.fire({
    icon: 'success',
    title: 'Log Out Successfully...',
    text: "Thank You, Please visit again",
  })
  this.rout.navigate(['home']);
}
}
