import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLoginDialogComponent } from './ask-login-dialog.component';

describe('AskLoginDialogComponent', () => {
  let component: AskLoginDialogComponent;
  let fixture: ComponentFixture<AskLoginDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskLoginDialogComponent]
    });
    fixture = TestBed.createComponent(AskLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
