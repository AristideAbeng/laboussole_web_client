import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalInfoPanelComponent } from './user-personal-info-panel.component';

describe('UserPersonalInfoPanelComponent', () => {
  let component: UserPersonalInfoPanelComponent;
  let fixture: ComponentFixture<UserPersonalInfoPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPersonalInfoPanelComponent]
    });
    fixture = TestBed.createComponent(UserPersonalInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
