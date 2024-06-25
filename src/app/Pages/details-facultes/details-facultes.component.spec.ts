import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFacultesComponent } from './details-facultes.component';

describe('DetailsFacultesComponent', () => {
  let component: DetailsFacultesComponent;
  let fixture: ComponentFixture<DetailsFacultesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsFacultesComponent]
    });
    fixture = TestBed.createComponent(DetailsFacultesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
