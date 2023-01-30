import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/response-dto';
import { Order } from '../shared/order.enum';
import { Tenant } from './model/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private url: string = environment.url;
  private tenantUrl = `${this.url}/v1/tenants/`;

  private mobileNumberSubject = new BehaviorSubject<string>('');
  mobileNumberSelectedAction$ = this.mobileNumberSubject.asObservable();

  private emailAddressSubject = new BehaviorSubject<string>('');
  emailAddressSelectedAction$ = this.emailAddressSubject.asObservable();

  constructor(private _http: HttpClient) { }

  changeMobileNumber(mobileNumber: string): void {
    this.mobileNumberSubject.next(mobileNumber);
  }

  changeEmailAddress(emailAddress: string): void {
    this.emailAddressSubject.next(emailAddress);
  }

  public delete(id: string): Observable<ResponseDto<void>> {
    return this._http.delete<ResponseDto<void>>(`${this.tenantUrl}${id}`);
  }

  public update(id: string, tenant: Tenant): Observable<ResponseDto<Tenant>> {
    return this._http.put<ResponseDto<Tenant>>(`${this.tenantUrl}${id}`, tenant);
  }

  public create(tenant: Tenant): Observable<ResponseDto<Tenant>> {
    return this._http.post<ResponseDto<Tenant>>(`${this.tenantUrl}`, tenant);
  }

  public find(mobileNumber?: string, emailAddress?: string, order?: Order): Observable<ResponseDto<Array<Tenant>>> {

    const parameters = new HttpParams()
      .set('mobileNumber', mobileNumber ? mobileNumber : '')
      .set('emailAddress', emailAddress ? emailAddress : '')
      .set('order', order ? order : Order.DESC);

    return this._http.get<ResponseDto<Array<Tenant>>>(`${this.tenantUrl}`, { params: parameters });
  }

  getTenants$ = combineLatest([this.mobileNumberSubject, this.emailAddressSubject])
    .pipe(
      switchMap(([mobileNumber, emailAddress]) => {
        const parameters = new HttpParams()
          .set('mobileNumber', mobileNumber ? mobileNumber : '')
          .set('emailAddress', emailAddress ? emailAddress : '')
          .set('order', Order.DESC);
        return this._http.get<ResponseDto<Array<Tenant>>>(`${this.tenantUrl}`, { params: parameters });
      })
    );
}
