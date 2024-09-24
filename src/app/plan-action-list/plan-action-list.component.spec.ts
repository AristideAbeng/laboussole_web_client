import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanActionListComponent } from './plan-action-list.component';

describe('PlanActionListComponent', () => {
  let component: PlanActionListComponent;
  let fixture: ComponentFixture<PlanActionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanActionListComponent]
    });
    fixture = TestBed.createComponent(PlanActionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
