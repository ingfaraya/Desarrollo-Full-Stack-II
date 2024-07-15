import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductItemComponent } from './product-item.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItemComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [CartService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = {
      category: 'Test Category',
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      discount: 0,
      image: 'test-image.jpg'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
