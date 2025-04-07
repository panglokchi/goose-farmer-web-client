import { Component, Input, inject, Injector } from '@angular/core';
import { NgbNavModule, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { BirdListComponent } from '../bird-list/bird-list.component';
import { SummonBirdComponent } from '../summon-bird/summon-bird.component';
import { Player } from '../interfaces/player';
import { GameService } from '../services/game.service';
import { MissionsComponent } from '../missions/missions.component';

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
    ]),
    trigger('fade', [
      state(
        'hidden',
        style({
          opacity: '0%'
        }),
      ),
      state(
        'shown',
        style({
          opacity: '100%'
        }),
      ),
      transition('shown => hidden', [animate('0.3s')]),
      transition('hidden => shown', [animate('0.1s')]),
    ])
  ],
  imports: [NgbNavModule, NgComponentOutlet, NgIf, NgbProgressbar],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  _active: string | null = 'top';
  expand_pills = false;
  inputs = { value: this.active }
  public player: Player = {
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
  updatePlayerInfoInjector: Injector;

  public eggChange: number = 0;
  public featherChange: number = 0;
  public appleChange: number = 0;
  public showEggChange: boolean = false;
  public showFeatherChange: boolean = false;
  public showAppleChange: boolean = false;

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
    } else if (this.active == 'missions') {
      return MissionsComponent;
    }
    return Placeholder;
  }

  onEggChange = (value: number, time: number) => {
    if (value == 0) return;
    this.showEggChange = true
    this.eggChange = value;
    setTimeout(()=>{
      this.showEggChange = false
    }, time)
  }

  onFeatherChange = (value: number, time: number) => {
    if (value == 0) return;
    this.showFeatherChange = true;
    this.featherChange = value;
    setTimeout(()=>{
      this.showFeatherChange = false;
    }, time)
  }

  onAppleChange = (value: number, time: number) => {
    if (value == 0) return;
    this.showAppleChange = true;
    this.appleChange = value;
    setTimeout(()=>{
      this.showAppleChange = false;
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
          this.onEggChange(res.eggs as number - this.player.eggs as number, 1500)
        }
        if (this.player?.feed) {
          this.onAppleChange(res.feed as number - this.player.feed as number, 1500)
        }
        if (this.player?.summons) {
          this.onFeatherChange(res.summons as number - this.player.summons as number, 1500)
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
