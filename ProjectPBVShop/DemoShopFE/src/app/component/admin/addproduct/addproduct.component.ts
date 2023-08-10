import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService,private router: Router,) {}

  ngOnInit(): void {}

  submit(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
        alert('Add Product successfully')
        this.router.navigate(['/admin/product']);
        
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }
}