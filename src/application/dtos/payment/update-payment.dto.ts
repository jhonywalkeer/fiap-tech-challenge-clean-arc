import { IdentifierDTO } from '@application/dtos/common'
import { Field } from '@domain/enums'
import { IsNumberValidator, IsStringValidator } from '@presentation/validators'

export class UpdatePaymentDTO extends IdentifierDTO {
  order_id: string
  payment_method: string
  amount: number
  status: string

  constructor(
    id: string,
    order_id: string,
    payment_method: string,
    amount: number,
    status: string
  ) {
    super(id)
    this.order_id = IsStringValidator(order_id, Field.Order)
    this.amount = IsNumberValidator(amount, Field.Amount)
    this.status = IsStringValidator(status, Field.Status)
  }
}
