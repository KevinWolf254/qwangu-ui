import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public users: User[];
  private closeResult = '';

  public createForm: FormGroup;
  public updateForm: FormGroup;
  public deleteUserName: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
    });
    this.createForm = this._fb.group({
      'fName': ['', Validators.required],
      'surname': ['', Validators.required],
      'oName': [''],
      'emailAddress': ['', Validators.required],
      'role': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'userId': ['', Validators.required],
      'fName': ['', Validators.required],
      'surname': ['', Validators.required],
      'oName': ['', Validators.required],
      'role': ['', Validators.required],
    });
    this.deleteUserName = 'John Doe';
    this.isLoading = false;
    let today: Date = new Date;
    let user = new User("1", {firstName: "John", otherNames: "Doe", surname: "Doe"}, "johnDoe@mail.com", "1", false, false, false, true, today, '', today, '');
    this.users = [user];
   }

  ngOnInit(): void {
  }

  open(content: any) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openByRoleId(roleId: string | undefined, content: any) {
    this.open(content);
  }

  openByRoleIdToDelete(roleId: string | undefined, content: any) {
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
