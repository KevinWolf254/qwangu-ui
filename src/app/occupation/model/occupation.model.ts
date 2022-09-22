export class Occupation {
  constructor(
    public id?: string,
    public status?: OccupationStatus,
    public startedOn?: Date,
    public endedOn?: Date,
    public tenantId?: string,
    public unitId?: string,
    public createdOn?: Date,
    public createdBy?: string,
    public modifiedOn?: Date,
    public updatedBy?: string,
  ){}
}

export enum OccupationStatus {
  BOOKED="BOOKED",
  CURRENT="CURRENT",
  PREVIOUS="PREVIOUS",
}
