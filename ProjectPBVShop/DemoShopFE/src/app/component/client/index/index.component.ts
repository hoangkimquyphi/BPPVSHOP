import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/_service/auth.service.service';
import { CartService } from 'src/app/_service/cart.service';
import { CategoryService } from 'src/app/_service/category.service';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/class/product';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  listProduct : any;
  listItemInCart : any;
  listCategory:any;
 AuthServiceService: any;
 loader: Boolean=true;
 searchResult:undefined|Product[];
  constructor(private productService: ProductService,public cartService:CartService,private categoryService: CategoryService,private authService:AuthServiceService,private router: Router){}

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
  }


  getListProduct(){
    this.productService.getListProduct().subscribe(data =>{
      this.listProduct = data;
      this.loader=false;
      this.cartService.loadCart();
    })
  }
  getListCategory(){
    this.categoryService.getListCategory().subscribe(data =>{
      this.listCategory = data;
      this.loader=false;
    })
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result)=>{
       
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }
  redirectToDetails(id:number){
    this.router.navigate(['/details/'+id])
  }
  submitSearch(val:string){
    console.warn(val)
  this.router.navigate([`search/${val}`]);
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


  removeFromCart(item:any){
    this.cartService.remove(item);
  }

  updateQuantity(item: any,event: any){
    let quantity : number = event.target.value;
    this.cartService.updateCart(item,quantity);
  }
  onLogout(){
    localStorage.removeItem('login');
    this.router.navigate(['/login'])
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/login']);
    }
  }

  p: number = 1;
  items: any[] = Array.from({length: 100}).map((_, i) => `Item ${i + 1}`);


}
