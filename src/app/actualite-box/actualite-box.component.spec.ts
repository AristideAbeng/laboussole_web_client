import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteBoxComponent } from './actualite-box.component';

describe('ActualiteBoxComponent', () => {
  let component: ActualiteBoxComponent;
  let fixture: ComponentFixture<ActualiteBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualiteBoxComponent]
    });
    fixture = TestBed.createComponent(ActualiteBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
