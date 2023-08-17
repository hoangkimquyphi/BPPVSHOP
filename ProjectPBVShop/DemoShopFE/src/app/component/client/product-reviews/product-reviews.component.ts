import { Component, OnInit } from '@angular/core';
import { Review } from '../../../class/IReview';
import { Product } from '../../../class/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../../_service/review.service';
import { ProductService } from '../../../_service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css']
})
export class ProductReviewsComponent  implements OnInit {
  reviews: Review[] = [];
  isLoggedIn: boolean;
  rating: any;
  comment: string | any;
  product: any | Product[];
  user: any;
  trendyProducts: any | Product[];
  listReviews: any | Review;

  constructor( private formBuilder: FormBuilder,private reviewService: ReviewService, private route: ActivatedRoute,private productService: ProductService, private router: Router){
    this.isLoggedIn = localStorage.getItem('access_token') !== null;
  }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'] // replace with actual product ID
    this.productService.getProduct(productId).subscribe(
      (product: any) => {
        this.product = product;
      },
      (error: any) => {
        console.error('Failed to fetch product:', error);
      }
    );
    this.user = this.reviewService.getCurrentUserId();
  }


  saveProductReview() {
    const review = {
      rating: this.rating,
      comment: this.comment,
      productId: this.product.id,
      create_at: new Date(),
      user_id: this.user.id,
      updated_at: new Date()
    };

    // Update product rating
    const newProduct = {
      ...this.product,
      rating: (this.product.rating * this.product.numReviews + this.rating) / (this.product.numReviews + 1),
      numReviews: this.product.numReviews + 1,

    };

    // Save
    if (this.isLoggedIn) {
      this.reviewService.saveProductReview(review, this.product.id).subscribe(
        (response: any) => {
          console.log('Product review saved successfully:', response);
          const newToken = response.headers.get('Authorization');
          if (newToken) {
            localStorage.setItem('access_token', newToken.replace('user ', ''));
          }
          // Update
          this.productService.updateProduct(newProduct).subscribe(
            (response) => {
              console.log('Product updated successfully:', response);
              this.router.navigate(['/'])
            },
            (error) => {
              console.error('Failed to update product:', error);
            }
          );
        },
        (error: any) => {
          console.error('Failed to save product review:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }
}
