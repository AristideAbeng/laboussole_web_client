import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNotificationsComponent } from './details-notifications.component';

describe('DetailsNotificationsComponent', () => {
  let component: DetailsNotificationsComponent;
  let fixture: ComponentFixture<DetailsNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsNotificationsComponent]
    });
    fixture = TestBed.createComponent(DetailsNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
