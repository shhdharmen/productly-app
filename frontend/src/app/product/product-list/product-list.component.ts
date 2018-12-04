import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductListService } from 'src/app/core/services/components/product/product-list/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newFlag: string;
  updateFlag: string;
  constructor(private productListService: ProductListService) { }

  ngOnInit() {
    this.productListService.getAllProducts().subscribe(data => {
      this.products = data.products;
    });
    this.productListService.getNewProductsLive();
    this.productListService.newProduct$.subscribe(product => {
      this.newFlag = product._id;
      this.products.push(product);
    });
    this.productListService.updateProduct$.subscribe(product => {
      this.updateFlag = product._id;
      this.products.splice(this.products.findIndex(value => value._id === product._id), 1, product);
    });
  }

}
