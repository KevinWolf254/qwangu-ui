import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Tenant } from '../model/tenant.model';
import { TenantService } from '../tenant.service';
import { Order } from 'src/app/shared/order.enum';
import { ResponseDto } from 'src/app/shared/model/response-dto';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})
export class TenantListComponent implements OnInit {
  public page: number = 1;
  public pageSize: number = 10;
  public isSubmitting: boolean;
  public isLoading: boolean;
  public tenants: Tenant[];
  private closeResult = '';

  public searchForm: FormGroup;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public tenant: Tenant;

  constructor(private _fb: FormBuilder, private _router: Router, private _route: ActivatedRoute,
    private _modalService: NgbModal, private _tenantService: TenantService, private _util: UtilService) {
    this.searchForm = this._fb.group({
      'pageSize': [""+this.pageSize],
      'email': [],
    });
    this.createForm = this._fb.group({
      'firstName': ['', [Validators.required, Validators.pattern(_util.alphabet), Validators.min(2), Validators.max(25)]],
      'surname': ['', [Validators.required, Validators.pattern(_util.alphabet), Validators.min(2), Validators.max(25)]],
      'otherNames': ['', [Validators.pattern(_util.alphabetWithSpace), Validators.min(2), Validators.max(25)]],
      'emailAddress': ['', Validators.required],
      'mobileNo': ['', Validators.required],
    });
    this.updateForm = this._fb.group({
      'id': ['', Validators.required],
      'firstName': ['', [Validators.required, Validators.pattern(_util.alphabet), Validators.min(2), Validators.max(25)]],
      'surname': ['', [Validators.required, Validators.pattern(_util.alphabet), Validators.min(2), Validators.max(25)]],
      'otherNames': ['', [Validators.pattern(_util.alphabetWithSpace), Validators.min(2), Validators.max(25)]],
      'emailAddress': ['', Validators.required],
      'mobileNo': ['', Validators.required],
    });
    this.tenant = new Tenant();
    this.isLoading = false;
    this.tenants = [];
    this.isSubmitting = false;
   }

  ngOnInit(): void {
    this.find('', '', Order.DESC);
    (this.searchForm.get("pageSize") as AbstractControl).valueChanges.subscribe((value: number) => {
      this.pageSize = value;
    });
    (this.searchForm.get("email") as AbstractControl).valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value: string) => {
      if (value)
      this.find('', value, Order.DESC);
      else
        this.find();
    });
  }

  private find(mobileNumber?: string, emailAddress?: string, order?: Order) {
    this.tenants = [];
    this.isLoading = true;
    this._tenantService.find(mobileNumber, emailAddress,  order)
      .subscribe({
        next: (response: ResponseDto<Array<Tenant>>) => {
          this.tenants = response.data;
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

  open(content: any) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(tenant: Tenant | undefined, updateForm: FormGroup, modal: any) {
    this.tenant = {...tenant};
    updateForm.patchValue({
      id: tenant ? tenant.id ? tenant.id.trim() : '' : '',
      firstName: tenant ? tenant.firstName ? tenant.firstName.trim() : '' : '',
      surname: tenant ? tenant.surname ? tenant.surname.trim() : '' : '',
      otherNames: tenant ? tenant.middleName ? tenant.middleName.trim() : '' : '',
      emailAddress: tenant ? tenant.emailAddress ? tenant.emailAddress.trim() : '' : '',
      mobileNo: tenant ? tenant.mobileNumber ? tenant.mobileNumber.trim() : '' : ''
    });
    this.open(modal);
  }

  openDelete(tenant: Tenant | undefined, content: any) {
    this.tenant = {...tenant};
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
    const { firstName, surname, otherNames, emailAddress, mobileNo } = form.value;

    // TODO ADD OTHER AMOUNTS
    let tenant = new Tenant(undefined, firstName, otherNames, surname, mobileNo, emailAddress);

    this.isSubmitting = true;
    this._tenantService.create(tenant).subscribe({
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
    const { id, firstName, surname, otherNames, emailAddress, mobileNo } = form.value;

    // TODO ADD OTHER AMOUNTS
    let tenant = new Tenant(undefined, firstName, otherNames, surname, mobileNo, emailAddress);

    this.isSubmitting = true;
    this._tenantService.update(id, tenant).subscribe({
      next: () => {
        this.find('', '', Order.DESC);
        this.isSubmitting = false;
        this.tenant = new Tenant();
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

  public delete(tenant: Tenant, modal: any) {
    const { id } = tenant;
    this.isSubmitting = true;

    this._tenantService.delete(id as string).subscribe({
      next: () => {
        this.find('', '', Order.DESC)
        this.isSubmitting = false;
        this.closeDelete(tenant, modal);
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
    modal.close('Save click');
  }

  closeDelete(tenant: Tenant, modal: any) {
    tenant = new Tenant();
    modal.close('Save click');
  }

  // create
  public isCreateInValid(input: string, error: string): boolean {
    return this.createForm.controls[input].hasError(error);
  }
  public isCreateTouched(input: string): boolean {
    return this.createForm.controls[input].touched;
  }
  // firstName
  public get isFirstNameInvalid(): boolean {
    return this.isCreateInValid('firstName', 'required') && this.isCreateTouched('firstName')
  }
  public get isFirstNamePatternInvalid(): boolean {
    return this.isCreateInValid('firstName', 'pattern') && this.isCreateTouched('firstName')
  }
  public get isFirstNameMinLengthInvalid(): boolean {
    return this.isCreateInValid('firstName', 'minlength') && this.isCreateTouched('firstName')
  }
  public get isFirstNameMaxLengthInvalid(): boolean {
    return this.isCreateInValid('firstName', 'maxlength') && this.isCreateTouched('firstName')
  }
  // otherNames
  public get isOtherNamesPatternInvalid(): boolean {
    return this.isCreateInValid('otherNames', 'pattern') && this.isCreateTouched('otherNames')
  }
  public get isOtherNamesMinLengthInvalid(): boolean {
    return this.isCreateInValid('otherNames', 'minlength') && this.isCreateTouched('otherNames')
  }
  public get isOtherNamesMaxLengthInvalid(): boolean {
    return this.isCreateInValid('otherNames', 'maxlength') && this.isCreateTouched('otherNames')
  }
  // Surname
  public get isSurnameInvalid(): boolean {
    return this.isCreateInValid('surname', 'required') && this.isCreateTouched('surname')
  }
  public get isSurnamePatternInvalid(): boolean {
    return this.isCreateInValid('surname', 'pattern') && this.isCreateTouched('surname')
  }
  public get isSurnameMinLengthInvalid(): boolean {
    return this.isCreateInValid('surname', 'minlength') && this.isCreateTouched('surname')
  }
  public get isSurnameMaxLengthInvalid(): boolean {
    return this.isCreateInValid('surname', 'maxlength') && this.isCreateTouched('surname')
  }
  // mobileNo
  public get isMobileNoInvalid(): boolean {
    return this.isCreateInValid('mobileNo', 'required') && this.isCreateTouched('mobileNo')
  }
  public get isMobileNoPatternInvalid(): boolean {
    return this.isCreateInValid('mobileNo', 'pattern') && this.isCreateTouched('mobileNo')
  }
  public get isMobileNoMinLengthInvalid(): boolean {
    return this.isCreateInValid('mobileNo', 'minlength') && this.isCreateTouched('mobileNo')
  }
  public get isMobileNoMaxLengthInvalid(): boolean {
    return this.isCreateInValid('mobileNo', 'maxlength') && this.isCreateTouched('mobileNo')
  }
  // emailAddress
  public get isEmailAddressInvalid(): boolean {
    return this.isCreateInValid('emailAddress', 'required') && this.isCreateTouched('emailAddress')
  }
  public get isEmailAddressPatternInvalid(): boolean {
    return this.isCreateInValid('emailAddress', 'pattern') && this.isCreateTouched('emailAddress')
  }
  public get isEmailAddressMinLengthInvalid(): boolean {
    return this.isCreateInValid('emailAddress', 'minlength') && this.isCreateTouched('emailAddress')
  }
  public get isEmailAddressMaxLengthInvalid(): boolean {
    return this.isCreateInValid('emailAddress', 'maxlength') && this.isCreateTouched('emailAddress')
  }


  // update
  public isUpdateInValid(input: string, error: string): boolean {
    return this.updateForm.controls[input].hasError(error);
  }
  public isUpdateTouched(input: string): boolean {
    return this.updateForm.controls[input].touched;
  }
  // firstName
  public get isUpdateFirstNameInvalid(): boolean {
    return this.isUpdateInValid('firstName', 'required') && this.isUpdateTouched('firstName')
  }
  public get isUpdateFirstNamePatternInvalid(): boolean {
    return this.isUpdateInValid('firstName', 'pattern') && this.isUpdateTouched('firstName')
  }
  public get isUpdateFirstNameMinLengthInvalid(): boolean {
    return this.isUpdateInValid('firstName', 'minlength') && this.isUpdateTouched('firstName')
  }
  public get isUpdateFirstNameMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('firstName', 'maxlength') && this.isUpdateTouched('firstName')
  }
  // otherNames
  public get isUpdateOtherNamesPatternInvalid(): boolean {
    return this.isUpdateInValid('otherNames', 'pattern') && this.isUpdateTouched('otherNames')
  }
  public get isUpdateOtherNamesMinLengthInvalid(): boolean {
    return this.isUpdateInValid('otherNames', 'minlength') && this.isUpdateTouched('otherNames')
  }
  public get isUpdateOtherNamesMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('otherNames', 'maxlength') && this.isUpdateTouched('otherNames')
  }
  // Surname
  public get isUpdateSurnameInvalid(): boolean {
    return this.isUpdateInValid('surname', 'required') && this.isUpdateTouched('surname')
  }
  public get isUpdateSurnamePatternInvalid(): boolean {
    return this.isUpdateInValid('surname', 'pattern') && this.isUpdateTouched('surname')
  }
  public get isUpdateSurnameMinLengthInvalid(): boolean {
    return this.isUpdateInValid('surname', 'minlength') && this.isUpdateTouched('surname')
  }
  public get isUpdateSurnameMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('surname', 'maxlength') && this.isUpdateTouched('surname')
  }
  // mobileNo
  public get isUpdateMobileNoInvalid(): boolean {
    return this.isUpdateInValid('mobileNo', 'required') && this.isUpdateTouched('mobileNo')
  }
  public get isUpdateMobileNoPatternInvalid(): boolean {
    return this.isUpdateInValid('mobileNo', 'pattern') && this.isUpdateTouched('mobileNo')
  }
  public get isUpdateMobileNoMinLengthInvalid(): boolean {
    return this.isUpdateInValid('mobileNo', 'minlength') && this.isUpdateTouched('mobileNo')
  }
  public get isUpdateMobileNoMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('mobileNo', 'maxlength') && this.isUpdateTouched('mobileNo')
  }
  // emailAddress
  public get isUpdateEmailAddressInvalid(): boolean {
    return this.isUpdateInValid('emailAddress', 'required') && this.isUpdateTouched('emailAddress')
  }
  public get isUpdateEmailAddressPatternInvalid(): boolean {
    return this.isUpdateInValid('emailAddress', 'pattern') && this.isUpdateTouched('emailAddress')
  }
  public get isUpdateEmailAddressMinLengthInvalid(): boolean {
    return this.isUpdateInValid('emailAddress', 'minlength') && this.isUpdateTouched('emailAddress')
  }
  public get isUpdateEmailAddressMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('emailAddress', 'maxlength') && this.isUpdateTouched('emailAddress')
  }
}
