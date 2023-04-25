import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BuyService } from '../buy.service';
import { CartService } from '../cart.service';
import { Buy } from '../Models/buy';
import { Cart } from '../Models/cart';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  order:Buy[];
  o: Buy[];

  b: Cart[];
  pr:Product[];
 
  m = Array();
status:number=1;
status1:number;
status2:number;
status3:number;

  constructor(private service:BuyService, private cartservice:CartService,
    private productservice:ProductserviceService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    console.log(this.o);
    this.service.Getbuy().subscribe((r) => {

      this.o = r;
      console.log(r);
      this.Getcart();

    })
  }
  
  Getcart() 
  {
    this.cartservice.Get().subscribe((res) => {
      this.b = res;
      console.log(res);
      this.Getproduct();

    })
  }

  Getproduct() {
    this.productservice.getProducts().subscribe((result) => {
      this.pr = result;
      this.Filter();
    })

  }

  Filter() 
  {
    console.log(this.o.length)
    
   
    for (var i = 0; i < this.o.length; i++) 
    {

      let p = this.pr.filter(x => x.productId == this.o[i].productId);
      console.log(p)
      
      
      
      
      if (p.length>0) 
      {
        
        let product = this.pr.filter(res => res.productId == p[0].productId);
        this.m.push(product[0]);
        

      }
    }
    console.log(this.m)


  }
  Approve(id:number)
  {
     let p=this.o.filter(x=>x.buyId==id);
     p[0].status=1;
     this.status=p[0].status;
     this.service.Updatebuy(p[0].buyId,p[0]).subscribe((result)=>
     {
      
      this.toastr.success("Order Approved Successfully","Approved")
      console.log(result);
      console.log(p[0]);
      console.log(this.status);
      
     })

  }
  shipping(id:number)
  {
    let p=this.o.filter(x=>x.buyId==id);
    p[0].status=2;
    this.status=p[0].status;
    this.service.Updatebuy(p[0].buyId,p[0]).subscribe((result)=>{
      
     this.toastr.success("Order shipping Successfully","Approved")
     console.log(result);
     console.log(p[0]);
     console.log(this.status);
     
    })

 }

 delivered(id:number)
 {
  let p=this.o.filter(x=>x.buyId==id);
  p[0].status=3;
  this.status=p[0].status;
  this.service.Updatebuy(p[0].buyId,p[0]).subscribe((result)=>{
   this.toastr.success("Order deliverd Successfully","Approved")
   console.log(result);
   console.log(p[0]);
   console.log(this.status);
   
  })

}


  Cancel(id:number)
  {
    let p=this.o.filter(x=>x.buyId==id);
    p[0].status=4;
    
    this.service.Updatebuy(p[0].buyId,p[0]).subscribe((r)=>{
      this.toastr.error("Order cancled..!","Order")
      console.log(r);
    })
  }
}



