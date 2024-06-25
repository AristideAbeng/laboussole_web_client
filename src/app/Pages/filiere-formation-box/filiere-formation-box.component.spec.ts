import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereFormationBoxComponent } from './filiere-formation-box.component';

describe('FiliereFormationBoxComponent', () => {
  let component: FiliereFormationBoxComponent;
  let fixture: ComponentFixture<FiliereFormationBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiliereFormationBoxComponent]
    });
    fixture = TestBed.createComponent(FiliereFormationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
