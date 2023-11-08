import { Component } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { ICoupon } from 'src/app/interfaces/coupon';
import { CouponService } from 'src/app/services/coupons/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.scss']
})
export class AdminCouponsComponent {
  coupons: ICoupon[] = [];

  constructor(private CouponService: CouponService) {
    this.CouponService.getCoupons().subscribe((data: any) => {
      this.coupons = data.coupon
    }, error => {
      console.log(error.message);
    })
  }
  removeItem(id: any) {


    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xoá không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.CouponService.removeCoupon(id).subscribe(() => {
          Swal.fire(
            'Xoá!',
            'Phiếu giảm giá đã được xoá.',
            'success'
          )
          const newCoupon = this.coupons.filter((coupon) => coupon._id != id);
          this.coupons = newCoupon
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Huỷ',
          'Phiếu giảm giá không được xoá :)',
          'error'
        )
      }
    })
  }
  formatCreatedAt(createdAt: any): string {
    const parsedDate = parseISO(createdAt);
    return format(parsedDate, 'dd/MM/yyyy');
  }
}
