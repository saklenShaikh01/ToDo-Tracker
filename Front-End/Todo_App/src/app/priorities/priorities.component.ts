import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent {
  todoDetails:any=[]
  hightodo:any=[]
  mediumtodo:any=[]
  lowtodo:any=[]
  constructor(private serve:TodoService, private router:Router,private snak:MatSnackBar){}
  ngOnInit(): void {
   this.serve.getAllTodos().subscribe((res:any)=>{
    this.todoDetails=res;
    this.hightodo=res.filter((todo:any)=>todo.priority?.toLowerCase().includes(this.high.toLowerCase()));
    this.mediumtodo=res.filter((todo:any)=>todo.priority?.toLowerCase().includes(this.medium.toLowerCase()));
    this.lowtodo=res.filter((todo:any)=>todo.priority?.toLowerCase().includes(this.low.toLowerCase()));
    // res=this.todos;
    // console.log(res);
    // console.log(this.todoDetails)
   })
  }

  addTodosIntoArchive(todo:any){
    this.serve.addTodoIntoArchieve(todo).subscribe(
     result=>{
       this.snak.open("1 Task Completed !!", "undo",{
         duration:3000,
       });
      //  this.deleteTodos(todoId);
       this.ngOnInit();
     },
     error=>{
       this.snak.open("Something went Wrong !!", "Ok",{
         duration:3000,
       });
     }
   )
   }
  
   high:string="high"
   medium:string="medium"
   low:string="low"
  
priorityHigh(prioritiy:any){
  this.serve.getAllTodos().subscribe((todos:any)=>{
    
    if(prioritiy===null || prioritiy!==""){
      this.todoDetails=todos.filter((todo:any)=>todo.priority?.toLowerCase().includes(prioritiy.toLowerCase()));
    this.hightodo=todos
    }
    else{
      this.todoDetails=todos
    }
      
      
    
  })
}
// priorityMedium(prioritiy:any){
//   this.serve.getAllTodos().subscribe((todos:any)=>{
//       if(prioritiy===null || prioritiy!==""){
//         this.todoDetails=todos.filter((todo:any)=>todo.priority?.toLowerCase().includes(prioritiy.toLowerCase()));
//       }
//       else{
//         this.todoDetails=todos
//       }
    
//   })
// }
// priorityLow(prioritiy:any){
//   this.serve.getAllTodos().subscribe((todos:any)=>{
//       if(prioritiy===null || prioritiy!==""){
//         this.todoDetails=todos.filter((todo:any)=>todo.priority?.toLowerCase().includes(prioritiy.toLowerCase()));
//       }
//       else{
//         this.todoDetails=todos
//       }
    
//   })
// }
   deleteTodos(todoId:any){
    this.serve.deleteTodos(todoId).subscribe(data=>{
      console.log(data)
      this.ngOnInit()
  })
  }
}
