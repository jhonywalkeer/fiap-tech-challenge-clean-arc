import { NumberValidationMessage } from '@common/constants'
import { ErrorName, StatusCode, Type } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'

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
