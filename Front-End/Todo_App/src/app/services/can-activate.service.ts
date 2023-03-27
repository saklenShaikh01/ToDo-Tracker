import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RoutService } from './rout.service';


@Injectable({
  providedIn: 'root'
})
export class CanActivateService {

  constructor(private auth : AuthService,
    private route:RoutService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   if(this.auth.isLoggedIn){
   return true
  }

   else{
    this.route.toLogin()
    return false;
   }

}
}
