import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getDecodedAccessToken } from 'src/app/decoder';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user !: any
  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) { }
  ngAfterViewInit() {
    const { id }: any = getDecodedAccessToken()
    if (id) {
      this.AuthService.getUserById(id).subscribe(user => {
        this.user = user
      })
      return
    } else {
      this.router.navigate(['/signin'])
      return
    }
  }
}
