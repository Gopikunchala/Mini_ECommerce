import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { AuthJwtGuard } from '../guards/auth-jwt.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Cart } from '../Models/cart';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';

import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  
  totalItem = 0
  cartCount$:number;
  prodCount: number = 0;
  FavCount$:any;
  
  b: Cart[];
  carts: Cart = new Cart();
  p: Product[];
  m = Array();
 
  i = Array();
  o: boolean = false;
  userName:string;
  tempWords!: string;
  username:string;
  isStoppedSpeechRecog = false;
  public text = '';
  
  public searchTerm !: string;
  productarray=Array();
 voice: number = 0;
 item:number;
 Withoutlog = Array();
  
  constructor(private jwtHelper: JwtHelperService,
    private router: Router,public auth:AuthenticationService,
    private service: SharingService,
    private productservice:ProductserviceService,
    private authgurd:AuthGuard, private cartservice:CartService) {}

  ngOnInit(): void 
  {
    this.WithOutLogin();
    this.cartservice.share.subscribe((r)=>{
      this.item=r;
    })
        this.productarray=this.productservice.GetArray();
    console.log(this.productarray)
    
    this.m.length;

    this.loggedin$ = this.service.loggedin$;

    this.adminin$ = this.service.adminin$;
   

    if (localStorage.getItem("cart_count") !== null){
      this.prodCount = +localStorage["cart_count"];

      
      
    }
    this.searchTerm = this.productservice.tempWords;

   this.Filter();
   this.GetProducts();
   this.Name();
  }
  
  adminin$: any;
  loggedin$: any;

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['/home']);
  }
  GetProducts() {
    
    this.productservice.getProducts().subscribe((result) => {
      this.p = result;
      //console.log(this.p.length)
     
    });
  }


  Filter() {
    this.cartservice.Get().subscribe((r) => {
      this.b = r;
      console.log(this.b)
     
      for (var i = 0; i < this.b.length; i++) {
        let name = localStorage.getItem('userName')
        
        if ( this.b[i].userName == name) {
          this.m.push(this.b[i].userName);
          console.log(this.m);
        }
       
      }
      console.log(this.m.length);
    
    })
   
    console.log(this.m.length)
  }
  
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.productservice.search.next(this.searchTerm);
    console.log(this.m.length);
    console.log(this.b)
    console.log(this.userName)
  }
  
  startService(){
    this.productservice.start()
    this.voice =1;
   
  }
 
  stopService(){
    this.productservice.stop()
  }

  Name() {
    let name = localStorage.getItem('userName') as string;
    console.log(name)
    this.username = name;

  }
 
  WithOutLogin(){
    this.Withoutlog=JSON.parse(localStorage.getItem('temporaryids') as string)
  }
 
}
