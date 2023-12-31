import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog/blog.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-new-add',
  templateUrl: './admin-new-add.component.html',
  styleUrls: ['./admin-new-add.component.scss']
})
export class AdminNewAddComponent {
  submitted = false;
  blogForm = this.formBuilder.group({

    author: ['', [Validators.required, Validators.minLength(4)]],
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(4)]],
    image: ['', [Validators.required]]
  })
  constructor(private BlogService: BlogService,
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
      formData.append('image', file);
      this.blogForm.get('image')?.setValue(formData); // Sử dụng phương thức setValue() của FormControl
    }
  }
  onHandleAdd() {
    if (this.blogForm.valid) {
      const blog: IBlog = {
        author: this.blogForm.value.author || "",
        image: "", // Khởi tạo giá trị rỗng
        title: this.blogForm.value.title || "",
        description: this.blogForm.value.description || "",
      }
      const imageFormData: any = this.blogForm.value.image; // Lưu trữ FormData vào biến imageFormData

      // Upload ảnh và nhận URL đã tải lên
      this.uploadService.AddImage(imageFormData.get('image')).subscribe(
        (response) => {
          const imageUrl = response.urls[0];
          console.log(imageUrl);

          blog.image = imageUrl;

          // Gọi productService.addProduct() để thêm sản phẩm vào cơ sở dữ liệu
          this.BlogService.addBlog(blog).subscribe(
            (addBlog) => {
              // Xử lý khi sản phẩm được thêm thành công

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thêm tin tức thành công!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/admin/blogs']);
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
