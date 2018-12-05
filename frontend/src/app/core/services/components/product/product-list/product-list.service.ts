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
  private updateProduct = new Subject<Product>();
  updateProduct$ = this.updateProduct.asObservable();
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient,
    private socket: Socket) {
  }

  getAllProducts() {
    return this.http.get<{ success: boolean, products: Product[] }>
      (`${this.API_URL}/products`);
  }

  get(id: string) {
    return this.http.get<{ success: boolean, products: Product[] }>(`${this.API_URL}/products/${encodeURIComponent(id)}`);
  }

  getNewProductsLive() {
    return this.socket
      .fromEvent('newProduct')
      .subscribe((data: Product) => {
        this.newProduct.next(data);
      });
  }

  getUpdatedProductsLive() {
    return this.socket
      .fromEvent('updateProduct')
      .subscribe((data: Product) => {
        this.updateProduct.next(data);
      });
  }

  destroying() {
    this.newProduct.unsubscribe();
    this.updateProduct.unsubscribe();
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }
}
