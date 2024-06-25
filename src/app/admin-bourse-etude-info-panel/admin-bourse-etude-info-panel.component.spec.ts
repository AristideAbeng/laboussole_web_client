import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBourseEtudeInfoPanelComponent } from './admin-bourse-etude-info-panel.component';

describe('AdminBourseEtudeInfoPanelComponent', () => {
  let component: AdminBourseEtudeInfoPanelComponent;
  let fixture: ComponentFixture<AdminBourseEtudeInfoPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBourseEtudeInfoPanelComponent]
    });
    fixture = TestBed.createComponent(AdminBourseEtudeInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
