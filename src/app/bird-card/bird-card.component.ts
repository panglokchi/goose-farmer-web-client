import { Component, Input } from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common'

@Component({
  selector: 'app-bird-card',
  imports: [NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './bird-card.component.html',
  styleUrl: './bird-card.component.css'
})
export class BirdCardComponent {
  @Input()  bird: any;
  constructor() {

  }
}
