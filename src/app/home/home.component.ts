import { Component, Input, inject, Injector, OnInit, afterNextRender, TemplateRef } from '@angular/core';
import { NgbNavModule, NgbProgressbar, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgComponentOutlet, NgIf, NgClass, NgStyle } from '@angular/common';
import { BirdListComponent } from '../bird-list/bird-list.component';
import { SummonBirdComponent } from '../summon-bird/summon-bird.component';
import { Player } from '../interfaces/player';
import { GameService } from '../services/game.service';
import { MissionsComponent } from '../missions/missions.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
      transition('shown => hidden', [animate('0.2s')]),
      transition('hidden => shown', [animate('0.15s')]),
    ]),
    trigger('appear', [
      state(
        'hidden',
        style({
          width: '0em',
        }),
      ),
      state(
        'shown',
        style({
          width: '10em',
        }),
      ),
      transition('shown => hidden', [animate('0.2s')]),
      transition('hidden => shown', [animate('0.15s')]),
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
  imports: [NgbNavModule, NgComponentOutlet, NgIf, NgbProgressbar, NgbDropdownModule, ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  _active: string | null = 'missions';
  expand_pills = false;
  public narrowScreen: boolean = false;
  public isMobile: boolean = false;
  inputs: any = { value: this._active };
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
  authService = inject(AuthService);

  constructor(private injector: Injector, private router: Router) {
    afterNextRender(() => {
      this.updatePlayerInfo();
      this._active = localStorage.getItem('homeTab') 
    })

    this.updatePlayerInfoInjector = Injector.create({
      providers: [
        {
          provide: "updatePlayerInfo",
          useValue: () => {this.updatePlayerInfo()}
        }
      ],
      parent: this.injector
    })

    if (window.innerWidth < 576 || navigator.userAgent.includes("Mobile")) {
      this.narrowScreen = true;
    }

    if (navigator.userAgent.includes("Mobile")) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
    
  }

  public signOut() {
    const token = localStorage.getItem("token")
    if(token != null) {
      this.authService.signOut(token).subscribe({
        next: (res) => {
          localStorage.removeItem('homeTab')
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiry')
        },
        error: (err) => {
          console.log('err:', err)
        },
        complete: () => {
          this.router.navigate(['/login'])
        }
      });
    }
  }

  togglePills() {
    this.expand_pills = !this.expand_pills;
  }

  showPills() {
    this.expand_pills = true;
    console.log("show pills")
  }

  hidePills() {
    this.expand_pills = false;
    console.log("hide pills")
  }

  public get active(): string | null {
    return this._active;
  }
  public set active(v: string) {
    this._active = v
    this.inputs = { value: this._active }
    localStorage.setItem('homeTab', this._active)
    if( this.narrowScreen) {
      this.expand_pills = false;
    }
  }

  getContent() {
    if (this.active == 'birdList') {
      return BirdListComponent;
    } else if (this.active == 'summonBird') {
      return SummonBirdComponent;
    } else if (this.active == 'missions') {
      this.inputs = { player: this.player }
      return MissionsComponent;
    }
    return MissionsComponent;
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
        this.inputs = { player: this.player }
      }
    })
  }

  private modalService = inject(NgbModal);

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {

			},
			(reason) => {

			},
		);
	}

  requestGuestVerificationForm = new FormGroup({
    email: new FormControl(''),
  })

  submitGuestVerifyRequest() {
    this.modalService.dismissAll();
    this.authService.requestGuestVerification(this.requestGuestVerificationForm.value.email ?? '').subscribe({
      next: (res) => {

      }
      , error: (err) => {   
        console.log('err:', err)
      }
      , complete: () => {
        console.log("verification request sent")
      }
    });
  }




}
