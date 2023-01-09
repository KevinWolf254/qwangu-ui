import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/response-dto';
import { Order } from '../shared/order.enum';
import { CreateOccupation, Occupation, OccupationStatus } from './model/occupation.model';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public delete(id: string): Observable<ResponseDto<void>> {
    return this._http.delete<ResponseDto<void>>(`${this.url}/v1/occupations/${id}`);
  }

  public create(occupation: CreateOccupation): Observable<ResponseDto<Occupation>> {
    return this._http.post<ResponseDto<Occupation>>(`${this.url}/v1/occupations`, occupation);
  }

  public findById(id: string): Observable<ResponseDto<Occupation>> {
    return this._http.get<ResponseDto<Occupation>>(`${this.url}/v1/occupations/${id}`);
  }

  public find(occupationNo?: string, status?: OccupationStatus, unitId?: string, tenantId?: string, order?: Order): Observable<ResponseDto<Array<Occupation>>> {

    const parameters = new HttpParams()
      .set('occupationNo', occupationNo ? occupationNo : '')
      .set('status', status ? status : '')
      .set('unitId', unitId ? unitId : '')
      .set('tenantId', tenantId ? tenantId : '')
      .set('order', order ? order : Order.DESC);

    return this._http.get<ResponseDto<Array<Occupation>>>(`${this.url}/v1/occupations`, { params: parameters });
  }
}
