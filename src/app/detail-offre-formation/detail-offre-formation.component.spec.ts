import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOffreFormationComponent } from './detail-offre-formation.component';

describe('DetailOffreFormationComponent', () => {
  let component: DetailOffreFormationComponent;
  let fixture: ComponentFixture<DetailOffreFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOffreFormationComponent]
    });
    fixture = TestBed.createComponent(DetailOffreFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
