import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { AuthGuard } from '../guards/auth.guard';
import { login } from '../Models/adminlogin';

import { SharingService } from '../services/sharing.service';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  message: string = '';

  constructor(private service: SharingService, private router:Router,private auth:AuthenticationService,
    private authgurd:AuthGuard) { }
  login: login = new login();

  ngOnInit(): void {
    console.log('login init');
    this.onLogin();
  }

  onLogin() {
    console.log('login done....' + this.login.uid);
    if (this.login.uid == "gopi" && this.login.pwd == "gopi") {
      this.message = "Login succssful...";
      this.service.isAdminIn = true;
      this.auth.storeToken("gopi");
      this.auth.storeUserName("gopi");
      let name="gopi"
      localStorage.setItem("role",name);

      this.authgurd.Admin=true;
     // this.topbar.admin=true;
      this.router.navigate(['shipping']);
    } else {
      //this.message = "Login NOT succssful...";
      this.service.isAdminIn = false;
    }
  }
  



}
