import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  

  constructor(private service:LoginService, private router:Router,private toastr:ToastrService,private auth:AuthenticationService) { }

  status:boolean;
  statu:boolean;
  ngOnInit(): void {
    this.status = this.service.isLoggedIn
    this.loggedin$ = this.service.loggedin$;

    this.statu = this.service.isAdminIn
    this. adminin$= this.service.adminin$;
  }
  adminin$: any;
  loggedin$: any;
  
  onLogout(){
    this.toastr.success(" successfully Logout...!", "Done");
    localStorage.clear();
     this.router.navigate(['/']);
    
    this.auth.signOut();
  }
  onCancel(){    
    this.router.navigate(['/']);
  }


}
