// src/app/services/product.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private productsUrl = 'assets/data/products.json';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadProducts();
    }
  }

  /**
   * Carga los datos de los productos desde el archivo JSON y los guarda en el almacenamiento local.
   */
  private loadProducts(): void {
    this.http.get<Product[]>(this.productsUrl).subscribe(products => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('productos', JSON.stringify(products));
      }
      this.productsSubject.next(products);
    });
  }

  /**
   * Obtiene todos los productos como un observable.
   * @returns {Observable<Product[]>} Observable de un array de productos.
   */
  getProducts(): Observable<Product[]> {
    if (isPlatformBrowser(this.platformId)) {
      const products = JSON.parse(localStorage.getItem('productos') ?? '[]');
      return of(products);
    } else {
      return this.productsSubject.asObservable();
    }
  }

  /**
   * Obtiene los productos filtrados por categoría como un observable.
   * @param {string} category - Categoría por la que se desea filtrar los productos.
   * @returns {Observable<Product[]>} Observable de un array de productos filtrados por categoría.
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    if (isPlatformBrowser(this.platformId)) {
      const products = JSON.parse(localStorage.getItem('productos') ?? '[]');
      const filteredProducts = products.filter((product: Product) => product.category === category);
      return of(filteredProducts);
    } else {
      return this.productsSubject.asObservable().pipe(
        map(products => products.filter(product => product.category === category))
      );
    }
  }
}
