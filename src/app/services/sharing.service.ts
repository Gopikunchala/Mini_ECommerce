import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  login: boolean = true;
  public loggedin = new ReplaySubject<number>(0);
  loggedin$ = this.loggedin.asObservable();

  public adminedin = new ReplaySubject<number>(0);
  adminin$ = this.adminedin.asObservable();
  
  isLoggedIn: boolean = true;
  redirecturl: string = "";
  val: string = 'Initial Shared Value';

  isAdminIn: boolean = true;
  redirecturl1: string = "";
  vale: string = 'Initial Shared Value';



  constructor() { this.doLogin();this.Adminin(); }
  
  doLogin() 
  {
    this.loggedin.next(1);
    console.log('*** logged in ***');
  }

  doLogout() 
  {
    this.loggedin.next(0);
    console.log('*** logged out ***');
  }



  Adminin() {
    this.adminedin.next(1);
    console.log('*** adimin logged in ***');
  }

  Adminout() {
    this.adminedin.next(0);
    console.log('*** logged out ***');
  }

}
