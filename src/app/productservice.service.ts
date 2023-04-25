import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from './Models/products';


declare var webkitSpeechRecognition:any

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  numberarray=Array();
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;
 
  
 
  

init() {
 
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
 
    this.recognition.addEventListener('result', (e: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
      console.log(transcript);
      console.log(this.tempWords);
    });
  }
 
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }
 
  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }




  public search = new BehaviorSubject<string>("");
  
  url1:string="https://localhost:7085/api/Products";
  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url1);
  }
  
  Add(product:Product): Observable<Product>{
    return this.http.post<Product>("https://localhost:7085/api/Products/",product);
  }

  updateData(data:Product, id:number){
    console.log('api updating');
    return this.http.put<Product>("https://localhost:7085/api/Products/"+id,data);

    
  }

  DeleteProducts(id:number):Observable<Product[]>{
    console.log("nbnmn")
    return this.http.delete<Product[]>("https://localhost:7085/api/Products/"+id);
  }
  update(data:Product, id:number){
    console.log('api updating');
    data.category='';
    data.description='';
    data.image='';
    data.price=0;
    data.productName='';
    data.productId=id;
    
        return this.http.patch<Product>("https://localhost:7085/api/Products/"+id,data);
  }
  cartwithoutlogin(id:number)
  {
    this.numberarray=JSON.parse(localStorage.getItem('temporaryids') as string );
    
    if(this.numberarray==undefined || this.numberarray==null)
    {

        this.numberarray=Array();
        this.numberarray.push(id);
        localStorage.setItem('temporaryids',JSON.stringify(this.numberarray));
    }
    else
    {
      this.numberarray.push(id);
      localStorage.setItem('temporaryids',JSON.stringify(this.numberarray));
    }
    console.log(JSON.parse(localStorage.getItem('temporaryids') as string ))

  }
  GetArray()
  {

    this.numberarray=JSON.parse(localStorage.getItem('temporaryids') as string );
    console.log({},this.numberarray)
    return Object.assign({},this.numberarray)

  }



}
