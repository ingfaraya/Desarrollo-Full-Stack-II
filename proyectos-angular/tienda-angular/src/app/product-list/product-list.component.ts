import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.products = this.category ? 
        this.productService.getProductsByCategory(this.category) : 
        this.productService.getProducts();
    });
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
  }
}
