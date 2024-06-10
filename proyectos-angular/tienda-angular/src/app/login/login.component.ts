import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      // Handle successful login
    } else {
      // Handle failed login
    }
  }
}
