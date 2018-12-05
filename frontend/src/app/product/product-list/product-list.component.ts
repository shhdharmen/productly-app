import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductListService } from 'src/app/core/services/components/product/product-list/product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  newFlag: string;
  updateFlag: string;
  constructor(private productListService: ProductListService, private router: Router) { }

  ngOnInit() {
    this.productListService.getAllProducts().subscribe(data => {
      this.products = data.products;
    });
    this.productListService.getNewProductsLive();
    this.productListService.getUpdatedProductsLive();
    this.productListService.newProduct$.subscribe(product => {
      this.newFlag = product._id;
      this.products.push(product);
    });
    this.productListService.updateProduct$.subscribe(product => {
      this.updateFlag = product._id;
      this.products.splice(this.products.findIndex(value => value._id === product._id), 1, product);
    });
  }

  ngOnDestroy() {
    this.productListService.destroying();
  }
}
