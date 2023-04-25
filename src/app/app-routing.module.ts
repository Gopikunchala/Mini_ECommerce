import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddorderComponent } from './addorder/addorder.component';
import { AddresComponent } from './addres/addres.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { BuyComponent } from './buy/buy.component';
import { EditComponent } from './edit/edit.component';
import { ForgetComponent } from './forget/forget.component';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { OpenpageComponent } from './openpage/openpage.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ShippingComponent } from './shipping/shipping.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';

const routes: Routes = [
 {path:"home",component:HomeComponent},
 {path:"",component:ProductsComponent},
 {path:"order",component:OrdersComponent},
 {path:"addorder",component:AddorderComponent},
 {path:"first",component:OpenpageComponent},
 {path:"detail/:id",component:ProductDetailsComponent},
 {path:"edit",component:EditComponent},
 {path:"buy",component:BuyComponent},
 {path:"address",component:AddresComponent},
 {path:"shipping",component:ShippingComponent},


 {path:"login",component:LoginComponent},
 {path:"register",component:RegisterComponent},
 {path:"update",component:UpdatepasswordComponent},

 {path:"forget",component:ForgetComponent},
 {path:"logout",component:LogoutComponent},
 {path:"adiminlog",component:AdminloginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
