// src/app/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { RoleModalComponent } from './modals/role-modal/role-modal.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    ManageRolesComponent,
    ProductModalComponent,
    RoleModalComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
