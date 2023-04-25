import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Login } from './Models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAdminIn: boolean = false;
  val: string = 'Initial Shared Value';

  url:string="https://localhost:3005/api/logins/";

  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService) { }

  

  Updatepwd(user:any)
  {
    console.log("inservice");
    return this.http.put<any>("https://localhost:3005/api/logins/",user)
  }

  Get():Observable<Login[]>{
    return this.http.get<Login[]>("https://localhost:3005/api/logins")

  }

 
  signUp(userObj:any){
    console.log(userObj)
    return this.http.post<any>( "https://localhost:3005/api/logins/register/",userObj)
  }

  Updatedata(userObj:Login,id:number):Observable<Login>{
    console.log(userObj)
    console.log("inservice of login")
    return this.http.put<any>("https://localhost:3005/api/logins/"+id,userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.url}authenticate`,loginObj)

  }

  signOut(){
    localStorage.clear();
    localStorage.removeItem('token')
    //this.router.navigate(['login'])

  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  storeUserName(name:string){
    localStorage.setItem('userName',name);
  }

  getToken(){
      return localStorage.getItem('token')
  }
  
  getRole(){
    return !!localStorage.getItem('role')
  }

  // getusername(){
  //   return !!localStorage.getItem('userName')
  // }

  isLoggedIn():boolean{
    
      return !!localStorage.getItem('token')
    
  }

 

  forgotpassword(s:string){
    return this.http.get<any>("https://localhost:3005/api/logins/forgot?forgot="+s);

  }
  




}
