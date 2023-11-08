import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewEditComponent } from './admin-new-edit.component';

describe('AdminNewEditComponent', () => {
  let component: AdminNewEditComponent;
  let fixture: ComponentFixture<AdminNewEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewEditComponent]
    });
    fixture = TestBed.createComponent(AdminNewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
