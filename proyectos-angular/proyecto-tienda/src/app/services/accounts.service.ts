// src/app/services/accounts.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accountsSubject = new BehaviorSubject<any[]>([]);
  private accountsUrl = 'assets/data/accounts.json';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAccounts();
    }
  }

  /**
   * Carga los datos de las cuentas desde el archivo JSON y los guarda en el almacenamiento local.
   */
  private loadAccounts(): void {
    this.http.get<any[]>(this.accountsUrl).subscribe(accounts => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('accounts', JSON.stringify(accounts));
      }
      this.accountsSubject.next(accounts);
    });
  }

  /**
   * Obtiene todas las cuentas como un observable.
   * @returns {Observable<any[]>} Observable de un array de cuentas.
   */
  getAccounts(): Observable<any[]> {
    if (isPlatformBrowser(this.platformId)) {
      const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');
      return new BehaviorSubject(accounts).asObservable();
    } else {
      return this.accountsSubject.asObservable();
    }
  }
}
