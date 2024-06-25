import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileDialogComponent } from './complete-profile-dialog.component';

describe('CompleteProfileDialogComponent', () => {
  let component: CompleteProfileDialogComponent;
  let fixture: ComponentFixture<CompleteProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteProfileDialogComponent]
    });
    fixture = TestBed.createComponent(CompleteProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
