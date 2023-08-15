import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getCategory(categoryId: any) {
    throw new Error('Method not implemented.');
  }

  items : any[] =[];

  totalPrice =0;

  total = 0;
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  saveCart():void{
    localStorage.setItem('cart_items',JSON.stringify(this.items));
  }
  // addToCart(product_id: string, quantity: number): Observable<any> {
  //   const headers = this.getHeaders();
  //   const body = { product_id, quantity };
  //   return this.http.post<any>(`http://localhost:4000/api/users/carts/items`, body, { headers });
  // }
  // getCartItems(): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.get<any>(`http://localhost:4000/api/users/carts/items`, { headers });
  // }

  addToCart(item: any,quantity: number){
    this.loadCart();
    if(!this.productInCart(item)){
      item.quantity = quantity;
      item.subTotal = item.quantity * item.price;
      this.items.push(item)
    }else{
      this.items.forEach(res => {
        if(res.id == item.id){
          res.quantity += quantity;
          res.subTotal = res.quantity * res.price;
        }
      });
    }
    item.quantity = quantity;
    this.saveCart();
    this.getTotalPrice();

  }
  updateCart(item:any,quantity: number){
    this.items.forEach(res =>{
      if(res.id == item.id){
        res.quantity = quantity;
        res.subTotal = res.quantity * res.price;
      }
    })
    this.saveCart();
    this.getTotalPrice();
  }


  productInCart(item: any):boolean{
    return this.items.  findIndex((x:any) => x.id == item.id) > -1;
  }
  loadCart():void{
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    this.getTotalPrice();


  }

  getItems() {
    return this.items;
    this.getTotalPrice();
  }


  getTotalPrice(){
    this.totalPrice = 0;
    this.total = 0;
    this.items.forEach(res =>{
      this.totalPrice += res.subTotal;
      this.total = this.totalPrice;
    })
    return this.totalPrice;
  }

  remove(item: any){
    const index = this.items.findIndex((o:any) => o.id == item.id);
    if(index > -1){
      this.items.splice(index,1);
      this.saveCart();
    }
    this.getTotalPrice();
  }

  clearCart(){
    this.items = [];
    this.getTotalPrice();
    localStorage.removeItem('cart_items');
  }
}
