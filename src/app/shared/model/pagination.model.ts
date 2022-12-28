import { Order } from "../order.enum";

export class Pagination {
  constructor(
    public page: number,
    public pageSize: number,
    public order: Order){}
}
