import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { SymbolsListValidator } from '@presentation/validators'
import { HttpException } from '@common/utils/exceptions'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'

export class FindUserByIdDTO {
  social_security_number: string

  constructor(social_security_number: string) {
    if (!social_security_number)
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        ErrorMessage.ParameterNotInvalid
      )

    social_security_number = RemoveDotsAndDashesFormat(social_security_number)
    SymbolsListValidator(social_security_number)

    this.social_security_number = social_security_number
  }
}
