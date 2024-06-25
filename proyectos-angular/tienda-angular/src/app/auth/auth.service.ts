import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../services/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;
  private loggedIn = false; // Simula el estado de autenticación

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('/assets/data/users.json').subscribe(data => {
      this.users = data;
    });
  }

  login(credentials: { username: string, password: string }): Observable<boolean> {
    const user = this.users.find(user => user.username === credentials.username && user.password === credentials.password);
    if (user) {
      this.currentUser = user;
      this.loggedIn = true;
      return of(true);
    }
    this.loggedIn = false;
    return of(false);
  }

  register(user: User): Observable<boolean> {
    this.users.push(user);
    this.saveUsers();
    return of(true);
  }

  adminLogin(credentials: { username: string, password: string }): Observable<boolean> {
    const adminUser = this.users.find(user => user.username === credentials.username && user.password === credentials.password && user.role === 'admin');
    if (adminUser) {
      this.currentUser = adminUser;
      return of(true);
    }
    return of(false);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  private saveUsers() {
    this.http.post('/assets/data/users.json', this.users).subscribe();
  }
}
