import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtilService } from '../utils/form-util.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;
  public isSigningIn = false;

  constructor(private _fb: FormBuilder, public _util: FormUtilService, private _router: Router) {
    this.form = this._fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public signIn(form: FormGroup) {
    this.isSigningIn = true;
    const { email, password } = form.value;
    // this._userService.signin({ email, password }).subscribe(() => {
      this.isSigningIn = false;
      this._router.navigate(['/users']);
    // }, () => this.isSigningIn = false);
  }
}
