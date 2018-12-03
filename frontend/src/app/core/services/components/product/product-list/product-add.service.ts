import { Injectable } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { Product } from 'src/app/core/models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: CoreModule
})
export class ProductAddService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  add(product: Product) {
    return this.http.post<{ success: boolean, message: string, product: Product }>
      (`${this.API_URL}/products`, product);
  }
}
