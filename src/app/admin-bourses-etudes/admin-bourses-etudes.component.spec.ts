import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoursesEtudesComponent } from './admin-bourses-etudes.component';

describe('AdminBoursesEtudesComponent', () => {
  let component: AdminBoursesEtudesComponent;
  let fixture: ComponentFixture<AdminBoursesEtudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBoursesEtudesComponent]
    });
    fixture = TestBed.createComponent(AdminBoursesEtudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
