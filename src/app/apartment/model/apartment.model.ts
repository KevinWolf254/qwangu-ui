export class Apartment {
  constructor(
    public id: string,
    public name: string,
    public createdOn?: Date,
    public createdBy?: string,
    public modifiedOn?: Date,
    public modifiedBy?: string,
  ){}
}
