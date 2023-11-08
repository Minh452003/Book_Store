import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCouponComponent } from './admin-add-coupon.component';

describe('AdminAddCouponComponent', () => {
  let component: AdminAddCouponComponent;
  let fixture: ComponentFixture<AdminAddCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddCouponComponent]
    });
    fixture = TestBed.createComponent(AdminAddCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
