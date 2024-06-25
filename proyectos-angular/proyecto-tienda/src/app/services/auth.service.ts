// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  private usersUrl = 'assets/data/users.json';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));
      if (!localStorage.getItem('users')) {
        this.loadUsers();
      }
    }
  }

  /**
   * Carga los datos de los usuarios desde el archivo JSON y los guarda en el almacenamiento local.
   */
  private loadUsers(): void {
    this.http.get<any[]>(this.usersUrl).subscribe(users => {
      localStorage.setItem('users', JSON.stringify(users));
    });
  }

  /**
   * Obtiene el usuario actual como un observable.
   * @returns {Observable<any>} Observable del usuario actual.
   */
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns {boolean} Verdadero si el usuario ha iniciado sesión, falso de lo contrario.
   */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Verifica si el usuario actual es administrador.
   * @returns {Observable<boolean>} Observable que emite verdadero si el usuario es administrador, falso de lo contrario.
   */
  isAdmin(): Observable<boolean> {
    return of(this.isLoggedIn() && this.currentUserSubject.value?.role === 'admin');
  }

  /**
   * Inicia sesión con el nombre de usuario y la contraseña proporcionados.
   * @param {string} username - Nombre de usuario.
   * @param {string} password - Contraseña.
   * @returns {boolean} Verdadero si las credenciales son válidas, falso de lo contrario.
   */
  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]');
    const user = users.find((user: any) => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  /**
   * Registra un nuevo usuario.
   * @param {any} user - Objeto de usuario que contiene nombre de usuario y contraseña.
   * @returns {boolean} Verdadero si el registro fue exitoso, falso si el nombre de usuario ya existe.
   */
  register(user: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') ?? '[]');
    const existingUser = users.find((u: any) => u.username === user.username);
    if (existingUser) {
      return false; // El usuario ya existe
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }
}
