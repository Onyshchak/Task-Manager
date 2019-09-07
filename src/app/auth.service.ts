import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService {

  private registerUrl = 'http://localhost:3000/api/user/register';
  private loginUrl = 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user)
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user)
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  logoutUser(): void {
    localStorage.removeItem('token')
    this.router.navigate(['/auth'])
  }

  getToken(): string {
    return localStorage.getItem('token')
  }
}
