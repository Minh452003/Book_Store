import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { CurrencyService } from 'src/currency.service';
import { format, parseISO } from 'date-fns';
import { getDecodedAccessToken } from 'src/app/decoder';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  order !: IOrder;
  user: any = {}

  constructor(
    private orderService: OrderService,
    private AuthService: AuthService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,

  ) {
    this.route.paramMap.subscribe(params => {
      const idOrder = String(params.get('id'));
      this.orderService.getOrderById(idOrder).subscribe((data: any) => {
        this.order = data.order;
      }, error => console.log(error.message)
      )
    });
    const { id }: any = getDecodedAccessToken();
    this.AuthService.getUserById(id).subscribe(
      (data: any) => {
        this.user = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
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
          this.router.navigate(['/profile/orders']);
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
  scrollToTop() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
