import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthDto } from '../model/auth-dto';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../model/response-dto';
import { SignInDto } from '../model/sign-in-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: string = environment.url;

  constructor(private _http: HttpClient, private _router: Router, private _tokenService: TokenService) { }

  public signIn(request: SignInDto): Observable<ResponseDto<AuthDto>> {
    return this._http.post<ResponseDto<AuthDto>>(`${this.url}/v1/signIn`, request);
  }

  public signOut() {
    this._tokenService.removeRawToken();
    this._router.navigate(['/signin']);
  }
}
