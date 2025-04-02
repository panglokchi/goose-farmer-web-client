import { Component, inject, input, Input } from '@angular/core';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';

@Component({
  selector: 'app-bird-list',
  imports: [CommonModule, BirdCardComponent],
  templateUrl: './bird-list.component.html',
  styleUrl: './bird-list.component.css'
})
export class BirdListComponent {
  @Input() value: any = null;
  gameService = inject(GameService)
  public birdList: any;
  constructor() {
    this.birdList = this.gameService.getBirdList().subscribe({
      next: res => {
        this.birdList = res;
        console.log(this.birdList)
      }
    });
  }
}
