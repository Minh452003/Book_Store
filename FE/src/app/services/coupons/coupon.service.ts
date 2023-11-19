import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICoupon } from 'src/app/interfaces/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  getCoupons(): Observable<ICoupon[]> {
    return this.http.get<ICoupon[]>('http://localhost:8080/api/coupons');
  }
  getCouponId(id: string | number): Observable<ICoupon> {
    return this.http.get<ICoupon>(`http://localhost:8080/api/coupons/${id}`);
  }
  addCoupon(coupon: ICoupon): Observable<ICoupon> {
    return this.http.post<ICoupon>('http://localhost:8080/api/coupons', coupon);
  }
  updateCoupon(coupon: ICoupon): Observable<ICoupon> {
    return this.http.patch<ICoupon>(`http://localhost:8080/api/coupons/${coupon._id}`, coupon)
  }
  removeCoupon(id: number): Observable<ICoupon> {
    return this.http.delete<ICoupon>(`http://localhost:8080/api/coupons/${id}`)
  }
  getCouponByUser(userId: string | number): Observable<ICoupon> {
    return this.http.get<ICoupon>(`http://localhost:8080/api/coupon/${userId}`);
  }
}
