import { Injectable, afterRender } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bird } from '../interfaces/bird';
import { Player } from '../interfaces/player';
import { Mission } from '../interfaces/mission';
import { environment } from '../../environments/environment';

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

  public updateToken() {
    this.getToken();
  }

  getBirdList(): Observable<any> {
    console.log(`get bird list`);
    return this.http.get<Bird>(environment.API_URL+'/player/birds',{
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  summonBird(count: number): Observable<Bird[]> {
    console.log(`summon bird`);
    return this.http.post<Bird[]>(environment.API_URL+'/summon',
      {
        times: count
      },
      {
        headers: new HttpHeaders({"Authorization": "Token " + this.token})
    }) as Observable<Bird[]>
  }

  getPlayerInfo(username?: string): Observable<Player> {
    return this.http.get<Player>(environment.API_URL+'/player/',{
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  activateBird(id: number, active: boolean): Observable<any> {
    return this.http.post<Player>(environment.API_URL+'/player/activate-bird',{
      bird_id: id,
      active: active
    },
    {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  feedBird(id: number, amount: number): Observable<any> {
    return this.http.post<Player>(environment.API_URL+'/player/feed-bird',{
      bird_id: id,
      amount: amount
    },
    {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  releaseBird(id: number): Observable<any> {
    return this.http.post<Player>(environment.API_URL+'/player/release-bird',{
      bird_id: id,
    },
    {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  collectEggs(id: number): Observable<any> {
    return this.http.post<Player>(environment.API_URL+'/player/collect-eggs',{
      bird_id: id,
    },
    {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  setBirdNotNew(id: number): Observable<any> {
    return this.http.post<Player>(environment.API_URL+'/player/set-bird-not-new',{
      bird_id: id,
    },
    {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(environment.API_URL+'/player/missions',{
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }

  completeMission(id: number): Observable<any> {
    return this.http.post<Player>(environment.API_URL+'/player/claim-mission',{
      mission_id: id,
    },
    {
      headers: new HttpHeaders({"Authorization": "Token " + this.token})
    })
  }
}
