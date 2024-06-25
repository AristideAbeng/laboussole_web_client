import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminvoyagesEtudesComponent } from './adminvoyages-etudes.component';

describe('AdminvoyagesEtudesComponent', () => {
  let component: AdminvoyagesEtudesComponent;
  let fixture: ComponentFixture<AdminvoyagesEtudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminvoyagesEtudesComponent]
    });
    fixture = TestBed.createComponent(AdminvoyagesEtudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
