import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import ValidateForm from '../Helpers/Validateform';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  signUpForm!: FormGroup;



  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      gender: [''],
      dateOfBirth: ["2022-12-12"],
      image: [''],
      email: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
      token: [''],
      answer:['']
    });

  }

  onSignUp() {
    console.log("hi")
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)

      this.auth.Updatepwd(this.signUpForm.value)
        .subscribe({
         
          next: (res => {
            console.log("gopi");
            // this.toast.success({ detail: "Password updated successfully", summary: res.message, duration: 1000 });
            this.toast.success('Successfully Updated Your Password',  'Done');

            this.router.navigate(['login']);
          }),

            error: (err => {
            console.log("error");
            alert(err?.error.message)
          })
        })

    }
    else {
      ValidateForm.validateAllFormFields(this.signUpForm)

    }



  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }




}
