import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../address.service';

import { BuyService } from '../buy.service';
import { CartService } from '../cart.service';
import { Address } from '../Models/address';
import { Buy } from '../Models/buy';
import { Cart } from '../Models/cart';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  order: Buy[];
  buyorder: Buy = new Buy();
  o: Buy[];
  username: string;
  b: Cart[];
  pr: Product[];
  m = Array();
  product = Array();

  step = Array();
  sat:Buy[];
  d:Product[];
  trackstatus:number;

  searchKey:string ="";
  Address:Address[];
 AddressDone = Array();

  constructor(private service: BuyService, private cartservice: CartService,
    private productservice: ProductserviceService,private serviceaddress: AddressService, private toastr: ToastrService
) { }

  ngOnInit(): void {
    this.Getproduct();
    this.GetData();
    this.GetAddress();
    console.log(this.product);


    this.productservice.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }
  
  GetData() {
    console.log(this.o);
    this.service.Getbuy().subscribe((r) => {

      this.o = r;
      console.log(r);
      this.Getproduct();
      this. GetAddress();
    })
  }
  // Getcart() {
  //   this.cartservice.getCart().subscribe((res) => {
  //     this.b = res;
  //     //console.log(res);
      

  //   })
  // }
  Getproduct() {
    this.productservice.getProducts().subscribe((r) => {
      this.pr = r;
      console.log(this.pr);
      this.Filter();
    })
  }

  GetAddress() {
    this.serviceaddress.GetAddress().subscribe((r) => {
      this.Address = r;
      console.log(this.Address);
      //this.Filter();
    })
  }

  filteraddress(id:number)
  {
    let a=this.o.filter(x=>x.buyId==id)
    let b=this.Address.filter(x=>x.addressId==a[0].addressId);
    console.log(b);
    this.AddressDone=b
  }
  
  Filter() 
  {
    let name = localStorage.getItem('userName') as string;
    console.log(this.o.length)
    this.username = name;
    this.m = this.o.filter(x => x.userName == name)
    console.log(this.m);
    
    //console.log(this.pr);
    for (var i = 0; i < this.m.length; i++) 
    {
      console.log(this.m[i].status)
      
      let g = this.pr.filter(x => x.productId == this.m[i].productId);
      
      //console.log(g)
      
      this.product.push(g[0]);
     
      
      
    }
    console.log(this.product);
   
    console.log(this.m.length);

   
    



  }
  FilterOrder(buyid:number)
  {
    
    this.sat=this.o.filter(x=>x.buyId==buyid);
    console.log(this.sat[0]);
    this.trackstatus=this.sat[0].status;
    this.filteraddress(buyid)
  }


  CancelOrder(buyid:number){
    let p=this.o.filter(x=>x.buyId==buyid);
    p[0].status=4;
   
    this.service.Updatebuy(p[0].buyId,p[0]).subscribe((result)=>
    {
     
      this.toastr.success("Order Rejected Successfully","Rejected")
     console.log(result);
     console.log(p[0]);
    
     
    })


  }


  ReturnOrder(buyid:number){
    let p=this.o.filter(x=>x.buyId==buyid);
    p[0].status=5;
   
    this.service.Updatebuy(p[0].buyId,p[0]).subscribe((result)=>
    {
     
   
     console.log(result);
     console.log(p[0]);
    
     
    })


  }

}
