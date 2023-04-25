import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../address.service';
import { AuthenticationService } from '../authentication.service';
import { Address } from '../Models/address';
import { Login } from '../Models/login';

@Component({
  selector: 'app-addres',
  templateUrl: './addres.component.html',
  styleUrls: ['./addres.component.css']
})
export class AddresComponent implements OnInit {

  address: Address[];
  address1: Address = new Address();
  count: number = 0;
  formValue!: FormGroup;
  useraddresses=Array();
  panelOpenState = false;

  userdata:any;
  user: Login[];

  
  constructor( private serviceadd: AddressService, private tosatr: ToastrService,private formBuilder:FormBuilder,private auth: AuthenticationService) { }

  ngOnInit(): void {
   this.get()

   this.formValue = this.formBuilder.group({
    addressId: [''],
    userName: [''],
    houseNumber: [''],
    colony: [''],
    city:[''],
    district:[''],
    pinCode:[''],
    country:[''],
    state:[''],
    phoneNumber:[''],
   
  })

 this.Getuserdata()
  }

 
  Getuserdata(){
    let username = localStorage.getItem('userName') as string;
    this.auth.Get().subscribe((result) => {
      this.user = result;
      
      console.log(this.user);
      this.userdata = this.user.filter(r => r.userName == username)
      console.log(this.userdata);
    });
    
  }


  get() {
    let username = localStorage.getItem('userName') as string;
    this.serviceadd.GetAddress().subscribe((result) => {
      console.log(result);
      this.address = result;
      this.useraddresses = this.address.filter(r => r.userName == username)
      console.log(this.useraddresses);
    })

  }
  editData(data: any) {
    this.address1.addressId = data.addressId;
    this.formValue.controls["addressId"].setValue(data.addressId);
    this.formValue.controls["userName"].setValue(data.userName);
    this.formValue.controls["houseNumber"].setValue(data.houseNumber);
    this.formValue.controls["colony"].setValue(data.colony);
    this.formValue.controls["city"].setValue(data.city);
    this.formValue.controls["district"].setValue(data.district);
    this.formValue.controls["state"].setValue(data.state);
    this.formValue.controls["pinCode"].setValue(data.pinCode);
    this.formValue.controls["country"].setValue(data.country);
    this.formValue.controls["phoneNumber"].setValue(data.phoneNumber);

  }


  updateData() {

    this.address1.addressId = this.formValue.value.addressId;
    this.address1.userName = this.formValue.value.userName;
    this.address1.houseNumber = this.formValue.value.houseNumber;
    this.address1.colony = this.formValue.value.colony;
    this.address1.city = this.formValue.value.city;
    this.address1.district = this.formValue.value.district;
    this.address1.state = this.formValue.value.state;
    this.address1.pinCode = this.formValue.value.pinCode;
    this.address1.country = this.formValue.value.country;
    this.address1.phoneNumber = this.formValue.value.phoneNumber;
    

    this.serviceadd.UpdateAddress(this.address1,this.address1.addressId).subscribe({
      complete: () => {
        console.log('Updated...');
        this.tosatr.success("Updated Successfully", "Address")
        this.formValue.reset();
        this.get();
      },
      error: () => {
        alert('Error');
      }
    }
    )
  }


  AddAddress() {
    for (var i = 0; i < this.address.length; i++) {
      console.log(this.address1.addressId);
      if (this.address[i].addressId != this.address1.addressId) {
        this.count++;


      }
    }
    console.log(this.count);
    if (this.count == this.address.length) {
      this.serviceadd.AddAddress(this.address1).subscribe((r) => {
        this.address1 = new Address();
        this.tosatr.success("Added Successfully", "Address")
        this.get();
      })
    }
    else {
      console.log("already exist");
      this.tosatr.success("Already Exists", "Product")
    }

  }





 
}
