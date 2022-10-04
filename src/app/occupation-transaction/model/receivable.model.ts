export class Receivable {
  constructor(
    public id: string,
    public type: ReceivableType,
    public period: Date,
    public rentAmount: number,
    public securityAmount: number,
    public garbageAmount: number,
    public otherAmounts: Map<string, number>,
    public createdOn: Date,
    public createdBy: string,
    public modifiedOn: Date,
    public modifiedBy: string,
  ){}
}

export enum ReceivableType {
  RENT="RENT",
  PENALTY="PENALTY",
  BOOKING="BOOKING",
}
