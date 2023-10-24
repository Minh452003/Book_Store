import { Component, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyService } from 'src/currency.service';
import { getDecodedAccessToken } from 'src/app/decoder';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  quantity: number = 1;
  countCMT: any
  product !: IProduct;
  products: IProduct[] = [];
  categories: ICategory[] = [];

  formData: { description: string, userId: string | any, productId: string } = { description: '', userId: '', productId: '' };
  userCart = getDecodedAccessToken()

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private FormBuilder: FormBuilder,
    private elementRef: ElementRef,
    private currencyService: CurrencyService,
    private CartService: CartService,
  ) {
    this.route.paramMap.subscribe(params => {
      const idProduct = String(params.get('id'));
      this.productService.getProductById(idProduct).subscribe((data: any) => {
        this.product = data.product;
        this.scrollToTop()
        getDecodedAccessToken()
        // set idProduct in formData
        this.formData.productId = idProduct;
      }, error => console.log(error.message)
      )
    });
    // ----------------------------------
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products?.product?.docs.filter((product: IProduct) => product.categoryId === this.product.categoryId);
    })
  }
  // ----------------------------
  scrollToTop() {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // -------------------------------
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
  //--------------------------------
  formatCurrency(number: any): string {
    return this.currencyService.formatCurrency(number);
  }
  handleAddToCart() {
    const { id }: any = getDecodedAccessToken()

    if (!id) {
      // Hiển thị thông báo hoặc chuyển hướng đến trang đăng nhập
      console.log("Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      this.router.navigate(['/signin']);
      return;
    }

    const data: any = {
      productId: this.product._id,
      product_name: this.product.product_name,
      product_price: this.product.product_price,
      image: this.product.image?.url,
      stock_quantity: this.quantity,
    }
    console.log(data);

    this.CartService.addToCart(data, id).subscribe(cart => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm vào giỏ hàng!',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }
}
