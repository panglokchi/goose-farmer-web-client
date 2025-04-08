import { Component, inject, Input, Inject, ViewChild } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { Bird } from '../interfaces/bird';
import { MissionsComponent } from '../missions/missions.component';

@Component({
  selector: 'app-summon-bird',
  imports: [CommonModule, BirdCardComponent, MissionsComponent],
  templateUrl: './summon-bird.component.html',
  styleUrl: './summon-bird.component.css'
})
export class SummonBirdComponent {
  @Input() value: any = null;
  gameService = inject(GameService)
  @Input() birdList: any[] = new Array(10).fill({
    icon: '🪺',
  });

  @ViewChild(MissionsComponent)
  missionsComponent: MissionsComponent | undefined;

  constructor(@Inject('updatePlayerInfo') public updatePlayerData: any) {
    console.log(updatePlayerData)
  }

  summonBird(count: number) {
    this.gameService.summonBird(count).subscribe({
      next: res => {
        this.birdList = res
        console.log(this.birdList)
        this.updatePlayerData();
        this.missionsComponent?.getMissions();
      }
    });
  }


}
