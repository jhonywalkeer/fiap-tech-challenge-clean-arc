import { OrderItem } from '@domain/entities'

export class Order {
  id?: string
  order: string
  status: string
  items: OrderItem[]
  customer: string
  observation: string | null

  constructor(
    id: string,
    order: string,
    status: string,
    items: OrderItem[],
    customer: string,
    observation: string | null
  ) {
    this.id = id
    this.order = order
    this.status = status
    this.items = items
    this.customer = customer
    this.observation = observation
  }
}
