import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent  implements OnInit {
  productData: undefined | Product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService,private routers: Router,) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
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
        this.routers.navigate(['/admin/product']);
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
  }
}
