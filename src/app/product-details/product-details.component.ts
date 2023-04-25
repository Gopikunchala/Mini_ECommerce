import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { Cart } from '../Models/cart';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  single=Array();
  product: Product[];
  CategoryIteams = Array();

  starrating=Array();
  halfstar =Array();

  loading : number =0;

  cart: Cart[];
  c: Cart = new Cart();

  productarray:number[];
  length:number=0;
 login:boolean=true;

 Id:any;
  constructor(private router: Router,private Productservice: ProductserviceService,private _activedRoute:ActivatedRoute,
    private cartservice: CartService, private toastr: ToastrService,private auth: AuthenticationService) { }
  
    
  ngOnInit(): void {

    this.login=this.auth.isLoggedIn();
    this.productarray=this.Productservice.GetArray();
    this.length=Object.keys(this.productarray).length;
    
    this.getcart();
   this.GetSelcetedItam();
  this.ShowToMainProduct();
 
 
  }



GetSelcetedItam(){
  this._activedRoute.paramMap.subscribe((paramMap)=>{
    console.log(paramMap.get('id'));
    this.Id = paramMap.get('id') as string;
  })
    this. Productservice.getProducts().subscribe((result) =>{
      console.log(result);
      this.product = result;


      
      

      this.single = this.product.filter(x => x.productId == this.Id);
      console.log(this.single);


      let a = this.single[0].star * 10;
      console.log(a);
      let b = a % 10;
      let cc = (a - b) / 10;
      console.log(a)

      this.starrating.push(cc);
      this.halfstar.push(b);
    
    // console.log(this.starrating);
    // console.log(this.halfstar);

      
    this.CategoryIteam();
      
    });

}





  CategoryIteam() {

    for(let i=0;i<this.product.length;i++){
      if(this.single[0].category == this.product[i].category){

        this.CategoryIteams = this.product.filter(x => x.category == this.single[0].category);
       
      }
      

      let a = this.product[0].star * 10;
      // console.log(a);
      let b = a % 10;
      let cc = (a - b) / 10;
      console.log(a)
  
      this.starrating.push(cc);
      this.halfstar.push(b);
    
    // console.log(this.starrating);
    // console.log(this.halfstar);

    }
     

    console.log(this.CategoryIteams);
  }



  ShowToMainProduct(){

      this.Id == this.CategoryIteams[0].productId;

      this. Productservice.getProducts().subscribe((result) =>{
        console.log(result);
        this.product = result;
  
        
  
        this.single = this.product.filter(x => x.productId == this.Id);
        // console.log(this.single);
  
      });



   
  }

  getcart() {
    this.cartservice.Get().subscribe((result) => {
     
      this.cart = result
      console.log(this.cart)
     
    });
  }

  AddToCart(p: Product) {
   
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


  AddtoCart(id:number, p:Product)
{
  console.log(this.cart);
    let result = this.Existance(p.productId);
    console.log(result);
    if (!result) {
  this.Productservice.cartwithoutlogin(id);
  this.toastr.success("Add Successfully", "Product")
  this.router.navigate(['/addorder']);
    }
    else {
      console.log("exists")
      this.toastr.error("Already exists in Cart", "Product")
    }
}


}
