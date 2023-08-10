import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../class/order';

const ORDER_API = "http://localhost:4000/order/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }


  getListOrder():Observable<any>{
    return this.http.get('http://localhost:4000/order',httpOptions);
  }

  createOrder(order: Order):Observable<any>{
    return this.http.post('http://localhost:4000/order',order,httpOptions);
  }



}
