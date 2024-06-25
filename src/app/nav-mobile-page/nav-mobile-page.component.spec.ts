import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMobilePageComponent } from './nav-mobile-page.component';

describe('NavMobilePageComponent', () => {
  let component: NavMobilePageComponent;
  let fixture: ComponentFixture<NavMobilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMobilePageComponent]
    });
    fixture = TestBed.createComponent(NavMobilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
