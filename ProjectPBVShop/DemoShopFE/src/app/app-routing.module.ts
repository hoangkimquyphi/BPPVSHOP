import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/client/index/index.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { ProductComponent } from './component/admin/product/product.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { CartComponent } from './component/client/cart/cart.component';
import { OrderComponent } from './component/client/order/order.component';
import { UserOrderComponent } from './component/admin/user-order/user-order.component';
import { LoginComponent } from './component/client/login/login.component';
import { RegisterComponent } from './component/client/register/register.component';
import { PagetionComponent } from './component/client/pagetion/pagetion.component';
import { ProductDetailsComponent } from './component/client/product-details/product-details.component';
import { AddproductComponent } from './component/admin/addproduct/addproduct.component';
import { EditproductComponent } from './component/admin/editproduct/editproduct.component';
import { LoginAdminComponent } from './component/admin/login-admin/login-admin.component';
import { AddCategoryComponent } from './component/admin/add-category/add-category.component';
import { EditCategoryComponent } from './component/admin/edit-category/edit-category.component';
import { CardPageComponent } from './component/client/card-page/card-page.component';
import { ProductReviewsComponent } from './component/client/product-reviews/product-reviews.component';
import { ListProductComponent } from './list-product/list-product.component';


const routes: Routes = [
  {path:'',component: IndexComponent},
  {path: 'cart',component:CartComponent},
  {path:'product/:id',component:ProductDetailsComponent},
  // {path:'product/:id',component:TrendyproductComponent},
  {path: 'login',component:LoginComponent},
  {path: 'pagination',component:PagetionComponent},
  {path: 'register',component:RegisterComponent},
  {path:'order',component:OrderComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'loginadmin',component:LoginAdminComponent},
  {path:'editproduct/:id',component:EditproductComponent},
  {path:'addcategory',component:AddCategoryComponent},
  {path:'editcategory/:id',component:EditCategoryComponent},
  {path:'card-page',component:CardPageComponent},
  {path:'admin',component: DashboardComponent},
  {path:'product-reviews/:id',component: ProductReviewsComponent},
  {path:'list-product',component: ListProductComponent,
    children: [
      {path:'',component:CategoryComponent},
      {path:'product',component:ProductComponent},
      {path:'addproduct',component:AddproductComponent},
      {path:'order',component:UserOrderComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
