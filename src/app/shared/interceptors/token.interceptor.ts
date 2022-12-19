import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDto } from '../model/auth-dto';
import { TokenService } from '../services/token.service';
import { ResponseDto } from '../model/response-dto';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private url = environment.url;

  constructor(private _tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const isSignIn = request.url === `${this.url}/v1/signIn`;
            console.log(isSignIn);
            // create token if request matches 'signin'
            if (isSignIn) {
              let tokenResponse = event.body as ResponseDto<AuthDto>;
              console.log(tokenResponse);
              this._tokenService.setRawToken(tokenResponse.data.token);
            }
          }
        })
      );
  }
}
