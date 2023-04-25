import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from './Models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public count = new BehaviorSubject<number>(0);
  public share=this.count.asObservable();


  constructor(private http:HttpClient) { }

  Add(cart:Cart)
  {
    console.log("in service")
    return this.http.post<Cart>("https://localhost:7159/api/Carts/",cart);
  }
  Get():Observable<Cart[]>
  {
    return this.http.get<Cart[]>("https://localhost:7159/api/Carts");
  }
  Delete(id:number):Observable<Cart>
  {
    console.log(id)
    return this.http.delete<Cart>("https://localhost:7159/api/Carts/"+id);
  }
  
  updatecount(e:number)

  {
    this.count.next(e);

  }
}
