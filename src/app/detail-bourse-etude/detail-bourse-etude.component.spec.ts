import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBourseEtudeComponent } from './detail-bourse-etude.component';

describe('DetailBourseEtudeComponent', () => {
  let component: DetailBourseEtudeComponent;
  let fixture: ComponentFixture<DetailBourseEtudeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailBourseEtudeComponent]
    });
    fixture = TestBed.createComponent(DetailBourseEtudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
