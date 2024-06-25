// src/app/services/cart.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  private cartCount = new BehaviorSubject<number>(0);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCart();
    }
  }

  /**
   * Carga los datos del carrito desde el almacenamiento local.
   */
  private loadCart(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem('currentUser') ?? 'null');
    if (loggedInUser) {
      const cartKey = `cart_${loggedInUser.username}`;
      const cart = JSON.parse(localStorage.getItem(cartKey) ?? '[]');
      this.cartItems.next(cart);
      this.cartCount.next(cart.length);
    }
  }

  /**
   * Obtiene los elementos del carrito como un observable.
   * @returns {Observable<Product[]>} Observable de los elementos del carrito.
   */
  getCartItems(): Observable<Product[]> {
    return this.cartItems.asObservable();
  }

  /**
   * Obtiene la cantidad de elementos en el carrito como un observable.
   * @returns {Observable<number>} Observable de la cantidad de elementos en el carrito.
   */
  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  /**
   * Añade un producto al carrito.
   * @param {Product} product - Producto a añadir.
   * @returns {boolean} Verdadero si el producto se añadió correctamente, falso si el usuario no está logueado.
   */
  addToCart(product: Product): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    if (!this.authService.isLoggedIn()) {
      return false;
    }

    const cart = this.cartItems.value;
    cart.push(product);
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser') ?? 'null');
    if (loggedInUser) {
      const cartKey = `cart_${loggedInUser.username}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      this.cartItems.next(cart);
      this.cartCount.next(cart.length);
    }
    return true;
  }

  /**
   * Elimina un producto del carrito.
   * @param {Product} product - Producto a eliminar.
   */
  removeItem(product: Product): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const cart = this.cartItems.value.filter(item => item.id !== product.id);
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser') ?? 'null');
    if (loggedInUser) {
      const cartKey = `cart_${loggedInUser.username}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      this.cartItems.next(cart);
      this.cartCount.next(cart.length);
    }
  }
}
