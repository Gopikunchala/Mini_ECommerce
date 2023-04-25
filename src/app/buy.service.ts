import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Buy } from './Models/buy';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http:HttpClient) { }
url:string="https://localhost:7058/api/Buys";


  Addbuy(buy:Buy){
    return this.http.post<Buy>("https://localhost:7058/api/Buys/",buy);
  }

  Getbuy():Observable<Buy[]>{
    return this.http.get<Buy[]>(this.url)

  }
  Deletebuy(id:number):Observable<Buy>{
    return this.http.delete<Buy>("https://localhost:7058/api/Buys/"+id);
  }
  Updatebuy(id:number,buy:Buy):Observable<Buy>
  {
    console.log(buy);
    return this.http.put<Buy>("https://localhost:7058/api/Buys/"+id,buy);
  }

}
