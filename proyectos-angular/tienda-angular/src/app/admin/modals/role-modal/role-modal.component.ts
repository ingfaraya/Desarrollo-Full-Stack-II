import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/services/role.model';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnInit {
  @Input() role: Role;
  roleForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.roleForm = this.fb.group({
      id: [this.role.id],
      name: [this.role.name, Validators.required],
      description: [this.role.description, Validators.required]
    });
  }

  onSave() {
    if (this.roleForm.valid) {
      this.activeModal.close(this.roleForm.value);
    }
  }
}
