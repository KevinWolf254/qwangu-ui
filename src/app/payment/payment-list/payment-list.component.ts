import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency } from 'src/app/unit/model/unit.model';
import { Payment, PaymentStatus, PaymentType } from '../model/payment.model';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public payments: Payment[];
  private closeResult = '';

  // public createForm: FormGroup;
  public viewForm: FormGroup;
  public deleteNotice: string;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'status': [''],
      'type': [''],
      'shortCode': [''],
      'referenceNo': [''],
      'mobileNumber': [''],
    });
    // this.createForm = this._fb.group({
    //   'occupationId': ['', Validators.required],
    //   'vacatingOn': ['', Validators.required],
    //   'notifiedOn': ['', Validators.required],
    // });
    this.viewForm = this._fb.group({
      'id': [''],
      'status': [''],
      'type': [''],
      'transactionId': [''],
      'transactionType': [''],
      'transactionTime': [''],
      'amount': [''],
      'shortCode': [''],
      'referenceNo': [''],
      'invoiceNo': [''],
      'thirdPartyId': [''],
      'mobileNumber': [''],
      'firstName': [''],
      'middleName': [''],
      'lastName': [''],
    });
    this.deleteNotice = 'WERD12R5667';
    this.isLoading = false;
    let today: Date = new Date;
    let payment = new Payment("1", PaymentStatus.PROCESSED, PaymentType.MPESA_TILL, 'WEDRF2ER34', 'MPESA', today, Currency.KES, 25000, '233456', 'WEDRF2ER34', 'WEDRF2ER34', '5000', '', '0720000000', 'JOHN', '', 'DOE', today, '', today, '');
    this.payments = [payment];
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

  // openCreate(content: any) {
  //   this.open(content);
  // }

  openView(roleId: string | undefined, content: any) {
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
