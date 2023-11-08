import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewAddComponent } from './admin-new-add.component';

describe('AdminNewAddComponent', () => {
  let component: AdminNewAddComponent;
  let fixture: ComponentFixture<AdminNewAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewAddComponent]
    });
    fixture = TestBed.createComponent(AdminNewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
