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


const routes: Routes = [
  {
    path: "", component: BaseLayoutComponent, children: [
      { path: "", component: HomePageComponent },
      { path: "signin", component: SignInComponent },
      { path: "signup", component: SignUpComponent },
    ]
  },
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardPageComponent },
      { path: "categories", component: AdminCategoryComponent },
      { path: "categories/add", component: AddCategoryComponent },
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