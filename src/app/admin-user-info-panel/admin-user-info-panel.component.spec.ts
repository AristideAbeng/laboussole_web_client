import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserInfoPanelComponent } from './admin-user-info-panel.component';

describe('AdminUserInfoPanelComponent', () => {
  let component: AdminUserInfoPanelComponent;
  let fixture: ComponentFixture<AdminUserInfoPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserInfoPanelComponent]
    });
    fixture = TestBed.createComponent(AdminUserInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
