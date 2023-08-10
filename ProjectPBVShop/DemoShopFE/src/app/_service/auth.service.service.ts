import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if(token) this.setLoggedIn(true)
  }

  login(
    username: string,
    password: string
  ): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`http://localhost:4000/api/users/login`, {
        username,
        password,
      })
      .pipe(
        map((res) => {
          this.setToken(res.access_token);
          this.setLoggedIn(true);
          return res;
        }),
        catchError((err) => {
          this.setLoggedIn(false);

          return throwError(() => err)
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
  register(
    username: string,
    email: string,
    full_name: string,
    phone: string,
    address: string,
    gender: string,
    birthday: Number,
    password: string,
    password_confirmation: string
  ): Observable<any> {
    const url = 'http://localhost:4000/api/users/register'; // URL đến mock API
    const body = {
      username,
      email,
      full_name,
      phone,
      address,
      gender,
      birthday,
      password,
      password_confirmation,
    }; // Body của request

    return this.http.post(url, body); // Gửi request và trả về response dưới dạng Observable
  }
  //adding product in
}