import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common'
import { Bird } from '../bird';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bird-card',
  imports: [NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgbProgressbar],
  templateUrl: './bird-card.component.html',
  styleUrl: './bird-card.component.css'
})
export class BirdCardComponent implements OnInit {
  @Input() bird: any;
  @Input() visible = true;
  @Input() placeholder = false;
  public egg_bar = 50;
  public egg_bar_string = "";
  @Input() hoverEffect = true;
  @Input() clickEffect = true;

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

  updateTimer() {
    if (this.bird.assigned_to_coop && this.bird.egg_timer > 0) {
      this.bird.egg_timer -= 1;
      if (this.bird.egg_timer < 0) {
        this.bird.egg_timer = 0;
      }
      this.egg_bar = this.bird.egg_timer/86400 * 100
      this.egg_bar_string = this.formatDuration(this.bird.egg_timer)
    }
  }

  ngOnInit() {
    if(this.bird == null) {
      this.bird = {
        icon: '🪺',
      }
    }
    this.egg_bar = this.bird.egg_timer/86400 * 100
    this.egg_bar_string = this.formatDuration(this.bird.egg_timer)
    setInterval(()=>{this.updateTimer();}, 1000)
  }
  constructor() {
  }
}
