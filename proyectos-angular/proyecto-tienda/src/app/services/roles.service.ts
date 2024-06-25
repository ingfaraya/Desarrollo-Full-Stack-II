// src/app/services/roles.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesSubject = new BehaviorSubject<any[]>([]);
  private rolesUrl = 'assets/data/roles.json';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadRoles();
    }
  }

  /**
   * Carga los datos de los roles desde el archivo JSON y los guarda en el almacenamiento local.
   */
  private loadRoles(): void {
    this.http.get<any[]>(this.rolesUrl).subscribe(roles => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('roles', JSON.stringify(roles));
      }
      this.rolesSubject.next(roles);
    });
  }

  /**
   * Obtiene todos los roles como un observable.
   * @returns {Observable<any[]>} Observable de un array de roles.
   */
  getRoles(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      const roles = JSON.parse(localStorage.getItem('roles') ?? '[]');
      return new BehaviorSubject(roles).asObservable();
    } else {
      return this.rolesSubject.asObservable();
    }
  }
}
