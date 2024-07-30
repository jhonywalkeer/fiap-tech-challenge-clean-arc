import { IsStringValidator, IsEnumValidator } from '@presentation/validators'
import { Field, PaymentMethod } from '@domain/enums'

export class CreatePaymentMethodDTO {
  method: string
  qr_code?: string

  constructor(method: string, qr_code?: string) {
    IsStringValidator(method, Field.method)

    this.method = IsEnumValidator(method, PaymentMethod, Field.method)
    this.qr_code = qr_code
  }
}
