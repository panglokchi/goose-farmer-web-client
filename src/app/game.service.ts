import { Injectable, afterRender } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bird } from './bird';

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
    return this.http.get<Bird>('http://172.26.87.217:8000/api/player/birds',{
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  summonBird(count: number): Observable<Bird[]> {
    console.log(`summon bird`);
    return this.http.post<Bird[]>('http://172.26.87.217:8000/api/summon',
      {
        times: count
      },
      {
        headers: new HttpHeaders({"Authorization": "Token " + this.token})
    }) as Observable<Bird[]>
  }
}
