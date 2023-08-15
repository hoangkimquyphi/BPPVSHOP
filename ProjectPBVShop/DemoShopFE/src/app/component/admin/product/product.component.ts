import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProduct : any;
  selectedFile: File | null = null;
  productForm !: FormGroup;
  deleteId !: number;
  editingProduct :any;

  constructor(private productService:ProductService,public fb: FormBuilder){
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
      category_id: [''],
      color: [''],
      brand: [''],
      image_url: [''],
      material: [''],
      id: [''],


    });
  }

  ngOnInit(): void {
    this.getListProduct();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  getListProduct(){
    this.productService.getListProduct().subscribe(data=>{
      this.listProduct = data;
    })
  }
  


  createProduct(){
    const data : Product ={
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
      category_id: this.productForm.get('category_id')?.value,
      color: this.productForm.get('color')?.value,
      image_url: this.productForm.get('image_url')?.value,
      material: this.productForm.get('material')?.value,
      // brand: this.productForm.get('brand')?.value,
      id: this.productForm.get('id')?.value,
         
    }

    if (this.productForm.valid && this.selectedFile){
      this.productService.createProduct(data,this.selectedFile).subscribe({
        next: res=>{
          this.getListProduct;
        }
      })
    }
  }
  
  onSubmit(){
    const data : Product ={
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
      category_id: this.productForm.get('category_id')?.value,
      color: this.productForm.get('color')?.value,
      image_url: this.productForm.get('image_url')?.value,
      material: this.productForm.get('material')?.value,
      // brand: this.productForm.get('brand')?.value,
      id: this.productForm.get('id')?.value,

         
    }
  
    // if (this.productForm.valid && this.selectedFile){
    //   if (this.editingProduct) {
    //     this.productService.updateProduct(this.editingProduct.id, data, this.selectedFile).subscribe({
    //       next: res=>{
    //         this.getListProduct();
    //       }
    //     })
    //   } else {
    //     this.productService.createProduct(data,this.selectedFile).subscribe({
    //       next: res=>{
    //         this.getListProduct();
    //       }
    //     })
    //   }
    // }
  }


  updateProduct(data: any){
    this.editingProduct = data;
    this.productForm.patchValue({
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      category_id: data.category_id,
      color: data.color,
      material: data.material,
      brand: data.brand,
      image_url: data.image_url,
      id: data.id,
      
    })
    console.log(this.productForm.value);
  }

  deleteProduct(){
    this.productService.deleteProduct(this.deleteId).subscribe(data =>{
      this.getListProduct();
    });
    location.reload();
  }


  getDeleteId(id: any){
    this.deleteId = id;
  }

  resetForm() {
    this.editingProduct = null;
    this.productForm.reset();
  }
}
