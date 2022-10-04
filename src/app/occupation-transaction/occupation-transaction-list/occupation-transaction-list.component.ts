import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccupationTransaction, OccupationTransactionType } from '../model/occupation-transaction.model';

@Component({
  selector: 'app-occupation-transaction-list',
  templateUrl: './occupation-transaction-list.component.html',
  styleUrls: ['./occupation-transaction-list.component.scss']
})
export class OccupationTransactionListComponent implements OnInit {
  public isLoading: boolean;
  public occupationTransactions: OccupationTransaction[];
  private closeResult = '';

  public form: FormGroup;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public otherAmountsForm: FormGroup;
  public deleteOccupationTransactionId: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
      this.otherAmountsForm = this._fb.group({
        'name': [null, Validators.required],
        'amount': [null, Validators.required],
      });
    this.form = this._fb.group({
      'pageSize': ['10'],
      'occupationId': [''],
      'paymentId': [''],
    });
    this.createForm = this._fb.group({
      'type': ['', Validators.required],
      'transactionType': ['', Validators.required],
      'period': ['', Validators.required],
      'rentAmount': ['', Validators.required],
      'securityAmount': ['', Validators.required],
      'garbageAmount': ['', Validators.required],
      'otherAmounts': this._fb.array([this.otherAmountsForm]),
      'occupationId': ['', Validators.required],
      'paymentId': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'occupationTransactionId': ['', Validators.required],
      'type': ['', Validators.required],
      'transactionType': ['', Validators.required],
      'period': ['', Validators.required],
      'rentAmount': ['', Validators.required],
      'securityAmount': ['', Validators.required],
      'garbageAmount': ['', Validators.required],
      'otherAmounts': this._fb.array([this.otherAmountsForm]),
      'occupationId': ['', Validators.required],
      'paymentId': ['', Validators.required],
    });
    this.isLoading = false;
    let today: Date = new Date;
    let occupationTransaction = new OccupationTransaction("1", OccupationTransactionType.CREDIT, 0, 20000, 0, "1", "1", "1", today, '', today, '');
    this.occupationTransactions = [occupationTransaction];
    this.deleteOccupationTransactionId = "1";
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

  openCreate(content: any) {
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


  get createOtherAmounts() {
    return this.createForm.get("otherAmounts") as FormArray;
  }

  addOnCreateOtherAmounts() {
    this.createOtherAmounts.push(this.otherAmountsForm);
  }

  removeOnCreateOtherAmounts(index: number) {
    this.createOtherAmounts.removeAt(index);
  }

  public create(form: FormGroup) {

  }

  public update(form: FormGroup) {

  }
}
