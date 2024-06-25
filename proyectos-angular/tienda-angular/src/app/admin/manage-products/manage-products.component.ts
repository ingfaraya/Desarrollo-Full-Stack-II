import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../services/product.model';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private adminService: AdminService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  openProductModal(product: Product) {
    const modalRef = this.modalService.open(ProductModalComponent);
    modalRef.componentInstance.product = product;

    modalRef.result.then((result) => {
      if (result) {
        if (product.id === 0) {
          this.adminService.addProduct(result).subscribe(() => {
            this.loadProducts();
          });
        } else {
          this.adminService.updateProduct(result).subscribe(() => {
            this.loadProducts();
          });
        }
      }
    }).catch((error) => {
      console.log('Modal dismissed', error);
    });
  }

  addProduct() {
    const newProduct: Product = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      discount: 0,
      category: '',
      image: ''
    };
    this.openProductModal(newProduct);
  }

  editProduct(product: Product) {
    this.openProductModal(product);
  }

  deleteProduct(productId: number) {
    this.adminService.deleteProduct(productId).subscribe(() => {
      this.loadProducts();
    });
  }
}
