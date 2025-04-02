import { Injectable, afterRender } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private token: string | null = null;
  private tokenExpiry: string | null = null;

  private saveToken() {};
  private getToken() {
    this.token = localStorage.getItem("token")
    this.tokenExpiry = localStorage.getItem("tokenExpiry")
  };

  constructor(private http: HttpClient) {
    this.getToken();
  }

  getBirdList(): Observable<any> {
    console.log(`get bird list`);
    return this.http.get('http://172.26.87.217:8000/api/player/birds',{
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }
}
