import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../class/product';
import { Observable } from 'rxjs';
import { cart } from '../class/Cart';
import { Order } from '../class/order';
import { AuthServiceService } from './auth.service.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CardServiceService {
  
  item : any[] =[];
  private apiUrl = 'http://localhost:4000/api/users/carts/items'; // Thay đổi đường dẫn API tùy theo yêu cầu của bạn

  constructor(private http: HttpClient,private authService: AuthServiceService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // addCartItem(product_id: string, quantity: number): Observable<any> {
  //   const headers = this.getHeaders();
  //   const body = { product_id, quantity };
  //   return this.http.post<any>(`http://localhost:4000/api/users/carts/items`, body, { headers });
  // }

  // getCartItems(): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.get<any>(`http://localhost:4000/api/users/carts/items`, { headers });
  // }
 
  // getCart() {
  //   return this.http.get(this.apiUrl);
  // }
  // getCartItems() {
  //   return this.http.get('http://localhost:4000/api/users/carts/items');
  // }
  getCartItems() {
    const token = this.authService.getToken(); // Lấy token từ AuthService

    // Tạo header chứa token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get('http://localhost:4000/api/users/carts/items', { headers });
  }


  addToCart(product_id: number, quantity: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const item = {
      product_id: product_id,
      quantity: quantity
    };
    return this.http.post('http://localhost:4000/api/users/carts/items', item,{ headers });
  }

  removeFromCart(itemId: string) {
    const url = `http://localhost:4000/api/users/carts/items/${itemId}`;
    return this.http.delete(url);
  }

  updateCartItemQuantity(itemId: string, quantity: number) {
    const url = `'http://localhost:4000/api/users/carts/items'/${itemId}`;
    return this.http.put(url, { quantity });
  }
}
  
