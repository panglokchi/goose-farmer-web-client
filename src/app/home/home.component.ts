import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  imports: [NgbNavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  active = 'top';
  expand_pills = false;

  togglePills() {
    this.expand_pills = !this.expand_pills;
  }

  showPills() {
    this.expand_pills = true;
  }

  hidePills() {
    this.expand_pills = false;
  }
}
