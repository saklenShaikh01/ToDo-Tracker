import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();
  base_url:string = "http://localhost:8095/api/userTodo";
  base_url1:string = "http://localhost:8095/api/userService";

  registerUser(formData:any){
    console.log(formData)
    return this.http.post(this.base_url+"/register", formData);
   
  }

  login(formData:any){
    return this.http.post(this.base_url1+"/login",formData)
  }

 

  //method to Set Token Into Data base

  public loginUser(token:any){
    localStorage.setItem('token', token);
    return true;
}

// method to check user is login or not

isLoggedIn(){
 let token = localStorage.getItem("token");
     if(token == undefined || token == '' || token == null){
      return false;
     }else{
      return true;
     }
}

//method to logout user

logout(){
   localStorage.clear();
  return true;
}

//method to get token

public getToken(){
let token = localStorage.getItem('token');
console.log("Get Tocken"+token);
}

//method to get logged in user

public getCurrentUser(email:any){
// let httpHeaders=new HttpHeaders({
//   'Content-Type':'application/json',
//   Authorization :'Bearer '+localStorage.getItem('token')
// });
// let requestOption= {headers:httpHeaders}
return this.http.get(this.base_url+"/getUser/"+email);
}

// public getUser(email:any){
//   return this.http.get(this.base_url1+email);
// }




// public getUser(){
//   let userStr = localStorage.getItem('user');
//   if(userStr != null){
//     return JSON.parse(userStr);
//   }else{
//     this.logout();
//     return null;
//   }
// }

// public setUser(user:any){
//   localStorage.setItem('user', JSON.stringify(user));
// }
  
public generateOtp(email:any){
  return this.http.get(`${this.base_url}/otp/${email}`)
}

public changePassword(user:any,email:any){
  return this.http.put(`${this.base_url}/update/${email}`,user)
  }
  public updateUser(user:any,email:any){
    return this.http.put(`${this.base_url}/updateuser/${email}`,user)
  }
}
