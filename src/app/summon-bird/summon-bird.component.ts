import { Component, inject, Input, Inject, ViewChild } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule, NgIf } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { Bird, sortRarity } from '../interfaces/bird';
import { MissionsComponent } from '../missions/missions.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summon-bird',
  imports: [CommonModule, BirdCardComponent, MissionsComponent, NgbPagination, NgIf],
  templateUrl: './summon-bird.component.html',
  styleUrl: './summon-bird.component.css'
})
export class SummonBirdComponent {
  @Input() value: any = null;
  public isMobile: boolean = false;
  public paginationElements: number = 6;
  public dummyElements: number;
  public currentPage: number = 1;

  gameService = inject(GameService)
  @Input() birdList: any[] = [];

  @ViewChild(MissionsComponent)
  missionsComponent: MissionsComponent | undefined;

  constructor(@Inject('updatePlayerInfo') public updatePlayerData: any) {
    console.log(updatePlayerData)
    this.isMobile = navigator.userAgent.includes('Mobile');
    this.updatePagination();
    this.birdList = new Array(this.paginationElements).fill({
      icon: '🪺',
    });
    this.dummyElements = this.paginationElements;
  }

  updatePagination() {
    console.log(window.innerWidth, window.innerHeight)
    let px = 0;
    let py = 0;
    if (this.isMobile) {
      px = 2;
    } else if (window.innerWidth >= 992) {
      px = 5;
    } else {
      px = 2;
    }
    if (window.innerHeight >= 1400) {
      py = 2;
    } else if (window.innerHeight >= 992) {
      py = 2;
    } else {
      py = 2;
    }
    this.paginationElements = px * py;
  }

  summonBird(count: number) {
    this.gameService.summonBird(count).subscribe({
      next: res => {
        //this.birdList.unshift(...res);
        //if(this.dummyElements > 0) {
        //  this.birdList = this.birdList.splice(0, Math.max(this.paginationElements, this.birdList.length + res.length - this.dummyElements));
        //  this.dummyElements -= res.length;
        //}
        res.sort(sortRarity);
        console.log('res:', res)
        while(this.dummyElements > 0 && res.length > 0) {
          this.birdList.pop();
          this.dummyElements--;
          this.birdList.unshift(res.pop());
          console.log(res.shift)
        }
        this.birdList.unshift(...res);
        console.log(this.birdList);
        this.updatePlayerData();
        this.missionsComponent?.getMissions();
      }
    });
  }


}
