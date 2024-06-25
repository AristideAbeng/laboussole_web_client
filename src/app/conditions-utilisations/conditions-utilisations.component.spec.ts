import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsUtilisationsComponent } from './conditions-utilisations.component';

describe('ConditionsUtilisationsComponent', () => {
  let component: ConditionsUtilisationsComponent;
  let fixture: ComponentFixture<ConditionsUtilisationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionsUtilisationsComponent]
    });
    fixture = TestBed.createComponent(ConditionsUtilisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
