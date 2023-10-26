import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './pages/admin/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/view/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/view/page-not-found/page-not-found.component';
import { AddCategoryComponent } from './pages/admin/category-page/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/admin/category-page/update-category/update-category.component';
import { CategoryDeleteComponent } from './pages/admin/category-page/category-delete/category-delete.component';
import { AdminCategoryComponent } from './pages/admin/category-page/admin-category/admin-category.component';
import { SignInComponent } from './pages/view/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/view/auth/sign-up/sign-up.component';
import { AuthInterceptor } from './auth.interceptor';
import { ProductPageComponent } from './pages/admin/product-page/product-page/product-page.component';
import { AddProductComponent } from './pages/admin/product-page/add-product/add-product.component';
import { UpdateProductComponent } from './pages/admin/product-page/update-product/update-product.component';
import { ProductDeleteComponent } from './pages/admin/product-page/product-delete/product-delete.component';
import { BannerComponent } from './components/banner/banner.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { CategoriesComponentComponent } from './components/categories-component/categories-component.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDetailComponent } from './pages/view/product-detail/product-detail.component';
import { CartComponent } from './pages/view/cart/cart.component';
import { PayComponent } from './pages/view/pay/pay.component';
import { ContactuspageComponent } from './pages/view/contactuspage/contactuspage.component';
import { CategoryDetailComponent } from './pages/view/category-detail/category-detail.component';
import { OrderPageComponent } from './pages/view/order-page/order-page.component';
import { OrderDetailComponent } from './pages/view/order-detail/order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BaseLayoutComponent,
    AdminLayoutComponent,
    PageNotFoundComponent,
    DashboardPageComponent,
    AdminCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    CategoryDeleteComponent,
    SignInComponent,
    SignUpComponent,
    ProductPageComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductDeleteComponent,
    BannerComponent,
    BlogPageComponent,
    ContactPageComponent,
    CategoriesComponentComponent,
    ProductViewComponent,
    ProductDetailComponent,
    CartComponent,
    PayComponent,
    ContactuspageComponent,
    CategoryDetailComponent,
    OrderPageComponent,
    OrderDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatDialogModule,
    MatPaginatorModule,
    BrowserAnimationsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
