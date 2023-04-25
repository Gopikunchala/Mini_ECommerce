import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { count } from 'rxjs';
import { BuyService } from '../buy.service';
import { CartService } from '../cart.service';
import { JsonService } from '../json.service';
import { Buy } from '../Models/buy';
import { Cart } from '../Models/cart';
import { json } from '../Models/json';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';


import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { AuthenticationService } from '../authentication.service';
import { AddressService } from '../address.service';
import { Address } from '../Models/address';
import { LoginService } from '../login.service';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helpers/Validateform';


@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {
  b: Cart[];
  carts: Cart = new Cart();
  p: Product[];
  m = Array();
  trash: json[];
  i = Array();
  o: boolean = false;
  order: Buy = new Buy();
  n: number;
  product1: Product[];
  cartcount: number = 1;
  Checkproduct = Array();

  product: Product = new Product();
  numberofitems: number;
  nn = Array();
  dropdown = Array();
  stackarray = Array();
  searchKey: string = "";

  selectedProducts: any[];
  productselecte: any[];
  iteamselected: any[];
  useraddresses: Address[];
  myArray: any[];
  Quentity: any[];
  totalPrice = Array();
  totalcquentity: number = 0;
  totalAmount: number = 0;
  selectarry: boolean = false;
  shippingamount: number = 0;
  gstpersentage: number = 0.5;
  step: number = 1;
  panelOpenState = false;
  address: Address[];
  address1: Address = new Address();
  update: Address = new Address();
  count: number = 0;
  formValue!: FormGroup;

  myAddres = Array();
  AddressArray = Array();
  conformaddress: any;
  extra = Array();
  h = Array();
  lastcount = Array();
  lastprice = Array();
  countlast: number;
  pricelast: number;
  productarray = Array();
  

  length: number = 0;
  login: boolean = false;
  cartcount1: number;
  productids = Array()
  c: Cart = new Cart();
  constructor(private cartservice: CartService, private productservice: ProductserviceService, private authGuard: AuthGuard, private auth: AuthenticationService,
    private router: Router, private confimservice: NgConfirmService, private toastr: ToastrService, private addresserivce: AddressService,
    private trashservice: JsonService, private buyservice: BuyService, private serviceadd: AddressService, private tosatr: ToastrService, private service: LoginService, private toaster: NgToastService) { }

  ngOnInit(): void {
    this.login = this.auth.isLoggedIn();
    this.productarray = this.productservice.GetArray();
    console.log(this.productarray)
    this.length = Object.keys(this.productarray).length;

    this.Get();
    this.GetProducts();
    //this.Trash();
    this.get();
    this.productarray=JSON.parse(localStorage.getItem('temporaryids') as string)


    this.productservice.search.subscribe((val: any) => {
      this.searchKey = val;

    })
    this.addarray()
  }

  getquentity(productid: number, index: number) {

    this.Quentity[index]++;

    console.log(this.Quentity)

    this.product1 = this.m.filter(x => x.productId == productid);


    this.totalPrice[index] = this.Quentity[index] * this.product1[0].price;
    console.log(this.totalPrice);


    this.totalAmount = 0;
    this.totalcount();
    this.initalcount()


  }


  totalcount() {
    this.totalcquentity = 0;
    this.totalAmount = 0
    for (var i = 0; i < this.Quentity.length; i++) {
      if (this.myArray[i] == 1) {

        this.totalcquentity = this.totalcquentity + this.Quentity[i];
      }

    }
    console.log(this.totalcquentity)
    for (var i = 0; i < this.totalPrice.length; i++) {
      if (this.myArray[i] == 1) {

        this.totalAmount += this.totalPrice[i];
        console.log(this.totalAmount)
      }

    }
  }




  getquentityless(productid: number, index: number) {
    this.Quentity[index]--;
    console.log(this.Quentity)

    this.product1 = this.m.filter(x => x.productId == productid);


    this.totalPrice[index] = this.Quentity[index] * this.product1[0].price;
    console.log(this.totalPrice);


    this.totalcount();
  }





  Get() {
    this.cartservice.Get().subscribe((r) => {
      this.b = r;

      console.log(this.b)
    });

  }


  Delete(id) {

    let s = this.b.filter(x => x.productId == id)
    id = s[0].cartId

    this.cartservice.Delete(id).subscribe((r) => {
      console.log("Deleted successfully");

      this.Get();
    });

    // this.cartservice.Delete(id).subscribe((r) => {
    //    console.log("hbcyuhdcuihsdiuwja")
    // });
    // this. Get();


  }


  Addtocart(id: number) {
    let username = localStorage.getItem('userName') as string;
    console.log(this.b)
    let s = this.trash.filter(x => x.productId == id)
    let y = s.filter(r => r.userName == username)
    let C = y[0].id;
    this.carts.userName = username;

    this.carts.productId = y[0].productId;
    console.log(C)
    this.cartservice.Add(this.carts).subscribe((r) => {
      console.log("data...")
      //this.DeleteFromTrash(id);
    })
  }



  // DeleteFromTrash(id: number) {

  //   let username = localStorage.getItem('userName') as string;
  //   console.log(this.b)
  //   let s = this.trash.filter(x => x.productId == id)
  //   let y = s.filter(r => r.userName == username)
  //   let C = y[0].id;
  //   this.carts.userName = username;

  //   this.carts.productId = y[0].productId;
  //   console.log(C)

  //   this.trashservice.Delete(C).subscribe((r) => {

  //     console.log("hsgdijkhdlk")
  //   });
  // }


  // Trash() {
  //   this.trashservice.Get().subscribe((r) => {
  //     this.trash = r;
  //     this.GetTrash();
  //   })
  // }


  // GetTrash() {
  //   let username = localStorage.getItem('userName');
  //   let s = this.trash.filter(x => x.userName == username);
  //   for (var i = 0; i < s.length; i++) {
  //     let h = this.p.filter(r => r.productId == s[i].productId);
  //     // console.log(h[0])
  //     this.i.push(h[0]);

  //   }
  //   console.log(this.i)
  // }

  GetProducts() {

    this.productservice.getProducts().subscribe((result) => {
      this.p = result;
      //console.log(this.p.length)
      this.Filter();
    });
  }


  Filter() {
    if (this.login) {
      console.log(localStorage.getItem('userName'))
      console.log(this.b)
      for (var i = 0; i < this.b.length; i++) {
        let name = localStorage.getItem('userName')


        let filt = this.p.filter(x => x.productId == this.b[i].productId)

        console.log(filt);
        if (filt !== null && this.b[i].userName == name) {

          this.m.push(filt[0]);
          this.stackarray.push(filt[0].stock);
          console.log(this.m)


        }
      }
      console.log(this.m.length)
      this.myArray = Array(this.m.length).fill(1);
      this.Quentity = Array(this.m.length).fill(1);
      this.totalPrice = Array(this.m.length).fill(0);
      this.selectedProducts = Array(this.m.length).fill(1);
      this.cartcount1 = this.m.length;
      this.cartservice.updatecount(this.cartcount1)
      for (var i = 0; i < this.m.length; i++) {
        this.productids.push(this.m[i].productId);
      }
      for (var j = 0; j < this.productids.length; j++) {
        let productid = this.p.filter(x => x.productId == this.productids[j])
        // this.count[j] = productid[0].price
        this.totalAmount += productid[0].price
        this.totalcquentity += this.Quentity[j];
      }

    }
    else {
      console.log(this.m)
      this.productservice.getProducts().subscribe((r) => {

        for (var i = 0; i < this.length; i++) {
          let a = r.filter(x => x.productId == this.productarray[i])
          console.log(a[0])
          this.m.push(a[0]);
        }
        console.log(this.m)
        this.myArray = Array(this.m.length).fill(1);
        this.Quentity = Array(this.m.length).fill(1);
        console.log(this.Quentity)
        this.totalPrice = Array(this.m.length).fill(0);
        this.selectedProducts = Array(this.m.length).fill(1);



        this.cartcount1 = this.m.length;
        this.cartservice.updatecount(this.cartcount1)
        let value = Object.values(this.productarray)
        let name = value;
        console.log(name)
        console.log(this.Quentity)

        console.log(this.totalcquentity)
        for (var i = 0; i < name.length; i++) {
          let productprice = this.p.filter(x => x.productId == name[i])
          this.totalcquentity += this.Quentity[i]
          this.totalAmount += productprice[0].price;
        }
        console.log(this.totalAmount)
      })


    }


  }
  addarray() {
    let v = Object.values(this.productarray);
    if (this.auth.isLoggedIn() && (v.length > 0)) {
      let user = localStorage.getItem('userName') as string;
      for (var i = 0; i < v.length; i++) {
        this.c.userName = user;
        this.c.productId = v[i];

        this.cartservice.Add(this.c).subscribe();
      }
      this.productarray = Array()
      localStorage.setItem('temporaryids', JSON.stringify(this.productarray));

    }

  }
  initalcount() {
    for (var i = 0; i < this.m.length; i++) {
      let u = this.p.filter(x => x.productId == this.m[i].productId)
      let f = u[0].price
      this.totalPrice[i] = f * this.Quentity[i];
    }
    this.totalcount();

  }


  T() {
    if (this.o) {
      this.o = false;
    }
    else {
      this.o = true;
    }
  }


  selectproduct(productid: number, index: number) {

    if (this.myArray[index] == 0) {
      this.myArray[index] = 1;

      this.selectedProducts[index] = productid;
      this.shippingamount = 100;


      console.log(this.myArray);



    }
    else {
      this.myArray[index] = 0;
      console.log(this.myArray)
    }
    this.totalcount();
    this.initalcount();

  }




  BUY() {

    if (this.auth.isLoggedIn() || this.authGuard.Admin) {


      this.productservice.getProducts().subscribe((res) => {

        for (var i = 0; i < this.selectedProducts.length; i++) {
          if (this.selectedProducts[i] != 0) {
            let p = res.filter(x => x.productId == this.selectedProducts[i])

            this.extra.push(p[0]);
          }


        }

        console.log(this.extra);

      })
    }
    else {
      this.router.navigate(['login']);
    }
  }

  totalorder() {


    console.log(this.order.productId)
    console.log(this.selectedProducts)
    for (var i = 0; i < this.selectedProducts.length; i++) {
      if (this.selectedProducts[i] != 0) {
        this.order.numberofitems = this.Quentity[i];
        this.order.productId = this.b[i].productId;
        this.placeorder(this.selectedProducts[i])
        this.Delete(this.order.productId)

      }

    }
    this.toastr.success("Order Placed Successfully", "Order")
  }



  placeorder(id: number) {
    this.n = id;
    console.log(this.n)
    let name = localStorage.getItem('userName') as string;
    // let i = this.b.filter(x => x.productId == this.n);
    let temp = this.b.filter(r => r.userName == name);
    console.log(temp)
    this.order.cartId = temp[0].cartId;
    console.log(temp[0].cartId)
    this.order.userName = name;

    this.order.addressId = this.conformaddress;
    this.order.status = 0;
    console.log(this.cartcount);

    this.product.stock = this.cartcount;

    console.log(this.order);
    console.log(this.product);

    this.buyservice.Addbuy(this.order).subscribe((r) => {
      this.productservice.update(this.product, this.n).subscribe((r) => {
        console.log(r);
        console.log(r.stock);



      })
    })
    console.log(this.n)
    // this.cartservice.Delete( this.n).subscribe((r)=>{
    //   console.log(r)
    // })


  }







  next() {
    this.step = this.step + 1;

    console.log(this.step)
  }
  back() {
    this.step = this.step - 1;
    console.log(this.step)
  }

  get() {
    let username = localStorage.getItem('userName') as string;
    this.serviceadd.GetAddress().subscribe((result) => {
      console.log(result);
      this.address = result;
      this.useraddresses = this.address.filter(r => r.userName == username)
      this.conformaddress = this.useraddresses[0].addressId;
    })

  }

  // selectaddres(addressid:number) {

  //   let username = localStorage.getItem('userName') as string;
  //   this.useraddresses = this.address.filter(r => r.userName == username)

  //     if (this.useraddresses[0].userName == username) {

  //       this.AddressArray  = this.useraddresses.filter(x => x.addressId == addressid);
  //       this.conformaddress = this.AddressArray[0].addressId;
  //       console.log(this.conformaddress);

  //     }
  // }

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

    this.serviceadd.UpdateAddress(this.update, this.address1.addressId).subscribe({
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





  DeleteAddress(id: number) {
    this.serviceadd.DeleteAddress(id).subscribe((result) => {
      console.log(id);
    })
  }


  reloadCurrentPage() {
    window.location.reload();
  }

  DeleteProduct(id) {
    console.log(id)
    this.cartservice.Delete(id).subscribe((r) => {
      console.log(r)
      console.log("Deleted successfully");
      this.tosatr.success("Deleted Successfully", "Product")
      this.Get();
    });

  }


  deleteCartDataFromLs(index: number) 
  { 
    console.log(index); 
    let res: any = this.productarray.splice(index, 1); 
    console.log(res); 
    localStorage.setItem('temporaryids', JSON.stringify(this.productarray)); 
    // this.tosatr.info({ detail: "DELETED", summary: "Product Removed from Cart", duration: 5000 });
     this.Get(); 
    }


    refresh():void{ window.location.reload(); }
}
