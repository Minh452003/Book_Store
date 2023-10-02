import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  submitted = false
  categoryForm = this.formBuilder.group({
    category_name: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[^0-9]+$')]],
    category_image: ['', [Validators.required]],
  })
  constructor(
    private CategoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uploadService: UploadService
  ) { }
  onSelectImage(event: any) {
    console.log(event); // Kiểm tra giá trị của event

    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files); // Kiểm tra giá trị của event.target.files

      const file = event.target.files[0];
      const formData: any = new FormData();
      formData.append('category_image', file);
      this.categoryForm.get('category_image')?.setValue(formData); // Sử dụng phương thức setValue() của FormControl
    }
  }
  onHandleAdd() {
    if (this.categoryForm.valid) {
      const category: ICategory = {
        category_name: this.categoryForm.value.category_name || "",
        category_image: "", // Khởi tạo giá trị rỗng
      }
      const imageFormData: any = this.categoryForm.value.category_image; // Lưu trữ FormData vào biến imageFormData
      // Upload ảnh và nhận URL đã tải lên
      this.uploadService.AddImage(imageFormData.get('category_image')).subscribe(
        (response) => {
          const imageUrl = response.urls[0];
          console.log(imageUrl);

          category.category_image = imageUrl;

          // Gọi productService.addProduct() để thêm sản phẩm vào cơ sở dữ liệu
          this.CategoryService.addCategory(category).subscribe(
            (category) => {
              // Xử lý khi sản phẩm được thêm thành công

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Product has been added successfully!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/admin/categories']);
            },
            (error) => {
              // Xử lý khi có lỗi trong quá trình thêm sản phẩm
              console.log(error.message);
            }
          );
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình upload ảnh
          console.log(error.message);
        }
      );
    }
  }
}
