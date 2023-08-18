import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_service/product.service';
import { Product } from '../class/product';
import { Category } from '../class/category';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../_service/category.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  categories:Category[]=[];
  products:Product[]=[];
  listProduct:any;

  constructor(private productService: ProductService, private http: HttpClient,private categoryService:CategoryService ) { }
  ngOnInit(): void {
    this.getListProduct();

  }

    onCategoryClick(id: number) {
      this.http.get<Product[]>(`http://localhost:4000/api/categories/${id}`).subscribe(products => {
        this.products = products;
      });
    }

    getListProduct(){
      this.productService.getListProduct().subscribe(data =>{
        this.listProduct = data;

        // this.cartService.loadCart();
      })
    }
  }
