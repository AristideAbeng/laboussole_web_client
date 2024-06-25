import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRoundButtonComponent } from './custom-round-button.component';

describe('CustomRoundButtonComponent', () => {
  let component: CustomRoundButtonComponent;
  let fixture: ComponentFixture<CustomRoundButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomRoundButtonComponent]
    });
    fixture = TestBed.createComponent(CustomRoundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
