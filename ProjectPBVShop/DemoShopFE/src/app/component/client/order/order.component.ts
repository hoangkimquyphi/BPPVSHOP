import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { CartService } from 'src/app/_service/cart.service';
import { OrderService } from 'src/app/_service/order.service';
import { Order } from 'src/app/class/order';
import { OrderItem } from 'src/app/class/order-item';
import { 
  User } from 'src/app/class/user';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm !: FormGroup;
  users: undefined | User;
  orderItem : any;
  listOrderItems : OrderItem[] = [];
  customerName: any;
  customerEmail: any;
  shippingAddress: any;
  customerPhone: any;

  constructor(public cartService:CartService,private orderService:OrderService,public fb: FormBuilder,private router: Router,private userService: AuthServiceService){
    this.orderForm = this.fb.group({
      cart_id: [''],
      total_price: [''],
      customer_name: [''],
      customer_email: [''],
      shipping_address: [''],
      customer_phone: [''],
    });
  }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.getListUser();
  }
  getListUser(): void {
    this.userService.getListUser().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  onSubmit(){
    this.cartService.items.forEach(res =>{
      this.orderItem = res;
      this.listOrderItems.push(this.orderItem);
    })
    const data : Order = {
      id: this.orderForm.get('id')?.value,
      payment: this.orderForm.get('payment')?.value,
      status: this.orderForm.get('status')?.value,
      // order_items: this.listOrderItems
    }

    this.orderService.createOrder(data).subscribe(data=>{
      this.cartService.clearCart();
      this.router.navigate(['/'])
    })
  
  }
  submitOrder() {
    const orderData = {
      orderItems: {
        customer_name: this.customerName,
        customer_email: this.customerEmail,
        shipping_address: this.shippingAddress,
        customer_phone: this.customerPhone
      },
      order: {
        payment: 'cash',
        status: 'pending'
      }
    };

    this.orderService.createOrder(orderData).subscribe(
      response => {
        // Xử lý phản hồi từ API sau khi đơn hàng được tạo thành công
        console.log(response);
      },
      error => {
        // Xử lý lỗi nếu có
        console.error(error);
      }
    );
  }


}
