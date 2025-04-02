import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooseListComponent } from './bird-list.component';

describe('GooseListComponent', () => {
  let component: GooseListComponent;
  let fixture: ComponentFixture<GooseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GooseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GooseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
