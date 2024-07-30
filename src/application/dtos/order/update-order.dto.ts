import { IdentifierDTO } from '@application/dtos/common'
import { CreateOrderItemsDTO } from '@application/dtos/order'
import { CreatePaymentMethodDTO } from '@application/dtos/payment'

export class UpdateOrderDTO extends IdentifierDTO {
  items: CreateOrderItemsDTO[]
  payment: CreatePaymentMethodDTO
  customer?: string
  observation?: string

  constructor(
    id: string,
    items: CreateOrderItemsDTO[],
    payment: CreatePaymentMethodDTO,
    observation?: string,
    customer?: string
  ) {
    super(id)
    this.items = items
    this.payment = payment
    this.observation = observation
    this.customer = customer
  }
}
