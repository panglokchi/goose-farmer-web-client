import { Injectable, afterRender } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';

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
    /*
    afterRender(()=>{
      //this.authenticated$ = of(!!localStorage.getItem("token")) // also check expiry
      //console.log('isAuthenticated:', this.authenticated)
      this.saveToken = () => {
        localStorage.setItem('token', this.token as string)
        localStorage.setItem('tokenExpiry', this.tokenExpiry as string)
        localStorage.setItem('homeTab', 'missions')
      }
      this.getToken();
    })
    */
  }

  login(email: string, password: string, redirect?: string) {
    console.log(`Login - email: ${email}, password: ${password}`);
    return this.http.post<{"expiry": string, "token": string}>('http://172.26.87.217:8000/api/login/', {
      "username": email,
      "password": password
    })
    /*
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
    */
  }

  guestSignup() {
    return this.http.post<{"expiry": string, "token": string}>('http://172.26.87.217:8000/api/play-as-guest', {

    })
  }

  requestGuestVerification(email: string) {
    return this.http.post('http://172.26.87.217:8000/api/request-guest-verification', {
      "email": email
    },{
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  checkGuestVerificationToken(token: string) {
    return this.http.get('http://172.26.87.217:8000/api/guest-verification/?key=' + token)
  }

  guestVerification(token:string, password: string) {
    return this.http.post<{"expiry": string, "token": string}>('http://172.26.87.217:8000/api/guest-verification/?key=' + token, {
      "password" : password
    })
  }

  signOut(token: string) {
    return this.http.post<any>('http://172.26.87.217:8000/api/logout/', {

    },{
      headers: new HttpHeaders({"Authorization": "Token " + token})
    })
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
