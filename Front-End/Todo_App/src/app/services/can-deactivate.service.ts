import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ViewTodoComponent } from '../pages/view-todo/view-todo.component';


@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService implements CanDeactivate<ViewTodoComponent>  {

  constructor() { }
  id:any
  canDeactivate(
    component: ViewTodoComponent,
    
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return component.canDeactivate ? component.canDeactivate() : true;
    
  }
}
