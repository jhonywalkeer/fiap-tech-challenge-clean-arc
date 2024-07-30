import { StringValidationMessage } from '@common/constants'
import { HttpException } from '@common/utils/exceptions'
import { Type, StatusCode, ErrorName } from '@domain/enums'

export const IsStringValidator = (value: any, identifier: string): string => {
  if (typeof value !== Type.string) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      StringValidationMessage(identifier)
    )
  }
  return value
}
