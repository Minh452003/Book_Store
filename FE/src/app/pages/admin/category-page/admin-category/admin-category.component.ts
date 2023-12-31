import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  categories: ICategory[] = [];

  constructor(private CategoryService: CategoryService) {
    this.CategoryService.getCategories().subscribe((data: any) => {
      this.categories = data.category.docs
    }, error => {
      console.log(error.message);
    })
  }
  removeItem(id: any) {
    Swal.fire({
      title: 'Bạn chắc chắn?',
      text: "Danh mục sẽ được xoá!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tôi chắc chắn!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.CategoryService.removeCategory(id).subscribe(() => {
          Swal.fire(
            'Xoá danh mục!',
            'Xoá danh mục thành công, danh mục chuyển vào thùng rác.',
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
          'Xoá sản phẩm thất bại :)',
          'error'
        )
      }
    })
  }
}
