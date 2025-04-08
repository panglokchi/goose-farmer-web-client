import { Component, inject, Inject, Input } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Mission } from '../interfaces/mission';
import { GameService } from '../services/game.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Player } from '../interfaces/player';

@Component({
  selector: 'app-missions',
  imports: [NgbAlert, NgFor, NgIf, CommonModule],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {
  public missionList: Mission[] = [];
  public loading: boolean = true;
  @Input() public condensed: boolean = false;

  public _player: Player = {
    user: {
      username: 'User',
      last_login: 'None',
      date_joined: 'None'
    },
    level: 1,
    exp: 0,
    last_level_exp: 0,
    next_level_exp: 100,
  };

  @Input() set player(player: Player) {
    this._player = player;
  }

  gameService = inject(GameService);

  public getMissions() {
    this.gameService.getMissions().subscribe({
      next: res => {
        this.missionList = res;
        console.log(this.missionList);
        this.loading = false;
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
