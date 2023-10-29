import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderPageComponent } from './list-order-page.component';

describe('ListOrderPageComponent', () => {
  let component: ListOrderPageComponent;
  let fixture: ComponentFixture<ListOrderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOrderPageComponent]
    });
    fixture = TestBed.createComponent(ListOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
