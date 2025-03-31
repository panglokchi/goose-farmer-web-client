import { Injectable, afterNextRender, afterRender } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { after } from 'node:test';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private authenticated = undefined;
  private token: string | null = null;
  private tokenExpiry: string | null = null;

  private saveToken() {};
  private getToken() {
    this.token = localStorage.getItem("token")
    this.tokenExpiry = localStorage.getItem("tokenExpiry")
  };

  constructor(private http: HttpClient, private router: Router) {
    afterRender(()=>{
      //this.authenticated$ = of(!!localStorage.getItem("token")) // also check expiry
      //console.log('isAuthenticated:', this.authenticated)
      this.saveToken = () => {
        localStorage.setItem('token', this.token as string)
        localStorage.setItem('tokenExpiry', this.tokenExpiry as string)
      }
      this.getToken();
    })
  }

  login(email: string, password: string, redirect?: string) {
    console.log(`Login - email: ${email}, password: ${password}`);
    this.http.post<{"expiry": string, "token": string}>('http://172.26.87.217:8000/api/login/', {
      "username": email,
      "password": password
    }).subscribe({
      next: (res) => {
        console.log('res:', res);
        //localStorage.setItem('token', res.token)
        //localStorage.setItem('tokenExpiry', res.expiry)
        this.token = res.token;
        this.tokenExpiry = res.expiry;
        this.saveToken();
      },
      error: (err) => {
        console.log('err:', err)
      },
      complete: () => {
        //this.authenticated = true
        console.log("login success - redirecting")
        this.router.navigate([''])
      }
    });
  }

  validateToken(): Observable<{"user": string, "expiry": string}> {
    console.log(`Checking token...`);
    this.getToken();
    console.log(this.token, this.tokenExpiry)
    const res = this.http.get<{"user": string, "expiry": string}>('http://172.26.87.217:8000/api/validate-token/', {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
    res.subscribe({
        next: (res) => {
          console.log('res:', res);
          console.log('saving token to localStorage')
          this.saveToken();
        },
        error: (err) => {
          console.log('err:', err)
          console.log("error validating token")
        },
        complete: () => {
          //this.authenticated = true
          console.log("token validated")
        }
      });
      return res;
  }
}
