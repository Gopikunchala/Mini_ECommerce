import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router,private auth:AuthGuard,private toas:ToastrService) {
  }
  
  canActivate():boolean{
   
    if(this.auth.Admin)
    {
      return true
    }else{
     
      this.toas.error('No access..... !','error');
      this.router.navigate(['home'])
    return false;
    }
  }
  
}
