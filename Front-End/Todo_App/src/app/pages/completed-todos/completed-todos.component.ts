import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.css']
})
export class CompletedTodosComponent {
  archiveTodo:any=[]
  constructor(private serve:TodoService,private route:Router){}
ngOnInit(): void {
  this.serve.getCompletedTodoIntoComplete().subscribe(res=>{
    this.archiveTodo=res
    // console.log(res)
  })
}
}
