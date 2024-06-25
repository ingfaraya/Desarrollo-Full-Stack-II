// src/app/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'users', component: ManageUsersComponent },
    { path: 'products', component: ManageProductsComponent },
    { path: 'roles', component: ManageRolesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
