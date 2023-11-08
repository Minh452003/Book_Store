import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comments/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-comment-detail',
  templateUrl: './admin-comment-detail.component.html',
  styleUrls: ['./admin-comment-detail.component.scss']
})
export class AdminCommentDetailComponent {
  comments?: any
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      const id = String(params.get('id'));
      this.commentService.getCommentByProduct(id).subscribe((comment: any) => {
        this.comments = comment.comments;
      })
    })
  }

  onHandleRemove(id: any) {

    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xoá thì không thể phục hồi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa sản phẩm
        this.commentService.removeComment(id).subscribe(() => {
          Swal.fire(
            'Xoá thành công!',
            'Đánh giá đã được xoá.',
            'success'
          )
          this.comments = this.comments.filter((item: any) => item._id !== id);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Huỷ',
          'Đánh giá chưa được xoá :)',
          'error'
        )
      }
    })




  }
}
