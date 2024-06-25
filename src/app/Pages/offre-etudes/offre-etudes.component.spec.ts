import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreEtudesComponent } from './offre-etudes.component';

describe('OffreEtudesComponent', () => {
  let component: OffreEtudesComponent;
  let fixture: ComponentFixture<OffreEtudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreEtudesComponent]
    });
    fixture = TestBed.createComponent(OffreEtudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
