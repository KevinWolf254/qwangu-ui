import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../model/user-role.model';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.scss']
})
export class UserRoleListComponent implements OnInit {
  public form: FormGroup;
  public authorityForm: FormGroup;
  public isLoading: boolean;
  public userRoles: UserRole[];
  private closeResult = '';

  public createForm: FormGroup;
  public updateForm: FormGroup;
  public deleteRoleName: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.authorityForm = this._fb.group({
      'name': [null, Validators.required],
      'create': [false, Validators.required],
      'read': [false, Validators.required],
      'update': [false, Validators.required],
      'authorize': [false, Validators.required]
    });
    this.form = this._fb.group({
      'name': [null],
      'pageSize': ['10'],
    });
    this.createForm = this._fb.group({
      'name': [null, Validators.required],
      'authorities': this._fb.array([this.authorityForm])
    });
    this.updateForm = this._fb.group({
      'roleId': [],
      'name': [],
      'authorities': this._fb.array([this.authorityForm])
    });
    this.deleteRoleName = 'SUPER_ADMIN';
    this.isLoading = false;
    let today: Date = new Date;
    let userRole = new UserRole("1", "SUPER_ADMIN", today, "1", today, "1");
    this.userRoles = [userRole];
  }

  ngOnInit(): void {
  }

  get createAuthorities() {
    return this.createForm.get("authorities") as FormArray;
  }

  get updateAuthorities() {
    return this.updateForm.controls["authorities"] as FormArray;
  }

  addCreateAuthority() {
    this.createAuthorities.push(this.authorityForm);
  }

  addUpdateAuthority() {
    this.updateAuthorities.push(this.authorityForm);
  }

  removeCreateAuthority(index: number) {
    this.createAuthorities.removeAt(index);
  }

  removeUpdateAuthority(index: number) {
    this.updateAuthorities.removeAt(index);
  }

  open(content: any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editUserRole(roleId: string | undefined, content: any) {
    this.open(content);
  }

  deleteUserRole(roleId: string | undefined, content: any) {
    this.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public create(form: FormGroup) {

  }

  public update(form: FormGroup) {

  }
}
