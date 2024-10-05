import { Field, PaymentMethod } from '@domain/enums'
import { IsStringValidator, IsEnumValidator } from '@presentation/validators'

export class CreatePaymentMethodDTO {
  method: string
  qr_code?: string | null

  constructor(method: string, qr_code?: string | null) {
    IsStringValidator(method, Field.Method)

    this.method = IsEnumValidator(method, PaymentMethod, Field.Method)
    this.qr_code = qr_code
  }
}
