import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tenant } from '../model/tenant.model';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {
  public isLoading: boolean;
  public tenants: Tenant[];
  private closeResult = '';

  public form: FormGroup;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public deleteTenantName: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'email': [],
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
    this.deleteTenantName = 'John Doe';
    this.isLoading = false;
    let today: Date = new Date;
    let tenant = new Tenant("1", "John", "Doe", "Doe", "01********", "johnDoe@mail.com", today, '', today, '');
    this.tenants = [tenant];
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

  openCreate(tenantId: string | undefined, content: any) {
    this.open(content);
  }

  openEdit(tenantId: string | undefined, content: any) {
    this.open(content);
  }

  openDelete(tenantId: string | undefined, content: any) {
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
