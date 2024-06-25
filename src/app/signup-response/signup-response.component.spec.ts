import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupResponseComponent } from './signup-response.component';

describe('SignupResponseComponent', () => {
  let component: SignupResponseComponent;
  let fixture: ComponentFixture<SignupResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupResponseComponent]
    });
    fixture = TestBed.createComponent(SignupResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
