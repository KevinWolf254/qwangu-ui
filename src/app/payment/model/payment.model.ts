export class Payment {
  constructor(
    public id: string,
    public status: PaymentStatus,
    public type: PaymentType,
    public transactionId: string,
    public transactionType: string,
    public transactionTime: Date,
    public amount: number,
    public shortCode: string,
    public referenceNo: string,
    public invoiceNo: string,
    public balance: string,
    public thirdPartyId: string,
    public mobileNumber: string,
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public createdOn: Date,
    public modifiedOn: Date,
  ){}
}

export enum PaymentStatus {
  NEW="NEW",
  PROCESSED="PROCESSED"
}

export enum PaymentType {
  MPESA_PAY_BILL="MPESA_PAY_BILL",
  MPESA_TILL="MPESA_TILL",
  PAYPAL="PAYPAL"
}
