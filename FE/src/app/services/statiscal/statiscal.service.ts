import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatiscalService {

  constructor(private http: HttpClient) { }

  statisticalOrders({ month, year }: any): Observable<any> {
    let url = `/statistical/orders?year=${year}`;
    if (month) {
      url += `&month=${month}`;
    } else if (month == null) {
      return this.http.get(url);
    }
    return this.http.get(url);
  }
  SellingProducts({ month, year }: any): Observable<any> {
    let url = `/statistical/products-sell?year=${year}`;
    if (month) {
      url += `&month=${month}`;
    } else if (month == null) {
      return this.http.get(url);
    }
    return this.http.get(url);
  }
}
