import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { IProduct } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyService } from 'src/currency.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  category !: ICategory
  categories: ICategory[] = [];
  products: IProduct[] = [];
  constructor(
    private CategoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private currencyService: CurrencyService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.productService.getProducts().subscribe((products: any) => {
        this.products = products.product.docs.filter((product: IProduct) => product.categoryId === id);
      })
    })
    this.CategoryService.getCategories().subscribe((data: any) => {
      this.categories = data.category.docs
    }, error => {
      console.log(error.message);
    })
  }
  formatCurrency(number: any): string {
    if (number !== undefined && number !== null) {
      return this.currencyService.formatCurrency(number);
    } else {
      return ''; // Hoặc giá trị mặc định khác
    }
  }
}
