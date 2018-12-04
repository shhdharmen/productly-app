import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductAddService } from '../../core/services/components/product/product-list/product-add.service';
import { ToastrService } from 'ngx-toastr';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  constructor(private fb: FormBuilder,
    private productAddService: ProductAddService,
    private toastr: ToastrService,
    private socket: Socket) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      'name': [null, Validators.required],
      'price': [null, Validators.required],
      'quantity': [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }
    this.productAddService.add(this.productForm.value).subscribe(data => {
      this.toastr.success(null, data.message);
    });
  }

}
