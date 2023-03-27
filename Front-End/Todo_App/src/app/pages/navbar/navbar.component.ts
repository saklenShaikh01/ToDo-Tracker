import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from 'src/app/dialog-content/dialog-content.component';
import { TodoService } from 'src/app/services/todo.service';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dial:MatDialog,private serve:TodoService, private userSer:UserRegistrationService,private rout:Router){}

 editstatus:boolean=false;
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
        // console.log(this.userProfile)
        // this.name=this.users.fullName
        // console.log(this.name)
      })
      // })
  }

  todoDetails:any=[]
  searchOnText(todoTitle:any){
    this.serve.getAllTodos().subscribe((todos:any)=>{
        if(todoTitle===null || todoTitle!==""){
          this.todoDetails=todos.filter((todo:any)=>todo.todoTitle?.toLowerCase().includes(todoTitle.toLowerCase()));
        }else{
          this.todoDetails=todos
        }
      
    })
  }


  canDeactivate(){
    if(!this.editstatus) {
      let response = confirm("Do you still want to delete the task?")
      console.log(response)
      return response;
    }
    else{
      return true;
    }
  }


  logOut(){
    const dialogRef = this.dial.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    
    if(result){
    this.userSer.logout();
    this.userSer.loginStatusSubject.next(false);
    this.rout.navigate(['home']);
    }
  });
  }



}
