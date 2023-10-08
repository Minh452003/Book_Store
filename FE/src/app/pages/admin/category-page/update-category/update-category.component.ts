import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent {
  submitted = false
  category!: ICategory;
  categoryForm = this.formBuilder.group({
    category_name: ['', [Validators.required, Validators.minLength(4)]],
    category_image: [''],
  })

  constructor(private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.categoryService.getCategoryById(id).subscribe((data: any) => {
        this.category = data.category;
        this.categoryForm.patchValue({
          category_name: this.category.category_name,
        })
      }, error => console.log(error.message)
      )
    })
  }

  selectedImage: any = null; // Biến lưu trữ ảnh được chọn
  onSelectImage(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.categoryForm.patchValue({ category_image: this.selectedImage });
    } else {
      this.selectedImage = null;
      this.categoryForm.patchValue({ category_image: null });
    }
  }
  onHandleUpdate() {
    if (this.categoryForm.valid) {
      const newCategory: ICategory = {
        _id: this.category._id,
        category_name: this.categoryForm.value.category_name || "",
        category_image: this.category.category_image, // Sử dụng ảnh cũ mặc định
      }

      if (this.selectedImage) {
        const publicId = this.category.category_image.publicId;
        // Tải lên ảnh mới và nhận URL đã tải lên
        this.uploadService.updateImage(publicId, this.selectedImage).subscribe(
          (response) => {
            const imageUrl = response
            if (imageUrl) {
              newCategory.category_image = imageUrl;
              // Gọi productService.updateProduct() để cập nhật thông tin sản phẩm
              this.categoryService.updateCategory(newCategory).subscribe(
                (updatedProduct) => {
                  // Xử lý khi sản phẩm được cập nhật thành công
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật danh mục thành công!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigate(['/admin/categories']);
                },
                (error) => {
                  // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
                  console.log(error.message);
                }
              );
            } else {
              // Xử lý khi không có URL mới để cập nhật
              console.log('Không có URL mới để cập nhật');
            }
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình upload ảnh
            console.log(error.message);
          }
        );
      } else {
        // Người dùng không chọn ảnh mới, chỉ cập nhật thông tin sản phẩm
        this.categoryService.updateCategory(newCategory).subscribe(
          (updatedProduct) => {
            // Xử lý khi sản phẩm được cập nhật thành công
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cập nhật danh mục thành công!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/categories']);
          },
          (error) => {
            // Xử lý khi có lỗi trong quá trình cập nhật sản phẩm
            console.log(error.message);
          }
        );
      }
    }
  }
}
