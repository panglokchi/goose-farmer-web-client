import { Component, inject, input, Input } from '@angular/core';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { Bird } from '../bird';

@Component({
  selector: 'app-bird-list',
  imports: [CommonModule, BirdCardComponent],
  templateUrl: './bird-list.component.html',
  styleUrl: './bird-list.component.css'
})
export class BirdListComponent {
  @Input() value: any = null;
  gameService = inject(GameService)
  public birdList: Bird[] = [];
  public birdListActive: Bird[] = [];
  constructor() {
    this.gameService.getBirdList().subscribe({
      next: res => {
        this.birdList = res.filter((b: any) => b.assigned_to_coop == false);
        this.birdListActive = res.filter((b: any) => b.assigned_to_coop == true);
        console.log(this.birdListActive)
        console.log(this.birdList)
      }
    });
  }
}
