import { FormGroup } from "@angular/forms";

function isTouched(form: FormGroup, input: string): boolean {
  return form.controls[input].touched;
}

function isInValid(form: FormGroup, input: string, error: string): boolean {
  return form.controls[input].hasError(error);
}

function isEmailInvalid(form: FormGroup, input: string) {
  return isInValid(form, input, 'required') || isInValid(form, input, 'email') && isTouched(form, input)
}

function isRequiredInvalid(form: FormGroup, input: string) {
  return isInValid(form, input, 'required') && isTouched(form, input)
}
