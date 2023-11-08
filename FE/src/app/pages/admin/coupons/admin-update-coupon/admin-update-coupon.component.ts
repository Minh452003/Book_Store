import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoupon } from 'src/app/interfaces/coupon';
import { CouponService } from 'src/app/services/coupons/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-update-coupon',
  templateUrl: './admin-update-coupon.component.html',
  styleUrls: ['./admin-update-coupon.component.scss']
})
export class AdminUpdateCouponComponent {
  submitted = false
  coupon!: ICoupon;
  couponForm = this.formBuilder.group({
    coupon_name: ['', [Validators.required, Validators.minLength(4)]],
    coupon_code: ['', [Validators.required]],
    coupon_content: ['', [Validators.required]],
    coupon_quantity: [0, [Validators.required, Validators.min(1)]],
    discount_amount: [0, [Validators.required, Validators.min(1)]],
    expiration_date: [null, [Validators.required]],
    min_purchase_amount: [0, [Validators.required, Validators.min(1)]],

  })

  constructor(private CouponService: CouponService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.CouponService.getCouponId(id).subscribe((coupon: any) => {
        this.coupon = coupon.coupon;
        this.couponForm.patchValue({
          coupon_name: this.coupon.coupon_name,
          coupon_code: this.coupon.coupon_code,
          coupon_content: this.coupon.coupon_content,
          coupon_quantity: this.coupon.coupon_quantity,
          discount_amount: this.coupon.discount_amount,
          expiration_date: this.coupon.expiration_date,
          min_purchase_amount: this.coupon.min_purchase_amount,

        })
      }, error => console.log(error.message)
      )
    })
  }
  onHandleUpdate() {
    if (this.couponForm.valid) {
      const coupon: ICoupon = {
        _id: this.coupon._id,
        coupon_name: this.couponForm.value.coupon_name || "",
        coupon_code: this.couponForm.value.coupon_code || "",
        coupon_content: this.couponForm.value.coupon_name || "",
        coupon_quantity: this.couponForm.value.coupon_quantity || 0,
        discount_amount: this.couponForm.value.discount_amount || 0,
        expiration_date: this.couponForm.value.expiration_date ? new Date(this.couponForm.value.expiration_date) : null,
        min_purchase_amount: this.couponForm.value.min_purchase_amount || 0,
      }
      this.CouponService.updateCoupon(coupon).subscribe(category => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhật phiếu giảm giá thành công!',
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
