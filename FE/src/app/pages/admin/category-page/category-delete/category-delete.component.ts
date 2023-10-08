import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent {
  categories: ICategory[] = [];

  constructor(private CategoryService: CategoryService) {
    this.CategoryService.getCategoriesDelete().subscribe((data: any) => {
      this.categories = data.category
      console.log(this.categories);

    }, error => {
      console.log(error.message);
    })
  }
  removeItem(id: any) {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Danh mục sẽ được xoá hoàn toàn!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.CategoryService.removeCategoryForce(id).subscribe(() => {
          Swal.fire(
            'Xoá vĩnh viễn!',
            'Danh mục sẽ được xoá vĩnh viễn.',
            'success'
          )
          const newCategory = this.categories.filter((category) => category._id != id);
          this.categories = newCategory
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Thất bại',
          'Xoá danh mục thất bại :)',
          'error'
        )
      }
    })
  }
  restoreItem(id: any) {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi chọn danh mục sẽ được khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!',
      cancelButtonText: "Huỷ"
    }).then((result) => {
      if (result.isConfirmed) {

        // Xóa danh mục
        this.CategoryService.restoreCategory(id).subscribe((response) => {
          Swal.fire(
            'Khôi phục!',
            'Danh mục đã được khôi phục.',
            'success'
          )

          const newCategory = this.categories.filter((category) => category._id != id);
          this.categories = newCategory
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
