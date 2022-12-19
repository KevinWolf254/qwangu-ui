export class ResponseDto<T> {
  constructor(
    public timestamp: Date,
    public path: string,
    public status: number,
    public success: boolean,
    public message: string,
    public data: T) {}
}
