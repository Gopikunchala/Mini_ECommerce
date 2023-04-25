import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './Models/cart';
import { json } from './Models/json';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  
  url:string=" http://localhost:3000/cart";
  url1:string="https://localhost:7159/api/Carts/";

  constructor(private http:HttpClient) { }

  Get():Observable<json[]>
  {
      return this.http.get<json[]>(this.url);
    }
    Add(cart:Cart):Observable<Cart>{
      return this.http.post<Cart>("http://localhost:3000/cart/",cart)
    }
    Update(data:Cart, id:number):Observable<Cart>{
      return this.http.put<Cart>("http://localhost:3000/cart/"+id,data)
    }
    Delete(id:number){
      return this.http.delete("http://localhost:3000/cart/"+id);
    } 
  
}
