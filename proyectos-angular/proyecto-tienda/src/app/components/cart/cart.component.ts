// src/app/components/cart/cart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<Product[]>;
  cartSubtotal: number = 0;
  cartDiscount: number = 0;
  cartTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.cartItems$.subscribe(items => {
      this.cartSubtotal = items.reduce((total, item) => total + item.price, 0);
      this.cartDiscount = this.calculateDiscount(this.cartSubtotal);
      this.cartTotal = this.cartSubtotal - this.cartDiscount;
    });
  }

  calculateDiscount(subtotal: number): number {
    const discountRate = 0.1; // 10% de descuento
    return subtotal * discountRate;
  }

  removeItem(item: Product): void {
    this.cartService.removeItem(item);
    this.calculateTotals();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
