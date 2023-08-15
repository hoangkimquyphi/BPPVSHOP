import { Component, OnInit } from '@angular/core';
import { CardServiceService } from 'src/app/_service/card.service.service';
import { ProductService } from 'src/app/_service/product.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
  cartItems: any[] = [];
  product_id: number = 0;
  quantity: number = 0;

  constructor(private cartService: CardServiceService) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(
      (response: any) => {
        this.cartItems = response.items;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addToCart() {
    this.cartService.addToCart(this.product_id, this.quantity).subscribe(
      (response) => {
        console.log('Sản phẩm đã được thêm vào giỏ hàng:', response);
        // Cập nhật giao diện hoặc thực hiện các thao tác khác sau khi thêm vào giỏ hàng thành công
      },
      (error) => {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
      }
    );
  }
  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId).subscribe(
      () => {
        // Xoá thành công, cập nhật lại giỏ hàng
        this.getCartItems();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCartItemQuantity(itemId: string, quantity: number) {
    this.cartService.updateCartItemQuantity(itemId, quantity).subscribe(
      () => {
        // Cập nhật số lượng thành công, cập nhật lại giỏ hàng
        this.getCartItems();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}