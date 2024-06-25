import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/services/product.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() product: Product;
  productForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [this.product.id],
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, Validators.required],
      discount: [this.product.discount],
      category: [this.product.category, Validators.required],
      imageUrl: [this.product.image]
    });
  }

  onSave() {
    if (this.productForm.valid) {
      this.activeModal.close(this.productForm.value);
    }
  }
}
