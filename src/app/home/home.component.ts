import { Component, Input } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgComponentOutlet } from '@angular/common';
import { BirdListComponent } from '../bird-list/bird-list.component';

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
  imports: [NgbNavModule, NgComponentOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  _active: string | null = 'top';
  expand_pills = false;
  inputs = { value: this.active }

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
    }
    return Placeholder;
  }

  constructor() {
    this._active = localStorage.getItem('homeTab')
  }
}
