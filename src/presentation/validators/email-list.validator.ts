import { ValidEmails } from '@common/constants'
import { HttpException } from '@common/utils/exceptions'
import { StatusCode, ErrorName, ErrorMessage } from '@domain/enums'

export const EmailListValidator = (value: string): string => {
  const isValid = ValidEmails.some((email) =>
    value?.toLowerCase().endsWith(email)
  )
  if (!isValid) {
    throw new HttpException(
      StatusCode.BadRequest,
      ErrorName.InvalidParameters,
      ErrorMessage.EmailNotValid
    )
  }
  return value
}
