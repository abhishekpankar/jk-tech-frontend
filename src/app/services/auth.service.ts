import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`/api/v1/auth/login`, credentials)
      .subscribe(response => {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']);
      });
  }

  isAuthenticated(){
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getRole() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }

  browserLogin(credentials: any) {
    return this.http.post<{ access_token: string }>(`/api/v1/auth/browser/login`, credentials)
      .subscribe(response => {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']);
      });
  }
}
