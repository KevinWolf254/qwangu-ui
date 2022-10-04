export class OccupationTransaction {
  constructor(
    public id: string,
    public type: OccupationTransactionType,
    public totalAmountOwed: number,
    public totalAmountPaid: number,
    public totalAmountCarriedForward: number,
    public occupationId: string,
    public receivableId: string,
    public paymentId: string,
    public createdOn: Date,
    public createdBy: string,
    public modifiedOn: Date,
    public modifiedBy: string,
    ){}
}

export enum OccupationTransactionType {
  CREDIT="CREDIT",
  DEBIT="DEBIT"
}

