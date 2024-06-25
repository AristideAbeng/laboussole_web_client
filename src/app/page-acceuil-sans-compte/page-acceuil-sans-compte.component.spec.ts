import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilSansCompteComponent } from './page-acceuil-sans-compte.component';

describe('PageAcceuilSansCompteComponent', () => {
  let component: PageAcceuilSansCompteComponent;
  let fixture: ComponentFixture<PageAcceuilSansCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAcceuilSansCompteComponent]
    });
    fixture = TestBed.createComponent(PageAcceuilSansCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
