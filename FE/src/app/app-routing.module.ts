import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { HomePageComponent } from './pages/view/home-page/home-page.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './pages/admin/dashboard-page/dashboard-page.component';
import { PageNotFoundComponent } from './pages/view/page-not-found/page-not-found.component';
import { AdminCategoryComponent } from './pages/admin/category-page/admin-category/admin-category.component';
import { AddCategoryComponent } from './pages/admin/category-page/add-category/add-category.component';
import { SignInComponent } from './pages/view/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/view/auth/sign-up/sign-up.component';
import { CategoryDeleteComponent } from './pages/admin/category-page/category-delete/category-delete.component';
import { UpdateCategoryComponent } from './pages/admin/category-page/update-category/update-category.component';
import { ProductPageComponent } from './pages/admin/product-page/product-page/product-page.component';
import { AddProductComponent } from './pages/admin/product-page/add-product/add-product.component';
import { UpdateProductComponent } from './pages/admin/product-page/update-product/update-product.component';
import { ProductDeleteComponent } from './pages/admin/product-page/product-delete/product-delete.component';
import { ProductDetailComponent } from './pages/view/product-detail/product-detail.component';
import { CartComponent } from './pages/view/cart/cart.component';
import { PayComponent } from './pages/view/pay/pay.component';
import { ContactuspageComponent } from './pages/view/contactuspage/contactuspage.component';
import { CategoryDetailComponent } from './pages/view/category-detail/category-detail.component';
import { OrderPageComponent } from './pages/view/order-page/order-page.component';
import { OrderDetailComponent } from './pages/view/order-detail/order-detail.component';
import { ListOrderPageComponent } from './pages/admin/order-page/list-order-page/list-order-page.component';
import { AdminOrderDetaiPageComponent } from './pages/admin/order-page/admin-order-detai-page/admin-order-detai-page.component';


const routes: Routes = [
  {
    path: "", component: BaseLayoutComponent, children: [
      { path: "", component: HomePageComponent },
      { path: "signin", component: SignInComponent },
      { path: "signup", component: SignUpComponent },
      { path: "product/:id", component: ProductDetailComponent },
      { path: "carts", component: CartComponent },
      { path: "pay", component: PayComponent },
      { path: "contact", component: ContactuspageComponent },
      { path: "category/:id", component: CategoryDetailComponent },
      { path: "orders", component: OrderPageComponent },
      { path: "orders/:id", component: OrderDetailComponent },
    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardPageComponent },
      { path: "categories", component: AdminCategoryComponent },
      { path: "categories/delete", component: CategoryDeleteComponent },
      { path: "categories/add", component: AddCategoryComponent },
      { path: "categories/:id/update", component: UpdateCategoryComponent },
      { path: "products", component: ProductPageComponent },
      { path: "products/add", component: AddProductComponent },
      { path: "products/:id/update", component: UpdateProductComponent },
      { path: "products/delete", component: ProductDeleteComponent },
      { path: "orders", component: ListOrderPageComponent },
      { path: "orders/:id", component: AdminOrderDetaiPageComponent }
    ]

  },
  {
    path: "**", component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
