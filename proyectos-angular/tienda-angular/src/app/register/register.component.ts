import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
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

  onSubmit(): void {
    console.log('Registro completado', {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      dob: this.dob,
      address: this.address
    });
  }
}
