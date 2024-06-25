import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFilieresComponent } from './details-filieres.component';

describe('DetailsFilieresComponent', () => {
  let component: DetailsFilieresComponent;
  let fixture: ComponentFixture<DetailsFilieresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFilieresComponent]
    });
    fixture = TestBed.createComponent(DetailsFilieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
