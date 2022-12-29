import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Unit, UnitIdentifier, UnitType } from './model/unit.model';
import { Order } from '../shared/order.enum';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/response-dto';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public delete(id: string): Observable<ResponseDto<void>> {
    return this._http.delete<ResponseDto<void>>(`${this.url}/v1/units/${id}`);
  }

  public update(id: string, unit: Unit): Observable<ResponseDto<Unit>> {
    return this._http.put<ResponseDto<Unit>>(`${this.url}/v1/units/${id}`, unit);
  }

  public create(unit: Unit): Observable<ResponseDto<Unit>> {
    return this._http.post<ResponseDto<Unit>>(`${this.url}/v1/units`, unit);
  }

  public find(apartmentId?: string, accountNo?: string, isBooked?: boolean, type?: UnitType, identifier?: UnitIdentifier, floorNo?: number, noOfBedrooms?: number,
    noOfBathrooms?: number, order?: Order): Observable<ResponseDto<Array<Unit>>> {

    const parameters = new HttpParams()
      .set('apartmentId', apartmentId ? apartmentId : '')
      .set('accountNo', accountNo ? accountNo : '')
      .set('order', order ? order : Order.DESC);

    return this._http.get<ResponseDto<Array<Unit>>>(`${this.url}/v1/units`, { params: parameters });
  }
}
