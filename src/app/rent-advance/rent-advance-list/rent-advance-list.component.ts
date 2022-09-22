import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentAdvance, RentAdvanceStatus } from '../model/rent-advance.model';

@Component({
  selector: 'app-rent-advance-list',
  templateUrl: './rent-advance-list.component.html',
  styleUrls: ['./rent-advance-list.component.scss']
})
export class RentAdvanceListComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public rentAdvances: RentAdvance[];
  private closeResult = '';

  public createForm: FormGroup;
  public updateForm: FormGroup;
  public deleteRentAdvancePayment: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'paymentId': [''],
      'status': [''],
    });
    this.createForm = this._fb.group({
      'status': ['', Validators.required],
      'returnDetails': [''],
      'occupationId': ['', Validators.required],
      'paymentId': ['', Validators.required],
      'returnedOn': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'id': [''],
      'status': ['', Validators.required],
      'returnDetails': [''],
      'occupationId': ['', Validators.required],
      'paymentId': ['', Validators.required],
      'returnedOn': ['', Validators.required],
    });
    this.deleteRentAdvancePayment = 'WERD12R5667';
    this.isLoading = false;
    let today: Date = new Date;
    let rentAdvance = new RentAdvance("1", RentAdvanceStatus.HOLDING, '', '1', '1', today, today, '', today, '');
    this.rentAdvances = [rentAdvance];
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
