import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { from, Observable } from 'rxjs';
import { DecodedToken } from '../model/decoded-token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private _helper = new JwtHelperService();

  constructor() { }


  public setRawToken(token: string) {
    console.log("setting token" +token);
    localStorage.setItem('token', token);
  }

  public get rawToken(): string {
    return localStorage.getItem('token')!;
  }

  public get decodedToken(): DecodedToken {
    return this._helper.decodeToken(this.rawToken) as DecodedToken;
  }

  public get isTokenExpired(): boolean {
    return this._helper.isTokenExpired(this.rawToken, 5) as boolean;
  }

  public removeRawToken() {
    localStorage.removeItem('token');
  }

  public get roles(): Array<string> {
    return this.decodedToken.authorities;
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
