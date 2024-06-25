import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreInteretsComponent } from './centre-interets.component';

describe('CentreInteretsComponent', () => {
  let component: CentreInteretsComponent;
  let fixture: ComponentFixture<CentreInteretsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentreInteretsComponent]
    });
    fixture = TestBed.createComponent(CentreInteretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
