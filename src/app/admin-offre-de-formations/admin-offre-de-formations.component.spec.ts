import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOffreDeFormationsComponent } from './admin-offre-de-formations.component';

describe('AdminOffreDeFormationsComponent', () => {
  let component: AdminOffreDeFormationsComponent;
  let fixture: ComponentFixture<AdminOffreDeFormationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOffreDeFormationsComponent]
    });
    fixture = TestBed.createComponent(AdminOffreDeFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
