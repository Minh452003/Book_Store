import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import Swal from 'sweetalert2';

export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const valid = emailPattern.test(control.value);
    return valid ? null : { invalidEmail: { message: 'Email không hợp lệ.' } };
  };
}
@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss']
})

export class AdminUserEditComponent {
  submitted = false;
  user!: IUser;

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email, customEmailValidator()]],
    address: ['', [Validators.required, Validators.minLength(6)]],
    role: [''],
    avatar: ['']
    // password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private userService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService

  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.userService.getUserById(id).subscribe(user => {
        this.user = user;
        this.userForm.patchValue({
          name: this.user.full_name,
          email: this.user.email,
          address: this.user.address,
          role: this.user.role,
        })
      }, error => console.log(error.message)
      )
    })
  }
  selectedImage: any = null; // Biến lưu trữ ảnh được chọn
  onSelectImage(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.userForm.patchValue({ avatar: this.selectedImage });
    } else {
      this.selectedImage = null;
      this.userForm.patchValue({ avatar: null });
    }
  }
  onHandleUpdate() {
    if (this.userForm.valid) {
      const newUser: IUser = {
        _id: this.user._id,
        full_name: this.userForm.value.name || "",
        email: this.userForm.value.email || "",
        address: this.userForm.value.address || "",
        role: this.userForm.value.role || "",
        avatar: "",
      }
      if (this.selectedImage) {
        // const publicId = this.user.avatar.publicId;
        // console.log(publicId);

        // Tải lên ảnh mới và nhận URL đã tải lên
        const imageFormData: any = this.userForm.value.avatar; // Lưu trữ FormData vào biến imageFormData

        this.uploadService.AddImage(imageFormData.get('avatar')).subscribe(
          (response) => {

            const imageUrl = response
            console.log(imageUrl);

            if (imageUrl) {
              newUser.avatar = imageUrl;

              // Gọi productService.updateProduct() để cập nhật thông tin sản phẩm
              this.userService.updateUser(newUser).subscribe(
                (userUpdate) => {
                  // Xử lý khi sản phẩm được cập nhật thành công
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật tài khoản thành công!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigate(['/admin/users']);
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
        this.userService.updateUser(newUser).subscribe(
          (userUpdate) => {
            // Xử lý khi sản phẩm được cập nhật thành công
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User has been updated successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/admin/user']);
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
