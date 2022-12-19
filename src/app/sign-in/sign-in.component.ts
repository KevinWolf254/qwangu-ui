import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthDto } from '../shared/model/auth-dto';
import { FormUtilService } from '../utils/form-util.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ResponseDto } from '../shared/model/response-dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;
  public isSigningIn = false;

  constructor(private _fb: FormBuilder, public _util: FormUtilService, private _router: Router, private _authService: AuthenticationService,
    private _toastr: ToastrService) {
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
    this._authService.signIn({username: email, password}).subscribe({
      next: (response: ResponseDto<AuthDto>) => {
        this._toastr.success(response.message);
      },
      error: (err: HttpErrorResponse) => {
        this.isSigningIn = false;
        this._toastr.error(err.error.message);
      },
      complete: () => {
        this.isSigningIn = false;
        this._router.navigate(['/dashboard']);
      },
    })
  }
}
