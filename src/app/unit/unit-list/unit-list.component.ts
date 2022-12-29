import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs';

import { Unit, UnitStatus } from '../model/unit.model';
import { UnitService } from '../unit.service';
import { Order } from 'src/app/shared/order.enum';
import { ResponseDto } from 'src/app/shared/model/response-dto';
import { UtilService } from 'src/app/shared/services/util.service';
import { Apartment } from 'src/app/apartment/model/apartment.model';
import { ApartmentService } from 'src/app/apartment/apartment.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  public page: number = 1;
  public pageSize: number = 10;

  public searchForm: FormGroup;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public isLoading: boolean;
  public units: Unit[];
  public apartments: Apartment[];
  public deleteUnit: string;
  private closeResult = '';
  public isLoadingApartments: boolean;
  public identifiers: string[];
  public bedrooms: number[];
  public bathrooms: number[];
  public isSubmitting: boolean;
  public unit: Unit;

  constructor(private _fb: FormBuilder, private _modalService: NgbModal, private _unitService: UnitService,
    private _apartmentService: ApartmentService, private _util: UtilService) {
    this.searchForm = this._fb.group({
      'pageSize': [""+this.pageSize],
      'apartmentId': [''],
      'accountNo': []
    });
    this.createForm = this._fb.group({
      'type': ['', Validators.required],
      'apartmentId': [''],
      'floorNo': [''],
      'identifier': ['', Validators.required],
      'noOfBedrooms': ['', Validators.required],
      'noOfBathrooms': ['', Validators.required],
      'advanceInMonths': ['', Validators.required],
      'currency': ['', Validators.required],
      'rentPerMonth': ['', [Validators.required, Validators.pattern(_util.numeric)]],
      'garbagePerMonth': ['', [Validators.required, Validators.pattern(_util.numeric)]],
      'securityPerMonth': ['', [Validators.required, Validators.pattern(_util.numeric)]],
    });
    this.updateForm = this._fb.group({
      'id': ['', Validators.required],
      'type': [{value: '', disabled: true}, Validators.required],
      'apartmentId': [{value: '', disabled: true}],
      'floorNo': [''],
      'identifier': ['', Validators.required],
      'noOfBedrooms': ['', Validators.required],
      'noOfBathrooms': ['', Validators.required],
      'advanceInMonths': ['', Validators.required],
      'currency': ['', Validators.required],
      'rentPerMonth': ['', [Validators.required, Validators.pattern(_util.numeric)]],
      'garbagePerMonth': ['', [Validators.required, Validators.pattern(_util.numeric)]],
      'securityPerMonth': ['', [Validators.required, Validators.pattern(_util.numeric)]],
    });
    this.isLoading = false;
    this.units = [];
    this.deleteUnit = '1A';
    this.apartments = [];
    this.isLoadingApartments = false;
    this.identifiers = [];
    this.bedrooms = [];
    this.bathrooms = [];
    this.isSubmitting = false;
    this.unit = new Unit();
  }

  ngOnInit(): void {
    this.find('', '', Order.DESC);
    this.isLoadingApartments = true;
    this._apartmentService.find()
      .subscribe({
        next: (response: ResponseDto<Array<Apartment>>) => {
          this.apartments = response.data;
        },
        error: () => {
          this.isLoadingApartments = false;
        },
        complete: () => {
          this.isLoadingApartments = false;
        }
      });

    (this.searchForm.get("pageSize") as AbstractControl).valueChanges.subscribe((value: number) => {
      this.pageSize = value;
    });
    (this.searchForm).valueChanges.pipe(
      debounceTime(800)
    ).subscribe((values: any) => {
      const { apartmentId, accountNo } = values;
      if ((apartmentId || apartmentId == '') || accountNo) {
        this.find(apartmentId, accountNo, Order.DESC);
      }
    });
    (this.createForm.get("type") as AbstractControl).valueChanges.subscribe((value: string) => {
      this.createForm.get("apartmentId")?.setValue('');
      this.createForm.get("floorNo")?.setValue('');
      [Validators.required, Validators.pattern(this._util.numeric)]
      if (value == 'APARTMENT_UNIT') {
        this.createForm.get("apartmentId")?.addValidators(Validators.required);
        this.createForm.get("floorNo")?.addValidators(Validators.compose([Validators.required, Validators.pattern(this._util.numeric)]) as ValidatorFn);
      } else {
        this.createForm.get("apartmentId")?.clearValidators();
        this.createForm.get("floorNo")?.clearValidators();
      }
      this.createForm.get("apartmentId")?.updateValueAndValidity({ onlySelf: true });
      this.createForm.get("floorNo")?.updateValueAndValidity({ onlySelf: true });
    });
    (this.updateForm.get("type") as AbstractControl).valueChanges.subscribe((value: string) => {
      this.updateForm.get("apartmentId")?.setValue('');
      this.updateForm.get("floorNo")?.setValue('');
      [Validators.required, Validators.pattern(this._util.numeric)]
      if (value == 'APARTMENT_UNIT') {
        this.updateForm.get("apartmentId")?.addValidators(Validators.required);
        this.updateForm.get("floorNo")?.addValidators(Validators.compose([Validators.required, Validators.pattern(this._util.numeric)]) as ValidatorFn);
      } else {
        this.updateForm.get("apartmentId")?.clearValidators();
        this.updateForm.get("floorNo")?.clearValidators();
      }
      this.updateForm.get("apartmentId")?.updateValueAndValidity({ onlySelf: true });
      this.updateForm.get("floorNo")?.updateValueAndValidity({ onlySelf: true });
    });
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    this.identifiers = alpha.map((x) => String.fromCharCode(x));
    this.bedrooms = Array.from({ length: 20 }, (_, i) => i + 1);
    this.bathrooms = Array.from({ length: 10 }, (_, i) => i + 1);
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
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreate(content: any) {
    this.open(content);
  }

  openEdit(unit: Unit, form: FormGroup, content: any) {
    this.unit = { ...unit };
    form.patchValue({
      id: unit ? unit.id ? unit.id.trim() : '' : '',
      type: unit ? unit.type ? unit.type : '' : '',
      apartmentId: unit ? unit.apartmentId ? unit.apartmentId.trim() : '' : '',
      floorNo: unit ? unit.floorNo ? unit.floorNo : '' : '',
      identifier: unit ? unit.identifier ? unit.identifier : '' : '',
      noOfBedrooms: unit ? unit.noOfBedrooms ? unit.noOfBedrooms : '' : '',
      noOfBathrooms: unit ? unit.noOfBathrooms ? unit.noOfBathrooms : '' : '',
      advanceInMonths: unit ? unit.advanceInMonths ? unit.advanceInMonths : '' : '',
      currency: unit ? unit.currency ? unit.currency : '' : '',
      rentPerMonth: unit ? unit.rentPerMonth ? unit.rentPerMonth : '' : '',
      garbagePerMonth: unit ? unit.garbagePerMonth ? unit.garbagePerMonth : '' : '',
      securityPerMonth: unit ? unit.securityPerMonth ? unit.securityPerMonth : '' : '',
    });
    this.open(content);
  }

  openDelete(unit: Unit, content: any) {
    this.unit = { ...unit };
    this.open(content);
  }

  closeDelete(unit: Unit, modal: any) {
    unit = new Unit();
    modal.close('Save click');
  }

  public create(form: FormGroup, modal: any) {
    const { type, apartmentId, floorNo, identifier, noOfBedrooms, noOfBathrooms, advanceInMonths,
      currency, rentPerMonth, garbagePerMonth, securityPerMonth } = form.value;

    // TODO ADD OTHER AMOUNTS
    let unit = new Unit(undefined, UnitStatus.VACANT, false, undefined, type,
      identifier, floorNo, noOfBedrooms, noOfBathrooms, advanceInMonths, currency,
      rentPerMonth, garbagePerMonth, securityPerMonth, undefined, apartmentId);

    this.isSubmitting = true;
    this._unitService.create(unit).subscribe({
      next: () => {
        this.find('', '', Order.DESC);
        this.isSubmitting = false;
        this.close(form, modal);
      },
      error: () => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  public update(form: FormGroup, modal: any) {
    const { id, type, apartmentId, floorNo, identifier, noOfBedrooms, noOfBathrooms, advanceInMonths,
      currency, rentPerMonth, garbagePerMonth, securityPerMonth } = form.getRawValue();

    // TODO ADD OTHER AMOUNTS
    let unit = new Unit(undefined, UnitStatus.VACANT, false, undefined, type,
      identifier, floorNo, noOfBedrooms, noOfBathrooms, advanceInMonths, currency,
      rentPerMonth, garbagePerMonth, securityPerMonth, undefined, apartmentId);

    this.isSubmitting = true;
    this._unitService.update(id, unit).subscribe({
      next: () => {
        this.find('', '', Order.DESC);
        this.isSubmitting = false;
        this.unit = new Unit();
        this.close(form, modal);
      },
      error: () => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  public delete(unit: Unit, modal: any) {
    const { id } = unit;
    this.isSubmitting = true;

    this._unitService.delete(id as string).subscribe({
      next: () => {
        this.find('', '', Order.DESC)
        this.isSubmitting = false;
        this.closeDelete(unit, modal);
      },
      error: () => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  public close(form: FormGroup, modal: any) {
    form.reset();
    form.patchValue({
      type: '',
      apartmentId: '',
      identifier: '',
      advanceInMonths: '',
      noOfBedrooms: '',
      noOfBathrooms: '',
      currency: ''
    });
    modal.close('Save click');
  }

  private find(apartmentId?: string, accountNo?: string, order?: Order) {
    this.units = [];
    this.isLoading = true;
    this._unitService.find(apartmentId, accountNo, undefined, undefined,
      undefined, undefined, undefined, undefined, order)
      .subscribe({
        next: (response: ResponseDto<Array<Unit>>) => {
          this.units = response.data;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  public findPosition(index: number, page: number, pageSize: number): number {
    return this._util.findPosition(index, page, pageSize);
  }

  public findApartmentName(apartmentId: string | undefined): string | undefined {
    return this.apartments.find(apartment => apartment?.id === apartmentId)?.name;
  }

  // create
  public isCreateInValid(input: string, error: string): boolean {
    return this.createForm.controls[input].hasError(error);
  }
  public isCreateTouched(input: string): boolean {
    return this.createForm.controls[input].touched;
  }
  // type
  public get isTypeInvalid(): boolean {
    return this.isCreateInValid('type', 'required') && this.isCreateTouched('type')
  }
  // apartmentId
  public get isApartmentInvalid(): boolean {
    return this.isCreateInValid('apartmentId', 'required') && this.isCreateTouched('apartmentId')
  }
  // floorNo
  public get isFloorNoInvalid(): boolean {
    return this.isCreateInValid('floorNo', 'required') && this.isCreateTouched('floorNo')
  }
  public get isFloorNoPatternInvalid(): boolean {
    return this.isCreateInValid('floorNo', 'pattern') && this.isCreateTouched('floorNo')
  }
  // identifier
  public get isIdentifierInvalid(): boolean {
    return this.isCreateInValid('identifier', 'required') && this.isCreateTouched('identifier')
  }
  // noOfBedrooms
  public get isBedroomsInvalid(): boolean {
    return this.isCreateInValid('noOfBedrooms', 'required') && this.isCreateTouched('noOfBedrooms')
  }
  // noOfBathrooms
  public get isBathroomsInvalid(): boolean {
    return this.isCreateInValid('noOfBathrooms', 'required') && this.isCreateTouched('noOfBathrooms')
  }
  // advanceInMonths
  public get isAdvanceInvalid(): boolean {
    return this.isCreateInValid('advanceInMonths', 'required') && this.isCreateTouched('advanceInMonths')
  }
  // currency
  public get isCurrencyInvalid(): boolean {
    return this.isCreateInValid('currency', 'required') && this.isCreateTouched('currency')
  }
  // rentPerMonth
  public get isRentInvalid(): boolean {
    return this.isCreateInValid('rentPerMonth', 'required') && this.isCreateTouched('rentPerMonth')
  }
  public get isRentPatternInvalid(): boolean {
    return this.isCreateInValid('rentPerMonth', 'pattern') && this.isCreateTouched('rentPerMonth')
  }
  public get isRentMinLengthInvalid(): boolean {
    return this.isCreateInValid('rentPerMonth', 'minlength') && this.isCreateTouched('rentPerMonth')
  }
  public get isRentMaxLengthInvalid(): boolean {
    return this.isCreateInValid('rentPerMonth', 'maxlength') && this.isCreateTouched('rentPerMonth')
  }
  //garbagePerMonth
  public get isGarbageInvalid(): boolean {
    return this.isCreateInValid('garbagePerMonth', 'required') && this.isCreateTouched('garbagePerMonth')
  }
  public get isGarbagePatternInvalid(): boolean {
    return this.isCreateInValid('garbagePerMonth', 'pattern') && this.isCreateTouched('garbagePerMonth')
  }
  public get isGarbageMinLengthInvalid(): boolean {
    return this.isCreateInValid('garbagePerMonth', 'minlength') && this.isCreateTouched('garbagePerMonth')
  }
  public get isGarbageMaxLengthInvalid(): boolean {
    return this.isCreateInValid('garbagePerMonth', 'maxlength') && this.isCreateTouched('garbagePerMonth')
  }
  // securityPerMonth
  public get isSecurityInvalid(): boolean {
    return this.isCreateInValid('securityPerMonth', 'required') && this.isCreateTouched('securityPerMonth')
  }
  public get isSecurityPatternInvalid(): boolean {
    return this.isCreateInValid('securityPerMonth', 'pattern') && this.isCreateTouched('securityPerMonth')
  }
  public get isSecurityMinLengthInvalid(): boolean {
    return this.isCreateInValid('securityPerMonth', 'minlength') && this.isCreateTouched('securityPerMonth')
  }
  public get isSecurityMaxLengthInvalid(): boolean {
    return this.isCreateInValid('securityPerMonth', 'maxlength') && this.isCreateTouched('securityPerMonth')
  }

  // update
  public isUpdateInValid(input: string, error: string): boolean {
    return this.updateForm.controls[input].hasError(error);
  }
  public isUpdateTouched(input: string): boolean {
    return this.updateForm.controls[input].touched;
  }
  // type
  public get isUpdateTypeInvalid(): boolean {
    return this.isUpdateInValid('type', 'required') && this.isUpdateTouched('type')
  }
  // apartmentId
  public get isUpdateApartmentInvalid(): boolean {
    return this.isUpdateInValid('apartmentId', 'required') && this.isUpdateTouched('apartmentId')
  }
  // floorNo
  public get isUpdateFloorNoInvalid(): boolean {
    return this.isUpdateInValid('floorNo', 'required') && this.isUpdateTouched('floorNo')
  }
  public get isUpdateFloorNoPatternInvalid(): boolean {
    return this.isUpdateInValid('floorNo', 'pattern') && this.isUpdateTouched('floorNo')
  }
  // identifier
  public get isUpdateIdentifierInvalid(): boolean {
    return this.isUpdateInValid('identifier', 'required') && this.isUpdateTouched('identifier')
  }
  // noOfBedrooms
  public get isUpdateBedroomsInvalid(): boolean {
    return this.isUpdateInValid('noOfBedrooms', 'required') && this.isUpdateTouched('noOfBedrooms')
  }
  // noOfBathrooms
  public get isUpdateBathroomsInvalid(): boolean {
    return this.isUpdateInValid('noOfBathrooms', 'required') && this.isUpdateTouched('noOfBathrooms')
  }
  // advanceInMonths
  public get isUpdateAdvanceInvalid(): boolean {
    return this.isUpdateInValid('advanceInMonths', 'required') && this.isUpdateTouched('advanceInMonths')
  }
  // currency
  public get isUpdateCurrencyInvalid(): boolean {
    return this.isUpdateInValid('currency', 'required') && this.isUpdateTouched('currency')
  }
  // rentPerMonth
  public get isUpdateRentInvalid(): boolean {
    return this.isUpdateInValid('rentPerMonth', 'required') && this.isUpdateTouched('rentPerMonth')
  }
  public get isUpdateRentPatternInvalid(): boolean {
    return this.isUpdateInValid('rentPerMonth', 'pattern') && this.isUpdateTouched('rentPerMonth')
  }
  public get isUpdateRentMinLengthInvalid(): boolean {
    return this.isUpdateInValid('rentPerMonth', 'minlength') && this.isUpdateTouched('rentPerMonth')
  }
  public get isUpdateRentMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('rentPerMonth', 'maxlength') && this.isUpdateTouched('rentPerMonth')
  }
  //garbagePerMonth
  public get isUpdateGarbageInvalid(): boolean {
    return this.isUpdateInValid('garbagePerMonth', 'required') && this.isUpdateTouched('garbagePerMonth')
  }
  public get isUpdateGarbagePatternInvalid(): boolean {
    return this.isUpdateInValid('garbagePerMonth', 'pattern') && this.isUpdateTouched('garbagePerMonth')
  }
  public get isUpdateGarbageMinLengthInvalid(): boolean {
    return this.isUpdateInValid('garbagePerMonth', 'minlength') && this.isUpdateTouched('garbagePerMonth')
  }
  public get isUpdateGarbageMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('garbagePerMonth', 'maxlength') && this.isUpdateTouched('garbagePerMonth')
  }
  // securityPerMonth
  public get isUpdateSecurityInvalid(): boolean {
    return this.isUpdateInValid('securityPerMonth', 'required') && this.isUpdateTouched('securityPerMonth')
  }
  public get isUpdateSecurityPatternInvalid(): boolean {
    return this.isUpdateInValid('securityPerMonth', 'pattern') && this.isUpdateTouched('securityPerMonth')
  }
  public get isUpdateSecurityMinLengthInvalid(): boolean {
    return this.isUpdateInValid('securityPerMonth', 'minlength') && this.isUpdateTouched('securityPerMonth')
  }
  public get isUpdateSecurityMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('securityPerMonth', 'maxlength') && this.isUpdateTouched('securityPerMonth')
  }
}
