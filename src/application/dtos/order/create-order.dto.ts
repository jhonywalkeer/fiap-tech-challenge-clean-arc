import { CreatePaymentMethodDTO } from '@application/dtos/payment'
import { CreateOrderItemsDTO } from '@application/dtos/order'

export class CreateOrderDTO {
  items: CreateOrderItemsDTO[]
  payment: CreatePaymentMethodDTO
  customer?: string
  observation?: string

  constructor(
    items: CreateOrderItemsDTO[],
    payment: CreatePaymentMethodDTO,
    observation?: string,
    customer?: string
  ) {
    this.items = items
    this.payment = payment
    this.observation = observation
    this.customer = customer
  }
}
