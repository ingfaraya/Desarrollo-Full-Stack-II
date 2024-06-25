// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';
  address: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    const registered = this.authService.register({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      dob: this.dob,
      address: this.address
    });
    if (registered) {
      this.router.navigate(['/login']);
    } else {
      alert('Registro fallido');
    }
  }
}
