
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgetPasswordComponent } from 'src/app/forget-password/forget-password.component';
import { passwordValidate } from 'src/app/helper/passwordValidation';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import Swal from 'sweetalert2';
import { emailValidator } from '../email-Validation';
import { SigninComponent } from '../signin/signin.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  constructor(private fb:FormBuilder,private route:Router, private userSer:UserRegistrationService,private snack:MatSnackBar,private dialog:MatDialog,private dial:MatDialog,private rout:Router){}
  users:any={}
  ngOnInit(): void {
    // this.userSer.getCurrentUser(this.email).subscribe(data=>{
    //   console.log(data)
    //   this.users=data
    //   // console.log(this.userProfile)
    //   // this.name=this.users.fullName
    //   // console.log(this.name)
    // })

  }

  responseData:any=""
  loginForm=this.fb.group({
    email:['',[Validators.required, Validators.email,emailValidator()]],
    password:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
  })

  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }
  openSignup(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dial.open(SigninComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
loggedIn:Boolean=false;
  onSubmit(){
    localStorage.setItem("emailId",this.loginForm.get("email")?.value+"")
    this.userSer.login(this.loginForm.value).subscribe((res:any)=>{
      console.log(res)
      this.responseData=res
      localStorage.setItem("token",this.responseData.token)
      console.log(this.responseData.token);
      if(this.responseData.token!==null){this.loggedIn=true;}
      console.log(this.loggedIn);
      localStorage.setItem('loggedin',this.loggedIn+"");
       console.log(localStorage.getItem('emailId'))
       console.log(localStorage.getItem('loggedin'))
      localStorage.setItem("email",this.loginForm.get("email")?.value+"")
      Swal.fire({
        icon: 'success',
        title: 'Log In Successfully...',
        text: "Welcome   "+localStorage.getItem('emailId'),
      })
      setTimeout(() => {
        this.rout.navigate(['/userDashboard/viewTodo'])
      }, 1000);
    
    },Error=>{
      Swal.fire({
        icon: 'error',
        title: 'Incorrect Email or Password',
        text: "Please Try Again....",
      })
    })
    this.loginForm.reset()
     this.dial.closeAll()
   
    // this.userSer.login(this.loginForm.value).subscribe(
    //   (res:any)=>{
      
    //     this.responseData = res;
     
    //     this.userSer.loginUser(this.responseData.token);

    //     console.log(this.responseData)
    //     localStorage.setItem("token",this.responseData.token)
    //     localStorage.setItem("email",this.loginForm.get("email")?.value+"")
    //      console.log(this.responseData.email)
       
    //     Swal.fire('Success',
    //     'You Have Logged In Succesfully',
    //     'success')     
         
    //   }),
      
    //   (error:any)=>{
    //     this.snack.open(
    //       "Invalid Credentials !!", "Ok",{
    //         duration:3000,
    //       });
         
    //   }
    //   this.loginForm.reset()
    // this.dial.closeAll()
    // // setTimeout(() => {
    // //   window.location.reload();
    // // }, 2000);
  

    

    }
    isLogin(){
      return this.loggedIn;
    }
    opensignup:boolean=false;
    openSignupform(){
      if(!this.opensignup){
        this.opensignup = true;
      }else{
        this.opensignup = false;
      }
    }
    openLoginform(){
      if(this.opensignup){
        this.opensignup = false;
      }else{
        this.opensignup = true;
      }
    }
    userFile1:any = File;
    userFile2:any = File;
    url:string='../../../assets/pic.jpg'
    get fullName()
  {
    return this.signupForm.get("fullName");
  }
  get contact()
  {
    return this.signupForm.get("contact");
  }
 
  get emailId()
  {
    return this.signupForm.get("email");
  }
  get passwords()
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
  email:['',[Validators.required, Validators.email,emailValidator()]],
  contact:["",[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
  password:["",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
  confirmPassword:["",Validators.required]
 },{validator:passwordValidate});

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

 signup() {
    // const user = this.signupForm.value;
    // const formData = new FormData();
    // formData.append('commonUser',JSON.stringify(user));
    // formData.append('file', this.userFile1);
    console.log(this.signupForm.value)
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
       this.route.navigate(['/login'])
      //  this.opensignup=false
      //  window.alert("refresh")
      }
    })
  }
    openMatDialog()
    {
      const dialogRef=this.dialog.open(ForgetPasswordComponent,
        {
          // height: '375px',
          width: '500px',
        });
    }
    

}
