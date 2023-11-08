import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDecodedAccessToken } from 'src/app/decoder';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyService } from 'src/currency.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
  user: IUser | null = null;
  cartItemCount: number = 0;
  searchValue = '';
  @Input() searchResults: any = [];
  showLogoutDropdown: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private currencyService: CurrencyService,
    private AuthService: AuthService,
  ) {
    this.refreshUser();
  }

  refreshUser() {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;

    if (id) {
      this.AuthService.getUserById(id).subscribe(user => {
        this.user = user;
      });
    } else {
      this.user = null;
    }
  }

  openDialog(type: 'signin' | 'signup') {
    if (type === 'signup') {
      this.router.navigate(['/signup']);
    }
    if (type === 'signin') {
      this.router.navigate(['/signin']);
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
      return '';
    }
  }

  handleLogout() {
    // Xóa access token khỏi localStorage
    localStorage.removeItem('accessToken');
    // Đặt trạng thái người dùng về null để xác nhận đã đăng xuất
    this.user = null;
  }
}
