import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTemplateComponent } from './faq-template.component';

describe('FaqTemplateComponent', () => {
  let component: FaqTemplateComponent;
  let fixture: ComponentFixture<FaqTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqTemplateComponent]
    });
    fixture = TestBed.createComponent(FaqTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
