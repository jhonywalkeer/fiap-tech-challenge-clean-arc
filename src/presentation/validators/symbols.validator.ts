import { DangerousPatterns } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { ErrorMessage } from '@domain/enums'

export const SymbolsListValidator = (input: string) => {
  for (const pattern of DangerousPatterns) {
    if (pattern.test(input)) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidParameters,
        ErrorMessage.ParametersNotValid
      )
    }
  }
  return input
}
