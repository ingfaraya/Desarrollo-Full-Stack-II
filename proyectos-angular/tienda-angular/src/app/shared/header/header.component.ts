import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { AuthService } from '../../auth/auth.service';
import { CartService } from '../../cart/cart.service';  // Importar el CartService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private modalService: NgbModal, 
    public authService: AuthService,
    public cartService: CartService  // Inyectar el CartService
  ) {}

  openLoginModal() {
    this.modalService.open(LoginComponent);
  }

  openRegisterModal() {
    this.modalService.open(RegisterComponent);
  }

  logout() {
    this.authService.logout();
  }

  
}
