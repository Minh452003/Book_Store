import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { IProduct } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
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
      this.getProduct(1);

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

  pageIndex: any
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex // Lấy chỉ mục trang mới
    this.limit = event.pageSize // Lấy kích thước trang
    this.getProduct(this.pageIndex + 1) // Lấy dữ liệu cho trang mới
    console.log(this.getProduct(this.pageIndex + 1));

  }
  getProduct(page: number): void {
    this.productService.getAllProducts(this.limit, page).subscribe((res: any) => {
      this.products = res.product.docs
      this.formattedPagination.length = res.product.totalDocs
      this.formattedPagination.pageIndex = res.product.page - 1
      this.formattedPagination.pageSize = res.product.limit
      this.formattedPagination.pageSizeOptions = [3, 6]
      this.formattedPagination.totalPages = res.product.totalPages
      this.formattedPagination.page = res.product.page
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
      text: "Sản phẩm sẽ được xoá !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        this.productService.removeProduct(id).subscribe(() => {
          Swal.fire(
            'Xoá!',
            'Bạn xoá sản phẩm thành công',
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
}
