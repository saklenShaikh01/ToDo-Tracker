import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { passwordValidate } from 'src/app/helper/passwordValidation';

import { FileHandle } from 'src/app/model/userFile';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import Swal from 'sweetalert2';
import { emailValidator } from '../email-Validation';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  userFile1:any = File;
  userFile2:any = File;

  constructor(private dial:MatDialog,private sanitizer:DomSanitizer,private route:Router, private fb:FormBuilder,private userSer:UserRegistrationService,private snackBar:MatSnackBar){}

  url:string='../../../assets/pic.jpg'
  
  ngOnInit() {
    
  }

  //   const file = event.target.files[0];
  // const fileHandle: FileHandle = {
  //   file: file,
  //   url: this.sanitizer.bypassSecurityTrustUrl(
  //     window.URL.createObjectURL(file)
  //   ),
  // };
  // this.userFile1 = fileHandle.file;
  // this.userFile2 = fileHandle;
// }
  get fullName()
  {
    return this.signupForm.get("fullName");
  }
  get contact()
  {
    return this.signupForm.get("contact");
  }
 
  get email()
  {
    return this.signupForm.get("email");
  }
  get password()
  {
    return this.signupForm.get("password");
  }
  get confirmPassword()
  {
    return this.signupForm.get("confirmPassword");
  }
  signupForm=this.fb.group
  ({
  profile:[''],
  fullName:["",[Validators.required]],
  email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  contact:["",[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
  password:["",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
  confirmPassword:["",Validators.required]
 },{validator:passwordValidate});
// signupForm=new FormGroup({
//   profile:new FormControl(''),
//   fullName:new FormControl("",[Validators.required]),
//   email:new FormControl('',[Validators.required, Validators.email,emailValidator()]),
//   contact:new FormControl("",[Validators.required,Validators.pattern(/^[789]\d{9}$/)]),
//   password:new FormControl("",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
//   confirmPassword:new FormControl("",[Validators.required])
// });

 onFileSelect(file:any){
  if(file.target.files){
    const reader=new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload=(event:any)=>{
      this.url=event.target.result;
    }
  }
  const filedata=file.target.files[0];
  console.log(filedata);
  console.log(file);
    }

//  signup() {
    // const user = this.signupForm.value;
    // const formData = new FormData();
    // formData.append('commonUser',JSON.stringify(user));
    // formData.append('file', this.userFile1);
    // console.log(this.signupForm.value)
    // this.userSer.registerUser(
    //   profile:this.url,
    //   fullName:this.fullName?.value,
    //   email:this.email?.value,
    //   contact:this.contact?.value,
    //   password:this.password?.value,
    //   confirmPassword:this.confirmPassword?.value
    //   this.signupForm.value
    // ).subscribe((data:any)=>{
    //     console.log(data)
     
    //     Swal.fire('Success',
    //   'You Have Sign Up Succesfully',
    //    'success')
    //    this.route.navigate(['/login'])
    //   }
    // )
    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
      this.dial.open(LoginComponent, {
        enterAnimationDuration,
        exitAnimationDuration
      });
    }
    signup(){
      this.userSer.registerUser({
        profile:this.url,
        fullName:this.fullName?.value,
        email:this.email?.value,
        contact:this.contact?.value,
        password:this.password?.value,
        confirmPassword:this.confirmPassword?.value
      }).subscribe({
        next:(data:any)=>{
          console.log(data)
       
          Swal.fire('Success',
        'You Have Sign Up Succesfully',
         'success')
        //  this.signInForm.reset()
        //  this.dialog.closeAll();
        //  this.route.navigate(['/login'])
        }
        
      })
 
    // this.userSer.registerUser(this.signupForm.value).subscribe({
    //   next: (response) => {
    //     console.log(response)
    //     Swal.fire('Success',
    //     'You Have Logged In Succesfully',
    //     'success')
    //   }});
 
    // this.signupForm.reset();

  }




}