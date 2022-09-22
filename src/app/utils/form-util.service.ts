import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilService {

  constructor() { }

  public isTouched(form: FormGroup, input: string): boolean {
    return form.controls[input].touched;
  }

  public isInValid(form: FormGroup, input: string, error: string): boolean {
    return form.controls[input].hasError(error);
  }

  public isRequiredInvalid(form: FormGroup, input: string) {
    return this.isInValid(form, input, 'required') && this.isTouched(form, input)
  }

  public isEmailInvalid(form: FormGroup, input: string) {
    return (this.isInValid(form, input, 'required') || this.isInValid(form, input, 'email')) && this.isTouched(form, input)
  }
}
