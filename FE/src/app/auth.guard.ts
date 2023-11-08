import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { IUser } from './interfaces/user';
import { getDecodedAccessToken } from './decoder';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const decodedToken: any = getDecodedAccessToken();
    const id = decodedToken ? decodedToken.id : null;
    if (id) {
      return this.authService.getUserById(id).pipe(
        map((user: any) => {
          if (user && user.role === 'admin') {
            return true;
          } else {
            this.router.navigate(['/signin']);
            return this.router.createUrlTree(['/signin']); // Trả về UrlTree để chuyển hướng
          }
        }),
        catchError((error) => {
          console.error(error);
          this.router.navigate(['/signin']);
          return of(this.router.createUrlTree(['/signin'])); // Trả về UrlTree trong trường hợp lỗi
        })
      );
    } else {
      this.router.navigate(['/signin']);
      return of(this.router.createUrlTree(['/signin'])); // Trả về UrlTree trong trường hợp không có 'id'
    }
  }
}
