import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInNavPageComponent } from './logged-in-nav-page.component';

describe('LoggedInNavPageComponent', () => {
  let component: LoggedInNavPageComponent;
  let fixture: ComponentFixture<LoggedInNavPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedInNavPageComponent]
    });
    fixture = TestBed.createComponent(LoggedInNavPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
