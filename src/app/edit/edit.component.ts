import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  b:Product[];
  m:Product=new Product();
  count:number=0;


  constructor(private service:ProductserviceService,private router:Router,private tosatr:ToastrService) { }

  ngOnInit(): void {
    this.Get();

  }
  Get(){
    this.service.getProducts().subscribe((r)=>this.b=r);
  }
  
  onsubmit(){
      for(var i=0;i<this.b.length;i++)
      {
        console.log(this.m.productName);
        if(this.b[i].productName!=this.m.productName)
        {
          this.count++;
          

        }
      }
      console.log(this.count);
      if(this.count==this.b.length)
      {
        this.service.Add(this.m).subscribe((r)=>{
          this.m=new Product();
          this.tosatr.success("Added Successfully","Product")
          this.Get();
        })
      }
      else{
        console.log("already exist");
        this.tosatr.success("Already Exists","Product")
      }
    
  }
  
}



