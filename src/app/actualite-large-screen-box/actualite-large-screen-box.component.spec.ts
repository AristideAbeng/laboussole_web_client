import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiteLargeScreenBoxComponent } from './actualite-large-screen-box.component';

describe('ActualiteLargeScreenBoxComponent', () => {
  let component: ActualiteLargeScreenBoxComponent;
  let fixture: ComponentFixture<ActualiteLargeScreenBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualiteLargeScreenBoxComponent]
    });
    fixture = TestBed.createComponent(ActualiteLargeScreenBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
