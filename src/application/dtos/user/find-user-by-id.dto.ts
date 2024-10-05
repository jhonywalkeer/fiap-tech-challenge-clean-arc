import { ErrorName, StatusCode } from '@common/enums'
import { ParamNotValidError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { RemoveDotsAndDashesFormat } from '@common/utils/formaters'
import { SymbolsListValidator } from '@presentation/validators'

export class FindUserByIdDTO {
  social_security_number: string

  constructor(social_security_number: string) {
    if (!social_security_number)
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        ParamNotValidError()
      )

    social_security_number = RemoveDotsAndDashesFormat(social_security_number)
    SymbolsListValidator(social_security_number)

    this.social_security_number = social_security_number
  }
}
