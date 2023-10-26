import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyService } from 'src/currency.service';
;

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {

  cartItemCount: number = 0;
  searchValue = '';
  @Input() searchResults: any = [];
  showLogoutDropdown: boolean = false;


  constructor(
    private router: Router,
    private productService: ProductService,
    private currencyService: CurrencyService

  ) { }

  openDialog(type: 'signin' | 'signup') {
    if (type === 'signup') {
      this.router.navigate(['/signup'])
    }
    if (type === 'signin') {
      this.router.navigate(['/signin'])
    }
  }
  onSearch() {
    if (!this.searchValue.trim()) {
      this.searchResults = [];
      return;
    }
    this.productService.searchProducts(this.searchValue).subscribe((data: any) => {
      this.searchResults = data.product.docs;
      console.log(this.searchResults);

    });
  }
  onSearchBlur() {
    if (!this.searchValue.trim()) {
      this.searchResults = [];
    }
  }
  formatCurrency(number: any): string {
    if (number !== undefined && number !== null) {
      return this.currencyService.formatCurrency(number);
    } else {
      return ''; // Hoặc giá trị mặc định khác
    }
  }
}
