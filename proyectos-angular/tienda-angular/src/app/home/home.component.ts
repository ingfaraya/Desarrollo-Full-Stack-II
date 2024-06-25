import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    const allProducts = this.productService.getProducts();
    const categories = ['strategy', 'family', 'party', 'kids'];
    this.categories = categories.map(category => ({
      name: this.getCategoryName(category),
      products: allProducts.filter(product => product.category === category)
    }));
  }

  getCategoryName(category: string) {
    switch (category) {
      case 'strategy': return 'Juegos de Estrategia';
      case 'family': return 'Juegos Familiares';
      case 'party': return 'Juegos de Fiesta';
      case 'kids': return 'Juegos Infantiles';
      default: return '';
    }
  }

  getProductGroups(products: Product[]) {
    const groups = [];
    for (let i = 0; i < products.length; i += 3) {
      groups.push(products.slice(i, i + 3));
    }
    return groups;
  }
}
