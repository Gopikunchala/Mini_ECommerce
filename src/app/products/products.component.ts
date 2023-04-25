import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { AuthGuard } from '../guards/auth.guard';
import { Cart } from '../Models/cart';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';
import { SharingService } from '../services/sharing.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
  
})
export class ProductsComponent implements OnInit {

  constructor(private service: ProductserviceService, private authGuard: AuthGuard, private toastr: ToastrService, private auth: AuthenticationService,
    private cartservice: CartService, private router: Router, private signupservice: AuthenticationService, private service2: SharingService,private _formBuilder: FormBuilder) 
    { this.service.init()}
  pages: number = 1;
  

  product: Product[];
  cart: Cart[];
  c: Cart = new Cart();
  p: Product = new Product();
  ID: number;
  d: Cart[];
  count: number = 0;
  dropdown = Array();
  n: any;
  single: Product[];

  starrating = Array();
  halfstar = Array();
  
  searchKey:string ="";
  text: string;
  productarray:number[];
lowPrice = Array();
 highprice=Array();
 moreprice=Array(); 


  title = 'newMat';
isLinear = true;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
length:number=0;
login:boolean=true;



  ngOnInit(): void {

    this.get();
    this.getcart();
    this.getcategory();

    this.login=this.auth.isLoggedIn();
    this.productarray=this.service.GetArray();
    this.length=Object.keys(this.productarray).length;

 
    this.service.search.subscribe((val:any)=>{
      this.searchKey = val;
    }) 
    //this.addarray();
    
  }

  startService(){
    this.service.start()
   
  }
 
  stopService(){
    this.service.stop()
  }

  get() {
    this.service.getProducts().subscribe((result) => {
      console.log(result);

      this.product = result

    })

  }
  getcart() {
    this.cartservice.Get().subscribe((result) => {
      this.cart = result
    });
  }


  AddToWatchList(p: Product) {
  
    console.log(this.cart);
    let result = this.Existance(p.productId);
    console.log(result);
    if (!result) {


      this.c.productId = p.productId;
       this.c.userName = localStorage.getItem("userName") as string;

      this.cartservice.Add(this.c).subscribe((result) => {
        console.log("added");
        this.toastr.success("Add Successfully in Cart", "Product")
        this.c = new Cart();
        this.count = 0;
        this.router.navigate(['/addorder']);


      });
    }
    else {
      console.log("exists")
      this.toastr.error("Already exists in Cart", "Product")
    }
  

  }

  Existance(id: number): boolean {
    let username = localStorage.getItem('userName');
    let s = this.cart.filter(x => x.userName == username);
    let A = s.some((res) => { return res.productId == id })
    console.log(A);
    return A;
  }




 
  getcategory() {
    this.service.getProducts().subscribe((res) => {
      this.product = res;
      this.n = this.product;

      console.log(res)
      for (var i = 0; i < res.length; i++) {
        console.log("Res at ts")
        console.log(res.length)
        this.dropdown.push(res[i].category);
        let desc = this.dropdown.filter(x => x == res[i].category)
        if (desc.length > 1) 
        {

          this.dropdown.pop();
         


        }
        console.log(this.n)
        let a = this.n[i].star * 10;
        console.log(a);
        let b = a % 10;
        let cc = (a - b) / 10;
        console.log(a)

        this.starrating.push(cc);
        this.halfstar.push(b);

        
      }
      console.log(this.starrating);
      console.log(this.halfstar);



    })
    console.log(this.starrating);
    console.log(this.halfstar);

  }
  
  onselect(dropdown) {
    console.log(dropdown.target.value);
    if (dropdown.target.value != "Category") {
      this.n = this.product.filter(x => x.category == dropdown.target.value);
      console.log(this.n);

      this.router.navigate['product']
    }
    else {
      this.n = this.product;
    }
  }




  
Lowtohighprice(e:any)
{
  this.lowPrice=this.product.sort((a,b)=>a.price-b.price);
  
  
  console.log(this.highprice)
  if (e.target.value =="Low To High") {
  
    this.n=this.lowPrice;
  }
  else if(e.target.value=="Sort by Price")
  {
      this.n=this.product;
  }
  else {
    for(var i=this.lowPrice.length-1;i>=0;i--){
      this.highprice.push(this.lowPrice[i])
       
     }
     this.n=this.highprice;
  }
  
}



lessPrice()
{
  let less=this.product.sort((a,b)=>a.price-b.price);

    this.n=less;
  
  console.log(this.n)
 
}

MorePrice(){
  let less=this.product.sort((a,b)=>a.price-b.price);
  console.log(less)
  for(var i=less.length-1;i>=0;i--){
    this.moreprice.push(less[i])
     
   }
   this.n=this.moreprice;
  
   console.log(this.n)
}





AddtoCart(id:number, p:Product)
{
  console.log(this.cart);
    let result = this.Existance(p.productId);
    console.log(result);
    if (!result) {
  this.service.cartwithoutlogin(id);
  this.refresh();
  //this.toastr.success("Add Successfully", "Product")
  //this.router.navigate(['/addorder']);
  
    }
    else {
      console.log("exists")
      this.toastr.error("Already exists in Cart", "Product")
    }
   
}

refresh():void{ window.location.reload(); }
// addarray()
// {
//   let v=Object.values(this.productarray);
//   if(this.auth.isLoggedIn() && (v.length>0))
//   {
//     let user=localStorage.getItem('userName') as string;
//     for(var i=0;i<v.length;i++)
//     {
//       this.c.userName=user;
//       this.c.productId=v[i];

//       this.cartservice.Add(this.c).subscribe();
//     }
//     this.productarray=Array()
//     localStorage.setItem('temporaryids',JSON.stringify(this.productarray));

//   }
 
// }


reloadCurrentPage() {
  window.location.reload();
 }


}





