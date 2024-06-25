import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConnexionClientComponent } from './page-connexion-client.component';

describe('PageConnexionClientComponent', () => {
  let component: PageConnexionClientComponent;
  let fixture: ComponentFixture<PageConnexionClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageConnexionClientComponent]
    });
    fixture = TestBed.createComponent(PageConnexionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
