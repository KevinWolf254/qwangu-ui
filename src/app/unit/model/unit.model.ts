export class Unit {
  constructor(
    public id?: string,
    public status?: UnitStatus,
    public type?: UnitType,
    public identifier?: UnitIdentifier,
    public floorNo?: number,
    public noOfBedrooms?: number,
    public noOfBathrooms?: number,
    public advanceInMonths?: number,
    public currency?: Currency,
    public rentPerMonth?: number,
    public garbagePerMonth?: number,
    public securityPerMonth?: number,
    public apartmentId?: string,
    public createdOn?: Date,
    public createdBy?: string,
    public modifiedOn?: Date,
    public modifiedBy?: string,
  ){}
}

export enum UnitStatus {
  VACANT='VACANT',
  OCCUPIED='OCCUPIED'
}

export enum UnitType {
  APARTMENT_UNIT='APARTMENT_UNIT',
  TOWN_HOUSE='TOWN_HOUSE',
  MAISONETTES='MAISONETTES',
  VILLA='VILLA'
}

export enum UnitIdentifier {
  A='A', B='B', C='C', D='D',
  E='E', F='F', G='G', H='H',
  I='I', J='J'
}

export enum Currency {
  KES='KES',
  DOLLAR='DOLLAR',
  POUND='POUND'
}
