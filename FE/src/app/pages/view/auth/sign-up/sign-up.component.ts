import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  isSubmitted = false;
  errorMessage = '';
  userForm!: FormGroup;

  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup): any {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmpassword')?.setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }

  onHandleSignup() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      const user: IUser = {
        full_name: this.userForm.value.full_name || "",
        email: this.userForm.value.email || "",
        password: this.userForm.value.password || "",
        confirmPassword: this.userForm.value.confirmPassword || "",
      }
      this.AuthService.signUp(user).subscribe(
        (user) => {
          // Xử lý khi sản phẩm được thêm thành công
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Register has been added successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/signin']);
        },
        (error) => {
          // Xử lý khi có lỗi trong quá trình thêm sản phẩm
          console.log(error.message);
        }
      );

    }
  }
}
