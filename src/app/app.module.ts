import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';



import { MatTableModule } from '@angular/material/table';
import { MatCard } from "@angular/material/card";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatCalendar } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { GoogleChartsModule } from 'angular-google-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { TopbarComponent } from './topbar/topbar.component';
import { JwtModule } from '@auth0/angular-jwt';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { AddorderComponent } from './addorder/addorder.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgetComponent } from './forget/forget.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { OpenpageComponent } from './openpage/openpage.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditComponent } from './edit/edit.component';
import { BuyComponent } from './buy/buy.component';
import { ShippingComponent } from './shipping/shipping.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './shared/filter.pipe';
import { ProductserviceService } from './productservice.service';
import { AddresComponent } from './addres/addres.component';





//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,    
     HomeComponent, 
     ProductsComponent, 
     OrdersComponent, AddorderComponent, LoginComponent, RegisterComponent, UpdatepasswordComponent, LogoutComponent, ForgetComponent, AdminloginComponent, OpenpageComponent, ProductDetailsComponent, EditComponent, BuyComponent, ShippingComponent, FilterPipe, AddresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatMenuModule,
    NgxPaginationModule,
    GoogleChartsModule,
    Ng2SearchPipeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5259"],
        disallowedRoutes: []
      }
    }),
    ToastrModule.forRoot(),
    NgbModule


  ],
  providers: [ ProductserviceService
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// npm install angular-google-charts