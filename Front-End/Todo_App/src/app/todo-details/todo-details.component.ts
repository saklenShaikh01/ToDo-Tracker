import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent {
  constructor(private serve:TodoService, private ar:ActivatedRoute, private route:Router){}
  todos:any=[]
  
    ngOnInit(): void {
      let todoId=this.ar.snapshot.paramMap.get("todoId")
      console.log(todoId)
      this.serve.findTodo(todoId).subscribe(res=>{
        this.todos=res
        console.log(res)
        console.log(this.todos)
      })
    }

}
