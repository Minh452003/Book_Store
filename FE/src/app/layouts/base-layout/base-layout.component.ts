import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';;

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {

  cartItemCount: number = 0;
  searchValue = '';
  @Input() searchResults = [];
  showLogoutDropdown: boolean = false;


  constructor(
    private router: Router,

  ) { }

  openDialog(type: 'signin' | 'signup') {
    if (type === 'signup') {
      this.router.navigate(['/signup'])
    }
    if (type === 'signin') {
      this.router.navigate(['/signin'])
    }
  }

}
