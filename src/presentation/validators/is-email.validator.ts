import { ValidEmails } from '@common/constants'
import { ErrorName, StatusCode } from '@common/enums'
import { HttpException } from '@common/utils/exceptions'
import { ErrorMessage } from '@domain/enums'

export const IsEmailValidator = (value: string): string => {
  const isEmail = value.includes('@')
  const isValid = ValidEmails.some((email) =>
    value?.toLowerCase().endsWith(email)
  )
  if (!isValid || !isEmail) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      ErrorMessage.EmailNotValid
    )
  }
  return value
}
