import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { SharingService } from '../services//sharing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  Admin:boolean=false;

  constructor(private auth:AuthenticationService, 
    private authService: SharingService,private router:Router,private toast:NgToastService,private toas:ToastrService){}
  canActivate():boolean{
   
    if(this.auth.isLoggedIn()||this.Admin)
    {
      return true
    }else{
      this.toast.error({detail:"ERROR",summary:"Please Login First!"});
      this.toas.error('Please  logedin..... !','Login');
      this.router.navigate(['home'])
    return false;
    }
  }

 



 

  
}
