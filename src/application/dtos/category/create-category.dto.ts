import { IsStringValidator } from '@presentation/validators'
import { HttpException } from '@common/utils/exceptions'
import { ErrorMessage, ErrorName, Field, StatusCode } from '@domain/enums'

export class CreateCategoryDTO {
  name: string
  description: string

  constructor(name: string, description: string) {
    if (!name || !description) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.InvalidBody,
        ErrorMessage.BodyInvalid
      )
    }

    this.name = IsStringValidator(name, Field.name)
    this.description = IsStringValidator(description, Field.description)
  }
}
