import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'

export const IsSocialSecurityNumberValidator = (value: string): string => {
  const removeSpecialCharacters = value.replace(/\./g, '').replace(/-/g, '')
  const size = removeSpecialCharacters.length === 11

  if (!removeSpecialCharacters || !size) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      ErrorMessage.SocialSecurityNumberNotValid
    )
  }

  return removeSpecialCharacters
}
