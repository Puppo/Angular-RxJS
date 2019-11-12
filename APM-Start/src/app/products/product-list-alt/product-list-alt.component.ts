import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, EMPTY } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId;

  products$: Observable<Product[]> = this.productService.products$.pipe(
    catchError(this.handleError())
  );

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }

  private handleError() {
    return err => {
      this.errorMessage = err;
      return EMPTY;
    };
  }
}
