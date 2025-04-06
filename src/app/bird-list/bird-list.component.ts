import { Component, inject, Inject, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { CommonModule } from '@angular/common';
import { BirdCardComponent } from '../bird-card/bird-card.component';
import { BirdInfoComponent } from '../bird-info/bird-info.component';
import { Bird } from '../interfaces/bird';
import { NgbModal, NgbModalRef, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bird-list',
  imports: [CommonModule, BirdCardComponent, NgbPagination],
  templateUrl: './bird-list.component.html',
  styleUrl: './bird-list.component.css'
})
export class BirdListComponent {
  @Input() value: any = null;
  gameService = inject(GameService)
  modalService = inject(NgbModal)

  public birdList: Bird[] = [];
  public birdListActive: Bird[] = [];
  public paginationElements: number = 12;
  public currentPage: number = 1;

  public birdModalId: number = 0;
  public modalRef: NgbModalRef | null = null;

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

  updateBirdList = () => {
    console.log("updating bird list")
    this.gameService.getBirdList().subscribe({
      next: res => {
        this.birdList = res.filter((b: any) => b.assigned_to_coop == false);
        this.birdListActive = res.filter((b: any) => b.assigned_to_coop == true);
        console.log("active: ", this.birdListActive)
        console.log("inventory: ", this.birdList)
        if(this.modalRef) {
          const bird = [...this.birdList, ...this.birdListActive].find((e)=> e.id == this.birdModalId)
          if(bird) { 
            this.modalRef.componentInstance.bird = bird;
          } else {
            this.modalRef.close();
          }
        }
      }
    });
  }



  open = (bird: Bird) => {
    this.modalRef = this.modalService.open(BirdInfoComponent, { centered: true })
    this.modalRef.componentInstance.bird = bird;
    this.birdModalId = bird.id;
    this.modalRef.componentInstance.updateBirdList = () => {this.updateBirdList()};
    this.modalRef.componentInstance.updatePlayerInfo = () => {console.log("update player info"); this.updatePlayerData()};
  }

  constructor(@Inject('updatePlayerInfo') public updatePlayerData: () => void) {
    this.updatePagination();

    this.updateBirdList();
  }
}
