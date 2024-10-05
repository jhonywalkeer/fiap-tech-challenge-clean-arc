import { EnumValidationMessage } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'

export const IsEnumValidator = (
  value: string,
  identifier: any,
  property: string
) => {
  const isEnum = Object.values(identifier).includes(value)

  if (!isEnum) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      EnumValidationMessage(property)
    )
  }
  return value
}
