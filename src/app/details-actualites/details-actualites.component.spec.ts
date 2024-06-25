import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsActualitesComponent } from './details-actualites.component';

describe('DetailsActualitesComponent', () => {
  let component: DetailsActualitesComponent;
  let fixture: ComponentFixture<DetailsActualitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsActualitesComponent]
    });
    fixture = TestBed.createComponent(DetailsActualitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
