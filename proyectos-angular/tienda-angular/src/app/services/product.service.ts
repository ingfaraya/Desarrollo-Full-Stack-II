import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { name: 'Catan', description: 'Juego de estrategia donde los jugadores compiten por colonizar una isla.', price: 45, discount: 10, image: 'catan.jpg', category: 'strategy' },
    { name: 'Risk', description: 'Juego de estrategia militar en el que los jugadores controlan ejércitos para conquistar el mundo.', price: 40, discount: 5, image: 'risk.jpg', category: 'strategy' },
    // Agrega más productos aquí, asegurándote de incluir la propiedad `category`
  ];

  private cart: Product[] = [];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): Product[] {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
}
