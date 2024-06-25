import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../services/admin.service';
import { User } from '../../services/user.model';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  openUserModal(user: User) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.user = user;

    modalRef.result.then((result) => {
      if (result) {
        if (user.id === 0) {
          this.adminService.addUser(result).subscribe(() => {
            this.loadUsers();
          });
        } else {
          this.adminService.updateUser(result).subscribe(() => {
            this.loadUsers();
          });
        }
      }
    }).catch((error) => {
      console.log('Modal dismissed', error);
    });
  }

  addUser() {
    const newUser: User = {
      id: 0,
      fullName: '',
      username: '',
      email: '',
      password: '',
      dob: '',
      address: '',
      role: 'user'
    };
    this.openUserModal(newUser);
  }

  editUser(user: User) {
    this.openUserModal(user);
  }

  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
}
