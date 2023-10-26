import { Component } from '@angular/core';
import { getDecodedAccessToken } from 'src/app/decoder';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { CurrencyService } from 'src/currency.service';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent {
  detailOrder: any[] = [];
  user: any = {}
  constructor(
    private orderService: OrderService,
    private AuthService: AuthService,
    private currencyService: CurrencyService
  ) { }
  ngOnInit(): void {
    this.getOrderDetails();
    this.getUserById();
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
        console.log(this.detailOrder);
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
}
