import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { LoginService } from '../login.service';
import { login } from '../Models/adminlogin';
import { Cart } from '../Models/cart';
import { Login } from '../Models/login';
import { Product } from '../Models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = sessionStorage.getItem("uname")
  role = sessionStorage.getItem('role')

  constructor(private router: Router, private cartservice: CartService, private auth: AuthenticationService,
    private tosatr: ToastrService,private formBuilder:FormBuilder) { }
  e:Login[];
  cart: Cart[];
  user: Login[];
  product: Product[];
  id: number;
  arr: any;
  username: Login=new Login();
  temp: any;


  login1: Login = new Login();
  update: Login = new Login();
  count: number = 0;
  formValue!: FormGroup;

  ngOnInit(): void {
    this.GetWatchlist();
    
 this.Getuserdata();

 this.formValue = this.formBuilder.group({
  id: [''],
  firstName: [''],
  lastName: [''],
  gender: [''],
  dateOfBirth:[''],
  email:[''],
  userName:[''],
  password:[''],
  image:[''],
  answer:[''],
  role:[''],
  token:['']
 
})

  }


  GetWatchlist() {


    this.cartservice.Get().subscribe((result) => {
      this.cart = result;
     // this.Filter();
      console.log(this.cart);
    });

  }

Getuserdata(){
  this.auth.Get().subscribe((result) => {
    this.user = result;
    this.Filter();
    console.log(this.user);
  });
}





  Filter() {
    let name = localStorage.getItem('userName') as string;
   
    this.e=this.user.filter(r=>r.userName==name);
    console.log(this.e);

    this.username = this.e[0];
    console.log(this.username)
    

  }





  editData(data: any) {
    this.login1.id = data.id;
    this.formValue.controls["id"].setValue(data.id);
    this.formValue.controls["firstName"].setValue(data.firstName);
    this.formValue.controls["lastName"].setValue(data.lastName);
    this.formValue.controls["gender"].setValue(data.gender);
    this.formValue.controls["dateOfBirth"].setValue(data.dateOfBirth);
    this.formValue.controls["email"].setValue(data.email);
    this.formValue.controls["userName"].setValue(data.userName);
    this.formValue.controls["password"].setValue(data.password);
    this.formValue.controls["image"].setValue(data.image);
    this.formValue.controls["answer"].setValue(data.answer);
    this.formValue.controls["role"].setValue(data.role);
    this.formValue.controls["token"].setValue(data.token);
   

  }


  updateData() {

    this.login1.id = this.formValue.value.id;
    this.login1.firstName = this.formValue.value.firstName;
    this.login1.lastName = this.formValue.value.lastName;
    this.login1.gender = this.formValue.value.gender;
    this.login1.dateOfBirth = this.formValue.value.dateOfBirth;
    this.login1.email = this.formValue.value.email;
    this.login1.userName = this.formValue.value.userName;
    this.login1.password = this.formValue.value.password;
    this.login1.image = this.formValue.value.image;
    this.login1.answer = this.formValue.value.answer;
    this.login1.role = this.formValue.value.role;
    this.login1.token = this.formValue.value.token;
    

    this.auth.Updatedata(this.login1,this.login1.id).subscribe({
      complete: () => {
        console.log('Updated...');
        this.tosatr.success("Updated Successfully", "Address")
        this.formValue.reset();
        this.Getuserdata();
      },
      error: () => {
        alert('Error');
      }
    }
    )
  }
 


}


