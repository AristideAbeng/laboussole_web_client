import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreInteretBoxComponent } from './centre-interet-box.component';

describe('CentreInteretBoxComponent', () => {
  let component: CentreInteretBoxComponent;
  let fixture: ComponentFixture<CentreInteretBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentreInteretBoxComponent]
    });
    fixture = TestBed.createComponent(CentreInteretBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
