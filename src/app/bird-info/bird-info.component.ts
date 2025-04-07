import { Component, inject, Input, Inject, OnDestroy} from '@angular/core';
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
export class BirdInfoComponent implements OnDestroy {
	activeModal = inject(NgbActiveModal);
  gameService = inject(GameService);
  @Input() updateBirdList: any;
  @Input() updatePlayerInfo: any;

  _bird: Bird = {
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
    assigned_to_coop: false,
    egg_timer: 86400,
    is_new: false,
    rarity: "COMMON",
    egg_timer_max: 86400
  }

	@Input() public get bird(): Bird {
    return this._bird;
  }

  public set bird(bird: Bird) {
    this._bird = bird;
  }

  activateBird(active: boolean) {
    this.activeModal.close();
    this.gameService.activateBird(this.bird.id, active).subscribe({
      next: (res) => {
        this.updateBirdList();
        this.updatePlayerInfo();
      }
    });
  };

  feedBird(amount: number) {
    this.gameService.feedBird(this.bird.id, amount).subscribe({
      next: (res) => {
        this.updateBirdList();
        this.updatePlayerInfo();
      }
    });
  };

  releaseBird() {
    this.activeModal.close();

    this.gameService.releaseBird(this.bird.id).subscribe({
      next: (res) => {
        this.updateBirdList();
        this.updatePlayerInfo();
      }
    });
  }

  ngOnDestroy(): void {
    if(this._bird.is_new == true) {
      this.gameService.setBirdNotNew(this._bird.id).subscribe({
        next: (res) => {
          this.updateBirdList();
        }
      });
    }
  }
}
