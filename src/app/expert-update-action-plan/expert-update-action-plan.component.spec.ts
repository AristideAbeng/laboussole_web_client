import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertUpdateActionPlanComponent } from './expert-update-action-plan.component';

describe('ExpertUpdateActionPlanComponent', () => {
  let component: ExpertUpdateActionPlanComponent;
  let fixture: ComponentFixture<ExpertUpdateActionPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertUpdateActionPlanComponent]
    });
    fixture = TestBed.createComponent(ExpertUpdateActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
