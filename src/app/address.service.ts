import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from './Models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }
  _url:string="https://localhost:7102/api/Addresses";

GetAddress():Observable<Address[]>{
  return this.http.get<Address[]>(this._url);
}
AddAddress(address:Address){
  return this.http.post<Address>("https://localhost:7102/api/Addresses/",address)
}
DeleteAddress(id:number):Observable<Address>{
return this.http.delete<Address>("https://localhost:7102/api/Addresses/"+id)
}
UpdateAddress(address:Address,id:number):Observable<Address>{
  return this.http.put<Address>("https://localhost:7102/api/Addresses/"+id,address)
}
}
