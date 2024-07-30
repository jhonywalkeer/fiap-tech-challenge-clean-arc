import { NumberValidationMessage } from '@common/constants'
import { HttpException } from '@common/utils/exceptions'
import { Type, StatusCode, ErrorName } from '@domain/enums'

export const IsNumberValidator = (value: any, identifier: string): number => {
  if (typeof value !== Type.number) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      NumberValidationMessage(identifier)
    )
  }
  return value
}
