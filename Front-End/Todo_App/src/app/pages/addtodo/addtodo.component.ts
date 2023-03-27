import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {

  constructor(private fb:FormBuilder,private todoSer:TodoService,private route:Router){}
  

  showDateOption:boolean = false;

  // defining property to show reminder date  div
  showReminderDate:boolean = false;

  // defining property to show open priority input div
  openPriorityInput:boolean = false;

  //defining property to show category form
  showCatForm:boolean = false;

  prioritiy:string[] = ["High", "Medium", "Low"];


// categoryForm=this.fb.group({
//   categoryName:['']
// })



date=new Date().toLocaleDateString();

  todoform=this.fb.group({
    todoTitle:[''],
    todoDesc:[''],
    priority:[''],
    categoryName:[''],
    startDate:[''],
    endDate:['']
    
  })

  get todoTitle() { return this.todoform.get("todoTitle") }
  get todoDesc() { return this.todoform.get("todoDesc") }
  get priority() { return this.todoform.get("priority") }
  get categoryName(){return this.todoform.get("categoryName")}
  // get startDate() {return this.todoform.get("startDate")}
  // get categorySet() { return this.todoform.get("categorySet") }

allCat:any=[]
// categorySet:any=[]
// catName:string ="";

// this.todoform.value.startDate=this.date
// tdate=this.date.getDate()
// month=this.date.getMonth()+1;
// year=this.date.getUTCFullYear();
// minDate=this.year+"-"+this.month+"-"+this.tdate

ngOnInit(): void {
  // document.getElementById("demo")?.setAttribute('min',this.minDate)
 }
  addTodo(){

this.todoSer.addTodo(this.todoform.value).subscribe(response=>{
  // this.addCategory()
  console.log(response)
  Swal.fire('Success',
'Todo Added Succesfully',
  'success')
  
  setTimeout(() => {
    // this.todoSer.getAllCategory().subscribe(res=>{
    //   this.categorySet=res
    //   for(let cat of this.categorySet){
    //     if(cat.categoryName===this.categoryForm.value.categoryName || cat.categoryName===this.todoform.value.categoryName){
    //       this.catName=cat.categoryName
    //       console.log(this.catName)
    //     }
    //   }
    // })
    this.route.navigate(['/userDashboard/viewTodo'])
  }, 1000);
  // setTimeout(() => {
  //   this.todoSer.addTodoIntoCategory(this.todoform.value,this.catName).subscribe(res=>{
  //     console.log(this.catName)
  //     console.log(res)
  //   })
  // }, 3000);
})
  }

  // addCategory(){
  //   this.todoSer.addCategory(this.categoryForm.value).subscribe(res=>{
  //     console.log(res)
  //     this.allCat=res
  //   })
  // }


  openCatForm(){
    if(!this.showCatForm){
      this.showCatForm = true;
    }else{
      this.showCatForm = false;
    }

  }
 
  // function to open and close priorty option
  setPriortyOption(){
    if(!this.openPriorityInput){
      this.openPriorityInput = true;
    }else{
      this.openPriorityInput = false;
    }
  }

  // function to open and close due date option
  openDueDateOption(){
    if(!this.showDateOption){
      this.showDateOption = true;
    }else{
      this.showDateOption = false;
    }
  }

  // function to open and close reminder date option
  openReminderDateOption(){
    if(!this.showReminderDate){
      this.showReminderDate = true;
    }else{
      this.showReminderDate = false;
    }
  }
}