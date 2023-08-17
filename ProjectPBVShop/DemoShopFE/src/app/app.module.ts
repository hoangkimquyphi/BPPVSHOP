import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { ProductComponent } from './component/admin/product/product.component';
import { IndexComponent } from './component/client/index/index.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './component/client/cart/cart.component';
import { OrderComponent } from './component/client/order/order.component';
import { HomeComponent } from './component/client/home/home.component';
import { UserOrderComponent } from './component/admin/user-order/user-order.component';
import { ProductDetailsComponent } from './component/client/product-details/product-details.component';
import { LoginComponent } from './component/client/login/login.component';
import { RegisterComponent } from './component/client/register/register.component';
import { PagetionComponent } from './component/client/pagetion/pagetion.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddproductComponent } from './component/admin/addproduct/addproduct.component';
import { EditproductComponent } from './component/admin/editproduct/editproduct.component';
import { LoginAdminComponent } from './component/admin/login-admin/login-admin.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AddCategoryComponent } from './component/admin/add-category/add-category.component';
import { EditCategoryComponent } from './component/admin/edit-category/edit-category.component';
import { TrendyproductComponent } from './component/client/trendyproduct/trendyproduct.component';
import { CardPageComponent } from './component/client/card-page/card-page.component';






@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    IndexComponent,
    DashboardComponent,
    CartComponent,
    OrderComponent,
    HomeComponent,
    UserOrderComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    PagetionComponent,
    AddproductComponent,
    EditproductComponent,
    LoginAdminComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    TrendyproductComponent,
    CardPageComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
