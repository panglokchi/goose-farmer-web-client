import { Component, Input, OnInit, inject } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass } from '@angular/common'
import { Bird } from '../interfaces/bird';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-bird-card',
  imports: [NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgbProgressbar, NgClass],
  templateUrl: './bird-card.component.html',
  styleUrl: './bird-card.component.css'
})
export class BirdCardComponent implements OnInit {
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
    egg_timer: -1,
    is_new: false,
    rarity: "COMMON",
    egg_timer_max: 86400
  }

  @Input() visible = true;
  @Input() placeholder = false;
  public egg_bar = 0;
  public egg_bar_string = "";
  @Input() interactive = true;
  @Input() onClickCard: (bird: Bird)=>void = (bird: Bird)=>{};
  @Input() updatePlayerInfo: () => void = () => {};
  @Input() updateBirdList: () => void = () => {};

  gameService = inject(GameService);

  formatDuration(seconds: number): string {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format each part to be always two digits (e.g., 02 for 2)
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  };

  @Input() public get bird(): Bird {
    return this._bird;
  }

  public set bird(bird: any) {
    this._bird = bird;
  }

  updateTimer() {
    if(this.bird) {
      if (this.bird.assigned_to_coop && this.bird.egg_timer > 0) {
        this.bird.egg_timer -= 1;
        if (this.bird.egg_timer < 0) {
          this.bird.egg_timer = 0;
        }
        this.egg_bar = 100 - this.bird.egg_timer/this.bird.egg_timer_max * 100
        this.egg_bar_string = this.formatDuration(this.bird.egg_timer)
      }
    }
  }

  collectEggs() {
    this.gameService.collectEggs(this.bird.id).subscribe({
      next: (res) => {
        this.updateBirdList();
        this.updatePlayerInfo();
      }
    });
  }

  ngOnInit() {
    this.egg_bar = 100 - this.bird.egg_timer/this.bird.egg_timer_max * 100
    this.egg_bar_string = this.formatDuration(this.bird.egg_timer)
    setInterval(()=>{this.updateTimer();}, 1000)
  }
  constructor() {

  }
}
