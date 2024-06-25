import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreFormationBoxComponent } from './offre-formation-box.component';

describe('OffreFormationBoxComponent', () => {
  let component: OffreFormationBoxComponent;
  let fixture: ComponentFixture<OffreFormationBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreFormationBoxComponent]
    });
    fixture = TestBed.createComponent(OffreFormationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
