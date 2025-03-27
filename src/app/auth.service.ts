import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    console.log(`Login - email: ${email}, password: ${password}`);
      this.http.post<{"expiry": string, "token": string}>('http://localhost:8000/api/login/', {
        "username": email,
        "password": password
      }).subscribe(res => {
        console.log('res:', res);
        localStorage.setItem('token', res.token)
      });
  }
}
