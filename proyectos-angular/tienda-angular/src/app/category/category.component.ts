import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryName: string;
  products: Product[] = [];
  paginatedProducts: Product[][] = [];
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = this.getCategoryName(params['category']);
      this.loadProducts(params['category']);
    });
  }

  loadProducts(category: string) {
    this.products = this.productService.getProductsByCategory(category);
    this.paginateProducts();
  }

  paginateProducts() {
    this.paginatedProducts = [];
    for (let i = 0; i < this.products.length; i += 9) {
      this.paginatedProducts.push(this.products.slice(i, i + 9));
    }
    this.totalPages = this.paginatedProducts.length;
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

  setPage(page: number) {
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }
}
