import { Component } from '@angular/core';
import { getDecodedAccessToken } from 'src/app/decoder';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { CurrencyService } from 'src/currency.service';
import { format, parseISO } from 'date-fns';
import { StatusService } from 'src/app/services/status/status.service';
import { IStatus } from 'src/app/interfaces/status';
import { FormBuilder } from '@angular/forms';
import { CommentService } from 'src/app/services/comments/comment.service';
import { IComment } from 'src/app/interfaces/comment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent {
  detailOrder: any[] = [];
  user: any = {};
  status: IStatus[] = [];
  filteredOrders: any[] = []; // Danh sách đơn hàng đã lọc
  comment !: IComment[];
  commentData: any = null;
  commentForm = this.formBuilder.group({
    userId: [''], // Truyền giá trị của userId từ instance của IProduct
    productId: [''], // Truyền giá trị của productId từ instance của IProduct
    description: [''],
    rating: [null],
    image: ['']
  })
  constructor(
    private orderService: OrderService,
    private AuthService: AuthService,
    private currencyService: CurrencyService,
    private StatusService: StatusService,
    private formBuilder: FormBuilder,
    private CommentService: CommentService,
  ) {
    this.commentForm.patchValue({
      userId: this.commentData?.userId,
      productId: this.commentData?.products
    });
  }

  ngOnInit(): void {
    this.getAllStatus();
    this.getOrderDetails();
    this.getUserById();
  }
  getAllStatus(): void {
    this.StatusService.getAllStatus().subscribe((data: any) => {
      this.status = data.status

    }, error => {
      console.log(error.message);
    })

  }
  getUserById(): void {
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
  getOrderDetails(): void {
    const { id }: any = getDecodedAccessToken()
    this.orderService.getOrderByUser(id).subscribe(
      (response: any) => {
        this.detailOrder = response.order;
        this.filteredOrders = this.detailOrder
      },
      (error) => {
        console.log('Error:', error);
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
  getUnconfirmedOrders(id: any): void {
    if (id) {
      this.filteredOrders = this.detailOrder.filter(order => order.status._id == id);
    }
  }
  //--------------------------------
  onHandleComment(value: any) {
    this.commentData = value
  }
  // -------------------------------

  onHandleAddComment({ order }: any) {
    if (this.commentForm.valid) {
      const { id }: any = getDecodedAccessToken();
      const formValue = this.commentForm.value;
      console.log(formValue);

      this.commentData.products.map((cm: any) => {
        this.CommentService.addComment({ ...formValue, userId: id, productId: cm._id }).subscribe((data: IComment) => {
          // Swal.fire({
          //   position: 'center',
          //   icon: 'success',
          //   title: 'Đánh giá thành công!',
          //   showConfirmButton: false,
          //   timer: 1500
          // });
        })
      })
    }

  }
}
