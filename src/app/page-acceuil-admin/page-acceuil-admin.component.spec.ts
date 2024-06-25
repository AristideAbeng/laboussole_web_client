import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilAdminComponent } from './page-acceuil-admin.component';

describe('PageAcceuilAdminComponent', () => {
  let component: PageAcceuilAdminComponent;
  let fixture: ComponentFixture<PageAcceuilAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAcceuilAdminComponent]
    });
    fixture = TestBed.createComponent(PageAcceuilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
