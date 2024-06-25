import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFaqPageComponent } from './single-faq-page.component';

describe('SingleFaqPageComponent', () => {
  let component: SingleFaqPageComponent;
  let fixture: ComponentFixture<SingleFaqPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFaqPageComponent]
    });
    fixture = TestBed.createComponent(SingleFaqPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
