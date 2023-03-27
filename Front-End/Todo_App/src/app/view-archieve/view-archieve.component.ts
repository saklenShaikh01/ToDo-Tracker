import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-view-archieve',
  templateUrl: './view-archieve.component.html',
  styleUrls: ['./view-archieve.component.css']
})
export class ViewArchieveComponent implements OnInit{
  archiveTodo:any=[]
  constructor(private serve:TodoService,private route:Router){}
ngOnInit(): void {
  this.serve.getTodoIntoArchieve().subscribe(res=>{
    this.archiveTodo=res
    // console.log(res)
  })
}


}
