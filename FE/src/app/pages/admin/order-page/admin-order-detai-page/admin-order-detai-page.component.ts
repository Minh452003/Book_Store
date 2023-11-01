import { Component, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { IOrder } from 'src/app/interfaces/order';
import { IStatus } from 'src/app/interfaces/status';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { StatusService } from 'src/app/services/status/status.service';
import { CurrencyService } from 'src/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-order-detai-page',
  templateUrl: './admin-order-detai-page.component.html',
  styleUrls: ['./admin-order-detai-page.component.scss']
})
export class AdminOrderDetaiPageComponent {
  order !: IOrder | any;
  user: any = {}
  status: IStatus[] = [];
  selectedStatus: string = '';
  orderForm = this.formBuilder.group({
    status: ["", [Validators.required]],
  })
  constructor(
    private orderService: OrderService,
    private AuthService: AuthService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private StatusService: StatusService,
    private formBuilder: FormBuilder,

  ) {
    this.route.paramMap.subscribe(params => {
      const idOrder = String(params.get('id'));
      this.orderService.getOrderById(idOrder).subscribe((data: any) => {
        this.order = data.order;
        this.orderForm.patchValue({
          status: this.order.status._id,
        });
        this.AuthService.getUserById(this.order.userId).subscribe(
          (data: any) => {
            this.user = data;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }, error => console.log(error.message)
      )
    });
    this.StatusService.getAllStatus().subscribe((data: any) => {
      this.status = data.status
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
  formatCreatedAt(createdAt: string): string {
    const parsedDate = parseISO(createdAt);
    return format(parsedDate, 'dd/MM/yyyy');
  }
  onHandleRemove(id: any) {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Đơn hàng sẽ được huỷ !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        this.orderService.removeOrder(id).subscribe(() => {
          Swal.fire(
            'Huỷ!',
            'Bạn huỷ đơn hàng thành công',
            'success'
          )
          this.scrollToTop()
          this.router.navigate(['/admin/orders']);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Hoàn tác',
          'Đơn hàng chưa được huỷ :)',
          'error'
        )
      }
    })
  }
  onHandleUpdate(): void {
    if (this.orderForm.valid) {
      const values: any = {
        _id: this.order._id,
        userId: this.order.userId,
        products: this.order.products,
        phone: this.order.phone,
        address: this.order.address,
        total: this.order.total,
        status: this.orderForm.value.status || ''
      };
      // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
      this.orderService.updateOrder(values).subscribe(
        (status) => {
          // Xử lý khi sản phẩm được cập nhật thành công
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cập nhật trạng thái thành công!',
            showConfirmButton: true,
            timer: 1500
          });
          this.router.navigate([`/admin/orders/${this.order._id}`]);
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
          console.log(error.message);
        }
      );


    }
  }
  scrollToTop() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
