import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// import individual icons, don't forget to add it in library in constructor
import { faCoffee, faPen } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductAddComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ProductModule {
  constructor() {
    // add imported icon to library
    library.add(faCoffee, faPen);
  }
}
