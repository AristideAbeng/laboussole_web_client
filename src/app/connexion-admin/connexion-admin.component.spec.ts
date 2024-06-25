import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionAdminComponent } from './connexion-admin.component';

describe('ConnexionAdminComponent', () => {
  let component: ConnexionAdminComponent;
  let fixture: ComponentFixture<ConnexionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnexionAdminComponent]
    });
    fixture = TestBed.createComponent(ConnexionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
