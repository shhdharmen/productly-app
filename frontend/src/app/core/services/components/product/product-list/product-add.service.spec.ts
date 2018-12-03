import { TestBed } from '@angular/core/testing';

import { ProductAddService } from './product-add.service';

describe('ProductAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductAddService = TestBed.get(ProductAddService);
    expect(service).toBeTruthy();
  });
});
