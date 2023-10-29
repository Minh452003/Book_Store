import { Component } from '@angular/core';
import { getDecodedAccessToken } from 'src/app/decoder';
import { IOrder } from 'src/app/interfaces/order';
import { IStatus } from 'src/app/interfaces/status';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { StatusService } from 'src/app/services/status/status.service';
import { CurrencyService } from 'src/currency.service';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-list-order-page',
  templateUrl: './list-order-page.component.html',
  styleUrls: ['./list-order-page.component.scss']
})
export class ListOrderPageComponent {
  orders: IOrder[] = [];
  users: any = {};
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
    this.getAllOrder();
    this.getAllUser();
  }
  getAllUser(): void {
    this.AuthService.getUsers().subscribe((data: any) => {
      this.users = data.data
    }, error => {
      console.log(error.message);
    })
  }
  getAllOrder(): void {
    this.orderService.getAllOrders().subscribe((data: any) => {
      // Lấy danh sách đơn hàng
      this.orders = data.order;
      this.filteredOrders = this.orders
      // Gán thông tin người dùng cho từng đơn hàng
      this.orders.forEach((order: IOrder) => {
        const user = this.users?.find((user: IUser) => user._id === order.userId);
        if (user) {
          order.userId = user.full_name; // Gán thông tin người dùng vào đơn hàng
        }
      });
    }, error => {
      console.log(error.message);
    });
  }

  getAllStatus(): void {
    this.StatusService.getAllStatus().subscribe((data: any) => {
      this.status = data.status

    }, error => {
      console.log(error.message);
    })
  }
  getUnconfirmedOrders(id: any): void {
    if (id) {
      this.filteredOrders = this.orders.filter(order => order.status._id == id);
    }
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
}
