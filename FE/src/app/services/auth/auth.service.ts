import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  signUp(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8080/api/signup', user);
  }
  signIn(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8080/api/signin', user);
  }
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:8080/api/users');
  }
  getUserById(id: string | number): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:8080/api/users/${id}`);
  }
  removeUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`http://localhost:8080/api/users/${id}`)
  }
  updateUser(user: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`http://localhost:8080/api/user/${user._id}`, user)
  }
}
