import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemoignageBoxComponent } from './temoignage-box.component';

describe('TemoignageBoxComponent', () => {
  let component: TemoignageBoxComponent;
  let fixture: ComponentFixture<TemoignageBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemoignageBoxComponent]
    });
    fixture = TestBed.createComponent(TemoignageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
