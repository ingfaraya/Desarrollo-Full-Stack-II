// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartCount$: Observable<number> = this.cartService.getCartCount();
  currentUser$: Observable<any> = this.authService.getCurrentUser();
  isAdmin$: Observable<boolean> = this.authService.isAdmin();

  constructor(private cartService: CartService, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
