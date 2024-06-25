import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { User } from './user.model';
import { Role } from './role.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private productsUrl = 'assets/data/products.json';
  private usersUrl = 'assets/data/users.json';
  private rolesUrl = 'assets/data/roles.json';

  constructor(private http: HttpClient) {}

  // Métodos para gestión de productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  addProduct(product: Product): Observable<Product> {
    // Simulación de agregar producto
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    // Simulación de actualización de producto
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<void> {
    // Simulación de eliminación de producto
    return this.http.delete<void>(`${this.productsUrl}/${productId}`);
  }

  // Métodos para gestión de usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  addUser(user: User): Observable<User> {
    // Simulación de agregar usuario
    return this.http.post<User>(this.usersUrl, user);
  }

  updateUser(user: User): Observable<User> {
    // Simulación de actualización de usuario
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    // Simulación de eliminación de usuario
    return this.http.delete<void>(`${this.usersUrl}/${userId}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }

  addRole(role: Role): Observable<Role> {
    // Implementa la lógica para agregar un rol
    // Ejemplo usando HttpClient para simular una llamada POST
    return this.http.post<Role>(this.rolesUrl, role);
  }

  updateRole(role: Role): Observable<void> {
    // Implementa la lógica para actualizar un rol
    // Ejemplo usando HttpClient para simular una llamada PUT
    return this.http.put<void>(`${this.rolesUrl}/${role.id}`, role);
  }

  deleteRole(roleId: number): Observable<void> {
    // Implementa la lógica para eliminar un rol
    // Ejemplo usando HttpClient para simular una llamada DELETE
    return this.http.delete<void>(`${this.rolesUrl}/${roleId}`);
  }
}
