import { StatusCode, ErrorName } from '@common/enums'
import { ParamNotValidError } from '@common/errors/param-not-valid.error'
import { HttpException } from '@common/utils/exceptions'
import { SymbolsListValidator } from '@presentation/validators'

export class IdentifierDTO {
  id: string

  constructor(id: string) {
    if (!id)
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        ParamNotValidError()
      )

    this.id = SymbolsListValidator(id)
  }
}
