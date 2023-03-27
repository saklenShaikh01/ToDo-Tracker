import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent {
  constructor(private serve:TodoService,private fb:FormBuilder, private ar:ActivatedRoute, private route:Router){}
 

  ngOnInit(): void {
    let todoId=this.ar.snapshot.paramMap.get("todoId")
    console.log(todoId)
    this.serve.findTodo(todoId).subscribe(res=>{
      this.todos=res
      console.log(this.todos)
      console.log(res)
    })
  }
  todos:any=[]
  todo:any={}
  prioritiy:string[] = ["High", "Medium", "Low"];
  // todoform=this.fb.group({
  //   todoTitle:[''],
  //   todoDesc:[''],
  //   priority:[''],
  //   categoryName:[''],
  //   startDate:[''],
  //   endDate:['']
    
  // })

  // get todoTitle() { return this.todoform.get("todoTitle") }
  // get todoDesc() { return this.todoform.get("todoDesc") }
  // get priority() { return this.todoform.get("priority") }
  // get categoryName(){return this.todoform.get("categoryName")}
  editTodo(){
   
      this.todo=this.todos
      console.log(this.todo[0])
      // console.log(this.todo.value)
    this.serve.updateTodo(this.todo[0]).subscribe(val=>{
      console.log(this.todo.value)
      console.log(val)
    })
    Swal.fire(
      
      'success','You have been updated successfully','success'
      
      
    )
    this.ngOnInit()
    this.route.navigate(['/userDashboard/viewTodo'])
    
  }

}
