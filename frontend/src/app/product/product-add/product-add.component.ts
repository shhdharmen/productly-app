import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductAddService } from '../../core/services/components/product/product-list/product-add.service';
import { ToastrService } from 'ngx-toastr';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from 'src/app/core/services/components/product/product-list/product-list.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  productId: any;
  editing: boolean;

  @ViewChild('productName') productName: ElementRef;
  constructor(private fb: FormBuilder,
    private productAddService: ProductAddService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private productListService: ProductListService,
    private router: Router) { }

  ngOnInit() {
    this.initForm().subscribe(_ => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.productId = params['id'];
        if (this.productId) {
          this.editing = true;
          this.fillForm();
        }
      });
    });
  }
  private fillForm() {
    this.productListService.get(this.productId).subscribe(resp => {
      // below we can handle error if length is more than 1
      const product = resp.products[0];
      this.productForm.get('name').setValue(product.name);
      this.productForm.get('price').setValue(product.price);
      this.productForm.get('quantity').setValue(product.quantity);
    });
  }

  private initForm(): Observable<null> {
    this.productForm = this.fb.group({
      'name': [null, Validators.required],
      'price': [null, Validators.required],
      'quantity': [null, Validators.required]
    });
    this.productName.nativeElement.focus();
    return of(null);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    if (!this.editing) {
      this.productAddService.add(this.productForm.value).subscribe(data => {
        this.toastr.success(null, data.message);
        // to get rid of validation error, setting a blank space value
        this.productForm.controls['name'].setValue(' ');
        this.productForm.controls['price'].setValue(0);
        this.productForm.controls['quantity'].setValue(0);
        this.productName.nativeElement.focus();
      });
    } else {
      this.productAddService.update(this.productId, this.productForm.value).subscribe(resp => {
        this.toastr.success(resp.message);
        this.router.navigateByUrl('product/list');
      });
    }
  }

}
