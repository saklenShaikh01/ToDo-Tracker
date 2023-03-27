import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-complete-details',
  templateUrl: './complete-details.component.html',
  styleUrls: ['./complete-details.component.css']
})
export class CompleteDetailsComponent {
  constructor(private serve:TodoService, private ar:ActivatedRoute, private route:Router){}
  todos:any=[]
  
    ngOnInit(): void {
      let todoId=this.ar.snapshot.paramMap.get("todoId")
      console.log(todoId)
      this.serve.getCompleteTodo(todoId).subscribe(res=>{
        this.todos=res
        console.log(res)
        console.log(this.todos)
      })
    }
}
