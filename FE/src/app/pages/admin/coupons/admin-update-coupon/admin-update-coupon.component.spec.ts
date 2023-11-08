import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateCouponComponent } from './admin-update-coupon.component';

describe('AdminUpdateCouponComponent', () => {
  let component: AdminUpdateCouponComponent;
  let fixture: ComponentFixture<AdminUpdateCouponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUpdateCouponComponent]
    });
    fixture = TestBed.createComponent(AdminUpdateCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
