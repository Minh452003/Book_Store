import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { getDecodedAccessToken } from 'src/app/decoder';
import { Icart } from 'src/app/interfaces/cart';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { CouponService } from 'src/app/services/coupons/coupon.service';
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
  userCart = getDecodedAccessToken();
  coupons !: any;
  couponName !: any
  couponForm = this.formBuilder.group({
    couponId: [''],
  })
  constructor(
    private CartService: CartService,
    private CouponService: CouponService,
    private router: Router,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
  ) {
    const { id }: any = getDecodedAccessToken()
    this.CouponService.getCouponByUser(id).subscribe((data: any) => {
      this.coupons = data.validCoupons;
    }, error => console.log(error.message)
    )
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
  //------------------------------------
  onHandleApplyCoupon(): void {
    if (this.couponForm.valid) {
      const decodedToken: any = getDecodedAccessToken();
      const id: any = decodedToken ? decodedToken.id : null;
      const values: any = {
        couponId: this.couponForm.value.couponId || '',
      };
      // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
      this.CartService.applyCoupon({ couponId: values, userId: id }).subscribe(
        (coupon) => {
          // Xử lý khi sản phẩm được cập nhật thành công
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sử dụng phiếu giảm giá thành công!',
            showConfirmButton: true,
            timer: 1500
          });
          this.CartService.getCart(id).subscribe(cart => {
            this.cart = cart
            const cartCouponId = this.cart && this.cart.data.couponId;
            const matchingCoupon = this.coupons.find((coupon: any) => coupon._id === cartCouponId);
            const cartCouponName = matchingCoupon ? matchingCoupon.coupon_name : null;
            this.couponName = cartCouponName
          })
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
          console.log(error.message);
        }
      );
    }
  }
  onHandleRemoveCoupon(): void {
    if (this.couponForm.valid) {
      const decodedToken: any = getDecodedAccessToken();
      const id: any = decodedToken ? decodedToken.id : null;
      // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
      this.CartService.removeCoupon({ userId: id }).subscribe(
        (coupon) => {
          // Xử lý khi sản phẩm được cập nhật thành công
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Huỷ phiếu giảm giá thành công!',
            showConfirmButton: true,
            timer: 1500
          });
          this.CartService.getCart(id).subscribe(cart => {
            this.cart = cart
          })
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
          console.log(error.message);
        }
      );
    }
  }
}
