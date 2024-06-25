import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilOptionBoxComponent } from './acceuil-option-box.component';

describe('AcceuilOptionBoxComponent', () => {
  let component: AcceuilOptionBoxComponent;
  let fixture: ComponentFixture<AcceuilOptionBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceuilOptionBoxComponent]
    });
    fixture = TestBed.createComponent(AcceuilOptionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
