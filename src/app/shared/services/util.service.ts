import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public readonly alphabet: RegExp = new RegExp('^([ ]+|[A-Za-z])?[A-Za-z]+([ ]*$|$)');
  public readonly numeric: RegExp = new RegExp('^[1-9][0-9]*?$');
  public readonly alphabetWithSpace: RegExp = new RegExp('(^([ ]*[A-Za-z])|^([A-Za-z]))[A-Za-z ]*$');
  public readonly mobileNo = new RegExp('^([7]|[1])[0-9]{8}$');
  public readonly mobileNo_0 = new RegExp('^((07)|(01))[0-9]{8}$');
  public readonly mobileNo_254 = new RegExp('^((2547)|(2541))[0-9]{8}$');
  public readonly mobileNo_0_254 = new RegExp('^((([7]|[1])|((07)|(01))|(2547)|(2541)))[0-9]{8}$');
  public readonly scheduleMessage: RegExp = new RegExp('(^([ ]*[A-Za-z])|^([A-Za-z]))[A-Za-z ]*$');

  constructor() { }

  public findPosition(index: number, page: number, pageSize: number): number {
    if(page == 1) {
      return index + 1;
    }
    return (index + 1) +((page - 1) * pageSize);
  }
}
