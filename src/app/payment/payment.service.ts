import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../shared/model/response-dto';
import { Order } from '../shared/order.enum';
import { Payment, PaymentStatus, PaymentType } from './model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url: string = environment.url;

  constructor(private _http: HttpClient) { }

  public findById(id: string): Observable<ResponseDto<Payment>> {
    return this._http.get<ResponseDto<Payment>>(`${this.url}/v1/payments/${id}`);
  }

  public find(status?: PaymentStatus, type?: PaymentType, transactionId?: string, referenceNo?: string, shortCode?: string, mobileNumber?: string, order?: Order):
  Observable<ResponseDto<Array<Payment>>> {

    const parameters = new HttpParams()
      .set('type', type ? type : '')
      .set('status', status ? status : '')
      .set('transactionId', transactionId ? transactionId : '')
      .set('referenceNo', referenceNo ? referenceNo : '')
      .set('shortCode', shortCode ? shortCode : '')
      .set('mobileNumber', mobileNumber ? mobileNumber : '')
      .set('order', order ? order : Order.DESC);

    return this._http.get<ResponseDto<Array<Payment>>>(`${this.url}/v1/payments`, { params: parameters });
  }
}
