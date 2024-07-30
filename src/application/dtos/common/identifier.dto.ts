import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'
import { HttpException } from '@common/utils/exceptions'
import { SymbolsListValidator } from '@presentation/validators'

export class IdentifierDTO {
  id: string

  constructor(id: string) {
    if (!id)
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        ErrorMessage.ParameterNotInvalid
      )

    this.id = SymbolsListValidator(id)
  }
}
