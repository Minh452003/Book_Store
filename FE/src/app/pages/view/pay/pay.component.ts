import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getDecodedAccessToken } from 'src/app/decoder';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';
import { CurrencyService } from 'src/currency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent {
  cart: any;
  userId: any;
  data: any;
  orderForm: FormGroup;

  constructor(
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private OrderService: OrderService,
    private AuthService: AuthService,
    private currencyService: CurrencyService,
  ) {
    this.orderForm = this.formBuilder.group({
      userId: [''],
      couponId: [''],
      full_name: [''],
      address: [''],
      phone: [''],
      notes: ['']
    });
  }
  ngOnInit() {
    const { id }: any = getDecodedAccessToken();
    this.userId = id
    if (this.userId === '') return;
    this.cartService.getCart(this.userId).subscribe(cart => {
      this.cart = cart;
    });
    if (!id) {
      this.router.navigate(['/signin']);
    }

    this.AuthService.getUserById(id).subscribe((data: any) => {
      this.data = data;
      this.orderForm.patchValue({
        userId: this.data?._id,
        couponId: this.data?.couponId,
        full_name: this.data?.full_name,
        address: this.data?.address,
        phone: this.data?.phone
      });
    }, error => console.log(error.message));
  }

  onHandlePay() {
    const { id }: any = getDecodedAccessToken();
    if (this.orderForm.valid) {
      const products = this.cart.data.products.map((product: any) => {
        return {
          productId: product.productId,
          product_name: product.product_name,
          product_price: product.product_price,
          image: product.image,
          stock_quantity: product.stock_quantity
        };
      });
      const order: any = {
        userId: this.orderForm.value.userId || '',
        couponId: this.orderForm.value.couponId || null,
        address: this.orderForm.value.address || '',
        phone: this.orderForm.value.phone || '',
        notes: this.orderForm.value.notes || '',
        products: products,
        total: this.cart.data.total
      };
      this.OrderService.addOrder(order).subscribe(
        (response: any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã mua đơn hàng thành công!',
            showConfirmButton: true,
            timer: 1500
          });
          this.cartService.removeAllCart(id).subscribe(() => {
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
  formatCurrency(number: any): string {
    if (number !== undefined && number !== null) {
      return this.currencyService.formatCurrency(number);
    } else {
      return ''; // Hoặc giá trị mặc định khác
    }
  }
}
