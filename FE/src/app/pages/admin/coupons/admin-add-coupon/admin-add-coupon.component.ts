import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICoupon } from 'src/app/interfaces/coupon';
import { CouponService } from 'src/app/services/coupons/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-coupon',
  templateUrl: './admin-add-coupon.component.html',
  styleUrls: ['./admin-add-coupon.component.scss']
})
export class AdminAddCouponComponent {
  submitted = false
  couponForm = this.formBuilder.group({
    coupon_name: ['', [Validators.required, Validators.minLength(4)]],
    coupon_code: ['', [Validators.required]],
    coupon_content: ['', [Validators.required]],
    coupon_quantity: [null, [Validators.required, Validators.min(1)]],
    discount_amount: [null, [Validators.required, Validators.min(1)]],
    expiration_date: [null, [Validators.required]],
    min_purchase_amount: [null, [Validators.required, Validators.min(1)]],

  })
  constructor(private CouponService: CouponService,
    private formBuilder: FormBuilder,
    private router: Router) { }
  onHandleAdd() {
    if (this.couponForm.valid) {
      const coupon: ICoupon = {
        coupon_name: this.couponForm.value.coupon_name || "",
        coupon_code: this.couponForm.value.coupon_code || "",
        coupon_content: this.couponForm.value.coupon_name || "",
        coupon_quantity: this.couponForm.value.coupon_quantity || 0,
        discount_amount: this.couponForm.value.discount_amount || 0,
        expiration_date: this.couponForm.value.expiration_date ? new Date(this.couponForm.value.expiration_date) : null,
        min_purchase_amount: this.couponForm.value.min_purchase_amount || 0,
      }
      this.CouponService.addCoupon(coupon).subscribe(category => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm phiếu giảm giá thành công!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/coupons'])
      }, error => {
        console.log(error.message);

      })
    }
  }
}
