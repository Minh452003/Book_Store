import { Component } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comments/comment.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent {
  comments: any[] = [];
  constructor(private commentService: CommentService,
  ) {
    this.commentService.getAllComment().subscribe((data: any) => {
      this.comments = data.products
    }, error => {
      console.log(error.message);
    })
  }
}
