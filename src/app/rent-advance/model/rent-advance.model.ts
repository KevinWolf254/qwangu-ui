export class RentAdvance {
  constructor(

    public id: string,
    public status: RentAdvanceStatus,
    public returnDetails: string,
    public occupationId: string,
    public paymentId: string,
    public returnedOn: Date,
    public createdOn: Date,
    public createdBy: string,
    public modifiedOn: Date,
    public updatedBy: string,
  ){}
}

export enum RentAdvanceStatus {
  HOLDING='HOLDING',
  RELEASED='RELEASED',
  RENT_PAYMENT='RENT_PAYMENT'
}
