import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/services/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user: User;
  userForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [this.user.id],
      fullName: [this.user.fullName, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, Validators.required],
      dob: [this.user.dob, Validators.required],
      address: [this.user.address, Validators.required],
      role: [this.user.role, Validators.required]
    });
  }

  onSave() {
    if (this.userForm.valid) {
      this.activeModal.close(this.userForm.value); 
    }
  }
}
