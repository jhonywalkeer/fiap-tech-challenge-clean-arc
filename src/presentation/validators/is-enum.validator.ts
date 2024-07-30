import { EnumValidationMessage } from '@common/constants'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName } from '@domain/enums'

export const IsEnumValidator = (
  value: string,
  identifier: any,
  property: string
): string => {
  const isEnum = value in identifier
  if (!isEnum) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      EnumValidationMessage(property)
    )
  }
  return value
}
