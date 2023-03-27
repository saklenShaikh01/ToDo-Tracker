import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{
  constructor(private user:UserRegistrationService, private route:Router){}
  userD:any={}
  userProfile:any;
  name:any;

  ngOnInit(): void {
    this.user.getCurrentUser(localStorage.getItem('emailId')).subscribe(res=>{
      console.log(res)
      this.userD=res;
      this.userProfile=this.userD.profile;
      this.name=this.userD.fullName;
      console.log(res)
    })
  }

}
