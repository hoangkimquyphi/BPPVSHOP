import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../class/product';
import { Observable } from 'rxjs';
import { cart } from '../class/Cart';
import { Order } from '../class/order';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CardServiceService {
  private apiUrl = 'http://localhost:4000/api/users/carts/items'; // Thay đổi đường dẫn API tùy theo yêu cầu của bạn

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  addCartItem(product_id: string, quantity: number): Observable<any> {
    const headers = this.getHeaders();
    const body = { product_id, quantity };
    return this.http.post<any>(`http://localhost:4000/api/users/carts/items`, body, { headers });
  }

  getCartItems(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`http://localhost:4000/api/users/carts/items`, { headers });
  }
  
}