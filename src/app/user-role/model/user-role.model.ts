export class UserRole {
  constructor(
    public id?: string,
    public name?: string,
    public createdOn?: Date,
    public createdBy?: string,
    public modifiedOn?: Date,
    public modifiedBy?: string,
    public authorities?: UserAuthority[]
  ) { }
}

export class UserAuthority {
  public id?: string;
  public name?: string;
  public create?: boolean;
  public read?: boolean;
  public update?: boolean;
  public authorize?: boolean;
  public roleId?: string;
  public delete?: boolean;
}
