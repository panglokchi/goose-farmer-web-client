import { Component, inject, input, Input, HostListener } from '@angular/core';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { Bird } from '../bird';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bird-list',
  imports: [CommonModule, BirdCardComponent, NgbPagination],
  templateUrl: './bird-list.component.html',
  styleUrl: './bird-list.component.css'
})
export class BirdListComponent {
  @Input() value: any = null;
  gameService = inject(GameService)
  public birdList: Bird[] = [];
  public birdListActive: Bird[] = [];
  public paginationElements: number = 12;
  public currentPage: number = 1;

  Math = Math
  Array = Array

  updatePagination() {
    console.log(window.innerWidth, window.innerHeight)
    let px = 0;
    let py = 0;
    if (window.innerWidth >= 992) {
      px = 6;
    } else {
      px = 3;
    }
    if (window.innerHeight >= 1400) {
      py = 5;
    } else if (window.innerHeight >= 992) {
      py = 3;
    } else {
      py = 2;
    }
    this.paginationElements = px * py;
  }

  //@HostListener('window:resize', ['$event'])
  //onResize(event: any) {
  //  console.log("window resize")
  //  this.updatePagination();
  //}
  // not working
  
  constructor() {
    this.updatePagination();

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
