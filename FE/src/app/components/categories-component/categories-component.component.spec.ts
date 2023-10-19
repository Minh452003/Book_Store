import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponentComponent } from './categories-component.component';

describe('CategoriesComponentComponent', () => {
  let component: CategoriesComponentComponent;
  let fixture: ComponentFixture<CategoriesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesComponentComponent]
    });
    fixture = TestBed.createComponent(CategoriesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
