import { Field } from '@domain/enums'
import { IsStringValidator } from '@presentation/validators'

export class CreateOrderDTO {
  order: string
  status: string
  customer: string
  user_id: string
  payment: string
  observation: string

  constructor(
    order: string,
    status: string,
    customer: string,
    user_id: string,
    payment: string,
    observation: string
  ) {
    IsStringValidator(order, Field.OrderIdentifier)
    IsStringValidator(status, Field.Status)

    this.order = order
    this.status = status
    this.customer = customer
    this.user_id = user_id
    this.payment = payment
    this.observation = observation
  }
}
