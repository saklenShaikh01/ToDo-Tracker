import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/Todo';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TodoService } from 'src/app/services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from 'src/app/dialog-content-example-dialog/dialog-content-example-dialog.component';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit{
showInbox:boolean=false;
hideInbox:boolean=false;
  todoDetails:any=[]
  pageSlice:any=[];
  constructor(private dialog:MatDialog,private serve:TodoService, private router:Router,private snak:MatSnackBar){}
  // @ViewChild(MatPaginator) paginator:MatPaginator | undefined;
  ngOnInit(): void {
    
   this.serve.getAllTodos().subscribe(res=>{
    this.pageSlice=res.slice(0,3)
    this.todoDetails=res;

   
    // res=this.todos;
    // console.log(res);
    // console.log(this.todoDetails)
    
    // console.log(this.pageSlice)
   })
  //  this.todoDetails.paginator=this.paginator;
  }
 

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    console.log(startIndex)
    let endIndex = startIndex + event.pageSize;
    console.log(endIndex)
    if (endIndex > this.todoDetails.length) {
      endIndex = this.todoDetails.length;
      this.pageSlice = this.todoDetails.slice(startIndex, endIndex);
    }
    this.pageSlice = this.todoDetails.slice(startIndex, endIndex);
  }

  addTodosIntoArchive(todo:any){
    this.serve.addTodoIntoArchieve(todo).subscribe(
     result=>{
      
       
       console.log(todo)
       this.deleteTodos(todo.todoId);
       this.snak.open("1 Task Archieved !!", "close",{
        duration:3000,
      });
       this.ngOnInit();
     },
     error=>{
       this.snak.open("Something went Wrong !!", "Ok",{
         duration:3000,
       });
     }
   )
   }
   
   addTodosIntoComplete(todo:any){
    this.serve.addCompletedTodoIntoComplete(todo).subscribe(
     result=>{
      
       this.snak.open("1 Task Completed !!", "close",{
         duration:3000,
       });
       this.deleteTodos(todo.todoId);
       this.ngOnInit();
     },
     error=>{
       this.snak.open("Something went Wrong !!", "Ok",{
         duration:3000,
       });
     }
   )
   }
searchOnText(todoTitle:any){
  this.serve.getAllTodos().subscribe((todos:any)=>{
      if(todoTitle===null || todoTitle!==""){
        this.pageSlice=todos.filter( ((todo:any)=>  todo.todoTitle?.toLowerCase().includes(todoTitle.toLowerCase() )) );
        // this.todoDetails=todos.filter((todo:any)=>todo.todoDesc?.toLowerCase().includes(todoTitle.toLowerCase()));
      console.log(this.todoDetails)
      }
      else{
        this.pageSlice=todos
      }
    
  })
}
editStatus: boolean = false;

// openDialog() {
//   const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

//   dialogRef.afterClosed().subscribe(result => {
//     console.log(`Dialog result: ${result}`);
//   });
// }
canDeactivate(){
  if(!this.editStatus) {
    let response = confirm("Do you still want to delete the task?")
   
    // let response=this.snak.open("Do you still want to delete the task?","cancel",{
    //   duration:9000,
    // })
    console.log(response)
    return response;
  }
  else{
    return true;
  }
}
   deleteTodos(todoId:any){
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    
    if(result){
    this.serve.deleteTodos(todoId).subscribe(data=>{
      console.log(data)
      this.ngOnInit()
  })
  }
});
}
   

}
