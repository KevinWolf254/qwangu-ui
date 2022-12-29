import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private url = environment.url;

  constructor(private _tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;

    if (url === `${this.url}/v1/signIn`)
        return next.handle(request);

    request = request.clone({
        setHeaders: {
            Authorization: 'Bearer ' + this._tokenService.rawToken,
            Accept: 'application/json'
        }
    });
    return next.handle(request);
  }
}
