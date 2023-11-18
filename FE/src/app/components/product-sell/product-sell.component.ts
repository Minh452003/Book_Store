import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyService } from 'src/currency.service';

@Component({
  selector: 'app-product-sell',
  templateUrl: './product-sell.component.html',
  styleUrls: ['./product-sell.component.scss']
})
export class ProductSellComponent implements OnInit {
  products: IProduct[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private productService: ProductService,
    private currencyService: CurrencyService
  ) {
    this.paginator = {} as MatPaginator
  }
  formatCurrency(number: any): string {
    if (number !== undefined && number !== null) {
      return this.currencyService.formatCurrency(number);
    } else {
      return ''; // Hoặc giá trị mặc định khác
    }
  }
  ngOnInit() {
    this.productService.getProductSell().subscribe((data: any) => this.products = data)
  }
}
