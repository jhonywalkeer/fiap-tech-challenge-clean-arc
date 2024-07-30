import { OrderItems, Payment } from '@domain/entities'

export class Order {
  id?: string
  order?: string
  status?: string
  items: OrderItems[]
  customer?: string
  payment?: Payment
  observation?: string | null

  constructor(
    items: OrderItems[],
    payment: Payment,
    customer?: string,
    observation?: string | null,
    id?: string,
    order?: string,
    status?: string
  ) {
    this.id = id
    this.order = order
    this.status = status
    this.items = items
    this.customer = customer
    this.payment = payment
    this.observation = observation
  }
}
