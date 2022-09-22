import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtilService } from '../utils/form-util.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  public form: FormGroup;
  public isSending: boolean;

  constructor(private _fb: FormBuilder, public _util: FormUtilService, private _router: Router) {
    this.form = this._fb.group({
      'password': [null, Validators.required],
      'confirmPassword': [null, Validators.required]
    });
    this.isSending = false;
  }

  ngOnInit(): void {
  }

  public setPassword(form: FormGroup) {
    this.isSending = true;
    console.log(form.value);
    const { email, password } = form.value;
    // this._userService.signin({ email, password }).subscribe(() => {
      // this.isSending = false;
    //   this._router.navigate(['/bulksms/campaigns']);
    // }, () => this.isSending = false);
  }


  // validation
  public isTouched(input: string): boolean {
    return this.form.controls[input].touched;
  }
  public isInValid(input: string, error: string): boolean {
    return this.form.controls[input].hasError(error);
  }

  public isRequiredInvalid(input: string) {
    return this.isInValid(input, 'required') && this.isTouched(input)
  }
}
