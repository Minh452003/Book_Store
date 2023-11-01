import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }

  addMomo(order: IOrder): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/create_payment_url', order);
  }
  addPaypal(order: IOrder): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/pay', order);
  }
}
