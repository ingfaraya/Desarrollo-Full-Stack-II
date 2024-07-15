// src/app/services/products.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Definición directa de la interfaz Product
interface Product {
  category: string;
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private productsUrl = 'assets/data/products.json';

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http.get<Product[]>(this.productsUrl).subscribe(products => {
      localStorage.setItem('productos', JSON.stringify(products));
      this.productsSubject.next(products);
    });
  }

  getProducts(): Observable<Product[]> {
    const products = JSON.parse(localStorage.getItem('productos') ?? '[]');
    return of(products);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const products = JSON.parse(localStorage.getItem('productos') ?? '[]');
    const filteredProducts = products.filter((product: Product) => product.category === category);
    return of(filteredProducts);
  }
}
