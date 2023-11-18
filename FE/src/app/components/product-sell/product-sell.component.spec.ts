import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSellComponent } from './product-sell.component';

describe('ProductSellComponent', () => {
  let component: ProductSellComponent;
  let fixture: ComponentFixture<ProductSellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSellComponent]
    });
    fixture = TestBed.createComponent(ProductSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
