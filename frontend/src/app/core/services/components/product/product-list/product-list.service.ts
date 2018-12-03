import { Injectable } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/models/product';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class ProductListService {
  private newProduct = new Subject<Product>();
  newProduct$ = this.newProduct.asObservable();
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient,
    private socket: Socket) { }

  getAllProducts() {
    return this.http.get<{ success: boolean, products: Product[] }>
      (`${this.API_URL}/products`);
  }

  getNewProductsLive() {
    return this.socket
      .fromEvent('newProduct')
      .subscribe((data: Product) => {
        this.newProduct.next(data);
      });
  }
}
