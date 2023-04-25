import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../Models/products';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

 
  b:Product[];
  formValue!: FormGroup;
  m:Product=new Product();
  id:number;


  constructor(private service:ProductserviceService,private toast:ToastrService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      productId :[''],
      productName:[''],
      totalprice:[''],
      price: [''],
      category:[''],
      stock:[''],
      image:[''],
      star:[''],
      description:[''],
      discount:[''],
     
    })
    this.Get();
  }

  Get(){
    this.service.getProducts().subscribe((r)=>this.b=r);
  }

  editData(data: any) {
    this.m.productId = data.productId;
    this.formValue.controls["productId"].setValue(data.productId);
    this.formValue.controls["productName"].setValue(data.productName);
    this.formValue.controls["totalprice"].setValue(data.totalprice);
    this.formValue.controls["price"].setValue(data.price);
    this.formValue.controls["category"].setValue(data.category);
    this.formValue.controls["stock"].setValue(data.stock);
    this.formValue.controls["image"].setValue(data.image);
    this.formValue.controls["star"].setValue(data.star);
    this.formValue.controls["discount"].setValue(data.discount);
    this.formValue.controls["description"].setValue(data.description);
   
  }

  updateData() {
    
    this.m.productId = this.formValue.value.productId;
    this.m.productName= this.formValue.value.productName;
    this.m.totalprice= this.formValue.value.totalprice;
    this.m.price= this.formValue.value.price;
    this.m.category = this.formValue.value.category;
    this.m.stock= this.formValue.value.stock;
    this.m.image= this.formValue.value.image;
    this.m.star= this.formValue.value.star;
    this.m.discount= this.formValue.value.discount;
    this.m.description = this.formValue.value.description;
    
    this.service.updateData(this.m, this.m.productId ).subscribe({
      complete: () => {
        console.log('Updated...');
        this.toast.success("Updated Successfully","Product")
        this.formValue.reset();
        this.Get();
      },
      error: () => {
        alert('Error');
      }
    }
    )
  }


  DeleteData(id) {
    this.service.DeleteProducts(id).subscribe((r) => {
      console.log("Deleted successfully");
      this.toast.success("Deleted Successfully","Product")

      this.Get();
    });

}



}



  

  



