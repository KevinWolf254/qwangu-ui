import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Currency, Unit, UnitIdentifier, UnitStatus, UnitType } from '../model/unit.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  public form: FormGroup;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public isLoading: boolean;
  public units: Unit[];
  public deleteUnit: string;
  private closeResult = '';

  constructor(private _fb: FormBuilder, private _modalService: NgbModal) {
    this.form = this._fb.group({
      'pageSize': ['10'],
      'name': []
    });
    this.createForm = this._fb.group({
      'status': ['', Validators.required],
      'type': ['', Validators.required],
      'identifier': ['', Validators.required],
      'floorNo': ['', Validators.required],
      'noOfBedrooms': ['', Validators.required],
      'noOfBathrooms': ['', Validators.required],
      'advanceInMonths': ['', Validators.required],
      'currency': ['', Validators.required],
      'rentPerMonth': ['', Validators.required],
      'garbagePerMonth': ['', Validators.required],
      'securityPerMonth': ['', Validators.required],
      'apartmentId': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'id': ['', Validators.required],
      'status': ['', Validators.required],
      'type': ['', Validators.required],
      'identifier': ['', Validators.required],
      'floorNo': ['', Validators.required],
      'noOfBedrooms': ['', Validators.required],
      'noOfBathrooms': ['', Validators.required],
      'advanceInMonths': ['', Validators.required],
      'currency': ['', Validators.required],
      'rentPerMonth': ['', Validators.required],
      'garbagePerMonth': ['', Validators.required],
      'securityPerMonth': ['', Validators.required],
      'apartmentId': ['', Validators.required],
    });
    this.isLoading = false;
    let today = new Date();
    this.units = [new Unit("1", UnitStatus.VACANT, UnitType.APARTMENT_UNIT, UnitIdentifier.A, 0, 2, 2, 2, Currency.DOLLAR, 2000, 100, 100, '1', today, '', today, '')];
    this.deleteUnit = '1A';
   }

  ngOnInit(): void {
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

  openEdit(unitId: string | undefined, content: any) {
    this.open(content);
  }

  openDelete(unitId: string | undefined, content: any) {
    this.open(content);
  }

  public create(form: FormGroup) {

  }

  public update(form: FormGroup) {

  }
}
