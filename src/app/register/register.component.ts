import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import ValidateForm from '../Helpers/Validateform';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  firstname:string;
  lastname:string;
  email:string;
  username:string;
  answer:string;
  
 
  signUpForm!:FormGroup;



  constructor(private fb:FormBuilder,private auth:AuthenticationService,private  router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
     
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      gender:['',Validators.required],
      dateOfBirth:['',Validators.required],
      image:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required],
      role:[''],
      token:[''],
     answer:['',Validators.required]

    });

  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";

  }
  onSignUp(){
    console.log(this.signUpForm.value)
    if(this.signUpForm.valid){
      
      
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
         alert(res.message);
          this.signUpForm.reset();
          this.toastr.success(" successfully Registered.....!", "Done");
          this.router.navigate(['login']);
        })

        ,error:(err=>{
          alert(err?.error.message)
        })
      })
          console.log(this.signUpForm.value)
     }
    else{
         ValidateForm.validateAllFormFields(this.signUpForm)
         //logic for throwing error
    }

    
  
  }




}
