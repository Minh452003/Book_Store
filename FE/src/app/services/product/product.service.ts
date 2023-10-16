import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://localhost:8080/api/products`);
  }
  getProductsDelete(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:8080/api/products/delete');
  }
  getProductById(id: string | number): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:8080/api/products/${id}`);
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('http://localhost:8080/api/products', product);
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`http://localhost:8080/api/products/${product._id}`, product)
  }
  restoreProduct(id: string | number): Observable<IProduct> {
    const body = {};
    return this.http.patch<IProduct>(`http://localhost:8080/api/products/restore/${id}`, body)
  }
  removeProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`http://localhost:8080/api/products/${id}`)
  }
  removeProductForce(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`http://localhost:8080/api/products/force/${id}`)
  }
  getAllProducts(limit: number, page: number): Observable<IProduct[]> {
    const url = `http://localhost:8080/api/products?_limit=${limit}&_page=${page}`;
    return this.http.get<IProduct[]>(url);
  }
}
