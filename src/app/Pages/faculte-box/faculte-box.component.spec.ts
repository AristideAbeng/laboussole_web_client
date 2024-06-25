import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaculteBoxComponent } from './faculte-box.component';

describe('FaculteBoxComponent', () => {
  let component: FaculteBoxComponent;
  let fixture: ComponentFixture<FaculteBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaculteBoxComponent]
    });
    fixture = TestBed.createComponent(FaculteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
