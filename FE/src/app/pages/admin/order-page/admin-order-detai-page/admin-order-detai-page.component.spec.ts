import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetaiPageComponent } from './admin-order-detai-page.component';

describe('AdminOrderDetaiPageComponent', () => {
  let component: AdminOrderDetaiPageComponent;
  let fixture: ComponentFixture<AdminOrderDetaiPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderDetaiPageComponent]
    });
    fixture = TestBed.createComponent(AdminOrderDetaiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
