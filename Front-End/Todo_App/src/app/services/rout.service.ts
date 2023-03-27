import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutService {

  constructor(private router:Router) { }

  gotohome(){

        this.router.navigate(["/userDashboard/viewTodo"]);
      }
      toLogin (){
        this.router.navigate([""]);
      }
}
