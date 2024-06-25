import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoyagesEtudesInfoPanelComponent } from './admin-voyages-etudes-info-panel.component';

describe('AdminVoyagesEtudesInfoPanelComponent', () => {
  let component: AdminVoyagesEtudesInfoPanelComponent;
  let fixture: ComponentFixture<AdminVoyagesEtudesInfoPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVoyagesEtudesInfoPanelComponent]
    });
    fixture = TestBed.createComponent(AdminVoyagesEtudesInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
