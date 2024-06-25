import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMobileHeaderComponent } from './nav-mobile-header.component';

describe('NavMobileHeaderComponent', () => {
  let component: NavMobileHeaderComponent;
  let fixture: ComponentFixture<NavMobileHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMobileHeaderComponent]
    });
    fixture = TestBed.createComponent(NavMobileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
