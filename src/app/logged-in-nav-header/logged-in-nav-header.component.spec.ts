import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInNavHeaderComponent } from './logged-in-nav-header.component';

describe('LoggedInNavHeaderComponent', () => {
  let component: LoggedInNavHeaderComponent;
  let fixture: ComponentFixture<LoggedInNavHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedInNavHeaderComponent]
    });
    fixture = TestBed.createComponent(LoggedInNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
