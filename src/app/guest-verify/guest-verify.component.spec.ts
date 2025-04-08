import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVerifyComponent } from './guest-verify.component';

describe('GuestVerifyComponent', () => {
  let component: GuestVerifyComponent;
  let fixture: ComponentFixture<GuestVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
