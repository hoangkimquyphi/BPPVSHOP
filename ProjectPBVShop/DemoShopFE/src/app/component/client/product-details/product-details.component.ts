import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { CartService } from 'src/app/_service/cart.service';
import { ProductService } from 'src/app/_service/product.service';
import { ReviewService } from 'src/app/_service/review.service';
import { Product } from 'src/app/class/product';
import { IReview, Review, User } from 'src/app/class/IReview';
import { Category } from 'src/app/class/category';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent  implements OnInit {
  reviews:  Review[] = [];
  users: User[] = [];
  productData: undefined | Product;
  
  productMessage: undefined | string;
  quantity:number=1;


  // reviewList: IReview | any;
  constructor(private route: ActivatedRoute,private product: ProductService,public cartService:CartService,private authService:AuthServiceService,private router: Router, private review: ReviewService) {}

  ngOnInit(): void {

    let productId = this.route.snapshot.params['id'];
    this.review.getReviewsByProductId(productId)
      .subscribe(reviews => {
        console.log("review", reviews);

        this.reviews = reviews
        console.log("review", this.reviews);
      });

    productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;

      });

  }

  calculateAverageRating(): number {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / this.reviews.length;
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
  addToCart(item: any){
    if (this.authService.isLoggedIn()){
    this.cartService.getItems();
    this.cartService.addToCart(item,1);
    alert('Add card successfully')
    }else{
      this.router.navigate(['/login']);



    }

  }
  handleQuantity(val:string){
    if(this.quantity<20 && val==='plus'){
      this.quantity+=1;
    }else if(this.quantity>1 && val==='min'){
      this.quantity-=1;
    }
  }

  removeFromCart(item:any){
    this.cartService.remove(item);
  }


  updateQuantity(item: any,event: any){
    let quantity : number = event.target.value;
    this.cartService.updateCart(item,quantity);
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

  // getStarArray(rating: number): number[] {
  //   return Array(rating).fill(0);
  // }


  days:any = 194;
hours:number = 22;
mins:number = 14;
secs:number = 2;

x = setInterval(() =>{
  var futureDate:any = new Date("Dec 30, 2023 08:47:31").getTime();
  var today:any = new Date().getTime();
  var distance = futureDate - today;
  this.days = Math.floor(distance/(1000 * 60 * 60 *24));
  this.hours = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
  this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  this.secs = Math.floor((distance % (1000 * 60)) / (1000));

  if(distance < 0) {
    clearInterval(this.x);
    this.days = "Sản phẩm không còn giảm giá";
  }
}, 1000)


convertToStars(rating: number): any[] {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const star = {
      class: 'fa fa-star',
      color: 'black'
    };
    if (i < Math.round(rating)) {
      star.class += ' checked';
      star.color = '#ff4400';
    }
    stars.push(star);
  }
  return stars;
}

}


