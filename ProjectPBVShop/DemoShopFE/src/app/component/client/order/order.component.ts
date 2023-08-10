import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { Order } from 'src/app/class/order';
import { OrderItem } from 'src/app/class/order-item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm !: FormGroup;
  orderItem : any;
  listOrderItems : OrderItem[] = [];

  constructor(public cartService:CartService,private orderService:OrderService,public fb: FormBuilder,private router: Router){
    this.orderForm = this.fb.group({
      id: [''],
      user_id: [''],
      payment: [''],
      status: [''],
      order_items: [''],
    });
  }

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  onSubmit(){
    this.cartService.items.forEach(res =>{
      this.orderItem = res;
      this.listOrderItems.push(this.orderItem);
    })
    const data : Order = {
      id: this.orderForm.get('id')?.value,
      user_id: this.orderForm.get('user_id')?.value,
      payment: this.orderForm.get('payment')?.value,
      status: this.orderForm.get('status')?.value,
      order_items: this.listOrderItems
    }

    this.orderService.createOrder(data).subscribe(data=>{
      this.cartService.clearCart();
      this.router.navigate(['/'])
    })
  
  }

}
