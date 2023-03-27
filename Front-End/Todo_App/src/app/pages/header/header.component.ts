import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dial:MatDialog,private serve:TodoService, private userSer:UserRegistrationService,private rout:Router){}

  isLoggedIn:boolean=false;   
  users:any={}
  userProfile:any
  name:any;
 email:any=localStorage.getItem("emailId")
  ngOnInit(): void {
    this.userSer.loginStatusSubject.asObservable().subscribe((data)=>{
this.userSer.getCurrentUser(this.email).subscribe(data=>{
  // console.log(data)
  this.users=data
  this.userProfile=this.users.profile
  // console.log(this.userProfile)
  this.name=this.users.fullName
  // console.log(this.name)
})
})

  //   this.userSer.loginStatusSubject.asObservable().subscribe((data)=>{
  //   this.isLoggedIn = this.userSer.isLoggedIn();
  //   this.users = this.userSer.getCurrentUser().subscribe(data=>{
  //     this.users=data
    
  //     this.userProfile =this.users.profile;
  //     this.name=this.users.fullName;
  //     console.log(this.users)
  //   });
  // })
 
    // this.userSer.loginStatusSubject.asObservable().subscribe((data)=>{
    //   this.isLoggedIn = this.userSer.isLoggedIn();
    //   this.users = this.userSer.getUser();
    // })
}


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dial.open(LoginComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
  

  openSignup(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dial.open(SigninComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}

