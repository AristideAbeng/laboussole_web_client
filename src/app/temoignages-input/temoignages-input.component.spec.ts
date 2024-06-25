import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemoignagesInputComponent } from './temoignages-input.component';

describe('TemoignagesInputComponent', () => {
  let component: TemoignagesInputComponent;
  let fixture: ComponentFixture<TemoignagesInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemoignagesInputComponent]
    });
    fixture = TestBed.createComponent(TemoignagesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
