import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirTousMetiersComponent } from './voir-tous-metiers.component';

describe('VoirTousMetiersComponent', () => {
  let component: VoirTousMetiersComponent;
  let fixture: ComponentFixture<VoirTousMetiersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoirTousMetiersComponent]
    });
    fixture = TestBed.createComponent(VoirTousMetiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
