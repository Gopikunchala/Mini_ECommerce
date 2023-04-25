import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { AuthGuard } from '../guards/auth.guard';
import ValidateForm from '../Helpers/Validateform';

import { LoginService } from '../login.service';
import { Login } from '../Models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = '';
  errorMessage:string=' ';
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  loginForm!:FormGroup;



  constructor(private auth:AuthenticationService,private service:LoginService,private toastr:ToastrService,
    private router:Router,private toaster:NgToastService,private fb:FormBuilder) { }

  login: Login = new Login();
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      
    })

  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }

  onLogin() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.service.isLoggedIn=true;

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          
          console.log(res.message);
          this.loginForm.reset();

          alert(res.message);
          this.toaster.success({detail:"SUCCESS",summary:res.message,duration:3000});
          this.auth.storeToken(res.token);
          console.log(res.userName)
          localStorage.setItem("userName",res.userName);
         this.toastr.success('Succesfully logedin..... !',  'Logedin');
        //  this.toaster.success({detail:"SUCCESS",summary:"Logined Succesfuuly...!",duration:3000});
          this.service.doLogin();
          this.router.navigate(['/addorder']);
        },
        error:(err)=>{
          
          alert(err?.error.message)
         alert("Invalied Username & Password...! Register now");
          this.toaster.error({detail:"ERROR",summary:"Something went wrong!",duration:3000});
          console.log(err);
        },
      })
    }
    else{

      ValidateForm.validateAllFormFields(this.loginForm)
    }
  

  }

  
  onSubmit() {
    this.onLogin();
  }
  
  forgot()
  {
    console.log("hi");
    this.router.navigate(["forget"]);
  }



}
