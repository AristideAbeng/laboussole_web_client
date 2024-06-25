import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreDeFormationsComponent } from './offre-de-formations.component';

describe('OffreDeFormationsComponent', () => {
  let component: OffreDeFormationsComponent;
  let fixture: ComponentFixture<OffreDeFormationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreDeFormationsComponent]
    });
    fixture = TestBed.createComponent(OffreDeFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
