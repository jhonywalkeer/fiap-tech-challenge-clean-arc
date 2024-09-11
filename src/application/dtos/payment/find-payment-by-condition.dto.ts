export class FindPaymentByConditionDTO {
  order_id?: string[]

  constructor(order_id?: string[]) {
    this.order_id = order_id
  }
}
