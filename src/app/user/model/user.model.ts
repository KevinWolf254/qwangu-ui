export class User {
  constructor(
    public id?: string,
    public person?: Person,
    public emailAddress?: string,
    public roleId?: string,
    public isAccountExpired?: boolean,
    public isCredentialsExpired?: boolean,
    public isAccountLocked?: boolean,
    public isEnabled?: boolean,
    public createdOn?: Date,
    public createdBy?: string,
    public modifiedOn?: Date,
    public modifiedBy?: string,
  ){}
}

export class Person {
  constructor(
    public firstName?: string,
    public otherNames?: string,
    public surname?: string
  ){}
}

export class UserDto {
  constructor(
    public person?: Person,
    public emailAddress?: string,
    public roleId?: string,
  ){}
}
