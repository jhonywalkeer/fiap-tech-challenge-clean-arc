import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage, Field } from '@domain/enums'
import {
  IsStringValidator,
  EmailListValidator,
  IsSocialSecurityNumberValidator
} from '@presentation/validators'

export class CreateUserDTO {
  name: string
  email: string
  social_security_number: string

  constructor(name: string, email: string, social_security_number: string) {
    if (!name || !email || !social_security_number) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        ErrorMessage.BodyInvalid
      )
    }
    IsStringValidator(email, Field.email)
    IsStringValidator(social_security_number, Field.socialSecurityNumber)

    this.name = IsStringValidator(name, Field.name)
    this.email = EmailListValidator(email)
    this.social_security_number = IsSocialSecurityNumberValidator(
      social_security_number
    )
  }
}
