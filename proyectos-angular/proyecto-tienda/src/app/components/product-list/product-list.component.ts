// src/app/components/product-list/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products$: Observable<Product[]>;

  constructor(private productsService: ProductService, private route: ActivatedRoute) {
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const category = params.get('category');
        return category ? this.productsService.getProductsByCategory(category) : this.productsService.getProducts();
      })
    );
  }
}
