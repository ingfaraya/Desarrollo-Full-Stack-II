// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProductsManagementComponent } from './admin/products-management/products-management.component';
import { AccountsManagementComponent } from './admin/accounts-management/accounts-management.component';
import { RolesManagementComponent } from './admin/roles-management/roles-management.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const APP_ROUTES: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: ':category', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminDashboardComponent, children: [
    { path: 'products', component: ProductsManagementComponent },
    { path: 'accounts', component: AccountsManagementComponent },
    { path: 'roles', component: RolesManagementComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' }
  ]}
];
