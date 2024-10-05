import { Field } from '@domain/enums'
import { IsEmailValidator, IsStringValidator } from '@presentation/validators'

export class CreatePaymentPayerDTO {
  email: string
  id?: string
  social_security_number?: string

  constructor(email: string, id?: string, social_security_number?: string) {
    IsStringValidator(email, Field.Email)

    this.email = IsEmailValidator(email)
    this.id = id
    this.social_security_number = social_security_number
  }
}
