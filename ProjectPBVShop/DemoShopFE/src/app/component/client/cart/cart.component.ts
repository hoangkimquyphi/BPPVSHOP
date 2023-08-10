import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/_service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService:CartService){}

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  addToCart(item: any){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
  }

  removeFromCart(item:any){
    this.cartService.remove(item);
  }
}
