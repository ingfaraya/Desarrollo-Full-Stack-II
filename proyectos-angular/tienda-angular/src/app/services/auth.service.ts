import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin', role: 'admin' },
    // Agrega más usuarios aquí
  ];

  private currentUser = null;

  constructor() { }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }
}
