import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { CardServiceService } from 'src/app/_service/card.service.service';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-trendyproduct',
  templateUrl: './trendyproduct.component.html',
  styleUrls: ['./trendyproduct.component.css']
})
export class TrendyproductComponent  implements OnInit {
  productData: undefined | Product;
  productMessage: undefined | string;
  cartItems: any[] = [];
  product_id: number = 0;
  quantity: number = 0;


  // reviewList: IReview | any;
  constructor(private route: ActivatedRoute,private product: ProductService,public cartService:CardServiceService,private authService:AuthServiceService,private router: Router,) {}

  ngOnInit(): void {

    let productId = this.route.snapshot.params['id'];
    productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;

      });

  }

  
  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
        alert('Edit Product successfully')
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
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
  handleQuantity(val:string){
    if(this.quantity<20 && val==='plus'){
      this.quantity+=1;
    }else if(this.quantity>1 && val==='min'){
      this.quantity-=1;
    }
  }


  onLogout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/login'])
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
  }

  p: number = 1;
  items: any[] = Array.from({length: 100}).map((_, i) => `Item ${i + 1}`);

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
  convertToStars(rating: number): string {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(rating)) {
        stars += '<span class="fa fa-star checked"></span>';
      } else {
        stars += '<span class="fa fa-star"></span>';
      }
    }
    return stars;
  }


}


