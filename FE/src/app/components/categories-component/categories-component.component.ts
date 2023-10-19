import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ICategory } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-categories-component',
  templateUrl: './categories-component.component.html',
  styleUrls: ['./categories-component.component.scss']
})
export class CategoriesComponentComponent {
  // categories: ICategory[] = [];
  // constructor(private CategoryService: CategoryService) {
  //   this.CategoryService.getCategories().subscribe((data: any) => {
  //     this.categories = data.category.docs
  //   }, error => {
  //     console.log(error.message);
  //   })
  // }
  categories: ICategory[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private CategoryService: CategoryService) {
    this.paginator = {} as MatPaginator

  }
  pagination = {
    hasNextPage: true,
    hasPrevPage: false,
    limit: 1,
    nextPage: 1,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 1,
    totalPages: 1
  }

  limit = 4

  formattedPagination: any = {}

  ngOnInit() {
    this.getCategory(1);
  }

  pageIndex: any
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex // Lấy chỉ mục trang mới
    this.limit = event.pageSize // Lấy kích thước trang
    this.getCategory(this.pageIndex + 1) // Lấy dữ liệu cho trang mới
  }
  getCategory(page: number): void {
    this.CategoryService.getAllProducts(this.limit, page).subscribe((res: any) => {
      this.categories = res.category.docs
      this.formattedPagination.length = res.category.totalDocs
      this.formattedPagination.pageIndex = res.category.page - 1
      this.formattedPagination.pageSize = res.category.limit
      this.formattedPagination.pageSizeOptions = [3, 6]
      this.formattedPagination.totalPages = res.category.totalPages
      this.formattedPagination.page = res.category.page
    })
  }
}
