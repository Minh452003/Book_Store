import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icart, InputCart } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient
  ) { }
  getCart(userId: string): Observable<any> {
    return this.http.get<Icart>(`http://localhost:8080/api/carts/${userId}`)
  }
  addToCart(data: InputCart, userId: string): Observable<any> {
    return this.http.post(`http://localhost:8080/api/carts/${userId}/create`, data)
  }
  removeProductInCart(userId: string, productId: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/carts/${userId}/remove?idProduct=${productId}`)
  }
  changeQuantity(data: InputCart, userId: string, productId: string): Observable<any> {
    return this.http.patch(`http://localhost:8080/api/carts/${userId}?idProduct=${productId}`, data)
  }
  removeAllCart(userId: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/carts/${userId}/clears`)
  }
  applyCoupon({ couponId, userId }: any): Observable<any> {
    return this.http.patch(`http://localhost:8080/api/carts/${userId}/apply`, couponId)
  }
  removeCoupon({ couponId, userId }: any): Observable<any> {
    couponId = {}
    return this.http.patch(`http://localhost:8080/api/carts/${userId}/remove-coupon`, couponId)
  }
}
