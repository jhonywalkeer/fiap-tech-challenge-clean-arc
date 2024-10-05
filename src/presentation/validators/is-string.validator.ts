import { StringValidationMessage } from '@common/constants'
import { ErrorName, StatusCode, Type } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'

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
