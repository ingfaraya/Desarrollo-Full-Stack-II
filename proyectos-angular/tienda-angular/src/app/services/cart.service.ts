import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  constructor() { }

  addToCart(product: Product): void {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): Product[] {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  getTotal(): number {
    return this.cart.reduce((acc, product) => acc + product.price * (1 - (product.discount || 0) / 100), 0);
  }
}
