import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTemoignageDialogComponent } from './input-temoignage-dialog.component';

describe('InputTemoignageDialogComponent', () => {
  let component: InputTemoignageDialogComponent;
  let fixture: ComponentFixture<InputTemoignageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTemoignageDialogComponent]
    });
    fixture = TestBed.createComponent(InputTemoignageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
