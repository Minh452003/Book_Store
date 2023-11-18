import { Component, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyService } from 'src/currency.service';
import { getDecodedAccessToken } from 'src/app/decoder';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from 'src/app/services/comments/comment.service';
import { IComment } from 'src/app/interfaces/comment';

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
  comments !: IComment[];
  formData: { description: string, userId: string | any, productId: string } = { description: '', userId: '', productId: '' };
  userCart: any = getDecodedAccessToken()

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private currencyService: CurrencyService,
    private CartService: CartService,
    private CommentService: CommentService,
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
      // -------------------------
      this.CommentService.getCommentByProduct(idProduct).subscribe((comment: any) => {
        this.comments = comment.comments;
        this.countCMT = this.comments.length
      })
    });
    // ----------------------------------
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products?.product?.docs.filter((product: IProduct) => product?.categoryId === this.product?.categoryId);
    })
  }
  // ----------------------------
  onHandleRemove(id: string | any) {
    // Thực hiện xoá bình luận
    this.CommentService.removeComment(id).subscribe(comment => {
      const newComment = this.comments.filter((cm) => cm._id != id);
      this.comments = newComment;
    });
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
    if (number !== undefined && number !== null) {
      return this.currencyService.formatCurrency(number);
    } else {
      return ''; // Hoặc giá trị mặc định khác
    }
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
    this.CartService.addToCart(data, id).subscribe(cart => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm vào giỏ hàng!',
        showConfirmButton: true,
        timer: 1500
      })
    }, (errorResponse) => {
      if (errorResponse instanceof HttpErrorResponse) {
        const errorMessage = errorResponse.error.message;
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: errorMessage,
          showConfirmButton: true,
          timer: 1500
        });
      }
    })
  }
}
