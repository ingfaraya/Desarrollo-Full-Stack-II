import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Product } from '../services/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor(private modalService: NgbModal) {}

  addToCart(product: Product) {
    this.items.push(product);
    this.showConfirmationModal("¡El producto ha sido agregado al carrito con éxito!");
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getCartItems() {
    return this.getItems();  // Método para obtener los elementos del carrito
  }

  getCartItemCount() {
    return this.items.length;
  }

  getTotal() {
    return this.items.reduce((total, product) => total + product.price, 0);  // Método para calcular el total
  }

  private showConfirmationModal(message: string) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = message;
  }
}
