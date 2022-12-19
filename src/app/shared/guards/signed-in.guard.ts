import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class SignedInGuard implements CanActivate, CanActivateChild {

  constructor(private _tokenService: TokenService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let result: boolean | UrlTree | Promise<boolean | UrlTree>;
    const hasToken = this._tokenService.rawToken;
    if (!hasToken) {
      result = this._router.navigateByUrl("/signin");
    } else if (hasToken && this._tokenService.isTokenExpired) {
      result = this._router.parseUrl("/signin");
    } else {
      return true;
    }
    this._tokenService.removeRawToken();
    return result;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
