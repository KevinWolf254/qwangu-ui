import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/response-dto';
import { Order } from '../shared/order.enum';
import { Tenant } from './model/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public delete(id: string): Observable<ResponseDto<void>> {
    return this._http.delete<ResponseDto<void>>(`${this.url}/v1/tenants/${id}`);
  }

  public update(id: string, tenant: Tenant): Observable<ResponseDto<Tenant>> {
    return this._http.put<ResponseDto<Tenant>>(`${this.url}/v1/tenants/${id}`, tenant);
  }

  public create(tenant: Tenant): Observable<ResponseDto<Tenant>> {
    return this._http.post<ResponseDto<Tenant>>(`${this.url}/v1/tenants`, tenant);
  }

  public find(mobileNumber?: string, emailAddress?: string, order?: Order): Observable<ResponseDto<Array<Tenant>>> {

    const parameters = new HttpParams()
      .set('mobileNumber', mobileNumber ? mobileNumber : '')
      .set('emailAddress', emailAddress ? emailAddress : '')
      .set('order', order ? order : Order.DESC);

    return this._http.get<ResponseDto<Array<Tenant>>>(`${this.url}/v1/tenants`, { params: parameters });
  }
}
