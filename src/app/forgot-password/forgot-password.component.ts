import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtilService } from '../utils/form-util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public isSending = false;

  constructor(private _fb: FormBuilder, public _util: FormUtilService, private _router: Router) {
    this.form = this._fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit(): void {
  }

  public sendResetPassword(form: FormGroup) {
    this.isSending = true;
    console.log(form.value);
    const { email } = form.value;
    // this._userService.signin({ email }).subscribe(() => {
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
  public get isEmailInvalid() {
    return this.emailHasError && this.isTouched('email')
  }
  public get emailHasError() {
    return this.isInValid('email', 'required') || this.isInValid('email', 'email')
  }
}
