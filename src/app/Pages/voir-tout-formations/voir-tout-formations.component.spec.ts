import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirToutFormationsComponent } from './voir-tout-formations.component';

describe('VoirToutFormationsComponent', () => {
  let component: VoirToutFormationsComponent;
  let fixture: ComponentFixture<VoirToutFormationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoirToutFormationsComponent]
    });
    fixture = TestBed.createComponent(VoirToutFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
