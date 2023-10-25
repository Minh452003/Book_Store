import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getDecodedAccessToken } from 'src/app/decoder';
import { Icart } from 'src/app/interfaces/cart';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CurrencyService } from 'src/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart !: any
  quantity: number = 1;
  userCart = getDecodedAccessToken()

  constructor(
    private CartService: CartService,
    private AuthService: AuthService,
    private router: Router,
    private currencyService: CurrencyService,
  ) {
  }
  //------------------------------------
  handleRemoveProductInCart(productId: string) {
    const { id }: any = getDecodedAccessToken()
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Sản phẩm sẽ được xoá !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        this.CartService.removeProductInCart(id, productId).subscribe(() => {
          const newCart = this.cart.data.products.filter((ca: any) => ca.productId != productId);
          Swal.fire(
            'Xoá!',
            'Bạn xoá sản phẩm thành công',
            'success'
          )
          this.cart.data.products = newCart
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Huỷ',
          'Sản phẩm chưa được xoá :)',
          'error'
        )
      }
    })
  }
  // -----------------------------------
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
  formatCurrency(number: any): string {
    if (number !== undefined && number !== null) {
      return this.currencyService.formatCurrency(number);
    } else {
      return ''; // Hoặc giá trị mặc định khác
    }
  }
  ngAfterViewInit() {
    const { id }: any = getDecodedAccessToken()
    if (id) {
      this.CartService.getCart(id).subscribe(cart => {
        this.cart = cart
      })
      return
    } else {
      this.router.navigate(['/signin'])
      return
    }
  }
}
