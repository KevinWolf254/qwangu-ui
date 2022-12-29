import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime } from 'rxjs';

import { Order } from 'src/app/shared/order.enum';
import { Apartment } from '../model/apartment.model';
import { ApartmentService } from '../apartment.service';
import { ResponseDto } from 'src/app/shared/model/response-dto';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {
  public page: number = 1;
  public pageSize: number = 10;

  public searchForm: FormGroup;
  private closeResult = '';
  public isLoading: boolean;
  public createForm: FormGroup;
  public updateForm: FormGroup;
  public apartments: Apartment[];
  public apartment: Apartment;
  public isSubmitting: boolean;

  constructor(private _fb: FormBuilder, private _apartmentService: ApartmentService, private _util: UtilService,
    private _modalService: NgbModal) {
    this.isSubmitting = false;
    this.apartment = new Apartment();
    this.searchForm = this._fb.group({
      'pageSize': ["" + this.pageSize],
      'name': []
    });
    this.createForm = this._fb.group({
      'name': ['', [Validators.required, Validators.pattern(this._util.alphabetWithSpace), Validators.minLength(5), Validators.maxLength(50)]],
    });
    this.updateForm = this._fb.group({
      'id': ['', Validators.required],
      'name': ['', [Validators.required, Validators.pattern(this._util.alphabetWithSpace), Validators.minLength(5), Validators.maxLength(50)]],
    });
    this.isLoading = false;
    this.apartments = [];
  }

  ngOnInit(): void {
    this.find('', Order.DESC);
    (this.searchForm.get("pageSize") as AbstractControl).valueChanges.subscribe((value: number) => {
      this.pageSize = value;
    });
    (this.searchForm.get("name") as AbstractControl).valueChanges.pipe(
      debounceTime(1000)
    ).subscribe((value: string) => {
      if (value)
        this.find(value, Order.DESC)
      else
        this.find('', Order.DESC)
    });
  }

  private find(name: string, order: Order) {
    this.apartments = [];
    this.isLoading = true;
    this._apartmentService.find(name, order)
      .subscribe({
        next: (response: ResponseDto<Array<Apartment>>) => {
          this.apartments = response.data;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
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

  openEdit(apartment: Apartment, form: FormGroup, content: any) {
    this.apartment = { ...apartment };
    form.patchValue({
      id: apartment ? apartment.id ? apartment.id.trim() : '' : '',
      name: apartment ? apartment.name ? apartment.name.trim() : '' : '',
    });

    this.open(content);
  }

  openDelete(apartment: Apartment, content: any) {
    this.apartment = { ...apartment };
    this.open(content);
  }

  closeDelete(apartment: Apartment, modal: any) {
    apartment = new Apartment();
    modal.close('Save click');
  }

  public create(form: FormGroup, modal: any) {
    console.log(form.value);
    const { name } = form.value;
    let apartment = new Apartment();
    apartment.name = name;

    this.isSubmitting = true;

    this._apartmentService.create(apartment).subscribe({
      next: (response: ResponseDto<Apartment>) => {
        const { data } = response;
        this.find('', Order.DESC)
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

  public close(form: FormGroup, modal: any) {
    form.reset();
    modal.close('Save click');
  }

  public update(form: FormGroup, modal: any) {
    const { id, name } = form.value;
    this.apartment.name = name;
    this.isSubmitting = true;

    this._apartmentService.update(id, this.apartment).subscribe({
      next: (response: ResponseDto<Apartment>) => {
        const { data } = response;
        this.find('', Order.DESC)
        this.isSubmitting = false;
        this.apartment = new Apartment();
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

  public delete(apartment: Apartment, modal: any) {
    const { id } = apartment;
    this.isSubmitting = true;

    this._apartmentService.delete(id as string).subscribe({
      next: () => {
        this.find('', Order.DESC)
        this.isSubmitting = false;
        this.closeDelete(apartment, modal);
      },
      error: () => {
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  public findPosition(index: number, page: number, pageSize: number): number {
    return this._util.findPosition(index, page, pageSize);
  }

  // create
  public isCreateInValid(input: string, error: string): boolean {
    return this.createForm.controls[input].hasError(error);
  }
  public isCreateTouched(input: string): boolean {
    return this.createForm.controls[input].touched;
  }

  // name
  public get isNameInvalid(): boolean {
    return this.isCreateInValid('name', 'required') && this.isCreateTouched('name')
  }
  public get isNamePatternInvalid(): boolean {
    return this.isCreateInValid('name', 'pattern') && this.isCreateTouched('name')
  }
  public get isNameMinLengthInvalid(): boolean {
    return this.isCreateInValid('name', 'minlength') && this.isCreateTouched('name')
  }
  public get isNameMaxLengthInvalid(): boolean {
    return this.isCreateInValid('name', 'maxlength') && this.isCreateTouched('name')
  }

  // update
  public isUpdateInValid(input: string, error: string): boolean {
    return this.updateForm.controls[input].hasError(error);
  }
  public isUpdateTouched(input: string): boolean {
    return this.updateForm.controls[input].touched;
  }
  public get isUpdateNameInvalid(): boolean {
    return this.isUpdateInValid('name', 'required') && this.isUpdateTouched('name')
  }
  public get isUpdateNamePatternInvalid(): boolean {
    return this.isUpdateInValid('name', 'pattern') && this.isUpdateTouched('name')
  }
  public get isUpdateNameMinLengthInvalid(): boolean {
    return this.isUpdateInValid('name', 'minlength') && this.isUpdateTouched('name')
  }
  public get isUpdateNameMaxLengthInvalid(): boolean {
    return this.isUpdateInValid('name', 'maxlength') && this.isUpdateTouched('name')
  }
}
