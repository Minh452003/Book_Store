import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentDetailComponent } from './admin-comment-detail.component';

describe('AdminCommentDetailComponent', () => {
  let component: AdminCommentDetailComponent;
  let fixture: ComponentFixture<AdminCommentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCommentDetailComponent]
    });
    fixture = TestBed.createComponent(AdminCommentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
