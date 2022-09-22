import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Occupation, OccupationStatus } from '../model/occupation.model';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.scss']
})
export class OccupationListComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public occupations: Occupation[];
  private closeResult = '';

  public createForm: FormGroup;
  public updateForm: FormGroup;
  public deleteUserName: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'tenant': [''],
      'unit': [''],
      'status': [''],
    });
    this.createForm = this._fb.group({
      'firstName': ['', Validators.required],
      'surname': ['', Validators.required],
      'middleName': [''],
      'emailAddress': ['', Validators.required],
      'mobileNumber': ['', Validators.required],
      'status': ['', Validators.required],
      'startedOn': ['', Validators.required],
      'apartmentId': ['', Validators.required],
      'unitId': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'occupationId': ['', Validators.required],
      'startedOn': ['', Validators.required],
      'status': ['', Validators.required],
      'endedOn': ['', Validators.required],
      'tenantId': ['', Validators.required],
      'apartmentId': ['', Validators.required],
      'unitId': ['', Validators.required],
    });
    this.deleteUserName = 'John Doe';
    this.isLoading = false;
    let today: Date = new Date;
    let occupation = new Occupation("1", OccupationStatus.CURRENT, today, undefined, '1', '1', today, '', today, '');
    this.occupations = [occupation];
   }

  ngOnInit(): void {
  }

  private open(content: any) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreate(content: any) {
    this.open(content);
  }

  openEdit(roleId: string | undefined, content: any) {
    this.open(content);
  }

  openDelete(roleId: string | undefined, content: any) {
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
