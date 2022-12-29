import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pagination } from '../shared/model/pagination.model';
import { ResponseDto } from '../shared/model/response-dto';
import { Order } from '../shared/order.enum';
import { Apartment } from './model/apartment.model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public delete(id: string): Observable<ResponseDto<void>> {
    return this._http.delete<ResponseDto<void>>(`${this.url}/v1/apartments/${id}`);
  }

  public update(id: string, apartment: Apartment): Observable<ResponseDto<Apartment>> {
    return this._http.put<ResponseDto<Apartment>>(`${this.url}/v1/apartments/${id}`, apartment);
  }

  public create(apartment: Apartment): Observable<ResponseDto<Apartment>> {
    return this._http.post<ResponseDto<Apartment>>(`${this.url}/v1/apartments`, apartment);
  }

  public find(name?: string, order?: Order): Observable<ResponseDto<Array<Apartment>>> {

    const parameters = new HttpParams()
      .set('name', name ? name : '')
      .set('order', order ? order : Order.DESC);

    return this._http.get<ResponseDto<Array<Apartment>>>(`${this.url}/v1/apartments`, { params: parameters });
  }
}
