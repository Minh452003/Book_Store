import { Component } from '@angular/core';
import { getDecodedAccessToken } from 'src/app/decoder';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { CurrencyService } from 'src/currency.service';
import { format, parseISO } from 'date-fns';
import { StatusService } from 'src/app/services/status/status.service';
import { IStatus } from 'src/app/interfaces/status';

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
  constructor(
    private orderService: OrderService,
    private AuthService: AuthService,
    private currencyService: CurrencyService,
    private StatusService: StatusService
  ) { }
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
        console.log(this.user);
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
}
