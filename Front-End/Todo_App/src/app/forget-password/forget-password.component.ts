import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { passwordValidate } from '../helper/passwordValidation';
import { emailValidator } from '../pages/email-Validation';
import { UserRegistrationService } from '../services/user-registration.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  otp1:boolean = false;

  otp2:boolean = false;

  otp3:any;

  storeEmail:string[] = [];


  allUsers:any;

  constructor(private fb:FormBuilder, private user:UserRegistrationService,
     private dialog:MatDialog, private snak:MatSnackBar, private router:Router){}


     otpVerify=this.fb.group({
      email:['',[Validators.required,Validators.email,emailValidator]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
      confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
    }, {validator:passwordValidate}
     )

     get password(){
      return this.otpVerify.get('password');
    }
  
    get confirmPassword(){
      return this.otpVerify.get('confirmPassword');
    }
  
    get email(){
      return this.otpVerify.get('email');
    }
    openOtp:boolean=false
  ngOnInit(): void {
  
  }
 
  openUpdate:boolean=false
  openEmail:boolean=true
  generateOtp(){
        this.user.generateOtp(this.otpVerify.value.email).subscribe(
          response=>{
             this.otp3 = response;
             this.openOtp=true
             console.log(this.otp3);
            Swal.fire("Success","Otp Sent On Your Email Id", "success");
            this.otp1 = true;
          },
          error=>{
              this.snak.open(
            "Provide Valid OTP !!", "Ok",{
              duration:5000,
            });
          }       
       ) }

       verify(){
        Swal.fire('Success',
      'Otp is succesffully verified',
      'success');
        this.openOtp=false
        this.openEmail=false
        this.openUpdate=true
       }
  
   

   enterOtp(otp:string){
     if(otp==this.otp3){
      this.otp2 = true;
     }
   }


   update(){
    this.user.changePassword(this.otpVerify.value, 
     this.otpVerify.value.email).subscribe(
     response=>{
       Swal.fire("Success", "Your Password Changed Sucessfully, Please LogIn", 'success');
       this.router.navigate(['home']);
       this.dialog.closeAll();
     },
     error=>{
       console.log(error);
     }
    )
 }

}
