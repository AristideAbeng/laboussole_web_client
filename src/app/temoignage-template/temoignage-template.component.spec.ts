import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemoignageTemplateComponent } from './temoignage-template.component';

describe('TemoignageTemplateComponent', () => {
  let component: TemoignageTemplateComponent;
  let fixture: ComponentFixture<TemoignageTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemoignageTemplateComponent]
    });
    fixture = TestBed.createComponent(TemoignageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
