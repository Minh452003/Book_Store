import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { IProduct } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator
  products: IProduct[] = [];
  categories: ICategory[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,

  ) {
    this.paginator = {} as MatPaginator
  }
  pagination = {
    hasNextPage: true,
    hasPrevPage: false,
    limit: 1,
    nextPage: 1,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1
  }

  limit = 6

  formattedPagination: any = {}

  async ngOnInit() {
    try {
      this.getProduct();

      this.categoryService.getCategories().subscribe(
        (categoriesData: any) => {
          this.categories = categoriesData.category.docs;
          // Gọi hàm mapCategoryToProducts() sau khi nhận được dữ liệu danh mục
          this.mapCategoryToProducts();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  getProduct(): void {
    this.productService.getProductsDelete().subscribe((res: any) => {
      this.products = res.product
      this.mapCategoryToProducts();
    })
  }
  mapCategoryToProducts() {
    this.products = this.products.map((product: IProduct) => {
      const category = this.categories.find((category: ICategory) => category._id === product.categoryId);
      return { ...product, category: category ? category.category_name : '' };
    });
  }

  onHandleRemove(id: any) {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Sản phẩm sẽ được Xoá !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        this.productService.removeProductForce(id).subscribe(() => {
          Swal.fire(
            'Xoá!',
            'Bạn đã xoá sản phẩm vĩnh viễn',
            'success'
          )
          this.products = this.products.filter(item => item._id !== id);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Sản phẩm chưa được xoá :)',
          'error'
        )
      }
    })
  }
  restoreItem(id: any) {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi chọn sản phẩm sẽ được khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!',
      cancelButtonText: "Huỷ"
    }).then((result) => {
      if (result.isConfirmed) {

        // Xóa danh mục
        this.productService.restoreProduct(id).subscribe((response) => {
          Swal.fire(
            'Khôi phục!',
            'Sản phẩm đã được khôi phục.',
            'success'
          )

          const newProduct = this.products.filter((product) => product._id != id);
          this.products = newProduct
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Khôi phục sản phẩm thất bại :)',
          'error'
        )
      }
    })
  }
}
