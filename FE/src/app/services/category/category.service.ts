import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/api/category');
  }
  getCategoriesDelete(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/api/category/delete');
  }
  getCategoryById(id: string | number): Observable<ICategory> {
    return this.http.get<ICategory>(`http://localhost:8080/api/category/${id}`);
  }
  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>('http://localhost:8080/api/category', category);
  }
  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.patch<ICategory>(`http://localhost:8080/api/category/${category._id}`, category)
  }
  restoreCategory(id: string | number): Observable<ICategory> {
    const body = {};
    return this.http.patch<ICategory>(`http://localhost:8080/api/category/restore/${id}`, body)
  }
  removeCategory(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`http://localhost:8080/api/category/${id}`)
  }
  removeCategoryForce(id: number): Observable<ICategory> {
    return this.http.delete<ICategory>(`http://localhost:8080/api/category/force/${id}`)
  }
  getAllProducts(limit: number, page: number): Observable<ICategory[]> {
    const url = `http://localhost:8080/api/category?_limit=${limit}&_page=${page}`;
    return this.http.get<ICategory[]>(url);
  }
}
