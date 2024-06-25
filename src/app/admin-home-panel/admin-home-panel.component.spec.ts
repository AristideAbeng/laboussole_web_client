import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomePanelComponent } from './admin-home-panel.component';

describe('AdminHomePanelComponent', () => {
  let component: AdminHomePanelComponent;
  let fixture: ComponentFixture<AdminHomePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHomePanelComponent]
    });
    fixture = TestBed.createComponent(AdminHomePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
