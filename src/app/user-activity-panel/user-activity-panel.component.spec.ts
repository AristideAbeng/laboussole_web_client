import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityPanelComponent } from './user-activity-panel.component';

describe('UserActivityPanelComponent', () => {
  let component: UserActivityPanelComponent;
  let fixture: ComponentFixture<UserActivityPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserActivityPanelComponent]
    });
    fixture = TestBed.createComponent(UserActivityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
