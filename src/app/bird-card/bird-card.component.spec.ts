import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdCardComponent } from './bird-card.component';

describe('BirdCardComponent', () => {
  let component: BirdCardComponent;
  let fixture: ComponentFixture<BirdCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirdCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
