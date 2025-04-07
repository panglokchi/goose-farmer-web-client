import { Component, inject, Inject } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../interfaces/mission';
import { GameService } from '../services/game.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-missions',
  imports: [NgbAlert, NgFor, NgIf],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {
  public missionList: Mission[] = [];

  gameService = inject(GameService);

  public getMissions() {
    this.gameService.getMissions().subscribe({
      next: res => {
        this.missionList = res;
        console.log(this.missionList);
      }
    });
  }

  public completeMission(id: number) {
    this.gameService.completeMission(id).subscribe({
      next: res => {
        console.log(res);
        this.getMissions();
        this.updatePlayerData();
      }
    });
  }

  constructor(@Inject('updatePlayerInfo') public updatePlayerData: () => void) {
    this.getMissions();
  }

}
