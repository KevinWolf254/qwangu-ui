import { Tenant } from "src/app/tenant/model/tenant.model";
export class Occupation {
  constructor(
    public id?: string,
    public status?: OccupationStatus,
    public occupationNo?: string,
    public startDate?: Date,
    public endDate?: Date,
    public tenantId?: string,
    public unitId?: string,
    public createdOn?: Date,
    public createdBy?: string,
    public modifiedOn?: Date,
    public modifiedBy?: string,
  ){}
}

export enum OccupationStatus {
  BOOKED="BOOKED",
  CURRENT="CURRENT",
  PREVIOUS="PREVIOUS",
}

export class CreateOccupation {
  constructor(
    public tenantId?: string,
    public tenant?: Tenant,
    public occupation?: OccupationDto,){}
}

export class OccupationDto {
  constructor(
    public startDate: Date,
    public unitId: string,
    public paymentId: string,
  ){}
}
