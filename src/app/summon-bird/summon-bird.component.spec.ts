import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonBirdComponent } from './summon-bird.component';

describe('SummonBirdComponent', () => {
  let component: SummonBirdComponent;
  let fixture: ComponentFixture<SummonBirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummonBirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonBirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
