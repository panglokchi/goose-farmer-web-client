import { Component, Input, inject, Injector } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { BirdListComponent } from '../bird-list/bird-list.component';
import { SummonBirdComponent } from '../summon-bird/summon-bird.component';
import { Player } from '../interfaces/player';
import { GameService } from '../services/game.service';

@Component({
  selector: 'placeholder',
  animations: [
  ],
  imports: [],
  template: '<p>placeholder {{value}}</p>',
})
export class Placeholder {
  @Input() value: string = "aa";
}

@Component({
  selector: 'app-home',
  animations: [
    trigger('show', [
      state(
        'hidden',
        style({
        }),
      ),
      state(
        'shown',
        style({
          width: '10em',
        }),
      ),
      transition('shown => hidden', [animate('0.3s')]),
      transition('hidden => shown', [animate('0.1s')]),
    ])
  ],
  imports: [NgbNavModule, NgComponentOutlet, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  _active: string | null = 'top';
  expand_pills = false;
  inputs = { value: this.active }
  public player: Player | null = null;
  updatePlayerInfoInjector: Injector;
  public ass = 1;

  public egg_change: number = 0;
  public feather_change: number = 0;
  public apple_change: number = 0;

  gameService = inject(GameService);

  togglePills() {
    this.expand_pills = !this.expand_pills;
  }

  showPills() {
    this.expand_pills = true;
  }

  hidePills() {
    this.expand_pills = false;
  }

  public get active(): string | null {
    return this._active;
  }
  public set active(v: string) {
    this._active = v
    this.inputs = { value: this._active }
    localStorage.setItem('homeTab', this._active)
  }

  getContent() {
    if (this.active == 'birdList') {
      return BirdListComponent;
    } else if (this.active == 'summonBird') {
      return SummonBirdComponent;
    }
    return Placeholder;
  }

  showEggChange = (value: number, time: number) => {
    this.egg_change = value;
    setInterval(()=>{
      this.egg_change = 0;
    }, time)
  }

  showFeatherChange = (value: number, time: number) => {
    console.log(value)
    this.feather_change = value;
    setInterval(()=>{
      this.feather_change = 0;
    }, time)
  }

  showAppleChange = (value: number, time: number) => {
    this.apple_change = value;
    setInterval(()=>{
      this.apple_change = 0;
    }, time)
  }

  updatePlayerInfo() {
    this.gameService.getPlayerInfo().subscribe({
      next: (res) => {
        /*
        if (this.player && this.player.eggs && res.eggs && res.eggs != this.player.eggs) {
          this.showEggChange(res.eggs - this.player.eggs, 10000)
        }
        if (this.player && this.player.summons && res.summons && res.summons != this.player.summons) {
          () => {this.showFeatherChange(res?.summons? - this.player.summons, 10000)}
        }
        if (this.player && this.player.feed && res.feed && res.feed != this.player.feed) {
          this.showAppleChange(res.feed - this.player.feed, 10000)
        }*/
        if (this.player?.eggs) {
          this.showEggChange(res.eggs as number - this.player.eggs as number, 3000)
        }
        if (this.player?.feed) {
          this.showAppleChange(res.feed as number - this.player.feed as number, 3000)
        }
        if (this.player?.summons) {
          this.showFeatherChange(res.summons as number - this.player.summons as number, 3000)
        }

        this.player = res;
        console.log("updating player info")
        console.log(this.player)
      }
    })
  }

  constructor(private injector: Injector) {
    this._active = localStorage.getItem('homeTab')
    this.updatePlayerInfo();
    this.updatePlayerInfoInjector = Injector.create({
      providers: [
        {
          provide: "updatePlayerInfo",
          useValue: () => {this.updatePlayerInfo()}
        }
      ],
      parent: this.injector
    })
  }
}
