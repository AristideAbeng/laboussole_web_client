import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreationCompteClientComponent } from './page-creation-compte-client.component';

describe('PageCreationCompteClientComponent', () => {
  let component: PageCreationCompteClientComponent;
  let fixture: ComponentFixture<PageCreationCompteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageCreationCompteClientComponent]
    });
    fixture = TestBed.createComponent(PageCreationCompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
