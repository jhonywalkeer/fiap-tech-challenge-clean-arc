import { DangerousPatterns } from '@common/constants'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'

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
