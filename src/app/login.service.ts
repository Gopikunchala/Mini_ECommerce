import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { Login } from './Models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:4200/home';
  _url3: string = "https://localhost:3005/api/logins";

  login: boolean = true;
  public loggedin = new ReplaySubject<number>(0);
  loggedin$ = this.loggedin.asObservable();
  
  isLoggedIn: boolean = true;
  redirecturl: string = "";
  val: string = 'Initial Shared Value';


  adminlogin: boolean = true;
  public adminedin = new ReplaySubject<number>(0);
  adminin$ = this.adminedin.asObservable();


  isAdminIn: boolean = true;
  redirecturl1: string = "";
  vale: string = 'Initial Shared Value';


  constructor(private http:HttpClient) { }

  doLogin() {
    this.loggedin.next(1);
    console.log('*** logged in ***');
  }

  doLogout() {
    this.loggedin.next(0);
    console.log('*** logged out ***');
  }



  Adminin() {
    this.adminedin.next(1);
    console.log('*** logged in ***');
  }

  Adminout() {
    this.adminedin.next(0);
    console.log('*** logged out ***');
  }


  addlogin(log:Login): Observable<Login>{
    return this.http.post<Login>(this.url, log);
  }

 
  

  

  getRegs():Observable<Login[]>{
    var res:any;
    return this.http.get<Login[]>("https://localhost:3005/api/logins")
    .pipe(map((res:any)=>{
      console.log("ts............")
      return res;
    }))
    

  }
  postRegs(data:Login){
    return this.http.post<any>("https://localhost:3005/api/logins/", data)
    .pipe(map((res:any)=>{
      console.log("postservice............")
      return res;
    }))
  }




}
