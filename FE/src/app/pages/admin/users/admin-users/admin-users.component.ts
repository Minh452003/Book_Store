import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  users: IUser[] = [];
  constructor(private UserService: AuthService) {
    this.UserService.getUsers().subscribe((data: any) => {
      this.users = data.data
    }, error => {
      console.log(error.message);

    })
  }
  removeItem(id: any) {
    Swal.fire({
      title: 'Bạn chắc chứ ?',
      text: "Khi xoá thì không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chănd!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.UserService.removeUser(id).subscribe(() => {
          Swal.fire(
            'Xoá!',
            'Tài khoản đã được xoá.',
            'success'
          )
          const newUser = this.users.filter((user) => user._id != id);
          this.users = newUser
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Huỷ',
          'Tài khoản chưa được xoá :)',
          'error'
        )
      }
    })
  }
}
