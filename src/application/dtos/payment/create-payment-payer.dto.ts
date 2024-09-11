import { Field } from '@domain/enums'
import { IsEmailValidator, IsStringValidator } from '@presentation/validators'

export class CreatePaymentPayerDTO {
  email: string

  constructor(email: string) {
    IsStringValidator(email, Field.Email)

    this.email = IsEmailValidator(email)
  }
}
