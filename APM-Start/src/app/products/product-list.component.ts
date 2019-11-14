import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable, EMPTY, combineLatest, BehaviorSubject } from 'rxjs';

import { Product } from './product';
import { ProductService } from './product.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories$ = this.productCategoryService.productCategories$;
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();


  products$: Observable<
    Product[]
  > = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$
    ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter(
        product =>
          !selectedCategoryId ||
          product.categoryId === selectedCategoryId
      )
    )
  );

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService) {}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }

  private handleError() {
    return err => {
      this.errorMessage = err;
      return EMPTY;
    };
  }
}
