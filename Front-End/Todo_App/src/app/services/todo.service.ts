import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

base_url:string="http://localhost:8095/api/userTodo"
url1:string="http://localhost:8095/api/archiveService"


addTodo(todo:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.post(this.base_url+"/addTodo/"+`${localStorage.getItem('emailId')}`,todo,requestOption);
}


addCategory(category:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.post(this.base_url+"/addCategory/"+`${localStorage.getItem('emailId')}`,category,requestOption)
}

getAllCategory(){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.get(this.base_url+"/allCategories/"+`${localStorage.getItem('emailId')}`,requestOption)
}

getAllTodos(){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  // console.log(localStorage.getItem('emailId'))
 return  this.http.get(this.base_url+"/allTodos/"+`${localStorage.getItem('emailId')}`,requestOption)
}

addTodoIntoCategory(todo:any,catName:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.post(this.base_url+"/addTodoIntoCategory"+catName+"/"+`${localStorage.getItem('emailId')}`,todo,requestOption)
}
addCategoryIntoTodo(category:any,todoTitle:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
return this.http.post(this.base_url+"/addTodosCategory/"+todoTitle+"/"+`${localStorage.getItem('emailId')}`,category,requestOption)

}
addTodoIntoArchieve(todo:any){
  
  return this.http.post(this.url1+"/addTodo/"+`${localStorage.getItem('emailId')}`,todo)
}

getAcrchiveTodo(todoId:any){
  return this.http.get(this.url1+"/getarchiveTodo/"+`${localStorage.getItem('emailId')}`+"/"+todoId)
}
getCompleteTodo(todoId:any){
  return this.http.get(this.url1+"/getcompleteTodo/"+`${localStorage.getItem('emailId')}`+"/"+todoId)
}
getTodoIntoArchieve(){
  
  return this.http.get(this.url1+"/allTodos/"+`${localStorage.getItem('emailId')}`)
}
addCompletedTodoIntoComplete(todo:any){
  
  return this.http.post(this.url1+"/addCompletedTodo/"+`${localStorage.getItem('emailId')}`,todo)
}
getCompletedTodoIntoComplete(){
  
  return this.http.get(this.url1+"/allCompletedTodos/"+`${localStorage.getItem('emailId')}`)
}
deleteTodos(todoId:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.delete(this.base_url+"/deleteTodo/"+`${localStorage.getItem('emailId')}`+"/"+todoId,requestOption)
}
findTodo(todoId:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.get(this.base_url+"/getTodo2/"+`${localStorage.getItem('emailId')}`+"/"+todoId,requestOption)
}

updateTodo(todo:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
  });
  let requestOption:any= {headers:httpHeaders}
  return this.http.put(this.base_url+"/updateTodo/"+`${localStorage.getItem('emailId')}`,todo,requestOption)
}
}
