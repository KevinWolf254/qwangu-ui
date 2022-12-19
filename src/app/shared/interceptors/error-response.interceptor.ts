import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseDto } from '../model/response-dto';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {

  private url = environment.url;

  constructor(private _toastr: ToastrService, private _router: Router, private _authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const { status } = error;
          const apiResponse: ResponseDto<any> = error.error;
          const { message } = apiResponse;

          if (status == 500) // internal server error
            this._toastr.error("Something happened, please try again later!");
          else if (status == 401) { //unauthorised
            if (request.url === `${this.url}/v1/signIn`) {
              this._toastr.error(message);
            } else {
              this._authService.signOut();
              this._toastr.error('Sign in.', 'You have been Signed Out.');
            }
          } else if (status == 0) {
            this._toastr.error('Check your Connection!', 'Network Error!');
          } else if (status === 404) {
            this._toastr.info(message);
          } else
            this._toastr.error(message);
          return throwError(() => error);
        })
      );
  }
}
