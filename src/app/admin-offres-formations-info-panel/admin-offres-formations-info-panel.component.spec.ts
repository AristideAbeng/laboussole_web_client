import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOffresFormationsInfoPanelComponent } from './admin-offres-formations-info-panel.component';

describe('AdminOffresFormationsInfoPanelComponent', () => {
  let component: AdminOffresFormationsInfoPanelComponent;
  let fixture: ComponentFixture<AdminOffresFormationsInfoPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOffresFormationsInfoPanelComponent]
    });
    fixture = TestBed.createComponent(AdminOffresFormationsInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
