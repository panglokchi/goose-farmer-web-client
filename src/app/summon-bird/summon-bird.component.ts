import { Component, inject, input, Input } from '@angular/core';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { Bird } from '../bird';

@Component({
  selector: 'app-summon-bird',
  imports: [CommonModule, BirdCardComponent],
  templateUrl: './summon-bird.component.html',
  styleUrl: './summon-bird.component.css'
})
export class SummonBirdComponent {
  @Input() value: any = null;
  gameService = inject(GameService)
  @Input() birdList: (Bird|null)[] = new Array(10);

  summonBird(count: number) {
    this.gameService.summonBird(count).subscribe({
      next: res => {
        this.birdList = res
        console.log(this.birdList)
      }
    });
  }
}
