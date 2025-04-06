import { Component, inject, Input, Inject} from '@angular/core';
import { NgIf } from '@angular/common';
import { NgbActiveModal, NgbProgressbar　} from '@ng-bootstrap/ng-bootstrap';
import { Bird } from '../interfaces/bird';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-bird-info',
  imports: [BirdCardComponent, NgbProgressbar, NgIf],
  templateUrl: './bird-info.component.html',
  styleUrl: './bird-info.component.css'
})
export class BirdInfoComponent {
	activeModal = inject(NgbActiveModal);
  gameService = inject(GameService);
  @Input() updateBirdList: any;

  _Bird: Bird = {
    id: 0,
    name: 'Placeholder',
    level: 1,
    stars: 3,
    weight: 1,
    bird_type: {
      species: 'Placeholder'
    },
    icon: '🪿',
    exp: 0,
    health: 100,
    last_level_exp: 0,
    next_level_exp: 100,
    egg_amount: 1,
    assigned_to_coop: false
  }

	@Input() public get bird(): Bird {
    return this._Bird;
  }

  public set bird(bird: Bird) {
    this._Bird = bird;
  }

  activateBird(id: number, active: boolean) {
    this.gameService.activateBird(id, active).subscribe({
      next: (res) => {
        this.updateBirdList()
      }
    });
  }

}
