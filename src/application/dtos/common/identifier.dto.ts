import { StatusCode, ErrorName } from '@domain/enums'
import { HttpException } from '@common/utils/exceptions'
import { SymbolsListValidator } from '@presentation/validators'
import { ParamNotValidError } from '@common/errors/param-not-valid.error'

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
