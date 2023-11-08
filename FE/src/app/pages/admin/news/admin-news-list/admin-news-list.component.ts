import { Component } from '@angular/core';
import { IBlog } from 'src/app/interfaces/blog';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';
import { BlogService } from 'src/app/services/blog/blog.service';

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './admin-news-list.component.html',
  styleUrls: ['./admin-news-list.component.scss']
})
export class AdminNewsListComponent {
  blogs: IBlog[] = [];

  constructor(private BlogService: BlogService) {
    this.BlogService.getBlogs().subscribe((data) => {
      this.blogs = data
    }, error => {
      console.log(error.message);
    })
  }
  removeItem(id: any) {


    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Khi xoá không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi chắc chắn!',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa danh mục
        this.BlogService.removeBlog(id).subscribe(() => {
          Swal.fire(
            'Xoá!',
            'Tin tức đã được xoá.',
            'success'
          )
          const newBlog = this.blogs.filter((blog) => blog._id != id);
          this.blogs = newBlog
        }, error => {
          console.log(error.message);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hiển thị thông báo hủy xóa sản phẩm
        Swal.fire(
          'Huỷ',
          'Tin tức không được xoá :)',
          'error'
        )
      }
    })
  }
  formatCreatedAt(createdAt: any): string {
    const parsedDate = parseISO(createdAt);
    return format(parsedDate, 'dd/MM/yyyy');
  }
}

