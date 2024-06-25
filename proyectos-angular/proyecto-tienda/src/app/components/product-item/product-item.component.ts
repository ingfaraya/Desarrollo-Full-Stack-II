// src/app/components/product-item/product-item.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService, private router: Router) {}

  addToCart(): void {
    const success = this.cartService.addToCart(this.product);
    if (!success) {
      this.router.navigate(['/login']);
    }
  }
}
