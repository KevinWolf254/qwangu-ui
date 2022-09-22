export class Notice {
  constructor(
    public id: string,
    public isActive: boolean,
    public notifiedOn: Date,
    public vacatingOn: Date,
    public occupationId: string,
    public createdOn: Date,
    public createdBy: string,
    public modifiedOn: Date,
    public updatedBy: string,
    ){}
}
