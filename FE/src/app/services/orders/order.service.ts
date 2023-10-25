import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }
  getAllOrders(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/bill');
  }
  getOrderByUser(useId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/order/${useId}/user`);
  }
  getOrderById(id: string | number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/order/${id}`);
  }
  addOrder(order: Order): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/order', order);
  }
  updateOrder(order: Order): Observable<Order> {
    return this.http.patch<any>(`http://localhost:8080/api/order/${order._id}`, order)
  }
  removeOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`hhttp://localhost:8080/api/order/${id}`)
  }
}
