import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_service/order.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  listOrder: any;

  constructor(private orderService:OrderService){}

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder(){
    this.orderService.getListOrder().subscribe(data=>{
      this.listOrder = data;
    })
  }

}
