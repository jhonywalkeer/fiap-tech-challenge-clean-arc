import { IdentifierDTO } from '@application/dtos/common'
import {
  IsEnumValidator,
  IsNumberValidator,
  IsStringValidator
} from '@presentation/validators'
import { PaymentMethod, Field } from '@domain/enums'

export class UpdatePaymentDTO extends IdentifierDTO {
  payment_method: string
  amount: number
  status: string

  constructor(
    id: string,
    payment_method: string,
    amount: number,
    status: string
  ) {
    super(id)
    this.payment_method = IsEnumValidator(
      payment_method,
      PaymentMethod,
      Field.Method
    )
    this.amount = IsNumberValidator(amount, Field.Amount)
    this.status = IsStringValidator(status, Field.Status)
  }
}
