import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbDatepickerConfig, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { ApartmentService } from 'src/app/apartment/apartment.service';
import { Apartment } from 'src/app/apartment/model/apartment.model';
import { Payment, PaymentStatus, PaymentType } from 'src/app/payment/model/payment.model';
import { PaymentService } from 'src/app/payment/payment.service';
import { ResponseDto } from 'src/app/shared/model/response-dto';
import { Order } from 'src/app/shared/order.enum';
import { UtilService } from 'src/app/shared/services/util.service';
import { Tenant } from 'src/app/tenant/model/tenant.model';
import { TenantService } from 'src/app/tenant/tenant.service';
import { Unit, UnitStatus } from 'src/app/unit/model/unit.model';
import { UnitService } from 'src/app/unit/unit.service';
import { CreateOccupation, Occupation, OccupationStatus, OccupationDto } from '../model/occupation.model';
import { OccupationService } from '../occupation.service';

@Component({
  selector: 'app-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.scss']
})
export class OccupationListComponent implements OnInit {
  public page: number = 1;
  public pageSize: number = 10;

  public searchForm: FormGroup;
  public isLoading: boolean;
  public occupations: Occupation[];
  private closeResult = '';
  public tenants: Tenant[];
  public createForm: FormGroup;
  public isLoadingTenants: boolean;
  public apartments: Apartment[];
  public isLoadingApartments: boolean;
  public units: Unit[];
  public isLoadingUnits: boolean;
  public payments: Payment[];
  public isLoadingPayments: boolean;
  public minDate: any;
  public isSubmitting: boolean;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal, private _tenantService: TenantService, private _occupationService: OccupationService,
    private _util: UtilService, private _apartmentService: ApartmentService, private _unitService: UnitService,
    private _paymentService: PaymentService, private _config: NgbDatepickerConfig) {
    this.searchForm = this._fb.group({
      'pageSize': ["" + this.pageSize],
      'status': [''],
      'occupationNo': [''],
    });
    this.createForm = this._fb.group({
      'tenantType': ['', Validators.required],
      'tenant': [''],
      'firstName': [{ value: '', disabled: true }],
      'surname': [{ value: '', disabled: true }],
      'middleName': [{ value: '', disabled: true }],
      'emailAddress': [{ value: '', disabled: true }],
      'mobileNumber': [{ value: '', disabled: true }],
      'apartmentId': ['', Validators.required],
      'unitId': [{ value: '', disabled: true }, Validators.required],
      'payment': ['', Validators.required],
      'startedOn': ['', Validators.required],
    });
    this.isLoading = false;
    this.occupations = [];
    this.tenants = [];
    this.isLoadingTenants = false;
    this.apartments = [];
    this.isLoadingApartments = false;
    this.units = [];
    this.isLoadingUnits = false;
    this.payments = [];
    this.isLoadingPayments = false;
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.isLoadingTenants = true;
    this._tenantService.find().subscribe({
      next: (response: ResponseDto<Array<Tenant>>) => {
        this.tenants = response.data;
      },
      error: () => {
        this.isLoadingTenants = false;
      },
      complete: () => {
        this.isLoadingTenants = false;
      }
    });
    this.find();
    (this.searchForm.get("pageSize") as AbstractControl).valueChanges.subscribe((value: number) => {
      this.pageSize = value;
    });
    this.getApartments();
    this.getUnits();
    this.getPayments(PaymentStatus.NEW, undefined, undefined, 'ADV#');
    this.disablePastDates();
    (this.searchForm.get("status") as AbstractControl).valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value: any) => {
      this.find(value, this.searchForm.get("occupationNo")?.value);
    });
    (this.searchForm.get("occupationNo") as AbstractControl).valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value: any) => {
      this.find(this.searchForm.get("status")?.value, value);
    });
    (this.createForm.get("tenantType") as AbstractControl).valueChanges.subscribe((value: string) => {
      this.createForm.get("search")?.setValue('');
      this.createForm.get("surname")?.setValue('');
      this.createForm.get("firstName")?.setValue('');
      this.createForm.get("middleName")?.setValue('');
      this.createForm.get("mobileNumber")?.setValue('');
      this.createForm.get("emailAddress")?.setValue('');

      if (value == '0') {

        this.createForm.get("surname")?.enable();
        this.createForm.get("surname")?.addValidators(Validators.compose([Validators.required, Validators.pattern(this._util.alphabet)]) as ValidatorFn);

        this.createForm.get("firstName")?.enable();
        this.createForm.get("firstName")?.addValidators(Validators.compose([Validators.required, Validators.pattern(this._util.alphabet)]) as ValidatorFn);

        this.createForm.get("middleName")?.enable();
        this.createForm.get("middleName")?.addValidators(Validators.compose([Validators.pattern(this._util.alphabetWithSpace)]) as ValidatorFn);

        this.createForm.get("mobileNumber")?.enable();
        this.createForm.get("mobileNumber")?.addValidators(Validators.compose([Validators.required, Validators.pattern(this._util.mobileNo_0_254)]) as ValidatorFn);

        this.createForm.get("emailAddress")?.enable();
        this.createForm.get("emailAddress")?.addValidators(Validators.compose([Validators.required, Validators.email]) as ValidatorFn);

      } else {
        this.createForm.get("surname")?.disable();
        this.createForm.get("surname")?.clearValidators();

        this.createForm.get("firstName")?.disable();
        this.createForm.get("firstName")?.clearValidators();

        this.createForm.get("middleName")?.disable();
        this.createForm.get("middleName")?.clearValidators();

        this.createForm.get("mobileNumber")?.disable();
        this.createForm.get("mobileNumber")?.clearValidators();

        this.createForm.get("emailAddress")?.disable();
        this.createForm.get("emailAddress")?.clearValidators();

      }
      this.createForm.get("search")?.updateValueAndValidity({ onlySelf: true });
      this.createForm.get("surname")?.updateValueAndValidity({ onlySelf: true });
      this.createForm.get("firstName")?.updateValueAndValidity({ onlySelf: true });
      this.createForm.get("middleName")?.updateValueAndValidity({ onlySelf: true });
      this.createForm.get("mobileNumber")?.updateValueAndValidity({ onlySelf: true });
      this.createForm.get("emailAddress")?.updateValueAndValidity({ onlySelf: true });
    });

    (this.createForm.get("apartmentId") as AbstractControl).valueChanges.subscribe((apartmentId: string) => {
      this.createForm.get("unitId")?.setValue('');
      if (apartmentId) {
        this.createForm.get("unitId")?.enable();
        // this.units = this.units.filter(unit => unit.apartmentId === apartmentId && unit.status === UnitStatus.VACANT);
        this.getUnits(apartmentId);
      } else {
        this.createForm.get("unitId")?.disable();
        // this.getUnits();
        this.units = [];
      }
      this.createForm.get("unitId")?.updateValueAndValidity({ onlySelf: true });

    });
  }

  disablePastDates() {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  selected(value: any, form:FormGroup) {
    const item: Tenant = value.item;

    form.patchValue({
      surname: item ? item.surname ? item.surname.trim() : '' : '',
      firstName: item ? item.firstName ? item.firstName.trim() : '' : '',
      middleName: item ? item.middleName ? item.middleName : '' : '',
      mobileNumber: item ? item.mobileNumber ? item.mobileNumber : '' : '',
      emailAddress: item ? item.emailAddress ? item.emailAddress : '' : '',
    });
  }

  selectedPayment(value: any, form:FormGroup) {
    const item: Payment = value.item;
  }

  search: OperatorFunction<string, readonly Tenant[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((mobileNo) =>
        mobileNo === ''
          ? this.tenants
          : this.tenants.filter((tenant) => (tenant.mobileNumber as string).toLowerCase().indexOf(mobileNo.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  formatter = (tenant: Tenant) => tenant ?
    tenant.firstName + ' ' + tenant.middleName + ' ' + tenant.surname + ' | ' + tenant.mobileNumber + ' | ' + tenant.emailAddress :
    '';

  searchPayment: OperatorFunction<string, readonly Payment[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((transactionId) =>
        transactionId === ''
          ? this.payments
          : this.payments.filter((payment) => (payment.transactionId as string).toLowerCase().indexOf(transactionId.toLowerCase()) > -1).slice(0, 10),
      ),
    );

  paymentFormatter = (payment: Payment) => payment ?
    payment.transactionId + '  |  ' + payment.mobileNumber + ' | ' + payment.currency + ' ' + payment.amount as string :
    '';

  private open(content: any) {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private find(status?: OccupationStatus, occupationNo?: string, unitId?: string, tenantId?: string, order?: Order) {
    this.occupations = [];
    this.isLoading = true;
    this._occupationService.find(occupationNo, status, unitId, tenantId, order)
      .subscribe({
        next: (response: ResponseDto<Array<Occupation>>) => {
          this.occupations = response.data;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private getApartments(name?: string, order?: Order) {
    this.apartments = [];
    this.isLoadingApartments = true;
    this._apartmentService.find(name, order)
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
  }
  private getUnits(apartmentId?: string, accountNo?: string, order?: Order) {
    this.units = [];
    this.isLoadingUnits = true;
    this._unitService.find(apartmentId, accountNo, undefined, undefined,
      undefined, undefined, undefined, undefined, order)
      .subscribe({
        next: (response: ResponseDto<Array<Unit>>) => {
          this.units = response.data;
        },
        error: () => {
          this.isLoadingUnits = false;
        },
        complete: () => {
          this.isLoadingUnits = false;
        }
      });
  }
  private getPayments(status?: PaymentStatus, type?: PaymentType, transactionId?: string, referenceNo?: string,
    shortCode?: string, mobileNumber?: string, order?: Order) {
    this.payments = [];
    this.isLoadingPayments = true;
    this._paymentService.find(status, type, transactionId, referenceNo, shortCode,
      mobileNumber, order)
      .subscribe({
        next: (response: ResponseDto<Array<Payment>>) => {
          this.payments = response.data;
        },
        error: () => {
          this.isLoadingPayments = false;
        },
        complete: () => {
          this.isLoadingPayments = false;
        }
      });
  }

  public close(form: FormGroup, modal: any) {
    form.reset();
    form.patchValue({
      tenantType: '',
      search: '',
      tenantId: '',
      surname: '',
      firstName: '',
      middleName: '',
      mobileNumber: '',
      emailAddress: '',
      apartmentId: '',
      unitId: '',
      paymentId: '',
      startedOn: ''
    });
    modal.close('Save click');
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

  public create(form: FormGroup, modal: any) {
    console.log(form.value);
    const { tenantType, tenant, firstName, surname, middleName, emailAddress, mobileNumber,
      unitId, payment, startedOn } = form.value;

    const request = new CreateOccupation();

    if(tenantType == '0') {
      const tenantRequest = new Tenant(undefined, firstName, middleName, surname, mobileNumber, emailAddress);
      request.tenant = tenantRequest;
    } else {
      request.tenantId = tenant.id;
    }

    const startDate = new Date();
    startDate.setFullYear(startedOn.year);
    startDate.setMonth(startedOn.month);
    startDate.setDate(startedOn.day);

    const occupationRequest = new OccupationDto(startDate, unitId, payment.id);
    request.occupation = occupationRequest;

    this.isSubmitting = true;
    this._occupationService.create(request).subscribe({
      next: () => {
        this.find();
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

}
