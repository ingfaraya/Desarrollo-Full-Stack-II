import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { Role } from '../../services/role.model';
import { RoleModalComponent } from '../modals/role-modal/role-modal.component';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  roles: Role[] = [];

  constructor(private adminService: AdminService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.adminService.getRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

  openRoleModal(role: Role) {
    const modalRef = this.modalService.open(RoleModalComponent);
    modalRef.componentInstance.role = role;

    modalRef.result.then((result) => {
      if (result) {
        if (role.id === 0) {
          this.adminService.addRole(result).subscribe(() => {
            this.loadRoles();
          });
        } else {
          this.adminService.updateRole(result).subscribe(() => {
            this.loadRoles();
          });
        }
      }
    }).catch((error) => {
      console.log('Modal dismissed', error);
    });
  }

  addRole() {
    const newRole: Role = {
      id: 0,
      name: '',
      description: ''
    };
    this.openRoleModal(newRole);
  }

  editRole(role: Role) {
    this.openRoleModal(role);
  }

  deleteRole(roleId: number) {
    this.adminService.deleteRole(roleId).subscribe(() => {
      this.loadRoles();
    });
  }
}
