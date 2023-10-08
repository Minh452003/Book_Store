import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getDecodedAccessToken } from 'src/app/decoder';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  isSubmitted = false;
  errorMessage = '';
  userForm = this.FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })
  constructor(
    private AuthService: AuthService,
    private FormBuilder: FormBuilder,
    private Router: Router,
  ) { }
  onHandleSignin() {
    if (this.userForm.valid) {
      const user: IUser = {
        email: this.userForm.value.email?.trim() || "",
        password: this.userForm.value.password || "",
      }
      this.AuthService.signIn(user).subscribe((response: any) => {
        localStorage.setItem("accessToken", JSON.stringify(response.accessToken));
        const { id }: any = getDecodedAccessToken()
        this.AuthService.getUserById(id).subscribe((user: any) => {
          const { role }: any = user;
          if (role == "admin") {
            this.Router.navigate(['/admin']);
          } else {
            this.Router.navigate(['/']);
          }
        })
      }, (error) => {
        this.errorMessage = error.error.message
        // Gán thông báo lỗi từ phản hồi
      }
      )
    }
  }
}
